import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, Text, View } from 'react-native';

export const MessagesScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Messages</Text>
        <Text style={styles.subtitle}>Your chats and inbox live here.</Text>

        {[1, 2, 3].map((item) => (
          <View key={item} style={styles.messageCard}>
            <Text style={styles.messageName}>Conversation {item}</Text>
            <Text style={styles.messagePreview}>Hey! Are you free this weekend?</Text>
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
  messageCard: {
    marginTop: 10,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
    padding: 12,
  },
  messageName: { fontSize: 15, fontWeight: '700', color: '#111111' },
  messagePreview: { marginTop: 4, fontSize: 13, color: '#6B7280' },
});
