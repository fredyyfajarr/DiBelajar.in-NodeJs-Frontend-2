import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuthStore from '/src/store/authStore.js';

const RoleBasedRoute = ({ allowedRoles }) => {
  const { user } = useAuthStore();

  // Jika rolenya termasuk dalam yang diizinkan, tampilkan konten.
  // Jika tidak, arahkan ke dashboard biasa.
  return allowedRoles.includes(user?.role) ? (
    <Outlet />
  ) : (
    <Navigate to="/dashboard" replace />
  );
};

export default RoleBasedRoute;
