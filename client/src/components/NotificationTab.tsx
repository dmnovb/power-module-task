import { Notification } from "../state/notificationsSlice";
import { CSSProperties } from "react";

type NotificationTabProps = Notification & {
  notifications: Notification[];
};

const ampWarningStyle: CSSProperties = {
  backgroundColor: "rgb(255, 171, 0)",
  color: "black",
  borderRadius: "14px",
  margin: ".5rem",
};
const ampDangerStyle: CSSProperties = {
  backgroundColor: "rgb(255, 84, 87)",
  color: "black",
  borderRadius: "14px",
  margin: ".5rem",
};
const voltDangerStyle: CSSProperties = {
  backgroundColor: "rgb(255, 84, 87)",
  color: "black",
  borderRadius: "14px",
  margin: ".5rem",
};

export const NotificationTab = ({ notifications }: NotificationTabProps) => {
  console.log(notifications);
  return (
    <div className="notification-container">
      <h1 style={{ fontSize: "20px" }}>Notifications</h1>
      <ul className="notification-message-container">
        <li>
          <div style={voltDangerStyle}>
            {notifications
              .filter(
                (notification: Notification) =>
                  notification.chargeType === "Voltage"
              )
              .map((notification: Notification) => (
                <li>{notification.message}</li>
              ))}
          </div>
          <div>
            {notifications
              .filter(
                (notification: Notification) =>
                  notification.chargeType === "Amps"
              )
              .map((notification: Notification) => (
                <li
                  style={
                    notification.notificationType === "Warning"
                      ? ampWarningStyle
                      : ampDangerStyle
                  }
                >
                  {notification.message}
                </li>
              ))}
          </div>
        </li>
      </ul>
    </div>
  );
};
