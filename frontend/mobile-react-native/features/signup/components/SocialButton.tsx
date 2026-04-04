import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text } from 'react-native';

type SocialButtonProps = {
  platform: 'facebook' | 'google' | 'apple';
};

export function SocialButton({ platform }: SocialButtonProps) {
  const icon =
    platform === 'facebook' ? (
      <FontAwesome name="facebook-f" size={24} color="#EE3F57" />
    ) : platform === 'google' ? (
      <Text style={styles.googleGlyph}>G</Text>
    ) : (
      <Ionicons name="logo-apple" size={24} color="#EE3F57" />
    );

  return (
    <Pressable
      style={({ hovered, pressed }) => [
        styles.socialButton,
        hovered && styles.socialButtonHovered,
        pressed && styles.socialButtonPressed,
      ]}>
      {icon}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  socialButton: {
    width: 56,
    height: 56,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#DEDEDE',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialButtonHovered: {
    borderColor: '#CFCFCF',
  },
  socialButtonPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  googleGlyph: {
    fontSize: 26,
    fontWeight: '700',
    color: '#EE3F57',
  },
});
