import { Pressable, StyleSheet, Text, View } from 'react-native';

export function AuthPrompt() {
  return (
    <View style={styles.row}>
      <Text style={styles.baseText}>Already have an account? </Text>
      <Pressable>
        <Text style={styles.highlight}>Sign In</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  baseText: {
    color: '#8A8A8A',
    fontSize: 14,
  },
  highlight: {
    color: '#EE3F57',
    fontSize: 14,
    fontWeight: '700',
  },
});
