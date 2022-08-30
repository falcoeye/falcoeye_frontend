import { createSlice } from "@reduxjs/toolkit";
import axios from "../utility/api-instance";
import { toast } from "react-toastify";

const initialState = {
  data: [],
  fetchingMedia: false,
  fetchingMediaError: null,
  page: 1,
  lastPage: false,
};

const mediaSlice = createSlice({
  name: "media",
  initialState,
  reducers: {
    fetchingMedia: (state, action) => {
      state.fetchingMedia = true;
      state.fetchingMediaError = null;
    },
    fetchMediaSuccess: (state, action) => {
      state.fetchingMedia = false;
      state.data.push(...action.payload);
    },
    fetchMediaFailed: (state, action) => {
      state.fetchingMedia = false;
      state.fetchingMediaError = action.payload;
    },
    addMedia: (state, action) => {
      state.data.push(action.payload);
    },
    deleteMedia: (state, action) => {
      state.data = state.data.filter((item) => item.id !== action.payload);
    },
    editMedia: (state, action) => {
      const editedItemIndex = state.data.findIndex(
        (item) => item.id === action.payload.id
      );
      state.data[editedItemIndex] = action.payload;
    },
    handlePage: (state, action) => {
      state.page = action.payload;
    },
    handleLastPage: (state, action) => {
      state.lastPage = action.payload;
    },
  },
});

// Define a thunk that dispatches those action creators
export const fetchMedia = (page) => async (dispatch) => {
  dispatch(fetchingMedia());
  axios
    .get(`/media/?page=${page}&per_page=10`)
    .then((res) => {
      if (!res.data) {
        dispatch(fetchMediaSuccess([]));
        return;
      }
      dispatch(fetchMediaSuccess(res.data.media));
      if (res.data.lastPage) {
        dispatch(handleLastPage(true));
      }
    })
    .catch((err) => {
      dispatch(fetchMediaFailed(err.response.data.msg));
      toast.error(err.response.data.msg);
    });
};

const { actions, reducer } = mediaSlice;

// Action creators are generated for each case reducer function
export const {
  fetchingMedia,
  fetchMediaSuccess,
  fetchMediaFailed,
  addMedia,
  deleteMedia,
  editMedia,
  handlePage,
  handleLastPage
} = actions;

export default reducer;
