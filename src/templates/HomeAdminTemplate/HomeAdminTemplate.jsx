import { Skeleton } from "antd";
import React, { Suspense } from "react";
import { NavLink, Outlet } from "react-router-dom";
import Header from "../../components/Admin/Header/Header";
import Footer from "../../components/Admin/Footer/Footer";
import "./HomeAdminTemplate.scss";

function HomeAdminTemplate() {
  return (
    <>
      <Header />
      <div className="d-flex">
        <ul className="left-sidebar col-2  d-flex flex-column p-0">
          <li className="d-flex align-items-center mt-4">
            <NavLink to="/admin">
              <i class="fa-solid fa-house mr-3"></i>
              <span className="home-template">Trang Chủ Admin</span>
              {/* Trang Chủ Admin */}
            </NavLink>
          </li>
          <li className="d-flex align-items-center">
            <NavLink to="usermanagement">
              <i class="fa-solid fa-users-gear mr-2"></i>
              <span className="home-template">Quản Lý Người Dùng</span>
              {/* Quản Lý Người Dùng */}
            </NavLink>
          </li>
          <li className="d-flex align-items-center">
            <NavLink to="coursemanagement">
              <i class="mr-4 fa-solid fa-clipboard"></i>
              <span className="home-template">Quản Lý Khóa Học</span>
              {/* Quản Lý Khóa Học */}
            </NavLink>
          </li>
        </ul>
        <div className="col-10 p-0">
          <Suspense fallback={<Skeleton />}>
            <Outlet />
          </Suspense>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default HomeAdminTemplate;
