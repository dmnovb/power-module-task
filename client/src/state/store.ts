import { configureStore } from "@reduxjs/toolkit";
import batteryReducer from "./batterySlice";
import notificationsReducer from "./notificationsSlice";
import payloadReducer from "./payloadSlice";

export const store = configureStore({
  reducer: {
    battery: batteryReducer,
    notifications: notificationsReducer,
    payload: payloadReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
