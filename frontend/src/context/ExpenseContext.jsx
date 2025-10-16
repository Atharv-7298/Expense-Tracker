import React, { createContext, useContext, useState } from "react";
import api from "../api";
import toast from "react-hot-toast";

const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([]);
  const [summary, setSummary] = useState({ total: 0, byCategory: [], daily: [] });
  const [loading, setLoading] = useState(false);

  // ✅ Fetch all expenses
  const fetchExpenses = async (params = {}) => {
    setLoading(true);
    try {
      const { data } = await api.get("/expense/all", { params });
      setExpenses(data.expenses || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch expenses");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Add expense
  const addExpense = async (expense) => {
    try {
      const { data } = await api.post("/expense/add", expense);
      toast.success("Expense added!");
      fetchExpenses();
      fetchSummary();
      return data.expense;
    } catch (err) {
      console.error(err);
      toast.error("Could not add expense");
    }
  };

  // ✅ Update expense
  const updateExpense = async (id, expense) => {
    try {
      const { data } = await api.put(`/expense/${id}`, expense);
      toast.success("Expense updated!");
      fetchExpenses();
      fetchSummary();
      return data.expense;
    } catch (err) {
      console.error(err);
      toast.error("Could not update expense");
    }
  };

  // ✅ Delete expense
  const deleteExpense = async (id) => {
    try {
      await api.delete(`/expense/${id}`);
      toast.success("Expense deleted");
      fetchExpenses();
      fetchSummary();
    } catch (err) {
      console.error(err);
      toast.error("Could not delete expense");
    }
  };

  // ✅ Fetch expense summary (for charts)
  const fetchSummary = async (month, year) => {
    try {
      const { data } = await api.get("/expense/summary", { params: { month, year } });
      setSummary(data);
    } catch (err) {
      console.error("Summary error:", err);
    }
  };

  return (
    <ExpenseContext.Provider
      value={{
        expenses,
        loading,
        summary,
        fetchExpenses,
        addExpense,
        updateExpense,
        deleteExpense,
        fetchSummary,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpenses = () => useContext(ExpenseContext);
