import { createSlice } from "@reduxjs/toolkit";
import axios from "../utility/api-instance";
import { toast } from "react-toastify";

const initialRegistery = { registry_key: null, type: null }

const initialState = {
  data: [],
  fetchingSources: false,
  fetchingSourcesError: null,
  page: 1,
  lastPage: false,
  registery: initialRegistery
};

const sourcesSlice = createSlice({
  name: "sources",
  initialState,
  reducers: {
    fetchingSources: (state, action) => {
      state.fetchingSources = true;
      state.fetchingSourcesError = null;
    },
    fetchSourcesSuccess: (state, action) => {
      state.fetchingSources = false;
      state.data.push(...action.payload);
    },
    fetchSourcesFailed: (state, action) => {
      state.fetchingSources = false;
      state.fetchingSourcesError = action.payload;
    },
    addRegistery: ( state,action ) => {
      state.registery = action.payload
    },
    resetRegistery: ( state,action ) => {
      state.registery = initialRegistery
    },
    addSource: (state, action) => {
      state.data.push(action.payload);
    },
    deleteSource: (state, action) => {
      state.data = state.data.filter((item) => item.id !== action.payload);
    },
    editSource: (state, action) => {
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
export const fetchSources = (page) => async (dispatch) => {
  dispatch(fetchingSources());
  axios
    .get(`/camera/?page=${page}&per_page=10`)
    .then((res) => {
      if (!res.data) {
        dispatch(fetchSourcesSuccess([]));
        return;
      }
      dispatch(fetchSourcesSuccess(res.data.camera));
      dispatch(addRegistery(res.data.registry.hasOwnProperty('registry_key') ? res.data.registry : initialRegistery))
      if (res.data.lastPage) {
        dispatch(handleLastPage(true));
      }
    })
    .catch((err) => {
      dispatch(fetchSourcesFailed(err.response.data.msg));
      toast.error(err.response.data.msg);
    });
};

const { actions, reducer } = sourcesSlice;

// Action creators are generated for each case reducer function
export const {
  fetchingSources,
  fetchSourcesSuccess,
  fetchSourcesFailed,
  addRegistery,
  resetRegistery,
  addSource,
  deleteSource,
  editSource,
  handlePage,
  handleLastPage,
} = actions;

export default reducer;
