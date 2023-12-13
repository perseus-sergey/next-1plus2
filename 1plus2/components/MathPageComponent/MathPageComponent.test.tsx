import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import MathPageComponent from './MathPageComponent.test';

describe('<MathPageComponent />', () => {
  test('it should mount', () => {
    render(<MathPageComponent />);

    const mathCategories = screen.getByTestId('MathPageComponent');

    expect(mathCategories).toBeInTheDocument();
  });
});
