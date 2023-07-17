import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CoursesRender from "../../components/CoursesRender/CoursesRender";
import { getCourses } from "../../redux/reducers/courseReducer";
import { courseSelector } from "../../redux/selectors/selectors";
import { getCoursesApi } from "../../services/course";
import Cover from "../../components/Cover/Cover";
import "./Home.scss";
import HomeInfo from "../../components/HomeInfo/HomeInfo";
import HomeFeedBack from "../../components/HomeFeedBack/HomeFeedBack";

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
      <Cover />
      <section className="content py-5">
        <h2 className="text-center my-5">CÁC KHÓA HỌC MỚI NHẤT</h2>
        {renderCourses(8)}
      </section>
      {/* #f4f8ff */}
      <HomeInfo />
      <HomeFeedBack />
    </>
  );
}
