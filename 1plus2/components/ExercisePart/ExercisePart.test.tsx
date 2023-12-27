import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ExercisePart from './ExercisePart';

describe('<ExercisePart />', () => {
  test('it should mount', () => {
    render(<ExercisePart />);
    
    const exercisePart = screen.getByTestId('ExercisePart');

    expect(exercisePart).toBeInTheDocument();
  });
});