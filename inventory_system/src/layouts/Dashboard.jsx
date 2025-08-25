import React from 'react'
import { SUMMARY_CARDS } from '../components/Summary_Card/SummaryCard';
import MonthlySales from '../features/Dashboard/monthlySales';
import WeeklySales from '../features/Dashboard/weeklySales';
import TotalRevenue from '../features/Dashboard/totalRevenue';
import SalesByPlatform from '../features/Dashboard/SalesByPlatform';
import TopBrand from '../features/Dashboard/TopBrand';
const Dashboard = () => {
  const summaryCard = SUMMARY_CARDS.filter(card => 
    ["totalProducts", "lowStocks", "totalOrders", "inventoryValue"].includes(card.key)
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-4 py-6 sm:px-6 lg:px-8">
      {/* ---------- Header ---------- */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100">
           Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
           Overview of your business performance and track sales across different platforms.
          </p>
        </div>
      </div>

      {/* ---------- Summary Cards ---------- */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-8">
        {summaryCard.map(card => card.component)}
      </div>

      {/* ----------- Sales Graph ------------*/}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-8">
        <MonthlySales/>

        <WeeklySales/>

        <TotalRevenue/>
      </div>

      {/* ----------- Sales Distribution Graph --------------- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-8">
        <SalesByPlatform/>
        <TopBrand/>
      </div>

    </div>
  )
}

export default Dashboard;
