import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  listCategori: [],
  listCourseCategory: [],
  detailCourse: {},
}

const courseReducer = createSlice({
  name: 'courseReducer',
  initialState,
  reducers: {
    setListCategori: (state, action) => {
      state.listCategori = action.payload
    },
    setListCourseCategory: (state, action) => {
      state.listCourseCategory = action.payload
    },
    setListDetailCourse: (state, action) => {
      state.detailCourse = action.payload
    },
  }
});

export const {setListCategori,setListCourseCategory,setListDetailCourse} = courseReducer.actions

export default courseReducer.reducer