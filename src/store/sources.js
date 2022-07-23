import { createSlice } from '@reduxjs/toolkit'

const initialState = []

const sourcesSlice = createSlice({
    name: 'sources',
    initialState,
    reducers: {
        fetchSources: (state, action) => {
            state = action.payload
        },
        addSource: (state, action) => {
            state.push(action.payload)
        },
    },
})

const { actions, reducer } = sourcesSlice

// Action creators are generated for each case reducer function
export const { fetchSources, addSource } = actions

export default reducer