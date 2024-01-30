import { createSlice } from "@reduxjs/toolkit";

export const counterSlice=createSlice({name:"AddClick",
initialState:{clickCount:[]},reducers:{
    increment:(state,action)=>{
        state.clickCount+=action.payload
    },
    removal:(state,action)=>{}
}})


export const {increment,removal}=counterSlice.actions
export default counterSlice.reducer

