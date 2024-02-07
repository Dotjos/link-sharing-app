import { configureStore } from '@reduxjs/toolkit'
import CounterReducer from './CounterReducer'
import LinkDetailsSlice from './LinkDetailsSlice'
import ProfileDetailsSlice from './ProfileDetailsSlice'



export const Store = configureStore({
    reducer:{
        clickCount:CounterReducer,
        LinkDetailsSlice:LinkDetailsSlice,
        ProfileDetailsSlice:ProfileDetailsSlice
    },middleware:(getDefaultMiddleware)=>getDefaultMiddleware({serializableCheck:false})
})
export default Store
