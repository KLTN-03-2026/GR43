import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

type Props = {
  images: (string | number)[];
  initialIndex?: number;
  onIndexChange?: (index: number) => void;
};

export const ProfileCarousel: React.FC<Props> = ({ images, initialIndex = 0, onIndexChange }) => {
  return (
    <View style={styles.container}>
      {images && images.length > 0 && (
        // images can be remote URIs (string) or local requires (number)
        <Image source={typeof images[initialIndex] === 'string' ? { uri: images[initialIndex] as string } : (images[initialIndex] as number)} style={styles.image} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { width: '100%', alignItems: 'center' },
  image: { width: 280, height: 280, borderRadius: 16, resizeMode: 'cover' },
});
