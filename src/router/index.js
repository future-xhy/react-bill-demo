import Layout from '@/pages/Layout';
import Month from '@/pages/Month';
import Year from '@/pages/Year';
import New from '@/pages/new';
import { createBrowserRouter } from 'react-router-dom';

export default createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: 'year',
        element: <Year />
      },
      {
        // index: true,
        path: 'month',
        element: <Month />
      },
    ]
  },
  {
    path: 'new',
    element: <New />
  }
])