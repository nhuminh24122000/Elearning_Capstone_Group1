import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import CoursesList from "../../components/CoursesList/CoursesList";
import { getCoursesBySearchPaginationApi } from "../../services/course";
import { _paginate } from "../../services/pagination";
import ReactPaginate from 'react-paginate';
import { CYBERSOFT_TOKEN, GROUP_ID } from "../../constant";
import axios from "axios";
import Paginate from "../../components/Paginate/Paginate";


export default function CourseSearch() {
  const [searchParams, setSearchParams] = useSearchParams();

  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  console.log('currentPage', currentPage)
  const pageSize = 5;
  const [totalPages, setTotalPages] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  console.log('totalCount',totalCount)
  const [count, setCount] = useState(1);

  let keyword = searchParams.has("tenkhoahoc")
    ? searchParams.get("tenkhoahoc")
    : "";

  const [searchCourseList, setSearchCourseList] = useState([]);
  console.log('searchCourseList', searchCourseList)

  const getCoursesBySearchPagination = (page) => {
    // return getCoursesBySearchPaginationApi(keyword, page, pageSize);
    return getCoursesBySearchPaginationApi(keyword, page, pageSize);
  };

  //pagination
  const getCoursePageChange = (page) => {
    getCoursesBySearchPagination(page)
      .then((res) => setSearchCourseList(res.data.items))
      .catch((err) => console.log(err));
  };

  // useEffect(() => {
  //   getCoursesBySearchPagination(1)
  //     .then((res) => {
  //       setSearchCourseList(res.data.items);
  //       setTotalCount(res.data.totalCount);
  //       setTotalPages(Math.ceil(res.data.totalCount / pageSize));
  //       setCurrentPage(1);
  //       setCount(1);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       setSearchCourseList([]);
  //       setCurrentPage(1);
  //       setTotalCount(0);
  //       setCount(1);
  //     });
  // }, [keyword]);

  //pagination
  const paginate = () =>
    _paginate(
      [count, setCount],
      totalCount,
      pageSize,
      totalPages,
      [currentPage, setCurrentPage],
      getCoursePageChange
    );

  //   const handleTimKiemKH = async () => {
  //     if (keyword !== '') {
  //         try {
  //             const resp = await axios({
  //                 method: 'get',
  //                 // url: `https://elearningnew.cybersoft.edu.vn/api/QuanLyKhoaHoc/LayDanhSachKhoaHoc?tenKhoaHoc=${params.key}&MaNhom=${MA_NHOM}`,
  //                 url: `https://elearningnew.cybersoft.edu.vn/api/QuanLyKhoaHoc/LayDanhSachKhoaHoc_PhanTrang?tenKhoaHoc=${keyword}&page=${currentPage}&pageSize=${pageSize}&MaNhom=${GROUP_ID}`,
  //                 headers: {
  //                     TokenCybersoft: `${CYBERSOFT_TOKEN}`,
  //                 }
  //             })
  //             console.log('resp',resp.data)

  //             // setListSearch(resp.data)
  //             setSearchCourseList(resp.data.items)
  //             setTotalCount(resp.data.totalCount)
  //             setTotalPages(resp.data.totalPages)

  //         } catch (err) {
  //           setSearchCourseList([]);
  //             console.log(err)
  //         }

  //     } else {
  //       setSearchCourseList([]);
  //     }

  // }

  const fetchData = async () => {
    try {
      const res = await getCoursesBySearchPagination(currentPage);
      setSearchCourseList(res.data.items);
      setTotalCount(res.data.totalCount);
      // setTotalPages(Math.ceil(res.data.totalCount / pageSize));
      setTotalPages(res.data.totalPages);
      setCount(1);
    } catch (err) {
      console.log(err);
      setSearchCourseList([]);
      setTotalCount(0);
      setCount(1);
    }
  };

  // Sử dụng hàm fetchData trong useEffect mới
  useEffect(() => {
    fetchData();
  }, [keyword, currentPage]);


  useEffect(() => {
    setCurrentPage(1);
  }, [keyword]);


  const handlePageClick = (event) => {
    setCurrentPage(+event.selected + 1)
  }

  return (
    <>
      <section className="container text-left my-3">
        <h3 className="my-3">
          Tìm thấy <span className="text-info">{totalCount}</span> khoá học{" "}
          <span className="text-info">"{keyword}"</span>
        </h3>
        {paginate()}
        <CoursesList coursesList={searchCourseList} />
        {/* {paginate()} */}
        <div style={{ marginTop: '5rem' }}>
          { totalCount / pageSize > 1 && (
            <ReactPaginate
              onPageChange={handlePageClick}
              pageCount={totalPages}
              forcePage={currentPage - 1}
              // forcePage={Math.max(currentPage - 1, 0)}
              breakLabel="..."
              nextLabel=" >"
              pageRangeDisplayed={10}
              previousLabel="< "
              renderOnZeroPageCount={null}
              // initialPage={0}

              marginPagesDisplayed={3}
              pageClassName="page-item"
              pageLinkClassName="page-link"
              previousClassName="page-item"
              previousLinkClassName="page-link"
              nextClassName="page-item"
              nextLinkClassName="page-link"
              breakClassName="page-item"
              breakLinkClassName="page-link"
              containerClassName="pagination"
              activeClassName="active"
            />

           )} 
        </div>
      </section>
    </>
  );
}
