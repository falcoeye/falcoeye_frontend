import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "../utility/api-instance";

const initialState = {
  data: [],
  isLoading: true,
  error: false,
  AnalysisData: null,
  page: 1,
  lastPage: false,
};

export const analysisSlice = createSlice({
  name: "analysis",
  initialState,
  reducers: {
    fetchAnalysis(state, fetchedData) {
      state.data.push(...fetchedData.payload);
    },
    startLoading(state) {
      state.isLoading = true;
    },
    endLoading(state) {
      state.isLoading = false;
    },
    noDataError(state) {
      state.error = true;
    },
    deleteAnalysis: (state, action) => {
      state.data = state.data.filter((item) => item.id !== action.payload);
    },
    getAnalysisData(state, fetchedData) {
      state.AnalysisData = fetchedData.payload;
    },
    addAnalysis: (state, action) => {
      state.data.push(action.payload);
    },
    handlePage(state, action) {
      state.page = action.payload;
    },
    handleLastPage(state, action) {
      state.lastPage = action.payload;
    },
  },
});

export const fetchAnalysisData = (page) => {
  return async (dispatch) => {
    dispatch(startLoading());

    const fetchData = async () => {
      const response = await axios.get(`/analysis/?page=${page}&per_page=10`);
      return response;
    };

    try {
      const responseData = await fetchData();
      dispatch(fetchAnalysis(responseData.data.analysis));
      if (responseData.data.lastPage) {
        dispatch(handleLastPage(true));
      }
      dispatch(endLoading());
    } catch (err) {
      dispatch(noDataError());
      const errorMessage = err.response.data.msg || err.response.data.message;
      toast.error(errorMessage || "Something went wrong!", {
        position: "bottom-center",
        autoClose: 4000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
      dispatch(endLoading());
    }
  };
};

export const getOneAnalysisData = (id) => {
  return async (dispatch) => {
    dispatch(startLoading());

    const fetchData = async () => {
      const response = await axios.get(`/analysis/${id}`);
      return response;
    };

    try {
      const responseData = await fetchData();
      dispatch(getAnalysisData(responseData.data.analysis));
      dispatch(endLoading());
    } catch (err) {
      dispatch(noDataError());
      const errorMessage = err.response.data.msg || err.response.data.message;
      toast.error(errorMessage || "Something went wrong!", {
        position: "bottom-center",
        autoClose: 4000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
      dispatch(endLoading());
    }
  };
};

export const {
  addAnalysis,
  startLoading,
  endLoading,
  noDataError,
  fetchAnalysis,
  getAnalysisData,
  deleteAnalysis,
  handlePage,
  handleLastPage,
} = analysisSlice.actions;
export default analysisSlice.reducer;
