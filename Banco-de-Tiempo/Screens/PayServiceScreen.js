// PayServiceScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { COLORS } from './theme';

export const PayServiceScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Pagar servicio</Text>
      </View>

      <View style={styles.container}>
        <Text style={styles.title}>Confirma y paga</Text>

        {/* Info del prestador */}
        <View style={styles.userRow}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>L</Text>
          </View>
          <View>
            <Text style={styles.userName}>Luis M.</Text>
            <Text style={styles.userRole}>Marcó el servicio como impartido</Text>
          </View>
        </View>

        {/* Tabla resumen */}
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Servicio</Text>
          <Text style={styles.detailValue}>Clases de guitarra</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Duración</Text>
          <Text style={styles.detailValue}>1.5 horas</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Créditos retenidos</Text>
          <Text style={styles.detailValue}>1.5</Text>
        </View>

        <Text style={styles.helperText}>Al pagar, los créditos pasan a Luis.</Text>

        <TouchableOpacity 
          style={styles.btnPrimary} 
          onPress={() => navigation?.navigate('Calificar')}
        >
          <Text style={styles.btnPrimaryText}>Pagar 1.5 créditos</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnOutline}>
          <Text style={styles.btnOutlineText}>Reportar un problema</Text>
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
  detailRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 11, borderBottomWidth: 1, borderBottomColor: '#F1F5F9' },
  detailLabel: { fontSize: 12, color: COLORS.textMuted },
  detailValue: { fontSize: 12, fontWeight: '600', color: COLORS.textDark },
  helperText: { fontSize: 11, color: COLORS.textMuted, marginVertical: 18 },
  btnPrimary: { backgroundColor: COLORS.wine, paddingVertical: 12, borderRadius: 8, alignItems: 'center' },
  btnPrimaryText: { color: COLORS.white, fontSize: 14, fontWeight: '700' },
  btnOutline: { borderWidth: 1.5, borderColor: COLORS.navy, paddingVertical: 11, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  btnOutlineText: { color: COLORS.navy, fontSize: 13, fontWeight: '700' },
});