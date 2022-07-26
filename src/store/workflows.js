import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "../utility/api-instance";

const initialState = {
  data: null,
  dataOrder: null,
  isLoading: true,
  dataType: null,
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

    OrderingData(state, action) {
      state.dataOrder = action.payload;

      if (
        action.payload === "a-z" &&
        (!state.dataType || state.dataType === "Title")
      ) {
        state.data = state.data.sort((a, b) => a.name.localeCompare(b.name));
      }
      if (
        action.payload === "z-a" &&
        (!state.dataType || state.dataType === "Title")
      ) {
        state.data = state.data.sort((a, b) => b.name.localeCompare(a.name));
      }

      if (action.payload === "a-z" && state.dataType === "Creator") {
        state.data = state.data.sort((a, b) =>
          a.creator.localeCompare(b.creator)
        );
      }
      if (action.payload === "z-a" && state.dataType === "Creator") {
        state.data = state.data.sort((a, b) =>
          b.creator.localeCompare(a.creator)
        );
      }

      if (action.payload === "oldest" && state.dataType === "Date") {
        state.data = state.data.sort(
          (a, b) => new Date(a.publish_date) - new Date(b.publish_date)
        );
      }
      if (action.payload === "newest" && state.dataType === "Date") {
        state.data = state.data.sort(
          (a, b) => new Date(b.publish_date) - new Date(a.publish_date)
        );
      }
    },
    OrderingDataType(state, action) {
      if (action.payload !== state.dataType) {
        state.dataOrder = "";
      }
      state.dataType = action.payload;

      if (!state.dataOrder) return;

      if (
        (action.payload === "Title" || !state.dataType) &&
        state.dataOrder === "a-z"
      ) {
        state.data = state.data.sort((a, b) => a.name.localeCompare(b.name));
      }
      if (
        (action.payload === "Title" || !state.dataType) &&
        state.dataOrder === "z-a"
      ) {
        state.data = state.data.sort((a, b) => b.name.localeCompare(a.name));
      }

      if (action.payload === "Creator" && state.dataOrder === "a-z") {
        state.data = state.data.sort((a, b) =>
          a.creator.localeCompare(b.creator)
        );
      }
      if (action.payload === "Creator" && state.dataOrder === "z-a") {
        state.data = state.data.sort((a, b) =>
          b.creator.localeCompare(a.creator)
        );
      }

      if (action.payload === "Date" && state.dataOrder === "oldest") {
        state.data = state.data.sort(
          (a, b) => new Date(a.publish_date) - new Date(b.publish_date)
        );
      }
      if (action.payload === "Date" && state.dataOrder === "newest") {
        state.data = state.data.sort(
          (a, b) => new Date(b.publish_date) - new Date(a.publish_date)
        );
      }
    },
  },
});

export const fetchWorkflowsData = () => {
  return async (dispatch) => {
    dispatch(workflowsActions.startLoading());

    const fetchData = async () => {
      const response = await axios.get("/workflow/");
      return response;
    };

    try {
      const responseData = await fetchData();
      dispatch(workflowsActions.fetchWorkflows(responseData.data.workflow));
      dispatch(workflowsActions.endLoading());
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
      dispatch(workflowsActions.endLoading());
    }
  };
};

export const workflowsActions = workflowsSlice.actions;
export default workflowsSlice.reducer;
