import React from "react";
import { useAuth } from "../../context/AuthContext";

export default function Topbar() {
  const { logout, user } = useAuth();

  return (
    <header className="w-full flex items-center justify-between px-6 py-3 border-b border-purple-100 bg-white shadow-sm">
      <h1 className="text-xl font-bold text-indigo-600">
        Expense Tracker
      </h1>
      <div className="flex items-center gap-4">
        <span className="text-gray-600 text-sm hidden sm:block">
          {user?.email}
        </span>
        <button
          onClick={logout}
          className="px-3 py-1 bg-gradient-to-r from-red-400 to-red-500 text-white rounded-lg shadow hover:opacity-90"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
