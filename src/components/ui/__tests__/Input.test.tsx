import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Input } from '../Input';

describe('Input Component', () => {
  it('renders correctly with label', () => {
    const { getByText, getByPlaceholderText } = render(
      <Input label="Email" placeholder="Digite seu email" />
    );
    expect(getByText('Email')).toBeTruthy();
    expect(getByPlaceholderText('Digite seu email')).toBeTruthy();
  });

  it('displays error message when provided', () => {
    const { getByText } = render(
      <Input label="Nome" error="Nome é obrigatório" />
    );
    expect(getByText('Nome é obrigatório')).toBeTruthy();
  });

  it('handles text change', () => {
    const onChangeTextMock = jest.fn();
    const { getByPlaceholderText } = render(
      <Input placeholder="Digite algo" onChangeText={onChangeTextMock} />
    );
    
    const input = getByPlaceholderText('Digite algo');
    fireEvent.changeText(input, 'Novo texto');
    
    expect(onChangeTextMock).toHaveBeenCalledWith('Novo texto');
  });
});
