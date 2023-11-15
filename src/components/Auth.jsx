import React from 'react';
import { Navigate, Route } from 'react-router-dom';

export default function Auth({ Component, path }) {
  const token = sessionStorage.getItem('token');

  if (!token) return <Navigate to="/login" />;

  if (path) return <Route path={path} element={<Component />} />;

  return <Component />;
}
