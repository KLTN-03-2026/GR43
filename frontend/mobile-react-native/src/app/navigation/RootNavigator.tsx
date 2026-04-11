import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../../features/home/screens/HomeScreen';
import { OnboardingScreen } from '../../features/onboarding/screens/OnboardingScreen';
import { LoginScreen } from '../../features/auth/screens/LoginScreen';
import { SignUpScreen } from '../../features/auth/screens/SignUpScreen';

export type RootStackParamList = {
  Onboarding: undefined;
  Login: undefined;
  SignUp: undefined;
  Home: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Onboarding"
        screenOptions={{ 
          headerShown: false, // Hide headers for onboarding
        }}
      >
        <Stack.Screen 
          name="Onboarding" 
          component={OnboardingScreen} 
        />
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
        />
        <Stack.Screen 
          name="SignUp" 
          component={SignUpScreen} 
        />
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'Feed', headerShown: true }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
