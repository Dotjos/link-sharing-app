import { combineReducers, configureStore } from '@reduxjs/toolkit'
import LinkDetailsSlice from './LinkDetailsSlice'
import ProfileDetailsSlice from './ProfileDetailsSlice'
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

const persistConfig={
    key:"root",storage
}
const allReducers=combineReducers({
    LinkDetailsSlice:LinkDetailsSlice,
        ProfileDetailsSlice:ProfileDetailsSlice
})

const persistedReducer=persistReducer(persistConfig,allReducers)

export const Store = configureStore({
    reducer:persistedReducer
    ,middleware:(getDefaultMiddleware)=>getDefaultMiddleware({serializableCheck:false})
})

export const persistor= persistStore(Store)

export default Store
