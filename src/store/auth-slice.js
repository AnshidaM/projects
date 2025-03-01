import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    email: "",
    password:"",
    signedIn: false,
  },
  
 
 
  reducers: {
   
    // },
    handleChange: (state, action) => {
      state[action.payload.name] = action.payload.value; // Updates email/password dynamically
    },
    setSignIn(state){
      state.signedIn=true
    },
    setSignOut(state){
      state.signedIn=false
      state.email=""
      state.password=""
    },
    
  },
});
export const authActions = authSlice.actions;

export default authSlice;
