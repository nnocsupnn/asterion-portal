import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { FiFilter } from "react-icons/fi";
import { monthlySales } from "../../data/mockdata";
import { formatCurrencyPH } from "../../utils/formatCurrencyPH";

const MonthlySales = () => {
  const total = monthlySales.reduce((sum, m) => sum + m.sales, 0);

  const currentMonthIndex = new Date().getMonth();
  const lastMonthIndex = currentMonthIndex === 0 ? 11 : currentMonthIndex - 1;

  const thisMonth = monthlySales[currentMonthIndex]?.sales || 0;
  const lastMonth = monthlySales[lastMonthIndex]?.sales || 0;

  const percentChange =
    lastMonth === 0 ? 100 : ((thisMonth - lastMonth) / lastMonth) * 100;
  const amountChange = thisMonth - lastMonth;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 flex flex-col w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-3 border-b border-gray-200 dark:border-gray-700 pb-2">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
          Monthly Sales
        </h2>
        <button className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
          <FiFilter className="w-4 h-4" /> Filter
        </button>
      </div>

      {/* Sales Summary */}
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
        {formatCurrencyPH(thisMonth)}
      </h3>

      {/* Change Indicator */}
      <div
        className={`mt-2 inline-block px-3 py-1 rounded-full text-sm font-medium ${
          percentChange < 0
            ? "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400"
            : "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400"
        }`}
      >
        {percentChange.toFixed(1)}% {percentChange < 0 ? "↓" : "↑"}{" "}
        {formatCurrencyPH(Math.abs(amountChange))}{" "}
        {percentChange < 0 ? "decrease" : "increase"}
      </div>

      {/* Chart */}
      <div className="h-56 mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={monthlySales}>
            <XAxis
              dataKey="month"
              stroke="#888"
              tick={{ fill: "currentColor" }}
              className="text-gray-700 dark:text-gray-300"
            />
            <YAxis
              tick={{ fill: "currentColor" }}
              className="text-gray-700 dark:text-gray-300"
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1f2937",
                border: "none",
                borderRadius: "0.5rem",
                color: "#fff",
              }}
              formatter={(value) => formatCurrencyPH(value)}
            />
            <Bar dataKey="sales" fill="#4eaef2" radius={[10, 10, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MonthlySales;
