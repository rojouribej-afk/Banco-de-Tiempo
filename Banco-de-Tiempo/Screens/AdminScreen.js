// AdminScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { COLORS } from './theme';

export const AdminReportsScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safe}>
      {/* Header Vino característico del modo administrador */}
      <View style={styles.headerAdmin}>
        <Text style={styles.headerTitle}>Datos y reportes</Text>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.chipRow}>
          <View style={[styles.chip, styles.chipActiveAdmin]}>
            <Text style={styles.chipTextActive}>Septiembre</Text>
          </View>
          <View style={styles.chip}>
            <Text style={styles.chipText}>Todas las categorías</Text>
          </View>
        </View>

        {/* Métricas Admin */}
        <View style={styles.metricsRow}>
          <View style={styles.metricCard}>
            <Text style={[styles.metricValue, { color: COLORS.wine }]}>126</Text>
            <Text style={styles.metricLabel}>Intercambios</Text>
          </View>
          <View style={styles.metricCard}>
            <Text style={[styles.metricValue, { color: COLORS.wine }]}>210</Text>
            <Text style={styles.metricLabel}>Créditos usados</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.btnPrimaryAdmin}>
          <Text style={styles.btnPrimaryText}>Aplicar filtros</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnOutlineAdmin} onPress={() => navigation?.navigate('AdminDashboard')}>
          <Text style={styles.btnOutlineAdminText}>Panel de administración</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnOutlineAdmin} onPress={() => navigation?.navigate('AdminCategories')}>
          <Text style={styles.btnOutlineAdminText}>Gestión de categorías</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.white },
  headerAdmin: { backgroundColor: COLORS.wine, paddingVertical: 18, alignItems: 'center' },
  headerTitle: { color: COLORS.white, fontSize: 16, fontWeight: '700' },
  container: { padding: 20 },
  chipRow: { flexDirection: 'row', gap: 8, marginBottom: 16 },
  chip: { borderWidth: 1, borderColor: COLORS.border, paddingVertical: 6, paddingHorizontal: 12, borderRadius: 16 },
  chipActiveAdmin: { backgroundColor: COLORS.navy, borderColor: COLORS.navy },
  chipText: { fontSize: 11, color: COLORS.textDark, fontWeight: '600' },
  chipTextActive: { fontSize: 11, color: COLORS.white, fontWeight: '600' },
  metricsRow: { flexDirection: 'row', gap: 10, marginVertical: 10 },
  metricCard: { flex: 1, backgroundColor: COLORS.cardBg, paddingVertical: 18, borderRadius: 8, alignItems: 'center' },
  metricValue: { fontSize: 24, fontWeight: '800' },
  metricLabel: { fontSize: 10, color: COLORS.textMuted, fontWeight: '600', marginTop: 4 },
  btnPrimaryAdmin: { backgroundColor: COLORS.wine, paddingVertical: 12, borderRadius: 8, alignItems: 'center', marginTop: 14 },
  btnPrimaryText: { color: COLORS.white, fontSize: 13, fontWeight: '700' },
  btnOutlineAdmin: { borderWidth: 1.5, borderColor: COLORS.navy, paddingVertical: 11, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  btnOutlineAdminText: { color: COLORS.navy, fontSize: 13, fontWeight: '700' },
});