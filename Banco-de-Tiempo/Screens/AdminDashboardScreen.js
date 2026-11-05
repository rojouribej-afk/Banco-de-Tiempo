// AdminDashboardScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, Button } from 'react-native';
import { COLORS } from './theme';

export const AdminDashboardScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.headerAdmin}>
        <Text style={styles.headerTitle}>Panel de administración</Text>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.welcome}>Hola, administrador</Text>

        {/* Métricas Admin */}
        <View style={styles.metricsGrid}>
          <View style={styles.metricBox}>
            <Text style={styles.metricNum}>48</Text>
            <Text style={styles.metricLbl}>Usuarios</Text>
          </View>
          <View style={styles.metricBox}>
            <Text style={styles.metricNum}>126</Text>
            <Text style={styles.metricLbl}>Intercambios</Text>
          </View>
          <View style={styles.metricBox}>
            <Text style={styles.metricNum}>3</Text>
            <Text style={styles.metricLbl}>En revisión</Text>
          </View>
        </View>

        {/* Tarjetas de acceso a módulos */}
        <TouchableOpacity style={styles.moduleCard} onPress={() => navigation?.navigate('AdminUsuarios')}>
          <Text style={styles.moduleTitle}>Usuarios</Text>
          <Text style={styles.moduleSubtitle}>Consultar, editar y cambiar estado</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.moduleCard} onPress={() => navigation?.navigate('AdminReportes')}>
          <Text style={styles.moduleTitle}>Datos y reportes</Text>
          <Text style={styles.moduleSubtitle}>Reportes, filtros y categorías</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.moduleCard} onPress={() => navigation?.navigate('AdminSolicitudes')}>
          <Text style={styles.moduleTitle}>Solicitudes e intercambios</Text>
          <Text style={styles.moduleSubtitle}>Revisar y resolver</Text>
        </TouchableOpacity>

        <Button style={styles.btnOutlineAdmin} onPress={() => navigation?.navigate('AdminDashboard')}>
          <Text style={styles.btnOutlineAdminText}>Regresar al panel principal</Text>
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.white },
  headerAdmin: { backgroundColor: COLORS.wine, paddingVertical: 18, alignItems: 'center' },
  headerTitle: { color: COLORS.white, fontSize: 16, fontWeight: '700' },
  container: { padding: 20 },
  welcome: { fontSize: 18, fontWeight: '800', color: COLORS.navy, marginBottom: 16 },
  metricsGrid: { flexDirection: 'row', gap: 8, marginBottom: 18 },
  metricBox: { flex: 1, backgroundColor: COLORS.cardBg, paddingVertical: 12, borderRadius: 8, alignItems: 'center' },
  metricNum: { fontSize: 18, fontWeight: '800', color: COLORS.navy },
  metricLbl: { fontSize: 10, color: COLORS.textMuted, fontWeight: '600', marginTop: 2 },
  moduleCard: { borderWidth: 1.5, borderColor: '#94A3B8', borderRadius: 10, padding: 14, marginBottom: 12 },
  moduleTitle: { fontSize: 14, fontWeight: '700', color: COLORS.navy },
  moduleSubtitle: { fontSize: 11, color: COLORS.textMuted, marginTop: 2 },
});