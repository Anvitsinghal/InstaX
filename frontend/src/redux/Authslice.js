import { createSlice } from "@reduxjs/toolkit";


const authslice= createSlice({
    name:"auth",
    initialState:{
        user:null
    },
    reducers:{
        setAuthUser:(state,action)=>{
            state.user=action.payload;
        }
    }
});
export const {setAuthUser}= authslice.actions;
export default authslice.reducer;