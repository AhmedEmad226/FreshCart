import { configureStore } from "@reduxjs/toolkit";
import { brandsReducer } from "./brandsSlice";

export const store = configureStore({
  reducer:{
    brands:  brandsReducer
  }
})