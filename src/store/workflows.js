import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "../utility/api-instance";

const initialState = { data: null, selectOrder: null };

export const workflowsSlice = createSlice({
  name: "workflows",
  initialState,
  reducers: {
    fetchWorkflows(state, fetchedData) {
      state.data = fetchedData.payload;
    },

    OrderingData(state, action) {
      state.selectOrder = action.payload;
      if (action.payload === "a-z") {
        state.data = state.data.sort((a, b) => a.name.localeCompare(b.name));
      } else {
        state.data = state.data.sort((a, b) => b.name.localeCompare(a.name));
      }
    },
  },
});

export const fetchWorkflowsData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await axios.get("/workflow/");
      return response;
    };

    try {
      const responseData = await fetchData();
      dispatch(workflowsActions.fetchWorkflows(responseData.data.workflow));
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
    }
  };
};

export const workflowsActions = workflowsSlice.actions;
export default workflowsSlice.reducer;
