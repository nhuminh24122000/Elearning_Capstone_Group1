import React, { useEffect, useState } from 'react';
import './CourseManagement.scss';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { ACCESS_TOKEN, CYBERSOFT_TOKEN, GROUP_ID, defaultImage } from '../../../../constant';
import { useDispatch, useSelector } from 'react-redux';
import { setListCourseAdmin } from '../../../../redux/reducers/Admin/courseAdminReducer';
import './CourseManagement.scss'
import Paginate from '../../../../components/Paginate/Paginate';
import { getLocal } from '../../../../utils';
import Swal from 'sweetalert2'


function CourseManagement() {
    const dispatch = useDispatch();
    const { listCourseAdmin } = useSelector(state => state.CourseAdminReducer);

    const PAGE_SIZE = 20;
    const [pageCourse, setPageCourse] = useState(1)
    const [data, setData] = useState([]);


    // Handle Course ra giao diện
    const courseAdminAPI = async () => {
        try {
            const resp = await axios({
                method: 'get',
                url: `https://elearningnew.cybersoft.edu.vn/api/QuanLyKhoaHoc/LayDanhSachKhoaHoc?MaNhom=${GROUP_ID}`,
                headers: {
                    TokenCybersoft: `${CYBERSOFT_TOKEN}`
                }
            })
            dispatch(setListCourseAdmin(resp.data))

        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        courseAdminAPI()
    }, [pageCourse]);



    const handleCourse = () => {
        return data.map((item, index) => {
            return (
                <tr key={index}>
                    <td className='course-item'>{((pageCourse - 1) * PAGE_SIZE) + index + 1}</td>
                    <td className='course-item' style={{ width: 150 }}>{item.maKhoaHoc}</td>
                    <td className='course-item' style={{ width: 280 }}>{item.tenKhoaHoc}</td>
                    <td className='p-3'>
                        <img src={item.hinhAnh} style={{ width: 80, height: 60 }}
                            onError={(e) => e.target.src = defaultImage}
                        />
                    </td>
                    <td className='course-item'>{item.luotXem}</td>
                    <td className='course-item'>{item.nguoiTao.taiKhoan}</td>
                    <td>
                        <button className='btn-ghidanh' data-toggle="modal" data-target="#exampleModal" >
                            Ghi danh
                        </button>
                        <button className='btn-sua'>
                            <NavLink>Sửa</NavLink>
                        </button>
                        <button className='btn-xoa' onClick={() => deleteCourse(item.maKhoaHoc)}>Xóa</button>
                    </td>
                </tr>
            )
        })
    }

    // XÓa khóa học
    const deleteCourse = async (id) => {
        try {
            const resp = await axios({
                method: 'delete',
                url: `https://elearningnew.cybersoft.edu.vn/api/QuanLyKhoaHoc/XoaKhoaHoc?MaKhoaHoc=${encodeURIComponent(id)}`,
                headers: {
                    Authorization: `Bearer ${getLocal(ACCESS_TOKEN)}`,
                    TokenCybersoft: `${CYBERSOFT_TOKEN}`,
                }
            })
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Xóa khóa học thành công',
                showConfirmButton: false,
                timer: 1500
            })
            courseAdminAPI();
        } catch (err) {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: err.response.data,
                showConfirmButton: false,
                timer: 1500
            })
            console.log(err)
        }
    }

    // Phân Trang
    useEffect(() => {
        const newData = listCourseAdmin.slice((pageCourse - 1) * PAGE_SIZE, pageCourse * PAGE_SIZE);
        setData(newData)
    }, [listCourseAdmin, pageCourse])

    const handlePageClick = (event) => {
        setPageCourse(event.selected + 1)
    }


    return (
        <div className='container'>
            <div className='user-manage-title'>
                <h1 >
                    <NavLink to='/admin/courseadd'>Thêm Khóa Học </NavLink>
                </h1>
                <form className="d-flex my-lg-0">
                    <div className="search d-flex w-100 p-0 pl-4">
                        <button>
                            <i className="fa fa-search" />
                        </button>
                        <input className='w-100' name="searchText" type="search" placeholder="Nhập vào tài khoản hoặc họ tên người dùng" />
                    </div>
                    <button className='button-find'>Tìm</button>
                </form>
            </div>
            <table class="table">
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Mã khóa học</th>
                        <th>Tên khóa học</th>
                        <th>Hình ảnh</th>
                        <th>Lượt xem</th>
                        <th>Người Tạo</th>
                        <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    {handleCourse()}
                </tbody>
            </table>
            <div>
                <Paginate handlePageClick={handlePageClick} pageCount={Math.ceil(listCourseAdmin.length / PAGE_SIZE)}
                    forcePage={pageCourse - 1} />
            </div>



        </div>
    )
}

export default CourseManagement