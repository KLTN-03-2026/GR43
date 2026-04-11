import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

export const AuthPrompt: React.FC = () => {
  return (
    <View style={styles.row}>
      <Text style={styles.text}>Already have an account?</Text>
      <Pressable onPress={() => {}}>
        <Text style={styles.link}> Sign in</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  row: { flexDirection: 'row', justifyContent: 'center', marginTop: 12 },
  text: { color: '#6B7280' },
  link: { color: '#EE3F57', fontWeight: '600' },
});
