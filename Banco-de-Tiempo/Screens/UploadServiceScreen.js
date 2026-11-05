// UploadServiceScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { COLORS } from './theme';

export const UploadServiceScreen = ({ navigation }) => {
  const [modalidad, setModalidad] = useState('presencial');

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Subir servicio</Text>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.label}>Título</Text>
        <TextInput style={styles.input} placeholder="Clases de guitarra básica" placeholderTextColor="#94A3B8" />

        <Text style={styles.label}>Categoría</Text>
        <TextInput style={styles.input} placeholder="Música" placeholderTextColor="#94A3B8" />

        <Text style={styles.label}>Descripción</Text>
        <TextInput 
          style={[styles.input, styles.textArea]} 
          multiline 
          numberOfLines={3} 
          placeholder="Acordes y ritmos para empezar..." 
          placeholderTextColor="#94A3B8" 
        />

        <Text style={styles.label}>Duración (horas)</Text>
        <TextInput style={styles.input} placeholder="1.0" keyboardType="numeric" placeholderTextColor="#94A3B8" />

        {/* Toggle Presencial / Virtual */}
        <View style={styles.toggleRow}>
          <TouchableOpacity 
            style={[styles.toggleBtn, modalidad === 'presencial' && styles.toggleBtnActive]}
            onPress={() => setModalidad('presencial')}
          >
            <Text style={[styles.toggleText, modalidad === 'presencial' && styles.toggleTextActive]}>Presencial</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.toggleBtn, modalidad === 'virtual' && styles.toggleBtnActive]}
            onPress={() => setModalidad('virtual')}
          >
            <Text style={[styles.toggleText, modalidad === 'virtual' && styles.toggleTextActive]}>Virtual</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Disponibilidad</Text>
        <TextInput style={styles.input} placeholder="Sábados 10:00-14:00" placeholderTextColor="#94A3B8" />

        <TouchableOpacity style={styles.btnPrimary} onPress={() => navigation?.goBack()}>
          <Text style={styles.btnPrimaryText}>Subir servicio</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.white },
  header: { backgroundColor: COLORS.navy, paddingVertical: 18, alignItems: 'center' },
  headerTitle: { color: COLORS.white, fontSize: 16, fontWeight: '700' },
  container: { padding: 22 },
  label: { fontSize: 11, fontWeight: '600', color: COLORS.textMuted, marginTop: 10, marginBottom: 4 },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 9,
    fontSize: 13,
  },
  textArea: { height: 65, textAlignVertical: 'top' },
  toggleRow: { flexDirection: 'row', borderWidth: 1, borderColor: COLORS.navy, borderRadius: 8, marginVertical: 12, overflow: 'hidden' },
  toggleBtn: { flex: 1, paddingVertical: 9, alignItems: 'center', backgroundColor: COLORS.white },
  toggleBtnActive: { backgroundColor: COLORS.navy },
  toggleText: { fontSize: 12, fontWeight: '700', color: COLORS.navy },
  toggleTextActive: { color: COLORS.white },
  btnPrimary: { backgroundColor: COLORS.wine, paddingVertical: 12, borderRadius: 8, alignItems: 'center', marginTop: 14 },
  btnPrimaryText: { color: COLORS.white, fontSize: 14, fontWeight: '700' },
});