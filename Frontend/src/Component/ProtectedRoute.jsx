import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { toast } from "react-toastify";
import { FaSpinner } from "react-icons/fa";

export default function ProtectedRoute() {
  const { loadingAuth, isAuthenticated } = useAuth();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!loadingAuth && (!token || !isAuthenticated)) {
      toast.error("Unauthorized access: Please log in to access the Admin Dashboard.");
    }
  }, [loadingAuth, token, isAuthenticated]);

  // 1. Show loading spinner while initializing authentication state on reload
  if (loadingAuth) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "1rem",
          minHeight: "100vh",
          backgroundColor: "#0f172a",
          color: "#f59e0b",
        }}
      >
        <FaSpinner
          style={{ fontSize: "2.5rem", animation: "spin 1s linear infinite" }}
        />
        <span style={{ fontSize: "0.95rem", color: "#cbd5e1" }}>
          Verifying Admin Credentials...
        </span>
      </div>
    );
  }

  // 2. Redirect to login if unauthenticated after loading finishes
  if (!token || !isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
}
