import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../theme/colors';
import { BorderRadius, Spacing } from '../../theme/spacing';

interface EmergencyBannerProps {
  bloodType: string;
  onPress?: () => void;
}

export const EmergencyBanner: React.FC<EmergencyBannerProps> = ({ bloodType, onPress }) => (
  <TouchableOpacity activeOpacity={0.85} onPress={onPress} style={styles.container}>
    <View style={styles.iconWrap}>
      <Ionicons name="alert-circle" size={24} color={Colors.white} />
    </View>
    <View style={styles.textWrap}>
      <Text style={styles.title}>Urgenza sangue {bloodType}!</Text>
      <Text style={styles.subtitle}>L'Ospedale Molinette ha bisogno di donatori</Text>
    </View>
    <Ionicons name="chevron-forward" size={18} color="rgba(255,255,255,0.8)" />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    marginHorizontal: Spacing.md,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    gap: Spacing.sm,
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.md,
    backgroundColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textWrap: { flex: 1 },
  title: { fontSize: 14, fontWeight: '700', color: Colors.white },
  subtitle: { fontSize: 12, color: 'rgba(255,255,255,0.8)', marginTop: 2 },
});
