/* 
### Problem 20: Notification System

**Description:**

- Implement a notification system that displays notifications at the top of the screen.
- Each notification should disappear automatically after a few seconds.
- Provide a close button to manually dismiss a notification.

*/

import { useState } from "react";
import useToastNotification from "./useToastNotification";

const ToastNotificationDemo = () => {
  const [count, setCount] = useState(0);

  const { showNotifications, NotificationsComponent } = useToastNotification();

  return (
    <div>
      <NotificationsComponent />
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor tenetur
        molestias exercitationem fugit iure minus earum sit fuga explicabo
        ratione alias delectus dolores soluta quasi, accusamus hic sed adipisci
        atque?
      </p>
      <button
        onClick={() => {
          setCount((prevCount) => prevCount + 1);

          showNotifications({
            message: `Toast Message ${count + 1}`,
            duration: 3000,
          });
        }}
      >
        Show Notification
      </button>
    </div>
  );
};

export default ToastNotificationDemo;
