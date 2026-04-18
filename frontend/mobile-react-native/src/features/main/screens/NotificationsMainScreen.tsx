import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, Text, View } from 'react-native';

export const NotificationsMainScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Notifications</Text>
        <Text style={styles.subtitle}>All app notifications show here.</Text>

        {[
          'You have a new match.',
          'Your profile reached 90% completeness.',
          'Verification code expires in 5 minutes.',
        ].map((text) => (
          <View key={text} style={styles.itemCard}>
            <Text style={styles.itemText}>{text}</Text>
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F3F3F3' },
  container: { flex: 1, paddingHorizontal: 20, paddingTop: 12, gap: 8 },
  title: { fontSize: 30, fontWeight: '700', color: '#111111' },
  subtitle: { fontSize: 14, color: '#6B7280' },
  itemCard: {
    marginTop: 10,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
    padding: 12,
  },
  itemText: { fontSize: 14, color: '#374151' },
});
