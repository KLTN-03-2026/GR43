import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text } from 'react-native';

type AuthBackButtonProps = {
  onPress: () => void;
};

export const AuthBackButton: React.FC<AuthBackButtonProps> = ({ onPress }) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.backButton, pressed && styles.backButtonPressed]}
    >
      <Ionicons name="chevron-back" size={22} color="#111111" />
      <Text style={styles.backText}>Back</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  backButton: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  backButtonPressed: {
    opacity: 0.7,
  },
  backText: {
    fontSize: 16,
    color: '#111111',
    fontWeight: '500',
  },
});
