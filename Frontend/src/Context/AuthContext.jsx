import React, { createContext, useContext, useState, useEffect } from "react";
import { getAdminMe, adminLogout } from "../services/api";
import { toast } from "react-toastify";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [adminUser, setAdminUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  const fetchAuthUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setAdminUser(null);
      setLoadingAuth(false);
      return;
    }

    try {
      const res = await getAdminMe();
      if (res?.success && res.user) {
        setAdminUser(res.user);
      } else if (res?.user) {
        setAdminUser(res.user);
      }
    } catch (err) {
      // Only clear token if server explicitly returned 401 (Invalid/expired token)
      if (err.response && err.response.status === 401) {
        localStorage.removeItem("token");
        setAdminUser(null);
      }
    } finally {
      setLoadingAuth(false);
    }
  };

  useEffect(() => {
    fetchAuthUser();
  }, []);

  const logoutUser = async () => {
    try {
      await adminLogout();
    } catch (err) {
      console.log("Logged out locally");
    } finally {
      localStorage.removeItem("token");
      toast.success("Logout successful");
      setAdminUser(null);
      window.location.href = "/";
    }
  };

  return (
    <AuthContext.Provider
      value={{
        adminUser,
        loadingAuth,
        fetchAuthUser,
        logoutUser,
        isAuthenticated: !!localStorage.getItem("token"),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
