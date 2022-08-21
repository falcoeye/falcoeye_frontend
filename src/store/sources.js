import { createSlice } from '@reduxjs/toolkit'
import axios from '../utility/api-instance'
import { toast } from 'react-toastify'

const initialState = {
    data: [],
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
            state.data.push(action.payload)
        },
        deleteSource: (state, action) => {
            state.data = state.data.filter( item => item.id !== action.payload )
        },
        editSource: (state, action) => {
            const editedItemIndex = state.data.findIndex( item => item.id === action.payload.id )
            state.data[editedItemIndex] = action.payload
        },
    },
})

// Define a thunk that dispatches those action creators
export const fetchSources = () => async (dispatch) => {
    dispatch(fetchingSources())
    axios.get('/camera/')
        .then(res => {
            if ( !res.data ) {
                dispatch(fetchSourcesSuccess([]))
                return;
            }
            dispatch(fetchSourcesSuccess(res.data.camera))
        })
        .catch(err => {
            dispatch(fetchSourcesFailed(err.response.data.msg))
            toast.error(err.response.data.msg)
        })
}

const { actions, reducer } = sourcesSlice

// Action creators are generated for each case reducer function
export const { fetchingSources, fetchSourcesSuccess, fetchSourcesFailed, addSource, deleteSource, editSource } = actions

export default reducer