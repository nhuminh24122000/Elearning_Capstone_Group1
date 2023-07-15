import { lazy, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomeTemplate from './templates/HomeTemplate/HomeTemplate'
import HomeAdminTemplate from './templates/HomeAdminTemplate/HomeAdminTemplate';
import UserManagement from './pages/Admin/User/UserManagement/UserManagement';
import UserAdd from './pages/Admin/User/UserAdd/UserAdd';
import UserUpdate from './pages/Admin/User/UserUpdate/UserUpdate';
import CourseManagement from './pages/Admin/Course/CourseManagement/CourseManagement';
import CourseAdd from './pages/Admin/Course/CourseAdd/CourseAdd';
import CourseUpdate from './pages/Admin/Course/CourseUpdate/CourseUpdate';

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
                <Route path='' element={<HomeTemplate alert={alert} />}>
                    <Route index element={<Home />} />
                    <Route path="/coursecategories"  >
                        <Route path=':categoriesId' element={<CourseCategories />} />
                    </Route>
                    <Route path="/coursedetail">
                        <Route path=':courseId' element={<CourseDetail />} />
                    </Route>
                    <Route path="/coursesearch" element={<CourseSearch />} />
                    <Route path="/signup" element={<SignUp showAlert={showAlert} />} />
                    <Route path="/signin" element={<SignIn showAlert={showAlert} />} />
                    <Route path="/userinfo" element={<UserInfo />} />
                    {/* <Route path="*" element={<NotFound />} /> */}
                </Route>
            </Routes>
            <Routes>
                <Route path='/admin' element={<HomeAdminTemplate />}>
                    <Route path='usermanagement' index element={<UserManagement />} />
                    <Route path='useradd' element={<UserAdd />} />
                    <Route path='userupdate'  >
                        <Route path=':id' element={<UserUpdate />}/>
                    </Route>

                    <Route path='coursemanagement' element={<CourseManagement />} />
                    <Route path='courseadd' element={<CourseAdd />} />
                    <Route path='courseupdate'  >
                        <Route path=':id' element={<CourseUpdate />}/>
                    </Route>

                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
