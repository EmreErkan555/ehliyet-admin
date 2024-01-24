import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'
import { USER_ROLES } from "./constants";

function AdminRoute({ children }) {
  const { user } = useAuth();

  if (user?.role.id !== USER_ROLES.ADMIN) {
    return <Navigate to="/" />;
  }

  return children;
}

export default AdminRoute;
