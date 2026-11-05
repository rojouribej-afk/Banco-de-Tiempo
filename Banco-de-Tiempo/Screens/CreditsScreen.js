// CreditsScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { COLORS } from './theme';

export const CreditsScreen = () => {
  const [filter, setFilter] = useState('Todos');

  const movements = [
    { id: 1, title: 'Cobro · Inglés para viajar', date: '4 oct', amount: '+1.5', positive: true },
    { id: 2, title: 'Retención · Guitarra', date: '2 oct', amount: '-1.5', positive: false },
    { id: 3, title: 'Pago · Pan casero', date: '28 sep', amount: '-1.0', positive: false },
    { id: 4, title: 'Bienvenida', date: '20 sep', amount: '+2.0', positive: true },
  ];

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mis créditos</Text>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        {/* Balance cards */}
        <View style={styles.balanceRow}>
          <View style={styles.balanceBox}>
            <Text style={styles.balanceNum}>8.5</Text>
            <Text style={styles.balanceLbl}>Disponible</Text>
          </View>
          <View style={styles.balanceBox}>
            <Text style={styles.balanceNum}>1.5</Text>
            <Text style={styles.balanceLbl}>Retenido</Text>
          </View>
        </View>

        {/* Filtros */}
        <View style={styles.tabContainer}>
          {['Todos', 'Ganados', 'Usados'].map((item) => (
            <TouchableOpacity 
              key={item} 
              style={[styles.tabBtn, filter === item && styles.tabBtnActive]}
              onPress={() => setFilter(item)}
            >
              <Text style={[styles.tabText, filter === item && styles.tabTextActive]}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Lista de movimientos */}
        {movements.map((item) => (
          <View key={item.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{item.amount}</Text>
              </View>
            </View>
            <Text style={styles.cardSubtitle}>{item.date}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.white },
  header: { backgroundColor: COLORS.navy, paddingVertical: 18, alignItems: 'center' },
  headerTitle: { color: COLORS.white, fontSize: 16, fontWeight: '700' },
  container: { padding: 20 },
  balanceRow: { flexDirection: 'row', gap: 10, marginBottom: 14 },
  balanceBox: { flex: 1, backgroundColor: COLORS.cardBg, paddingVertical: 12, borderRadius: 8, alignItems: 'center' },
  balanceNum: { fontSize: 20, fontWeight: '800', color: COLORS.navy },
  balanceLbl: { fontSize: 11, color: COLORS.textMuted, fontWeight: '600', marginTop: 2 },
  tabContainer: { flexDirection: 'row', borderWidth: 1, borderColor: COLORS.navy, borderRadius: 8, overflow: 'hidden', marginBottom: 14 },
  tabBtn: { flex: 1, paddingVertical: 7, alignItems: 'center', backgroundColor: COLORS.white },
  tabBtnActive: { backgroundColor: COLORS.navy },
  tabText: { fontSize: 11, fontWeight: '700', color: COLORS.navy },
  tabTextActive: { color: COLORS.white },
  card: { borderWidth: 1, borderColor: COLORS.border, borderRadius: 8, padding: 12, marginBottom: 8 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardTitle: { fontSize: 13, fontWeight: '700', color: COLORS.textDark },
  cardSubtitle: { fontSize: 11, color: COLORS.textMuted, marginTop: 2 },
  badge: { backgroundColor: COLORS.badgeBlue, paddingHorizontal: 8, paddingVertical: 2, borderRadius: 5 },
  badgeText: { fontSize: 11, color: COLORS.badgeTextBlue, fontWeight: '700' },
});