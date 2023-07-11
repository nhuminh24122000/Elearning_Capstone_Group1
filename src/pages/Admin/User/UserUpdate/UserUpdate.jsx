import React from 'react';
import './UserUpdate.scss'
import AddAndUpdateUser from '../../../../components/Admin/AddAndUpdateUser/AddAndUpdateUser';

function UserUpdate() {
    const handleFormSubmit = (e) => {
        e.preventDefault()
        alert('Cập nhật người dùng');
    };

    return (
        <div>
            <AddAndUpdateUser title="Cập Nhật Người Dùng" buttonText="Cập Nhật" onSubmit={handleFormSubmit}/>
        </div>
    )
}

export default UserUpdate