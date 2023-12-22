import { Notification } from "../state/notificationsSlice";
import { CSSProperties } from "react";

type NotificationTabProps = {
  ampNotifications: Notification[];
  voltNotifications: Notification[];
};

const ampWarningStyle: CSSProperties = {
  backgroundColor: "rgb(255, 171, 0)",
  padding: ".3rem",
  color: "black",
  borderRadius: "14px",
  margin: ".5rem",
};
const dangerStyle: CSSProperties = {
  backgroundColor: "rgb(255, 84, 87)",
  color: "black",
  wordBreak: "break-word",
  borderRadius: "14px",
  margin: ".5rem",
};

export const NotificationTab = ({
  ampNotifications,
  voltNotifications,
}: NotificationTabProps) => {
  return (
    <div className="notification-container" data-cy="notifications">
      <h1 style={{ fontSize: "20px" }}>Notifications</h1>
      <ul className="notification-message-container">
        <li>
          <div style={dangerStyle}>
            {voltNotifications.map(
              (notification: Notification, index: number) => (
                <p key={index}>{notification.message}</p>
              )
            )}
          </div>
          <div>
            {ampNotifications.map(
              (notification: Notification, index: number) => (
                <p
                  key={index}
                  style={
                    notification.notificationType === "Warning"
                      ? ampWarningStyle
                      : dangerStyle
                  }
                >
                  {notification.message}
                </p>
              )
            )}
          </div>
        </li>
      </ul>
    </div>
  );
};
