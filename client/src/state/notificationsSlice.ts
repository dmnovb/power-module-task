import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type Notification = {
  message: string | null;
  notificationType: "Warning" | "Danger" | null;
  chargeType: "Voltage" | "Amps" | null;
};

export type NotificationsState = {
  notifications: Notification[];
};

const initialState: NotificationsState = {
  notifications: [
    {
      message: null,
      notificationType: null,
      chargeType: null,
    },
  ],
};

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    notificationSupplier: (state, action: PayloadAction<Notification>) => {
      state.notifications = state.notifications.filter(
        (currentNotification) =>
          currentNotification.chargeType !== action.payload.chargeType
      );

      state.notifications.push(action.payload);
    },
  },
});

export const { notificationSupplier } = notificationsSlice.actions;

export default notificationsSlice.reducer;
