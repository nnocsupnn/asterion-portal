import React from "react";
import { Link } from "react-router-dom";
import { IoClose } from "react-icons/io5";

const dropDownNotif = ({ notifications, onNotificationClick, onClose }) => {
  return (
    <div className="w-full pro-scrollbar">
      <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-800 z-10">
        <h3 className="font-semibold text-gray-800 dark:text-gray-200">Store Notifications</h3>
        <button 
          onClick={onClose}
          className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          aria-label="Close notifications"
        >
          <IoClose className="w-5 h-5 text-gray-500 dark:text-gray-400"/>
        </button>
      </div>
      <div className="overflow-y-auto max-h-94 md:max-h-124 lg:max-h-144 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-800 hover:scrollbar-thumb-gray-400 dark:hover:scrollbar-thumb-gray-500">
        {notifications.length > 0 ? (
          notifications.map((notif) => (
            <Link
              to={notif.link || `/user/notifications/${notif.id}`}
              key={notif.id}
              onClick={() => {
                onNotificationClick(notif.id);
                onClose();
              }}
              className={`flex items-start gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors border-b border-gray-100 dark:border-gray-700 last:border-b-0 ${notif.read ? "opacity-70" : "bg-blue-50/50 dark:bg-blue-900/20"}`}
            >
              <div className={`flex-shrink-0 w-2 h-2 rounded-full mt-2 ${notif.read ? "invisible" : "bg-blue-500"}`}></div>
              <img
                src={notif.avatar || "https://via.placeholder.com/40"}
                alt="avatar"
                className="w-10 h-10 rounded-sm object-cover flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">{notif.title}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{notif.message}</p>
                <span className="text-xs text-gray-400 dark:text-gray-500 block mt-2">
                  {notif.time || new Date(notif.date).toLocaleDateString()}
                </span>
              </div>
            </Link>
          ))
        ) : (
          <div className="px-4 py-8 text-center">
            <div className="text-gray-400 dark:text-gray-500 mb-2">📭</div>
            <p className="text-sm text-gray-500 dark:text-gray-400">No new notifications</p>
          </div>
        )}
      </div>
      <div className="p-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/80">
        <Link
          to="/user/notifications"
          onClick={onClose}
          className="block text-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium py-2 rounded-md hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors"
        >
          View All Notifications
        </Link>
      </div>
    </div>
  );
};

export default dropDownNotif;