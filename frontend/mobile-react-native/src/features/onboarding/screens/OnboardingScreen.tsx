import React, { useRef, useState } from 'react';
import { View, StyleSheet, Animated, SafeAreaView, Platform } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../app/navigation/RootNavigator';
import { onboardingData } from '../data/onboardingData';
import { CarouselItem } from '../components/CarouselItem';
import { Pagination } from '../components/Pagination';
import { OnboardingFooter } from '../components/OnboardingFooter';
import { ONBOARDING_SPACED_ITEM_WIDTH, SCREEN_WIDTH, SCREEN_HEIGHT } from '../utils/constants';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Onboarding'>;
};

export const OnboardingScreen: React.FC<Props> = ({ navigation }) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    {
      useNativeDriver: true,
      listener: (event: any) => {
        const x = event.nativeEvent.contentOffset.x;
        const newIndex = Math.round(x / ONBOARDING_SPACED_ITEM_WIDTH);
        if (newIndex !== currentIndex && newIndex >= 0 && newIndex < onboardingData.length) {
          setCurrentIndex(newIndex);
        }
      },
    }
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Carousel Section */}
        <View style={styles.carouselWrapper}>
          <Animated.FlatList
            data={onboardingData}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToInterval={ONBOARDING_SPACED_ITEM_WIDTH}
            decelerationRate="fast"
            bounces={false}
            contentContainerStyle={{
              paddingHorizontal: (SCREEN_WIDTH - ONBOARDING_SPACED_ITEM_WIDTH) / 2,
            }}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            renderItem={({ item, index }) => <CarouselItem item={item} index={index} scrollX={scrollX} />}
          />
        </View>

        {/* Pagination Dots */}
        <Pagination data={onboardingData} scrollX={scrollX} />

        {/* Text & Footer Area */}
        <OnboardingFooter 
          currentSlide={onboardingData[currentIndex]}
          onCreateAccount={() => {
            // navigation.navigate('Register')
            console.log('Navigate to Register');
          }}
          onSignIn={() => {
            // navigation.navigate('Login')
            console.log('Navigate to Login');
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingTop: Platform.OS === 'android' ? 24 : 0,
  },
  container: {
    flex: 1,
  },
  carouselWrapper: {
    height: SCREEN_HEIGHT * 0.45,
    marginTop: 20,
  },
});
