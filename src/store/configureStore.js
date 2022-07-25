import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../store/user";
import workflowReducer from "./workflows";
export const store = configureStore({
  reducer: {
    user: userReducer,
    workflows: workflowReducer,
  },
});
