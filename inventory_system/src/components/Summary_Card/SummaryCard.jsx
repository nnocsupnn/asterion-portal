// src/components/SummaryCards.js
import React from "react";
import {
  FiPackage,
  FiCheckCircle,
  FiClock,
  FiXCircle,
  FiTrendingUp,
  FiDatabase
} from "react-icons/fi";
import { BsExclamationTriangle, BsCart2 } from "react-icons/bs";
import { PiKeyReturn } from "react-icons/pi";
import { CiBookmarkCheck } from "react-icons/ci";
import { GrMoney } from "react-icons/gr";
import { LuPackageOpen } from "react-icons/lu";
import { summaryData } from "../../data/mockdata";

// Map icons to components
const icons = {
  FiPackage,
  FiCheckCircle,
  FiClock,
  FiXCircle,
  FiTrendingUp,
  FiDatabase,
  BsExclamationTriangle,
  BsCart2,
  CiBookmarkCheck,
  GrMoney,
  LuPackageOpen,
  PiKeyReturn
};

const colorClasses = {
  blue: "text-blue-500",
  green: "text-green-500",
  yellow: "text-yellow-500",
  red: "text-red-500",
  purple: "text-purple-500",
  orange: "text-orange-500",
};

export const SUMMARY_CARDS = [
  {
    key: "totalProducts",
    title: "Total Products",
    value: summaryData.totalProducts,
    color: "blue",
    icon: "FiPackage"
  },
  {
    key: "totalOrders",
    title: "Total Orders",
    value: summaryData.totalOrders,
    color: "blue",
    icon: "BsCart2"
  },
  {
    key: "delivered",
    title: "Delivered",
    value: summaryData.delivered,
    color: "green",
    icon: "FiCheckCircle"
  },
  {
    key: "pending",
    title: "Pending",
    value: summaryData.pending,
    color: "yellow",
    icon: "FiClock"
  },
  {
    key: "cancelled",
    title: "Cancelled",
    value: summaryData.cancelled,
    color: "red",
    icon: "FiXCircle"
  },
  {
    key: "returned",
    title: "Returned",
    value: summaryData.returned,
    color: "orange",
    icon: "PiKeyReturn"
  },
  {
    key: "revenue",
    title: "Total Revenue",
    value: `₱${summaryData.totalRevenue.toLocaleString()}`,
    color: "purple",
    icon: "GrMoney"
  },
  {
    key: "inventoryValue",
    title: "Inventory Value",
    value: `₱${summaryData.inventoryValue.toLocaleString()}`,
    color: "yellow",
    icon: "GrMoney"
  },
  {
    key: "inStock",
    title: "In Stock",
    value: summaryData.inStock,
    color: "green",
    icon: "CiBookmarkCheck"
  },
  {
    key: "lowStocks",
    title: "Low Stocks",
    value: summaryData.lowStocks,
    color: "orange",
    icon: "BsExclamationTriangle"
  },
  {
    key: "outOfStock",
    title: "Out Of Stock",
    value: summaryData.outOfStock,
    color: "red",
    icon: "LuPackageOpen"
  }
].map(card => {
  const Icon = icons[card.icon];
  return {
    ...card,
    component: (
      <div
        key={card.key}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 flex flex-col justify-between"
      >
        <div className="flex items-center justify-between">
          <span className="text-gray-500">{card.title}</span>
          <Icon className={`w-8 h-8 ${colorClasses[card.color]}`} />
        </div>
        <div className="flex items-end gap-4 mt-2">
          <span className="text-3xl font-bold">{card.value}</span>
        </div>
      </div>
    )
  };
});

// Export a component to render the cards
export const SummaryCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
      {SUMMARY_CARDS.map(card => card.component)}
    </div>
  );
};

export default SummaryCards;