import React, { useEffect, useState } from 'react';
import './UserManagement.scss';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { ACCESS_TOKEN, CYBERSOFT_TOKEN, GROUP_ID } from '../../../../constant';
import { useDispatch, useSelector } from 'react-redux';
import { setListCourseCofirm, setListCourseNeedAuth, setListCourseNotRegister, setListUserAdmin } from '../../../../redux/reducers/Admin/userAdminReducer';
import Paginate from '../../../../components/Paginate/Paginate';
import { getLocal, saveLocal } from '../../../../utils';
import Swal from 'sweetalert2'
import PopupUser from '../../../../components/Admin/PopupUser/PopupUser';

function UserManagement() {
    const dispatch = useDispatch();
    const { listUserAdmin } = useSelector(state => state.UserAdminReducer);
    const [selectedTaiKhoan, setSelectedTaiKhoan] = useState(null);

    const PAGE_SIZE = 20;
    const [pageUser, setPageUser] = useState(1)
    const [data, setData] = useState([]);
    const [showPopup, setShowPopup] = useState(false);


    // Handle User ra giao diện
    const userAdminAPI = async () => {
        try {
            const resp = await axios({
                method: 'get',
                url: `https://elearningnew.cybersoft.edu.vn/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${GROUP_ID}`,
                headers: {
                    TokenCybersoft: `${CYBERSOFT_TOKEN}`
                }
            })
            dispatch(setListUserAdmin(resp.data))
            saveLocal('listUserAdmin', resp.data)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        userAdminAPI()
    }, [pageUser]);

    useEffect(() => {
        let newData = listUserAdmin.slice((pageUser - 1) * PAGE_SIZE, pageUser * PAGE_SIZE);
        setData(newData);
    }, [listUserAdmin, pageUser]);

    const handlePageClick = (event) => {
        setPageUser(event.selected + 1)
    }

    const handleUser = () => {
        return data.map((item, index) => {
            return (
                <tr key={index}>
                    <td>{((pageUser - 1) * PAGE_SIZE) + index + 1}</td>
                    <td>{item.taiKhoan}</td>
                    <td>{item.hoTen}</td>
                    <td>{item.email}</td>
                    <td>{item.soDT || item.soDt}</td>
                    <td className='buttons'>
                        <button className='btn-ghidanh' data-toggle="modal" data-target="#exampleModal" onClick={()=>handlePopupOpen(item.taiKhoan)}>
                            Ghi danh
                        </button>
                        <button className='btn-sua'>
                            <NavLink to={`/admin/userupdate/${item.taiKhoan}`}>Sửa</NavLink>
                        </button>
                        <button className='btn-xoa' onClick={() => deleteUser(item.taiKhoan)}>Xóa</button>
                    </td>
                </tr>
            )
        })
    }

    // Xóa Người dùng
    const deleteUser = async (id) => {
        try {
            const resp = await axios({
                method: 'delete',
                url: `https://elearningnew.cybersoft.edu.vn/api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${id}`,
                headers: {
                    Authorization: `Bearer ${getLocal(ACCESS_TOKEN)}`,
                    TokenCybersoft: `${CYBERSOFT_TOKEN}`,
                }

            })
            console.log('resp', resp)
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Xóa thành công',
                showConfirmButton: false,
                timer: 1500
            })
            userAdminAPI()
        } catch (err) {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Người dùng này đã tạo khóa học không thể xóa',
                showConfirmButton: true,
                timer: 1500
            })
            console.log(err)
        }
    }

    const handlePopupOpen = (id) => {
        setShowPopup(true)
        courseNotRegister(id);
        courseNeedAuth(id)
        courseCofirm(id)
        setSelectedTaiKhoan(id)
    }

    // Handle khóa học cần xác thực và khóa học đã xác thực ra giao diện
    const courseNotRegister = async (id) => {
        try{
            const resp = await axios ({
                method: 'post',
                url: `https://elearningnew.cybersoft.edu.vn/api/QuanLyNguoiDung/LayDanhSachKhoaHocChuaGhiDanh?TaiKhoan=${id}`,
                headers: {
					Authorization: `Bearer ${getLocal(ACCESS_TOKEN)}`,
					TokenCybersoft: `${CYBERSOFT_TOKEN}`,
				}
            })
            dispatch(setListCourseNotRegister(resp.data))
        }catch(err) {
            console.log(err)
        }
    }

    const courseNeedAuth = async (id) => {
        try {
			const resp = await axios({
				method: 'post',
				url: 'https://elearningnew.cybersoft.edu.vn/api/QuanLyNguoiDung/LayDanhSachKhoaHocChoXetDuyet',
				data: {
					"taiKhoan": id
				},
				headers: {
					Authorization: `Bearer ${getLocal(ACCESS_TOKEN)}`,
					TokenCybersoft: `${CYBERSOFT_TOKEN}`,
				}

			})
            dispatch(setListCourseNeedAuth(resp.data))
		} catch (err) {
			console.log(err)
		}
    }

    const courseCofirm = async (id) => {
        try {
            const resp = await axios({
				method: 'post',
				url: 'https://elearningnew.cybersoft.edu.vn/api/QuanLyNguoiDung/LayDanhSachKhoaHocDaXetDuyet',
				data: {
					"taiKhoan": id,
				},
				headers: {
					Authorization: `Bearer ${getLocal(ACCESS_TOKEN)}`,
					TokenCybersoft: `${CYBERSOFT_TOKEN}`,
				}

			})
            dispatch(setListCourseCofirm(resp.data))
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className='container'>
            <div className='user-manage-title'>
                <h1 >
                    <NavLink to='/admin/useradd'>Thêm Người Dùng </NavLink>
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
                        <th>Tài Khoản</th>
                        <th>Họ Tên</th>
                        <th>Email</th>
                        <th>Số Điện Thoại</th>
                        <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    {handleUser()}
                </tbody>
            </table>
            <div className='py-5'>
                <Paginate
                    handlePageClick={handlePageClick}
                    pageCount={Math.ceil(listUserAdmin.length / PAGE_SIZE)}
                    forcePage={pageUser - 1}
                />
            </div>

            {showPopup && <PopupUser taiKhoan={selectedTaiKhoan} courseNeedAuth={courseNeedAuth} courseCofirm={courseCofirm} />}
        </div>
    )
}

export default UserManagement