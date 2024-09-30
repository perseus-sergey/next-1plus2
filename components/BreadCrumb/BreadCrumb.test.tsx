import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import BreadCrumb from './BreadCrumb';

describe('<BreadCrumb />', () => {
  test('it should mount', () => {
    render(<BreadCrumb />);
    
    const breadCrumb = screen.getByTestId('BreadCrumb');

    expect(breadCrumb).toBeInTheDocument();
  });
});