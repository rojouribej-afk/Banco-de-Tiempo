// AdminEditUserScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { COLORS } from './theme';

export const AdminEditUserScreen = () => {
  const [status, setStatus] = useState('Activo');

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.headerAdmin}>
        <Text style={styles.headerTitle}>Editar usuario</Text>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.userHead}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>A</Text>
          </View>
          <View>
            <Text style={styles.userName}>Ana López</Text>
            <Text style={styles.userEmail}>ana@correo.com</Text>
          </View>
        </View>

        <Text style={styles.label}>Nombre</Text>
        <TextInput style={styles.input} value="Ana López" />

        <Text style={styles.label}>Contraseña</Text>
        <TextInput style={styles.input} placeholder="Restablecer contraseña" placeholderTextColor="#94A3B8" />

        <Text style={styles.label}>Habilidades</Text>
        <View style={styles.chipRow}>
          <View style={[styles.chip, styles.chipNavy]}>
            <Text style={styles.chipWhiteText}>Guitarra</Text>
          </View>
          <View style={styles.chip}>
            <Text style={styles.chipText}>Inglés</Text>
          </View>
          <View style={styles.chip}>
            <Text style={styles.chipText}>+</Text>
          </View>
        </View>

        {/* Selector de estado: Activo / Suspendido / Baja */}
        <View style={styles.statusRow}>
          {['Activo', 'Suspendido', 'Baja'].map((item) => (
            <TouchableOpacity 
              key={item} 
              style={[styles.statusBtn, status === item && styles.statusBtnActive]}
              onPress={() => setStatus(item)}
            >
              <Text style={[styles.statusText, status === item && styles.statusTextActive]}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.btnPrimary}>
          <Text style={styles.btnPrimaryText}>Guardar cambios</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnOutline}>
          <Text style={styles.btnOutlineText}>Hacer administrador</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.white },
  headerAdmin: { backgroundColor: COLORS.wine, paddingVertical: 18, alignItems: 'center' },
  headerTitle: { color: COLORS.white, fontSize: 16, fontWeight: '700' },
  container: { padding: 22 },
  userHead: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 16 },
  avatar: { width: 44, height: 44, borderRadius: 22, backgroundColor: COLORS.navy, justifyContent: 'center', alignItems: 'center' },
  avatarText: { color: COLORS.white, fontWeight: '800', fontSize: 18 },
  userName: { fontSize: 15, fontWeight: '800', color: COLORS.navy },
  userEmail: { fontSize: 11, color: COLORS.textMuted },
  label: { fontSize: 11, fontWeight: '600', color: COLORS.textMuted, marginTop: 10, marginBottom: 4 },
  input: { borderWidth: 1, borderColor: COLORS.border, borderRadius: 8, paddingHorizontal: 12, paddingVertical: 8, fontSize: 13 },
  chipRow: { flexDirection: 'row', gap: 6, marginVertical: 8 },
  chip: { borderWidth: 1, borderColor: COLORS.border, paddingVertical: 5, paddingHorizontal: 12, borderRadius: 14 },
  chipNavy: { backgroundColor: COLORS.navy, borderColor: COLORS.navy },
  chipText: { fontSize: 11, fontWeight: '600', color: COLORS.textDark },
  chipWhiteText: { fontSize: 11, fontWeight: '600', color: COLORS.white },
  statusRow: { flexDirection: 'row', borderWidth: 1, borderColor: COLORS.border, borderRadius: 8, marginVertical: 14, overflow: 'hidden' },
  statusBtn: { flex: 1, paddingVertical: 8, alignItems: 'center', backgroundColor: COLORS.white },
  statusBtnActive: { backgroundColor: COLORS.navy },
  statusText: { fontSize: 11, fontWeight: '700', color: COLORS.textDark },
  statusTextActive: { color: COLORS.white },
  btnPrimary: { backgroundColor: COLORS.wine, paddingVertical: 12, borderRadius: 8, alignItems: 'center', marginTop: 8 },
  btnPrimaryText: { color: COLORS.white, fontSize: 13, fontWeight: '700' },
  btnOutline: { borderWidth: 1.5, borderColor: COLORS.navy, paddingVertical: 11, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  btnOutlineText: { color: COLORS.navy, fontSize: 13, fontWeight: '700' },
});