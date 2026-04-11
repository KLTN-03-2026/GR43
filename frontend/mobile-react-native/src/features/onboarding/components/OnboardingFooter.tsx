import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PrimaryButton } from '../../../shared/components/PrimaryButton';
import { OnboardingSlide } from '../data/onboardingData';

interface OnboardingFooterProps {
  currentSlide: OnboardingSlide;
  onCreateAccount: () => void;
  onSignIn: () => void;
}

export const OnboardingFooter: React.FC<OnboardingFooterProps> = ({ 
  currentSlide, 
  onCreateAccount, 
  onSignIn 
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      {/* Dynamic Text Section */}
      <View style={styles.textSection}>
        <Text style={styles.title}>{currentSlide?.title}</Text>
        <Text style={styles.description}>{currentSlide?.description}</Text>
      </View>

      {/* Footer Actions */}
      <View style={[styles.actions, { paddingBottom: Math.max(24, insets.bottom + 12) }]}>
        <PrimaryButton 
          title="Create an account" 
          onPress={onCreateAccount} 
        />
        
        <View style={styles.signInWrapper}>
          <Text style={styles.signInText}>Already have an account? </Text>
          <TouchableOpacity onPress={onSignIn} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <Text style={styles.signInHighlight}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  textSection: {
    alignItems: 'center',
    paddingHorizontal: 32,
    marginTop: 32,
    minHeight: 100, // Keep height consistent
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#E84C60', // Red color
    marginBottom: 16,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#4B5563', // Soft gray text
    textAlign: 'center',
    lineHeight: 24,
    fontWeight: '400',
  },
  actions: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  signInWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  signInText: {
    fontSize: 14,
    color: '#6B7280',
  },
  signInHighlight: {
    fontSize: 14,
    color: '#E84C60',
    fontWeight: '600',
  },
});
