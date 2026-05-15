import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DonationCenter } from '../../types';
import { Colors } from '../../theme/colors';
import { BorderRadius, Spacing } from '../../theme/spacing';

interface CenterCardProps {
  center: DonationCenter;
  onPress: () => void;
  selected?: boolean;
}

export const CenterCard: React.FC<CenterCardProps> = ({ center, onPress, selected = false }) => (
  <TouchableOpacity
    activeOpacity={0.85}
    onPress={onPress}
    style={[styles.card, selected && styles.selectedCard]}
  >
    <View style={[styles.iconBox, { backgroundColor: center.color + '20' }]}>
      <Ionicons name="business" size={24} color={center.color} />
    </View>
    <View style={styles.info}>
      <Text style={styles.name} numberOfLines={1}>{center.name}</Text>
      <View style={styles.addressRow}>
        <Ionicons name="location-outline" size={13} color={Colors.textLight} />
        <Text style={styles.address}>{center.address}, {center.city}</Text>
      </View>
      <View style={styles.row}>
        <View style={styles.timeRow}>
          <Ionicons name="time-outline" size={12} color={Colors.textLight} />
          <Text style={styles.hours}>{center.openingHours}</Text>
        </View>
        {center.distance && (
          <View style={styles.distancePill}>
            <Text style={styles.distanceText}>{center.distance}</Text>
          </View>
        )}
      </View>
      <View style={styles.typesRow}>
        {center.availableTypes.map((t) => (
          <View key={t} style={[styles.typePill, { backgroundColor: center.color + '15' }]}>
            <Text style={[styles.typeText, { color: center.color }]}>{t}</Text>
          </View>
        ))}
      </View>
    </View>
    <View style={styles.right}>
      <View style={styles.ratingRow}>
        <Ionicons name="star" size={13} color={Colors.accent} />
        <Text style={styles.rating}>{center.rating}</Text>
      </View>
      {selected && (
        <View style={styles.checkWrap}>
          <Ionicons name="checkmark-circle" size={22} color={Colors.primary} />
        </View>
      )}
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 6,
    elevation: 2,
    borderWidth: 1.5,
    borderColor: Colors.transparent,
  },
  selectedCard: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primarySoft + '40',
  },
  iconBox: {
    width: 50,
    height: 50,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.sm,
  },
  info: { flex: 1 },
  name: { fontSize: 15, fontWeight: '700', color: Colors.text, marginBottom: 3 },
  addressRow: { flexDirection: 'row', alignItems: 'center', gap: 3, marginBottom: 3 },
  address: { fontSize: 12, color: Colors.textSecondary },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 },
  timeRow: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  hours: { fontSize: 11, color: Colors.textLight },
  distancePill: {
    backgroundColor: Colors.infoLight,
    borderRadius: BorderRadius.full,
    paddingHorizontal: 7,
    paddingVertical: 2,
  },
  distanceText: { fontSize: 11, fontWeight: '600', color: Colors.info },
  typesRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 4 },
  typePill: { borderRadius: BorderRadius.full, paddingHorizontal: 7, paddingVertical: 2 },
  typeText: { fontSize: 10, fontWeight: '600' },
  right: { alignItems: 'flex-end', justifyContent: 'space-between', marginLeft: Spacing.xs },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 2 },
  rating: { fontSize: 13, fontWeight: '700', color: Colors.text },
  checkWrap: { marginTop: 4 },
});
