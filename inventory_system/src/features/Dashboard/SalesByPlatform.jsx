import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { formatCurrencyPH } from '../../utils/formatCurrencyPH';
import { salesByPlatform } from '../../data/mockdata';

const SalesByPlatform = () => {
  // Softer, more appealing color palette
  const COLORS = [
    '#60A5FA', // Soft blue
    '#34D399', // Mint green
    '#FBBF24', // Warm amber
    '#A78BFA', // Lavender purple
    '#F87171', // Coral pink
    '#2DD4BF'  // Teal
  ];

  // Transform salesByPlatform object into array format for the chart
  const salesDistribution = Object.entries(salesByPlatform).map(([name, value], index) => ({
    name,
    value,
    percentage: (value / Object.values(salesByPlatform).reduce((sum, val) => sum + val, 0) * 100).toFixed(1)
  }));

  // Sort by value descending
  salesDistribution.sort((a, b) => b.value - a.value);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 flex flex-col w-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-200">Sales by Platform</h3>
         <select className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded border-none text-gray-700 dark:text-gray-300">
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
              <span className="text-xs text-gray-500 dark:text-gray-400 truncate">{d.name}</span>
              <div className="font-bold text-sm dark:text-gray-200 truncate">
                {formatCurrencyPH(d.value)}
              </div>
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
                  strokeWidth={2}
                  strokeOpacity={0.8}
                />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value) => [
                formatCurrencyPH(value),
                'Sales'
              ]}
              contentStyle={{
                background: 'rgba(255, 255, 255, 0.95)',
                borderRadius: '12px',
                border: '1px solid #e5e7eb',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
                color: '#374151',
                backdropFilter: 'blur(4px)'
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
                <span className="text-xs text-gray-600 dark:text-gray-300">{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SalesByPlatform;