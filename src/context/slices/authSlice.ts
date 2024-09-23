import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  token: string | null;
  user: any | null; // Replace `any` with the appropriate user type if available
}

const initialState: AuthState = {
  token: localStorage.getItem("x-auth-token") || null,
  user: JSON.parse(localStorage.getItem("user-data")!) || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      localStorage.setItem("x-auth-token", action.payload);
    },
    setUser: (state, action: PayloadAction<any>) => {
      // Replace `any` with the appropriate user type if available
      state.user = action.payload;
      localStorage.setItem("user-data", JSON.stringify(action.payload)); // User data should be stringified before storing
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem("x-auth-token");
      localStorage.removeItem("user-data");
      localStorage.removeItem("cart");
      localStorage.removeItem("wishlist");
    },
  },
});

export const { logout, setToken, setUser } = authSlice.actions;
export default authSlice.reducer;
