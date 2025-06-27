import { createSlice } from "@reduxjs/toolkit";


const chatslice=createSlice({
    name:"chat",
    initialState:{
        onlineusers:[],
        messages:[]
    },
    reducers:{
        setonlineusers:(state,action)=>{
            state.onlineusers=action.payload;
        },
        setmessages:(state,action)=>{
            state.messages=action.payload
        }
    }
})
export const {setonlineusers,setmessages}=chatslice.actions;
export default chatslice.reducer;