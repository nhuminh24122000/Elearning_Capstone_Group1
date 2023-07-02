import { createSlice } from '@reduxjs/toolkit'

const profile = localStorage.getItem('userProfile') ? JSON.parse(localStorage.getItem('userProfile')) : {}


const initialState = {
    userProfile: {},
}

const userReducer = createSlice({
    name: 'userReducer',
    initialState,
    reducers: {
        setUserProfile: (state, action) => {
            state.userProfile = action.payload
        },
        resetUserProfile: (state, action) => {
            state.userProfile = {}
        }
    }
});

export const { setUserProfile, resetUserProfile } = userReducer.actions

export default userReducer.reducer