import React, { useEffect } from "react";
import Sidebar from "../../components/Layout/Sidebar";
import Topbar from "../../components/Layout/Topbar";
import Card from "../../components/UI/Card";
import ExpenseSummaryChart from "../../components/Expense/ExpenseSummaryChart";
import { useExpenses } from "../../context/ExpenseContext";
import { useIncomes } from "../../context/IncomeContext";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function Dashboard() {
  const { summary: expenseSummary, fetchSummary: fetchExpenseSummary } = useExpenses();
  const { summary: incomeSummary, fetchSummary: fetchIncomeSummary } = useIncomes();

  useEffect(() => {
    fetchExpenseSummary();
    fetchIncomeSummary();
  }, []);

  const totalExpense = expenseSummary?.total || 0;
  const totalIncome = incomeSummary?.total || 0;
  const balance = totalIncome - totalExpense;

  // Prepare daily chart data
  const expenseData =
    expenseSummary?.daily?.map((d) => ({
      day: d._id,
      total: d.total,
    })) || [];

  const incomeData =
    incomeSummary?.daily?.map((d) => ({
      day: d._id,
      total: d.total,
    })) || [];

  return (
    <div className="min-h-screen flex bg-[#f8f6ff]">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Topbar />

        {/* ====== SUMMARY CARDS ====== */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card title="💰 Total Income">
            <p className="text-2xl font-semibold text-green-600 ml-16">₹{totalIncome}</p>
          </Card>

          <Card title="💸 Total Expense">
            <p className="text-2xl font-semibold text-red-500 ml-16">₹{totalExpense}</p>
          </Card>

          <Card title="🧾 Net Balance">
            <p
              className={`text-2xl font-semibold ml-16 ${
                balance >= 0 ? "text-emerald-600" : "text-red-600"
              }`}
            >
              ₹{balance}
            </p>
          </Card>
        </div>

        {/* ====== 2×2 GRID OF CHARTS ====== */}
        <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Expense Pie Chart (Non-purple colors) */}
          <div className="bg-white border border-purple-100 rounded-3xl shadow-md shadow-purple-100 p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Expense Distribution (Pie)
            </h2>
            {/* ✅ Original pastel colors — red, yellow, blue, mint, etc. */}
            <ExpenseSummaryChart
              summary={expenseSummary}
              customColors={["#FF6B6B", "#FFD93D", "#6BCB77", "#4D96FF", "#FFA500"]}
            />
          </div>

          {/* Expense Bar Chart (Purple → Green Gradient) */}
          <div className="bg-white border border-purple-100 rounded-3xl shadow-md shadow-purple-100 p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Expense Trend (Last 30 Days)
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={expenseData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E9D5FF" />
                <XAxis dataKey="day" tick={{ fill: "#7C3AED" }} />
                <YAxis tick={{ fill: "#7C3AED" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#faf5ff",
                    border: "1px solid #E9D5FF",
                    borderRadius: "10px",
                  }}
                  cursor={{ fill: "rgba(139, 92, 246, 0.1)" }}
                />
                <Bar
                  dataKey="total"
                  radius={[6, 6, 0, 0]}
                  fill="url(#incomeGradient)"
                />
                <defs>
                  {/* ✅ Purple → Green for Expense too */}
                  <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#7C3AED" />
                    <stop offset="100%" stopColor="#34D399" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Income Pie Chart (Non-purple pastel colors) */}
          <div className="bg-white border border-purple-100 rounded-3xl shadow-md shadow-purple-100 p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Income Distribution (Pie)
            </h2>
            {/* ✅ Distinct color palette from Expense */}
            <ExpenseSummaryChart
              summary={incomeSummary}
              customColors={["#34D399", "#60A5FA", "#FBBF24", "#F472B6", "#F87171"]}
            />
          </div>

          {/* Income Bar Chart (Purple → Green Gradient) */}
          <div className="bg-white border border-purple-100 rounded-3xl shadow-md shadow-purple-100 p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Income Trend (Last 30 Days)
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={incomeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E9D5FF" />
                <XAxis dataKey="day" tick={{ fill: "#7C3AED" }} />
                <YAxis tick={{ fill: "#7C3AED" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#faf5ff",
                    border: "1px solid #E9D5FF",
                    borderRadius: "10px",
                  }}
                  cursor={{ fill: "rgba(139, 92, 246, 0.1)" }}
                />
                <Bar
                  dataKey="total"
                  radius={[6, 6, 0, 0]}
                  fill="url(#incomeGradient)"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ====== FINANCIAL OVERVIEW ====== */}
        <div className="px-8 pb-12">
          <Card title="📊 Financial Overview">
            <div className="bg-white rounded-3xl p-8 min-h-[20px] flex flex-col justify-center shadow-md shadow-purple-100 border border-purple-100">
              <p className="text-gray-700 text-lg font-medium text-center">
                You spent{" "}
                <span className="font-semibold text-red-500 text-xl">
                  ₹{totalExpense.toLocaleString()}
                </span>{" "}
                and earned{" "}
                <span className="font-semibold text-green-600 text-xl">
                  ₹{totalIncome.toLocaleString()}
                </span>{" "}
                this month.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
