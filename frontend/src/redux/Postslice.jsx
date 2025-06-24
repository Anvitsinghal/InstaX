import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "post",
  initialState: {
    posts: [],
    selectedposts:null,
  },
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    setselectedposts:(state,action)=>{
      state.selectedposts=action.payload;
    }
  },
});

// Export action
export const { setPosts,setselectedposts } = postSlice.actions;


export default postSlice.reducer;
