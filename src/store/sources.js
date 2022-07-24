import { createSlice } from '@reduxjs/toolkit'
import axios from '../utility/api-instance'
import { toast } from 'react-toastify'

const initialState = {
    data: [
        {
            "id": Math.random(),
            "name": "string",
            "utm_x": 46.9182,
            "utm_y": 8.2475,
            "created_at": new Date().toISOString(),
        },
        {
            "id": Math.random(),
            "name": "string",
            "utm_x": 47.8182,
            "utm_y": 8.3275,
            "created_at": new Date().toISOString(),
        },
        {
            "id": Math.random(),
            "name": "string",
            "utm_x": 47.2182,
            "utm_y": 8.4975,
            "created_at": new Date().toISOString(),
        },
    ],
    fetchingSources: false,
    fetchingSourcesError: null,
}

const sourcesSlice = createSlice({
    name: 'sources',
    initialState,
    reducers: {
        fetchingSources: (state, action) => {
            state.fetchingSources = true
            state.fetchingSourcesError = null;
        },
        fetchSourcesSuccess: (state, action) => {
            state.fetchingSources = false
            state.data = action.payload
        },
        fetchSourcesFailed: (state, action) => {
            state.fetchingSources = false
            state.fetchingSourcesError = action.payload;
        },
        addSource: (state, action) => {
            state.push(action.payload)
        },
    },
})

// Define a thunk that dispatches those action creators
export const fetchSources = () => async (dispatch) => {
    dispatch(fetchingSources())
    axios.get('/camera/')
        .then(res => {
            dispatch(fetchSourcesSuccess(res.data))
        })
        .catch(err => {
            dispatch(fetchSourcesFailed(err.response.data.msg))
            toast.error(err.response.data.msg)
        })
}

const { actions, reducer } = sourcesSlice

// Action creators are generated for each case reducer function
export const { fetchingSources, fetchSourcesSuccess, fetchSourcesFailed, addSource } = actions

export default reducer