import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext.jsx";

import Login from "./pages/Auth/Login.jsx";
import Register from "./pages/Auth/Register.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import Expense from "./pages/Expense/Expense.jsx";
import AddExpense from "./pages/Expense/AddExpense.jsx";
import EditExpense from "./pages/Expense/EditExpense.jsx";
import Income from "./pages/Income/Income.jsx";
import AddIncome from "./pages/Income/AddIncome.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";

export default function App() {
  const { user } = useAuth();

  return (
    <Routes>
      {/* ---------- PUBLIC ROUTES ---------- */}
      <Route
        path="/login"
        element={!user ? <Login /> : <Navigate to="/dashboard" />}
      />
      <Route
        path="/register"
        element={!user ? <Register /> : <Navigate to="/dashboard" />}
      />

      {/* ---------- PROTECTED ROUTES ---------- */}

      {/* Dashboard */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* Expense Management */}
      <Route
        path="/expense"
        element={
          <ProtectedRoute>
            <Expense /> {/* Overview page for expense analysis */}
          </ProtectedRoute>
        }
      />
      <Route
        path="/add-expense"
        element={
          <ProtectedRoute>
            <AddExpense />
          </ProtectedRoute>
        }
      />
      <Route
        path="/edit-expense/:id"
        element={
          <ProtectedRoute>
            <EditExpense />
          </ProtectedRoute>
        }
      />

      {/* Income Management */}
      <Route
        path="/income"
        element={
          <ProtectedRoute>
            <Income />
          </ProtectedRoute>
        }
      />
      <Route
        path="/add-income"
        element={
          <ProtectedRoute>
            <AddIncome />
          </ProtectedRoute>
        }
      />

      {/* Profile */}
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />    
      {/* ---------- DEFAULT REDIRECT ---------- */}
      <Route
        path="*"
        element={<Navigate to={user ? "/dashboard" : "/login"} />}
      />
    </Routes>
  );
}
