import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from '../features/authSlice'

const store = configureStore({
    reducer: {
        auth: AuthReducer,
    }
})

export default store;