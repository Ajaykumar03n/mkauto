import React from "react";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const isAuth = localStorage.getItem("admin-auth") === "true";
  return isAuth ? children : <Navigate to="/admin" />;
}

export default PrivateRoute;
