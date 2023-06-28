import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ACCESS_TOKEN, CYBERSOFT_TOKEN, defaultImage } from '../../constant';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setListDetailCourse } from '../../redux/reducers/courseReducer';
import './CourseDetail.scss'
import { getLocal } from '../../utils';
import Swal from 'sweetalert2'
import { BASE_URL } from '../../services/config.services'
import { Rating } from 'react-simple-star-rating';

function CourseDetail() {

    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { detailCourse } = useSelector(state => state.CourseReducer);


    const handleCourseDetail = async () => {
        try {
            const resp = await axios({
                method: 'get',
                url: `${BASE_URL}/QuanLyKhoaHoc/LayThongTinKhoaHoc?maKhoaHoc=${params.courseId}`,
                headers: {
                    TokenCybersoft: `${CYBERSOFT_TOKEN}`
                }
            })
            dispatch(setListDetailCourse(resp.data))
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        handleCourseDetail();
    }, [params.courseId]);

    const handleCourseRegister = async () => {
        try {
            await axios({
                method: 'post',
                url: `${BASE_URL}/QuanLyKhoaHoc/DangKyKhoaHoc`,
                data: {
                    maKhoaHoc: params.courseId,
                    taiKhoan: 'huycan4mat'
                },
                headers: {
                    Authorization: `Bearer ${getLocal(ACCESS_TOKEN)}`,
                    TokenCybersoft: `${CYBERSOFT_TOKEN}`,
                }
            })
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Đăng ký khóa học thành công.',
                showConfirmButton: false,
                timer: 1500
            })
        } catch (err) {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Khóa học đã được đăng ký.',
                showConfirmButton: false,
                timer: 1500
            })
            console.log(err)
        }
    }

    const isSignin = () => {
        if (getLocal(ACCESS_TOKEN)) {
            handleCourseRegister()
        } else {
            navigate('/signin')
        }
    }

    return (
        <>
            <div className="detail-carousel row">
                <div className="col-12 col-7 col-sm-7">
                    <h1>{detailCourse?.danhMucKhoaHoc?.tenDanhMucKhoaHoc}</h1>
                    <p className='d-flex align-items-center'>Đánh giá khóa học:
                        {/* <span className='rating'> */}
                            <Rating initialValue={4} className='mx-3' />
                        {/* </span> */}
                    </p>
                    <button onClick={isSignin}>Đăng ký</button>
                </div>
                <div className="col-5">
                    <img src={detailCourse.hinhAnh} onError={(e) => e.target.src = defaultImage} style={{ width: '100%' }} />
                </div>
            </div>
            <div className="detail-content">
                <h1>Giới thiệu khóa học (Phần mô tả của khóa học)</h1>
                <p>{detailCourse.moTa}</p>

            </div>
        </>
    )
}

export default CourseDetail