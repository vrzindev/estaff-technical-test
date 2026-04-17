import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Modal, TouchableWithoutFeedback } from 'react-native';
import { COLORS, SPACING, BORDER_RADIUS } from '../../constants/theme';
import { Typography } from './Typography';

interface TooltipProps {
  text: string;
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  duration?: number;
}

export const Tooltip: React.FC<TooltipProps> = ({
  text,
  visible,
  onClose,
  children,
  duration = 4000, // 4 seconds default
}) => {
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (visible) {
      timer = setTimeout(() => {
        onClose();
      }, duration);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [visible, duration, onClose]);

  return (
    <View style={styles.container}>
      {children}
      <Modal transparent visible={visible} animationType="fade">
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.overlay}>
            <TouchableWithoutFeedback>
              <View style={styles.tooltipContainer}>
                <Typography variant="caption" color={COLORS.white} align="center">
                  {text}
                </Typography>
                <View style={styles.arrow} />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    zIndex: 1,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  tooltipContainer: {
    backgroundColor: COLORS.backgroundDark,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    maxWidth: 200,
    shadowColor: '#1b212c',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 5,
    position: 'absolute',
    top: '35%', // Approximation based on where it might appear
  },
  arrow: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderBottomWidth: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: COLORS.backgroundDark,
    position: 'absolute',
    top: -8,
    alignSelf: 'center',
    left: '50%',
    marginLeft: -8,
  },
});
