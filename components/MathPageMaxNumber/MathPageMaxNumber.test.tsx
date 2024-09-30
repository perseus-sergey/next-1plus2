import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import MathPageMaxNumber from './MathPageMaxNumber';

describe('<MathPageMaxNumber />', () => {
  test('it should mount', () => {
    render(<MathPageMaxNumber />);
    
    const mathPageMaxNumber = screen.getByTestId('MathPageMaxNumber');

    expect(mathPageMaxNumber).toBeInTheDocument();
  });
});