import React from "react";
import { Link } from "react-router-dom";
import { IoClose } from "react-icons/io5";

const dropDownNotif = ({ notifications, onClose }) => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="px-4 py-2 font-semibold border-b border-gray-200 dark:border-gray-700">
          Store Notifications
        </div>
        <div className="p-2 lose-btn" onClick={onClose}>
          <IoClose className="w-5 h-5"/>
        </div>
      </div>
      <div className="overflow-y-auto max-h-[calc(64px*8)] scroll-smooth">
        {notifications.length > 0 ? (
          notifications.map((notif) => (
            <Link
              to={`/user/notifications/${notif.id}`}
              key={notif.id}
              onClick={onClose} // Only closes dropdown!
              className={`flex items-start gap-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${notif.read ? "opacity-60" : ""}`}
            >
              <img
                src={notif.avatar || "https://via.placeholder.com/40"}
                alt="avatar"
                className="w-10 h-10 rounded-sm object-cover"
              />
              <div className="flex-1">
                <p className="text-sm">{notif.title}</p>
                <span className="text-xs text-gray-500">
                  {notif.time || new Date(notif.date).toLocaleDateString()}
                </span>
              </div>
            </Link>
          ))
        ) : (
          <div className="px-4 py-3 text-sm text-gray-500">
            No new notifications
          </div>
        )}
      </div>
      <div className="px-4 py-2 text-center border-t border-gray-200 dark:border-gray-700">
        <Link
          to="/user/notifications"
          onClick={onClose}
          className="text-blue-500 hover:underline text-sm"
        >
          View All
        </Link>
      </div>
    </div>
  );
};

export default dropDownNotif;