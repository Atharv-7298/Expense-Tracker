import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";

import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext.jsx";
import { ExpenseProvider } from "./context/ExpenseContext.jsx";
import { IncomeProvider } from "./context/IncomeContext.jsx"; // ✅ new import

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ExpenseProvider>
          <IncomeProvider> {/* ✅ wrap inside here */}
            <App />
            <Toaster position="top-right" />
          </IncomeProvider>
        </ExpenseProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
