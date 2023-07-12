import { Empty } from 'antd';
import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Rating } from "react-simple-star-rating";
import Swal from 'sweetalert2';
import { ACCESS_TOKEN, CYBERSOFT_TOKEN, defaultImage } from '../../constant';
import { getLocal } from '../../utils';
import './MyCourse.scss';
import CourseItem from '../CourseItem/CourseItem';
import Paginate from '../Paginate/Paginate';
import Carts from '../Carts/Carts';




function MyCourse({ handleProfile }) {
    const { userProfile } = useSelector(state => state.UserReducer);
    const [key, setKey] = useState();
    const [listSearch, setListSearch] = useState(null);
    const showCancelButton = true;

    const PAGE_SIZE = 5;
    const [page, setPage] = useState(1);
    const [data, setData] = useState([]);


    const handleChangeKey = (e) => {
        setKey(e.target.value.trim())
    }

    const handleSearch = (e) => {
        e.preventDefault();

        const list = userProfile.chiTietKhoaHocGhiDanh.map((item) => {
            return item
        })

        if (key !== undefined) {
            const result = list.filter((item) => {
                return item.tenKhoaHoc.toLowerCase().includes(key.toLowerCase())
            })

            if (result.length > 0) {
                setListSearch(result);
                // handleProfile()
            } else {
                // handleProfile()

                setListSearch([])
            }

        } else {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Nhập vào khóa học cần tìm',
                timer: 1500
            })
        }
    }


    const renderList = listSearch || userProfile?.chiTietKhoaHocGhiDanh;
    const handleCourseJoin = () => {

        if (renderList && renderList.length > 0) {

            return data.map((item) => {
                return (
                    <Fragment key={item.maKhoaHoc}>
                        <div className="col-12 py-2" >
                            <div className="row justify-content-center" style={{margin: '2rem 0'}}>
                                <CourseItem item={{ ...item, showCancelButton }} handleProfile={handleProfile} listSearch={listSearch} setListSearch={setListSearch} />

                            </div>
                        </div>
                    </Fragment>
                )
            })
        } else {
            return <Empty />
        }
    }


    const handlePageClick = (event) => {
        setPage(event.selected + 1)
    }

    useEffect(() => {
        let newData = (listSearch || renderList).slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
        console.log('newData', newData)
        setData(newData);
    }, [listSearch || renderList, page]);


    return (
        <>
            <div className='d-flex justify-content-around align-items-center my-5'>
                <div className="row align-items-center">
                    <h1 className='col-md-12 col-lg-7 my-course-title w-100'>Tổng số khóa học bạn đã  tham gia: {userProfile.chiTietKhoaHocGhiDanh.length}</h1>
                    <form action="#" className="d-flex justify-content-center my-2 my-lg-0  col-md-12 col-lg-5" onSubmit={handleSearch}>
                        <div className="search-mycourse d-flex">
                            <button><i className="fa fa-search" />
                            </button>
                            <input className="searchText-mycourse" type="search" placeholder="Tìm kiếm khóa học" onChange={handleChangeKey} />
                        </div>
                    </form>

                </div>
            </div>
            <div className="row justify-content-center">
                {handleCourseJoin()}
                <div style={{marginTop: '5rem'}}>
                {(listSearch || renderList) && (listSearch || renderList).length / PAGE_SIZE > 1 && (
                    <Paginate handlePageClick={handlePageClick} pageCount={Math.ceil((listSearch || renderList).length / PAGE_SIZE)} forcePage={page - 1} />

                )}

                </div>
            </div>
        </>

    )
}

export default MyCourse