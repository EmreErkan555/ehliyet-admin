import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'

function PrivateRoute({ children }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return children;
}

export default PrivateRoute;
