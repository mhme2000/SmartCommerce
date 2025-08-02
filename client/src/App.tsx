import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import PortalLayout, { portalLoader } from '@/layouts/PortalLayout';
import ProductList from '@/pages/ProductList';
import ProductForm from '@/pages/ProductForm';

const router = createBrowserRouter([
  {
    path: '/',
    element: <PortalLayout />,
    loader: portalLoader,
    children: [
      {
        index: true,
        element: <ProductList />,
      },
      {
        path: 'novo',
        element: <ProductForm />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
