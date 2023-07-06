import React, { Fragment, useEffect, useLayoutEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import './CourseCategories.scss'
import axios from 'axios';
import { setListCourseCategory } from '../../redux/reducers/courseReducer';
import { CYBERSOFT_TOKEN, GROUP_ID } from '../../constant';
import Carts from '../../components/Carts/Carts';
import {BASE_URL} from '../../services/config.services'
import Paginate from '../../components/Paginate/Paginate';

function CourseCategories() {
    const params = useParams();
    const dispatch = useDispatch()
    const { listCategori } = useSelector(state => state.CourseReducer);
    const { listCourseCategory } = useSelector(state => state.CourseReducer);

    const PAGE_SIZE = 8;
    // const PAGE_SIZE = (window.innerWidth < 1025 && window.innerWidth > 768) ? 9 : 8;
    // const [PAGE_SIZE, setPageSize] = useState(8);
    // const [PAGE_SIZE, setPageSize] = useState((window.innerWidth < 1025 && window.innerWidth > 768) ? 9 : 8);

//   useEffect(() => {
//     const handleResize = () => {
//         if(window.innerWidth < 1025 && window.innerWidth > 768) {
//             setPageSize(9)
//         } else {
//             setPageSize(8)
//         }
//     };
//     handleResize();


//     window.addEventListener('resize', handleResize);

//     return () => window.removeEventListener('resize', handleResize);

//   }, []);



    const [page, setPage] = useState(1)
    const [data, setData] = useState([]);


    const handleCourseByCategory = async () => {
        try {
            const resp = await axios({
                method: 'get',
                url: `${BASE_URL}/QuanLyKhoaHoc/LayKhoaHocTheoDanhMuc?maDanhMuc=${params.categoriesId}&MaNhom=${GROUP_ID}`,
                headers: {
                    TokenCybersoft: `${CYBERSOFT_TOKEN}`
                }
            })
            console.log(resp);
            dispatch(setListCourseCategory(resp.data));
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        handleCourseByCategory();
        setPage(1)
    }, [params.categoriesId])

    useEffect(() => {
        let newData = listCourseCategory.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
        console.log('newData', newData)
        setData(newData);
    }, [listCourseCategory, page]);

    const handlePageClick = (event) => {
        setPage(event.selected + 1);
    }



    return (

        < >
            <h1 className='course-category'>
                {listCategori.map((item) => {
                    if (item.maDanhMuc === params.categoriesId) {
                        return item.tenDanhMuc
                    }
                })}
            </h1>
            <div className='course-content container'>
                <p>Các khóa học phổ biến</p>
                <div class="row">
                    {data.map((item) => {
                        return <div className='col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3' key={item.maKhoaHoc}>
                            <Carts item={item}/>
                        </div>
                    })}
                </div>
            </div>
            {listCourseCategory && (listCourseCategory.length / PAGE_SIZE) > 1 && (
            
            <Paginate handlePageClick={handlePageClick}  pageCount={Math.ceil(listCourseCategory.length / PAGE_SIZE)} forcePage={page - 1}/>
            )}
        </>
    )
}

export default CourseCategories