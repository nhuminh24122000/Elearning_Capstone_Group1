import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { CYBERSOFT_TOKEN } from '../../constant';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setListDetailCourse } from '../../redux/reducers/courseReducer';
import './CourseDetail.scss'

function CourseDetail() {
    const params = useParams();
    const dispatch = useDispatch();
    const { detailCourse } = useSelector(state => state.CourseReducer);
    console.log('detailCourse',detailCourse)

    const handleCourseDetail = async () => {
        try {
            const resp = await axios({
                method: 'get',
                url: `https://elearningnew.cybersoft.edu.vn/api/QuanLyKhoaHoc/LayThongTinKhoaHoc?maKhoaHoc=${params.courseId}`,
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
    }, [params.courseId])

    return (
        <>
            <div className="detail-carousel row">
                <div className="col-7">
                    <h1>{detailCourse?.danhMucKhoaHoc?.tenDanhMucKhoaHoc}</h1>
                    <p>Đánh giá khóa học: 
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                    </p>
                    <button>Đăng ký</button>
                </div>
                <div className="col-5">
                    <img src={detailCourse.hinhAnh} alt="" style={{width: '100%'}}/>
                </div>
            </div>
            <div className="detail-content">
                <h1>Giới thiệu khóa học (Phần mô tả của khóa học)</h1>
                <p>{detailCourse.moTa}</p>
                {/* <p></p> */}

            </div>
        </>
    )
}

export default CourseDetail