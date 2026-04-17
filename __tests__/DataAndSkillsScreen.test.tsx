import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react-native';
import { DataAndSkillsScreen } from '../src/screens/DataAndSkillsScreen';
import { Linking } from 'react-native';
import * as fileHandler from '../src/utils/fileHandler';

jest.mock('@react-native-community/datetimepicker', () => {
  const React = require('react');
  const { View } = require('react-native');
  return (props: any) => {
    return <View testID="mock-datetime-picker" {...props} />;
  };
});

jest.mock('../src/utils/fileHandler', () => ({
  pickPdfDocument: jest.fn(),
}));

jest.mock('@expo/vector-icons/MaterialCommunityIcons', () => 'MaterialCommunityIcons');

describe('DataAndSkillsScreen Business Rules (Wireframe)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('Rule 1: Shows tooltip on question mark click and hides after 4 seconds', async () => {
    const { getByText, queryByText } = render(<DataAndSkillsScreen />);
    
    // Tooltip initially hidden
    const tooltipText = 'ASO (Atestado de Saúde Ocupacional) é um documento médico, emitido por um médico do trabalho, que avalia se o funcionário está apto ou inapto para exercer suas funções profissionais com segurança.';
    expect(queryByText(tooltipText)).toBeNull();

    // Click on the '?' icon
    const questionMark = getByText('?');
    fireEvent.press(questionMark);

    // Tooltip should be visible
    expect(getByText(tooltipText)).toBeTruthy();

    // Fast-forward 4 seconds
    act(() => {
      jest.advanceTimersByTime(4000);
    });

    // Tooltip should be hidden again
    await waitFor(() => {
      expect(queryByText(tooltipText)).toBeNull();
    });
  });

  it('Rule 2: Opens estaff.com.br/rpa when "Saiba mais" is clicked', () => {
    const linkingSpy = jest.spyOn(Linking, 'openURL');
    const { getByText } = render(<DataAndSkillsScreen />);
    
    fireEvent.press(getByText('Saiba mais'));
    
    expect(linkingSpy).toHaveBeenCalledWith('https://estaff.com.br/rpa');
  });

  it('Rule 3: Checking "Possui ASO" reveals 3 mandatory fields', async () => {
    const { getByText, queryByText } = render(<DataAndSkillsScreen />);
    
    // Initially fields are hidden
    expect(queryByText('Tipo de ASO*')).toBeNull();
    expect(queryByText('Data de emissão*')).toBeNull(); // Using label text from Input
    expect(queryByText('Enviar ASO (.pdf)*')).toBeNull();

    // Check "Possui ASO"
    fireEvent.press(getByText('Possui ASO'));

    // Fields should now be visible
    await waitFor(() => {
      expect(getByText('Tipo de ASO*')).toBeTruthy();
      expect(getByText('Data de emissão*')).toBeTruthy();
      expect(getByText('Enviar ASO (.pdf)*')).toBeTruthy();
    });
  });

  it('Rule 4: Clicking "Enviar ASO" opens file picker', async () => {
    const pickDocumentSpy = jest.spyOn(fileHandler, 'pickPdfDocument').mockResolvedValue(null);
    const { getByText } = render(<DataAndSkillsScreen />);
    
    // Check "Possui ASO" to reveal the button
    fireEvent.press(getByText('Possui ASO'));

    await waitFor(() => {
      fireEvent.press(getByText('Enviar ASO (.pdf)*'));
    });

    expect(pickDocumentSpy).toHaveBeenCalledTimes(1);
  });

  it('Rule 5: "Salvar" shows specific validation errors if ASO fields are empty', async () => {
    const { getByText, queryByText, findByText } = render(<DataAndSkillsScreen />);
    
    // Check "Possui ASO"
    fireEvent.press(getByText('Possui ASO'));

    // Try to save without filling the 3 mandatory fields
    await waitFor(() => {
      fireEvent.press(getByText('Salvar'));
    });

    // Check for exact error messages from the wireframe
    expect(await findByText('É necessário escolher um tipo de ASO para continuar')).toBeTruthy();
    expect(await findByText('É necessário inserir a data de emissão para continuar')).toBeTruthy();
    expect(await findByText('É obrigatório enviar o documento ASO')).toBeTruthy();
  });

  it('Rule 6: Duplicate file upload error', async () => {
    // Mock the file picker to return a valid file
    jest.spyOn(fileHandler, 'pickPdfDocument').mockResolvedValue({
      name: 'meu_aso.pdf',
      uri: 'file://meu_aso.pdf',
      type: 'application/pdf',
      size: 1024,
    });

    const { getByText, findByText, queryByText } = render(<DataAndSkillsScreen />);
    
    // Check "Possui ASO"
    fireEvent.press(getByText('Possui ASO'));

    // Click "Enviar ASO" to upload the first file
    await waitFor(() => {
      fireEvent.press(getByText('Enviar ASO (.pdf)*'));
    });

    // Verify the file was added
    expect(await findByText('meu_aso.pdf')).toBeTruthy();

    // The error message should NOT be visible yet
    const duplicateErrorText = 'Só é permitido enviar um documento. Para enviar outro, exclua o enviado.';
    expect(queryByText(duplicateErrorText)).toBeNull();

    // Click "Enviar ASO" AGAIN
    fireEvent.press(getByText('Enviar ASO (.pdf)*'));

    // Verify the duplicate error message IS shown
    expect(await findByText(duplicateErrorText)).toBeTruthy();
  });
});
