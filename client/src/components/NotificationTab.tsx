import { Notification } from "../state/notificationsSlice";
import { CSSProperties } from "react";

type NotificationTabProps = {
  notifications: Notification[];
};

const ampWarningStyle: CSSProperties = {
  backgroundColor: "rgb(255, 171, 0)",
  padding: ".3rem",
  color: "black",
  borderRadius: "14px",
  margin: ".5rem",
};
const ampDangerStyle: CSSProperties = {
  backgroundColor: "rgb(255, 84, 87)",
  color: "black",
  wordBreak: "break-word",
  borderRadius: "14px",
  margin: ".5rem",
};
const voltDangerStyle: CSSProperties = {
  backgroundColor: "rgb(255, 84, 87)",
  color: "black",
  borderRadius: "14px",
  margin: ".5rem",
};

export const NotificationTab = ({
  ampNotifications,
  voltNotifications,
}: any) => {
  return (
    <div className="notification-container" data-cy="notifications">
      <h1 style={{ fontSize: "20px" }}>Notifications</h1>
      <ul className="notification-message-container">
        <li>
          <div style={voltDangerStyle}>
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
                      : ampDangerStyle
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
