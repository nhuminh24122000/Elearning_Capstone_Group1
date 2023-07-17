import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import CoursesList from "../../components/CoursesList/CoursesList";
import { getCoursesBySearchPaginationApi } from "../../services/course";
import ReactPaginate from 'react-paginate';


export default function CourseSearch() {
  const [searchParams, setSearchParams] = useSearchParams();

  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;
  const [totalPages, setTotalPages] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [count, setCount] = useState(1);

  let keyword = searchParams.has("tenkhoahoc")
    ? searchParams.get("tenkhoahoc")
    : "";

  const [searchCourseList, setSearchCourseList] = useState([]);

  const getCoursesBySearchPagination = (page) => {
    return getCoursesBySearchPaginationApi(keyword, page, pageSize);
  };

  const fetchData = async () => {
    try {
      const res = await getCoursesBySearchPagination(currentPage);
      setSearchCourseList(res.data.items);
      setTotalCount(res.data.totalCount);
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
        <CoursesList coursesList={searchCourseList} />
        <div style={{ marginTop: '5rem' }}>
          { totalCount / pageSize > 1 && (
            <div style={{marginBottom: '5rem'}}>
              <ReactPaginate
                onPageChange={handlePageClick}
                pageCount={totalPages}
                forcePage={currentPage - 1}
                breakLabel="..."
                nextLabel=" >"
                pageRangeDisplayed={10}
                previousLabel="< "
                renderOnZeroPageCount={null}
  
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
            </div>
           )} 
        </div>
      </section>
    </>
  );
}
