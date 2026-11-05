// HomeScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { COLORS } from './theme';

export const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Inicio</Text>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.welcome}>Hola, Ana</Text>

        {/* Métricas */}
        <View style={styles.metricsRow}>
          <View style={styles.metricCard}>
            <Text style={styles.metricValue}>8.5</Text>
            <Text style={styles.metricLabel}>Créditos</Text>
          </View>
          <View style={styles.metricCard}>
            <Text style={styles.metricValue}>4.8</Text>
            <Text style={styles.metricLabel}>Reputación</Text>
          </View>
          <View style={styles.metricCard}>
            <Text style={styles.metricValue}>2</Text>
            <Text style={styles.metricLabel}>Por responder</Text>
          </View>
        </View>

        {/* Botones de acción principal */}
        <TouchableOpacity style={styles.actionCard} onPress={() => navigation?.navigate('Brindar')}>
          <Text style={styles.actionTitle}>Brindar servicio</Text>
          <Text style={styles.actionDesc}>Sube, imparte y cobra</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionCard} onPress={() => navigation?.navigate('Solicitar')}>
          <Text style={styles.actionTitle}>Solicitar servicio</Text>
          <Text style={styles.actionDesc}>Selecciona, pide, paga y califica</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionCard} onPress={() => navigation?.navigate('Cobrar')}>
          <Text style={styles.actionTitle}>Historial</Text>
          <Text style={styles.actionDesc}>Completados, incompletos y favoritos</Text>
        </TouchableOpacity>

        {/* Próximo intercambio */}
        <View style={styles.nextEventCard}>
          <View style={styles.eventHeader}>
            <Text style={styles.eventTitle}>Próximo intercambio</Text>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Programado</Text>
            </View>
          </View>
          <Text style={styles.eventDesc}>Sáb 10:00 · Clases de guitarra</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.white },
  header: { backgroundColor: COLORS.navy, paddingVertical: 18, alignItems: 'center' },
  headerTitle: { color: COLORS.white, fontSize: 16, fontWeight: '700' },
  container: { padding: 20 },
  welcome: { fontSize: 20, fontWeight: '800', color: COLORS.navy, marginBottom: 16 },
  metricsRow: { flexDirection: 'row', gap: 10, marginBottom: 20 },
  metricCard: {
    flex: 1,
    backgroundColor: COLORS.cardBg,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  metricValue: { fontSize: 18, fontWeight: '800', color: COLORS.navy },
  metricLabel: { fontSize: 10, color: COLORS.textMuted, fontWeight: '600', marginTop: 2 },
  actionCard: {
    borderWidth: 1.5,
    borderColor: '#94A3B8',
    borderRadius: 10,
    padding: 14,
    marginBottom: 12,
  },
  actionTitle: { fontSize: 14, fontWeight: '700', color: COLORS.navy },
  actionDesc: { fontSize: 11, color: COLORS.textMuted, marginTop: 2 },
  nextEventCard: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    padding: 14,
    marginTop: 6,
  },
  eventHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  eventTitle: { fontSize: 13, fontWeight: '700', color: COLORS.textDark },
  eventDesc: { fontSize: 11, color: COLORS.textMuted, marginTop: 4 },
  badge: { backgroundColor: COLORS.badgeBlue, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
  badgeText: { fontSize: 10, fontWeight: '700', color: COLORS.badgeTextBlue },
});