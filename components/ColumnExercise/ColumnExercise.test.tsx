import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ColumnExercise from './ColumnExercise';

describe('<ColumnExercise />', () => {
  test('it should mount', () => {
    render(<ColumnExercise />);
    
    const columnExercise = screen.getByTestId('ColumnExercise');

    expect(columnExercise).toBeInTheDocument();
  });
});