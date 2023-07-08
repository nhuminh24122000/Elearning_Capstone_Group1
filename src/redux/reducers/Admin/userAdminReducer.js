import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    listUserAdmin: [],
}

const userAdminReducer = createSlice({
    name: 'userAdminReducer',
    initialState,
    reducers: {
        setListUserAdmin: (state, action) => {
            state.listUserAdmin = action.payload
        },
    }
});

export const {setListUserAdmin } = userAdminReducer.actions

export default userAdminReducer.reducer