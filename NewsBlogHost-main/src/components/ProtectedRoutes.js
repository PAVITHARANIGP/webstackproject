import React from "react";
import { Navigate } from "react-router-dom";
import { useUserAuth } from "./Context";

const ProtectedRoutes = ({ children }) => {
  let { user } = useUserAuth();
  if (!user) {
    <Navigate to="/" />;
  }
  return children;
};

export default ProtectedRoutes;
