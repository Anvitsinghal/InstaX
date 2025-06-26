

import { createSlice } from "@reduxjs/toolkit";
const socketslice=createSlice({
    name:"socketio",
    initialState:{
        socket:null
    },
    reducers:{
        setsocket:(state,action)=>{
            state.socket=action.payload;
        }
    }
})
export const {setsocket}=socketslice.actions;
export default socketslice.reducer;