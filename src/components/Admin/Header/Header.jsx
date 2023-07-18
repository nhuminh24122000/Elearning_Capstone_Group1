import React from "react";
import "./Header.scss";
import { NavLink } from "react-router-dom";
import LogoImage from "../../../assets/img/cyberlogo-black.png";
import { useSelector } from "react-redux";

function Header() {
  const { userProfile } = useSelector((state) => state.UserReducer);
  console.log('userProfile',userProfile)

  return (
    <>
      <div className="header-container container-fluid">
        <div className="header-logo d-flex align-items-center justify-content-between  py-4">
          <NavLink to={'/'}><img src={LogoImage} alt="" /></NavLink>
          <h1 className="ml-4">Trang Quản Lý Người Dùng và Khóa Học </h1>
          <div className="header-name">
            <span className="mr-3">Xin chào {userProfile.taiKhoan}</span>
            <i class="fa-solid fa-user"></i>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
