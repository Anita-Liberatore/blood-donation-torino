import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Donation } from '../../types';
import { Colors } from '../../theme/colors';
import { BorderRadius, Spacing } from '../../theme/spacing';

interface DonationTimelineProps {
  donations: Donation[];
  limit?: number;
}

const typeIcon: Record<string, keyof typeof Ionicons.glyphMap> = {
  'Sangue Intero': 'water',
  'Plasma': 'flask',
  'Piastrine': 'ellipse',
};

const typeColor: Record<string, string> = {
  'Sangue Intero': Colors.primary,
  'Plasma': '#2980B9',
  'Piastrine': '#8E44AD',
};

const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('it-IT', { day: '2-digit', month: 'short', year: 'numeric' });
};

export const DonationTimeline: React.FC<DonationTimelineProps> = ({
  donations,
  limit = 5,
}) => {
  const visible = donations.slice(0, limit);

  return (
    <View>
      {visible.map((donation, idx) => {
        const color = typeColor[donation.donationType] ?? Colors.primary;
        const icon = typeIcon[donation.donationType] ?? 'water';
        const isLast = idx === visible.length - 1;

        return (
          <View key={donation.id} style={styles.item}>
            <View style={styles.left}>
              <View style={[styles.dot, { backgroundColor: color }]}>
                <Ionicons name={icon} size={12} color={Colors.white} />
              </View>
              {!isLast && <View style={styles.line} />}
            </View>
            <View style={[styles.content, isLast && styles.contentLast]}>
              <View style={styles.row}>
                <Text style={styles.type}>{donation.donationType}</Text>
                <Text style={styles.volume}>{donation.volume}</Text>
              </View>
              <Text style={styles.center}>{donation.centerName}</Text>
              <Text style={styles.date}>{formatDate(donation.date)}</Text>
            </View>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  left: { alignItems: 'center', width: 28 },
  dot: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  line: {
    width: 2,
    flex: 1,
    backgroundColor: Colors.border,
    marginVertical: 2,
    minHeight: 16,
  },
  content: {
    flex: 1,
    paddingBottom: Spacing.md,
    paddingTop: 3,
  },
  contentLast: { paddingBottom: 0 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  type: { fontSize: 14, fontWeight: '600', color: Colors.text },
  volume: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.primary,
    backgroundColor: Colors.primarySoft,
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: BorderRadius.full,
  },
  center: { fontSize: 12, color: Colors.textSecondary, marginTop: 2 },
  date: { fontSize: 11, color: Colors.textLight, marginTop: 1 },
});
