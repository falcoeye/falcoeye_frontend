import { createSlice } from '@reduxjs/toolkit'
import axios from '../utility/api-instance'
import { toast } from 'react-toastify'

const initialState = {
    data: [],
    fetchingMedia: false,
    fetchingMediaError: null,
}

const mediaSlice = createSlice({
    name: 'media',
    initialState,
    reducers: {
        fetchingMedia: (state, action) => {
            state.fetchingMedia = true
            state.fetchingMediaError = null;
        },
        fetchMediaSuccess: (state, action) => {
            state.fetchingMedia = false
            state.data = action.payload
        },
        fetchMediaFailed: (state, action) => {
            state.fetchingMedia = false
            state.fetchingMediaError = action.payload;
        },
        addMedia: (state, action) => {
            state.data.push(action.payload)
        },
        deleteMedia: (state, action) => {
            state.data = state.data.filter( item => item.id !== action.payload )
        },
        editMedia: (state, action) => {
            const editedItemIndex = state.data.findIndex( item => item.id === action.payload.id )
            state.data[editedItemIndex] = action.payload
        },
    },
})

// Define a thunk that dispatches those action creators
export const fetchMedia = () => async (dispatch) => {
    dispatch(fetchingMedia())
    axios.get('/media/')
        .then(res => {
            dispatch(fetchMediaSuccess(res.data.media))
        })
        .catch(err => {
            dispatch(fetchMediaFailed(err.response.data.msg))
            toast.error(err.response.data.msg)
        })
}

const { actions, reducer } = mediaSlice

// Action creators are generated for each case reducer function
export const { fetchingMedia, fetchMediaSuccess, fetchMediaFailed, addMedia, deleteMedia, editMedia } = actions

export default reducer