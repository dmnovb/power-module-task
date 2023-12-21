import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export type Payload = {
  id: number;
  name: string | null;
  connected: boolean;
  amps: number[];
};

type PayloadState = {
  payloads: Payload[];
  data: null | any;
  loading: boolean;
  error: string | null;
};

const initialState: PayloadState = {
  payloads: [
    {
      id: 1,
      name: null,
      connected: true,
      amps: [],
    },
    {
      id: 2,
      name: null,
      connected: true,
      amps: [],
    },
  ],
  data: null,
  loading: false,
  error: null,
};

const payloadSlice = createSlice({
  name: "payload",
  initialState,
  reducers: {
    disconnectPayload: (state, action: PayloadAction<number>) => {
      const payload = state.payloads.find(
        (payload) => payload.id === action.payload
      );

      if (payload) {
        payload.connected = false;
      }
    },
    reconnectPayload: (state, action: PayloadAction<number>) => {
      const payload = state.payloads.find(
        (payload) => payload.id === action.payload
      );
      if (payload) {
        payload.connected = true;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        checkAmps.fulfilled,
        (state, action: PayloadAction<number[]>) => {
          for (let i = 0; i < state.payloads.length; i++) {
            state.payloads[i].amps = action.payload;
          }
          state.data = action.payload;
          state.loading = false;
        }
      )
      .addCase(checkAmps.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkAmps.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { disconnectPayload, reconnectPayload } = payloadSlice.actions;

export const checkAmps = createAsyncThunk("payload/checkAmps", async () => {
  try {
    const response = await fetch("http://localhost:1337/amps");
    return await response.json();
  } catch (error) {
    throw error;
  }
});

export default payloadSlice.reducer;
