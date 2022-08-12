import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "../utility/api-instance";

const initialState = {
  data: null,
  dataOrder: null,
  isLoading: true,
  dataType: null,
  inputSearch: null,
};

export const workflowsSlice = createSlice({
  name: "workflows",
  initialState,
  reducers: {
    fetchWorkflows(state, fetchedData) {
      state.data = fetchedData.payload;
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
          console.log(item.name);
          return item.name
            .toLowerCase()
            .includes(state.inputSearch.toLowerCase());
        });
      } else {
      }
    },
    deleteWorkflow: (state, action) => {
      state.data = state.data.filter( item => item.id !== action.payload )
    },
  },
});

export const fetchWorkflowsData = () => {
  return async (dispatch) => {
    dispatch(startLoading());

    const fetchData = async () => {
      const response = await axios.get("/workflow/");
      return response;
    };

    try {
      const responseData = await fetchData();
      dispatch(fetchWorkflows(responseData.data.workflow));
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

export const {startLoading,  fetchWorkflows, endLoading, deleteWorkflow } = workflowsSlice.actions;
export default workflowsSlice.reducer;
