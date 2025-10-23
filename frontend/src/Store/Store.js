import { combineReducers, configureStore } from '@reduxjs/toolkit'
import LinkDetailsSlice from './LinkDetailsSlice'
import ProfileDetailsSlice from './ProfileDetailsSlice'
import AuthSlice from "./AuthSlice"

const allReducers=combineReducers({
    LinkDetailsSlice:LinkDetailsSlice,
    ProfileDetailsSlice:ProfileDetailsSlice,
    AuthSlice:AuthSlice 
})

export const Store = configureStore({
    reducer:allReducers
    ,middleware:(getDefaultMiddleware)=>getDefaultMiddleware({serializableCheck:false})
})

export default Store
