import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { BloodType, DonorLevel } from '../../types';
import { Colors } from '../../theme/colors';
import { BorderRadius, Spacing } from '../../theme/spacing';

interface BloodTypeCardProps {
  bloodType: BloodType;
  donorLevel: DonorLevel;
  totalDonations: number;
  firstName: string;
}

const levelColors: Record<DonorLevel, string> = {
  Base: '#95A5A6',
  Periodico: Colors.accent,
  Benemerito: Colors.gold,
  "D'Oro": '#F1C40F',
};

export const BloodTypeCard: React.FC<BloodTypeCardProps> = ({
  bloodType,
  donorLevel,
  totalDonations,
  firstName,
}) => (
  <LinearGradient
    colors={[Colors.primaryDark, Colors.primary, Colors.primaryLight]}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 1 }}
    style={styles.gradient}
  >
    <View style={styles.topRow}>
      <View>
        <Text style={styles.greeting}>Ciao, {firstName}!</Text>
        <Text style={styles.subtitle}>Grazie per il tuo contributo</Text>
      </View>
      <View style={styles.dropContainer}>
        <Ionicons name="water" size={20} color="rgba(255,255,255,0.3)" />
      </View>
    </View>

    <View style={styles.bottomRow}>
      <View style={styles.bloodTypeWrapper}>
        <View style={styles.bloodTypeBubble}>
          <Ionicons name="water" size={16} color={Colors.primary} />
          <Text style={styles.bloodTypeText}>{bloodType}</Text>
        </View>
        <Text style={styles.bloodTypeLabel}>Gruppo Sanguigno</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.statsItem}>
        <Text style={styles.statsValue}>{totalDonations}</Text>
        <Text style={styles.statsLabel}>Donazioni</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.levelWrapper}>
        <View style={[styles.levelBadge, { backgroundColor: levelColors[donorLevel] }]}>
          <Ionicons name="ribbon" size={12} color={Colors.white} />
          <Text style={styles.levelText}>{donorLevel}</Text>
        </View>
        <Text style={styles.statsLabel}>Livello</Text>
      </View>
    </View>
  </LinearGradient>
);

const styles = StyleSheet.create({
  gradient: {
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    marginHorizontal: Spacing.md,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.lg,
  },
  greeting: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.white,
    letterSpacing: -0.3,
  },
  subtitle: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.75)',
    marginTop: 2,
  },
  dropContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0,0,0,0.15)',
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
  },
  bloodTypeWrapper: { alignItems: 'center' },
  bloodTypeBubble: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.full,
    paddingHorizontal: 10,
    paddingVertical: 5,
    gap: 4,
    marginBottom: 4,
  },
  bloodTypeText: { fontSize: 16, fontWeight: '800', color: Colors.primary },
  bloodTypeLabel: { fontSize: 11, color: 'rgba(255,255,255,0.7)', fontWeight: '500' },
  divider: { width: 1, height: 36, backgroundColor: 'rgba(255,255,255,0.2)' },
  statsItem: { alignItems: 'center' },
  statsValue: { fontSize: 22, fontWeight: '800', color: Colors.white },
  statsLabel: { fontSize: 11, color: 'rgba(255,255,255,0.7)', fontWeight: '500', marginTop: 2 },
  levelWrapper: { alignItems: 'center' },
  levelBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: BorderRadius.full,
    paddingHorizontal: 8,
    paddingVertical: 4,
    gap: 3,
    marginBottom: 4,
  },
  levelText: { fontSize: 12, fontWeight: '700', color: Colors.white },
});
