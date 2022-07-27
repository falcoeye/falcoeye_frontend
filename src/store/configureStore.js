import { configureStore } from '@reduxjs/toolkit'
import sourcesReducer  from './sources'
import workflowReducer from "./workflows";
export const store = configureStore({
    reducer: {
        sources: sourcesReducer,
        workflows: workflowReducer,
    },
})
