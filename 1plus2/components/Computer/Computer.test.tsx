import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Computer from './Computer';

describe('<Computer />', () => {
  test('it should mount', () => {
    render(<Computer />);
    
    const computer = screen.getByTestId('Computer');

    expect(computer).toBeInTheDocument();
  });
});