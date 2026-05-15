import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '../common/Card';
import { Colors } from '../../theme/colors';
import { Spacing, BorderRadius } from '../../theme/spacing';

interface StatItem {
  icon: keyof typeof Ionicons.glyphMap;
  value: string;
  label: string;
  iconBg: string;
  iconColor: string;
}

interface StatsRowProps {
  totalDonations: number;
  lifesSaved: number;
  nextEligibleDate: string;
}

const daysUntil = (dateStr: string): number => {
  const today = new Date();
  const target = new Date(dateStr);
  const diff = Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  return Math.max(0, diff);
};

export const StatsRow: React.FC<StatsRowProps> = ({ totalDonations, lifesSaved, nextEligibleDate }) => {
  const days = daysUntil(nextEligibleDate);
  const stats: StatItem[] = [
    {
      icon: 'water',
      value: String(totalDonations),
      label: 'Donazioni',
      iconBg: Colors.primarySoft,
      iconColor: Colors.primary,
    },
    {
      icon: 'heart',
      value: String(lifesSaved),
      label: 'Vite salvate',
      iconBg: '#FDEBD0',
      iconColor: Colors.warning,
    },
    {
      icon: 'time',
      value: days === 0 ? 'Oggi' : `${days}gg`,
      label: 'Alla donaz.',
      iconBg: Colors.successLight,
      iconColor: Colors.success,
    },
  ];

  return (
    <View style={styles.container}>
      {stats.map((stat, i) => (
        <Card key={i} style={styles.card} padding={Spacing.md}>
          <View style={[styles.iconWrap, { backgroundColor: stat.iconBg }]}>
            <Ionicons name={stat.icon} size={18} color={stat.iconColor} />
          </View>
          <Text style={styles.value}>{stat.value}</Text>
          <Text style={styles.label}>{stat.label}</Text>
        </Card>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginHorizontal: Spacing.md,
  },
  card: {
    flex: 1,
    alignItems: 'center',
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.xs,
  },
  value: { fontSize: 20, fontWeight: '800', color: Colors.text, marginBottom: 2 },
  label: { fontSize: 11, color: Colors.textSecondary, fontWeight: '500', textAlign: 'center' },
});
