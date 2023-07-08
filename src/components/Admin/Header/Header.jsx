import React from 'react';
import './Header.scss';
import { NavLink } from 'react-router-dom';

function Header() {
    return (
        <>
            <div className='d-flex flex-column'>
                <NavLink to='usermanagement'>Quản Lý Người Dùng</NavLink>
                <NavLink to='coursemanagement'>Quản Lý Khóa Học</NavLink>
            </div>
        </>
    )
}

export default Header