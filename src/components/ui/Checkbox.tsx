import React from 'react';
import { View, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { COLORS, SPACING, BORDER_RADIUS } from '../../constants/theme';
import { Typography } from './Typography';

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  style?: ViewStyle;
  icon?: React.ReactNode;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  checked,
  onChange,
  style,
  icon,
}) => {
  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={() => onChange(!checked)}
      activeOpacity={0.7}
    >
      <View
        style={[
          styles.box,
          checked ? styles.checked : styles.unchecked,
        ]}
      >
        {checked && (
          <View style={styles.checkmark}>
            {/* Using a simple text for checkmark or you can pass an icon */}
            <Typography color={COLORS.white} style={styles.checkText}>✓</Typography>
          </View>
        )}
      </View>
      <Typography variant="subtitle" color={COLORS.textMain} style={styles.label}>
        {label}
      </Typography>
      {icon && <View style={styles.iconContainer}>{icon}</View>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.xs,
  },
  box: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderRadius: BORDER_RADIUS.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checked: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  unchecked: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.border,
  },
  checkmark: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkText: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: 'bold',
  },
  label: {
    marginLeft: SPACING.sm,
  },
  iconContainer: {
    marginLeft: SPACING.xs,
  },
});
