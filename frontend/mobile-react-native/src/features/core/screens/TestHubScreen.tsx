import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../app/navigation/RootNavigator';
import { AuthBackButton } from '../../../shared/components/AuthBackButton';
import { PrimaryButton } from '../../../shared/components/PrimaryButton';

export const TestHubScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <AuthBackButton onPress={() => navigation.goBack()} />
        <Text style={styles.title}>Test Navigation Hub</Text>
        <Text style={styles.subtitle}>Các nút điều hướng chính của app.</Text>

        <View style={styles.buttons}>
          <PrimaryButton title="Main" onPress={() => navigation.navigate('MainTabs', { screen: 'Main' })} />
          <PrimaryButton title="Matches" onPress={() => navigation.navigate('MainTabs', { screen: 'Matches' })} />
          <PrimaryButton title="Notifications" onPress={() => navigation.navigate('MainTabs', { screen: 'Notifications' })} />
          <PrimaryButton title="Messages" onPress={() => navigation.navigate('MainTabs', { screen: 'Messages' })} />
          <PrimaryButton title="Profile" onPress={() => navigation.navigate('MainTabs', { screen: 'Profile' })} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F3F3F3' },
  container: { paddingHorizontal: 24, paddingTop: 16, paddingBottom: 120 },
  title: { fontSize: 28, fontWeight: '700', color: '#111111', marginTop: 8 },
  subtitle: { fontSize: 14, color: '#6B7280', marginTop: 8, marginBottom: 16 },
  buttons: { gap: 10 },
});
