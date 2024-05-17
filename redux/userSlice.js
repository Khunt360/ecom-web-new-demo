import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { v4 as uuidv4 } from "uuid";
// Function to calculate expiration time for one month
const calculateExpirationTime = () => {
  const date = new Date();
  date.setMonth(date.getMonth() + 1); // Add one month to current date
  return date;
};

export const userSlice = createSlice({
  name: "user",
  initialState: {
    auth_token: Cookies.get("auth_token") || null,
    user: Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null,
    loader: false,
  },
  reducers: {
    updateToken: (state, action) => {
      state.auth_token = action.payload;
      Cookies.set("auth_token", action.payload, {
        expires: calculateExpirationTime(),
      });
    },
    updateUser: (state, action) => {
      state.user = action.payload;
      Cookies.set("user", JSON.stringify(action.payload), {
        expires: calculateExpirationTime(),
      });
    },
    logout: (state) => {
      state.auth_token = null;
      state.user = null;
      state.success = "";
      state.error = "";
      Cookies.remove("auth_token");
      Cookies.remove("user");
      // Regenerate session ID and update in localStorage
      const newSessionId = uuidv4();
      localStorage.setItem("sessionId", newSessionId);
    },
    toggleLoader: (state) => {
      state.loader = !state.loader;
    },
  },
});

export const { updateToken, updateUser, logout, toggleLoader } =
  userSlice.actions;

export default userSlice.reducer;
