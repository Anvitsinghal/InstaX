import { createSlice } from "@reduxjs/toolkit";
const notificationslice = createSlice({
  name: "notifications",
  initialState: { notifications: [] },
  reducers: {
    addNotification: (state, action) => {
      state.notifications.unshift(action.payload);
    },
    clearNotifications: (state) => {
      state.notifications = [];
    }
  }
});
export const { addNotification, clearNotifications } = notificationslice.actions;
export default notificationslice.reducer; 