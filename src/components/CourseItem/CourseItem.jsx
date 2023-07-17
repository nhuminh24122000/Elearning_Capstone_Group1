import React, { useEffect, useState } from 'react';
import './CourseItem.scss';
import { ACCESS_TOKEN, CYBERSOFT_TOKEN, defaultImage } from '../../constant';
import { NavLink } from 'react-router-dom';
import { Rating } from 'react-simple-star-rating';
import axios from 'axios';
import { getLocal } from '../../utils';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';


function CourseItem({ item,handleProfile, listSearch, setListSearch }) {
    const { userProfile } = useSelector(state => state.UserReducer);

    const { hinhAnh, tenKhoaHoc, moTa, luotXem, maKhoaHoc, showCancelButton } = item;
    const [maxChars, setMaxChars] = useState(200);
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 768) {
                setMaxChars(100);
            } else {
                setMaxChars(200);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

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
                const resp = await axios({
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
                setListSearch(listSearch?.filter(item => item.maKhoaHoc !== id));
                handleProfile()

                Swal.fire(
                    'Xóa thành công',
                    '',
                    'success'
                );
                console.log('resp',resp)

                setTimeout(() => {
                    Swal.close();
                }, 1000)
            } catch (err) {
                console.log(err)
            }
        }

    }


    return (

        <>
            <div className="course-item col-md-3">
                <img
                    style={{ height: 150 }}
                    src={hinhAnh}
                    onError={(e) => {
                        e.target.src = defaultImage;
                    }}
                    alt=""
                    className="img-fluid"
                />
            </div>
            <div className="col-md-9 pr-0">
                <h1 className='course-name'>
                    <NavLink
                        className={'idCourse'}
                        style={{
                            textDecoration: "none",
                            color: "black",
                            cursor: "pointer",
                        }}

                        to={`/coursedetail/${maKhoaHoc}`}
                    >
                        {tenKhoaHoc}
                    </NavLink>
                </h1>
                <div className="d-flex course-content">
                    <NavLink
                        to={`/coursedetail/${maKhoaHoc}`}
                        className="col-12  col-md-8 p-0 my-4 list-des">
                        {moTa.length > maxChars ? (
                            <p>{moTa.slice(0, maxChars)} ...</p>
                        ) : (
                            <p>{moTa}</p>
                        )}

                    </NavLink>
                    <div className="text-right col-12  col-md-4">
                        <Rating initialValue={4} />
                        <p>
                            ({luotXem} lượt xem)
                        </p>
                        {showCancelButton && <button onClick={() => { xoaKhoaHoc(item.maKhoaHoc) }} className='btn-delete'>Xóa</button>}
                    </div>
                </div>
            </div>
        </>

    )
}

export default CourseItem