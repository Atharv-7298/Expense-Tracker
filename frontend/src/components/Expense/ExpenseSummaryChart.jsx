import React from "react";
import {
  PieChart,
  Pie,
  Tooltip,
  Legend,
  Cell,
  ResponsiveContainer,
} from "recharts";

// 🎨 Soft pastel colors for categories
const COLORS = ["#7CB9E8", "#FFB6C1", "#FFD580", "#C1E1C1", "#E6E6FA", "#B0E0E6"];

const ExpenseSummaryChart = ({ summary }) => {
  if (!summary || !summary.byCategory || summary.byCategory.length === 0) {
    return (
      <div className="text-center text-gray-500 p-4">
        No expense data available for this month.
      </div>
    );
  }

  // ✅ Prepare data for Recharts
  const data = summary.byCategory.map((item) => ({
    name: item._id, // Category name
    value: item.totalByCategory, // Total spent in category
  }));

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6">
      <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">
        Monthly Expense by Category
      </h2>

      <div className="w-full h-80">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={110}
              dataKey="value"
              nameKey="name"
              // ✅ Show category name + integer percentage (no decimals)
              label={({ name, percent }) => `${name} ${Math.round(percent * 100)}%`}
              labelLine={false}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                  stroke="#fff"
                  strokeWidth={2}
                />
              ))}
            </Pie>

            {/* Tooltip showing value in ₹ */}
            <Tooltip
              formatter={(value, name) => [`₹${value}`, `${name}`]}
              contentStyle={{
                backgroundColor: "#f9fafb",
                borderRadius: "10px",
                border: "1px solid #ddd",
                color: "#333",
              }}
            />

            {/* Legend under chart */}
            <Legend
              layout="horizontal"
              verticalAlign="bottom"
              align="center"
              wrapperStyle={{ marginTop: "20px" }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ExpenseSummaryChart;
