import React, { useEffect } from "react";
import { useParams, useOutletContext } from "react-router-dom";

const NotificationDetail = () => {
  const { id } = useParams();
  const { notifications, handleNotificationClick } = useOutletContext();
  const notification = notifications.find(n => n.id === Number(id));

  useEffect(() => {
    if (notification && !notification.read) {
      handleNotificationClick(notification.id);
    }
  }, [notification, handleNotificationClick]);

  if (!notification) return <div>Notification not found</div>;

  return (
    <div>
      <h2>{notification.title}</h2>
      <p>{notification.message}</p>
      <small>{notification.date}</small>
    </div>
  );
};

export default NotificationDetail;