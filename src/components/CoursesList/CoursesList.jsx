import React from "react";
import { NavLink } from "react-router-dom";

export default function CoursesList(props) {
  const { coursesList } = props;

  return (
    <div className="row">
      {coursesList.map((course, index) => {
        return (
          <div
            className="col-12 py-2"
            key={index}
            style={{
              borderTop: "1px solid black",
              backgroundColor: "#f8f9fa",
            }}
          >
            <div className="row">
              <div className="col-lg-3">
                <img
                  style={{ height: 150 }}
                  src={course.hinhAnh}
                  alt=""
                  className="img-fluid"
                />
              </div>
              <div className="col-lg-9">
                <h1>
                  <NavLink
                    style={{
                      textDecoration: "none",
                      color: "black",
                      cursor: "pointer",
                    }}
                    to={`/coursedetail/${course.maKhoaHoc}`}
                  >
                    {course.tenKhoaHoc}
                  </NavLink>
                </h1>
                <p>{course.moTa}</p>
                <div className="text-right">
                  <p>
                    {course.soLuongHocVien ? course.soLuongHocVien : 0} học viên
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
