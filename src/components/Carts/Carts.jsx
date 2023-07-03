import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Carts.scss';
import { Rating } from "react-simple-star-rating";
import { defaultImage } from '../../constant';

function Carts(props) {
    const { hinhAnh, tenKhoaHoc, luotXem, maKhoaHoc } = props.item
    const defaultRating = 4;

    return (
        <div className="card">
            <img className="card-img-top" src={hinhAnh} onError={(e) => {
                e.target.src = defaultImage;
            }} />

            <div className="card-body">
                <p className="card-title">{tenKhoaHoc}</p>
                <p style={{ fontSize: '1rem' }}>
                    <Rating initialValue={defaultRating} /> ({luotXem})
                </p>
                <NavLink to={`/coursedetail/${maKhoaHoc}`} className='card-botton'>Đăng Ký</NavLink>
            </div>
        </div>
    )
}

export default Carts