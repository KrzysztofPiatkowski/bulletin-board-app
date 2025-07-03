import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ user, isUserLoading, children }) => {
  // Jeśli nadal trwa ładowanie – nie pokazuj nic (można też spinnera)
  if (isUserLoading) return null;

  // Jeśli NIEzalogowany – przekierowanie
  if (!user) return <Navigate to="/auth/login" />;

  // Zalogowany – pokazujemy dzieci
  return children;
};

export default PrivateRoute;
