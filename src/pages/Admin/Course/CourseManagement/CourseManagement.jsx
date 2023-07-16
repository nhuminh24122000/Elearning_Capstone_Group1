import React, { useEffect, useState } from 'react';
import './CourseManagement.scss';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { ACCESS_TOKEN, CYBERSOFT_TOKEN, GROUP_ID, defaultImage } from '../../../../constant';
import { useDispatch, useSelector } from 'react-redux';
import { setListCourseAdmin, setListNotRegister, setListUserCofirm, setListUserNeedRegister } from '../../../../redux/reducers/Admin/courseAdminReducer';
import './CourseManagement.scss'
import Paginate from '../../../../components/Paginate/Paginate';
import { getLocal, saveLocal } from '../../../../utils';
import Swal from 'sweetalert2'
import PopupCourse from '../../../../components/Admin/PopupCourse/PopupCourse';


function CourseManagement() {
    const dispatch = useDispatch();
    const { listCourseAdmin } = useSelector(state => state.CourseAdminReducer);
    const [selectedMaKhoaHoc, setSelectedMaKhoaHoc] = useState(null);


    const PAGE_SIZE = 20;
    const [pageCourse, setPageCourse] = useState(1)
    const [data, setData] = useState([]);

    const [showPopup, setShowPopup] = useState(false);

    const [key, setKey] = useState('');
    const [listSearch, setListSearch] = useState([]);
    const [pageSearch, setPageSearch] = useState(1)
    const [dataSearch, setDataSearch] = useState([]);




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
            saveLocal('listCourseAdmin', resp.data)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        courseAdminAPI()
    }, [pageCourse]);

    const handleCourse = () => {
        const list = dataSearch.length > 0 ? dataSearch : data

        return list.map((item, index) => {
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
                        <button className='btn-ghidanh' data-toggle="modal" data-target="#exampleModal" onClick={() => handlePopupOpen(item.maKhoaHoc)}>
                            Ghi danh
                        </button>
                        <button className='btn-sua'>
                            <NavLink to={`/admin/courseupdate/${encodeURIComponent(item.maKhoaHoc)}`}>Sửa</NavLink>
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
            setListSearch(listSearch.filter(item => item.maKhoaHoc !== id))
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
        setData(newData);

        const newDataSearch = listSearch.slice((pageSearch - 1) * PAGE_SIZE, pageCourse * PAGE_SIZE)
        setDataSearch(newDataSearch)
    }, [listCourseAdmin, pageCourse, listSearch, pageSearch])

    const handlePageClick = (event) => {
        setPageCourse(event.selected + 1)
        setPageSearch(event.selected + 1)
    }

    const handlePopupOpen = (id) => {
        setSelectedMaKhoaHoc(id)
        setShowPopup(true);
        stuNotRegister(id);
        stuNeedCofirm(id);
        stuCofirm(id);
    }

    // Handle học viên cần xác thực và khóa học đã xác thực ra giao diện
    const stuNotRegister = async (id) => {
        try {
            const resp = await axios({
                method: 'post',
                url: 'https://elearningnew.cybersoft.edu.vn/api/QuanLyNguoiDung/LayDanhSachNguoiDungChuaGhiDanh',
                data: {
                    "maKhoaHoc": id
                },
                headers: {
                    Authorization: `Bearer ${getLocal(ACCESS_TOKEN)}`,
                    TokenCybersoft: `${CYBERSOFT_TOKEN}`,
                }
            })
            dispatch(setListNotRegister(resp.data))
        } catch (err) {
            console.log(err)
        }
    }

    const stuNeedCofirm = async (id) => {
        try {
            const resp = await axios({
                method: 'post',
                url: 'https://elearningnew.cybersoft.edu.vn/api/QuanLyNguoiDung/LayDanhSachHocVienChoXetDuyet',
                data: {
                    "maKhoaHoc": id
                },
                headers: {
                    Authorization: `Bearer ${getLocal(ACCESS_TOKEN)}`,
                    TokenCybersoft: `${CYBERSOFT_TOKEN}`,
                }
            })
            dispatch(setListUserNeedRegister(resp.data))
        } catch (err) {
            console.log(err)
        }
    }

    const stuCofirm = async (id) => {
        try {
            const resp = await axios({
                method: 'post',
                url: 'https://elearningnew.cybersoft.edu.vn/api/QuanLyNguoiDung/LayDanhSachHocVienKhoaHoc',
                data: {
                    "maKhoaHoc": id
                },
                headers: {
                    Authorization: `Bearer ${getLocal(ACCESS_TOKEN)}`,
                    TokenCybersoft: `${CYBERSOFT_TOKEN}`,
                }
            })
            dispatch(setListUserCofirm(resp.data))
        } catch (err) {
            console.log(err)
        }

    }

    // Tìm kiếm khóa học
    const handleChangeKey = (e) => {
        setKey(e.target.value)
    }

    const handleSearchCourse = async (e) => {
        e.preventDefault()

        try {
            const resp = await axios({
                method: 'get',
                url: `https://elearningnew.cybersoft.edu.vn/api/QuanLyKhoaHoc/LayDanhSachKhoaHoc?tenKhoaHoc=${key}&MaNhom=${GROUP_ID}`,
                headers: {
                    TokenCybersoft: `${CYBERSOFT_TOKEN}`
                }
            })
            setListSearch(resp.data)
            setPageCourse(1)
            setPageSearch(1)
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


    return (
        <div className='container'>
            <div className='user-manage-title'>
                <h1 >
                    <NavLink to='/admin/courseadd'>Thêm Khóa Học </NavLink>
                </h1>
                <form className="d-flex my-lg-0" onSubmit={handleSearchCourse}>
                    <div className="search d-flex w-100 p-0 pl-4">
                        <button>
                            <i className="fa fa-search" />
                        </button>
                        <input style={{padding: '1rem'}} onChange={handleChangeKey} className='w-100' name="searchText" type="search" placeholder="Nhập vào tên khóa học cần tìm" />
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
                <Paginate
                    handlePageClick={handlePageClick}
                    pageCount={Math.ceil((listSearch.length > 0 ? listSearch : listCourseAdmin).length / PAGE_SIZE)}
                    forcePage={pageCourse - 1}
                />
            </div>


            {showPopup && <PopupCourse maKhoaHoc={selectedMaKhoaHoc} stuNeedCofirm={stuNeedCofirm} stuCofirm={stuCofirm} />}
        </div>
    )
}

export default CourseManagement