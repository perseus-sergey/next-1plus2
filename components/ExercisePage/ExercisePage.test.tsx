import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ExercisePage from './ExercisePage';

describe('<ExercisePage />', () => {
  test('it should mount', () => {
    render(<ExercisePage />);
    
    const exercisePage = screen.getByTestId('ExercisePage');

    expect(exercisePage).toBeInTheDocument();
  });
});