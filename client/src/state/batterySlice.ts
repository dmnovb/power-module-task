import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export type Battery = {
  id: number;
  name: string | null;
  connected: boolean;
  volts: number[];
};

type PayloadState = {
  batteries: Battery[];
  data: null;
  loading: boolean;
  error: string | null;
};

const initialState: PayloadState = {
  batteries: [
    {
      id: 1,
      name: null,
      connected: true,
      volts: [],
    },
    {
      id: 2,
      name: null,
      connected: true,
      volts: [],
    },
  ],
  data: null,
  loading: false,
  error: null,
};

const batterySlice = createSlice({
  name: "payload",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        checkVoltage.fulfilled,
        (state, action: PayloadAction<number[]>) => {
          for (let i = 0; i < state.batteries.length; i++) {
            state.batteries[i].volts = action.payload;
          }
          state.loading = false;
        }
      )
      .addCase(checkVoltage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkVoltage.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export const checkVoltage = createAsyncThunk(
  "battery/checkVoltage",
  async () => {
    try {
      const response = await fetch("http://localhost:1337/voltage");

      return response.json();
    } catch (error) {
      throw error;
    }
  }
);

export default batterySlice.reducer;
