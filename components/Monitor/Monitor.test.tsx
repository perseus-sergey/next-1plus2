import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Monitor from './Monitor';

describe('<Monitor />', () => {
  test('it should mount', () => {
    render(<Monitor />);
    
    const monitor = screen.getByTestId('Monitor');

    expect(monitor).toBeInTheDocument();
  });
});