import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'
import { USER_ROLES } from "./constants";

function UsersRoute({ children }) {
  const { user } = useAuth();

  if (user?.role.id !== USER_ROLES.ADMIN && user?.role.id !== USER_ROLES.COURSEADMIN) {
    return <Navigate to="/" />;
  }

  return children;
}

export default UsersRoute;
