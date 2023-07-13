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
        <div className="col-2 left-sidebar d-flex flex-column py-5">
          <NavLink to="usermanagement">Quản Lý Người Dùng</NavLink>
          <NavLink to="coursemanagement">Quản Lý Khóa Học</NavLink>
        </div>
        <div className="col-10 py-5">
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
