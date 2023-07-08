import React, { useEffect, useState } from 'react';
import './UserManagement.scss';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { CYBERSOFT_TOKEN, GROUP_ID } from '../../../../constant';
import { useDispatch, useSelector } from 'react-redux';
import { setListUserAdmin } from '../../../../redux/reducers/Admin/userAdminReducer';
import Paginate from '../../../../components/Paginate/Paginate';

function UserManagement() {
    const dispatch = useDispatch();
    const { listUserAdmin } = useSelector(state => state.UserAdminReducer)

    const PAGE_SIZE = 20;
    const [pageUser, setPageUser] = useState(1)
    const [totalPages, setTotalPages] = useState(0);
    const [data, setData] = useState([]);
    console.log('data',data)



    const userAdminAPI = async () => {
        try {
            const resp = await axios({
                method: 'get',
                // url: `https://elearningnew.cybersoft.edu.vn/api/QuanLyNguoiDung/LayDanhSachNguoiDung_PhanTrang?MaNhom=${GROUP_ID}&page=${pageUser}&pageSize=${PAGE_SIZE}`,
                url: `https://elearningnew.cybersoft.edu.vn/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${GROUP_ID}`,
                headers: {
                    TokenCybersoft: `${CYBERSOFT_TOKEN}`
                }
            })
            console.log('resp',resp.data)
            // setTotalPages(resp.data.totalPages)
            dispatch(setListUserAdmin(resp.data))
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        userAdminAPI()
    }, [pageUser]);

    // useEffect(() => {
    //     let newData = listUserAdmin.slice((pageUser - 1) * PAGE_SIZE, pageUser * PAGE_SIZE);
    //     setData(newData);
    // }, [listUserAdmin, pageUser]);

    // const handlePageClick = (event) => {
	// 	setPageUser(event.selected + 1)
	// }


    const handleUser = () => {
        return listUserAdmin.map((item, index) => {
            return (
                <tr key={index}>
                    <th>{index + 1}</th>
                    <td>{item.taiKhoan}</td>
                    <td>{item.hoTen}</td>
                    <td>{item.email}</td>
                    <td>{item.soDT}</td>
                    <td>
                        <button>
                            Ghi danh
                        </button>
                        <button>
                            <NavLink to={`/admin/userupdate/${item.taiKhoan}`}>Sửa</NavLink>
                        </button>
                        <button>Xóa</button>
                    </td>
                </tr>
            )
        })
    }

    return (
        <div className='container'>
            <h1 >
                <NavLink className='text-danger' to='/admin/useradd'>Thêm Người Dùng</NavLink>
            </h1>
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
            {/* <Paginate
                handlePageClick={handlePageClick}
                pageCount={totalPages}
                forcePage={pageUser - 1}
            /> */}
        </div>
    )
}

export default UserManagement