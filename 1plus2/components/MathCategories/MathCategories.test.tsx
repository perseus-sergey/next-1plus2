import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import MathCategories from './MathCategories';

describe('<MathCategories />', () => {
  test('it should mount', () => {
    render(<MathCategories />);
    
    const mathCategories = screen.getByTestId('MathCategories');

    expect(mathCategories).toBeInTheDocument();
  });
});