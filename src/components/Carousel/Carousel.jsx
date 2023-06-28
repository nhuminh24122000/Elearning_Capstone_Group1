import React from "react";
import { NavLink } from "react-router-dom";

import "./Carousel.scss";

export default function Carousel() {
  return (
    // <div className="carousel">
    //   <div className="videoContainer">
    //     <iframe src="https://www.youtube-nocookie.com/embed/kcSEsljlges?controls=0&autoplay=1&mute=1&playsinline=1&playlist=kcSEsljlges&loop=1" />
    //   </div>
    // </div>

    <section className="cover">
      <div className="cover__content">
        <h1>KHỞI ĐẦU
          <br/>SỰ NGHIỆP
          <br/>CỦA BẠN
        </h1>
        <p>
          Trở thành lập trình
          <br />
          chuyên nghiệp tại CyberLearn!
        </p>
        <NavLink to="/coursecategories/BackEnd" className='btn btn-1'>Xem khóa học</NavLink>
        <NavLink to="/" className='btn btn-2'>Tư vấn học</NavLink>
      </div>
    </section>
  );
}