import React from "react";
import { NavLink } from "react-router-dom";
import { defaultImage } from "../../constant";
import './CoursesList.scss'
import { Rating } from "react-simple-star-rating";

export default function CoursesList(props) {
  const { coursesList } = props;
  console.log('coursesList', coursesList)
  const defaultRating = 4;

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
              marginBottom: 35
            }}
          >
            <div className="row">
              <div className="col-lg-3">
                <img
                  style={{ height: 150 }}
                  src={course.hinhAnh}
                  onError={(e) => {
                    e.target.src = defaultImage;
                    e.target.style.width = '100%';
                  }}
                  alt=""
                  className="img-fluid"
                />
              </div>
              <div className="col-lg-9 pr-0">
                <h1>
                  <NavLink
                    className={'idCourse'}
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
                <div className="d-flex">
                  <NavLink
                    to={`/coursedetail/${course.maKhoaHoc}`}
                    className="col-9 p-0 my-4 list-des" >{course.moTa.length > 220 ? <p>{course.moTa.slice(0, 220)} ...</p> : <p>{course.moTa}</p>}</NavLink>
                  <div className="text-right col-3">
                    <p>
                      <Rating initialValue={defaultRating} />
                      <p>
                        {course.soLuongHocVien ? course.soLuongHocVien : 0} học viên
                      </p>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
