import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { BsCalendar4Week } from "react-icons/bs";
import { weeklySales, weeklySalesTotal } from "../../data/mockdata";
import { formatCurrencyPH } from "../../utils/formatCurrencyPH";

const WeeklySales = () => {
  const growth = weeklySalesTotal.growth;
  const thisWeek = weeklySalesTotal.thisWeek;
  const lastWeek = weeklySalesTotal.lastWeek; 
  const growthPositive = growth >= 0;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 flex flex-col w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-3 border-b border-gray-200 dark:border-gray-700 pb-2">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
          Weekly Sales
        </h2>
        <BsCalendar4Week className="w-5 h-5 text-indigo-600 dark:text-indigo-300" />
      </div>

      {/* Sales Summary */}
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
        {formatCurrencyPH(thisWeek)}
      </h3>
      <div className="flex items-start justify-between gap-4">
        <div>
          <span
            className={[
              "mt-2 inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium",
              growthPositive
                ? "bg-green-100 text-green-500"
                : "bg-red-100 text-red-700",
            ].join(" ")}
          >
            {growthPositive ? "+" : ""}
            {growth.toFixed(1)}% vs last week
          </span>
        </div>
      </div>

      {/* Chart */}
      <div className="mt-4 h-60">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={weeklySales}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip contentStyle={{
                backgroundColor: "#1f2937",
                border: "none",
                borderRadius: "0.5rem",
                color: "#fff",
              }}
              formatter={(value) => `${formatCurrencyPH(value)}`} />
            <Bar dataKey="sales" fill="#6ad47a" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default WeeklySales;
