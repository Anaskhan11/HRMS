import React from "react";
import { Navigate } from "react-router-dom";

import secureLocalStorage from "react-secure-storage";

const PublicRoute = ({ children }) => {
  const auth = secureLocalStorage.getItem("accessToken");

  return auth ? <Navigate to="/" /> : children;
};

export default PublicRoute;
