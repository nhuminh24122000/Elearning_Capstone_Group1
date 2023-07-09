import React, { useEffect, useState } from 'react'
import './PopupUser.scss'
import { useSelector } from 'react-redux';
import '../../../pages/Admin/User/UserManagement/UserManagement.scss'
import { Empty } from 'antd';
import { ACCESS_TOKEN, CYBERSOFT_TOKEN } from '../../../constant';
import { getLocal } from '../../../utils';
import axios from 'axios';
import Swal from 'sweetalert2'
import Paginate from '../../Paginate/Paginate';



function PopupUser({ taiKhoan, courseNeedAuth, courseCofirm }) {
    const { listCourseNeedAuth } = useSelector(state => state.UserAdminReducer);
    const { listCourseCofirm } = useSelector(state => state.UserAdminReducer);

    const PAGE_SIZE = 4;
    const [pageNeedCofirm, setPageNeedCofirm] = useState(1)
    const [dataNeedCofirm, setDataNeedCofirm] = useState([]);
    const [pageCofirm, setPageCofirm] = useState(1)
    const [dataCofirm, setDataCofirm] = useState([]);

    const courseRegister = async (id, user) => {
        try {
            const resp = await axios({
                method: 'post',
                url: 'https://elearningnew.cybersoft.edu.vn/api/QuanLyKhoaHoc/GhiDanhKhoaHoc',
                data: {
                    "maKhoaHoc": id,
                    "taiKhoan": user,
                },
                headers: {
                    Authorization: `Bearer ${getLocal(ACCESS_TOKEN)}`,
                    TokenCybersoft: `${CYBERSOFT_TOKEN}`,
                }

            })
            courseNeedAuth(user);
            courseCofirm(user)
            setPageNeedCofirm(1)
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Xác thực khóa học thành công',
                showConfirmButton: false,
                timer: 1500
            })
        } catch (err) {
            console.log(err)
        }
    }

    const cancelCourseRegister = async (id, user) => {
        try {
            const resp = await axios({
                method: 'post',
                url: 'https://elearningnew.cybersoft.edu.vn/api/QuanLyKhoaHoc/HuyGhiDanh',
                data: {
                    "maKhoaHoc": id,
                    "taiKhoan": user,
                },
                headers: {
                    Authorization: `Bearer ${getLocal(ACCESS_TOKEN)}`,
                    TokenCybersoft: `${CYBERSOFT_TOKEN}`,
                }

            })
            courseNeedAuth(user);
            setPageNeedCofirm(1)
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Hủy ghi danh khóa học thành công',
                showConfirmButton: false,
                timer: 1500
            })

        } catch (err) {
            console.log(err)
        }
    }

    const deleteCourse = async (id, user) => {
        try {
            const resp = await axios({
                method: 'delete',
                url: `https://elearningnew.cybersoft.edu.vn/api/QuanLyKhoaHoc/XoaKhoaHoc?MaKhoaHoc=${id}`,
                data: {
                    "maKhoaHoc": id,
                    "taiKhoan": user,
                },
                headers: {
                    Authorization: `Bearer ${getLocal(ACCESS_TOKEN)}`,
                    TokenCybersoft: `${CYBERSOFT_TOKEN}`,
                }
            })
            console.log('resp', resp)
            LayKHDaXetDuyet(user);
            setPageCofirm(1)
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Xóa khóa học thành công',
                showConfirmButton: false,
                timer: 1500
            })
        } catch (err) {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Khóa học đã ghi danh, không thể xóa!',
                showConfirmButton: false,
                timer: 1500
            })
            console.log(err)
        }
    }

    // Phân Trang
    const handleClickPageNeedCofirm = (event) => {
        setPageNeedCofirm(event.selected + 1)
    }

    const handleClickPageCofirm = (event) => {
        setPageCofirm(event.selected + 1)
    }

    useEffect(() => {
        let newDataNeedCofirm = listCourseNeedAuth.slice((pageNeedCofirm - 1) * PAGE_SIZE, pageNeedCofirm * PAGE_SIZE);
        let newDataCofirm = listCourseCofirm.slice((pageCofirm - 1) * PAGE_SIZE, pageCofirm * PAGE_SIZE);
        setDataNeedCofirm(newDataNeedCofirm),
            setDataCofirm(newDataCofirm)

    }, [listCourseNeedAuth, pageNeedCofirm, listCourseCofirm, pageCofirm])

    return (
        <>
            <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Tài khoản: {taiKhoan}</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            {listCourseNeedAuth.length > 0 || listCourseCofirm.length > 0 ? (
                                <>
                                    {listCourseNeedAuth.length > 0 ? (
                                        <>
                                            <h1>Khóa Học Chờ Xác Thực</h1>
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th>STT</th>
                                                        <th>Tên Khóa Học</th>
                                                        <th>Chờ Xác Minh</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {dataNeedCofirm.map((item, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <td>{((pageNeedCofirm - 1) * PAGE_SIZE + index + 1)}</td>
                                                                <td>{item.tenKhoaHoc}</td>
                                                                <td style={{ padding: '0.8rem 0' }}>
                                                                    <button onClick={() => courseRegister(item.maKhoaHoc, taiKhoan)} className='btn-ghidanh'>Xác Thực</button>
                                                                    <button onClick={() => cancelCourseRegister(item.maKhoaHoc, taiKhoan)} className='btn-xoa'>Hủy</button>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })}
                                                </tbody>
                                            </table>
                                            {listCourseNeedAuth && listCourseNeedAuth.length / PAGE_SIZE > 1 && (
                                                <Paginate handlePageClick={handleClickPageNeedCofirm} pageCount={Math.ceil(listCourseNeedAuth.length / PAGE_SIZE)} forcePage={pageNeedCofirm - 1} />
                                            )}
                                        </>
                                    ) : null}


                                    {listCourseCofirm.length > 0 ? (
                                        <>
                                            <h1>Khóa Học Đã Ghi Danh</h1>
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th>STT</th>
                                                        <th>Tên Khóa Học</th>
                                                        <th>Chờ Xác Minh</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {dataCofirm.map((item, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <td>{((pageCofirm - 1) * PAGE_SIZE + index + 1)}</td>
                                                                <td>{item.tenKhoaHoc}</td>
                                                                <td style={{ padding: '0.8rem 0' }}>
                                                                    <button onClick={() => deleteCourse(item.maKhoaHoc, taiKhoan)} className='btn-xoa'>Hủy</button>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })}
                                                </tbody>
                                            </table>
                                            {listCourseCofirm && listCourseCofirm.length / PAGE_SIZE > 1 && (
                                                <Paginate handlePageClick={handleClickPageCofirm} pageCount={Math.ceil(listCourseCofirm.length / PAGE_SIZE)} forcePage={pageCofirm - 1} />

                                            )}
                                        </>
                                    ) : null}
                                </>
                            ) : <Empty />}




                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn-close" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PopupUser