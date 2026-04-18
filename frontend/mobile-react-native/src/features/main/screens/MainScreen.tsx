import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, Text, View, Image } from 'react-native';

export const MainScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Cards</Text>
        <Text style={styles.subtitle}>Swipe and discover people around you.</Text>

        <View style={styles.card}>
          <Image source={require('../../../../assets/images/anh1.jpg')} style={styles.photo} />
          <View style={styles.infoWrap}>
            <Text style={styles.name}>Luna, 24</Text>
            <Text style={styles.location}>Ho Chi Minh City</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F3F3F3' },
  container: { flex: 1, paddingHorizontal: 20, paddingTop: 12, gap: 8 },
  title: { fontSize: 30, fontWeight: '700', color: '#111111' },
  subtitle: { fontSize: 14, color: '#6B7280' },
  card: {
    marginTop: 8,
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    flex: 1,
    marginBottom: 90,
  },
  photo: { width: '100%', height: '78%' },
  infoWrap: { paddingHorizontal: 16, paddingVertical: 12 },
  name: { fontSize: 22, fontWeight: '700', color: '#111111' },
  location: { marginTop: 4, fontSize: 14, color: '#6B7280' },
});
