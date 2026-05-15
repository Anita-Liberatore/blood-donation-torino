import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { Colors } from '../../theme/colors';
import { BorderRadius, Spacing } from '../../theme/spacing';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  padding?: number;
  elevated?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  style,
  padding = Spacing.md,
  elevated = false,
}) => (
  <View style={[styles.card, elevated && styles.elevated, { padding }, style]}>
    {children}
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 3,
  },
  elevated: {
    shadowColor: Colors.shadowDark,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 1,
    shadowRadius: 16,
    elevation: 8,
  },
});
