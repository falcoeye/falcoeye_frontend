import { createSlice } from '@reduxjs/toolkit'

const initialState = []

export const counterSlice = createSlice({
    name: 'sources',
    initialState,
    reducers: {
        fetchSources: (state, action) => {
            state = action.payload
        },
        addSource: (state, action) => {
            state = [
                ...state,
                {...action.payload}
            ]
        },
    },
})

// Action creators are generated for each case reducer function
export const { fetchSources, addSource } = counterSlice.actions

export default counterSlice.reducer