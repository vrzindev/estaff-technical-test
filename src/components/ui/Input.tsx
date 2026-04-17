import React from 'react';
import { View, TextInput, StyleSheet, TextInputProps, TouchableOpacity } from 'react-native';
import { Typography } from './Typography';
import { COLORS, SPACING, BORDER_RADIUS } from '../../constants/theme';

interface InputProps extends TextInputProps {
  label: string;
  required?: boolean;
  error?: string;
  rightIcon?: React.ReactNode;
  onPress?: () => void;
}

export const Input: React.FC<InputProps> = ({ label, required, error, style, rightIcon, onPress, editable = true, ...props }) => {
  const InputComponent = (
    <View style={[
      styles.inputContainer,
      error ? styles.inputError : null,
      style,
    ]}>
      <TextInput
        style={styles.input}
        placeholderTextColor={COLORS.textPlaceholder}
        editable={onPress ? false : editable}
        pointerEvents={onPress ? 'none' : 'auto'}
        {...props}
      />
      {rightIcon && (
        <View style={styles.iconContainer}>
          {rightIcon}
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Typography variant="subtitle" style={styles.label}>
        {label}
        {required && '*'}
      </Typography>
      
      {onPress ? (
        <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
          {InputComponent}
        </TouchableOpacity>
      ) : (
        InputComponent
      )}

      {error && (
        <Typography variant="caption" color={COLORS.error} style={styles.errorText}>
          {error}
        </Typography>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: SPACING.sm,
  },
  label: {
    marginBottom: SPACING.sm,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.white,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: COLORS.textMain,
    padding: 0, // Reset default padding
  },
  inputError: {
    borderColor: COLORS.error,
  },
  iconContainer: {
    marginLeft: SPACING.sm,
  },
  errorText: {
    marginTop: SPACING.xs,
  },
});
