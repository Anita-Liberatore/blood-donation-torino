import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { TimeSlot } from '../../types';
import { Colors } from '../../theme/colors';
import { BorderRadius, Spacing } from '../../theme/spacing';

interface TimeSlotPickerProps {
  slots: TimeSlot[];
  selected: string | null;
  onSelect: (slotId: string) => void;
}

export const TimeSlotPicker: React.FC<TimeSlotPickerProps> = ({ slots, selected, onSelect }) => (
  <View style={styles.grid}>
    {slots.map((slot) => {
      const isSelected = selected === slot.id;
      return (
        <TouchableOpacity
          key={slot.id}
          onPress={() => slot.available && onSelect(slot.id)}
          activeOpacity={slot.available ? 0.8 : 1}
          style={[
            styles.slot,
            !slot.available && styles.slotUnavailable,
            isSelected && styles.slotSelected,
          ]}
        >
          <Text
            style={[
              styles.slotText,
              !slot.available && styles.slotTextUnavailable,
              isSelected && styles.slotTextSelected,
            ]}
          >
            {slot.time}
          </Text>
          {!slot.available && <Text style={styles.occupatoText}>Occupato</Text>}
        </TouchableOpacity>
      );
    })}
  </View>
);

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  slot: {
    width: '30%',
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderWidth: 1.5,
    borderColor: Colors.border,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 1,
  },
  slotUnavailable: {
    backgroundColor: Colors.borderLight,
    borderColor: Colors.borderLight,
    opacity: 0.6,
  },
  slotSelected: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  slotText: { fontSize: 15, fontWeight: '700', color: Colors.text },
  slotTextUnavailable: { color: Colors.textLight, fontWeight: '500' },
  slotTextSelected: { color: Colors.white },
  occupatoText: { fontSize: 9, color: Colors.textLight, marginTop: 1, fontWeight: '500' },
});
