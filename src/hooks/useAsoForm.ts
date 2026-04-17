import { useState, useRef, useEffect } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { AsoFormData } from '../types/aso';
import { asoSchema } from '../validations/asoSchema';
import { asoService } from '../services/asoService';
import { pickPdfDocument } from '../utils/fileHandler';
import { Logger } from '../services/loggerService';

interface Notification {
  type: 'error' | 'success';
  message: string;
}

interface UseAsoFormReturn {
  form: UseFormReturn<AsoFormData>;
  isLoading: boolean;
  onSubmit: (data: AsoFormData) => Promise<void>;
  handlePickDocument: () => Promise<void>;
  handleRemoveDocument: () => void;
  tooltipVisible: boolean;
  showTooltip: () => void;
  hideTooltip: () => void;
  notification: Notification | null;
  clearNotification: () => void;
}

export const useAsoForm = (): UseAsoFormReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [notification, setNotification] = useState<Notification | null>(null);

  const clearNotification = () => setNotification(null);

  const tooltipTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const clearTooltipTimeout = () => {
    if (tooltipTimeoutRef.current) {
      clearTimeout(tooltipTimeoutRef.current);
      tooltipTimeoutRef.current = null;
    }
  };

  useEffect(() => {
    return () => clearTooltipTimeout();
  }, []);

  // Initialize react-hook-form with zod schema
  const form = useForm<AsoFormData>({
    resolver: zodResolver(asoSchema),
    defaultValues: {
      bio: 'Trabalho em equipe, estou sempre aberta a conhecer melhor sobre a área em que vou trabalhar para melhor desenvolvimento.',
      hasAso: false,
      hasZigPayExperience: true, // Based on mock screens where this is checked
      asoType: undefined,
      emissionDate: '',
      asoFile: undefined,
    },
    mode: 'onSubmit', // Validate on submit first
  });

  const { watch, setValue, clearErrors } = form;
  const currentFile = watch('asoFile');

  /**
   * Submits the form data using our mocked service.
   * Handles the loading state.
   */
  const onSubmit = async (data: AsoFormData) => {
    clearNotification();
    setIsLoading(true);
    try {
      const response = await asoService.submitAsoData(data);
      if (response.success) {
        setNotification({ type: 'success', message: response.message });
      }
    } catch (error) {
      setNotification({ type: 'error', message: 'Ocorreu um erro ao salvar os dados.' });
      Logger.error('useAsoForm.onSubmit', error);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handles document picking using expo-document-picker.
   * Applies the rule: "Só é permitido enviar um documento."
   */
  const handlePickDocument = async () => {
    clearNotification();
    if (currentFile) {
      // Don't show generic notification anymore, just rely on the inline one
      return;
    }

    try {
      const file = await pickPdfDocument();
      if (!file) return;

      setValue('asoFile', file);
      clearErrors('asoFile');
    } catch (err) {
      Logger.error('useAsoForm.handlePickDocument', err);
      setNotification({ type: 'error', message: 'Falha ao selecionar o documento.' });
    }
  };

  const handleRemoveDocument = () => {
    setValue('asoFile', undefined);
  };

  const showTooltip = () => {
    setTooltipVisible(true);
    clearTooltipTimeout();
    tooltipTimeoutRef.current = setTimeout(() => {
      setTooltipVisible(false);
    }, 4000);
  };
  
  const hideTooltip = () => {
    setTooltipVisible(false);
    clearTooltipTimeout();
  };

  return {
    form,
    isLoading,
    onSubmit,
    handlePickDocument,
    handleRemoveDocument,
    tooltipVisible,
    showTooltip,
    hideTooltip,
    notification,
    clearNotification,
  };
};
