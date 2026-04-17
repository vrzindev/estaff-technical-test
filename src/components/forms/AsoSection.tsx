import React, { useState } from 'react';
import { View, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { Controller, Control, FieldErrors } from 'react-hook-form';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import { AsoFormData } from '../../types/aso';
import { COLORS, SPACING, BORDER_RADIUS } from '../../constants/theme';
import { Typography } from '../ui/Typography';
import { RadioGroup } from '../ui/RadioGroup';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { parseDate, formatDate } from '../../utils/dateFormatter';

interface AsoSectionProps {
  control: Control<AsoFormData>;
  errors: FieldErrors<AsoFormData>;
  asoFile: any;
  handlePickDocument: () => void;
  handleRemoveDocument: () => void;
}

export const AsoSection: React.FC<AsoSectionProps> = ({
  control,
  errors,
  asoFile,
  handlePickDocument,
  handleRemoveDocument,
}) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showUploadError, setShowUploadError] = useState(false);

  return (
    <View style={styles.conditionalFields}>
      {/* ASO Type */}
      <View style={styles.fieldContainer}>
        <Typography variant="subtitle" style={styles.fieldLabel}>
          Tipo de ASO*
        </Typography>
        <Controller
          control={control}
          name="asoType"
          render={({ field: { onChange, value } }) => (
            <RadioGroup
              options={[
                {
                  label: 'Simples',
                  value: 'simples',
                  description:
                    'Documento obrigatório (NR-7) que atesta se o funcionário está apto ou inapto para exercer sua função, após avaliação médica.',
                },
                {
                  label: 'Completo',
                  value: 'completo',
                  description:
                    'Documento completo obrigatório (NR-7) que atesta se o profissional está apto para exercer sua função, com adicional de exame laboratorial que analisa uma amostra de fezes e unhas.',
                },
              ]}
              selectedValue={value}
              onSelect={onChange}
            />
          )}
        />
        {errors.asoType && (
          <Typography variant="error" style={styles.errorText}>
            {errors.asoType.message}
          </Typography>
        )}
      </View>

      {/* Issue Date */}
      <View style={styles.fieldContainer}>
        <Controller
          control={control}
          name="emissionDate"
          render={({ field: { onChange, value } }) => (
            <>
              <Input
                label="Data de emissão"
                required
                placeholder="Ex: 12/01/2026"
                value={value}
                editable={false}
                onPress={() => setShowDatePicker(true)}
                rightIcon={
                  <MaterialCommunityIcons 
                    name="calendar-month" 
                    size={20} 
                    color={COLORS.textPlaceholder} 
                  />
                }
                error={errors.emissionDate?.message}
              />
              <DateTimePickerModal
                isVisible={showDatePicker}
                mode="date"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                date={parseDate(value || '')}
                accentColor={COLORS.primary}
                buttonTextColorIOS={COLORS.primary}
                textColor="#000000"
                locale="pt-BR"
                onConfirm={(selectedDate) => {
                  setShowDatePicker(false);
                  if (selectedDate) {
                    onChange(formatDate(selectedDate));
                  }
                }}
                onCancel={() => setShowDatePicker(false)}
              />
            </>
          )}
        />
      </View>

      {/* Upload ASO */}
      <View style={styles.fieldContainer}>
        <Button
          title="Enviar ASO (.pdf)*"
          variant="outline"
          onPress={() => {
            if (asoFile) {
              setShowUploadError(true);
              return;
            }
            setShowUploadError(false);
            handlePickDocument();
          }}
          icon={
            <MaterialCommunityIcons 
              name="tray-arrow-up" 
              size={20} 
              color={COLORS.primary} 
            />
          }
        />
        
        {asoFile && (
          <View style={styles.fileContainer}>
            <Typography variant="body" color={COLORS.textMain} style={styles.fileName}>
              {asoFile.name}
            </Typography>
            <TouchableOpacity 
              onPress={() => {
                setShowUploadError(false);
                handleRemoveDocument();
              }} 
              style={styles.deleteIcon}
            >
              <MaterialCommunityIcons name="trash-can-outline" size={20} color={COLORS.textSecondary} />
            </TouchableOpacity>
          </View>
        )}

        {errors.asoFile && (
          <Typography variant="error" style={styles.errorText}>
            {errors.asoFile.message}
          </Typography>
        )}

        {/* Exibe o aviso somente se o usuário tentar enviar um segundo arquivo */}
        {showUploadError && (
          <Typography variant="caption" color={COLORS.error} style={styles.uploadDisclaimer}>
            Só é permitido enviar um documento. Para enviar outro, exclua o enviado.
          </Typography>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  conditionalFields: {
    marginTop: SPACING.md,
    gap: SPACING.lg,
  },
  fieldContainer: {
    width: '100%',
    marginBottom: SPACING.sm,
  },
  fieldLabel: {
    marginBottom: SPACING.sm,
  },
  errorText: {
    marginTop: SPACING.xs,
  },
  fileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    backgroundColor: COLORS.backgroundLight,
    marginTop: SPACING.sm,
  },
  fileName: {
    flex: 1,
  },
  deleteIcon: {
    padding: SPACING.xs,
  },
  uploadDisclaimer: {
    marginTop: SPACING.sm,
  },
});
