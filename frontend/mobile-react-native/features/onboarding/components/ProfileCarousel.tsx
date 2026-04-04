import { Image } from 'expo-image';
import { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, useWindowDimensions, View } from 'react-native';

type ProfileImageSource = string | number;

type ProfileCarouselProps = {
  images: ProfileImageSource[];
  initialIndex?: number;
  onIndexChange?: (index: number) => void;
};

const BASE_CARD_WIDTH = 85;
const CARD_SCALE_MULTIPLIER = 3;
const ITEM_GAP = 5;

export function ProfileCarousel({
  images,
  initialIndex = 0,
  onIndexChange,
}: ProfileCarouselProps) {
  const listRef = useRef<Animated.FlatList<ProfileImageSource>>(null);
  const isDraggingRef = useRef(false);
  const [containerWidth, setContainerWidth] = useState(0);

  const { width } = useWindowDimensions();
  const availableWidth = containerWidth > 0 ? containerWidth : width;
  const cardWidth = Math.min(BASE_CARD_WIDTH * CARD_SCALE_MULTIPLIER, availableWidth * 0.84);
  const cardHeight = cardWidth * (3 / 2);
  const snapInterval = cardWidth + ITEM_GAP;

  const realCount = images.length;
  const extendedData =
    realCount > 1 ? [images[realCount - 1], ...images, images[0]] : images;
  const safeInitialIndex = Math.min(Math.max(initialIndex, 0), Math.max(realCount - 1, 0));
  const initialRawIndex = realCount > 1 ? safeInitialIndex + 1 : safeInitialIndex;

  const scrollX = useRef(new Animated.Value(initialRawIndex * snapInterval)).current;
  const currentIndexRef = useRef(initialRawIndex);
  const sidePadding = Math.max(0, (availableWidth - cardWidth) / 2);

  useEffect(() => {
    if (realCount <= 1) return;

    const interval = setInterval(() => {
      if (isDraggingRef.current) return;

      const nextRawIndex = currentIndexRef.current + 1;
      listRef.current?.scrollToOffset({
        offset: nextRawIndex * snapInterval,
        animated: true,
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [realCount, snapInterval]);

  return (
    <View
      style={styles.wrapper}
      onLayout={(event) => {
        const nextWidth = event.nativeEvent.layout.width;
        if (nextWidth > 0 && nextWidth !== containerWidth) {
          setContainerWidth(nextWidth);
        }
      }}>
      <Animated.FlatList
        ref={listRef}
        data={extendedData}
        keyExtractor={(item, index) => `${item}-${index}`}
        horizontal
        bounces={false}
        initialScrollIndex={initialRawIndex}
        style={styles.list}
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
        snapToInterval={snapInterval}
        contentContainerStyle={[styles.scrollContent, { paddingHorizontal: sidePadding }]}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
          useNativeDriver: true,
        })}
        scrollEventThrottle={16}
        onScrollBeginDrag={() => {
          isDraggingRef.current = true;
        }}
        onScrollEndDrag={() => {
          isDraggingRef.current = false;
        }}
        onMomentumScrollEnd={(event) => {
          const rawIndex = Math.round(event.nativeEvent.contentOffset.x / snapInterval);

          if (realCount > 1) {
            if (rawIndex === 0) {
              const jumpTo = realCount;
              currentIndexRef.current = jumpTo;
              listRef.current?.scrollToOffset({ offset: jumpTo * snapInterval, animated: false });
            } else if (rawIndex === extendedData.length - 1) {
              const jumpTo = 1;
              currentIndexRef.current = jumpTo;
              listRef.current?.scrollToOffset({ offset: jumpTo * snapInterval, animated: false });
            } else {
              currentIndexRef.current = rawIndex;
            }

            const realIndex = ((currentIndexRef.current - 1) % realCount + realCount) % realCount;
            onIndexChange?.(realIndex);
          } else {
            currentIndexRef.current = rawIndex;
            onIndexChange?.(rawIndex);
          }
        }}
        getItemLayout={(_, index) => ({
          length: snapInterval,
          offset: snapInterval * index,
          index,
        })}
        renderItem={({ item, index }) => {
          const inputRange = [
            (index - 1) * snapInterval,
            index * snapInterval,
            (index + 1) * snapInterval,
          ];

          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.78, 1, 0.78],
            extrapolate: 'clamp',
          });

          const translateY = scrollX.interpolate({
            inputRange,
            outputRange: [18, 0, 18],
            extrapolate: 'clamp',
          });

          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.72, 1, 0.72],
            extrapolate: 'clamp',
          });

          return (
            <Animated.View
              style={[
                styles.imageFrame,
                {
                  width: cardWidth,
                  height: cardHeight,
                  opacity,
                  transform: [{ translateY }, { scale }],
                },
              ]}>
              <Image
                source={typeof item === 'string' ? { uri: item } : item}
                contentFit="cover"
                style={styles.image}
              />
            </Animated.View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    alignItems: 'center',
  },
  list: {
    width: '100%',
  },
  scrollContent: {
    alignItems: 'center',
    paddingVertical: 6,
  },
  separator: {
    width: ITEM_GAP,
  },
  imageFrame: {
    aspectRatio: 2 / 3,
    position: 'relative',
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#E5E5E5',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
  },
});
