import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MedicalDocument } from '../../types';
import { Badge } from '../common/Badge';
import { Colors } from '../../theme/colors';
import { BorderRadius, Spacing } from '../../theme/spacing';

interface DocumentCardProps {
  document: MedicalDocument;
  onPress: () => void;
}

const iconMap: Record<string, keyof typeof Ionicons.glyphMap> = {
  'Analisi Completa': 'flask',
  'Esami Emocromo': 'water',
  'Certificato Idoneità': 'shield-checkmark',
  'Referto Sacca': 'document-text',
};

const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('it-IT', { day: '2-digit', month: 'long', year: 'numeric' });
};

const hasAbnormal = (doc: MedicalDocument): boolean =>
  doc.results.some((r) => r.status !== 'normale');

export const DocumentCard: React.FC<DocumentCardProps> = ({ document, onPress }) => {
  const abnormal = hasAbnormal(document);
  const icon = iconMap[document.type] ?? 'document';

  return (
    <TouchableOpacity activeOpacity={0.85} onPress={onPress} style={styles.card}>
      <View style={[styles.iconBox, { backgroundColor: abnormal ? Colors.warningLight : Colors.infoLight }]}>
        <Ionicons name={icon} size={22} color={abnormal ? Colors.warning : Colors.info} />
      </View>
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>{document.title}</Text>
        <Text style={styles.meta}>{document.centerName} · {formatDate(document.date)}</Text>
        <View style={styles.tagsRow}>
          <Badge
            label={document.type}
            variant="info"
          />
          {abnormal && (
            <Badge label="Valore anomalo" variant="warning" />
          )}
        </View>
      </View>
      <Ionicons name="chevron-forward" size={18} color={Colors.textLight} style={styles.arrow} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 6,
    elevation: 2,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.sm,
  },
  info: { flex: 1 },
  title: { fontSize: 14, fontWeight: '700', color: Colors.text, marginBottom: 3 },
  meta: { fontSize: 12, color: Colors.textSecondary, marginBottom: 6 },
  tagsRow: { flexDirection: 'row', gap: 4 },
  arrow: { marginLeft: Spacing.xs },
});
