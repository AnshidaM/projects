import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    notification: null,
    // signedIn:true,
  },
  
  todosLoadingStatus: "",
  loadingStatus: null,
  reducers: {
   
    // },
    // setSignIn(state){
    //   state.signedIn=true
    // },
    // setSignOut(state){
    //   state.signedIn=false
    // },
    setTodosLoadingStatus(state, action) {
      state.todosLoadingStatus = action.payload;
    },
    setStatus(state, action) {
      state.loadingStatus = action.payload;
    },
    clearStatus: (state) => {
      state.loadingStatus = ""; // Reset to empty
    },
  },
});
export const uiActions = uiSlice.actions;

export default uiSlice;
