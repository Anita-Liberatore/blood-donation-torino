import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Booking } from '../../types';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { Colors } from '../../theme/colors';
import { Spacing, BorderRadius } from '../../theme/spacing';

interface NextAppointmentCardProps {
  booking: Booking | null;
  onPress?: () => void;
  onBook?: () => void;
}

const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('it-IT', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

export const NextAppointmentCard: React.FC<NextAppointmentCardProps> = ({
  booking,
  onPress,
  onBook,
}) => {
  if (!booking) {
    return (
      <Card style={styles.card}>
        <View style={styles.emptyRow}>
          <View style={styles.emptyIcon}>
            <Ionicons name="calendar-outline" size={28} color={Colors.textLight} />
          </View>
          <View style={styles.emptyText}>
            <Text style={styles.emptyTitle}>Nessuna prenotazione</Text>
            <Text style={styles.emptySubtitle}>Prenota il tuo prossimo appuntamento</Text>
          </View>
          <TouchableOpacity style={styles.bookBtn} onPress={onBook} activeOpacity={0.8}>
            <Text style={styles.bookBtnText}>Prenota</Text>
          </TouchableOpacity>
        </View>
      </Card>
    );
  }

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
      <Card style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.sectionLabel}>PROSSIMO APPUNTAMENTO</Text>
          <Badge label="Confermata" variant="success" dot />
        </View>

        <View style={styles.row}>
          <View style={[styles.iconBox, { backgroundColor: Colors.primarySoft }]}>
            <Ionicons name="calendar" size={22} color={Colors.primary} />
          </View>
          <View style={styles.info}>
            <Text style={styles.dateText}>{formatDate(booking.date)}</Text>
            <Text style={styles.timeText}>Ore {booking.time}</Text>
          </View>
        </View>

        <View style={styles.separator} />

        <View style={styles.row}>
          <View style={[styles.iconBox, { backgroundColor: Colors.infoLight }]}>
            <Ionicons name="location" size={22} color={Colors.info} />
          </View>
          <View style={styles.info}>
            <Text style={styles.centerName}>{booking.centerName}</Text>
            <Text style={styles.centerAddress}>{booking.centerAddress}</Text>
          </View>
        </View>

        <View style={styles.typePill}>
          <Ionicons name="water-outline" size={13} color={Colors.primary} />
          <Text style={styles.typeText}>{booking.donationType}</Text>
        </View>

        {booking.notes && (
          <View style={styles.notesRow}>
            <Ionicons name="information-circle-outline" size={14} color={Colors.textLight} />
            <Text style={styles.notes}>{booking.notes}</Text>
          </View>
        )}
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: { marginHorizontal: Spacing.md },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: Spacing.md },
  sectionLabel: { fontSize: 11, fontWeight: '700', color: Colors.textLight, letterSpacing: 0.8 },
  row: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  iconBox: { width: 44, height: 44, borderRadius: BorderRadius.md, alignItems: 'center', justifyContent: 'center' },
  info: { flex: 1 },
  dateText: { fontSize: 15, fontWeight: '600', color: Colors.text, textTransform: 'capitalize' },
  timeText: { fontSize: 13, color: Colors.textSecondary, marginTop: 1 },
  centerName: { fontSize: 14, fontWeight: '600', color: Colors.text },
  centerAddress: { fontSize: 13, color: Colors.textSecondary, marginTop: 1 },
  separator: { height: 1, backgroundColor: Colors.border, marginVertical: Spacing.sm },
  typePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Colors.primarySoft,
    borderRadius: BorderRadius.full,
    paddingHorizontal: 10,
    paddingVertical: 4,
    alignSelf: 'flex-start',
    marginTop: Spacing.sm,
  },
  typeText: { fontSize: 12, fontWeight: '600', color: Colors.primary },
  notesRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 4, marginTop: Spacing.sm },
  notes: { fontSize: 12, color: Colors.textLight, flex: 1, lineHeight: 16 },
  emptyRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  emptyIcon: { width: 48, height: 48, borderRadius: BorderRadius.md, backgroundColor: Colors.borderLight, alignItems: 'center', justifyContent: 'center' },
  emptyText: { flex: 1 },
  emptyTitle: { fontSize: 15, fontWeight: '600', color: Colors.text },
  emptySubtitle: { fontSize: 13, color: Colors.textSecondary, marginTop: 2 },
  bookBtn: { backgroundColor: Colors.primary, borderRadius: BorderRadius.full, paddingHorizontal: 14, paddingVertical: 7 },
  bookBtnText: { fontSize: 13, fontWeight: '700', color: Colors.white },
});
