import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../../features/home/screens/HomeScreen';
import { OnboardingScreen } from '../../features/onboarding/screens/OnboardingScreen';
import { LoginScreen } from '../../features/auth/screens/LoginScreen';
import { SignUpScreen } from '../../features/auth/screens/SignUpScreen';
import EmailSignUpDetailsScreen from '../../features/auth/screens/EmailSignUpDetailsScreen';
import EmailSignUpVerifyScreen from '../../features/auth/screens/EmailSignUpVerifyScreen';
import EmailLoginScreen from '../../features/auth/screens/EmailLoginScreen';
import ForgotPasswordEmailScreen from '../../features/auth/screens/forgot-password/ForgotPasswordEmailScreen';
import ForgotPasswordVerifyScreen from '../../features/auth/screens/forgot-password/ForgotPasswordVerifyScreen';
import ResetPasswordScreen from '../../features/auth/screens/forgot-password/ResetPasswordScreen';

export type RootStackParamList = {
  Onboarding: undefined;
  Login: undefined;
  SignUp: undefined;
  EmailSignUp: undefined; // Map this to Details screen
  EmailSignUpVerify: { email: string };
  EmailLogin: undefined;
  ForgotPasswordEmail: undefined;
  ForgotPasswordVerify: { email: string };
  ResetPassword: { email: string; token: string };
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
          name="EmailSignUp" 
          component={EmailSignUpDetailsScreen} 
        />
        <Stack.Screen 
          name="EmailSignUpVerify" 
          component={EmailSignUpVerifyScreen} 
        />
        <Stack.Screen 
          name="EmailLogin" 
          component={EmailLoginScreen} 
        />
        <Stack.Screen 
          name="ForgotPasswordEmail" 
          component={ForgotPasswordEmailScreen} 
        />
        <Stack.Screen 
          name="ForgotPasswordVerify" 
          component={ForgotPasswordVerifyScreen} 
        />
        <Stack.Screen 
          name="ResetPassword" 
          component={ResetPasswordScreen} 
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
