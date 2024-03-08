import React from "react";
import { Navigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";

const PublicRoute = ({ children }) => {
  const accessToken = secureLocalStorage.getItem("accessToken");

  return accessToken ? <Navigate to="/" /> : children;
};

export default PublicRoute;
