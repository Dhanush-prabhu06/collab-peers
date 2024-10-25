// src/utils/ProtectedRoutes.js
import React from "react";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("authToken");

  if (isAuthenticated) {
    // If user is not authenticated, redirect to login page
    return <Navigate to="/home" />;
  }

  // If user is authenticated, allow access to the route
  return children;
};

export default PublicRoute;
