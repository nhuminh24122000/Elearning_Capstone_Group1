import { Empty } from "antd";
import React from "react";
import CourseItem from "../CourseItem/CourseItem";
import './CoursesList.scss';

export default function CoursesList(props) {
  const { coursesList } = props;

  const isEmpty = () => {
    if(coursesList && coursesList.length > 0) {
      return coursesList.map((item, index) => {
        return (
          <div
            className="col-12 py-2"
            key={index}
            style={{
              borderTop: "1px solid black",
              backgroundColor: "#f8f9fa",
            }}
          >
            <div className="row" style={{ margin: '3.5rem 0' }}>

              <CourseItem item={item}/>

            </div>
          </div>
        );

      })
    } else {
      return (
        <div style={{margin: '3rem 0'}}>
          <Empty />
        </div>

      )
    }
  }

  return (
    <div className="row justify-content-center">
      {isEmpty()}
    </div>
  );
}
