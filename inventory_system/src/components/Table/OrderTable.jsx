import React, { useState, useMemo, useEffect } from "react";
import {
  FiSearch,
  FiPackage,
  FiEdit,
  FiTrash2,
  FiEye,
  FiChevronDown,
  FiX,
} from "react-icons/fi";
import { formatCurrencyPH } from "../../utils/formatCurrencyPH";
import { formatDate } from "../../utils/dateFormat";
import { orders } from "../../data/mockdata";

const TABLE_HEADERS = [
  { key: "id", label: "Purchase No." },
  { key: "date", label: "Date"},
  { key: "customer", label: "Customer" },
  { key: "items", label: "Products" },
  { key: "quantity", label: "Quantity" },
  { key: "total", label: "Total Price" },
  { key: "platform", label: "Platform" },
  { key: "status", label: "Status" },
];

const ITEMS_PER_PAGE = 10;
const ALL_STATUS = "ALL_STATUS";
const ALL_PLATFORM = "ALL_PLATFORM";

const statuses = ["Delivered", "Pending", "Cancelled", "Returned"];
const platforms = ["Shopee", "Lazada", "TikTok Shop", "Physical Store"];

const getStatusClasses = (status) => {
  switch (status) {
    case "Delivered":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
    case "Pending":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
    case "Cancelled":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
    case "Returned":
      return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
  }
};

const OrderTable = () => {
    const [rows, setRows] = useState(orders); // Changed from products to orders
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedStatus, setSelectedStatus] = useState(ALL_STATUS);
    const [selectedPlatform, setSelectedPlatform] = useState(ALL_PLATFORM);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: "ascending" });
    const [currentPage, setCurrentPage] = useState(1);
    const [viewOrder, setViewOrder] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    // Reset to page 1 when filters/search change
    useEffect(() => {
      setCurrentPage(1);
    }, [searchTerm, selectedStatus, selectedPlatform]);
  
    // ---------- Derived Counts ----------
    const counts = useMemo(
      () => ({
        total: rows.length,
        delivered: rows.filter((o) => o.status === "Delivered").length,
        pending: rows.filter((o) => o.status === "Pending").length,
        cancelled: rows.filter((o) => o.status === "Cancelled").length,
        returned: rows.filter((o) => o.status === "Returned").length,
      }),
      [rows]
    );

    // ---------- Filter + Sort ----------
    const filteredOrders = useMemo(() => {
      const term = searchTerm.trim().toLowerCase();
  
      let list = rows.filter((order) => {
        const matchesSearch =
          !term ||
          order.id.toString().includes(term) ||
          order.customer.toLowerCase().includes(term) ||
          order.platform.toLowerCase().includes(term) ||
          order.items.some(item => 
            item.productName.toLowerCase().includes(term) ||
            item.variantName.toLowerCase().includes(term)
          );
  
        const matchesPlatform =
          selectedPlatform === ALL_PLATFORM || order.platform === selectedPlatform;
  
        const matchesStatus =
          selectedStatus === ALL_STATUS || order.status === selectedStatus;
  
        return matchesSearch && matchesPlatform && matchesStatus;
      });
  
      if (sortConfig.key) {
        const dir = sortConfig.direction === "ascending" ? 1 : -1;
        list = [...list].sort((a, b) => {
          let va = a[sortConfig.key];
          let vb = b[sortConfig.key];
  
          // Handle date sorting
          if (sortConfig.key === "date") {
            va = new Date(va);
            vb = new Date(vb);
          }
          
          // Handle items/quantity sorting
          if (sortConfig.key === "items") {
            va = a.items.length;
            vb = b.items.length;
          }
          
          if (sortConfig.key === "quantity") {
            va = a.items.reduce((sum, item) => sum + item.quantity, 0);
            vb = b.items.reduce((sum, item) => sum + item.quantity, 0);
          }
  
          if (va == null && vb == null) return 0;
          if (va == null) return -1 * dir;
          if (vb == null) return 1 * dir;
  
          if (typeof va === "number" && typeof vb === "number") {
            return va === vb ? 0 : va > vb ? dir : -dir;
          }
  
          const sa = String(va).toLowerCase();
          const sb = String(vb).toLowerCase();
          return sa === sb ? 0 : sa > sb ? dir : -dir;
        });
      }
  
      return list;
    }, [rows, searchTerm, selectedPlatform, selectedStatus, sortConfig]);

    const removeFilter = (type) => {
      if (type === "search") setSearchTerm("");
      if (type === "platform") setSelectedPlatform(ALL_PLATFORM);
      if (type === "status") setSelectedStatus(ALL_STATUS);
    };

    // ---------- Pagination ----------
    const totalPages = Math.max(1, Math.ceil(filteredOrders.length / ITEMS_PER_PAGE));
    const pageIndex = Math.min(currentPage, totalPages);
    const start = (pageIndex - 1) * ITEMS_PER_PAGE;
    const currentOrders = filteredOrders.slice(start, start + ITEMS_PER_PAGE);

    // ---------- Handlers ----------
    const handleSort = (key) => {
      if (!key) return;
      setSortConfig((prev) => ({
        key,
        direction: prev.key === key && prev.direction === "ascending" ? "descending" : "ascending",
      }));
    };

    const getSortIcon = (key) => {
      if (sortConfig.key !== key) return null;
      return sortConfig.direction === "ascending" ? "↑" : "↓";
    };

    const handleResetFilters = () => {
      setSearchTerm("");
      setSelectedPlatform(ALL_PLATFORM);
      setSelectedStatus(ALL_STATUS);
      setSortConfig({ key: null, direction: "ascending" });
      setCurrentPage(1);
    };

    // Calculate total quantity for an order
    const getTotalQuantity = (order) => {
      return order.items.reduce((sum, item) => sum + item.quantity, 0);
    };

  return (
    <div>
      {/* ---------- Filters & Search ---------- */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4 items-end">
          {/* Search */}
          <div className="flex-1 w-full">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Search orders...
            </label>
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="search"
                placeholder="Search by order ID, customer, or product..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Platform Filter */}
          <div className="w-full md:w-auto">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Platform
            </label>
            <div className="relative">
              <select
                value={selectedPlatform}
                onChange={(e) => setSelectedPlatform(e.target.value)}
                className="appearance-none w-full p-2.5 pr-8 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value={ALL_PLATFORM}>All Platforms</option>
                {platforms.map((platform) => (
                  <option key={platform} value={platform}>
                    {platform}
                  </option>
                ))}
              </select>
              <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Status Filter */}
          <div className="w-full md:w-auto">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Status
            </label>
            <div className="relative">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="appearance-none w-full p-2.5 pr-8 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500"
              >
                <option value={ALL_STATUS}>All Status</option>
                {statuses.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Reset Filters Button */}
          <div className="w-full md:w-auto">
            <button
              onClick={handleResetFilters}
              className="w-full px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
            >
              Reset Filters
            </button>
          </div>
        </div>

        {/* Active Filters Indicator */}
        {(searchTerm || selectedPlatform !== ALL_PLATFORM || selectedStatus !== ALL_STATUS) && (
          <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <span className="font-medium">Active filters:</span>
            {searchTerm && (
              <span className="inline-flex items-center px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-md">
                Search: "{searchTerm}"
                <button 
                  onClick={() => removeFilter('search')} 
                  className="ml-1 text-blue-600 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-100"
                >
                  <FiX className="w-3 h-3" />
                </button>
              </span>
            )}
            {selectedPlatform !== ALL_PLATFORM && (
              <span className="inline-flex items-center px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-md">
                Platform: {selectedPlatform}
                <button 
                  onClick={() => removeFilter('platform')} 
                  className="ml-1 text-blue-600 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-100"
                >
                  <FiX className="w-3 h-3" />
                </button>
              </span>
            )}
            {selectedStatus !== ALL_STATUS && (
              <span className="inline-flex items-center px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-md">
                Status: {selectedStatus}
                <button 
                  onClick={() => removeFilter('status')} 
                  className="ml-1 text-blue-600 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-100"
                >
                  <FiX className="w-3 h-3" />
                </button>
              </span>
            )}
          </div>
        )}
      </div>

      {/* Results Count */}
      <div className="mb-4 flex justify-between items-center">
        <p className="text-sm text-gray-700 dark:text-gray-400">
          Showing {filteredOrders.length} order{filteredOrders.length !== 1 ? 's' : ''}
          {(selectedPlatform !== ALL_PLATFORM || selectedStatus !== ALL_STATUS || searchTerm) && (
            <span className="ml-2">
              (filtered from {rows.length} total)
            </span>
          )}
        </p>
        
        {filteredOrders.length > 0 && (
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Page {pageIndex} of {totalPages}
          </div>
        )}
      </div>

      {/* ---------- Table ---------- */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                {TABLE_HEADERS.map(({ key, label }) => (
                  <th
                    key={label}
                    onClick={() => key && handleSort(key)}
                    className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                  >
                    <div className="flex items-center gap-1">
                      {label} {key && getSortIcon(key)}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {currentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  {/* Order ID */}
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                    #{order.id}
                  </td>
                  
                  {/* Date */}
                  <td className="px-6 py-4">
                    {formatDate(order.date)}
                  </td>
                  
                  {/* Customer */}
                  <td className="px-6 py-4">
                    {order.customer}
                  </td>
                  
                  {/* Products */}
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      {order.items.slice(0, 2).map((item, index) => (
                        <span key={index} className="text-sm">
                          {item.productName}
                          {item.variantName && ` (${item.variantName})`}
                        </span>
                      ))}
                      {order.items.length > 2 && (
                        <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          +{order.items.length - 2} more items
                        </span>
                      )}
                    </div>
                  </td>
                  
                  {/* Quantity */}
                  <td className="px-6 py-4">
                    {getTotalQuantity(order)}
                  </td>
                  
                  {/* Total Price */}
                  <td className="px-6 py-4 font-medium text-green-600 dark:text-green-400">
                    {formatCurrencyPH(order.total)}
                  </td>
                  
                  {/* Platform */}
                  <td className="px-6 py-4">
                    {order.platform}
                  </td>
                  
                  {/* Status */}
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusClasses(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Empty State */}
          {!currentOrders.length && (
            <div className="text-center py-12">
              <FiPackage className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No orders found</h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {searchTerm || selectedPlatform !== ALL_PLATFORM || selectedStatus !== ALL_STATUS
                  ? "Try adjusting your search or filter criteria"
                  : "No orders found in the system"}
              </p>
              {(searchTerm || selectedPlatform !== ALL_PLATFORM || selectedStatus !== ALL_STATUS) && (
                <button
                  onClick={handleResetFilters}
                  className="mt-4 px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                >
                  Clear all filters
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ---------- Pagination ---------- */}
      {filteredOrders.length > 0 && (
        <div className="flex items-center justify-between mt-6">
          <p className="text-sm text-gray-700 dark:text-gray-400">
            Showing {start + 1}-{Math.min(start + ITEMS_PER_PAGE, filteredOrders.length)} of {filteredOrders.length} orders
          </p>
          <div className="flex gap-2">
            <button
              disabled={pageIndex === 1}
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              className="px-3 py-1.5 text-sm border rounded-md bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            
            {/* Show limited page numbers for better UI */}
            {(() => {
              const pages = [];
              const maxVisiblePages = 5;
              let startPage = Math.max(1, pageIndex - Math.floor(maxVisiblePages / 2));
              let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
              
              // Adjust if we're near the beginning
              if (endPage - startPage + 1 < maxVisiblePages) {
                startPage = Math.max(1, endPage - maxVisiblePages + 1);
              }
              
              for (let i = startPage; i <= endPage; i++) {
                pages.push(
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i)}
                    className={`px-3 py-1.5 text-sm border rounded-md ${
                      pageIndex === i
                        ? "bg-blue-600 text-white border-blue-600 hover:bg-blue-700"
                        : "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                    }`}
                  >
                    {i}
                  </button>
                );
              }
              return pages;
            })()}
            
            <button
              disabled={pageIndex === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              className="px-3 py-1.5 text-sm border rounded-md bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderTable;