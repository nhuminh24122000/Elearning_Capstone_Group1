import React from "react";
import Carts from "../Carts/Carts";

export default function CoursesRender(props) {
  const courseList = props.courseList;

  return (
    <div className="container pt-2">
      <div className="row">
        {courseList.map((course) => {
          return (
            <div
              className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3"
              key={course.maKhoaHoc}
            >
              <Carts item={course}/>
            </div>
          );
        })}
      </div>
    </div>
  );
}
