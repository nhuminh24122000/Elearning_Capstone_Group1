import React from "react";
import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import LogoHome from '../../assets/img/cyberlogo-black.png'
import './Header.scss'
import { Formik, Form, Field } from "formik";
import CourseCategori from "../CourseCategori/CourseCategori";

function Header() {

  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  let keyword = searchParams.has("tenkhoahoc")
    ? searchParams.get("tenkhoahoc")
    : "";

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

          <div className="d-flex">
            <div className="d-sm-inline d-none">

              {/* <div className="d-flex my-2 my-lg-0">
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
              </div> */}

              <Formik
                initialValues={{ searchText: keyword }}
                onSubmit={({ searchText }) => {
                  navigate(`/coursesearch?tenkhoahoc=${searchText}`);
                }}
              >
                {(props) => (
                  <Form className="d-flex my-2 my-lg-0">
                    <Field
                      className="search d-flex"
                      type="search"
                      placeholder="Tìm kiếm khóa học"
                      name="searchText"
                      value={props.values.searchText}
                      onChange={(e) => {
                        props.handleChange(e);
                      }}
                    />
                  </Form>
                )}
              </Formik>
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
