import axios from 'axios';
import React, { Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Rating } from "react-simple-star-rating";
import Swal from 'sweetalert2';
import { ACCESS_TOKEN, CYBERSOFT_TOKEN, defaultImage } from '../../constant';
import { getLocal } from '../../utils';
import { Empty } from 'antd';


function MyCourse({ handleProfile }) {
    const { userProfile } = useSelector(state => state.UserReducer);
    const [key, setKey] = useState();
    const [listSearch, setListSearch] = useState(null);


    const handleChangeKey = (e) => {
        setKey(e.target.value.trim().replace(/\s/g, ''))
    }

    const handleSearch = (e) => {
        e.preventDefault();


        const huy = userProfile.chiTietKhoaHocGhiDanh.map((item) => {
            return item
        })

        if (key !== undefined) {
            const ketQua = huy.filter((item) => {
                return item.tenKhoaHoc.toLowerCase().includes(key.toLowerCase())
            })

            if (ketQua.length > 0) {
                setListSearch(ketQua);
            } else {
                setListSearch([])
            }

        } else {
            alert('nhập vô')
        }
    }

    const handleKHThamGia = () => {
        const renderList = listSearch || userProfile?.chiTietKhoaHocGhiDanh; 

        if (renderList && renderList.length > 0) {
            return (listSearch || userProfile?.chiTietKhoaHocGhiDanh).map((item) => {
                return (
                    <Fragment key={item.maKhoaHoc}>
                        <div className="col-lg-3" >
                            <img style={{ height: 150 }} src={item.hinhAnh} className="img-fluid" onError={(e) => e.target.src = defaultImage} />
                        </div>
                        <div className="col-lg-9 pr-0">
                            <h1>
                                <NavLink className={'idCourse'}
                                    style={{
                                        textDecoration: "none",
                                        color: "black",
                                        cursor: "pointer",
                                    }}
                                >
                                    {item.tenKhoaHoc}
                                </NavLink>
                            </h1>
                            <div className="d-flex">
                                <NavLink
                                    className="col-9 p-0 my-4 list-des" >{item.moTa.length > 220 ? <p>{item.moTa.slice(0, 220)} ...</p> : <p>{item.moTa}</p>}
                                </NavLink>
                                <div className="text-right col-3">
                                    <p>
                                        <Rating initialValue={4} />
                                        <span>
                                            ({item.luotXem} lượt xem)
                                        </span>
                                    </p>
                                    <button onClick={() => { xoaKhoaHoc(item.maKhoaHoc) }} className='btn-danger'>Xóa</button>
                                </div>
                            </div>
                        </div>
                    </Fragment>
                )
            })
        } else {
            return <Empty />
        }
        

    }

    const xoaKhoaHoc = async (id) => {
        const result = await Swal.fire({
            title: 'Bạn muốn xóa khoác học này?',
            // text: "",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'OK'
        });


        if (result.isConfirmed) {
            try {
                await axios({
                    method: 'post',
                    url: 'https://elearningnew.cybersoft.edu.vn/api/QuanLyKhoaHoc/HuyGhiDanh',
                    data: {
                        maKhoaHoc: id,
                        taiKhoan: userProfile.taiKhoan
                    },
                    headers: {
                        Authorization: `Bearer ${getLocal(ACCESS_TOKEN)}`,
                        TokenCybersoft: `${CYBERSOFT_TOKEN}`,
                    }
                })
                handleProfile()

                Swal.fire(
                    'Xóa thành công',
                    '',
                    'success'
                );
            } catch (err) {
                console.log(err)
            }
        }

    }


    return (
        <>
            <div className='d-flex justify-content-around my-5'>
                <h1 >Các khóa học đã tham gia</h1>
                <form onSubmit={handleSearch}>
                    <input type="text" placeholder='Minh <3 Hưng' onChange={handleChangeKey} />
                </form>
            </div>
            <div className="row">
                <div className="col-12 py-2" style={{ borderTop: "1px solid black", backgroundColor: "#f8f9fa", marginBottom: 35 }}>
                    <div className="row" >
                        {handleKHThamGia()}
                    </div>
                </div>
            </div>
        </>

    )
}

export default MyCourse