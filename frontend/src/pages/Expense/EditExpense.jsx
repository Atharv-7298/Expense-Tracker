import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../components/Layout/Sidebar";
import Topbar from "../../components/Layout/Topbar";
import { useExpenses } from "../../context/ExpenseContext";
import api from "../../api";

export default function EditExpense() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { updateExpense } = useExpenses();
  const [expense, setExpense] = useState(null);

  useEffect(() => {
    const load = async () => {
      const { data } = await api.get("/expense/all");
      const found = data.expenses.find((e) => e._id === id);
      if (found)
        setExpense({
          ...found,
          date: new Date(found.date).toISOString().slice(0, 10),
        });
    };
    load();
  }, [id]);

  if (!expense) return <div>Loading...</div>;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...expense, amount: Number(expense.amount) };
    await updateExpense(id, payload);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar />
        <div className="p-6 max-w-lg">
          <h2 className="text-xl font-semibold mb-4">Edit Expense</h2>
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              className="w-full border p-2 rounded"
              value={expense.title}
              onChange={(e) => setExpense({ ...expense, title: e.target.value })}
            />
            <input
              type="number"
              className="w-full border p-2 rounded"
              value={expense.amount}
              onChange={(e) =>
                setExpense({ ...expense, amount: e.target.value })
              }
            />
            <select
              className="w-full border p-2 rounded"
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
              className="w-full border p-2 rounded"
              value={expense.date}
              onChange={(e) => setExpense({ ...expense, date: e.target.value })}
            />
            <textarea
              className="w-full border p-2 rounded"
              value={expense.note}
              onChange={(e) => setExpense({ ...expense, note: e.target.value })}
            />
            <button className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
