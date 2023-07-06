import { createSlice } from '@reduxjs/toolkit'
import { getLocal } from '../../utils';

const profile = localStorage.getItem('userProfile') ? getLocal('userProfile') : {}


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
        resetUserProfile: (state, action) => {
            state.userProfile = {}
        }
    }
});

export const { setUserProfile, resetUserProfile } = userReducer.actions

export default userReducer.reducer