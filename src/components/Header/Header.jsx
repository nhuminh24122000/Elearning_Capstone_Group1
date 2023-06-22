import React from "react";
import { NavLink } from "react-router-dom";
import LogoHome from '../../assets/img/cyberlogo-black.png'
import './Header.scss'

function Header() {
  return (
    <header>
      <nav className="navbar navbar-expand-sm">
        <div className="container d-flex align-items-center">
          <button
            className="navbar-toggler d-lg-none"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapsibleNavId"
            aria-controls="collapsibleNavId"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <NavLink className="navbar-brand" to="/">
            <img className="LogoHome" src={LogoHome} alt="" />
          </NavLink>
          <NavLink className="navbar-listCourse" to={'/coursecategories'}>
            Khóa Học
            <i class="fa-solid fa-chevron-down"></i>
          </NavLink>
          <div className="d-flex">
            <div className="d-sm-inline d-none">
              <div className="d-flex my-2 my-lg-0">
                <div className="search d-flex">
                  <button>
                    <i className="fa fa-search" />
                  </button>
                  <input
                    type="text"
                    placeholder="Tìm kiếm khóa học, bài viết, ..."
                  />
                </div>
                <NavLink className="btn text-light" to="/search"> Search </NavLink>
              </div>
            </div>
            <div className="d-flex align-items-center">
							<NavLink className={'header-link'} to={'/signup'}>
								Sign Up
							</NavLink>
              <NavLink className={'header-link'} to={'/signin'}>
								Sign In
							</NavLink>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
