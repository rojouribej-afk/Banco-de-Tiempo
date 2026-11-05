// CashOutServiceScreen.js
import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { COLORS } from './theme';

export const CashOutServiceScreen = () => {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Cobrar servicio</Text>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        {/* Métricas Por cobrar / Cobrados */}
        <View style={styles.statsGrid}>
          <View style={styles.statBox}>
            <Text style={styles.statNum}>1.5</Text>
            <Text style={styles.statLbl}>Por cobrar</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNum}>6.0</Text>
            <Text style={styles.statLbl}>Cobrados</Text>
          </View>
        </View>

        <Text style={styles.sectionHeader}>Por cobrar</Text>
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Inglés para viajar</Text>
            <View style={styles.badgeBlue}>
              <Text style={styles.badgeBlueText}>+1.5</Text>
            </View>
          </View>
          <Text style={styles.cardSubtitle}>Esperando pago de Pablo R.</Text>
        </View>

        <Text style={[styles.sectionHeader, { marginTop: 16 }]}>Cobrados</Text>
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Pan casero</Text>
            <View style={styles.badgeBlue}>
              <Text style={styles.badgeBlueText}>+1.0</Text>
            </View>
          </View>
          <Text style={styles.cardSubtitle}>Cobrado 28 sep</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Clases de guitarra</Text>
            <View style={styles.badgeBlue}>
              <Text style={styles.badgeBlueText}>+1.0</Text>
            </View>
          </View>
          <Text style={styles.cardSubtitle}>Cobrado 20 sep</Text>
        </View>

        <Text style={styles.footerInfo}>
          Si el cliente no paga en 72 horas, el pago se hace automático.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.white },
  header: { backgroundColor: COLORS.navy, paddingVertical: 18, alignItems: 'center' },
  headerTitle: { color: COLORS.white, fontSize: 16, fontWeight: '700' },
  container: { padding: 20 },
  statsGrid: { flexDirection: 'row', gap: 10, marginBottom: 16 },
  statBox: { flex: 1, backgroundColor: COLORS.cardBg, paddingVertical: 12, borderRadius: 8, alignItems: 'center' },
  statNum: { fontSize: 20, fontWeight: '800', color: COLORS.navy },
  statLbl: { fontSize: 11, color: COLORS.textMuted, fontWeight: '600' },
  sectionHeader: { fontSize: 15, fontWeight: '800', color: COLORS.navy, marginBottom: 10 },
  card: { borderWidth: 1, borderColor: COLORS.border, borderRadius: 8, padding: 12, marginBottom: 10 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardTitle: { fontSize: 13, fontWeight: '700', color: COLORS.textDark },
  cardSubtitle: { fontSize: 11, color: COLORS.textMuted, marginTop: 4 },
  badgeBlue: { backgroundColor: COLORS.badgeBlue, paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6 },
  badgeBlueText: { fontSize: 11, fontWeight: '700', color: COLORS.badgeTextBlue },
  footerInfo: { fontSize: 11, color: COLORS.textMuted, marginTop: 14, textAlign: 'center' },
});