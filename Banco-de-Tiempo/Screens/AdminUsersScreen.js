// AdminUsersScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { COLORS } from './theme';

export const AdminUsersScreen = ({ navigation }) => {
  const [filter, setFilter] = useState('Todos');

  const users = [
    { id: 1, name: 'Ana López', email: 'ana@correo.com', status: 'Activo' },
    { id: 2, name: 'Luis M.', email: 'luis@correo.com', status: 'Activo' },
    { id: 3, name: 'Gael P.', email: 'gael@correo.com', status: 'Suspendido' },
    { id: 4, name: 'Paloma H.', email: 'paloma@correo.com', status: 'Admin' },
  ];

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.headerAdmin}>
        <Text style={styles.headerTitle}>Usuarios</Text>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <TextInput 
          style={styles.searchInput} 
          placeholder="Buscar por nombre o correo" 
          placeholderTextColor="#94A3B8" 
        />

        {/* Chips de filtro */}
        <View style={styles.chipRow}>
          {['Todos', 'Activos', 'Suspendidos', 'Admins'].map((tag) => (
            <TouchableOpacity 
              key={tag} 
              style={[styles.chip, filter === tag && styles.chipActive]}
              onPress={() => setFilter(tag)}
            >
              <Text style={[styles.chipText, filter === tag && styles.chipTextActive]}>{tag}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Lista de usuarios */}
        {users.map((user) => (
          <TouchableOpacity 
            key={user.id} 
            style={styles.card} 
            onPress={() => navigation?.navigate('AdminEditarUsuario')}
          >
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>{user.name}</Text>
              <View style={[
                styles.badge, 
                user.status === 'Suspendido' && { backgroundColor: '#E2E8F0' },
                user.status === 'Admin' && { backgroundColor: '#EDE9FE' }
              ]}>
                <Text style={[
                  styles.badgeText, 
                  user.status === 'Suspendido' && { color: COLORS.textMuted },
                  user.status === 'Admin' && { color: '#6D28D9' }
                ]}>
                  {user.status}
                </Text>
              </View>
            </View>
            <Text style={styles.cardSubtitle}>{user.email}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.white },
  headerAdmin: { backgroundColor: COLORS.wine, paddingVertical: 18, alignItems: 'center' },
  headerTitle: { color: COLORS.white, fontSize: 16, fontWeight: '700' },
  container: { padding: 20 },
  searchInput: { borderWidth: 1, borderColor: COLORS.border, borderRadius: 8, paddingHorizontal: 12, paddingVertical: 9, fontSize: 13, marginBottom: 12 },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 16 },
  chip: { borderWidth: 1, borderColor: COLORS.border, paddingVertical: 5, paddingHorizontal: 12, borderRadius: 14 },
  chipActive: { backgroundColor: COLORS.navy, borderColor: COLORS.navy },
  chipText: { fontSize: 11, fontWeight: '600', color: COLORS.textDark },
  chipTextActive: { color: COLORS.white },
  card: { borderWidth: 1, borderColor: COLORS.border, borderRadius: 8, padding: 12, marginBottom: 10 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardTitle: { fontSize: 13, fontWeight: '700', color: COLORS.textDark },
  cardSubtitle: { fontSize: 11, color: COLORS.textMuted, marginTop: 4 },
  badge: { backgroundColor: COLORS.badgeBlue, paddingHorizontal: 8, paddingVertical: 2, borderRadius: 5 },
  badgeText: { fontSize: 10, color: COLORS.badgeTextBlue, fontWeight: '700' },
});