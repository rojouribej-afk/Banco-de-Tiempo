// AdminInterchangesScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { COLORS } from './theme';

export const AdminInterchangesScreen = () => {
  const [filter, setFilter] = useState('En revisión');

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.headerAdmin}>
        <Text style={styles.headerTitle}>Solicitudes e intercambios</Text>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        {/* Chips de filtro */}
        <View style={styles.chipRow}>
          {['Todos', 'Pendientes', 'En revisión', 'Incompletos'].map((item) => (
            <TouchableOpacity 
              key={item} 
              style={[styles.chip, filter === item && styles.chipActive]}
              onPress={() => setFilter(item)}
            >
              <Text style={[styles.chipText, filter === item && styles.chipTextActive]}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Tarjeta de intercambio 1 */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Clases de guitarra</Text>
            <View style={styles.badgeReview}>
              <Text style={styles.badgeReviewText}>En revisión</Text>
            </View>
          </View>
          <Text style={styles.cardSubtitle}>Luis M. → Pablo R. · 1.5 cr</Text>

          <View style={styles.btnRow}>
            <TouchableOpacity style={styles.btnPay}>
              <Text style={styles.btnPayText}>Pagar al vendedor</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnRefund}>
              <Text style={styles.btnRefundText}>Devolver al cliente</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Tarjeta de intercambio 2 */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Reparar laptop</Text>
            <View style={styles.badgeReview}>
              <Text style={styles.badgeReviewText}>En revisión</Text>
            </View>
          </View>
          <Text style={styles.cardSubtitle}>Gael P. → Sofía T. · 2 cr</Text>

          <View style={styles.btnRow}>
            <TouchableOpacity style={styles.btnPay}>
              <Text style={styles.btnPayText}>Pagar al vendedor</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnRefund}>
              <Text style={styles.btnRefundText}>Devolver al cliente</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.white },
  headerAdmin: { backgroundColor: COLORS.wine, paddingVertical: 18, alignItems: 'center' },
  headerTitle: { color: COLORS.white, fontSize: 16, fontWeight: '700' },
  container: { padding: 20 },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 16 },
  chip: { borderWidth: 1, borderColor: COLORS.border, paddingVertical: 5, paddingHorizontal: 12, borderRadius: 14 },
  chipActive: { backgroundColor: COLORS.navy, borderColor: COLORS.navy },
  chipText: { fontSize: 11, fontWeight: '600', color: COLORS.textDark },
  chipTextActive: { color: COLORS.white },
  card: { borderWidth: 1, borderColor: COLORS.border, borderRadius: 8, padding: 12, marginBottom: 12 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardTitle: { fontSize: 13, fontWeight: '700', color: COLORS.textDark },
  cardSubtitle: { fontSize: 11, color: COLORS.textMuted, marginVertical: 6 },
  badgeReview: { backgroundColor: COLORS.badgeBlue, paddingHorizontal: 8, paddingVertical: 2, borderRadius: 5 },
  badgeReviewText: { fontSize: 10, color: COLORS.badgeTextBlue, fontWeight: '700' },
  btnRow: { flexDirection: 'row', gap: 8, marginTop: 6 },
  btnPay: { flex: 1, backgroundColor: COLORS.wine, paddingVertical: 8, borderRadius: 6, alignItems: 'center' },
  btnPayText: { color: COLORS.white, fontSize: 11, fontWeight: '700' },
  btnRefund: { flex: 1, borderWidth: 1.5, borderColor: COLORS.navy, paddingVertical: 7, borderRadius: 6, alignItems: 'center' },
  btnRefundText: { color: COLORS.navy, fontSize: 11, fontWeight: '700' },
});