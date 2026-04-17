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
let mockSafeAreaInsets = { top: 0, bottom: 0, left: 0, right: 0 };

jest.spyOn(RN, 'useWindowDimensions').mockImplementation(() => mockWindowDimensions as any);

import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context';

jest.mock('react-native-safe-area-context', () => {
  const inset = { top: 0, right: 0, bottom: 0, left: 0 };
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

describe('AppNavigator Responsiveness and Insets Tests', () => {
  const originalOS = Platform.OS;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    Platform.OS = originalOS;
  });

  it('should render the tab bar correctly on Android without navigation buttons (bottom insets = 0)', () => {
    Platform.OS = 'android';
    mockWindowDimensions = { width: 400, height: 800 }; // Portrait
    mockSafeAreaInsets = { top: 24, bottom: 0, left: 0, right: 0 }; // Sem botões

    const { getAllByText, getByText } = renderWithProvider(<AppNavigator />);
    
    // Verificamos se as tabs estão sendo renderizadas
    expect(getAllByText('Perfil').length).toBeGreaterThan(0);
    expect(getByText('Home')).toBeTruthy();
  });

  it('should render the tab bar correctly on Android with navigation buttons (bottom insets > 0)', () => {
    Platform.OS = 'android';
    mockWindowDimensions = { width: 400, height: 800 }; // Portrait
    mockSafeAreaInsets = { top: 24, bottom: 48, left: 0, right: 0 }; // Com botões (48px)

    const { getAllByText } = renderWithProvider(<AppNavigator />);
    
    expect(getAllByText('Perfil').length).toBeGreaterThan(0);
  });

  it('should adapt to landscape mode correctly', () => {
    Platform.OS = 'android';
    mockWindowDimensions = { width: 800, height: 400 }; // Landscape
    mockSafeAreaInsets = { top: 24, bottom: 0, left: 0, right: 0 }; // Sem botões embaixo

    const { getAllByText } = renderWithProvider(<AppNavigator />);
    
    expect(getAllByText('Perfil').length).toBeGreaterThan(0);
  });

  it('should adapt to tablet screens correctly', () => {
    Platform.OS = 'ios';
    mockWindowDimensions = { width: 810, height: 1080 }; // iPad Portrait
    mockSafeAreaInsets = { top: 24, bottom: 20, left: 0, right: 0 };

    const { getAllByText } = renderWithProvider(<AppNavigator />);
    
    expect(getAllByText('Perfil').length).toBeGreaterThan(0);
  });
});