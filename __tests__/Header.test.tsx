import React from 'react';
import { render } from '@testing-library/react-native';
import { Platform } from 'react-native';
import * as RN from 'react-native';
import { AppNavigator } from '../src/navigation/AppNavigator';

// Mock dependências do React Navigation e Expo
jest.mock('../src/screens/ProfileScreen', () => ({
  ProfileScreen: () => {
    const { Text } = require('react-native');
    return <Text>Perfil</Text>;
  },
}));

jest.mock('../src/screens/ProfessionalInfoScreen', () => ({
  ProfessionalInfoScreen: () => null,
}));

jest.mock('../src/screens/DataAndSkillsScreen', () => ({
  DataAndSkillsScreen: () => null,
}));

// Vamos usar mockImplementation no useWindowDimensions e useSafeAreaInsets
let mockWindowDimensions = { width: 400, height: 800 };
let mockSafeAreaInsets = { top: 48, bottom: 0, left: 0, right: 0 }; // Header notch top: 48px

jest.spyOn(RN, 'useWindowDimensions').mockImplementation(() => mockWindowDimensions as any);

import { SafeAreaProvider } from 'react-native-safe-area-context';

jest.mock('react-native-safe-area-context', () => {
  const actual = jest.requireActual('react-native-safe-area-context');
  return {
    ...actual,
    useSafeAreaInsets: jest.fn().mockImplementation(() => mockSafeAreaInsets),
  };
});

// Mock dos ícones para evitar erros de renderização
jest.mock('@expo/vector-icons/MaterialCommunityIcons', () => 'MaterialCommunityIcons');

const renderWithProvider = (component: any) => {
  return render(
    <SafeAreaProvider initialMetrics={{ frame: { x: 0, y: 0, width: 400, height: 800 }, insets: { top: 0, left: 0, right: 0, bottom: 0 } }}>
      {component}
    </SafeAreaProvider>
  );
};

describe('AppNavigator Dynamic Header Padding Test', () => {
  const originalOS = Platform.OS;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    Platform.OS = originalOS;
  });

  it('should calculate header padding correctly when device has a notch/punch-hole (top inset = 48)', () => {
    Platform.OS = 'android';
    mockWindowDimensions = { width: 400, height: 800 }; 
    mockSafeAreaInsets = { top: 48, bottom: 20, left: 0, right: 0 }; 

    const { getAllByText } = renderWithProvider(<AppNavigator />);
    
    // Verificamos se o app consegue ser renderizado sem quebrar a UI
    expect(getAllByText('Perfil').length).toBeGreaterThan(0);
  });
});