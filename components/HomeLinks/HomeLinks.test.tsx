import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import HomeLinks from './HomeLinks';

describe('<HomeLinks />', () => {
  test('it should mount', () => {
    render(<HomeLinks />);
    
    const homeLinks = screen.getByTestId('HomeLinks');

    expect(homeLinks).toBeInTheDocument();
  });
});