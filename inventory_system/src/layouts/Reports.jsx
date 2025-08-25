import React from "react";
import {
  FiFilter,
  FiDownload,
  FiTrendingUp,
  FiPackage,
  FiBarChart2,
  FiDollarSign,
  FiFileText,
} from "react-icons/fi";

const Reports = () => {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 px-4 py-6 sm:px-6 lg:px-8">
      {/* ---------- Header ---------- */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100">
            Reports & Analytics
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Generate insights and export business reports
          </p>
        </div>
        <div className="flex flex-row justify-end lg:justify-start gap-3">
          {/* Filter button */}
          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 font-medium rounded-lg px-4 py-2.5 transition-colors"
          >
            <FiFilter className="w-4 h-4" aria-hidden="true" /> Filters
          </button>

          {/* Export button */}
          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 font-medium rounded-lg px-4 py-2.5 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all"
          >
            <FiDownload className="w-4 h-4" aria-hidden="true" /> Export Report
          </button>
        </div>
          
      </div>

        {/* Report Types */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 mb-6 p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                <button className="flex items-center gap-2 p-3 rounded-lg border transition-colors bg-blue-50 dark:bg-blue-900 border-blue-200 dark:border-blue-700 text-blue-700 dark:text-blue-300">
                  <FiTrendingUp className="w-4 h-4" />
                  <span className="text-sm font-medium">Sales Report</span>
                </button>
                <button className="flex items-center gap-2 p-3 rounded-lg border transition-colors bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                  <FiPackage className="w-4 h-4" />
                  <span className="text-sm font-medium">Inventory Report</span>
                </button>
                <button className="flex items-center gap-2 p-3 rounded-lg border transition-colors bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                  <FiBarChart2 className="w-4 h-4" />
                  <span className="text-sm font-medium">Performance Report</span>
                </button>
                <button className="flex items-center gap-2 p-3 rounded-lg border transition-colors bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                  <FiDollarSign className="w-4 h-4" />
                  <span className="text-sm font-medium">Financial Report</span>
                </button>
              </div>
            </div>
            <div className="flex gap-3">
              <select className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="quarter">This Quarter</option>
                <option value="year">This Year</option>
              </select>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Total Sales
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    ₱209,297.00
                  </p>
                  <p className="text-sm text-green-600 mt-1">
                    +12.5% vs last period
                  </p>
                </div>
                <FiDollarSign className="w-8 h-8 text-green-500" />
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Physical Store
                  </p>
                  <p className="text-2xl font-bold text-blue-600">
                    ₱127,500.00
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    61% of total
                  </p>
                </div>
                <FiTrendingUp className="w-8 h-8 text-blue-500" />
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Shopee Sales
                  </p>
                  <p className="text-2xl font-bold text-orange-600">
                    ₱81,797.00
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    39% of total
                  </p>
                </div>
                <FiTrendingUp className="w-8 h-8 text-orange-500" />
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Daily Average
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    ₱29,899.57
                  </p>
                  <p className="text-sm text-green-600 mt-1">
                    +8.3% vs last period
                  </p>
                </div>
                <FiBarChart2 className="w-8 h-8 text-purple-500" />
              </div>
            </div>
          </div>

          {/* Placeholder for Sales Trend */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Sales Trend
            </h3>
            <div className="h-64 bg-gray-50 dark:bg-gray-900 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <FiBarChart2 className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-2" />
                <p className="text-gray-500 dark:text-gray-400">
                  Sales chart visualization would appear here
                </p>
                <p className="text-sm text-gray-400 dark:text-gray-500">
                  Integration with charting library needed
                </p>
              </div>
            </div>
          </div>

          {/* Quick Export */}
          <div className="bbg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Quick Export
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button className="flex items-center gap-3 p-4 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <FiFileText className="w-6 h-6 text-blue-500" />
                <div className="text-left">
                  <p className="font-medium text-gray-900 dark:text-gray-100">
                    Inventory Report
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Current stock levels and values
                  </p>
                </div>
              </button>

              <button className="flex items-center gap-3 p-4 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <FiFileText className="w-6 h-6 text-green-500" />
                <div className="text-left">
                  <p className="font-medium text-gray-900 dark:text-gray-100">
                    Sales Report
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Revenue and transaction data
                  </p>
                </div>
              </button>

              <button className="flex items-center gap-3 p-4 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <FiFileText className="w-6 h-6 text-purple-500" />
                <div className="text-left">
                  <p className="font-medium text-gray-900 dark:text-gray-100">
                    Low Stock Alert
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Products needing restock
                  </p>
                </div>
              </button>
            </div>
          </div>
        </div>

    </main>
  );
};

export default Reports;
