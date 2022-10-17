import { createSlice } from "@reduxjs/toolkit";

import { RootState } from "@/store/index";

interface SystemState {
  status: AsyncStatus;
  isLoggedIn: boolean;
}

const initialState: SystemState = {
  status: "idle",
  isLoggedIn: false,
};

export const systemSlice = createSlice({
  name: "system",
  initialState,
  reducers: {},
});

export default systemSlice.reducer;
export const isLoggedIn = (state: RootState) => state.system.isLoggedIn;
