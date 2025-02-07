import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const getBrands = createAsyncThunk('brandsSlice/getBrands', async()=>{
  let {data} = await axios.get('https://ecommerce.routemisr.com/api/v1/brands')
  return data.data
})


export const brandsSlice = createSlice({
  name: 'brandsSlice',
  initialState: {isLoading: false, brands:[], error:null},
  reducers:{},
  extraReducers:(builder)=>{
    builder.addCase(getBrands.pending, (state, action)=>{
      state.isLoading = true
    }),
    builder.addCase(getBrands.fulfilled, (state, action)=>{
      state.isLoading = false
      state.brands = action.payload
    }),
    builder.addCase(getBrands.rejected, (state, action)=>{
      state.isLoading = false
      state.error = action.error
    })
  }
})

export const brandsReducer = brandsSlice.reducer