import { configureStore } from '@reduxjs/toolkit'
import sourcesReducer  from './sources'
export const store = configureStore({
    reducer: {
        sources: sourcesReducer,
    },
})