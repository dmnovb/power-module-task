import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type Notification = {
  message: string | null;
  notificationType?: "Warning" | "Danger" | null;
  chargeType?: "Voltage" | "Amps" | null;
  payloadId?: number | null;
};

export type NotificationsState = {
  voltageNotifications: Notification[];
  ampNotifications: Notification[];
};

const initialState: NotificationsState = {
  voltageNotifications: [{ message: null }],
  ampNotifications: [
    {
      message: null,
      notificationType: null,
      payloadId: null,
    },
  ],
};

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    addVoltageNotification: (state, action: PayloadAction<Notification>) => {
      state.voltageNotifications = state.voltageNotifications.filter(
        (notification) => notification.message !== action.payload.message
      );

      state.voltageNotifications.push(action.payload);
    },

    addAmpNotification: (state, action: PayloadAction<Notification>) => {
      state.ampNotifications = state.ampNotifications.filter(
        (notification) => notification.payloadId !== action.payload.payloadId
      );

      state.ampNotifications.push(action.payload);
    },
    removeVoltNotification: (state) => {
      state.voltageNotifications = [];
    },
    removeAmpNotification: (state, action: PayloadAction<number>) => {
      state.ampNotifications = state.ampNotifications.filter(
        (notification) => notification.payloadId !== action.payload
      );
    },
  },
});

export const {
  addVoltageNotification,
  addAmpNotification,
  removeAmpNotification,
  removeVoltNotification,
} = notificationsSlice.actions;

export default notificationsSlice.reducer;
