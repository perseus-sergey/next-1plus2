import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import EndLevel from './EndLevel';

describe('<EndLevel />', () => {
  test('it should mount', () => {
    render(<EndLevel />);
    
    const endLevel = screen.getByTestId('EndLevel');

    expect(endLevel).toBeInTheDocument();
  });
});