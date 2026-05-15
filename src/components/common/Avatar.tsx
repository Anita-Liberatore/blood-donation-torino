import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../../theme/colors';

interface AvatarProps {
  initials: string;
  size?: number;
  backgroundColor?: string;
  textColor?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  initials,
  size = 48,
  backgroundColor = Colors.primary,
  textColor = Colors.white,
}) => (
  <View
    style={[
      styles.avatar,
      { width: size, height: size, borderRadius: size / 2, backgroundColor },
    ]}
  >
    <Text style={[styles.text, { fontSize: size * 0.36, color: textColor }]}>
      {initials.toUpperCase()}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  avatar: { alignItems: 'center', justifyContent: 'center' },
  text: { fontWeight: '700', letterSpacing: 0.5 },
});
