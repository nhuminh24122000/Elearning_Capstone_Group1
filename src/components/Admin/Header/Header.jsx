import React from "react";
import "./Header.scss";
import { NavLink } from "react-router-dom";
import LogoImage from "../../../assets/img/cyberlogo-black.png";

function Header() {
  return (
    <>
      <div className="header-container container-fluid d-flex justify-content-between align-items-center">
        <div className="header-logo d-flex justify-content-between align-items-center py-4">
          <img src={LogoImage} alt="" />
          <h1 className="ml-4">Dashboard</h1>
        </div>
        <div className="header-name">
            <span className="mr-3">Hi, my name is hung</span>
            <i class="fa-solid fa-user"></i>
        </div>
      </div>
    </>
  );
}

export default Header;
