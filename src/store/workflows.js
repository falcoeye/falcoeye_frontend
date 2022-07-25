import { createSlice } from "@reduxjs/toolkit";
// import fish from "../images/fish3.jpeg";
// const cardList = [
//   {
//     id: 1,
//     img: fish,
//     title:
//       "wenet: production orineted streaming and non-streaming End-to-End Speech Recognition Toolkit",
//     name: "rifat bin jahan1",
//     date: "20 dec 2021",
//     desc: "lorem ipsum dolar sit amet lorem ipsum dolar sit amet  lorem ipsum dolar sit amet lorem ipsum dolar sit amet lorem ipsum dolar sit amet lorem ipsum dolar sit amet lorem ipsum dolar sit amet lorem ipsum dolar sit amet lorem ipsum dolar sit amet ",
//   },
//   {
//     id: 2,
//     img: fish,
//     title:
//       "wenet: production orineted streaming and non-streaming End-to-End Speech Recognition Toolkit",
//     name: "rifat bin jahan2",
//     date: "20 dec 2021",
//     desc: "lorem ipsum dolar sit amet lorem ipsum dolar sit amet  lorem ipsum dolar sit amet lorem ipsum dolar sit amet lorem ipsum dolar sit amet lorem ipsum dolar sit amet lorem ipsum dolar sit amet lorem ipsum dolar sit amet lorem ipsum dolar sit amet ",
//   },
//   {
//     id: 3,
//     img: fish,
//     title:
//       "wenet: production orineted streaming and non-streaming End-to-End Speech Recognition Toolkit",
//     name: "rifat bin jahan3",
//     date: "20 dec 2021",
//     desc: "lorem ipsum dolar sit amet lorem ipsum dolar sit amet  lorem ipsum dolar sit amet lorem ipsum dolar sit amet lorem ipsum dolar sit amet lorem ipsum dolar sit amet lorem ipsum dolar sit amet lorem ipsum dolar sit amet lorem ipsum dolar sit amet ",
//   },
//   {
//     id: 4,
//     img: fish,
//     title:
//       "wenet: production orineted streaming and non-streaming End-to-End Speech Recognition Toolkit",
//     name: "rifat bin jahan4",
//     date: "20 dec 2021",
//     desc: "lorem ipsum dolar sit amet lorem ipsum dolar sit amet  lorem ipsum dolar sit amet lorem ipsum dolar sit amet lorem ipsum dolar sit amet lorem ipsum dolar sit amet lorem ipsum dolar sit amet lorem ipsum dolar sit amet lorem ipsum dolar sit amet ",
//   },
//   {
//     id: 5,
//     img: fish,
//     title:
//       "wenet: production orineted streaming and non-streaming End-to-End Speech Recognition Toolkit",
//     name: "rifat bin jahan5",
//     date: "20 dec 2021",
//     desc: "lorem ipsum dolar sit amet lorem ipsum dolar sit amet  lorem ipsum dolar sit amet lorem ipsum dolar sit amet lorem ipsum dolar sit amet lorem ipsum dolar sit amet lorem ipsum dolar sit amet lorem ipsum dolar sit amet lorem ipsum dolar sit amet ",
//   },
//   {
//     id: 6,
//     img: fish,
//     title:
//       "wenet: production orineted streaming and non-streaming End-to-End Speech Recognition Toolkit",
//     name: "rifat bin jahan6",
//     date: "20 dec 2021",
//     desc: "lorem ipsum dolar sit amet lorem ipsum dolar sit amet  lorem ipsum dolar sit amet lorem ipsum dolar sit amet lorem ipsum dolar sit amet lorem ipsum dolar sit amet lorem ipsum dolar sit amet lorem ipsum dolar sit amet lorem ipsum dolar sit amet ",
//   },
// ];

const initialState = { data: [] };

export const workflowsSlice = createSlice({
  name: "workflows",
  initialState,
  reducers: {
    fetchworkflows(state, fetchedData) {
      state.data = fetchedData.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const workflowsActions = workflowsSlice.actions;

export default workflowsSlice.reducer;
