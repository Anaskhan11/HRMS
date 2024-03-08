import React from "react";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";

function RequireAuth() {
  let location = useLocation();

  // Get the user from the secureLocalStorage
  const accessToken = secureLocalStorage.getItem("accessToken");

  if (!accessToken) {
    // Redirect them to the /login page, but save the current location they were trying to go to
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  console.log("accessToken here", accessToken);
  // Since accessToken exists, render the children routes
  return <Outlet />; // Replace children with Outlet for nested routes rendering
}

export default RequireAuth;
