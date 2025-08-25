import React, { useState, useMemo, useEffect } from "react";
import { FiDownload } from "react-icons/fi";
import { BiCartAdd } from "react-icons/bi";
import { SUMMARY_CARDS } from "../components/Summary_Card/SummaryCard";
import OrderTable from "../components/Table/OrderTable";

const Orders = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Filter summary cards for order
  const summaryCard = SUMMARY_CARDS.filter((card) =>
      ["totalOrders", "delivered", "pending", "cancelled", "returned"].includes(card.key)
    );
  return (
     <div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-4 py-6 sm:px-6 lg:px-8">
      {/* ---------- Header ---------- */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100">
            Order Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Track all order movements and transactions
          </p>
        </div>

        <div className="flex flex-row justify-end lg:justify-start gap-3">
          {/* Export button */}
          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 font-medium rounded-lg px-4 py-2.5 transition-colors"
          >
            <FiDownload className="w-4 h-4" aria-hidden="true" /> Export
          </button>

          {/* Add Order button */}
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center justify-center gap-2 text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 font-medium rounded-lg px-4 py-2.5 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all"
          >
            <BiCartAdd className="w-5 h-5" aria-hidden="true" /> Add Order
          </button>
        </div>

       
       
      </div>
      {/* ---------- Summary Cards ---------- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        {summaryCard.map((card) => card.component)}
      </div>
      {/* ---------- Orders Table ---------- */}
      <OrderTable />
    </div>
  )
}

export default Orders;
