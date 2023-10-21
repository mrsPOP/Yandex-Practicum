import classNames from "classnames";
import { useNotificationStore } from "../../hooks/useStore";
import "./Notification.css";

const Notification = () => {
  const { notificationObject } = useNotificationStore();
  const styles = classNames(
    "notification",
    { notification_error: notificationObject['isError'] },
    { notification_visible: notificationObject["isVisible"] }
  );

  return (
    <div className={styles}>
      <p className="notification__text">{notificationObject.text}</p>
    </div>
  );
};

export default Notification;
