import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import EndLevelScreen from './EndLevelScreen';

describe('<EndLevelScreen />', () => {
  test('it should mount', () => {
    render(<EndLevelScreen />);
    
    const endLevelScreen = screen.getByTestId('EndLevelScreen');

    expect(endLevelScreen).toBeInTheDocument();
  });
});