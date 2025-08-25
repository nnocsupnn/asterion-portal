import React from "react";
import { FaPesoSign, FaArrowUp, FaArrowDown } from "react-icons/fa6";
import { summaryData } from "../../data/mockdata";
import { formatCurrencyPH } from "../../utils/formatCurrencyPH";

const TotalRevenue = () => {
  const total = summaryData.totalRevenue;
  const revenueThisMonth = 23000.0;
  const percentageChange = 12.5;
  const isPositive = percentageChange >= 0;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 flex flex-col w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-3 sm:mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
        <h2 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-100">
          Total Revenue
        </h2>
        <button className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
          <FaPesoSign className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400 dark:text-orange-300" />
        </button>
      </div>

      {/* Total Revenue */}
      <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3">
        {formatCurrencyPH(total)}
      </h3>

      {/* Change Indicator - Responsive layout */}
      <div className={`flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 ${isPositive ? 'md:bg-green-100' : 'md:bg-red-100'} rounded-full`}>
        {/* Percentage Badge */}
        <div className={`inline-flex items-center gap-1 text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-1.5 rounded-full font-semibold ${isPositive ? 'text-green-600 bg-green-100 dark:bg-green-900/20' : 'text-red-600 bg-red-100 dark:bg-red-900/20'}`}>
          {isPositive ? (
            <FaArrowUp className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          ) : (
            <FaArrowDown className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          )}
          <span>{Math.abs(percentageChange)}%</span>
        </div>

        {/* Text Description */}
        <span className={`text-xs sm:text-sm ${isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
          <span className="hidden sm:inline">
            <b>{formatCurrencyPH(revenueThisMonth)}</b> {isPositive ? 'increase' : 'decrease'} from last year
          </span>
          <span className="sm:hidden">
            <b>{formatCurrencyPH(revenueThisMonth)}</b> {isPositive ? '↑' : '↓'} from last year
          </span>
        </span>
      </div>

      {/* Alternative: Stacked layout for extra small screens */}
      <div className="sm:hidden mt-2">
        <div className={`text-xs ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          {isPositive ? 'Increase' : 'Decrease'} from last year
        </div>
      </div>
    </div>
  );
};

export default TotalRevenue;