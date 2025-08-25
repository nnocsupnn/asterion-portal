import React from 'react'
import { FiX, FiPackage, FiExternalLink, FiTrendingUp, FiBox, FiShoppingBag, FiTag, FiLayers, FiDatabase, FiRefreshCw, FiInfo, FiImage } from "react-icons/fi";
import { formatCurrencyPH } from "../../utils/formatCurrencyPH";

const ViewProduct = ({ isOpen, onClose, product }) => {
  if (!isOpen || !product) return null;

  const getStatusClasses = (status) => {
    switch (status) {
      case "In Stock":
        return "bg-gradient-to-r from-green-500 to-emerald-500 text-white";
      case "Low Stock":
        return "bg-gradient-to-r from-amber-500 to-orange-500 text-white";
      case "Out of Stock":
        return "bg-gradient-to-r from-red-500 to-rose-500 text-white";
      case "On Sale":
        return "bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white";
      default:
        return "bg-gradient-to-r from-gray-500 to-slate-500 text-white";
    }
  };

 // Compute totals for stock, price, cost, and min stock
  const computeTotals = (product) => {
    if (!product.variants || product.variants.length === 0) {
      return { totalStock: 0, totalSellingPrice: 0, totalCostPrice: 0, totalMinStock: 0 };
    }

    const totalStock = product.variants.reduce((sum, v) => sum + v.stock, 0);
    const totalSellingPrice = product.variants.reduce((sum, v) => sum + v.price * v.stock, 0);
    const totalCostPrice = product.variants.reduce((sum, v) => sum + v.costPrice * v.stock, 0);
    const totalMinStock = product.variants.reduce((sum, v) => sum + (v.minStock || 0), 0);

    return { totalStock, totalSellingPrice, totalCostPrice, totalMinStock };
  };

  const { totalStock, totalSellingPrice, totalCostPrice, totalMinStock } = computeTotals(product);

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-lg flex items-center justify-center z-50 p-2 sm:p-4 transition-all duration-300">
      <div 
        className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[95vh] overflow-y-auto transform transition-all duration-300 scale-95 opacity-0 animate-modal-appear border border-gray-200/50 dark:border-gray-700/30"
      >
        <div className="p-5 sm:p-7">
          {/* Header */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200/60 dark:border-gray-700/50">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
                Product Details
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 flex items-center gap-1">
                <FiInfo className="w-3 h-3" /> Complete product information overview
              </p>
            </div>
            <button 
              onClick={onClose}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200 hover:scale-110 group"
              aria-label="Close"
            >
              <FiX className="w-5 h-5 text-gray-600 dark:text-gray-300 group-hover:text-gray-800 dark:group-hover:text-white transition-colors" />
            </button>
          </div>

          <div className="space-y-7">
            {/* Basic Information */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Image Display */}
              <div className="lg:col-span-1 space-y-4">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                  <FiShoppingBag className="w-4 h-4" /> Product Image
                </label>
                {product.image ? (
                  <div className="relative border-2 border-gray-300/70 dark:border-gray-600/50 rounded-2xl overflow-hidden bg-white dark:bg-gray-800/50 shadow-sm hover:shadow-md transition-shadow duration-300 h-64">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 to-purple-50/20 dark:from-blue-900/10 dark:to-purple-900/10 rounded-2xl hidden flex-col items-center justify-center">
                      <FiPackage className="mx-auto h-16 w-16 text-gray-400/70 mb-3" />
                      <p className="text-xs text-gray-500 dark:text-gray-400">Image failed to load</p>
                    </div>
                  </div>
                ) : (
                  <div className="relative border-2 border-dashed border-gray-300/70 dark:border-gray-600/50 rounded-2xl p-6 text-center h-64 flex flex-col items-center justify-center bg-white dark:bg-gray-800/50 shadow-sm hover:shadow-md transition-shadow duration-300">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 to-purple-50/20 dark:from-blue-900/10 dark:to-purple-900/10 rounded-2xl"></div>
                    <FiPackage className="mx-auto h-16 w-16 text-gray-400/70 mb-3 relative z-10" />
                    <p className="text-xs text-gray-500 dark:text-gray-400 relative z-10">No image available</p>
                  </div>
                )}
              </div>

              {/* Basic Information */}
              <div className="lg:col-span-2 space-y-5">
                <div className="bg-gradient-to-r from-blue-50/30 to-indigo-50/30 dark:from-blue-900/10 dark:to-indigo-900/10 p-5 rounded-2xl border border-gray-100/50 dark:border-gray-700/30">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
                    <FiTag className="w-5 h-5 text-blue-600 dark:text-blue-400" /> Basic Information
                  </h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Product Name
                    </label>
                    <div className="w-full px-5 py-3 text-lg font-semibold bg-white dark:bg-gray-800/70 rounded-xl dark:text-white border border-gray-200/50 dark:border-gray-700/30 shadow-sm">
                      {product.name || "N/A"}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        SKU
                      </label>
                      <div className="w-full px-4 py-3 text-sm font-mono bg-white dark:bg-gray-800/70 rounded-xl dark:text-white border border-gray-200/50 dark:border-gray-700/30 shadow-sm">
                        {product.variants && product.variants.length > 0 
                          ? product.variants[0].sku || "N/A" 
                          : "N/A"}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Brand
                      </label>
                      <div className="w-full px-4 py-3 text-sm bg-white dark:bg-gray-800/70 rounded-xl dark:text-white border border-gray-200/50 dark:border-gray-700/30 shadow-sm">
                        {product.brand || "N/A"}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Category
                      </label>
                      <div className="w-full px-4 py-3 text-sm bg-white dark:bg-gray-800/70 rounded-xl dark:text-white border border-gray-200/50 dark:border-gray-700/30 shadow-sm">
                        {product.category || "N/A"}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Status
                      </label>
                      <div className="w-full px-4 py-3 text-sm text-center rounded-xl">
                        <span className={`px-4 py-2 rounded-full text-xs font-semibold ${getStatusClasses(product.status)} shadow-md`}>
                          {product.status || "N/A"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {product.variants && product.variants.length > 1 && (
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Variants
                      </label>
                      <div className="w-full px-4 py-3 text-sm bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 text-purple-800 dark:text-purple-200 rounded-xl font-semibold border border-purple-200/50 dark:border-purple-700/30">
                        {product.variants.length} variants available
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Inventory Details */}
            <div className="bg-gradient-to-r from-slate-50/50 to-gray-50/50 dark:from-slate-800/30 dark:to-gray-800/30 p-5 rounded-2xl border border-gray-100/50 dark:border-gray-700/30">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
                <FiBox className="w-5 h-5 text-indigo-600 dark:text-indigo-400" /> Inventory Details
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                <div className="bg-white dark:bg-gray-800/70 p-4 rounded-xl border border-gray-200/50 dark:border-gray-700/30 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Total Stock
                  </label>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white text-center">
                    {totalStock} <span className="text-sm font-normal text-gray-500 dark:text-gray-400">units</span>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800/70 p-4 rounded-xl border border-gray-200/50 dark:border-gray-700/30 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Minimum Stock
                  </label>
                  <div className="text-xl font-semibold text-gray-900 dark:text-white text-center">
                    {product.minStock || variant.minStock || "0"} <span className="text-sm font-normal text-gray-500 dark:text-gray-400">units</span>
                  </div>
                </div>
              </div>

              {product.variants && product.variants.length > 1 && (
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Variant Details
                  </label>
                  <div className="bg-white dark:bg-gray-800/70 p-4 rounded-xl border border-gray-200/50 dark:border-gray-700/30 shadow-sm">
                    <div className="overflow-x-auto">
                      <table className="min-w-full">
                        <thead>
                          <tr className="border-b border-gray-200 dark:border-gray-700">
                            <th className="text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider py-2">Variant</th>
                            <th className="text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider py-2">Stock</th>
                            <th className="text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider py-2">Price</th>
                          </tr>
                        </thead>
                        <tbody>
                          {product.variants.map((variant, index) => (
                            <tr key={variant.id} className={index % 2 === 0 ? "bg-gray-50/50 dark:bg-gray-800/30" : ""}>
                              <td className="py-2 text-sm text-gray-900 dark:text-white">{variant.name}</td>
                              <td className="py-2 text-sm text-gray-900 dark:text-white">{variant.stock}</td>
                              <td className="py-2 text-sm text-gray-900 dark:text-white">{formatCurrencyPH(variant.price)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Pricing */}
            <div className="bg-gradient-to-r from-emerald-50/30 to-teal-50/30 dark:from-emerald-900/10 dark:to-teal-900/10 p-5 rounded-2xl border border-gray-100/50 dark:border-gray-700/30">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
                <FiTrendingUp className="w-5 h-5 text-emerald-600 dark:text-emerald-400" /> Pricing
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="bg-white dark:bg-gray-800/70 p-5 rounded-xl border border-gray-200/50 dark:border-gray-700/30 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Selling Price
                  </label>
                  <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 text-center">
                    {formatCurrencyPH(totalSellingPrice)}
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800/70 p-5 rounded-xl border border-gray-200/50 dark:border-gray-700/30 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Cost Price
                  </label>
                  <div className="text-xl font-semibold text-gray-900 dark:text-white text-center">
                      {formatCurrencyPH(totalCostPrice)}
                  </div>
                </div>
              </div>
              
              {totalSellingPrice > 0 && totalCostPrice > 0 && (
                <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="bg-white dark:bg-gray-800/70 p-4 rounded-xl border border-gray-200/50 dark:border-gray-700/30 shadow-sm">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Profit Margin
                    </label>
                    <div className="text-lg font-semibold text-gray-900 dark:text-white text-center">
                      {(((totalSellingPrice - totalCostPrice) / totalCostPrice) * 100).toFixed(1)}%
                    </div>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-800/70 p-4 rounded-xl border border-gray-200/50 dark:border-gray-700/30 shadow-sm">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Profit per Unit
                    </label>
                    <div className="text-lg font-semibold text-emerald-600 dark:text-emerald-400 text-center">
                      {formatCurrencyPH(totalSellingPrice - totalCostPrice)}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-5 border-t border-gray-200/60 dark:border-gray-700/50">
              <button
                onClick={onClose}
                className="flex-1 px-6 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 font-semibold flex items-center justify-center gap-2 shadow-lg shadow-blue-500/30 hover:shadow-blue-600/40 hover:-translate-y-0.5"
              >
                <FiExternalLink className="w-5 h-5" />
                Close Details
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes modal-appear {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        
        .animate-modal-appear {
          animation: modal-appear 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  )
}

export default ViewProduct;