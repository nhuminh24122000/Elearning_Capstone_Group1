import React from 'react';
import './CourseManagement.scss';
import { NavLink } from 'react-router-dom';

function CourseManagement() {
    return (
        <div className='container'>
            <h1 >
                <NavLink className='text-danger' to='/admin/courseadd'>Thêm Khóa Học</NavLink>
            </h1>

        </div>
    )
}

export default CourseManagement