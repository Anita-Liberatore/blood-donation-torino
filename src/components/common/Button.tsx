import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { Colors } from '../../theme/colors';
import { BorderRadius } from '../../theme/spacing';

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const variantStyles: Record<Variant, { container: ViewStyle; text: TextStyle }> = {
  primary: {
    container: { backgroundColor: Colors.primary },
    text: { color: Colors.white },
  },
  secondary: {
    container: { backgroundColor: Colors.primarySoft },
    text: { color: Colors.primary },
  },
  outline: {
    container: { backgroundColor: Colors.transparent, borderWidth: 1.5, borderColor: Colors.primary },
    text: { color: Colors.primary },
  },
  ghost: {
    container: { backgroundColor: Colors.transparent },
    text: { color: Colors.primary },
  },
  danger: {
    container: { backgroundColor: Colors.primaryDark },
    text: { color: Colors.white },
  },
};

const sizeStyles: Record<Size, { container: ViewStyle; text: TextStyle }> = {
  sm: { container: { paddingVertical: 8, paddingHorizontal: 16 }, text: { fontSize: 13 } },
  md: { container: { paddingVertical: 13, paddingHorizontal: 24 }, text: { fontSize: 15 } },
  lg: { container: { paddingVertical: 16, paddingHorizontal: 32 }, text: { fontSize: 16 } },
};

export const Button: React.FC<ButtonProps> = ({
  label,
  onPress,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  fullWidth = false,
  style,
  textStyle,
}) => {
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.75}
      disabled={isDisabled}
      style={[
        styles.base,
        variantStyles[variant].container,
        sizeStyles[size].container,
        fullWidth && styles.fullWidth,
        isDisabled && styles.disabled,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={variantStyles[variant].text.color as string} size="small" />
      ) : (
        <Text style={[styles.text, variantStyles[variant].text, sizeStyles[size].text, textStyle]}>
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  fullWidth: { width: '100%' },
  disabled: { opacity: 0.5 },
  text: { fontWeight: '600', letterSpacing: 0.2 },
});
