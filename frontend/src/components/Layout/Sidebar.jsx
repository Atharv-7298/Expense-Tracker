import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Sidebar() {
  const { user } = useAuth();
  const location = useLocation();

  const active = (path) =>
    location.pathname === path
      ? "bg-gradient-to-r from-indigo-500/10 to-purple-500/10 text-indigo-600 font-semibold shadow-sm"
      : "text-gray-600 hover:bg-purple-50";

  return (
    <aside className="w-64 h-full bg-white border-r border-purple-100 shadow-lg shadow-purple-100 flex flex-col">
      {/* ---------- USER PROFILE ---------- */}
      <div className="flex flex-col items-center py-6 border-b border-purple-100 bg-gradient-to-b from-white to-purple-50">
        {user?.profileImage ? (
          <img
            src={`${import.meta.env.VITE_API_BASE_URL.replace("/api", "")}/${user.profileImage}`}
            alt="avatar"
            className="w-20 h-20 rounded-full object-cover border-2 border-indigo-400 shadow-md"
          />
        ) : (
          <div className="w-20 h-20 rounded-full bg-indigo-100 flex items-center justify-center text-2xl font-bold text-indigo-700 shadow-sm">
            {user?.name?.charAt(0)?.toUpperCase() || "U"}
          </div>
        )}
        <div className="text-center mt-3">
          <h3 className="font-semibold text-lg text-gray-800">{user?.name}</h3>
          <p className="text-sm text-gray-500">{user?.email}</p>
        </div>
      </div>

      {/* ---------- NAV LINKS ---------- */}
      <nav className="flex-1 flex flex-col gap-1 px-4 mt-4">
        {[
          { to: "/dashboard", label: "🏠 Dashboard" },
          { to: "/expense", label: "💸 Expense" },
          { to: "/add-expense", label: "➕ Add Expense" },
          { to: "/income", label: "💰 Income" },
          { to: "/add-income", label: "➕ Add Income" },
          { to: "/profile", label: "👤 Profile" },
        ].map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={`rounded-lg px-3 py-2 flex items-center gap-2 transition-all duration-200 ${active(
              link.to
            )}`}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      {/* ---------- LOGOUT ---------- */}
      <div className="p-4 border-t border-purple-100">
        <button
          onClick={() => {
            localStorage.clear();
            window.location.href = "/login";
          }}
          className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-2 rounded-xl font-semibold hover:opacity-90 transition-all"
        >
          🚪 Logout
        </button>
      </div>
    </aside>
  );
}
