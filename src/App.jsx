import { lazy } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomeTemplate from './templates/HomeTemplate/HomeTemplate'

const Home = lazy(() => import('./pages/Home/Home'));
const CourseCategories = lazy(() => import('./pages/CourseCategories/CourseCategories'));
const CourseSearch = lazy(() => import('./pages/CourseSearch/CourseSearch'));
const CourseDetail = lazy(() => import('./pages/CourseDetail/CourseDetail'));
const SignUp = lazy(() => import('./pages/SignUp/SingUp'));
const SignIn = lazy(() => import('./pages/SignIn/SignIn'));
const UserInfo = lazy(() => import('./pages/UserInfo/UserInfo'));
const NotFound = lazy(() => import('./pages/NotFound/NotFound'));


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='' element={<HomeTemplate />}>
          <Route index element={<Home />} />
          <Route path="/coursecategories"  >
            <Route path=':categoriesId' element={<CourseCategories />} />
          </Route>
          <Route path="/coursedetail">
            <Route path=':courseId' element={<CourseDetail />} />
          </Route>
          <Route path="/coursesearch" element={<CourseSearch />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/userinfo" element={<UserInfo />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
