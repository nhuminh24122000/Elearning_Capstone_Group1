import React from "react";
import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import LogoHome from "../../assets/img/cyberlogo-black.png";
import "./Header.scss";
import { Formik, Form, Field } from "formik";
import CourseCategori from "../CourseCategori/CourseCategori";
import { useDispatch, useSelector } from "react-redux";
import { removeLocal } from "../../utils";
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
      <nav className="navbar navbar-expand-sm">
        <div className="container d-flex align-items-center justify-content-center justify-content-sm-between">
          {/* <button
            className="navbar-toggler d-lg-none"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapsibleNavId"
            aria-controls="collapsibleNavId"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button> */}
          <NavLink className="navbar-brand d-none d-sm-block" to="/">
            <img className="LogoHome" src={LogoHome} alt="" />
          </NavLink>
          {/* <NavLink className="navbar-listCourse" to={'/coursecategories'}>
            Khóa Học
            <i class="fa-solid fa-chevron-down"></i>
          </NavLink> */}
          <div>
            <CourseCategori />
            {/* <Space wrap>
              <Select
                defaultValue="Danh Mục Khóa Học"
                style={{
                  width: 200,
                }}
                onChange={handleChange}
                options={[
                  {
                    value: 'jack',
                    label: 'Jack',
                  },
                  {
                    value: 'lucy',
                    label: 'Lucy',
                  },
                  {
                    value: 'Yiminghe',
                    label: 'yiminghe',
                  },
                  {
                    value: 'disabled',
                    label: 'Disabled',
                    disabled: true,
                  },
                ]}
              />
            </Space> */}
          </div>

          <div className="d-flex ml-xl-5 ml-4">
            <div className="search-container d-sm-inline">
              <Formik
                initialValues={{ searchText: keyword }}
                onSubmit={({ searchText }) => {
                  navigate(`/coursesearch?tenkhoahoc=${searchText}`);
                }}
              >
                {(props) => (
                  <Form className="d-flex my-2 my-lg-0">
                    <div className="search d-flex">
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

          {userProfile.taiKhoan ? (
            <div className="d-flex align-items-center">
              <div>
                <Dropdown
                  menu={{
                    items,
                  }}
                  placement="bottomRight"
                  arrow
                >
                  <Button className="header-user">
                    Hello, {userProfile.hoTen}
                  </Button>
                </Dropdown>
              </div>
            </div>
          ) : (
            <div className="d-flex align-items-center">
              <NavLink className={"header-link d-none d-lg-block"} to={"/signup"}>
                Đăng Ký
              </NavLink>
              <NavLink className={"header-link"} to={"/signin"}>
                Đăng Nhập
              </NavLink>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;
