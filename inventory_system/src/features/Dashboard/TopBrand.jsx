import React from 'react';
import { formatCurrencyPH } from '../../utils/formatCurrencyPH';
import { products, summaryData } from '../../data/mockdata';

const TopBrand = () => {
  // Get unique brands from products
  const brands = [...new Set(products.map(p => p.brand))];
  
  // Get unique categories from products
  const categories = [...new Set(products.map(p => p.category))];
  
  const inventoryValue = summaryData.inventoryValue;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6 flex flex-col w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200">
          Inventory Summary
        </h3>
        <button className="text-xs px-3 py-1 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-full transition-colors text-gray-700 dark:text-gray-300">
          View All
        </button>
      </div>

      <div className="flex flex-col xl:flex-row gap-4 sm:gap-6 mt-2">
        {/* Top Brands */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">
              Top Brands
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {brands.length} total
            </span>
          </div>
          <ul className="space-y-2 sm:space-y-3">
            {brands.slice(0, 5).map((b, index) => {
              const brandProducts = products.filter(p => p.brand === b);
              const brandValue = brandProducts.reduce((sum, p) => {
                const productValue = p.variants?.reduce((vSum, v) => vSum + (v.cost * v.stock), 0) || 0;
                return sum + productValue;
              }, 0);
              const percentage = inventoryValue > 0 ? (brandValue / inventoryValue * 100).toFixed(1) : 0;
              
              return (
                <li key={b} className="group p-2 sm:p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg transition-colors">
                  <div className="flex justify-between items-center mb-1">
                    <div className="flex items-center min-w-0">
                      <span className="text-xs font-medium text-gray-500 dark:text-gray-400 mr-2 w-4 flex-shrink-0">
                        {index + 1}.
                      </span>
                      <span className="font-medium text-xs sm:text-sm text-gray-800 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
                        {b}
                      </span>
                    </div>
                    <span className="text-xs font-medium text-gray-600 dark:text-gray-300 whitespace-nowrap flex-shrink-0 ml-2">
                      {percentage}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-xs mb-1 sm:mb-2">
                    <span className="text-gray-500 dark:text-gray-400 truncate">
                      {brandProducts.length} {brandProducts.length === 1 ? 'item' : 'items'}
                    </span>
                    <span className="font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap flex-shrink-0 ml-2">
                      {formatCurrencyPH(brandValue)}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 sm:h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-400 to-blue-600 h-1.5 sm:h-2 rounded-full transition-all duration-500" 
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Divider for mobile */}
        <div className="xl:hidden border-t border-gray-200 dark:border-gray-700 my-2"></div>

        {/* Top Categories */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">
              Top Categories
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {categories.length} total
            </span>
          </div>
          <ul className="space-y-2 sm:space-y-3">
            {categories.slice(0, 5).map((c, index) => {
              const categoryProducts = products.filter(p => p.category === c);
              const categoryValue = categoryProducts.reduce((sum, p) => {
                const productValue = p.variants?.reduce((vSum, v) => vSum + (v.cost * v.stock), 0) || 0;
                return sum + productValue;
              }, 0);
              const percentage = inventoryValue > 0 ? (categoryValue / inventoryValue * 100).toFixed(1) : 0;
              
              return (
                <li key={c} className="group p-2 sm:p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg transition-colors">
                  <div className="flex justify-between items-center mb-1">
                    <div className="flex items-center min-w-0">
                      <span className="text-xs font-medium text-gray-500 dark:text-gray-400 mr-2 w-4 flex-shrink-0">
                        {index + 1}.
                      </span>
                      <span className="font-medium text-xs sm:text-sm text-gray-800 dark:text-gray-200 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors truncate">
                        {c}
                      </span>
                    </div>
                    <span className="text-xs font-medium text-gray-600 dark:text-gray-300 whitespace-nowrap flex-shrink-0 ml-2">
                      {percentage}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-xs mb-1 sm:mb-2">
                    <span className="text-gray-500 dark:text-gray-400 truncate">
                      {categoryProducts.length} {categoryProducts.length === 1 ? 'item' : 'items'}
                    </span>
                    <span className="font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap flex-shrink-0 ml-2">
                      {formatCurrencyPH(categoryValue)}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 sm:h-2">
                    <div 
                      className="bg-gradient-to-r from-green-400 to-green-600 h-1.5 sm:h-2 rounded-full transition-all duration-500" 
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TopBrand;