import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../api";
import toast from "react-hot-toast";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  // Persist user in local storage
  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }, [user]);

  // Login user
  const login = async (email, password) => {
    try {
      const { data } = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", data.token);
      setUser(data.user);
      toast.success("Login successful!");
      return true;
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid credentials");
      return false;
    }
  };

  // Register user
  const register = async (formData) => {
    try {
      const { data } = await api.post("/auth/register", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      localStorage.setItem("token", data.token);
      setUser(data.user);
      toast.success("Account created successfully!");
      return true;
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
      return false;
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    toast("Logged out");
  };

  // Refresh user profile
  const refreshProfile = async () => {
    try {
      const { data } = await api.get("/user/profile");
      setUser(data.user);
    } catch (err) {
      console.error("Profile fetch error:", err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
