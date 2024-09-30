import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CatComplete from './CatComplete';

describe('<CatComplete />', () => {
  test('it should mount', () => {
    render(<CatComplete />);
    
    const catComplete = screen.getByTestId('CatComplete');

    expect(catComplete).toBeInTheDocument();
  });
});