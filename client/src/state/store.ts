import { configureStore } from "@reduxjs/toolkit";
import batteryReducer from "./batterySlice";
import notificationReducer from "./notificationsSlice";
import payloadReducer from "./payloadSlice";

export const store = configureStore({
  reducer: {
    batteriesReducer: batteryReducer,
    notificationsReducer: notificationReducer,
    payloadsReducer: payloadReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
