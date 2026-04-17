import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Controller, Control } from 'react-hook-form';

import { AsoFormData } from '../../types/aso';
import { COLORS, SPACING, BORDER_RADIUS } from '../../constants/theme';
import { Typography } from '../ui/Typography';

interface BioSectionProps {
  control: Control<AsoFormData>;
}

export const BioSection: React.FC<BioSectionProps> = ({ control }) => {
  return (
    <View style={styles.section}>
      <Typography variant="subtitle" style={styles.sectionTitle}>
        Descrição
      </Typography>
      <Typography variant="body" color={COLORS.textSecondary} style={styles.sectionDesc}>
        Conte-nos um pouco mais sobre você!
      </Typography>
      <View style={styles.bioContainer}>
        <Controller
          control={control}
          name="bio"
          render={({ field: { value } }) => (
            <Typography variant="body" color={COLORS.textMain}>
              {value}
            </Typography>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
  },
  sectionTitle: {
    marginBottom: SPACING.xs,
  },
  sectionDesc: {
    marginBottom: SPACING.sm,
  },
  bioContainer: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    backgroundColor: COLORS.white,
  },
});
