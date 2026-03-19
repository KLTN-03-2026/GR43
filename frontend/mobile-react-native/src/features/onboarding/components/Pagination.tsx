import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { OnboardingSlide } from '../data/onboardingData';
import { ONBOARDING_SPACED_ITEM_WIDTH } from '../utils/constants';

interface PaginationProps {
  data: OnboardingSlide[];
  scrollX: Animated.Value;
}

export const Pagination: React.FC<PaginationProps> = ({ data, scrollX }) => {
  return (
    <View style={styles.pagination}>
      {data.map((_, index) => {
        const inputRange = [
          (index - 1) * ONBOARDING_SPACED_ITEM_WIDTH,
          index * ONBOARDING_SPACED_ITEM_WIDTH,
          (index + 1) * ONBOARDING_SPACED_ITEM_WIDTH,
        ];
        
        const dotColor = scrollX.interpolate({
          inputRange,
          outputRange: ['#e0e0e0', '#E84C60', '#e0e0e0'],
          extrapolate: 'clamp',
        });

        const dotScale = scrollX.interpolate({
          inputRange,
          outputRange: [1, 1.2, 1],
          extrapolate: 'clamp',
        });

        return (
          <Animated.View
            key={index}
            style={[
              styles.dot,
              { backgroundColor: dotColor, transform: [{ scale: dotScale }] },
            ]}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 24,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
});
