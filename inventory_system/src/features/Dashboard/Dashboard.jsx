import React from "react";
import { 
  totalProducts, 
  lowStocks, 
  inventoryValue, 
  brands, 
  categories,
  products,
  salesData,
  weeklySalesData,
  salesDistribution,
  totalRevenue,
  totalOrders,
  salesGrowth
} from "../../data/mockdata";
import { formatCurrencyPH } from "../../utils/formatCurrencyPH";
import { GrMoney } from "react-icons/gr";
import { BsBoxSeam, BsExclamationCircle } from "react-icons/bs";
import { MdCategory, MdShoppingCart } from "react-icons/md";
import { RiPriceTag3Line } from "react-icons/ri";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042"];

const Dashboard = () => {
  // Calculate inventory growth (random for demo)
  const inventoryGrowth = (Math.random() * 10).toFixed(1);
  // Calculate product growth based on recent additions
  const productGrowth = 5.2; // Static for demo

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-8 text-gray-800 dark:text-gray-100">Dashboard</h1>
      
      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {/* Total Products */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-gray-500">Total Products</span>
            <BsBoxSeam className="w-8 h-8 text-blue-500" />
          </div>
          <div className="flex items-end gap-4 mt-2">
            <span className="text-3xl font-bold">{totalProducts}</span>
            <span className={`text-xs px-2 py-1 ${productGrowth > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'} rounded-full font-semibold`}>
              {productGrowth > 0 ? '+' : ''}{productGrowth}%
            </span>
          </div>
        </div>
        
        {/* Inventory Value */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-gray-500">Inventory Value</span>
            <RiPriceTag3Line className="w-8 h-8 text-green-500" />
          </div>
          <div className="flex items-end gap-4 mt-2">
            <span className="text-3xl font-bold">{formatCurrencyPH(inventoryValue)}</span>
            <span className={`text-xs px-2 py-1 ${inventoryGrowth > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'} rounded-full font-semibold`}>
              {inventoryGrowth > 0 ? '+' : ''}{inventoryGrowth}%
            </span>
          </div>
        </div>
        
        {/* Low Stock Items */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-gray-500">Low Stock Items</span>
            <BsExclamationCircle className="w-8 h-8 text-orange-500" />
          </div>
          <div className="flex items-end gap-4 mt-2">
            <span className="text-3xl font-bold">{lowStocks}</span>
            <span className="text-xs px-2 py-1 bg-orange-100 text-orange-700 rounded-full font-semibold">
              Needs attention
            </span>
          </div>
        </div>
        
        {/* Total Orders */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-gray-500">Total Orders</span>
            <MdShoppingCart className="w-8 h-8 text-purple-500" />
          </div>
          <div className="flex items-end gap-4 mt-2">
            <span className="text-3xl font-bold">{totalOrders}</span>
            <span className={`text-xs px-2 py-1 ${salesGrowth > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'} rounded-full font-semibold`}>
              {salesGrowth > 0 ? '+' : ''}{salesGrowth}%
            </span>
          </div>
        </div>
      </div>
      
      {/* Overview Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Sales Overview (BarChart) */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold text-gray-700 dark:text-gray-200">Monthly Sales</span>
            <button className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">Filter</button>
          </div>
          <span className="text-2xl font-bold mb-2">{formatCurrencyPH(salesData[salesData.length-1].sales)}</span>
          <span className={`text-xs px-2 py-1 ${salesGrowth > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'} rounded-full font-semibold`}>
            {salesGrowth > 0 ? '+' : ''}{salesGrowth}% {salesGrowth > 0 ? '↑' : '↓'} &nbsp; 
            {formatCurrencyPH(Math.abs(salesData[2].sales - salesData[1].sales))} {salesGrowth > 0 ? 'increase' : 'decrease'}
          </span>
          <div className="w-full h-32 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => formatCurrencyPH(value)} />
                <Bar dataKey="sales" fill="#8884d8" radius={[4,4,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Weekly Sales (BarChart) */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold text-gray-700 dark:text-gray-200">Weekly Sales</span>
            <MdCategory className="w-6 h-6 text-purple-500" />
          </div>
          <span className="text-2xl font-bold mb-2">
            {formatCurrencyPH(weeklySalesData.reduce((sum, day) => sum + day.sales, 0))}
          </span>
          <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full font-semibold">
            {Math.random() > 0.5 ? '+' : '-'}{Math.floor(Math.random() * 20)}% vs last week
          </span>
          <div className="w-full h-32 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklySalesData}>
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip formatter={(value) => formatCurrencyPH(value)} />
                <Bar dataKey="sales" fill="#82ca9d" radius={[4,4,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Total Revenue */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold text-gray-700 dark:text-gray-200">Total Revenue</span>
            <GrMoney className="w-6 h-6 text-green-500" />
          </div>
          <span className="text-2xl font-bold mb-2">{formatCurrencyPH(totalRevenue)}</span>
          <span className={`text-xs px-2 py-1 ${salesGrowth > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'} rounded-full font-semibold`}>
            {salesGrowth > 0 ? '+' : ''}{salesGrowth}% ↑ &nbsp; 
            {formatCurrencyPH(Math.abs(salesData[2].sales - salesData[1].sales))} {salesGrowth > 0 ? 'increase' : 'decrease'}
          </span>
        </div>
      </div>
      
      {/* Distribution and List Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Sales Distribution (PieChart) */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold text-gray-700 dark:text-gray-200">Sales by Platform</span>
            <select className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded border-none">
              <option>Last 30 Days</option>
              <option>Last 90 Days</option>
            </select>
          </div>

          {/* Platform Sales Summary */}
          <div className="grid grid-cols-2 gap-4 mt-4 mb-2">
            {salesDistribution.map((d, idx) => (
              <div key={d.name} className="flex items-center">
                <div 
                  className="w-3 h-3 rounded-full mr-2 flex-shrink-0" 
                  style={{ backgroundColor: COLORS[idx % COLORS.length] }}
                />
                <div className="truncate">
                  <span className="text-xs text-gray-500 truncate">{d.name}</span>
                  <div className="font-bold text-sm truncate">{formatCurrencyPH(d.value)}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Pie Chart Container */}
          <div className="w-full h-[320px] mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart margin={{ top: 20, right: 20, bottom: 60, left: 20 }}>
                <Pie
                  data={salesDistribution}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  innerRadius={50}
                  paddingAngle={2}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {salesDistribution.map((entry, idx) => (
                    <Cell 
                      key={`cell-${idx}`} 
                      fill={COLORS[idx % COLORS.length]} 
                      stroke="#fff"
                      strokeWidth={1}
                    />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [
                    formatCurrencyPH(value),
                    'Sales'
                  ]}
                  contentStyle={{
                    background: 'white',
                    borderRadius: '8px',
                    border: '1px solid #eee',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    color: '#333'
                  }}
                />
                <Legend 
                  layout="horizontal"
                  verticalAlign="bottom"
                  wrapperStyle={{
                    paddingTop: '20px',
                    overflow: 'visible',
                    whiteSpace: 'wrap',
                  }}
                  formatter={(value) => (
                    <span className="text-xs dark:text-gray-300">{value}</span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Brands & Categories List */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-200">Inventory Summary</h3>
            <button className="text-xs px-3 py-1 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-full transition-colors">
              View All
            </button>
          </div>

          <div className="flex flex-col md:flex-row gap-6 mt-2">
            {/* Top Brands */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Top Brands</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">{brands.length} total</span>
              </div>
              <ul className="space-y-3">
                {brands.slice(0, 5).map((b, index) => {
                  const brandProducts = products.filter(p => p.brand === b);
                  const brandValue = brandProducts.reduce((sum, p) => sum + (p.price * p.totalStock), 0);
                  const percentage = (brandValue / inventoryValue * 100).toFixed(1);
                  
                  return (
                    <li key={b} className="group">
                      <div className="flex justify-between items-center mb-1">
                        <div className="flex items-center">
                          <span className="text-xs font-medium text-gray-500 dark:text-gray-400 mr-2 w-4">
                            {index + 1}.
                          </span>
                          <span className="font-medium text-gray-800 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {b}
                          </span>
                        </div>
                        <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                          {percentage}%
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-gray-500 dark:text-gray-400">
                          {brandProducts.length} {brandProducts.length === 1 ? 'item' : 'items'}
                        </span>
                        <span className="font-medium text-gray-700 dark:text-gray-200">
                          {formatCurrencyPH(brandValue)}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mt-1">
                        <div 
                          className="bg-blue-500 h-1.5 rounded-full" 
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Top Categories */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Top Categories</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">{categories.length} total</span>
              </div>
              <ul className="space-y-3">
                {categories.slice(0, 5).map((c, index) => {
                  const categoryProducts = products.filter(p => p.category === c);
                  const categoryValue = categoryProducts.reduce((sum, p) => sum + (p.price * p.totalStock), 0);
                  const percentage = (categoryValue / inventoryValue * 100).toFixed(1);
                  
                  return (
                    <li key={c} className="group">
                      <div className="flex justify-between items-center mb-1">
                        <div className="flex items-center">
                          <span className="text-xs font-medium text-gray-500 dark:text-gray-400 mr-2 w-4">
                            {index + 1}.
                          </span>
                          <span className="font-medium text-gray-800 dark:text-gray-200 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                            {c}
                          </span>
                        </div>
                        <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                          {percentage}%
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-gray-500 dark:text-gray-400">
                          {categoryProducts.length} {categoryProducts.length === 1 ? 'item' : 'items'}
                        </span>
                        <span className="font-medium text-gray-700 dark:text-gray-200">
                          {formatCurrencyPH(categoryValue)}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mt-1">
                        <div 
                          className="bg-green-500 h-1.5 rounded-full" 
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
      </div>
    </div>
  );
};

export default Dashboard;