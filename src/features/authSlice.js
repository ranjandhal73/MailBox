import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: localStorage.getItem('token') || null,
    isLoggedIn: !!localStorage.getItem('token'),
    userData: []
}

const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        login: (state,action) =>{
            console.log(action.payload);
            state.token = action.payload;
            state.isLoggedIn = true;
            state.userData = {email:action.payload.email, userId: action.payload.localId}
            localStorage.setItem('token',action.payload);
        },

        logout: (state) =>{
            state.token = null;
            state.isLoggedIn = false;
            localStorage.removeItem('token')
            localStorage.removeItem('email')
        }
    }
})

export const {login, logout} = AuthSlice.actions;
export default AuthSlice.reducer;
