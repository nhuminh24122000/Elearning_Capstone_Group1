import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import './PopupCourse.scss'
import Paginate from '../../Paginate/Paginate';
import axios from 'axios';
import { getLocal } from '../../../utils';
import { ACCESS_TOKEN, CYBERSOFT_TOKEN } from '../../../constant';
import Swal from 'sweetalert2'
import { Empty } from 'antd';

function PopupCourse({ maKhoaHoc, stuNeedCofirm, stuCofirm }) {
    const { listUserNeedRegister } = useSelector(state => state.CourseAdminReducer)
    const { listUserCofirm } = useSelector(state => state.CourseAdminReducer)
    const { listUserNotRegister } = useSelector(state => state.CourseAdminReducer)

    const PAGE_SIZE = 4;
    const [pageNeedCofirm, setPageNeedCofirm] = useState(1)
    const [dataNeedCofirm, setDataNeedCofirm] = useState([]);
    const [pageCofirm, setPageCofirm] = useState(1)
    console.log('pageCofirm', pageCofirm)
    const [dataCofirm, setDataCofirm] = useState([]);

    const [selectedTaiKhoan, setSelectedTaiKhoan] = useState('');
    const selectRef = useRef(null)


    const userRegister = async (id, user, actionType) => {
        console.log('id, user, actionType', id, user, actionType)
        if (user === '') {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Vui lòng chọn tên học viên',
                showConfirmButton: false,
                timer: 1500
            });
            return;
        }

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
            });

            if (actionType === 'choose') {
                selectRef.current.selectedIndex = 0;
                setSelectedTaiKhoan('');
                stuCofirm(id);
                setPageCofirm(1);
            }


            stuNeedCofirm(id);
            stuCofirm(id);
            setPageNeedCofirm(1);
            setPageCofirm(1);

            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Xác thực học viên thành công',
                showConfirmButton: false,
                timer: 1500
            });
        } catch (err) {
            console.log(err);
        }
    }

    const cancelUserRegister = async (id, user) => {
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
            stuNeedCofirm(id);
            setPageNeedCofirm(1)
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Hủy ghi danh học viên thành công',
                showConfirmButton: false,
                timer: 1500
            })
            console.log('resp', resp)

        } catch (err) {
            console.log(err)
        }
    }

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
            stuNeedCofirm(id);
            setPageCofirm(1)
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Xóa học viên thành công',
                showConfirmButton: false,
                timer: 1500
            })
        } catch (err) {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Học viên này đã tạo khóa học không thể xóa!',
                showConfirmButton: false,
                timer: 1500
            })
            setPageCofirm(1)
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
        const newDataNeedCofirm = listUserNeedRegister.slice((pageNeedCofirm - 1) * PAGE_SIZE, pageNeedCofirm * PAGE_SIZE)
        setDataNeedCofirm(newDataNeedCofirm);

        const newDataCofirm = listUserCofirm.slice((pageCofirm - 1) * PAGE_SIZE, pageCofirm * PAGE_SIZE);
        setDataCofirm(newDataCofirm)
    }, [listUserNeedRegister, pageNeedCofirm, listUserCofirm, pageCofirm])

    return (
        <>
            <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <select ref={selectRef} class="form-select-course" onChange={(e) => setSelectedTaiKhoan(e.target.value)}>
                                <option className='p-5 m-5' value=''>Vui Lòng Chọn Tên Người Dùng </option>
                                {listUserNotRegister.map((item, index) => {
                                    return (
                                        <option key={index} value={item.taiKhoan}>{item.hoTen}</option>
                                    )
                                })}
                            </select>
                            <button className='btn-ghidanh' onClick={() => userRegister(maKhoaHoc, selectedTaiKhoan, 'choose')}>Ghi Danh</button>


                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                {/* <span aria-hidden="true">×</span> */}
                            </button>
                        </div>
                        <div className="modal-body">
                            {listUserNeedRegister.length > 0 || listUserCofirm.length > 0 ? (
                                <>
                                    {listUserNeedRegister.length > 0 ? (
                                        <>
                                            <h1>Học viên chờ xác thực</h1>
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th>STT</th>
                                                        <th>Tài khoản</th>
                                                        <th>Họ tên</th>
                                                        <th>Chờ Xác Nhận</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {dataNeedCofirm.map((item, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <td>{((pageNeedCofirm - 1) * PAGE_SIZE + index + 1)}</td>
                                                                <td>{item.taiKhoan}</td>
                                                                <td>{item.hoTen}</td>
                                                                <td style={{ padding: '0.8rem 0' }}>
                                                                    <button className='btn-ghidanh' onClick={() => userRegister(maKhoaHoc, item.taiKhoan, 'register')}>Xác Thực</button>
                                                                    <button className='btn-xoa' onClick={() => cancelUserRegister(maKhoaHoc, item.taiKhoan)}>Hủy</button>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })}
                                                </tbody>
                                            </table>
                                            {listUserNeedRegister && listUserNeedRegister.length / PAGE_SIZE > 1 && (
                                                <Paginate handlePageClick={handleClickPageNeedCofirm} pageCount={Math.ceil(listUserNeedRegister.length / PAGE_SIZE)} forcePage={pageNeedCofirm - 1} />
                                            )}
                                        </>
                                    ) : null}

                                    {listUserCofirm.length > 0 ? (
                                        <>
                                            <h1>Học viên đã tham gia khóa học</h1>
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th>STT</th>
                                                        <th>Tài khoản</th>
                                                        <th>Họ tên</th>
                                                        <th>Chờ Xác Nhận</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {dataCofirm.map((item, index) => {
                                                        return (
                                                            <tr>
                                                                <td>{((pageCofirm - 1) * PAGE_SIZE + index + 1)}</td>
                                                                <td>{item.taiKhoan}</td>
                                                                <td>{item.hoTen}</td>
                                                                <td style={{ padding: '0.8rem 0' }}>
                                                                    <button onClick={() => deleteUser(item.taiKhoan)} className='btn-xoa'>Hủy</button>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })}

                                                </tbody>
                                            </table>
                                            {listUserCofirm && listUserCofirm.length / PAGE_SIZE > 1 && (
                                                <Paginate handlePageClick={handleClickPageCofirm} pageCount={Math.ceil(listUserCofirm.length / PAGE_SIZE)} forcePage={pageCofirm - 1} />
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

export default PopupCourse