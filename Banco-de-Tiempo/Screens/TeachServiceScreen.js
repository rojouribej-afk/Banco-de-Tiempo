// TeachServiceScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { COLORS } from './theme';

export const TeachServiceScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Impartir servicio</Text>
      </View>

      <View style={styles.container}>
        <Text style={styles.title}>Clases de guitarra</Text>
        
        {/* Avatar y Cliente */}
        <View style={styles.userRow}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>P</Text>
          </View>
          <View>
            <Text style={styles.userName}>Pablo R.</Text>
            <Text style={styles.userRole}>Cliente</Text>
          </View>
        </View>

        {/* Fila de detalles */}
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Fecha</Text>
          <Text style={styles.detailValue}>Sáb 12 oct · 10:00</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Créditos retenidos</Text>
          <Text style={styles.detailValue}>1.0</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Estado</Text>
          <Text style={[styles.detailValue, { fontWeight: '700' }]}>Programado</Text>
        </View>

        <Text style={styles.helperText}>
          Cuando termines, marca el servicio como impartido para que el cliente pueda pagar.
        </Text>

        <TouchableOpacity style={styles.btnPrimary} onPress={() => navigation?.navigate('Cobrar')}>
          <Text style={styles.btnPrimaryText}>Marcar como impartido</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnOutline} onPress={() => navigation?.goBack()}>
          <Text style={styles.btnOutlineText}>Cancelar intercambio</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.white },
  header: { backgroundColor: COLORS.navy, paddingVertical: 18, alignItems: 'center' },
  headerTitle: { color: COLORS.white, fontSize: 16, fontWeight: '700' },
  container: { padding: 22, flex: 1 },
  title: { fontSize: 18, fontWeight: '800', color: COLORS.navy, marginBottom: 14 },
  userRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 20 },
  avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: COLORS.navy, justifyContent: 'center', alignItems: 'center' },
  avatarText: { color: COLORS.white, fontWeight: '800', fontSize: 16 },
  userName: { fontSize: 14, fontWeight: '700', color: COLORS.textDark },
  userRole: { fontSize: 11, color: COLORS.textMuted },
  detailRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#F1F5F9' },
  detailLabel: { fontSize: 12, color: COLORS.textMuted },
  detailValue: { fontSize: 12, color: COLORS.textDark },
  helperText: { fontSize: 12, color: COLORS.textMuted, marginVertical: 20, lineHeight: 18 },
  btnPrimary: { backgroundColor: COLORS.wine, paddingVertical: 12, borderRadius: 8, alignItems: 'center' },
  btnPrimaryText: { color: COLORS.white, fontSize: 13, fontWeight: '700' },
  btnOutline: { borderWidth: 1.5, borderColor: COLORS.navy, paddingVertical: 11, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  btnOutlineText: { color: COLORS.navy, fontSize: 13, fontWeight: '700' },
});