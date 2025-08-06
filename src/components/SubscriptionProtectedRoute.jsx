import React from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const SubscriptionProtectedRoute = ({ children }) => {
  const { isSubscribed, loading } = useAuth();

  if (loading) return null;

  if (!isSubscribed) {
    return <Navigate to="/subscribe" replace />;
  }

  return children;
};

export default SubscriptionProtectedRoute;
