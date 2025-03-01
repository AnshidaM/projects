import { configureStore } from "@reduxjs/toolkit";
import uiSlice from "./ui-slice";
import todosSlice from "./todos-slice";
import authSlice from "./auth-slice";

const store = configureStore({
  reducer: { ui: uiSlice.reducer, todo: todosSlice.reducer , auth:authSlice.reducer },
});
export default store;
