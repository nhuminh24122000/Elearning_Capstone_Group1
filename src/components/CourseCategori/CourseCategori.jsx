import React from 'react'
import { Select, Space } from 'antd';
import { CYBERSOFT_TOKEN } from '../../constant';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'
import { setListCategori } from '../../redux/reducers/courseReducer';
import { NavLink } from 'react-router-dom';
import './CourseCategori.scss'

function CourseCategori() {
    const dispatch = useDispatch();
    const { listCategori } = useSelector(state => state.CourseReducer);

    const items = listCategori.map((course) => {
        return {
            value: course.tenDanhMuc,
            label: <NavLink to={`/coursecategories/${course.maDanhMuc}`}>{course.tenDanhMuc}</NavLink>,
            key: course.maDanhMuc,
        }
    })

    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };
    
    const handleCourseCategori = async () => {
        try {
            const resp = await axios({
                method: 'get',
                url: 'https://elearningnew.cybersoft.edu.vn/api/QuanLyKhoaHoc/LayDanhMucKhoaHoc',
                headers: {
                    TokenCybersoft: `${CYBERSOFT_TOKEN}`
                }
            })
            dispatch(setListCategori(resp.data))
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className='ml-sm-3 ml-md-5' onClick={handleCourseCategori}>
            <Space wrap >
                <Select
                    defaultValue="Danh Mục Khóa Học"
                    style={{
                        width: 200,
                    }}
                    onChange={handleChange}
                    options= {items}
                />
            </Space>
        </div>

    )
}

export default CourseCategori