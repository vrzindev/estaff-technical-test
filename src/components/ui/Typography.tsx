import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/theme';

type TypographyVariant = 'title' | 'subtitle' | 'body' | 'caption' | 'error' | 'button';
type TypographyWeight = '400' | '500' | '600' | '700';

interface TypographyProps extends TextProps {
  variant?: TypographyVariant;
  color?: string;
  weight?: TypographyWeight;
  align?: 'auto' | 'left' | 'right' | 'center' | 'justify';
  children: React.ReactNode;
}

export const Typography: React.FC<TypographyProps> = ({
  variant = 'body',
  color,
  weight,
  align,
  style,
  children,
  ...props
}) => {
  const getVariantStyle = () => {
    switch (variant) {
      case 'title':
        return styles.title;
      case 'subtitle':
        return styles.subtitle;
      case 'caption':
        return styles.caption;
      case 'error':
        return styles.error;
      case 'button':
        return styles.button;
      case 'body':
      default:
        return styles.body;
    }
  };

  return (
    <Text
      style={[
        getVariantStyle(),
        color && { color },
        weight && { fontWeight: weight },
        align && { textAlign: align },
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.textMain,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textMain,
  },
  body: {
    fontSize: 14,
    fontWeight: '400',
    color: COLORS.textMain,
  },
  caption: {
    fontSize: 12,
    fontWeight: '400',
    color: COLORS.textSecondary,
  },
  error: {
    fontSize: 12,
    fontWeight: '400',
    color: COLORS.error,
  },
  button: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.white,
  },
});
