import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import WrongSegment from './WrongSegment';

describe('<WrongSegment />', () => {
  test('it should mount', () => {
    render(<WrongSegment />);
    
    const wrongSegment = screen.getByTestId('WrongSegment');

    expect(wrongSegment).toBeInTheDocument();
  });
});