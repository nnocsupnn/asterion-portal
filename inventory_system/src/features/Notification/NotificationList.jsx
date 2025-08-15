import React from "react";
import { useOutletContext, Link } from "react-router-dom";

const NotificationList = () => {
  const { notifications } = useOutletContext();

  if (!notifications || notifications.length === 0) {
    return <div>No notifications</div>;
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">All Notifications</h2>
      <div>
        {notifications.map((notif) => (
          <Link
            key={notif.id}
            to={`/user/notifications/${notif.id}`}
            className={`flex items-start gap-3 px-4 py-3 border-b hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${notif.read ? "opacity-60" : ""}`}
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
        ))}
      </div>
    </div>
  );
};

export default NotificationList;