import React from 'react';
import { render } from '@testing-library/react';
import ProductList from '@/pages/ProductList';
import { MemoryRouter, Outlet } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useOutletContext: () => ({ products: [] }),
}));

describe('ProductList', () => {
  it('shows empty message when no products', () => {
    const { getByText } = render(
      <MemoryRouter>
        <ProductList />
      </MemoryRouter>
    );
    expect(!!getByText('Não existem produtos cadastrados')).toBe(true);
  });
});


