import { useState } from 'react';
import { useRouter } from 'expo-router';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

import { AuthPrompt } from '@/features/onboarding/components/AuthPrompt';
import { PaginationDots } from '@/features/onboarding/components/PaginationDots';
import { PrimaryActionButton } from '@/features/onboarding/components/PrimaryActionButton';
import { ProfileCarousel } from '@/features/onboarding/components/ProfileCarousel';
import { ONBOARDING_COPY } from '@/constants/onboarding-copy';
import { ONBOARDING_IMAGES } from '@/constants/onboarding-images';

export function OnboardingScreen() {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
  const copyIndex = activeIndex % ONBOARDING_COPY.length;
  const activeCopy = ONBOARDING_COPY[copyIndex];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.topSection}>
          <ProfileCarousel
            images={ONBOARDING_IMAGES}
            initialIndex={0}
            onIndexChange={setActiveIndex}
          />
          <Text style={styles.title}>{activeCopy.title}</Text>
          <Text style={styles.description}>{activeCopy.description}</Text>
          <PaginationDots total={ONBOARDING_IMAGES.length} activeIndex={activeIndex} />
        </View>

        <View style={styles.bottomSection}>
          <PrimaryActionButton label="Create an account" onPress={() => router.push('/signup')} />
          <AuthPrompt />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F3F3F3',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 28,
    backgroundColor: '#F3F3F3',
  },
  topSection: {
    width: '100%',
    alignItems: 'center',
    gap: 18,
    marginTop: 1,
  },
  title: {
    color: '#EE3F57',
    fontSize: 34,
    fontWeight: '700',
    textAlign: 'center',
  },
  description: {
    color: '#8A8A8A',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 22,
    maxWidth: 320,
    paddingHorizontal: 6,
  },
  bottomSection: {
    width: '100%',
    marginTop: 16,
  },
});
