// src/pages/Inventory.jsx
import React, { useState } from "react";
import { IoAdd } from "react-icons/io5";
import { FiDownload } from "react-icons/fi";
import AddProduct from "../features/Add_Product/addProduct";
import { SUMMARY_CARDS } from "../components/Summary_Card/SummaryCard";
import InventoryTable from "../components/Table/inventoryTable";
import { products } from "../data/mockdata";

const Inventory = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter summary cards for inventory
  const summaryCard = SUMMARY_CARDS.filter((card) =>
    ["totalProducts", "inStock", "lowStocks", "outOfStock"].includes(card.key)
  );

  // Define table columns (works with products mock data)
  const columns = [
    { key: "name", label: "Product Name" },
    { key: "category", label: "Category" },
    { key: "brand", label: "Brand" },
    {
      key: "totalStock",
      label: "Stock",
      render: (row) => row.variants.reduce((sum, v) => sum + v.stock, 0), // 👈 Calculate total stock
    },
    {
      key: "price",
      label: "Base Price",
      render: (row) => `₱${row.variants[0]?.price ?? 0}`, // 👈 Show price from first variant
    },
    {
      key: "actions",
      label: "Actions",
      render: (row) => (
        <div className="flex gap-2">
          <button className="px-2 py-1 text-xs bg-blue-100 text-blue-600 rounded-md">
            View
          </button>
          <button className="px-2 py-1 text-xs bg-yellow-100 text-yellow-600 rounded-md">
            Edit
          </button>
          <button className="px-2 py-1 text-xs bg-red-100 text-red-600 rounded-md">
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-4 py-6 sm:px-6 lg:px-8">
      {/* ---------- Header ---------- */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100">
            Inventory Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your products, stock levels, and inventory operations
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

          {/* Add product button */}
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center justify-center gap-2 text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 font-medium rounded-lg px-4 py-2.5 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all"
          >
            <IoAdd className="w-5 h-5" aria-hidden="true" /> Add Product
          </button>
        </div>

        {/* ---------- Add Product Modal ---------- */}
        <AddProduct
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAddProduct={(productData) => console.log(productData)} // 👈 Handle product add
        />
      </div>

      {/* ---------- Summary Cards ---------- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {summaryCard.map((card) => card.component)}
      </div>

      {/* ---------- Inventory Table ---------- */}
      <InventoryTable/>
    </div>
  );
};

export default Inventory;
