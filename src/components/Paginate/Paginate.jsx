import React from 'react';
import ReactPaginate from 'react-paginate';
import './Paginate.scss'


function Paginate({ handlePageClick, pageCount, forcePage }) {
    return (
        <ReactPaginate
            onPageChange={handlePageClick}
            pageCount={pageCount}
            forcePage={forcePage}
            breakLabel="..."
            nextLabel="Sau >"
            pageRangeDisplayed={10}
            previousLabel="< Trước"
            renderOnZeroPageCount={null}
            initialPage={0}

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
    )

}

export default Paginate