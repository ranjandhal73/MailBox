import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    received: [],
    send: [],
    unread: 0,
    email: localStorage.getItem('email')?.replace(/[@.]/g,'') || '',
}

const emailSlice = createSlice({
    name: 'email',
    initialState,
    reducers: {
        receivedEmail: (state, action) =>{
            state.received = action.payload;
        },
        sendEmail: (state,action) =>{
            state.send = action.payload;
        },
        unreadEmail: (state, action) =>{
            state.unread = action.payload;
        }
    }
})

export const {receivedEmail, sendEmail, unreadEmail} = emailSlice.actions;
export default emailSlice.reducer;