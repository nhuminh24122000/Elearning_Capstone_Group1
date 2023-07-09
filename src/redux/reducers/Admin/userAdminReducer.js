import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    listUserAdmin: [],
    listCourseNeedAuth: [],
    listCourseCofirm: [],
}

const userAdminReducer = createSlice({
    name: 'userAdminReducer',
    initialState,
    reducers: {
        setListUserAdmin: (state, action) => {
            state.listUserAdmin = action.payload
        },
        setListCourseNeedAuth: (state, action) => {
            state.listCourseNeedAuth = action.payload
        },
        setListCourseCofirm: (state, action) => {
            state.listCourseCofirm = action.payload
        },
    }
});

export const {setListUserAdmin,setListCourseNeedAuth,setListCourseCofirm } = userAdminReducer.actions

export default userAdminReducer.reducer