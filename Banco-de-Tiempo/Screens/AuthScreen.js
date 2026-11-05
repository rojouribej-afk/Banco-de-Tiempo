// AuthScreens.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { COLORS } from './theme';

export const RegisterScreen = ({ navigation }) => {
  const [skills, setSkills] = useState(['Guitarra', 'Inglés']);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Registro</Text>
      </View>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Crea tu cuenta</Text>
        
        <Text style={styles.label}>Nombre completo</Text>
        <TextInput style={styles.input} placeholder="Ana López" placeholderTextColor="#94A3B8" />

        <Text style={styles.label}>Correo</Text>
        <TextInput style={styles.input} placeholder="ana@correo.com" keyboardType="email-address" placeholderTextColor="#94A3B8" />

        <Text style={styles.label}>Teléfono</Text>
        <TextInput style={styles.input} placeholder="442 123 4567" keyboardType="phone-pad" placeholderTextColor="#94A3B8" />

        <Text style={styles.label}>Contraseña</Text>
        <TextInput style={styles.input} placeholder="••••••••" secureTextEntry placeholderTextColor="#94A3B8" />

        <Text style={styles.label}>Tus habilidades</Text>
        <View style={styles.chipRow}>
          <TouchableOpacity style={[styles.chip, styles.chipActive]}>
            <Text style={styles.chipTextActive}>Guitarra</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.chip}>
            <Text style={styles.chipText}>Inglés</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.chip}>
            <Text style={styles.chipText}>+ Agregar</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.btnPrimary} onPress={() => navigation?.navigate('Home')}>
          <Text style={styles.btnPrimaryText}>Registrarme</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnOutline} onPress={() => navigation?.navigate('Login')}>
          <Text style={styles.btnOutlineText}>Ya tengo cuenta</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export const LoginScreen = ({ navigation }) => (
  <SafeAreaView style={styles.safe}>
    <View style={styles.header}>
      <Text style={styles.headerTitle}>Banco de Tiempo y Talento</Text>
    </View>
    <View style={[styles.container, { justifyContent: 'center' }]}>
      <Text style={styles.title}>Bienvenido</Text>
      <Text style={styles.subtitle}>Intercambia tu tiempo, no tu dinero.</Text>

      <Text style={styles.label}>Usuario (correo)</Text>
      <TextInput style={styles.input} placeholder="ana@correo.com" placeholderTextColor="#94A3B8" />

      <Text style={styles.label}>Contraseña</Text>
      <TextInput style={styles.input} placeholder="••••••••" secureTextEntry placeholderTextColor="#94A3B8" />

      <TouchableOpacity style={styles.btnPrimary} onPress={() => navigation?.navigate('Home')}>
        <Text style={styles.btnPrimaryText}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btnOutline} onPress={() => navigation?.navigate('Register')}>
        <Text style={styles.btnOutlineText}>Crear cuenta</Text>
      </TouchableOpacity>

      <Text style={styles.footerNote}>Clientes y administradores entran aquí.</Text>
    </View>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.white },
  header: {
    backgroundColor: COLORS.navy,
    paddingVertical: 18,
    alignItems: 'center',
  },
  headerTitle: { color: COLORS.white, fontSize: 16, fontWeight: '700' },
  container: { padding: 22, flexGrow: 1 },
  title: { fontSize: 20, fontWeight: '800', color: COLORS.navy, marginBottom: 4 },
  subtitle: { fontSize: 13, color: COLORS.textMuted, marginBottom: 18 },
  label: { fontSize: 12, fontWeight: '600', color: COLORS.textMuted, marginTop: 10, marginBottom: 5 },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: COLORS.textDark,
  },
  chipRow: { flexDirection: 'row', gap: 8, marginTop: 6, marginBottom: 16 },
  chip: {
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 16,
  },
  chipActive: { backgroundColor: COLORS.navy, borderColor: COLORS.navy },
  chipText: { fontSize: 12, color: COLORS.textDark, fontWeight: '600' },
  chipTextActive: { fontSize: 12, color: COLORS.white, fontWeight: '600' },
  btnPrimary: {
    backgroundColor: COLORS.wine,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 18,
  },
  btnPrimaryText: { color: COLORS.white, fontSize: 14, fontWeight: '700' },
  btnOutline: {
    borderWidth: 1.5,
    borderColor: COLORS.navy,
    paddingVertical: 11,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  btnOutlineText: { color: COLORS.navy, fontSize: 14, fontWeight: '700' },
  footerNote: { fontSize: 11, color: COLORS.textMuted, textAlign: 'center', marginTop: 16 },
});