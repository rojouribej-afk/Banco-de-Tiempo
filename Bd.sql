-- =====================================================================
--  Banco de Tiempo y Talento — Aplicación móvil de intercambio de servicios
--  Script de base de datos: esquema + datos de prueba + consultas
--  Motor: MySQL 8.0+ / MariaDB 10.5+   |   Juego de caracteres: utf8mb4
--  Normalización: 3FN (ver sección "Normalización" del documento)
--  Regla general: 1 hora de servicio = 1 crédito de tiempo
-- =====================================================================


CREATE DATABASE banco_tiempo CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE banco_tiempo;

-- =====================================================================
--  1. ESQUEMA (DDL)
-- =====================================================================

CREATE TABLE rol (
    id_rol  INT         NOT NULL AUTO_INCREMENT,
    nombre  VARCHAR(30) NOT NULL,                               -- 'Cliente/Vendedor' o 'Administrador'
    CONSTRAINT pk_rol        PRIMARY KEY (id_rol),
    CONSTRAINT uq_rol_nombre UNIQUE (nombre)
) ENGINE=InnoDB;

CREATE TABLE usuario (
    id_usuario  INT          NOT NULL AUTO_INCREMENT,
    id_rol      INT          NOT NULL,
    nombre      VARCHAR(100) NOT NULL,
    correo      VARCHAR(100) NOT NULL,                          -- RN-001
    telefono    VARCHAR(20)  NULL,
    contrasena  VARCHAR(255) NOT NULL,                          -- cifrada; mínimo 8 caracteres validado en la app (RN-002)
    estado      BOOLEAN      NOT NULL DEFAULT 1,                -- baja lógica (RN-005)
    CONSTRAINT pk_usuario        PRIMARY KEY (id_usuario),
    CONSTRAINT uq_usuario_correo UNIQUE (correo),
    CONSTRAINT fk_usuario_rol    FOREIGN KEY (id_rol) REFERENCES rol (id_rol)
) ENGINE=InnoDB;

CREATE TABLE categoria (
    id_categoria INT         NOT NULL AUTO_INCREMENT,
    nombre       VARCHAR(60) NOT NULL,
    tipo         VARCHAR(10) NOT NULL,                          -- 'Técnica' o 'Blanda'
    estado       BOOLEAN     NOT NULL DEFAULT 1,                -- RN-003 (se desactiva, no se borra)
    CONSTRAINT pk_categoria        PRIMARY KEY (id_categoria),
    CONSTRAINT uq_categoria_nombre UNIQUE (nombre),
    CONSTRAINT ck_categoria_tipo   CHECK (tipo IN ('Técnica', 'Blanda'))
) ENGINE=InnoDB;

-- Catálogo de habilidades (antes era una columna de texto en usuario: violaba la 1FN)
CREATE TABLE habilidad (
    id_habilidad INT          NOT NULL AUTO_INCREMENT,
    id_categoria INT          NOT NULL,
    nombre       VARCHAR(80)  NOT NULL,
    descripcion  VARCHAR(200) NULL,
    CONSTRAINT pk_habilidad        PRIMARY KEY (id_habilidad),
    CONSTRAINT uq_habilidad_nombre UNIQUE (id_categoria, nombre),
    CONSTRAINT fk_habilidad_cat    FOREIGN KEY (id_categoria) REFERENCES categoria (id_categoria)
) ENGINE=InnoDB;

-- Resuelve la relación muchos a muchos Usuario - Habilidad
CREATE TABLE usuario_habilidad (
    id_usuario   INT NOT NULL,
    id_habilidad INT NOT NULL,
    CONSTRAINT pk_usuario_habilidad PRIMARY KEY (id_usuario, id_habilidad),
    CONSTRAINT fk_uh_usuario   FOREIGN KEY (id_usuario)   REFERENCES usuario (id_usuario)     ON DELETE CASCADE,
    CONSTRAINT fk_uh_habilidad FOREIGN KEY (id_habilidad) REFERENCES habilidad (id_habilidad)
) ENGINE=InnoDB;

CREATE TABLE servicio (
    id_servicio       INT          NOT NULL AUTO_INCREMENT,
    id_usuario        INT          NOT NULL,                    -- vendedor que lo ofrece
    id_categoria      INT          NOT NULL,
    nombre            VARCHAR(100) NOT NULL,
    descripcion       TEXT         NULL,
    horas             INT          NOT NULL,                    -- duración = créditos que cuesta
    modalidad         VARCHAR(15)  NOT NULL,
    disponibilidad    VARCHAR(150) NULL,
    estado            VARCHAR(10)  NOT NULL DEFAULT 'ACTIVO',   -- RN-007
    fecha_publicacion DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT pk_servicio       PRIMARY KEY (id_servicio),
    CONSTRAINT fk_servicio_usu   FOREIGN KEY (id_usuario)   REFERENCES usuario (id_usuario),
    CONSTRAINT fk_servicio_cat   FOREIGN KEY (id_categoria) REFERENCES categoria (id_categoria),
    CONSTRAINT ck_servicio_horas CHECK (horas > 0),
    CONSTRAINT ck_servicio_mod   CHECK (modalidad IN ('Presencial', 'Virtual', 'Mixta')),
    CONSTRAINT ck_servicio_est   CHECK (estado IN ('ACTIVO', 'PAUSADO', 'INACTIVO'))
) ENGINE=InnoDB;

CREATE TABLE solicitud (
    id_solicitud     INT          NOT NULL AUTO_INCREMENT,
    id_usuario       INT          NOT NULL,                     -- cliente solicitante
    id_servicio      INT          NOT NULL,
    fecha_solicitud  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    fecha_programada DATETIME     NOT NULL,                     -- fecha y hora elegidas por el cliente
    horas            INT          NOT NULL,
    mensaje          VARCHAR(250) NULL,
    estado           VARCHAR(10)  NOT NULL DEFAULT 'PENDIENTE',
    CONSTRAINT pk_solicitud       PRIMARY KEY (id_solicitud),
    CONSTRAINT fk_solicitud_usu   FOREIGN KEY (id_usuario)  REFERENCES usuario (id_usuario),
    CONSTRAINT fk_solicitud_serv  FOREIGN KEY (id_servicio) REFERENCES servicio (id_servicio),
    CONSTRAINT ck_solicitud_horas CHECK (horas > 0),
    CONSTRAINT ck_solicitud_est   CHECK (estado IN ('PENDIENTE', 'ACEPTADA', 'RECHAZADA', 'CANCELADA'))
) ENGINE=InnoDB;

-- Una solicitud aceptada genera un único intercambio (relación 1:1)
CREATE TABLE intercambio (
    id_intercambio   INT         NOT NULL AUTO_INCREMENT,
    id_solicitud     INT         NOT NULL,
    horas_realizadas INT         NULL,
    fecha_impartido  DATETIME    NULL,
    fecha_cierre     DATETIME    NULL,
    estado           VARCHAR(12) NOT NULL DEFAULT 'PROGRAMADO',
    CONSTRAINT pk_intercambio      PRIMARY KEY (id_intercambio),
    CONSTRAINT uq_intercambio_sol  UNIQUE (id_solicitud),
    CONSTRAINT fk_intercambio_sol  FOREIGN KEY (id_solicitud) REFERENCES solicitud (id_solicitud),
    CONSTRAINT ck_intercambio_est  CHECK (estado IN ('PROGRAMADO', 'IMPARTIDO', 'COMPLETADO', 'EN_REVISION', 'CANCELADO'))
) ENGINE=InnoDB;

-- El saldo NO se guarda: se calcula con la suma de los movimientos (CU-14)
CREATE TABLE movimiento_credito (
    id_movimiento  INT         NOT NULL AUTO_INCREMENT,
    id_usuario     INT         NOT NULL,
    id_intercambio INT         NULL,
    tipo           VARCHAR(12) NOT NULL,
    cantidad       INT         NOT NULL,                        -- con signo: + abona, - descuenta
    fecha          DATETIME    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT pk_movimiento     PRIMARY KEY (id_movimiento),
    CONSTRAINT fk_mc_usuario     FOREIGN KEY (id_usuario)     REFERENCES usuario (id_usuario),
    CONSTRAINT fk_mc_intercambio FOREIGN KEY (id_intercambio) REFERENCES intercambio (id_intercambio),
    CONSTRAINT ck_mc_tipo        CHECK (tipo IN ('BIENVENIDA', 'RETENCION', 'COBRO', 'DEVOLUCION')),
    CONSTRAINT ck_mc_cantidad    CHECK (cantidad <> 0)
) ENGINE=InnoDB;

-- Una sola calificación por intercambio (RN-011)
CREATE TABLE calificacion (
    id_calificacion INT          NOT NULL AUTO_INCREMENT,
    id_intercambio  INT          NOT NULL,
    id_usuario      INT          NOT NULL,                      -- cliente que califica
    estrellas       INT          NOT NULL,
    comentario      VARCHAR(250) NULL,
    fecha           DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT pk_calificacion    PRIMARY KEY (id_calificacion),
    CONSTRAINT uq_calif_interc    UNIQUE (id_intercambio),
    CONSTRAINT fk_calif_interc    FOREIGN KEY (id_intercambio) REFERENCES intercambio (id_intercambio),
    CONSTRAINT fk_calif_usuario   FOREIGN KEY (id_usuario)     REFERENCES usuario (id_usuario),
    CONSTRAINT ck_calif_estrellas CHECK (estrellas BETWEEN 1 AND 5)
) ENGINE=InnoDB;

CREATE TABLE favorito (
    id_favorito    INT      NOT NULL AUTO_INCREMENT,
    id_usuario     INT      NOT NULL,
    id_servicio    INT      NOT NULL,
    fecha_agregado DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT pk_favorito     PRIMARY KEY (id_favorito),
    CONSTRAINT uq_favorito     UNIQUE (id_usuario, id_servicio),
    CONSTRAINT fk_fav_usuario  FOREIGN KEY (id_usuario)  REFERENCES usuario (id_usuario)  ON DELETE CASCADE,
    CONSTRAINT fk_fav_servicio FOREIGN KEY (id_servicio) REFERENCES servicio (id_servicio)
) ENGINE=InnoDB;

-- Bitácora de acciones (registro permanente: RN-010)
CREATE TABLE historial (
    id_historial   INT          NOT NULL AUTO_INCREMENT,
    id_usuario     INT          NOT NULL,
    id_intercambio INT          NULL,
    accion         VARCHAR(50)  NOT NULL,
    detalle        VARCHAR(200) NULL,
    fecha          DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT pk_historial      PRIMARY KEY (id_historial),
    CONSTRAINT fk_hist_usuario   FOREIGN KEY (id_usuario)     REFERENCES usuario (id_usuario),
    CONSTRAINT fk_hist_interc    FOREIGN KEY (id_intercambio) REFERENCES intercambio (id_intercambio)
) ENGINE=InnoDB;

CREATE INDEX idx_servicio_estado  ON servicio (estado);
CREATE INDEX idx_solicitud_estado ON solicitud (estado);
CREATE INDEX idx_mc_usuario       ON movimiento_credito (id_usuario);

-- =====================================================================
--  2. DATOS DE PRUEBA (INSERT)
--  Las contraseñas de ejemplo usan SHA2 solo para pruebas; la app debe
--  usar un hash con sal (por ejemplo bcrypt).
-- =====================================================================

INSERT INTO rol (nombre) VALUES ('Cliente/Vendedor'), ('Administrador');

INSERT INTO usuario (id_rol, nombre, correo, telefono, contrasena, estado) VALUES
 (2, 'Administrador General', 'admin@bancotiempo.mx', '4421000000', SHA2('Admin2026!', 256), 1),
 (1, 'Mariana López Cruz',    'mariana@correo.mx',    '4421000001', SHA2('Mariana2026', 256), 1),
 (1, 'Carlos Pérez Soto',     'carlos@correo.mx',     '4421000002', SHA2('Carlos2026!', 256), 1),
 (1, 'Luis Hernández Vega',   'luis@correo.mx',       '4421000003', SHA2('Luis2026!!', 256), 1),
 (1, 'Ana Torres Rivas',      'ana@correo.mx',        '4421000004', SHA2('Ana2026!!!', 256), 1),
 (1, 'Usuario Inactivo',      'inactivo@correo.mx',   NULL,         SHA2('Inactivo2026', 256), 0);

INSERT INTO categoria (nombre, tipo, estado) VALUES
 ('Programación',            'Técnica', 1),
 ('Idiomas',                 'Técnica', 1),
 ('Diseño',                  'Técnica', 1),
 ('Comunicación',            'Blanda',  1),
 ('Liderazgo y trabajo en equipo', 'Blanda', 1),
 ('Cocina',                  'Técnica', 0);

INSERT INTO habilidad (id_categoria, nombre, descripcion) VALUES
 (1, 'Python',               'Programación en Python'),
 (1, 'Desarrollo web',       'HTML, CSS y JavaScript'),
 (2, 'Inglés conversacional', NULL),
 (2, 'Francés básico',       NULL),
 (3, 'Diseño gráfico',       'Logotipos y presentaciones'),
 (4, 'Hablar en público',    NULL),
 (5, 'Gestión de equipos',   NULL);

INSERT INTO usuario_habilidad (id_usuario, id_habilidad) VALUES
 (2, 1), (2, 2), (3, 3), (3, 6), (4, 5), (4, 4), (5, 7), (5, 6);

INSERT INTO servicio (id_usuario, id_categoria, nombre, descripcion, horas, modalidad, disponibilidad, estado, fecha_publicacion) VALUES
 (2, 1, 'Asesoría de Python para principiantes', 'Resolución de dudas y prácticas guiadas.', 2, 'Virtual',    'Lunes a viernes 17:00-20:00', 'ACTIVO',  '2026-10-10 09:00:00'),
 (3, 2, 'Conversación en inglés',                'Práctica oral con retroalimentación.',     1, 'Virtual',    'Sábados 10:00-14:00',          'ACTIVO',  '2026-10-12 10:00:00'),
 (4, 3, 'Diseño de logotipo',                    'Propuesta de logotipo para tu proyecto.',  3, 'Presencial', 'Fines de semana',              'ACTIVO',  '2026-10-15 11:30:00'),
 (5, 4, 'Taller de oratoria',                    'Técnicas para hablar en público.',         2, 'Mixta',      'Martes y jueves por la tarde', 'ACTIVO',  '2026-10-18 16:00:00'),
 (3, 4, 'Preparación para entrevistas',          'Simulacro de entrevista laboral.',         1, 'Virtual',    'Previa cita',                  'PAUSADO', '2026-10-20 12:00:00');

INSERT INTO solicitud (id_usuario, id_servicio, fecha_solicitud, fecha_programada, horas, mensaje, estado) VALUES
 (3, 1, '2026-10-25 10:00:00', '2026-10-28 18:00:00', 2, 'Quiero aprender lo básico de Python.',  'ACEPTADA'),   -- 1 -> intercambio 1 (COMPLETADO)
 (2, 2, '2026-10-30 09:30:00', '2026-11-01 10:00:00', 1, 'Practicar para una entrevista.',        'ACEPTADA'),   -- 2 -> intercambio 2 (IMPARTIDO)
 (4, 2, '2026-11-02 12:00:00', '2026-11-12 10:00:00', 1, 'Quiero mejorar mi pronunciación.',     'ACEPTADA'),   -- 3 -> intercambio 3 (PROGRAMADO)
 (2, 4, '2026-11-04 15:00:00', '2026-11-12 17:00:00', 2, NULL,                                    'PENDIENTE'),
 (2, 3, '2026-11-05 08:00:00', '2026-11-09 09:00:00', 3, 'Logotipo para mi portafolio.',          'RECHAZADA'),
 (3, 4, '2026-11-06 19:00:00', '2026-11-10 17:00:00', 2, 'Mejorar mi exposición.',                'CANCELADA'),
 (5, 1, '2026-10-20 10:00:00', '2026-10-22 18:00:00', 2, 'Revisión de un script.',                'ACEPTADA');   -- 7 -> intercambio 4 (EN_REVISION)

INSERT INTO intercambio (id_solicitud, horas_realizadas, fecha_impartido, fecha_cierre, estado) VALUES
 (1, 2,    '2026-10-28 20:00:00', '2026-10-29 09:00:00', 'COMPLETADO'),
 (2, 1,    '2026-11-01 11:00:00', NULL,                  'IMPARTIDO'),
 (3, NULL, NULL,                  NULL,                  'PROGRAMADO'),
 (7, 2,    '2026-10-22 20:00:00', NULL,                  'EN_REVISION');

-- Créditos de bienvenida (2 por usuario)
INSERT INTO movimiento_credito (id_usuario, id_intercambio, tipo, cantidad, fecha) VALUES
 (2, NULL, 'BIENVENIDA', 2, '2026-10-01 08:00:00'),
 (3, NULL, 'BIENVENIDA', 2, '2026-10-01 08:10:00'),
 (4, NULL, 'BIENVENIDA', 2, '2026-10-01 08:20:00'),
 (5, NULL, 'BIENVENIDA', 2, '2026-10-01 08:30:00');
-- Intercambio 1: Carlos (cliente) retiene 2 y Mariana (vendedora) cobra 2
INSERT INTO movimiento_credito (id_usuario, id_intercambio, tipo, cantidad, fecha) VALUES
 (3, 1, 'RETENCION', -2, '2026-10-26 09:00:00'),
 (2, 1, 'COBRO',      2, '2026-10-29 09:00:00');
-- Intercambio 2: Mariana retiene 1 (aún sin cobrar el vendedor)
-- Intercambio 3: Luis retiene 1 (servicio programado)
-- Intercambio 4 (en revisión): Ana retiene 2
INSERT INTO movimiento_credito (id_usuario, id_intercambio, tipo, cantidad, fecha) VALUES
 (2, 2, 'RETENCION', -1, '2026-10-31 09:00:00'),
 (4, 3, 'RETENCION', -1, '2026-11-03 09:00:00'),
 (5, 4, 'RETENCION', -2, '2026-10-21 09:00:00');

INSERT INTO calificacion (id_intercambio, id_usuario, estrellas, comentario, fecha) VALUES
 (1, 3, 5, 'Excelente explicación, muy paciente.', '2026-10-29 10:00:00');

INSERT INTO favorito (id_usuario, id_servicio, fecha_agregado) VALUES
 (3, 3, '2026-10-22 18:00:00'), (2, 4, '2026-10-30 08:00:00'), (4, 1, '2026-11-01 20:00:00');

INSERT INTO historial (id_usuario, id_intercambio, accion, detalle, fecha) VALUES
 (3, 1, 'SOLICITUD_ACEPTADA',   'Solicitud 1 aceptada por el vendedor',      '2026-10-26 09:00:00'),
 (2, 1, 'SERVICIO_IMPARTIDO',   'Servicio de Python marcado como impartido', '2026-10-28 20:00:00'),
 (3, 1, 'SERVICIO_PAGADO',      'Intercambio 1 completado',                  '2026-10-29 09:00:00'),
 (3, 1, 'SERVICIO_CALIFICADO',  '5 estrellas',                               '2026-10-29 10:00:00'),
 (5, 4, 'PROBLEMA_REPORTADO',   'Intercambio 4 pasa a revisión',             '2026-10-23 10:00:00');

-- =====================================================================
--  3. CONSULTAS (por interfaz)
-- =====================================================================

-- ---- I-02 Iniciar sesión (usuarios y administradores con cuenta activa)
SELECT u.id_usuario, u.nombre, r.nombre AS rol
FROM usuario u
JOIN rol r ON r.id_rol = u.id_rol
WHERE u.correo = 'mariana@correo.mx'
  AND u.contrasena = SHA2('Mariana2026', 256)
  AND u.estado = 1;

-- ---- I-03 Pantalla principal: saldo, reputación y solicitudes por responder
SELECT u.nombre,
       COALESCE((SELECT SUM(m.cantidad) FROM movimiento_credito m WHERE m.id_usuario = u.id_usuario), 0) AS saldo_disponible,
       (SELECT ROUND(AVG(c.estrellas), 1)
          FROM calificacion c
          JOIN intercambio i ON i.id_intercambio = c.id_intercambio
          JOIN solicitud so  ON so.id_solicitud  = i.id_solicitud
          JOIN servicio se   ON se.id_servicio   = so.id_servicio
         WHERE se.id_usuario = u.id_usuario)                                                           AS reputacion,
       (SELECT COUNT(*)
          FROM solicitud so
          JOIN servicio se ON se.id_servicio = so.id_servicio
         WHERE se.id_usuario = u.id_usuario AND so.estado = 'PENDIENTE')                              AS solicitudes_por_responder
FROM usuario u
WHERE u.id_usuario = 2;

-- ---- I-04 Historial: completados / incompletos / favoritos del usuario 3 (cliente)
SELECT se.nombre AS servicio, i.estado, so.fecha_programada
FROM intercambio i
JOIN solicitud so ON so.id_solicitud = i.id_solicitud
JOIN servicio se  ON se.id_servicio  = so.id_servicio
WHERE so.id_usuario = 3 AND i.estado = 'COMPLETADO'
ORDER BY so.fecha_programada DESC;

SELECT se.nombre AS servicio, so.estado AS estado_solicitud, i.estado AS estado_intercambio
FROM solicitud so
JOIN servicio se        ON se.id_servicio  = so.id_servicio
LEFT JOIN intercambio i ON i.id_solicitud  = so.id_solicitud
WHERE so.id_usuario = 3
  AND (i.id_intercambio IS NULL OR i.estado <> 'COMPLETADO')
ORDER BY so.fecha_solicitud DESC;

SELECT se.nombre AS servicio_favorito, f.fecha_agregado
FROM favorito f
JOIN servicio se ON se.id_servicio = f.id_servicio
WHERE f.id_usuario = 3
ORDER BY f.fecha_agregado DESC;

-- ---- I-05 Seleccionar servicio: búsqueda con filtros (RN-007: solo servicios ACTIVOS)
SELECT se.id_servicio, se.nombre, c.nombre AS categoria, c.tipo,
       se.horas, se.modalidad, u.nombre AS ofrecido_por
FROM servicio se
JOIN categoria c ON c.id_categoria = se.id_categoria
JOIN usuario u   ON u.id_usuario   = se.id_usuario
WHERE se.estado = 'ACTIVO'
  AND se.id_usuario <> 3                                   -- RN-006: no ver/solicitar sus propios servicios
  AND (se.nombre LIKE '%dis%' OR c.nombre LIKE '%dis%')
ORDER BY se.nombre;

-- ---- I-06 Pedir servicio: validar saldo del cliente contra el costo (RN-008)
SELECT se.nombre, se.horas AS costo_creditos,
       COALESCE(SUM(m.cantidad), 0) AS saldo_cliente,
       IF(COALESCE(SUM(m.cantidad), 0) >= se.horas, 'Saldo suficiente', 'Saldo insuficiente') AS validacion
FROM servicio se
LEFT JOIN movimiento_credito m ON m.id_usuario = 4
WHERE se.id_servicio = 1
GROUP BY se.id_servicio, se.nombre, se.horas;

-- ---- I-09 Brindar servicio: solicitudes recibidas por el vendedor 5
SELECT so.id_solicitud, se.nombre AS servicio, cl.nombre AS cliente,
       so.fecha_programada, so.horas, so.mensaje, so.estado
FROM solicitud so
JOIN servicio se ON se.id_servicio = so.id_servicio
JOIN usuario  cl ON cl.id_usuario  = so.id_usuario
WHERE se.id_usuario = 5
ORDER BY so.fecha_solicitud DESC;

-- ---- I-12 Cobrar servicio: créditos por cobrar y cobrados del vendedor 2 (Mariana)
SELECT SUM(CASE WHEN i.estado = 'COMPLETADO'              THEN so.horas ELSE 0 END) AS creditos_cobrados,
       SUM(CASE WHEN i.estado IN ('IMPARTIDO', 'EN_REVISION') THEN so.horas ELSE 0 END) AS creditos_por_cobrar
FROM intercambio i
JOIN solicitud so ON so.id_solicitud = i.id_solicitud
JOIN servicio se  ON se.id_servicio  = so.id_servicio
WHERE se.id_usuario = 2;

-- Intercambios IMPARTIDOS con más de 72 horas sin pago (cobro automático, RB-06)
SELECT i.id_intercambio, se.nombre, i.fecha_impartido
FROM intercambio i
JOIN solicitud so ON so.id_solicitud = i.id_solicitud
JOIN servicio se  ON se.id_servicio  = so.id_servicio
WHERE i.estado = 'IMPARTIDO'
  AND i.fecha_impartido <= '2026-11-08 00:00:00' - INTERVAL 72 HOUR;

-- ---- I-13 Actualizar habilidades: habilidades de un usuario con su categoría
SELECT h.nombre AS habilidad, c.nombre AS categoria, c.tipo
FROM usuario_habilidad uh
JOIN habilidad h ON h.id_habilidad = uh.id_habilidad
JOIN categoria c ON c.id_categoria = h.id_categoria
WHERE uh.id_usuario = 2
ORDER BY c.nombre, h.nombre;

-- ---- I-14 Consultar créditos: saldo disponible, retenido y movimientos (usuario 2)
SELECT COALESCE(SUM(m.cantidad), 0) AS saldo_disponible,
       COALESCE((SELECT -SUM(r.cantidad)
                   FROM movimiento_credito r
                   JOIN intercambio i ON i.id_intercambio = r.id_intercambio
                  WHERE r.id_usuario = 2 AND r.tipo = 'RETENCION'
                    AND i.estado IN ('PROGRAMADO', 'IMPARTIDO', 'EN_REVISION')), 0) AS saldo_retenido
FROM movimiento_credito m
WHERE m.id_usuario = 2;

SELECT m.fecha, m.tipo, m.cantidad, m.id_intercambio
FROM movimiento_credito m
WHERE m.id_usuario = 2
ORDER BY m.fecha DESC;

-- ---- I-15 Panel de administración: indicadores de la comunidad
SELECT (SELECT COUNT(*) FROM usuario WHERE estado = 1)               AS usuarios_activos,
       (SELECT COUNT(*) FROM intercambio)                            AS intercambios,
       (SELECT COUNT(*) FROM intercambio WHERE estado = 'EN_REVISION') AS en_revision;

-- ---- I-16 Consultar usuarios: filtro por estado y rol
SELECT u.id_usuario, u.nombre, u.correo, r.nombre AS rol,
       IF(u.estado = 1, 'Activo', 'Inactivo') AS estado
FROM usuario u
JOIN rol r ON r.id_rol = u.id_rol
WHERE u.estado = 1 AND r.nombre = 'Cliente/Vendedor'
ORDER BY u.nombre;

-- ---- I-18 Reportes y gráficas: intercambios por estado y por categoría
SELECT i.estado, COUNT(*) AS total
FROM intercambio i
GROUP BY i.estado
ORDER BY total DESC;

SELECT c.nombre AS categoria, COUNT(i.id_intercambio) AS intercambios, COALESCE(SUM(CASE WHEN i.id_intercambio IS NOT NULL THEN so.horas END), 0) AS horas_intercambiadas
FROM categoria c
LEFT JOIN servicio se    ON se.id_categoria = c.id_categoria
LEFT JOIN solicitud so   ON so.id_servicio  = se.id_servicio
LEFT JOIN intercambio i  ON i.id_solicitud  = so.id_solicitud
GROUP BY c.id_categoria, c.nombre
ORDER BY intercambios DESC, c.nombre;

-- Reputación de cada vendedor (promedio de estrellas)
SELECT u.nombre AS vendedor, COUNT(c.id_calificacion) AS calificaciones, ROUND(AVG(c.estrellas), 1) AS promedio
FROM calificacion c
JOIN intercambio i ON i.id_intercambio = c.id_intercambio
JOIN solicitud so  ON so.id_solicitud  = i.id_solicitud
JOIN servicio se   ON se.id_servicio   = so.id_servicio
JOIN usuario u     ON u.id_usuario     = se.id_usuario
GROUP BY u.id_usuario, u.nombre
ORDER BY promedio DESC;

-- ---- I-19 Categorías: servicios asociados a cada una (RN-003)
SELECT c.nombre, c.tipo, IF(c.estado = 1, 'Activa', 'Inactiva') AS estado,
       COUNT(se.id_servicio) AS servicios_asociados
FROM categoria c
LEFT JOIN servicio se ON se.id_categoria = c.id_categoria AND se.estado = 'ACTIVO'
GROUP BY c.id_categoria, c.nombre, c.tipo, c.estado
ORDER BY c.nombre;

-- ---- I-20 Transacciones y solicitudes: intercambios en revisión
SELECT i.id_intercambio, se.nombre AS servicio, cl.nombre AS cliente,
       ve.nombre AS vendedor, so.horas AS creditos
FROM intercambio i
JOIN solicitud so ON so.id_solicitud = i.id_solicitud
JOIN servicio se  ON se.id_servicio  = so.id_servicio
JOIN usuario cl   ON cl.id_usuario   = so.id_usuario
JOIN usuario ve   ON ve.id_usuario   = se.id_usuario
WHERE i.estado = 'EN_REVISION';

-- =====================================================================
--  4. OPERACIONES DE EJEMPLO (se revierten con ROLLBACK)
-- =====================================================================

-- Pagar un servicio: el intercambio pasa a COMPLETADO y el vendedor cobra (RN-009)
START TRANSACTION;
  UPDATE intercambio SET estado = 'COMPLETADO', fecha_cierre = NOW()
   WHERE id_intercambio = 2 AND estado = 'IMPARTIDO';
  INSERT INTO movimiento_credito (id_usuario, id_intercambio, tipo, cantidad)
  SELECT se.id_usuario, i.id_intercambio, 'COBRO', so.horas
    FROM intercambio i
    JOIN solicitud so ON so.id_solicitud = i.id_solicitud
    JOIN servicio se  ON se.id_servicio  = so.id_servicio
   WHERE i.id_intercambio = 2;
  SELECT id_usuario, SUM(cantidad) AS saldo FROM movimiento_credito GROUP BY id_usuario;
ROLLBACK;

-- Resolver un intercambio en revisión devolviendo los créditos al cliente
START TRANSACTION;
  UPDATE intercambio SET estado = 'CANCELADO', fecha_cierre = NOW() WHERE id_intercambio = 4;
  INSERT INTO movimiento_credito (id_usuario, id_intercambio, tipo, cantidad) VALUES (5, 4, 'DEVOLUCION', 2);
  SELECT id_usuario, SUM(cantidad) AS saldo FROM movimiento_credito WHERE id_usuario = 5 GROUP BY id_usuario;
ROLLBACK;
