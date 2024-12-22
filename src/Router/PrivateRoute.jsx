import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    if (!loading) {
      setAuthChecked(true);
    }
  }, [loading]);

  if (!authChecked || loading) {
    return <span className="loading loading-ring loading-lg"></span>;
  }

  if (user) {
    return children;
  }

  return <Navigate to="/login" />;
};

export default PrivateRoute;
