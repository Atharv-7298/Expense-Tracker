import React, { useEffect } from "react";
import { useExpenses } from "../../context/ExpenseContext";
import { Link } from "react-router-dom";

export default function ExpenseList() {
  const { expenses, fetchExpenses, deleteExpense, loading } = useExpenses();

  useEffect(() => {
    fetchExpenses();
  }, []);

  if (loading) return <div>Loading expenses...</div>;

  return (
    <div className="space-y-2">
      {expenses.length === 0 ? (
        <p className="text-sm text-slate-500">No expenses found.</p>
      ) : (
        expenses.map((e) => (
          <div
            key={e._id}
            className="flex justify-between items-center p-3 bg-white rounded shadow-sm hover:bg-slate-50"
          >
            <div>
              <h4 className="font-medium">{e.title}</h4>
              <p className="text-sm text-slate-500">
                {e.category} • {new Date(e.date).toLocaleDateString()}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-semibold text-slate-700">₹{e.amount}</span>
              <Link
                to={`/edit-expense/${e._id}`}
                className="text-sm text-indigo-600 hover:underline"
              >
                Edit
              </Link>
              <button
                onClick={() => deleteExpense(e._id)}
                className="text-sm text-red-500 hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
