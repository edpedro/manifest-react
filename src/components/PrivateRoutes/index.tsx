import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/hooks/Auth";
import { GlobalLoader } from "../Loader";

const PrivateRoutes = () => {
  const { authenticated, loadingAuth } = useAuth();

  if (loadingAuth) {
    return <GlobalLoader />; // ou um spinner bonito
  }

  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default PrivateRoutes;
