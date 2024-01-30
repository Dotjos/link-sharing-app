import { configureStore } from '@reduxjs/toolkit'
import CounterReducer from './CounterReducer'
import LinkDetailsSlice from './LinkDetailsSlice'

export const Store = configureStore({
    reducer:{
        clickCount:CounterReducer,
        LinkDetailsSlice:LinkDetailsSlice
    }
})
export default Store
