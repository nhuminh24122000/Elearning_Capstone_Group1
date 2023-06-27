import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Carousel from "../../components/Carousel/Carousel";
import CoursesRender from "../../components/CoursesRender/CoursesRender";
import { getCourses } from "../../redux/reducers/courseReducer";
import { courseSelector } from "../../redux/selectors/selectors";
import { getCoursesApi } from "../../services/course";
import Carts from "../../components/Carts/Carts";

export default function Home() {
  const dispatch = useDispatch();
  const courseList = useSelector(courseSelector).courses;

  useEffect(() => {
    getCoursesApi()
      .then((res) => {
        dispatch(getCourses(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const renderCourses = (courseQuantities) => {
    let courses = [];
    if (courseList.length) {
      for (let index = 0; index < courseQuantities; index++) {
        courses.push(courseList[index]);
      }
    }
    return <CoursesRender courseList={courses} />;
  };

  return (
    <>
      <Carousel />
      <section className="content mt-4">
        <h3 className="container text-left my-5">Các khoá học mới nhất</h3>
        {renderCourses(8)}
      </section>
    </>
  );
}
