import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Image,
} from 'react-native';
import { Controller } from 'react-hook-form';

import { useAsoForm } from '../hooks/useAsoForm';
import { COLORS, SPACING, BORDER_RADIUS } from '../constants/theme';
import { Typography } from '../components/ui/Typography';
import { Checkbox } from '../components/ui/Checkbox';
import { Button } from '../components/ui/Button';
import { Tooltip } from '../components/ui/Tooltip';
import { BioSection } from '../components/forms/BioSection';
import { AsoSection } from '../components/forms/AsoSection';

export const DataAndSkillsScreen: React.FC = () => {
  const {
    form,
    isLoading,
    onSubmit,
    handlePickDocument,
    handleRemoveDocument,
    tooltipVisible,
    showTooltip,
    hideTooltip,
    notification,
  } = useAsoForm();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = form;

  const hasAso = watch('hasAso');
  const asoFile = watch('asoFile');

  const openSaibaMais = () => {
    Linking.openURL('https://estaff.com.br/rpa');
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Descrição Section */}
        <BioSection control={control} />

        <View style={styles.divider} />

        {/* Has ASO Section */}
        <View style={styles.section}>
          <View style={styles.checkboxRow}>
            <Controller
              control={control}
              name="hasAso"
              render={({ field: { onChange, value } }) => (
                <View style={styles.checkboxWithTooltip}>
                  <Checkbox
                    label="Possui ASO"
                    checked={value}
                    onChange={onChange}
                  />
                  <Tooltip
                    visible={tooltipVisible}
                    onClose={hideTooltip}
                    text="ASO (Atestado de Saúde Ocupacional) é um documento médico, emitido por um médico do trabalho, que avalia se o funcionário está apto ou inapto para exercer suas funções profissionais com segurança."
                  >
                    <TouchableOpacity onPress={showTooltip} style={styles.iconButton}>
                      <Typography variant="caption" color={COLORS.textPlaceholder}>
                        ?
                      </Typography>
                    </TouchableOpacity>
                  </Tooltip>
                </View>
              )}
            />
            <TouchableOpacity 
              onPress={openSaibaMais} 
              style={{ flexDirection: 'row', alignItems: 'center' }}
              activeOpacity={0.7}
            >
              <Typography variant="body" color={COLORS.primary} style={styles.saibaMais}>
                Saiba mais
              </Typography>
              <Image 
                source={require('../../assets/figma/image/screenshot_I1_1470;10_844.png')} 
                style={{ width: 16, height: 16, marginLeft: 4, tintColor: '#808080' }} 
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>

          {/* Conditional ASO Fields */}
          {hasAso && (
            <AsoSection 
              control={control}
              errors={errors}
              asoFile={asoFile}
              handlePickDocument={handlePickDocument}
              handleRemoveDocument={handleRemoveDocument}
            />
          )}
        </View>

        <View style={styles.divider} />

        {/* ZigPay Experience Section */}
        <View style={styles.section}>
          <Controller
            control={control}
            name="hasZigPayExperience"
            render={({ field: { onChange, value } }) => (
              <Checkbox
                label="Experiência com ZigPay"
                checked={value}
                onChange={onChange}
              />
            )}
          />
          <Typography variant="body" color={COLORS.textSecondary} style={styles.zigPayDesc}>
            ZigPay é uma plataforma que automatiza as rotinas de gestão de pagamento de estabelecimentos e eventos.
          </Typography>
        </View>

        {/* Footer / Submit Button */}
        <View style={styles.footer}>
          {notification && (
            <View style={[
              styles.notificationContainer,
              notification.type === 'error' ? styles.notificationError : styles.notificationSuccess
            ]}>
              <Typography 
                variant="body" 
                color={notification.type === 'error' ? COLORS.error : '#155724'}
              >
                {notification.message}
              </Typography>
            </View>
          )}
          <Button
            title="Salvar"
            onPress={handleSubmit(onSubmit)}
            loading={isLoading}
            disabled={false} 
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: SPACING.xxl,
  },
  section: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.borderLight,
    marginHorizontal: SPACING.lg,
  },
  checkboxRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  checkboxWithTooltip: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: SPACING.xs,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: COLORS.borderLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saibaMais: {
    textDecorationLine: 'none',
  },
  zigPayDesc: {
    marginTop: SPACING.xs,
    marginLeft: 32, // align with checkbox text
  },
  footer: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.lg,
    marginTop: 'auto', // Pushes to bottom if space allows
  },
  notificationContainer: {
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    marginBottom: SPACING.md,
    borderWidth: 1,
  },
  notificationError: {
    backgroundColor: '#fff3f3',
    borderColor: COLORS.error,
  },
  notificationSuccess: {
    backgroundColor: '#d4edda',
    borderColor: '#c3e6cb',
  },
});
