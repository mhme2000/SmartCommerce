import React from 'react';
import { render } from '@testing-library/react';
import { ProductCard } from '@/components/ProductCard';

describe('ProductCard', () => {
  it('renders product basic info', () => {
    const product = {
      id: 1,
      name: 'Produto A',
      description: 'Desc',
      price: 10,
      category: 'Cat',
      pictureUrl: '',
    };
    const { getByText } = render(<ProductCard product={product as any} />);
    expect(getByText('Produto A')).toBeInTheDocument();
    expect(getByText(/Código: 1/)).toBeInTheDocument();
  });
});


