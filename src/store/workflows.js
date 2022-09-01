import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "../utility/api-instance";

const initialState = {
  data: [],
  dataOrder: null,
  isLoading: true,
  dataType: null,
  inputSearch: null,
  page: 1,
  lastPage: false,
};

export const workflowsSlice = createSlice({
  name: "workflows",
  initialState,
  reducers: {
    fetchWorkflows(state, fetchedData) {
      state.data.push(...fetchedData.payload);
    },

    startLoading(state) {
      state.isLoading = true;
    },
    endLoading(state) {
      state.isLoading = false;
    },

    changeInputSearch(state, action) {
      state.inputSearch = action.payload;
      if (state.inputSearch) {
        state.data = state.data.filter((item) => {
          return item.name
            .toLowerCase()
            .includes(state.inputSearch.toLowerCase());
        });
      } else {
      }
    },
    deleteWorkflow: (state, action) => {
      state.data = state.data.filter((item) => item.id !== action.payload);
    },
    handlePage(state, action) {
      state.page = action.payload;
    },
    handleLastPage(state, action) {
      state.lastPage = action.payload;
    },
  },
});

export const fetchWorkflowsData = (page) => {
  return async (dispatch) => {
    dispatch(startLoading());

    const fetchData = async () => {
      const response = await axios.get(`/workflow/?page=${page}&per_page=10`);
      return response;
    };

    try {
      const responseData = await fetchData();
      dispatch(fetchWorkflows(responseData.data.workflow));
      if (responseData.data.lastPage) {
        dispatch(handleLastPage(true));
      }
      dispatch(endLoading());
    } catch (err) {
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
  startLoading,
  fetchWorkflows,
  endLoading,
  deleteWorkflow,
  handlePage,
  handleLastPage,
} = workflowsSlice.actions;
export default workflowsSlice.reducer;
