import React from "react";
import { 
  totalProducts, 
  lowStocks, 
  inventoryValue, 
  brands, 
  categories,
  products
} from "../../data/mockdata";
import { formatCurrencyPH } from "../../utils/formatCurrencyPH";
import { GrMoney } from "react-icons/gr";
import { BsBoxSeam, BsExclamationCircle } from "react-icons/bs";
import { MdCategory } from "react-icons/md";
import { RiPriceTag3Line } from "react-icons/ri";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";

// Sample Sales Data
const salesData = [
  { month: "Oct", sales: 298820 },
  { month: "Nov", sales: 176509 },
  { month: "Dec", sales: 400565 }
];

// Sample Subscriber Data
const subscriberData = [
  { day: "Sun", value: 1874 },
  { day: "Mon", value: 2546 },
  { day: "Tue", value: 3874 },
  { day: "Wed", value: 2250 },
  { day: "Thu", value: 2001 },
  { day: "Fri", value: 1700 },
  { day: "Sat", value: 1200 }
];

// Sample Distribution Data
const distributionData = [
  { name: "Website", value: 374.82 },
  { name: "Mobile App", value: 241.60 },
  { name: "Other", value: 213.42 }
];
const COLORS = ["#8884d8", "#82ca9d", "#ffc658"];

const Dashboard = () => {
  // For demo, generate fake stats
  const pageViews = 12450;
  const totalRevenue = 363.95;
  const bounceRate = 86.5;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-8 text-gray-800 dark:text-gray-100">Dashboard</h1>
      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Page Views */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-gray-500">Page Views</span>
            <BsBoxSeam className="w-8 h-8 text-blue-500" />
          </div>
          <div className="flex items-end gap-4 mt-2">
            <span className="text-3xl font-bold">{pageViews.toLocaleString()}</span>
            <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full font-semibold">+15.8%</span>
          </div>
        </div>
        {/* Total Revenue */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-gray-500">Total Revenue</span>
            <GrMoney className="w-8 h-8 text-green-500" />
          </div>
          <div className="flex items-end gap-4 mt-2">
            <span className="text-3xl font-bold">{formatCurrencyPH(totalRevenue)}</span>
            <span className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded-full font-semibold">-34.0%</span>
          </div>
        </div>
        {/* Bounce Rate */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-gray-500">Bounce Rate</span>
            <BsExclamationCircle className="w-8 h-8 text-orange-500" />
          </div>
          <div className="flex items-end gap-4 mt-2">
            <span className="text-3xl font-bold">{bounceRate}%</span>
            <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full font-semibold">+24.2%</span>
          </div>
        </div>
      </div>
      {/* Overview Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Sales Overview (BarChart) */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold text-gray-700 dark:text-gray-200">Sales Overview</span>
            <button className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">Filter</button>
          </div>
          <span className="text-2xl font-bold mb-2">{formatCurrencyPH(salesData[salesData.length-1].sales)}</span>
          <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full font-semibold">
            +15.8% ↑ &nbsp; +₱143,500 increased
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
        {/* Total Products (BarChart) */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold text-gray-700 dark:text-gray-200">Total Products</span>
            <MdCategory className="w-6 h-6 text-purple-500" />
          </div>
          <span className="text-2xl font-bold mb-2">{totalProducts.toLocaleString()}</span>
          <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full font-semibold">
            +3.2% ↑ &nbsp; +49 increased
          </span>
          <div className="w-full h-32 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={subscriberData}>
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#82ca9d" radius={[4,4,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        {/* Inventory Value Widget */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold text-gray-700 dark:text-gray-200">Inventory Value</span>
            <RiPriceTag3Line className="w-6 h-6 text-green-500" />
          </div>
          <span className="text-2xl font-bold mb-2">{formatCurrencyPH(inventoryValue)}</span>
          <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full font-semibold">
            +5.1% ↑ &nbsp; +₱1,250,250
          </span>
        </div>
      </div>
      {/* Distribution and List Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Sales Distribution (PieChart) */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold text-gray-700 dark:text-gray-200">Sales Distribution</span>
            <select className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded border-none">
              <option>Monthly</option>
              <option>Weekly</option>
            </select>
          </div>
          <div className="flex gap-8 mt-4">
            {distributionData.map((d, idx) => (
              <div key={d.name}>
                <span className="text-xs text-gray-500">{d.name}</span>
                <div className="font-bold">{formatCurrencyPH(d.value)}</div>
              </div>
            ))}
          </div>
          {/* PieChart centered and sized correctly */}
          <div className="flex flex-col items-center mt-6">
            <ResponsiveContainer width={220} height={220}>
              <PieChart>
                <Pie
                  data={distributionData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  innerRadius={50}
                  fill="#8884d8"
                  label
                >
                  {distributionData.map((entry, idx) => (
                    <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
                  ))}
                </Pie>
                <Legend
                  layout="horizontal"
                  verticalAlign="bottom"
                  align="center"
                  iconType="circle"
                />
                <Tooltip formatter={formatCurrencyPH} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        {/* Brands & Categories List */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold text-gray-700 dark:text-gray-200">Brands & Categories</span>
          </div>
          <div className="flex gap-8 mt-4">
            <div>
              <span className="text-xs font-semibold text-gray-500">Brands</span>
              <ul className="mt-1 space-y-1 text-gray-700 dark:text-gray-200 text-sm">
                {brands.map(b => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
            <div>
              <span className="text-xs font-semibold text-gray-500">Categories</span>
              <ul className="mt-1 space-y-1 text-gray-700 dark:text-gray-200 text-sm">
                {categories.map(c => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;