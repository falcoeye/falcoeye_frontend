import { configureStore } from '@reduxjs/toolkit'
import sourcesReducer from '../store/sources'
export const store = configureStore({
    reducer: {
        sources: sourcesReducer,
    },
})