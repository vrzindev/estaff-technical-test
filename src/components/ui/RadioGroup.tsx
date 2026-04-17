import React from 'react';
import { View, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { COLORS, SPACING } from '../../constants/theme';
import { Typography } from './Typography';

export interface RadioOption {
  label: string;
  value: string;
  description?: string;
}

interface RadioGroupProps {
  options: RadioOption[];
  selectedValue: string | undefined;
  onSelect: (value: string) => void;
  style?: ViewStyle;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  options,
  selectedValue,
  onSelect,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      {options.map((option) => (
        <TouchableOpacity
          key={option.value}
          style={styles.optionContainer}
          onPress={() => onSelect(option.value)}
          activeOpacity={0.7}
        >
          <View style={styles.radioOuter}>
            {selectedValue === option.value && <View style={styles.radioInner} />}
          </View>
          <View style={styles.textContainer}>
            <Typography variant="body" weight="600" color={COLORS.textMain}>
              {option.label}
            </Typography>
            {option.description && (
              <Typography variant="caption" color={COLORS.textSecondary} style={styles.description}>
                {option.description}
              </Typography>
            )}
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    gap: SPACING.lg,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2, // Align with text
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
  },
  textContainer: {
    flex: 1,
    marginLeft: SPACING.sm,
  },
  description: {
    marginTop: SPACING.xs,
  },
});
