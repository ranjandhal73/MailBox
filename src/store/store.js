import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from '../features/authSlice'
import emailReducer from '../features/emailSlice'

const store = configureStore({
    reducer: {
        auth: AuthReducer,
        email: emailReducer,
    }
})

export default store;