import React from 'react';
import { View, StyleSheet } from 'react-native';

type Props = {
  total: number;
  activeIndex: number;
};

export const PaginationDots: React.FC<Props> = ({ total, activeIndex }) => {
  return (
    <View style={styles.row}>
      {Array.from({ length: total }).map((_, i) => (
        <View key={i} style={[styles.dot, i === activeIndex && styles.active]} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: 8 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#E5E7EB' },
  active: { backgroundColor: '#EE3F57' },
});
