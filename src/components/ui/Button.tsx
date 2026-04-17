import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { COLORS, SPACING, BORDER_RADIUS } from '../../constants/theme';
import { Typography } from './Typography';

export type ButtonVariant = 'solid' | 'outline' | 'ghost';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  loading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'solid',
  loading = false,
  disabled = false,
  icon,
  style,
  textStyle,
}) => {
  const isSolid = variant === 'solid';
  const isOutline = variant === 'outline';

  const getBackgroundColor = () => {
    if (disabled) return isSolid ? COLORS.primaryDisabled : 'transparent';
    if (isSolid) return COLORS.primary;
    return 'transparent';
  };

  const getTextColor = () => {
    if (disabled) return isSolid ? COLORS.white : COLORS.textPlaceholder;
    if (isSolid) return COLORS.white;
    return COLORS.primary;
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: getBackgroundColor() },
        isOutline && styles.outline,
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator color={getTextColor()} />
      ) : (
        <>
          {icon && icon}
          <Typography
            variant="button"
            color={getTextColor()}
            style={[icon ? { marginLeft: SPACING.sm } : {}, textStyle]}
          >
            {title}
          </Typography>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    borderRadius: BORDER_RADIUS.full,
    minHeight: 48,
  },
  outline: {
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
});
