import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../../theme/colors';
import { BorderRadius } from '../../theme/spacing';

interface ProgressBarProps {
  progress: number; // 0–1
  label?: string;
  color?: string;
  trackColor?: string;
  height?: number;
  showPercent?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  label,
  color = Colors.primary,
  trackColor = Colors.borderLight,
  height = 8,
  showPercent = false,
}) => {
  const clamped = Math.min(1, Math.max(0, progress));
  return (
    <View style={styles.wrapper}>
      {(label || showPercent) && (
        <View style={styles.header}>
          {label ? <Text style={styles.label}>{label}</Text> : <View />}
          {showPercent && (
            <Text style={[styles.percent, { color }]}>{Math.round(clamped * 100)}%</Text>
          )}
        </View>
      )}
      <View style={[styles.track, { backgroundColor: trackColor, height, borderRadius: height / 2 }]}>
        <View
          style={[
            styles.fill,
            { width: `${clamped * 100}%`, backgroundColor: color, borderRadius: height / 2 },
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: { width: '100%' },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  label: { fontSize: 13, color: Colors.textSecondary, fontWeight: '500' },
  percent: { fontSize: 13, fontWeight: '700' },
  track: { width: '100%', overflow: 'hidden' },
  fill: { height: '100%' },
});
