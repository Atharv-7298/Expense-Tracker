import React, { useEffect } from "react";
import Sidebar from "../../components/Layout/Sidebar";
import Topbar from "../../components/Layout/Topbar";
import ExpenseSummaryChart from "../../components/Expense/ExpenseSummaryChart";
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
import { Trash2 } from "lucide-react";

const Income = () => {
  const { incomes, summary, fetchIncomes, fetchSummary, deleteIncome } =
    useIncomes();

  useEffect(() => {
    fetchIncomes();
    fetchSummary();
  }, []);

  const dailyData =
    summary?.daily?.map((d) => ({
      day: d._id,
      total: d.total,
    })) || [];

  return (
    <div className="min-h-screen flex bg-[#f8f6ff]">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar />

        {/* ----- Charts Section ----- */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 30-day Income Bar Chart */}
          <div className="bg-white border border-purple-100 rounded-3xl shadow-md shadow-purple-100 p-6 hover:shadow-lg hover:shadow-purple-200 transition-all">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Income Trend (Last 30 Days)
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dailyData}>
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
                  <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#7C3AED" />
                    <stop offset="100%" stopColor="#34D399" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Income Pie Chart (Pastel Colors Preserved) */}
          <div className="bg-white border border-purple-100 rounded-3xl shadow-md shadow-purple-100 p-6 hover:shadow-lg hover:shadow-purple-200 transition-all">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Income by Category
            </h2>
            {/* ✅ Keeps the original pastel colors */}
            <ExpenseSummaryChart summary={summary} />
          </div>
        </div>

        {/* ----- Income List Section ----- */}
        <div className="bg-white border border-purple-100 rounded-3xl shadow-md shadow-purple-100 p-6 mx-6 mb-8 hover:shadow-lg hover:shadow-purple-200 transition-all">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">
            All Incomes
          </h3>

          {incomes.length === 0 ? (
            <p className="text-gray-500 italic">No incomes added yet.</p>
          ) : (
            <div className="space-y-3">
              {incomes.map((i) => (
                <div
                  key={i._id}
                  className="flex justify-between items-center border-b border-purple-100 pb-2 text-gray-700"
                >
                  <div>
                    <p className="font-medium">{i.source}</p>
                    <p className="text-sm text-gray-500">
                      {i.category} — {new Date(i.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-green-600 font-semibold">
                      +₹{i.amount}
                    </span>
                    <Trash2
                      size={18}
                      className="text-red-500 cursor-pointer hover:text-red-700 transition"
                      onClick={() => deleteIncome(i._id)}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Income;
