import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DonorLevel } from '../../types';
import { ProgressBar } from '../common/ProgressBar';
import { Colors } from '../../theme/colors';
import { BorderRadius, Spacing } from '../../theme/spacing';

interface DonorBadgeProps {
  level: DonorLevel;
  totalDonations: number;
}

const levelConfig: Record<DonorLevel, {
  color: string;
  bg: string;
  icon: keyof typeof Ionicons.glyphMap;
  threshold: number;
  nextLevel: DonorLevel | null;
  nextThreshold: number;
  description: string;
}> = {
  Base: {
    color: '#95A5A6',
    bg: '#ECF0F1',
    icon: 'water-outline',
    threshold: 0,
    nextLevel: 'Periodico',
    nextThreshold: 5,
    description: 'Benvenuto tra i donatori!',
  },
  Periodico: {
    color: Colors.accent,
    bg: Colors.accentLight,
    icon: 'ribbon',
    threshold: 5,
    nextLevel: 'Benemerito',
    nextThreshold: 15,
    description: 'Donatore regolare e affidabile',
  },
  Benemerito: {
    color: Colors.gold,
    bg: Colors.goldLight,
    icon: 'medal',
    threshold: 15,
    nextLevel: "D'Oro",
    nextThreshold: 25,
    description: 'Donatore di grande valore',
  },
  "D'Oro": {
    color: '#F1C40F',
    bg: '#FEFCBF',
    icon: 'trophy',
    threshold: 25,
    nextLevel: null,
    nextThreshold: 999,
    description: 'Il massimo riconoscimento!',
  },
};

export const DonorBadge: React.FC<DonorBadgeProps> = ({ level, totalDonations }) => {
  const config = levelConfig[level];
  const progress = config.nextLevel
    ? (totalDonations - config.threshold) / (config.nextThreshold - config.threshold)
    : 1;
  const remaining = config.nextLevel ? config.nextThreshold - totalDonations : 0;

  return (
    <View style={[styles.card, { borderColor: config.color + '50' }]}>
      <View style={styles.row}>
        <View style={[styles.iconBubble, { backgroundColor: config.bg }]}>
          <Ionicons name={config.icon} size={28} color={config.color} />
        </View>
        <View style={styles.textBlock}>
          <Text style={styles.levelLabel}>Livello donatore</Text>
          <Text style={[styles.levelName, { color: config.color }]}>{level}</Text>
          <Text style={styles.description}>{config.description}</Text>
        </View>
      </View>

      {config.nextLevel && (
        <View style={styles.progressBlock}>
          <ProgressBar
            progress={progress}
            color={config.color}
            height={7}
            showPercent={false}
          />
          <Text style={styles.progressText}>
            {remaining} donazioni al livello <Text style={{ fontWeight: '700', color: config.color }}>
              {config.nextLevel}
            </Text>
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    borderWidth: 1.5,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 2,
  },
  row: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md, marginBottom: Spacing.md },
  iconBubble: {
    width: 60,
    height: 60,
    borderRadius: BorderRadius.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textBlock: { flex: 1 },
  levelLabel: { fontSize: 11, fontWeight: '600', color: Colors.textLight, letterSpacing: 0.5, textTransform: 'uppercase' },
  levelName: { fontSize: 20, fontWeight: '800', marginVertical: 2 },
  description: { fontSize: 13, color: Colors.textSecondary },
  progressBlock: { gap: 6 },
  progressText: { fontSize: 12, color: Colors.textSecondary },
});
