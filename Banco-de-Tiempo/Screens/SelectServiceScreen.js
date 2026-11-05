// SelectServiceScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { COLORS } from './theme';

export const SelectServiceScreen = ({ navigation }) => {
  const [selectedTag, setSelectedTag] = useState('Todas');
  const services = [
    { id: 1, title: 'Clases de guitarra', author: 'Luis M.', rating: '4.9', duration: '1 h', fav: false },
    { id: 2, title: 'Reparar laptop', author: 'Gael P.', rating: '4.6', duration: '2 h', fav: false },
    { id: 3, title: 'Pan casero', author: 'Aida H.', rating: '5.0', duration: '1 h', fav: true },
    { id: 4, title: 'Diseño de carteles', author: 'Karen S.', rating: '4.7', duration: '1.5 h', fav: false },
  ];

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Solicitar servicio</Text>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <TextInput style={styles.searchInput} placeholder="Buscar servicios" placeholderTextColor="#94A3B8" />

        {/* Chips de filtro */}
        <View style={styles.tagRow}>
          {['Todas', 'Música', 'Idiomas', 'Tech'].map((tag) => (
            <TouchableOpacity 
              key={tag} 
              style={[styles.tag, selectedTag === tag && styles.tagActive]}
              onPress={() => setSelectedTag(tag)}
            >
              <Text style={[styles.tagText, selectedTag === tag && styles.tagTextActive]}>{tag}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Lista de servicios */}
        {services.map((item) => (
          <TouchableOpacity 
            key={item.id} 
            style={styles.serviceCard}
            onPress={() => navigation?.navigate('PedirServicio')}
          >
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={{ fontSize: 16 }}>{item.fav ? '💙' : '🤍'}</Text>
            </View>
            <Text style={styles.cardSubtitle}>{item.author} · ★ {item.rating} · {item.duration}</Text>
          </TouchableOpacity>
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
  searchInput: { borderWidth: 1, borderColor: COLORS.border, borderRadius: 8, paddingHorizontal: 12, paddingVertical: 9, fontSize: 13, marginBottom: 12 },
  tagRow: { flexDirection: 'row', gap: 6, marginBottom: 16 },
  tag: { borderWidth: 1, borderColor: COLORS.border, paddingVertical: 5, paddingHorizontal: 12, borderRadius: 14 },
  tagActive: { backgroundColor: COLORS.navy, borderColor: COLORS.navy },
  tagText: { fontSize: 11, fontWeight: '600', color: COLORS.textDark },
  tagTextActive: { color: COLORS.white },
  serviceCard: { borderWidth: 1, borderColor: COLORS.border, borderRadius: 8, padding: 12, marginBottom: 10 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardTitle: { fontSize: 13, fontWeight: '700', color: COLORS.textDark },
  cardSubtitle: { fontSize: 11, color: COLORS.textMuted, marginTop: 4 },
});