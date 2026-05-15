import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { Colors } from '../../theme/colors';
import { BorderRadius } from '../../theme/spacing';

type BadgeVariant = 'success' | 'warning' | 'error' | 'info' | 'primary' | 'neutral';

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  style?: ViewStyle;
  dot?: boolean;
}

const variantMap: Record<BadgeVariant, { bg: string; text: string }> = {
  success: { bg: Colors.successLight, text: Colors.success },
  warning: { bg: Colors.warningLight, text: Colors.warning },
  error: { bg: Colors.primarySoft, text: Colors.primary },
  info: { bg: Colors.infoLight, text: Colors.info },
  primary: { bg: Colors.primarySoft, text: Colors.primary },
  neutral: { bg: Colors.borderLight, text: Colors.textSecondary },
};

export const Badge: React.FC<BadgeProps> = ({ label, variant = 'neutral', style, dot = false }) => {
  const { bg, text } = variantMap[variant];
  return (
    <View style={[styles.badge, { backgroundColor: bg }, style]}>
      {dot && <View style={[styles.dot, { backgroundColor: text }]} />}
      <Text style={[styles.text, { color: text }]}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: BorderRadius.full,
    alignSelf: 'flex-start',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 5,
  },
  text: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
});
