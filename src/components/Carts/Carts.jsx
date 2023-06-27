import React from 'react';
import { NavLink } from 'react-router-dom';
import './Carts.scss'

function Carts(props) {
    const { item } = props

    return (
        <div className="card">
            <img className="card-img-top" src={item.hinhAnh} onError={(e) => {
                e.target.src = 'https://elearningnew.cybersoft.edu.vn/hinhanh/thu-them-mot-lan-nua_gp01.jpg';
            }} />

            <div className="card-body">
                <h4 className="card-title">{item.tenKhoaHoc}</h4>
                <p className="card-text">{item.moTa.length > 50 ? <span>{item.moTa.slice(0, 50)} ... </span> : <span>{item.moTa}</span>}</p>
                <NavLink to={`/coursedetail/${item.maKhoaHoc}`} className='card-botton'>Đăng Ký</NavLink>
            </div>
        </div>
    )
}

export default Carts