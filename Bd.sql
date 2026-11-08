
CREATE DATABASE banco_tiempo_talento;
USE banco_tiempo_talento;

CREATE TABLE rol (
  id_rol INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(30) NOT NULL
);

CREATE TABLE usuario (
  id_usuario INT AUTO_INCREMENT PRIMARY KEY,
  id_rol INT NOT NULL,
  nombre VARCHAR(100) NOT NULL,
  correo VARCHAR(120) NOT NULL UNIQUE,
  telefono VARCHAR(20),
  contrasena VARCHAR(255) NOT NULL,
  estado VARCHAR(20) NOT NULL DEFAULT 'activo',
  FOREIGN KEY (id_rol) REFERENCES rol (id_rol)
);

CREATE TABLE categoria (
  id_categoria INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(80) NOT NULL,
  tipo VARCHAR(30) NOT NULL
);

CREATE TABLE habilidad (
  id_habilidad INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(80) NOT NULL,
  descripcion VARCHAR(255)
);

CREATE TABLE usuario_habilidad (
  id_usuario INT NOT NULL,
  id_habilidad INT NOT NULL,
  PRIMARY KEY (id_usuario, id_habilidad),
  FOREIGN KEY (id_usuario) REFERENCES usuario (id_usuario),
  FOREIGN KEY (id_habilidad) REFERENCES habilidad (id_habilidad)
);

CREATE TABLE servicio (
  id_servicio INT AUTO_INCREMENT PRIMARY KEY,
  id_usuario INT NOT NULL,
  id_categoria INT NOT NULL,
  nombre VARCHAR(120) NOT NULL,
  descripcion TEXT,
  horas DECIMAL(5,2) NOT NULL,
  estado VARCHAR(20) NOT NULL DEFAULT 'activo',
  fecha_publicacion DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_usuario) REFERENCES usuario (id_usuario),
  FOREIGN KEY (id_categoria) REFERENCES categoria (id_categoria)
);

CREATE TABLE favorito (
  id_favorito INT AUTO_INCREMENT PRIMARY KEY,
  id_usuario INT NOT NULL,
  id_servicio INT NOT NULL,
  fecha_agregado DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_usuario) REFERENCES usuario (id_usuario),
  FOREIGN KEY (id_servicio) REFERENCES servicio (id_servicio)
);

CREATE TABLE solicitud (
  id_solicitud INT AUTO_INCREMENT PRIMARY KEY,
  id_usuario INT NOT NULL,
  id_servicio INT NOT NULL,
  fecha_solicitud DATETIME DEFAULT CURRENT_TIMESTAMP,
  estado VARCHAR(20) NOT NULL DEFAULT 'pendiente',
  comentario TEXT,
  FOREIGN KEY (id_usuario) REFERENCES usuario (id_usuario),
  FOREIGN KEY (id_servicio) REFERENCES servicio (id_servicio)
);

CREATE TABLE intercambio (
  id_intercambio INT AUTO_INCREMENT PRIMARY KEY,
  id_solicitud INT NOT NULL UNIQUE,
  horas DECIMAL(5,2) NOT NULL,
  fecha_inicio DATETIME,
  fecha_fin DATETIME,
  estado VARCHAR(20) NOT NULL DEFAULT 'en_curso',
  FOREIGN KEY (id_solicitud) REFERENCES solicitud (id_solicitud)
);

CREATE TABLE calificacion (
  id_calificacion INT AUTO_INCREMENT PRIMARY KEY,
  id_intercambio INT NOT NULL,
  id_usuario INT NOT NULL,
  estrellas INT NOT NULL,
  comentario TEXT,
  fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_intercambio) REFERENCES intercambio (id_intercambio),
  FOREIGN KEY (id_usuario) REFERENCES usuario (id_usuario)
);

CREATE TABLE credito (
  id_credito INT AUTO_INCREMENT PRIMARY KEY,
  id_usuario INT NOT NULL,
  cantidad DECIMAL(6,2) NOT NULL,
  tipo VARCHAR(20) NOT NULL,
  fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_usuario) REFERENCES usuario (id_usuario)
);

CREATE TABLE historial (
  id_historial INT AUTO_INCREMENT PRIMARY KEY,
  id_usuario INT NOT NULL,
  id_intercambio INT NOT NULL,
  fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_usuario) REFERENCES usuario (id_usuario),
  FOREIGN KEY (id_intercambio) REFERENCES intercambio (id_intercambio)
);

/* Inserts */

INSERT INTO rol (id_rol, nombre) VALUES
(1, 'administrador'),
(2, 'usuario');

INSERT INTO usuario (id_usuario, id_rol, nombre, correo, telefono, contrasena, estado) VALUES
(1, 1, 'Administrador General', 'admin@bancotiempo.com', '4421000000', 'hash_demo_00', 'activo'),
(2, 2, 'Ana Martinez',          'ana@correo.com',        '4421000001', 'hash_demo_01', 'activo'),
(3, 2, 'Luis Hernandez',        'luis@correo.com',       '4421000002', 'hash_demo_02', 'activo'),
(4, 2, 'Maria Lopez',           'maria@correo.com',      '4421000003', 'hash_demo_03', 'activo'),
(5, 2, 'Carlos Ramirez',        'carlos@correo.com',     '4421000004', 'hash_demo_04', 'activo'),
(6, 2, 'Sofia Torres',          'sofia@correo.com',      '4421000005', 'hash_demo_05', 'inactivo');

INSERT INTO categoria (id_categoria, nombre, tipo) VALUES
(1, 'Idiomas',       'Educacion'),
(2, 'Matematicas',   'Educacion'),
(3, 'Plomeria',      'Hogar'),
(4, 'Programacion',  'Tecnologia'),
(5, 'Guitarra',      'Arte'),
(6, 'Cocina',        'Hogar');

INSERT INTO habilidad (id_habilidad, nombre, descripcion) VALUES
(1, 'Ingles',               'Conversacion y gramatica'),
(2, 'Algebra',              'Apoyo en matematicas de nivel medio'),
(3, 'Plomeria basica',      'Reparacion de fugas y llaves'),
(4, 'Programacion en Java', 'Fundamentos y ejercicios'),
(5, 'Guitarra',             'Acustica y electrica'),
(6, 'Cocina casera',        'Recetas tradicionales');

INSERT INTO usuario_habilidad (id_usuario, id_habilidad) VALUES
(2, 1),
(2, 5),
(3, 4),
(3, 2),
(4, 3),
(5, 6),
(5, 1),
(6, 2);

INSERT INTO servicio (id_servicio, id_usuario, id_categoria, nombre, descripcion, horas, estado, fecha_publicacion) VALUES
(1, 2, 1, 'Clases de ingles conversacional',   'Practica de conversacion',        1.00, 'activo',  '2026-10-01 10:00:00'),
(2, 2, 5, 'Guitarra para principiantes',       'Acordes basicos y rasgueo',       1.50, 'activo',  '2026-10-02 11:00:00'),
(3, 3, 4, 'Asesoria en Java',                  'Dudas de programacion orientada a objetos', 2.00, 'activo', '2026-10-03 09:30:00'),
(4, 3, 2, 'Regularizacion de algebra',         'Ejercicios y repaso',             1.00, 'activo',  '2026-10-04 15:00:00'),
(5, 4, 3, 'Reparacion de fugas',               'Revision y reparacion en casa',   2.00, 'activo',  '2026-10-05 08:00:00'),
(6, 5, 6, 'Taller de cocina mexicana',         'Platillos tradicionales',         3.00, 'activo',  '2026-10-06 12:00:00'),
(7, 5, 1, 'Ingles para viajeros',              'Frases utiles para viajar',       1.00, 'pausado', '2026-10-07 17:00:00');

INSERT INTO favorito (id_favorito, id_usuario, id_servicio, fecha_agregado) VALUES
(1, 2, 3, '2026-10-10 10:00:00'),
(2, 2, 5, '2026-10-10 10:05:00'),
(3, 3, 1, '2026-10-11 09:00:00'),
(4, 4, 2, '2026-10-11 18:30:00'),
(5, 5, 3, '2026-10-12 20:00:00');

INSERT INTO solicitud (id_solicitud, id_usuario, id_servicio, fecha_solicitud, estado, comentario) VALUES
(1, 3, 1, '2026-10-03 12:00:00', 'aceptada',  'Quiero mejorar mi ingles'),
(2, 4, 3, '2026-10-06 13:00:00', 'aceptada',  'Necesito ayuda con mi proyecto'),
(3, 2, 5, '2026-10-10 09:00:00', 'aceptada',  'Tengo una fuga en la cocina'),
(4, 5, 2, '2026-10-20 16:00:00', 'pendiente', 'Me gustaria aprender guitarra'),
(5, 2, 6, '2026-10-21 10:00:00', 'rechazada', 'Interesada en el taller'),
(6, 4, 4, '2026-10-30 11:00:00', 'aceptada',  'Repaso para examen');

INSERT INTO intercambio (id_intercambio, id_solicitud, horas, fecha_inicio, fecha_fin, estado) VALUES
(1, 1, 1.00, '2026-10-05 16:00:00', '2026-10-05 17:00:00', 'completado'),
(2, 2, 2.00, '2026-10-08 17:00:00', '2026-10-08 19:00:00', 'completado'),
(3, 3, 2.00, '2026-10-12 11:00:00', '2026-10-12 13:00:00', 'completado'),
(4, 6, 1.00, '2026-11-02 16:00:00', NULL,                  'en_curso');

INSERT INTO calificacion (id_calificacion, id_intercambio, id_usuario, estrellas, comentario, fecha) VALUES
(1, 1, 3, 5, 'Muy buena clase',            '2026-10-05 18:00:00'),
(2, 2, 4, 4, 'Explico muy claro',          '2026-10-08 20:00:00'),
(3, 3, 2, 5, 'Resolvio la fuga rapido',    '2026-10-12 14:00:00'),
(4, 1, 2, 5, 'Excelente alumno',           '2026-10-05 18:10:00');

INSERT INTO credito (id_credito, id_usuario, cantidad, tipo, fecha) VALUES
(1,  2, 2.00, 'ganado',  '2026-09-30 10:00:00'),
(2,  3, 2.00, 'ganado',  '2026-09-30 10:05:00'),
(3,  4, 2.00, 'ganado',  '2026-09-30 10:10:00'),
(4,  5, 2.00, 'ganado',  '2026-09-30 10:15:00'),
(5,  6, 2.00, 'ganado',  '2026-09-30 10:20:00'),
(6,  2, 1.00, 'ganado',  '2026-10-05 17:00:00'),
(7,  3, 1.00, 'gastado', '2026-10-05 17:00:00'),
(8,  3, 2.00, 'ganado',  '2026-10-08 19:00:00'),
(9,  4, 2.00, 'gastado', '2026-10-08 19:00:00'),
(10, 4, 2.00, 'ganado',  '2026-10-12 13:00:00'),
(11, 2, 2.00, 'gastado', '2026-10-12 13:00:00');

INSERT INTO historial (id_historial, id_usuario, id_intercambio, fecha) VALUES
(1, 2, 1, '2026-10-05 17:00:00'),
(2, 3, 1, '2026-10-05 17:00:00'),
(3, 3, 2, '2026-10-08 19:00:00'),
(4, 4, 2, '2026-10-08 19:00:00'),
(5, 4, 3, '2026-10-12 13:00:00'),
(6, 2, 3, '2026-10-12 13:00:00');


/* Consultas simples */

-- 1. Login (LoginScreen): valida correo y contrasena de un usuario activo
SELECT id_usuario, nombre, id_rol
FROM usuario
WHERE correo = 'ana@correo.com'
  AND contrasena = 'hash_demo_01'
  AND estado = 'activo';

-- 2. Categorias para el selector al publicar un servicio (ProvideServiceScreen / UploadServiceScreen)
SELECT id_categoria, nombre
FROM categoria
ORDER BY nombre;

-- 3. Solicitudes por estado (AdminDashboardScreen)
SELECT estado, COUNT(*) AS total
FROM solicitud
GROUP BY estado;

/* Consultas con inner join */
-- 1. Catalogo de servicios activos con quien los ofrece y su categoria (SelectServiceScreen / HomeScreen)
SELECT s.id_servicio, s.nombre AS servicio, s.descripcion, s.horas,
       u.nombre AS ofrecido_por, c.nombre AS categoria
FROM servicio s
INNER JOIN usuario u ON u.id_usuario = s.id_usuario
INNER JOIN categoria c ON c.id_categoria = s.id_categoria
WHERE s.estado = 'activo'
ORDER BY s.fecha_publicacion DESC;

-- 2. Historial de un usuario (HistoryScreen). Cambia el 2 por el id del usuario.
SELECT h.fecha, s.nombre AS servicio, c.nombre AS tipo_servicio,
       prov.nombre AS ofrecido_por, i.horas, i.estado
FROM historial h
INNER JOIN intercambio i ON i.id_intercambio = h.id_intercambio
INNER JOIN solicitud sol ON sol.id_solicitud = i.id_solicitud
INNER JOIN servicio s ON s.id_servicio = sol.id_servicio
INNER JOIN categoria c ON c.id_categoria = s.id_categoria
INNER JOIN usuario prov ON prov.id_usuario = s.id_usuario
WHERE h.id_usuario = 2
ORDER BY h.fecha DESC;

-- 3. Solicitudes pendientes que recibio un usuario por sus servicios (RequestServiceScreen). Cambia el 2 por el id del usuario.
SELECT sol.id_solicitud, u.nombre AS solicitante, s.nombre AS servicio,
       sol.fecha_solicitud, sol.comentario
FROM solicitud sol
INNER JOIN servicio s ON s.id_servicio = sol.id_servicio
INNER JOIN usuario u ON u.id_usuario = sol.id_usuario
WHERE s.id_usuario = 2
  AND sol.estado = 'pendiente';


/* Procedimientos almacenados */

DROP PROCEDURE IF EXISTS sp_registrar_solicitud;
DROP PROCEDURE IF EXISTS sp_saldo_usuario;

DELIMITER $$

-- 1. Registra una solicitud nueva en estado pendiente (boton "Solicitar" de RequestServiceScreen)
CREATE PROCEDURE sp_registrar_solicitud(
  IN p_id_usuario INT,
  IN p_id_servicio INT,
  IN p_comentario TEXT
)
BEGIN
  INSERT INTO solicitud (id_usuario, id_servicio, estado, comentario)
  VALUES (p_id_usuario, p_id_servicio, 'pendiente', p_comentario);

  SELECT LAST_INSERT_ID() AS id_solicitud_creada;
END$$

-- 2. Saldo de horas de un usuario: ganado - gastado (CreditsScreen)
CREATE PROCEDURE sp_saldo_usuario(IN p_id_usuario INT)
BEGIN
  SELECT
    u.id_usuario,
    u.nombre,
    COALESCE(SUM(CASE WHEN c.tipo = 'ganado' THEN c.cantidad ELSE -c.cantidad END), 0) AS saldo
  FROM usuario u
  LEFT JOIN credito c ON c.id_usuario = u.id_usuario
  WHERE u.id_usuario = p_id_usuario
  GROUP BY u.id_usuario, u.nombre;
END$$

DELIMITER ;
