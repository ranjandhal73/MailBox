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
            state.received = action.payload
        },
        sendEmail: (state,action) =>{
            state.send = action.payload;
        },
        unreadEmail: (state, action) =>{
            state.unread = action.payload;
        },
        // markEmailAsRead: (state, action) =>{
        //     const emailId = action.payload;
        //     const email = state.received.find(email => email.id === emailId);
        //     if(email){
        //         email.read = true;
        //         const storedReadStatus = JSON.parse(localStorage.getItem('readEmail')) || {};
        //         storedReadStatus[emailId] = true;
        //         localStorage.setItem('readEmails',JSON.stringify(storedReadStatus));
        //     }
        // }
    }
})

export const {receivedEmail, sendEmail, unreadEmail, markEmailAsRead} = emailSlice.actions;
export default emailSlice.reducer;