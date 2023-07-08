import { configureStore } from "@reduxjs/toolkit";
import CourseReducer from './reducers/courseReducer';
import UserReducer from './reducers/userReducer';
import CourseAdminReducer from "./reducers/Admin/courseAdminReducer";
import UserAdminReducer from "./reducers/Admin/userAdminReducer";

export const store = configureStore({
  reducer: {
    CourseReducer: CourseReducer,
    UserReducer: UserReducer,
    CourseAdminReducer: CourseAdminReducer,
    UserAdminReducer: UserAdminReducer

  },
});