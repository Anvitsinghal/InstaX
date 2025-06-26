import { createSlice } from "@reduxjs/toolkit";


const authslice= createSlice({
    name:"auth",
    initialState:{
        user:null,
        suggestedusers:[],
        userprofile:null,
        selecteduser:null
    },
    reducers:{
        setAuthUser:(state,action)=>{
            state.user=action.payload;
        },
        setsuggesteduser:(state,action)=>{
            state.suggestedusers=action.payload;
        },
        setuserprofile:(state,action)=>{
            state.userprofile=action.payload;
        }
        ,
        setselecteduser:(state,action)=>{
            state.selecteduser=action.payload;
        }
    }
});
export const {setAuthUser,setsuggesteduser,setuserprofile,setselecteduser}= authslice.actions;
export default authslice.reducer;