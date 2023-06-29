import { createSlice } from '@reduxjs/toolkit'

const profile = localStorage.getItem('userProfile') ? JSON.parse(localStorage.getItem('userProfile')) : {}


const initialState = {
    userProfile: profile,
}

const userReducer = createSlice({
    name: 'userReducer',
    initialState,
    reducers: {
        setUserProfile: (state, action) => {
            state.userProfile = action.payload
        },
        
    }
});

export const { setUserProfile } = userReducer.actions

export default userReducer.reducer