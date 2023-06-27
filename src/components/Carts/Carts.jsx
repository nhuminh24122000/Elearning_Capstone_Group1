import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Carts.scss';
import { Rating } from "react-simple-star-rating";

function Carts(props) {
    const { hinhAnh, tenKhoaHoc, luotXem, maKhoaHoc } = props.item
    const defaultRating = 4;
    const defaultImg = 'https://elearningnew.cybersoft.edu.vn/hinhanh/thu-them-mot-lan-nua_gp01.jpg'

    


    return (
        <div className="card">
            <img className="card-img-top" src={hinhAnh} onError={(e) => {
                e.target.src = defaultImg;
            }} />

            <div className="card-body">
                <p className="card-title">{tenKhoaHoc}</p>
                <p style={{ fontSize: '1rem' }}>
                    <Rating  initialValue={defaultRating}  /> ({luotXem})
                </p>
                {/* <p className="card-text">{moTa.length > 50 ? <span>{moTa.slice(0, 50)} ... </span> : <span>{moTa}</span>}</p> */}
                <NavLink to={`/coursedetail/${maKhoaHoc}`} className='card-botton'>Đăng Ký</NavLink>
            </div>
        </div>
    )
}

export default Carts