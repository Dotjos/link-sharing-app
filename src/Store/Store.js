import { configureStore } from '@reduxjs/toolkit'
import CounterReducer from './CounterReducer'

export const Store = configureStore({
    reducer:{
        clickCount:CounterReducer
    }
})
export default Store
