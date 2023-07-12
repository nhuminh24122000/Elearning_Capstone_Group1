import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    listCourseAdmin: []
}

const courseAdminReducer = createSlice({
    name: 'courseAdminReducer',
    initialState,
    reducers: {
        setListCourseAdmin: (state, action) => {
            state.listCourseAdmin = action.payload
        }
    }
});

export const { setListCourseAdmin } = courseAdminReducer.actions

export default courseAdminReducer.reducer