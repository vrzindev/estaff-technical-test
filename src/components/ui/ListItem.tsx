import React from 'react';
import { TouchableOpacity, View, StyleSheet, Image, ImageSourcePropType } from 'react-native';
import { Typography } from './Typography';
import { COLORS, SPACING } from '../../constants/theme';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

interface ListItemProps {
  title: string;
  subtitle?: string;
  leftIcon?: keyof typeof MaterialCommunityIcons.glyphMap;
  leftIconColor?: string;
  leftImage?: ImageSourcePropType;
  LeftSvgIcon?: React.FC;
  onPress: () => void;
  showChevron?: boolean;
}

export const ListItem: React.FC<ListItemProps> = ({ title, subtitle, leftIcon, leftIconColor, leftImage, LeftSvgIcon, onPress, showChevron = true }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
      {(leftIcon || leftImage || LeftSvgIcon) && (
        <View style={styles.leftIconContainer}>
          {LeftSvgIcon ? (
            <View style={styles.svgWrapper}>
              <LeftSvgIcon />
            </View>
          ) : leftImage ? (
            <Image source={leftImage} style={{ width: 24, height: 24 }} resizeMode="contain" />
          ) : leftIcon ? (
            <MaterialCommunityIcons name={leftIcon} size={24} color={leftIconColor || "#797979"} />
          ) : null}
        </View>
      )}
      
      <View style={styles.contentContainer}>
        <Typography variant="body" style={styles.title}>
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="caption" style={styles.subtitle}>
            {subtitle}
          </Typography>
        )}
      </View>

      {showChevron && (
        <MaterialCommunityIcons name="chevron-right" size={24} color="#d4d4d4" />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#ebebeb',
  },
  leftIconContainer: {
    marginRight: 8,
    padding: 2,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: -2,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    gap: 4,
  },
  title: {
    color: '#323338',
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '600',
  },
  subtitle: {
    color: '#929292',
    fontSize: 12,
    lineHeight: 16,
  },
  svgWrapper: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
