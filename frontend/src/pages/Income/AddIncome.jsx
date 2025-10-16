import React, { useState } from "react";
import Sidebar from "../../components/Layout/Sidebar";
import Topbar from "../../components/Layout/Topbar";
import { useIncomes } from "../../context/IncomeContext";
import { useNavigate } from "react-router-dom";

export default function AddIncome() {
  const [income, setIncome] = useState({
    source: "",
    amount: "",
    category: "Salary",
    date: new Date().toISOString().slice(0, 10),
    note: "",
  });

  const { addIncome } = useIncomes();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...income, amount: Number(income.amount) };
    const res = await addIncome(payload);
    if (res) navigate("/income");
  };

  return (
    <div className="min-h-screen flex bg-[#f8f6ff]">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar />
        <div className="p-8 max-w-xl mx-auto">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            💰 Add Income
          </h2>
          <form
            onSubmit={handleSubmit}
            className="bg-white border border-purple-100 rounded-3xl shadow-md shadow-purple-100 p-6 space-y-4"
          >
            <input
              className="w-full border border-purple-100 rounded-lg p-2 focus:ring-2 focus:ring-purple-500"
              placeholder="Source"
              value={income.source}
              onChange={(e) => setIncome({ ...income, source: e.target.value })}
            />
            <input
              type="number"
              className="w-full border border-purple-100 rounded-lg p-2 focus:ring-2 focus:ring-purple-500"
              placeholder="Amount"
              value={income.amount}
              onChange={(e) => setIncome({ ...income, amount: e.target.value })}
            />
            <select
              className="w-full border border-purple-100 rounded-lg p-2 focus:ring-2 focus:ring-purple-500"
              value={income.category}
              onChange={(e) => setIncome({ ...income, category: e.target.value })}
            >
              <option>Salary</option>
              <option>Business</option>
              <option>Freelance</option>
              <option>Investments</option>
              <option>Other</option>
            </select>
            <input
              type="date"
              className="w-full border border-purple-100 rounded-lg p-2 focus:ring-2 focus:ring-purple-500"
              value={income.date}
              onChange={(e) => setIncome({ ...income, date: e.target.value })}
            />
            <textarea
              className="w-full border border-purple-100 rounded-lg p-2 focus:ring-2 focus:ring-purple-500"
              placeholder="Note"
              value={income.note}
              onChange={(e) => setIncome({ ...income, note: e.target.value })}
            />
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold py-2 rounded-lg shadow-md hover:opacity-90 transition"
            >
              Add Income
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
