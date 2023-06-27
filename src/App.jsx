import { lazy, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomeTemplate from './templates/HomeTemplate/HomeTemplate'

const Home = lazy(() => import('./pages/Home/Home'));
const CourseCategories = lazy(() => import('./pages/CourseCategories/CourseCategories'));
const CourseSearch = lazy(() => import('./pages/CourseSearch/CourseSearch'));
const CourseDetail = lazy(() => import('./pages/CourseDetail/CourseDetail'));
const SignUp = lazy(() => import('./pages/SignUp/SignUp'));
const SignIn = lazy(() => import('./pages/SignIn/SignIn'));
const UserInfo = lazy(() => import('./pages/UserInfo/UserInfo'));
const NotFound = lazy(() => import('./pages/NotFound/NotFound'));


function App() {
  const [alert, setAlert] = useState(null)
  const showAlert = (message, type) => {
    setAlert({
      message: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 1000)
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path='' element={<HomeTemplate alert={alert}/>}>
          <Route index element={<Home />} />
          <Route path="/coursecategories" element={<CourseCategories />} />
          <Route path="/coursedetail">
            <Route path=':courseId' element={<CourseDetail />} />
          </Route>
          <Route path="/coursesearch" element={<CourseSearch />} />
          <Route path="/signup" element={<SignUp showAlert={showAlert}/>} />
          <Route path="/signin" element={<SignIn showAlert={showAlert}/>} />
          <Route path="/userinfo" element={<UserInfo />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
