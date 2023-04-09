import { Navigate, useRoutes } from 'react-router-dom';
import Alert from '@mui/material/Alert';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';

import account from './_mock/account';
import { isAuthenticated } from './_mock/account';

// ----------------------------------------------------------------------

export default function Router() {

  const routes = useRoutes([
    {
      path: '/dashboard',
      element: account.authenticated ? <DashboardLayout /> : <Navigate to="/login" />,
      children: [
        { element: <Navigate to="/dashboard/home" />, index: true },
        { path: 'home', element: account.authenticated ? <DashboardAppPage /> : <Navigate to="/login" /> },
        { path: 'appointmenthistory', element: account.authenticated ? <UserPage /> : <Navigate to="/login" /> },
        { path: 'bookappointment', element: account.authenticated ? <ProductsPage /> : <Navigate to="/login" /> },
        { path: 'profile', element: account.authenticated ? <BlogPage /> : <Navigate to="/login" /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: 'register',
      element: <RegisterPage />
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
};
