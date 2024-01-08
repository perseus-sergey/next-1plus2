import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import FlyingDigits from './FlyingDigits';

describe('<FlyingDigits />', () => {
  test('it should mount', () => {
    render(<FlyingDigits />);
    
    const flyingDigits = screen.getByTestId('FlyingDigits');

    expect(flyingDigits).toBeInTheDocument();
  });
});