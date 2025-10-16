import React, { useState } from "react";
import Sidebar from "../../components/Layout/Sidebar";
import Topbar from "../../components/Layout/Topbar";
import { useExpenses } from "../../context/ExpenseContext";
import { useNavigate } from "react-router-dom";

export default function AddExpense() {
  const [expense, setExpense] = useState({
    title: "",
    amount: "",
    category: "Food",
    date: new Date().toISOString().slice(0, 10),
    note: "",
  });

  const { addExpense } = useExpenses();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...expense, amount: Number(expense.amount) };
    const res = await addExpense(payload);
    if (res) navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex bg-[#f8f6ff]">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar />
        <div className="p-8 max-w-xl mx-auto">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            ➕ Add Expense
          </h2>
          <form
            onSubmit={handleSubmit}
            className="bg-white border border-purple-100 rounded-3xl shadow-md shadow-purple-100 p-6 space-y-4"
          >
            <input
              className="w-full border border-purple-100 rounded-lg p-2 focus:ring-2 focus:ring-purple-500"
              placeholder="Title"
              value={expense.title}
              onChange={(e) => setExpense({ ...expense, title: e.target.value })}
            />
            <input
              type="number"
              className="w-full border border-purple-100 rounded-lg p-2 focus:ring-2 focus:ring-purple-500"
              placeholder="Amount"
              value={expense.amount}
              onChange={(e) => setExpense({ ...expense, amount: e.target.value })}
            />
            <select
              className="w-full border border-purple-100 rounded-lg p-2 focus:ring-2 focus:ring-purple-500"
              value={expense.category}
              onChange={(e) =>
                setExpense({ ...expense, category: e.target.value })
              }
            >
              <option>Food</option>
              <option>Transport</option>
              <option>Entertainment</option>
              <option>Bills</option>
              <option>Other</option>
            </select>
            <input
              type="date"
              className="w-full border border-purple-100 rounded-lg p-2 focus:ring-2 focus:ring-purple-500"
              value={expense.date}
              onChange={(e) => setExpense({ ...expense, date: e.target.value })}
            />
            <textarea
              className="w-full border border-purple-100 rounded-lg p-2 focus:ring-2 focus:ring-purple-500"
              placeholder="Note"
              value={expense.note}
              onChange={(e) => setExpense({ ...expense, note: e.target.value })}
            />
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold py-2 rounded-lg shadow-md hover:opacity-90 transition"
            >
              Add Expense
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
