import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  news : [],
  status: "idle", // idle, loading, succeeded, failed
  error: null,
}

const newSlice = createSlice({
  name : "news",
  initialState,
  reducers: {
    setNews : (state, action)=>{
      state.news = action.payload;
      state.status = "succeeded";
    },
    setLoading: (state) => {
      state.status = "loading";
    },
    setError : (state, action) => {
      state.status = "failed";
      state.error = action.payload
    },
  }
})

export const { setNews, setLoading, setError } = newSlice.actions
export default newSlice.reducer