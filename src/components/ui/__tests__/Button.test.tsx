import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Button } from '../Button';

describe('Button Component', () => {
  it('renders correctly with default variant', () => {
    const { getByText } = render(<Button title="Salvar" onPress={() => {}} />);
    expect(getByText('Salvar')).toBeTruthy();
  });

  it('calls onPress when clicked', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(<Button title="Clique aqui" onPress={onPressMock} />);
    
    fireEvent.press(getByText('Clique aqui'));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it('does not call onPress when disabled', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(<Button title="Bloqueado" onPress={onPressMock} disabled />);
    
    fireEvent.press(getByText('Bloqueado'));
    expect(onPressMock).not.toHaveBeenCalled();
  });
});
