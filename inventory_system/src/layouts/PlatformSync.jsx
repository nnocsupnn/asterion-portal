import React from "react";
import { LuRefreshCw, LuSmartphone, LuStore, LuWifi, LuClock4, LuActivity, LuCircleCheckBig, LuTriangleAlert, LuZap  } from "react-icons/lu";

const PlatformSync = () => {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 px-4 py-6 sm:px-6 lg:px-8">
     {/* ---------- Header ---------- */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100">
           Platform Sync
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
           Manage synchronization with online platforms
          </p>
        </div>
         <button className="inline-flex items-center justify-center gap-2 text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 font-medium rounded-lg px-4 py-2.5 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all">
            <LuRefreshCw className="w-4 h-4" />
            Sync Now
          </button>
      </div>

      {/* Platforms Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Shopee Card */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-2xl p-4 flex flex-col w-full border border-gray-200 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-xl flex items-center justify-center">
                <LuSmartphone className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Shopee</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Online marketplace integration</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <LuWifi className="w-5 h-5 text-green-500 dark:text-green-400" />
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                Connected
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl text-center">
              <p className="text-sm text-gray-600 dark:text-gray-300">Products Synced</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-50">156</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl text-center">
              <p className="text-sm text-gray-600 dark:text-gray-300">Sync Errors</p>
              <p className="text-2xl font-bold text-red-600 dark:text-red-400">0</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm gap-2">
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <LuClock4 className="w-4 h-4 text-gray-400 dark:text-gray-500" />
              <span className="text-sm">Last sync: Jan 15, 2025, 10:30 PM</span>
            </div>
            <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium">Configure</button>
          </div>
        </div>

        {/* Future Platforms */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-2xl p-4 flex flex-col w-full border border-gray-200 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-xl flex items-center justify-center">
                <LuStore className="w-6 h-6 text-gray-400 dark:text-gray-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Future Platforms</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Lazada, TikTok Shop, etc.</p>
              </div>
            </div>
            <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400">
              Coming Soon
            </span>
          </div>
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <LuZap className="w-8 h-8 text-gray-400 dark:text-gray-500" />
            </div>
            <p className="text-gray-500 dark:text-gray-400 mb-1">Ready for expansion</p>
            <p className="text-sm text-gray-400 dark:text-gray-500">Additional platform integrations will be available in future updates</p>
          </div>
        </div>
      </div>

      {/* Sync Settings */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-2xl p-6 mb-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Sync Settings</h3>
        <div className="space-y-4">
          {/* Auto Sync */}
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Auto Sync</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Automatically sync inventory every hour</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 rounded-full peer peer-checked:bg-blue-600 
              after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white dark:after:bg-gray-300
              after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full 
              peer-checked:after:border-white"></div>
            </label>
          </div>
          {/* Sync Frequency */}
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Sync Frequency</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">How often to sync when auto sync is enabled</p>
            </div>
            <select className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
              <option value="15">Every 15 minutes</option>
              <option value="30">Every 30 minutes</option>
              <option value="60">Every hour</option>
              <option value="120">Every 2 hours</option>
            </select>
          </div>
          {/* Low Stock */}
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Low Stock Alerts</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Notify when products reach minimum stock levels</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 rounded-full peer peer-checked:bg-blue-600 
              after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white dark:after:bg-gray-300
              after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full 
              peer-checked:after:border-white"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Recent Sync Activity */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Recent Sync Activity</h3>
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <LuActivity className="w-4 h-4 text-gray-400 dark:text-gray-500" />
            Live updates
          </div>
        </div>
        <div className="divide-y divide-gray-200 dark:divide-gray-700 max-h-[300px] overflow-y-auto">
          {[
            {
              title: "Stock Update",
              desc: "23 products updated successfully",
              status: "success",
              platform: "Shopee",
              time: "Jan 15, 2025, 10:30 PM",
            },
            {
              title: "Product Sync",
              desc: "156 products synchronized",
              status: "success",
              platform: "Shopee",
              time: "Jan 15, 2025, 10:25 PM",
            },
            {
              title: "Connection Test",
              desc: "API connection verified",
              status: "success",
              platform: "Shopee",
              time: "Jan 15, 2025, 10:20 PM",
            },
            {
              title: "Stock Update",
              desc: "2 products failed to update - rate limit reached",
              status: "warning",
              platform: "Shopee",
              time: "Jan 15, 2025, 09:30 PM",
            },
          ].map((log, i) => (
            <div key={i} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex items-center gap-3">
                {log.status === "success" ? (
                  <LuCircleCheckBig className="w-4 h-4 text-green-500 dark:text-green-400" />
                ) : (
                  <LuTriangleAlert className="w-4 h-4 text-orange-500 dark:text-orange-400" />
                )}
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-medium text-gray-800 dark:text-gray-200">{log.title}</span>
                    <span className="text-sm text-gray-500 dark:text-gray-500">•</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">{log.platform}</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{log.desc}</p>
                </div>
              </div>
              <div className="text-right">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    log.status === "success"
                      ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300"
                      : "bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300"
                  }`}
                >
                  {log.status}
                </span>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{log.time}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-center">
          <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium">
            View all sync logs
          </button>
        </div>
      </div>
    </main>
  );
};

export default PlatformSync;