import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import './CourseCategories.scss'
import axios from 'axios';
import { setListCourseCategory } from '../../redux/reducers/courseReducer';
import { CYBERSOFT_TOKEN, GROUP_ID } from '../../constant';
import Carts from '../../components/Carts/Carts';
import {BASE_URL} from '../../services/config.services'

function CourseCategories() {
    const params = useParams();
    const dispatch = useDispatch()
    const { listCategori } = useSelector(state => state.CourseReducer);
    const { listCourseCategory } = useSelector(state => state.CourseReducer);

    const handleCourseByCategory = async () => {
        try {
            const resp = await axios({
                method: 'get',
                url: `${BASE_URL}/QuanLyKhoaHoc/LayKhoaHocTheoDanhMuc?maDanhMuc=${params.categoriesId}&MaNhom=${GROUP_ID}`,
                headers: {
                    TokenCybersoft: `${CYBERSOFT_TOKEN}`
                }
            })
            dispatch(setListCourseCategory(resp.data));
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        handleCourseByCategory();
    }, [params.categoriesId])

    return (

        <>
            <h1 className='course-name'>
                {listCategori.map((item) => {
                    if (item.maDanhMuc === params.categoriesId) {
                        return item.tenDanhMuc
                    }
                })}
            </h1>
            <div className='course-content'>
                <p>Các khóa học phổ biến</p>
                <div class="row">
                    {listCourseCategory.map((item) => {
                        return <div className='col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3' key={item.maKhoaHoc}>
                            <Carts item={item}/>
                        </div>
                    })}
                </div>
            </div>
        </>
    )
}

export default CourseCategories