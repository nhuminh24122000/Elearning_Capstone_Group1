import React from "react";
import { NavLink } from "react-router-dom";
import "./Cover.scss";
import HomeImage1 from "../../assets/img/HomeImage1.png";

export default function Cover() {
  return (
    <section className="cover">
      <div className="container d-flex align-items-center">
        <div className="cover-image col-7 d-none d-sm-block">
          <img src={HomeImage1} alt="" />
        </div>
        <div className="cover__content col-12 col-sm-5">
          <h1>
            KHỞI ĐẦU
            <br />
            SỰ NGHIỆP
            <br />
            CỦA BẠN
          </h1>
          <p>Trở thành lập trình chuyên nghiệp tại CyberLearn!</p>
          <NavLink to="/coursecategories/BackEnd" className="btn btn-1">
            Xem khóa học
          </NavLink>
          <NavLink to="/" className="btn btn-2">
            Tư vấn học
          </NavLink>
        </div>
      </div>
    </section>
  );
}
