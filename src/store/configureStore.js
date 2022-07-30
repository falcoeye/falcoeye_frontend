import { configureStore } from "@reduxjs/toolkit";
import analysisReducer from "./analysis";
import sourcesReducer from "./sources";
import workflowReducer from "./workflows";

export const store = configureStore({
  reducer: {
    sources: sourcesReducer,
    workflows: workflowReducer,
    analysis: analysisReducer,
  },
});
