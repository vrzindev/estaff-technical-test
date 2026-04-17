import React from 'react';
import { View, Image, StyleSheet, ImageSourcePropType } from 'react-native';
import { BORDER_RADIUS, COLORS } from '../../constants/theme';

interface AvatarProps {
  source: ImageSourcePropType;
  size?: number;
}

export const Avatar: React.FC<AvatarProps> = ({ source, size = 100 }) => {
  return (
    <View style={[styles.container, { width: size, height: size, borderRadius: size / 2 }]}>
      <Image source={source} style={[styles.image, { borderRadius: size / 2 }]} resizeMode="cover" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.borderLight,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
