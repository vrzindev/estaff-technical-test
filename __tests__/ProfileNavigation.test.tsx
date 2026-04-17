import React from 'react';
import { render } from '@testing-library/react-native';
import { BackHandler } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { ProfileScreen } from '../src/screens/ProfileScreen';

// Mock dependências do vetor de ícones que dependem do expo-font
jest.mock('@expo/vector-icons/MaterialCommunityIcons', () => 'MaterialCommunityIcons');

// Mock dependencies
jest.mock('@react-navigation/native', () => {
  const actual = jest.requireActual('@react-navigation/native');
  const ReactObj = require('react');
  return {
    ...actual,
    useNavigation: jest.fn(() => ({
      navigate: jest.fn(),
      goBack: jest.fn(),
      canGoBack: jest.fn(() => true),
    })),
    // Mock useFocusEffect to execute synchronously in testing
    useFocusEffect: (cb: any) => {
      // Simulate effect execution
      let cleanup: any;
      ReactObj.useEffect(() => {
        cleanup = cb();
        return () => {
          if (cleanup) cleanup();
        };
      }, [cb]);
    },
  };
});

describe('ProfileScreen Back Navigation Tests', () => {
  it('should intercept hardware back press and block exiting the tab', async () => {
    // Setup a spy on BackHandler.addEventListener
    const addEventListenerSpy = jest.spyOn(BackHandler, 'addEventListener');

    render(
      <NavigationContainer>
        <ProfileScreen />
      </NavigationContainer>
    );

    // Ensure the event listener was added for 'hardwareBackPress'
    expect(addEventListenerSpy).toHaveBeenCalledWith('hardwareBackPress', expect.any(Function));

    // Get the registered callback
    const backHandlerCallback = addEventListenerSpy.mock.calls[0][1];

    // Execute the callback and verify it returns true (which means the event is handled and default behavior is blocked)
    const result = backHandlerCallback();
    expect(result).toBe(true);

    addEventListenerSpy.mockRestore();
  });
});