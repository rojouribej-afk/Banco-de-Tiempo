// AdminCategoriesScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { COLORS } from './theme';

export const AdminCategoriesScreen = () => {
  const categories = [
    { id: 1, name: 'Música', count: '9 servicios', active: true },
    { id: 2, name: 'Idiomas', count: '14 servicios', active: true },
    { id: 3, name: 'Tecnología', count: '21 servicios', active: true },
    { id: 4, name: 'Cocina', count: '7 servicios', active: false },
  ];

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.headerAdmin}>
        <Text style={styles.headerTitle}>Gestión de categorías</Text>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        {categories.map((cat) => (
          <View key={cat.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>{cat.name}</Text>
              <View style={cat.active ? styles.badgeActive : styles.badgeInactive}>
                <Text style={cat.active ? styles.badgeActiveText : styles.badgeInactiveText}>
                  {cat.active ? 'Activa' : 'Inactiva'}
                </Text>
              </View>
            </View>
            <Text style={styles.cardSubtitle}>{cat.count}</Text>
          </View>
        ))}

        <TouchableOpacity style={styles.btnPrimary}>
          <Text style={styles.btnPrimaryText}>+ Nueva categoría</Text>
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
  card: { borderWidth: 1, borderColor: COLORS.border, borderRadius: 8, padding: 12, marginBottom: 10 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardTitle: { fontSize: 13, fontWeight: '700', color: COLORS.textDark },
  cardSubtitle: { fontSize: 11, color: COLORS.textMuted, marginTop: 4 },
  badgeActive: { backgroundColor: COLORS.badgeBlue, paddingHorizontal: 8, paddingVertical: 2, borderRadius: 5 },
  badgeActiveText: { fontSize: 10, color: COLORS.badgeTextBlue, fontWeight: '700' },
  badgeInactive: { backgroundColor: '#E2E8F0', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 5 },
  badgeInactiveText: { fontSize: 10, color: COLORS.textMuted, fontWeight: '700' },
  btnPrimary: { backgroundColor: COLORS.wine, paddingVertical: 12, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  btnPrimaryText: { color: COLORS.white, fontSize: 13, fontWeight: '700' },
});