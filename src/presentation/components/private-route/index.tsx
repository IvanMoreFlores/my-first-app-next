import React from "react";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAuthenticated = localStorage.getItem("auth") === "true";

  return isAuthenticated ? children : <Navigate to="/login" />;
}
