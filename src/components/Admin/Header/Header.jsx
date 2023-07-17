import React from "react";
import "./Header.scss";
import { NavLink } from "react-router-dom";
import LogoImage from "../../../assets/img/cyberlogo-black.png";

function Header() {
  return (
    <>
      <div className="header-container container-fluid">
        <div className="header-logo d-flex align-items-center justify-content-between  py-4">
          <img src={LogoImage} alt="" />
          <h1 className="ml-4">CyberSoft Dashboard</h1>
          <div className="header-name">
            <span className="mr-3">Hi, my name is hung</span>
            <i class="fa-solid fa-user"></i>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
