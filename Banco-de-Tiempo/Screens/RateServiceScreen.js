// RateServiceScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { COLORS } from './theme';

export const RateServiceScreen = ({ navigation }) => {
  const [rating, setRating] = useState(4);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Calificar</Text>
      </View>

      <View style={styles.container}>
        <Text style={styles.title}>¿Cómo estuvo el servicio?</Text>

        <View style={styles.userRow}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>L</Text>
          </View>
          <View>
            <Text style={styles.userName}>Luis M.</Text>
            <Text style={styles.userRole}>Clases de guitarra</Text>
          </View>
        </View>

        {/* Calificación de Estrellas */}
        <View style={styles.starsRow}>
          {[1, 2, 3, 4, 5].map((star) => (
            <TouchableOpacity key={star} onPress={() => setRating(star)}>
              <Text style={styles.starIcon}>{star <= rating ? '⭐' : '☆'}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Comentario</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Muy paciente y claro." 
          placeholderTextColor="#94A3B8" 
        />

        <TouchableOpacity style={styles.btnPrimary} onPress={() => navigation?.navigate('Historial')}>
          <Text style={styles.btnPrimaryText}>Enviar calificación</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnOutline} onPress={() => navigation?.navigate('Home')}>
          <Text style={styles.btnOutlineText}>Ahora no</Text>
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
  userRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 16 },
  avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: COLORS.navy, justifyContent: 'center', alignItems: 'center' },
  avatarText: { color: COLORS.white, fontWeight: '800', fontSize: 16 },
  userName: { fontSize: 14, fontWeight: '700', color: COLORS.textDark },
  userRole: { fontSize: 11, color: COLORS.textMuted },
  starsRow: { flexDirection: 'row', justifyContent: 'center', gap: 8, marginVertical: 14 },
  starIcon: { fontSize: 28 },
  label: { fontSize: 11, fontWeight: '600', color: COLORS.textMuted, marginBottom: 4 },
  input: { borderWidth: 1, borderColor: COLORS.border, borderRadius: 8, paddingHorizontal: 12, paddingVertical: 9, fontSize: 13, marginBottom: 18 },
  btnPrimary: { backgroundColor: COLORS.wine, paddingVertical: 12, borderRadius: 8, alignItems: 'center' },
  btnPrimaryText: { color: COLORS.white, fontSize: 14, fontWeight: '700' },
  btnOutline: { borderWidth: 1.5, borderColor: COLORS.navy, paddingVertical: 11, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  btnOutlineText: { color: COLORS.navy, fontSize: 13, fontWeight: '700' },
});