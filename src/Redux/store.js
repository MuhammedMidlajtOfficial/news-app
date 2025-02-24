import { configureStore } from "@reduxjs/toolkit";
import newsReducer from "./slice";

const store = configureStore({
  reducer : newsReducer
})

export default store;