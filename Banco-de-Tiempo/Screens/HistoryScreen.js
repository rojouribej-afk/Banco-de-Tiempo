// HistoryScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { COLORS } from './theme';

export const HistoryScreen = () => {
  const [tab, setTab] = useState('Completados');

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Historial</Text>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        {/* Selector de pestañas */}
        <View style={styles.tabContainer}>
          {['Completados', 'Incompletos', 'Favoritos'].map((item) => (
            <TouchableOpacity 
              key={item} 
              style={[styles.tabBtn, tab === item && styles.tabBtnActive]}
              onPress={() => setTab(item)}
            >
              <Text style={[styles.tabText, tab === item && styles.tabTextActive]}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Lista de intercambios completados */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Clases de guitarra</Text>
            <View style={styles.badge}><Text style={styles.badgeText}>Completado</Text></View>
          </View>
          <Text style={styles.cardSubtitle}>Pagado 4 oct · ★ 4</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Inglés para viajar</Text>
            <View style={styles.badge}><Text style={styles.badgeText}>Completado</Text></View>
          </View>
          <Text style={styles.cardSubtitle}>Pagado 28 sep · ★ 5</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Pan casero</Text>
            <View style={styles.badge}><Text style={styles.badgeText}>Completado</Text></View>
          </View>
          <Text style={styles.cardSubtitle}>Pagado 20 sep</Text>
        </View>

        <Text style={styles.footnote}>
          En Incompletos verás pendientes, programados, impartidos sin pagar y cancelados.
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
  tabContainer: { flexDirection: 'row', borderWidth: 1, borderColor: COLORS.navy, borderRadius: 8, overflow: 'hidden', marginBottom: 16 },
  tabBtn: { flex: 1, paddingVertical: 8, alignItems: 'center', backgroundColor: COLORS.white },
  tabBtnActive: { backgroundColor: COLORS.navy },
  tabText: { fontSize: 11, fontWeight: '700', color: COLORS.navy },
  tabTextActive: { color: COLORS.white },
  card: { borderWidth: 1, borderColor: COLORS.border, borderRadius: 8, padding: 12, marginBottom: 10 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardTitle: { fontSize: 13, fontWeight: '700', color: COLORS.textDark },
  cardSubtitle: { fontSize: 11, color: COLORS.textMuted, marginTop: 4 },
  badge: { backgroundColor: COLORS.badgeBlue, paddingHorizontal: 7, paddingVertical: 2, borderRadius: 5 },
  badgeText: { fontSize: 10, color: COLORS.badgeTextBlue, fontWeight: '600' },
  footnote: { fontSize: 11, color: COLORS.textMuted, marginTop: 14, textAlign: 'center', lineHeight: 16 },
});