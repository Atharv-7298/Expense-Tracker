import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import img1 from "../../assets/image.png";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ok = await login(email, password);
    if (ok) navigate("/dashboard");
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Section (Form) */}
      <div className="flex-1 flex items-center justify-center bg-gray px-10">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white p-8 rounded-3xl shadow-lg"
        >
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Expense Tracker
          </h1>
          <p className="text-gray-500 mb-8">
            Welcome back 👋 Please enter your details to log in.
          </p>

          <label className="text-sm font-medium text-gray-700 mb-1 block">
            Email Address
          </label>
          <input
            type="email"
            placeholder="john@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <label className="text-sm font-medium text-gray-700 mb-1 block">
            Password
          </label>
          <input
            type="password"
            placeholder="Min 8 Characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-6 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold py-2 rounded-lg hover:opacity-90 transition"
          >
            LOGIN
          </button>

          <p className="text-sm text-center mt-4 text-gray-600">
            Don’t have an account?{" "}
            <Link to="/register" className="text-indigo-600 hover:underline">
              Sign Up
            </Link>
          </p>
        </form>
      </div>

      {/* Right Section (Landing Visual) */}
      {/* Right Section (Dashboard Style – Final Polished) */}
<div className="hidden lg:flex flex-1 bg-gradient-to-br from-[#f8f6ff] via-[#f4f0ff] to-[#ede7ff] items-center justify-center relative overflow-hidden">
  {/* Decorative Background */}
  <div className="absolute top-5 left-10 w-39 h-32 border-4 border-purple-300 rounded-3xl rotate-12 opacity-40"></div>
  <div className="absolute bottom-10 right-10 w-40 h-40 border-4 border-indigo-400 rounded-3xl -rotate-12 opacity-40"></div>

  {/* Main Content */}
  <div className="z-10 text-center max-w-md relative">
    {/* Top Card (Moved Slightly Left) */}
    <div className="absolute -left-15 top-3 bg-white shadow-lg rounded-2xl p-4 w-80 text-left">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500 font-medium">
            Track Your Income & Expenses
          </p>
          <h3 className="text-2xl font-bold text-gray-800 mt-1">$430,000</h3>
        </div>
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-3 rounded-xl text-white shadow-md">
          <i className="fa-solid fa-arrow-trend-up"></i>
        </div>
      </div>
    </div>

    {/* Chart Card (Larger) */}
    <div className="bg-white shadow-xl rounded-3xl p-6 w-[30rem] h-[22rem] mx-auto mt-36 animate-float">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-gray-700 text-lg">All Transactions</h3>
        <button className="text-sm text-indigo-600 font-medium hover:underline">
          View More
        </button>
      </div>
      <p className="text-xs text-gray-400 mb-3">2nd Jan to 21th Dec</p>

      {/* Simulated Bar Chart */}
      <div className="grid grid-cols-7 gap-4 items-end h-44 mt-6">
        <div className="bg-gradient-to-t from-indigo-400 to-purple-300 rounded-t-lg h-24"></div>
        <div className="bg-gradient-to-t from-indigo-400 to-purple-300 rounded-t-lg h-32"></div>
        <div className="bg-gradient-to-t from-indigo-400 to-purple-300 rounded-t-lg h-40"></div>
        <div className="bg-gradient-to-t from-indigo-400 to-purple-300 rounded-t-lg h-28"></div>
        <div className="bg-gradient-to-t from-indigo-400 to-purple-300 rounded-t-lg h-14"></div>
        <div className="bg-gradient-to-t from-indigo-400 to-purple-300 rounded-t-lg h-36"></div>
        <div className="bg-gradient-to-t from-indigo-400 to-purple-300 rounded-t-lg h-44"></div>
      </div>

      {/* Month Labels (More Spacing) */}
      <div className="flex justify-between text-xs text-gray-500 mt-4 px-1">
        <span>Jan</span>
        <span>Feb</span>
        <span>Mar</span>
        <span>Apr</span>
        <span>May</span>
        <span>Jun</span>
        <span>Jul</span>
      </div>
    </div>

    {/* Ending Tagline (Larger Font) */}
    <p className="mt-10 text-gray-700 text-base italic font-medium">
      Smart insights to manage your money wisely 💸
    </p>
  </div>

  {/* Floating Animation */}
  <style>{`
    @keyframes float {
      0% { transform: translateY(0px); }
      50% { transform: translateY(-8px); }
      100% { transform: translateY(0px); }
    }
    .animate-float {
      animation: float 5s ease-in-out infinite;
    }
  `}</style>
</div>
    </div>
  );
}
