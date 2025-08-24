import React from 'react';
import { render } from '@testing-library/react';
import ProductForm from '@/pages/ProductForm';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
  useRevalidator: () => ({ revalidate: jest.fn() }),
}));

describe('ProductForm', () => {
  it('renders form labels', () => {
    const { getByLabelText } = render(<ProductForm />);
    expect(getByLabelText('ID')).toBeInTheDocument();
    expect(getByLabelText('Nome')).toBeInTheDocument();
  });
});



