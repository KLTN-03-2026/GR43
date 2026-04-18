import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, Text, View, Image } from 'react-native';

export const MatchesScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Matches</Text>
        <Text style={styles.subtitle}>Your matched users appear here.</Text>

        {[1, 2].map((item) => (
          <View key={item} style={styles.rowCard}>
            <Image source={require('../../../../assets/images/anh2.jpg')} style={styles.avatar} />
            <View style={styles.meta}>
              <Text style={styles.name}>Matched user {item}</Text>
              <Text style={styles.desc}>Liked you 2h ago</Text>
            </View>
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
  rowCard: {
    marginTop: 10,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: { width: 56, height: 56, borderRadius: 28 },
  meta: { flex: 1 },
  name: { fontSize: 16, fontWeight: '600', color: '#111111' },
  desc: { marginTop: 2, fontSize: 13, color: '#6B7280' },
});
