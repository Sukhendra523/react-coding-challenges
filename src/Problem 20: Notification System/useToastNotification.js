import { useCallback, useState } from "react";
import Notification from "./Notification";
import "./styles.css";

const useToastNotification = () => {
  const [notifications, setNotifications] = useState([]);

  const removeNotifation = (id) => {
    setNotifications((prevNotifications) => {
      const updatedNotifaions = [...prevNotifications].filter(
        (notification) => notification.id !== id
      );

      return updatedNotifaions;
    });
  };

  const showNotifications = useCallback((notificationObject) => {
    const notificationId = Math.random().toString(32);
    setNotifications((prevNotifications) => [
      ...prevNotifications,
      { id: notificationId, ...notificationObject },
    ]);

    if (notificationObject.duration) {
      setTimeout(() => {
        removeNotifation(notificationId);
      }, notificationObject.duration);
    }
  }, []);

  const NotificationContainer = () => {
    return (
      <div className="toast-message-container">
        {notifications.map((notification) => {
          return (
            <Notification
              key={notification.id}
              {...notification}
              onClose={removeNotifation}
            />
          );
        })}
      </div>
    );
  };

  return {
    showNotifications,
    NotificationsComponent: NotificationContainer,
  };
};

export default useToastNotification;
