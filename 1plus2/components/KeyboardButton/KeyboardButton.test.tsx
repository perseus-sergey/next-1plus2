import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import KeyboardButton from './KeyboardButton';

describe('<KeyboardButton />', () => {
  test('it should mount', () => {
    render(<KeyboardButton />);
    
    const keyboardButton = screen.getByTestId('KeyboardButton');

    expect(keyboardButton).toBeInTheDocument();
  });
});