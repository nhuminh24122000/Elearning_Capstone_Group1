import { createSlice } from '@reduxjs/toolkit'
import { getLocal } from '../../../utils';

const listUserAdmin = getLocal('listUserAdmin') ? JSON.parse(localStorage.getItem('listUserAdmin')) : []

const initialState = {
    // listUserAdmin: [],
    listUserAdmin: listUserAdmin,
    listCourseNotRegister: [],
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
        setListCourseNotRegister: (state, action) => {
            state.listCourseNotRegister = action.payload
        },
    }
});

export const {setListUserAdmin,setListCourseNeedAuth,setListCourseCofirm, setListCourseNotRegister } = userAdminReducer.actions

export default userAdminReducer.reducer