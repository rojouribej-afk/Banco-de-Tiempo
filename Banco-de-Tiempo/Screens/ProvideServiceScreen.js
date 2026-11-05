// ProvideServiceScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { COLORS } from './theme';

export const ProvideServiceScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Brindar servicio</Text>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.sectionTitle}>Solicitudes recibidas</Text>
        
        {/* Card solicitud recibida */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Inglés para viajar</Text>
            <View style={styles.badgeGray}>
              <Text style={styles.badgeGrayText}>Pendiente</Text>
            </View>
          </View>
          <Text style={styles.cardSubtitle}>Pablo R. · 15 oct · 1.5 h</Text>

          <View style={styles.btnRow}>
            <TouchableOpacity 
              style={[styles.btnAction, { backgroundColor: COLORS.wine }]} 
              onPress={() => navigation?.navigate('Impartir')}
            >
              <Text style={styles.btnActionWhiteText}>Aceptar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.btnAction, styles.btnActionOutline]}>
              <Text style={styles.btnActionNavyText}>Rechazar</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={[styles.sectionTitle, { marginTop: 14 }]}>Mis servicios</Text>
        
        {/* Mis servicios listado */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Clases de guitarra</Text>
            <View style={styles.badgeActive}>
              <Text style={styles.badgeActiveText}>Activo</Text>
            </View>
          </View>
          <Text style={styles.cardSubtitle}>1 h · Presencial</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Inglés para viajar</Text>
            <View style={styles.badgeActive}>
              <Text style={styles.badgeActiveText}>Activo</Text>
            </View>
          </View>
          <Text style={styles.cardSubtitle}>1.5 h · Virtual</Text>
        </View>

        <TouchableOpacity 
          style={styles.btnUpload} 
          onPress={() => navigation?.navigate('SubirServicio')}
        >
          <Text style={styles.btnUploadText}>+ Subir servicio</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.white },
  header: { backgroundColor: COLORS.navy, paddingVertical: 18, alignItems: 'center' },
  headerTitle: { color: COLORS.white, fontSize: 16, fontWeight: '700' },
  container: { padding: 20 },
  sectionTitle: { fontSize: 16, fontWeight: '800', color: COLORS.navy, marginBottom: 12 },
  card: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    padding: 14,
    marginBottom: 10,
    backgroundColor: COLORS.white,
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardTitle: { fontSize: 14, fontWeight: '700', color: COLORS.textDark },
  cardSubtitle: { fontSize: 11, color: COLORS.textMuted, marginVertical: 6 },
  badgeGray: { backgroundColor: '#E2E8F0', paddingHorizontal: 7, paddingVertical: 2, borderRadius: 5 },
  badgeGrayText: { fontSize: 10, color: COLORS.textMuted, fontWeight: '600' },
  badgeActive: { backgroundColor: COLORS.badgeBlue, paddingHorizontal: 7, paddingVertical: 2, borderRadius: 5 },
  badgeActiveText: { fontSize: 10, color: COLORS.badgeTextBlue, fontWeight: '600' },
  btnRow: { flexDirection: 'row', gap: 10, marginTop: 8 },
  btnAction: { flex: 1, paddingVertical: 8, borderRadius: 6, alignItems: 'center' },
  btnActionWhiteText: { color: COLORS.white, fontWeight: '700', fontSize: 12 },
  btnActionOutline: { borderWidth: 1.5, borderColor: COLORS.navy },
  btnActionNavyText: { color: COLORS.navy, fontWeight: '700', fontSize: 12 },
  btnUpload: { backgroundColor: COLORS.wine, paddingVertical: 12, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  btnUploadText: { color: COLORS.white, fontWeight: '700', fontSize: 14 },
});