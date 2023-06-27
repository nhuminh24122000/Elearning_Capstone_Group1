import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  courses: [],
  listCategori: [],
  listCourseCategory: [],
  detailCourse: {},
}

const courseReducer = createSlice({
  name: 'courseReducer',
  initialState,
  reducers: {
    getCourses: (state, action) => {
      state.courses = action.payload
    },
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

export const {getCourses, setListCategori, setListCourseCategory, setListDetailCourse } = courseReducer.actions;

export default courseReducer.reducer;
