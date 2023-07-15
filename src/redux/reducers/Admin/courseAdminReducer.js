import { createSlice } from '@reduxjs/toolkit'
import { getLocal } from '../../../utils';

const listCourseAdmin = getLocal('listCourseAdmin') ? JSON.parse(localStorage.getItem('listCourseAdmin')) : []

const initialState = {
    listCourseAdmin: listCourseAdmin,
    listUserNeedRegister: [],
    listUserCofirm: [],
    listUserNotRegister: [],

}

const courseAdminReducer = createSlice({
    name: 'courseAdminReducer',
    initialState,
    reducers: {
        setListCourseAdmin: (state, action) => {
            state.listCourseAdmin = action.payload
        },
        setListUserNeedRegister: (state, action) => {
            state.listUserNeedRegister = action.payload
        },
        setListUserCofirm: (state, action) => {
            state.listUserCofirm = action.payload
        },
        setListNotRegister: (state, action) => {
            state.listUserNotRegister = action.payload
        },
    }
});

export const { setListCourseAdmin, setListUserNeedRegister, setListUserCofirm, setListNotRegister } = courseAdminReducer.actions

export default courseAdminReducer.reducer