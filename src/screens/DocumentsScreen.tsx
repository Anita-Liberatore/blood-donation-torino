import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Modal,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { DocumentCard } from '../components/documents/DocumentCard';
import { Badge } from '../components/common/Badge';
import { SectionHeader } from '../components/common/SectionHeader';
import { mockDocuments } from '../data/mockDocuments';
import { MedicalDocument, ExamResult } from '../types';
import { Colors } from '../theme/colors';
import { BorderRadius, Spacing } from '../theme/spacing';

const statusBadge = (status: ExamResult['status']) => {
  if (status === 'alto') return <Badge label="Alto" variant="warning" />;
  if (status === 'basso') return <Badge label="Basso" variant="error" />;
  return <Badge label="Normale" variant="success" />;
};

const DocumentDetail: React.FC<{ doc: MedicalDocument; onClose: () => void }> = ({ doc, onClose }) => (
  <Modal visible animationType="slide" presentationStyle="pageSheet">
    <SafeAreaView style={detail.safe} edges={['top']}>
      <View style={detail.header}>
        <View style={detail.headerLeft}>
          <Text style={detail.title} numberOfLines={2}>{doc.title}</Text>
          <Text style={detail.meta}>{doc.centerName} · {doc.doctorName}</Text>
          <Text style={detail.date}>
            {new Date(doc.date).toLocaleDateString('it-IT', {
              day: '2-digit', month: 'long', year: 'numeric',
            })}
          </Text>
        </View>
        <TouchableOpacity onPress={onClose} style={detail.closeBtn}>
          <Ionicons name="close" size={22} color={Colors.text} />
        </TouchableOpacity>
      </View>

      <View style={detail.typeRow}>
        <Badge label={doc.type} variant="info" />
        {doc.results.some((r) => r.status !== 'normale') && (
          <Badge label="Valori anomali presenti" variant="warning" dot />
        )}
      </View>

      <ScrollView contentContainerStyle={detail.scroll}>
        <Text style={detail.tableTitle}>Risultati esami</Text>
        <View style={detail.tableHeader}>
          <Text style={[detail.col, { flex: 2 }]}>Esame</Text>
          <Text style={[detail.col, { flex: 1, textAlign: 'center' }]}>Valore</Text>
          <Text style={[detail.col, { flex: 1.2, textAlign: 'center' }]}>Riferimento</Text>
          <Text style={[detail.col, { flex: 0.8, textAlign: 'right' }]}>Stato</Text>
        </View>
        {doc.results.map((result, i) => (
          <View key={i} style={[
            detail.tableRow,
            result.status !== 'normale' && detail.tableRowAbnormal,
          ]}>
            <Text style={[detail.cellName, { flex: 2 }]}>{result.name}</Text>
            <View style={{ flex: 1, alignItems: 'center' }}>
              <Text style={[
                detail.cellValue,
                result.status === 'alto' && { color: Colors.warning },
                result.status === 'basso' && { color: Colors.primary },
              ]}>
                {result.value} <Text style={detail.unit}>{result.unit}</Text>
              </Text>
            </View>
            <Text style={[detail.cellRef, { flex: 1.2, textAlign: 'center' }]}>
              {result.referenceRange}
            </Text>
            <View style={{ flex: 0.8, alignItems: 'flex-end' }}>
              {statusBadge(result.status)}
            </View>
          </View>
        ))}

        <View style={detail.noteBox}>
          <Ionicons name="information-circle-outline" size={16} color={Colors.textLight} />
          <Text style={detail.noteText}>
            Questi risultati si riferiscono all'analisi effettuata sulla sacca donata.
            Per domande sui valori contatta il centro trasfusionale.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  </Modal>
);

export const DocumentsScreen: React.FC = () => {
  const [selectedDoc, setSelectedDoc] = useState<MedicalDocument | null>(null);

  const hasAbnormal = mockDocuments.filter((d) => d.results.some((r) => r.status !== 'normale'));
  const normal = mockDocuments.filter((d) => d.results.every((r) => r.status === 'normale'));

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Documenti Medici</Text>
        <Text style={styles.headerSub}>Referti post-donazione</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

        {hasAbnormal.length > 0 && (
          <View style={styles.alertBanner}>
            <Ionicons name="alert-circle" size={18} color={Colors.warning} />
            <Text style={styles.alertText}>
              {hasAbnormal.length} documento{hasAbnormal.length > 1 ? 'i' : ''} con valori fuori range
            </Text>
          </View>
        )}

        <View style={styles.section}>
          <View style={styles.summaryRow}>
            {[
              { label: 'Totali', value: mockDocuments.length, color: Colors.info, bg: Colors.infoLight },
              { label: 'Normali', value: normal.length, color: Colors.success, bg: Colors.successLight },
              { label: 'Anomalie', value: hasAbnormal.length, color: Colors.warning, bg: Colors.warningLight },
            ].map((s) => (
              <View key={s.label} style={[styles.summaryCard, { backgroundColor: s.bg }]}>
                <Text style={[styles.summaryValue, { color: s.color }]}>{s.value}</Text>
                <Text style={[styles.summaryLabel, { color: s.color }]}>{s.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {hasAbnormal.length > 0 && (
          <View style={styles.section}>
            <SectionHeader title="Richiede attenzione" />
            {hasAbnormal.map((doc) => (
              <DocumentCard key={doc.id} document={doc} onPress={() => setSelectedDoc(doc)} />
            ))}
          </View>
        )}

        <View style={styles.section}>
          <SectionHeader title="Tutti i referti" />
          {mockDocuments.map((doc) => (
            <DocumentCard key={doc.id} document={doc} onPress={() => setSelectedDoc(doc)} />
          ))}
        </View>
      </ScrollView>

      {selectedDoc && (
        <DocumentDetail doc={selectedDoc} onClose={() => setSelectedDoc(null)} />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  header: { paddingHorizontal: Spacing.md, paddingTop: Spacing.sm, paddingBottom: Spacing.md },
  headerTitle: { fontSize: 22, fontWeight: '800', color: Colors.text, letterSpacing: -0.3 },
  headerSub: { fontSize: 13, color: Colors.textSecondary, marginTop: 2 },
  scroll: { paddingBottom: Spacing.xxl },
  section: { paddingHorizontal: Spacing.md, marginBottom: Spacing.md },
  alertBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    backgroundColor: Colors.warningLight,
    marginHorizontal: Spacing.md,
    marginBottom: Spacing.md,
    borderRadius: BorderRadius.md,
    padding: Spacing.sm,
    borderLeftWidth: 4,
    borderLeftColor: Colors.warning,
  },
  alertText: { fontSize: 13, fontWeight: '600', color: Colors.warning },
  summaryRow: { flexDirection: 'row', gap: Spacing.sm, marginBottom: Spacing.md },
  summaryCard: {
    flex: 1,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    alignItems: 'center',
  },
  summaryValue: { fontSize: 24, fontWeight: '800' },
  summaryLabel: { fontSize: 11, fontWeight: '600', marginTop: 2 },
});

const detail = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: Spacing.md,
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  headerLeft: { flex: 1, marginRight: Spacing.md },
  title: { fontSize: 16, fontWeight: '700', color: Colors.text },
  meta: { fontSize: 12, color: Colors.textSecondary, marginTop: 3 },
  date: { fontSize: 12, color: Colors.textLight, marginTop: 2 },
  closeBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.borderLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  typeRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    padding: Spacing.md,
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  scroll: { padding: Spacing.md, paddingBottom: 40 },
  tableTitle: { fontSize: 15, fontWeight: '700', color: Colors.text, marginBottom: Spacing.sm },
  tableHeader: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    backgroundColor: Colors.borderLight,
    borderRadius: BorderRadius.sm,
    marginBottom: 2,
  },
  col: { fontSize: 11, fontWeight: '700', color: Colors.textSecondary, letterSpacing: 0.3 },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.sm,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  tableRowAbnormal: { backgroundColor: Colors.warningLight + '80' },
  cellName: { fontSize: 13, color: Colors.text, fontWeight: '500' },
  cellValue: { fontSize: 14, fontWeight: '700', color: Colors.text },
  unit: { fontSize: 10, color: Colors.textSecondary, fontWeight: '400' },
  cellRef: { fontSize: 11, color: Colors.textSecondary },
  noteBox: {
    flexDirection: 'row',
    gap: Spacing.sm,
    backgroundColor: Colors.borderLight,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    marginTop: Spacing.lg,
    alignItems: 'flex-start',
  },
  noteText: { flex: 1, fontSize: 12, color: Colors.textSecondary, lineHeight: 18 },
});
