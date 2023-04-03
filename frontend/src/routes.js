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

import isAuthenticated from './_mock/authenticate'

// ----------------------------------------------------------------------

export default function Router() {

  const authenticated = isAuthenticated();
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: authenticated ? <DashboardLayout /> : <Navigate to="/login" />,
      children: [
        { element: <Navigate to="/dashboard/home" />, index: true },
        { path: 'home', element: authenticated ? <DashboardAppPage /> : <Navigate to="/login" /> },
        { path: 'appointmenthistory', element: authenticated ? <UserPage /> : <Navigate to="/login" /> },
        { path: 'bookappointment', element: authenticated ? <ProductsPage /> : <Navigate to="/login" /> },
        { path: 'profile', element: authenticated ? <BlogPage /> : <Navigate to="/login" /> },
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
