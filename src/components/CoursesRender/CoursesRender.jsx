import React from "react";
import CourseItems from "../CourseItems/CourseItems";

export default function CoursesRender(props) {
  const courseList = props.courseList;

  return (
    <div className="container pt-2" style={{ backgroundColor: "#f8f9fa" }}>
      <div className="row">
        {courseList.map((course) => {
          return (
            <div
              className="col-lg-3 col-md-6 col-sm-12 p-2"
              key={course.maKhoaHoc}
            >
              <CourseItems course={course} />
            </div>
          );
        })}
      </div>
    </div>
  );
}