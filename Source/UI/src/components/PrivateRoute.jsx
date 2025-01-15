import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppContext } from '../AppContext'; // Import the hook
import UnauthorizedPage from '../pages/Unauthorize';

const PrivateRoute = () => {
  const { isAuthenticated } = useAppContext(); // Get authentication state from context

  // If the user is not authenticated, redirect to the login page
  if (!isAuthenticated()) {
    console.log('User is not authenticated');
    return <UnauthorizedPage />;
  }
  // If authenticated, render the child components
  return <Outlet />;
};

export default PrivateRoute;
