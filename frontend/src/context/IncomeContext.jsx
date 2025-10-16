import React, { createContext, useContext, useState } from "react";
import api from "../api";
import toast from "react-hot-toast";

const IncomeContext = createContext();

export const IncomeProvider = ({ children }) => {
  const [incomes, setIncomes] = useState([]);
  const [summary, setSummary] = useState({ total: 0, byCategory: [], daily: [] });
  const [loading, setLoading] = useState(false);

  // ✅ Fetch all incomes
  const fetchIncomes = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/income/all");
      setIncomes(data.incomes || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch incomes");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Add income
  const addIncome = async (income) => {
    try {
      const { data } = await api.post("/income/add", income);
      toast.success("Income added!");
      fetchIncomes();
      fetchSummary();
      return data.income;
    } catch (err) {
      console.error(err);
      toast.error("Could not add income");
    }
  };

  // ✅ Delete income
  const deleteIncome = async (id) => {
    try {
      await api.delete(`/income/${id}`);
      toast.success("Income deleted");
      fetchIncomes();
      fetchSummary();
    } catch (err) {
      console.error(err);
      toast.error("Could not delete income");
    }
  };

  // ✅ Fetch income summary (for charts)
  const fetchSummary = async (month, year) => {
    try {
      const { data } = await api.get("/income/summary", { params: { month, year } });
      setSummary(data);
    } catch (err) {
      console.error("Summary error:", err);
    }
  };

  return (
    <IncomeContext.Provider
      value={{
        incomes,
        summary,
        loading,
        fetchIncomes,
        fetchSummary,
        addIncome,
        deleteIncome,
      }}
    >
      {children}
    </IncomeContext.Provider>
  );
};

export const useIncomes = () => useContext(IncomeContext);
