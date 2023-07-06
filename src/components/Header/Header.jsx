import React, { memo, useEffect, useState } from "react";
import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import LogoHome from "../../assets/img/cyberlogo-black.png";
import "./Header.scss";
import { Formik, Form, Field } from "formik";
import CourseCategori from "../CourseCategori/CourseCategori";
import { useDispatch, useSelector } from "react-redux";
import { getLocal, removeLocal, saveLocal } from "../../utils";
import { resetUserProfile } from "../../redux/reducers/userReducer";
import { ACCESS_TOKEN } from "../../constant";
import { Button, Dropdown } from "antd";

function Header() {
  const { userProfile } = useSelector((state) => state.UserReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  let keyword = searchParams.has("tenkhoahoc")
    ? searchParams.get("tenkhoahoc")
    : "";

  const handleLogout = () => {
    // sang trang login
    navigate("/signin");

    // Xoa accessToken
    removeLocal(ACCESS_TOKEN);
    removeLocal('userProfile');
    //reset data
    const action = resetUserProfile();
    dispatch(action);
  };

  const items = [
    {
      key: "1",
      label: <NavLink to={"/userinfo"}>Thông tin cá nhân</NavLink>,
    },
    {
      key: "2",
      label: <NavLink to={"/userinfo"}>Khóa học của tôi</NavLink>,
    },
    {
      key: "3",
      label: (
        <NavLink onClick={handleLogout} to={"/signin"}>
          Đăng xuất
        </NavLink>
      ),
    },
  ];

  return (
    <header>
      <div className="container">
        <nav className="navbar navbar-expand-sm">
          <div className="d-flex align-items-center justify-content-between w-100">
            <NavLink className="navbar-brand" to="/">
              <img className="LogoHome" src={LogoHome} alt="" />
            </NavLink>

            {/* <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i class="fa-solid fa-bars icon-bar"></i>
          </button> */}

            <label htmlFor="openNav" className="openNav">
              <i class="fa-solid fa-bars"></i>
            </label>

            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <input type="checkbox" name="openNav" id="openNav" />

              <div className="header-close">
                <label htmlFor="openNav">
                  <i class="fa-solid fa-xmark"></i>
                </label>
              </div>

              <ul className="row navbar-nav d-flex align-items-center">
                <li className="nav-item col-12 col-sm-4 col-lg-4 col-md-5">
                  <div>
                    <CourseCategori />
                  </div>
                </li>
                <li className="nav-item col-12 col-sm-4 col-lg-4 col-md-4">
                  <div className="d-flex ml-xl-5 ml-sm-4 ml-0">
                    <div className="search-container d-sm-inline">
                      <Formik
                        initialValues={{ searchText: keyword }}
                        onSubmit={({ searchText }) => {
                          navigate(`/coursesearch?tenkhoahoc=${searchText}`);
                        }}
                      >
                        {(props) => (
                          <Form className="d-flex my-lg-0">
                            <div className="search d-flex w-75">
                              <button>
                                <i className="fa fa-search" />
                              </button>
                              <Field
                                type="search"
                                placeholder="Tìm kiếm khóa học"
                                name="searchText"
                                value={props.values.searchText}
                                onChange={(e) => {
                                  props.handleChange(e);
                                }}
                              />
                            </div>
                          </Form>
                        )}
                      </Formik>
                    </div>
                  </div>
                </li>
                <li className="nav-item col-12 col-sm-4 col-lg-4 col-md-3">
                  {userProfile.taiKhoan ? (
                    <div className="d-flex align-items-center ml-5">
                      <div>
                        <Dropdown
                          menu={{
                            items,
                          }}
                          placement="bottomRight"
                          arrow
                        >
                          <Button className="header-user ml-5">
                            Hello, {userProfile.hoTen}
                          </Button>
                        </Dropdown>
                      </div>
                    </div>
                  ) : (
                    <div className="d-flex align-items-center ml-lg-5 w-100">
                      <NavLink
                        className={"header-link text-center d-none d-lg-block"}
                        to={"/signup"}
                      >
                        Đăng Ký
                      </NavLink>
                      <NavLink
                        className={"header-link text-center"}
                        to={"/signin"}
                      >
                        Đăng Nhập
                      </NavLink>
                    </div>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default memo(Header);
