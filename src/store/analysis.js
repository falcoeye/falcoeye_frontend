import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "../utility/api-instance";

const initialState = {
  data: null,
  isLoading: true,
  error: false,
};

export const analysisSlice = createSlice({
  name: "analysis",
  initialState,
  reducers: {
    fetchAnalysis(state, fetchedData) {
      state.data = fetchedData.payload;
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
  },
});

export const fetchAnalysisData = () => {
  return async (dispatch) => {
    dispatch(analysisActions.startLoading());

    const fetchData = async () => {
      const response = await axios.get("/analysis/");
      return response;
    };

    try {
      const responseData = await fetchData();
      dispatch(analysisActions.fetchAnalysis(responseData.data.analysis));
      dispatch(analysisActions.endLoading());
    } catch (err) {
      dispatch(analysisActions.noDataError());
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
      dispatch(analysisActions.endLoading());
    }
  };
};

export const analysisActions = analysisSlice.actions;
export default analysisSlice.reducer;
