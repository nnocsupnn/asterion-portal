import React, { useState, useMemo, useEffect } from "react";
import {
  FiSearch,
  FiAlertTriangle,
  FiPackage,
  FiUpload,
  FiEdit,
  FiTrash2,
  FiEye,
  FiChevronDown,
  FiX,
  FiTruck,
  FiClock,
  FiXCircle,
  FiRotateCcw,
} from "react-icons/fi";
import { IoAdd } from "react-icons/io5";
import { MdOutlinePendingActions } from "react-icons/md";
import { formatCurrencyPH } from "../../utils/formatCurrencyPH";
import AddProduct from "../Add_Product/addProduct";
import ViewProduct from "../View_Product/viewProduct";
import { products, categories } from "../../data/mockdata";

const ITEMS_PER_PAGE = 10;

const ALL_CATEGORIES = "ALL_CATEGORIES";
const ALL_STATUS = "ALL_STATUS";

const SUMMARY_CARDS = [
  { key: "totalOrder", title: "Total Orders", color: "blue", icon: <FiPackage /> },
  { key: "Delivered", title: "Delivered", color: "green", icon: <FiTruck /> },
  { key: "Pending", title: "Pending", color: "yellow", icon: <MdOutlinePendingActions /> },
  { key: "Cancelled", title: "Cancelled", color: "orange", icon: <FiXCircle />},
  { key: "Returned", title: "Returned", color: "red", icon: <FiRotateCcw /> },
];

const COLOR_MAP = {
  blue: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
  green: "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400",
  yellow: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400",
  orange: "bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400",
  red: "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400",
};

const TABLE_HEADERS = [
  { key: "OrderID", label: "Purchase ID"},
  { key: "name", label: "Product" },
  { key: "sku", label: "SKU" },
  { key: "category", label: "Category" },
  { key: "variant", label: "variant" },
  { key: "quantity", label: "Quantity"},
  { key: "totalCost", label: "Total Cost" },
  { key: "status", label: "Status" },
];

const getStatusClasses = (status) => {
  switch (status) {
    case "Delivered":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
    case "Pending":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
    case "Cancelled":
      return "bg-orange-100 text-oranged-800 dark:bg-orange-900 dark:text-orange-200";
    case "Returned":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
  }
};

const orderPage = () => {
  const [rows, setRows] = useState(products);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(ALL_CATEGORIES);
  const [selectedStatus, setSelectedStatus] = useState(ALL_STATUS);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "ascending" });
  const [currentPage, setCurrentPage] = useState(1);
  const [viewProduct, setViewProduct] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  
    // Reset to page 1 when filters/search change
    useEffect(() => {
      setCurrentPage(1);
    }, [searchTerm, selectedCategory, selectedStatus]);
  
    // ---------- Derived Counts (live) ----------
    const counts = useMemo(
      () => ({
        total: rows.length,
        inStock: rows.filter((p) => p.status === "In Stock").length,
        lowStock: rows.filter((p) => p.status === "Low Stock").length,
        outOfStock: rows.filter((p) => p.status === "Out of Stock").length,
      }),
      [rows]
    );
  
    // ---------- Filter + Sort (live) ----------
    const filteredProducts = useMemo(() => {
      const term = searchTerm.trim().toLowerCase();
  
      let list = rows.filter((p) => {
        // Always apply search filter if there's a search term
        const matchesSearch = !term || 
          p.name.toLowerCase().includes(term) || 
          p.sku.toLowerCase().includes(term);
  
        // Apply category filter ONLY if a specific category is selected
        const matchesCategory = selectedCategory === ALL_CATEGORIES || 
          p.category === selectedCategory;
  
        // Apply status filter ONLY if a specific status is selected
        const matchesStatus = selectedStatus === ALL_STATUS || 
          p.status === selectedStatus;
  
        return matchesSearch && matchesCategory && matchesStatus;
      });
  
      // Apply sorting if configured
      if (sortConfig.key) {
        const dir = sortConfig.direction === "ascending" ? 1 : -1;
        list = [...list].sort((a, b) => {
          const va = a[sortConfig.key];
          const vb = b[sortConfig.key];
  
          // Handle null/undefined values
          if (va == null && vb == null) return 0;
          if (va == null) return -1 * dir;
          if (vb == null) return 1 * dir;
  
          // Compare numbers
          if (typeof va === "number" && typeof vb === "number") {
            return va === vb ? 0 : va > vb ? dir : -dir;
          }
  
          // Compare strings
          const sa = String(va).toLowerCase();
          const sb = String(vb).toLowerCase();
          if (sa === sb) return 0;
          return sa > sb ? dir : -dir;
        });
      }
  
      return list;
    }, [rows, searchTerm, selectedCategory, selectedStatus, sortConfig]);
  
    // ---------- Pagination ----------
    const totalPages = Math.max(1, Math.ceil(filteredProducts.length / ITEMS_PER_PAGE));
    const pageIndex = Math.min(currentPage, totalPages);
    const start = (pageIndex - 1) * ITEMS_PER_PAGE;
    const currentProducts = filteredProducts.slice(start, start + ITEMS_PER_PAGE);
  
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
  
    const handleAddProduct = (productData) => {
      setRows((prev) => [
        ...prev,
        {
          id: Date.now(),
          initialStock: productData.initialStock ?? 0,
          minStock: productData.minStock ?? 0,
          ...productData,
        },
      ]);
      setIsModalOpen(false);
    };
  
    const handleDeleteProduct = (id) => {
      setRows((prev) => prev.filter((p) => p.id !== id));
    };
  
    // Reset filters
    const handleResetFilters = () => {
      setSearchTerm("");
      setSelectedCategory(ALL_CATEGORIES);
      setSelectedStatus(ALL_STATUS);
      setSortConfig({ key: null, direction: "ascending" });
      setCurrentPage(1);
    };
  
    // Remove individual filter
    const removeFilter = (type) => {
      if (type === 'search') setSearchTerm("");
      if (type === 'category') setSelectedCategory(ALL_CATEGORIES);
      if (type === 'status') setSelectedStatus(ALL_STATUS);
    };
  
    // view product handler
    const handleViewProduct = () => {
      setViewProduct(true);
    };


  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-4 py-6 sm:px-6 lg:px-8">
      {/* ---------- Header ---------- */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100">
            Orders
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Track all order movements and transactions
          </p>
        </div>

        <div className="flex flex-col xs:flex-row gap-3">
          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 font-medium rounded-lg px-4 py-2.5 transition-colors"
          >
            <FiUpload className="w-4 h-4" aria-hidden="true" /> Export
          </button>

          <button
            type="button"
            // onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center justify-center gap-2 text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 font-medium rounded-lg px-4 py-2.5 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all"
          >
            <IoAdd className="w-5 h-5" aria-hidden="true" /> Add Order
          </button>
        </div>
        {/* Add Order Modal */}
        
         
      </div>

     

      {/* ---------- Summary Cards ---------- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        {SUMMARY_CARDS.map(({ key, title, color, icon }) => (
          <div
            key={key}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{counts[key]}</p>
              </div>
              <div className={`p-3 rounded-lg ${COLOR_MAP[color]}`}>
                {icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ---------- Filters & Search ---------- */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4 items-end">
          {/* Search */}
          <div className="flex-1 w-full">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Search Products
            </label>
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="search"
                placeholder="Search by name or SKU..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="w-full md:w-auto">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Category
            </label>
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="appearance-none w-full p-2.5 pr-8 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500"
              >
                <option value={ALL_CATEGORIES}>All Categories</option>
                {categories.map((option) => (
                  <option key={option} value={option}>
                    {option}
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
                {products.status.map((option) => (
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
        {(searchTerm || selectedCategory !== ALL_CATEGORIES || selectedStatus !== ALL_STATUS) && (
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
            {selectedCategory !== ALL_CATEGORIES && (
              <span className="inline-flex items-center px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-md">
                Category: {selectedCategory}
                <button 
                  onClick={() => removeFilter('category')} 
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
          Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
          {(selectedCategory !== ALL_CATEGORIES || selectedStatus !== ALL_STATUS || searchTerm) && (
            <span className="ml-2">
              (filtered from {rows.length} total)
            </span>
          )}
        </p>
        
        {filteredProducts.length > 0 && (
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
              {currentProducts.map((products) => (
                <tr key={products.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{products.name}</td>
                  <td className="px-6 py-4 font-mono text-gray-900 dark:text-gray-100">{products.sku}</td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                      {products.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 dark:text-white">{products.totalStock}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Min: {products.minStock}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900 dark:text-white">
                      {formatCurrencyPH(Number(products.basePrice).toFixed(2))}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Cost: {formatCurrencyPH(Number(products.baseCost).toFixed(2))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusClasses(products.status)}`}>
                      {products.status}
                    </span>
                    {products.notes && (
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{products.status}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 flex gap-2">
                    <button onClick={() => {
                              setSelectedProduct(products);
                              setViewProduct(true);
                            }} 
                            aria-label="View product" className="p-1.5 text-gray-400 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg transition-colors">
                      <FiEye className="w-4 h-4" />
                    </button>
                    <button aria-label="Edit product" 
                      className="p-1.5 text-gray-400 hover:text-yellow-600 dark:text-gray-400 dark:hover:text-gray-300 hover:bg-yellow-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                      <FiEdit className="w-4 h-4" />
                    </button>
                    <button
                      aria-label="Delete product"
                      onClick={() => handleDeleteProduct(products.id)}
                      className="p-1.5 text-gray-400 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                    >
                      <FiTrash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* View Product Modal */}
        <ViewProduct 
          isOpen={viewProduct} 
          onClose={() => setViewProduct(false)} 
          product={selectedProduct} 
        />

        {/* Empty State */}
        {!currentProducts.length && (
          <div className="text-center py-12">
            <FiPackage className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No products found</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {searchTerm || selectedCategory !== ALL_CATEGORIES || selectedStatus !== ALL_STATUS
                ? "Try adjusting your search or filter criteria"
                : "No products in inventory. Add your first product!"}
            </p>
            {(searchTerm || selectedCategory !== ALL_CATEGORIES || selectedStatus !== ALL_STATUS) && (
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

      {/* ---------- Pagination ---------- */}
      {filteredProducts.length > 0 && (
        <div className="flex items-center justify-between mt-6">
          <p className="text-sm text-gray-700 dark:text-gray-400">
            Showing {start + 1}-{Math.min(start + ITEMS_PER_PAGE, filteredProducts.length)} of {filteredProducts.length} products
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
  )
}

export default orderPage;
