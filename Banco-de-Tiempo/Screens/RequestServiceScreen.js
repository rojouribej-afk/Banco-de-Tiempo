// RequestServiceScreen.js
import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { COLORS } from './theme';

export const RequestServiceScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Pedir servicio</Text>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Clases de guitarra básica</Text>
        <Text style={styles.author}>Luis M. · ★ 4.9 · 18 intercambios</Text>

        <Text style={styles.label}>Fecha</Text>
        <TextInput style={styles.input} value="12 oct 2026" editable={false} />

        <Text style={styles.label}>Hora</Text>
        <TextInput style={styles.input} value="10:00" editable={false} />

        <Text style={styles.label}>Horas</Text>
        <TextInput style={styles.input} value="1.5" />

        <Text style={styles.label}>Mensaje</Text>
        <TextInput style={styles.input} placeholder="Hola, soy principiante." placeholderTextColor="#94A3B8" />

        <View style={styles.costRow}>
          <Text style={styles.costLabel}>Costo</Text>
          <Text style={styles.costValue}>1.5 créditos</Text>
        </View>

        <View style={styles.costRow}>
          <Text style={styles.costLabel}>Tu saldo</Text>
          <Text style={styles.costValue}>8.5 créditos</Text>
        </View>

        <TouchableOpacity style={styles.btnSubmit} onPress={() => navigation?.navigate('Home')}>
          <Text style={styles.btnSubmitText}>Enviar solicitud</Text>
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
  title: { fontSize: 18, fontWeight: '800', color: COLORS.navy },
  author: { fontSize: 12, color: COLORS.textMuted, marginBottom: 14, marginTop: 2 },
  label: { fontSize: 11, fontWeight: '600', color: COLORS.textMuted, marginTop: 10, marginBottom: 4 },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 9,
    fontSize: 13,
  },
  costRow: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 8 },
  costLabel: { fontSize: 13, color: COLORS.textMuted },
  costValue: { fontSize: 13, fontWeight: '700', color: COLORS.textDark },
  btnSubmit: {
    backgroundColor: COLORS.wine,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  btnSubmitText: { color: COLORS.white, fontWeight: '700', fontSize: 14 },
});