import React from 'react';
import { View, StyleSheet, Image, ImageSourcePropType } from 'react-native';
import { Typography } from './Typography';
import { COLORS } from '../../constants/theme';

interface MetricsCardProps {
  iconSource: ImageSourcePropType;
  title: string;
  value: string;
}

export const MetricsCard: React.FC<MetricsCardProps> = ({ iconSource, title, value }) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Image 
          source={iconSource} 
          style={{ width: 20, height: 20, tintColor: COLORS.white }} 
          resizeMode="contain"
        />
      </View>
      <View style={styles.textContainer}>
        <Typography variant="body" style={styles.title} numberOfLines={1}>
          {title}
        </Typography>
        <Typography variant="title" style={styles.value} numberOfLines={1}>
          {value}
        </Typography>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: COLORS.white,
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#bababa',
    alignItems: 'center',
    justifyContent: 'center',
    height: 110,
    // Add shadow/elevation so the card visually sits on top of the line
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#797979',
    fontSize: 12,
    lineHeight: 16,
    marginBottom: 2,
    textAlign: 'center',
  },
  value: {
    color: '#5f5f5f',
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 16,
    textAlign: 'center',
  },
});
