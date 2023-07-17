import React from "react";
import { NavLink } from "react-router-dom";
import LogoFooter from "../../assets/img/cyberlogo-white.png";
import "./Footer.scss";

export default function Footer() {
  return (
    <footer>
      <div className="wrapper">
        <div className="container">
          <div className="row g-4">
            <div className="footer-left col col-lg-4 col-md-4 col-sm-6 col-12">
              <div className="">
                <img src={LogoFooter} alt="" />
                <ul>
                  <li>
                    <i class="fa-solid fa-phone"></i>
                    <span>096.105.1014</span>
                  </li>
                  <li>
                    <i class="fa-solid fa-envelope"></i>
                    <span>cyberSoft@gmail.com</span>
                  </li>
                  <li>
                    <i class="fa-solid fa-location-dot"></i>
                    <span>103 Nguyễn Hữu Dật, Hải Châu, ĐN</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col col-lg-4 col-md-4 col-sm-6 col-12 my-5 my-sm-0">
              <div className="border-end border-start border-secondary px-md-5">
                <h2>VỀ CYBERSOFT</h2>
                <ul>
                  <li>
                    <NavLink to="/coursecategories/BackEnd">Khóa học</NavLink>
                  </li>
                  <li>
                    <NavLink to="/">Giới thiệu</NavLink>
                  </li>
                  <li>
                    <NavLink to="/">Liên hệ</NavLink>
                  </li>
                  <li>
                    <NavLink to="/">Điều khoản dịch vụ</NavLink>
                  </li>
                </ul>
              </div>
            </div>
            <div className="footer-newsletter col col-lg-4 col-md-4 col-sm-12 col-12 mt-sm-5 mt-md-0">
              <h2>Thư Tin</h2>
              <p>
                Theo dõi danh sách gửi thư của chúng tôi và nhận thông tin cập
                nhật vào hộp thư đến email của bạn.
              </p>
              <div class="footer-input d-flex align-items-center my-4">
                <input
                  type="email"
                  name="email"
                  id=""
                  placeholder="Địa chỉ Email"
                />
                <i class="fa-solid fa-paper-plane"></i>
              </div>
              <ul class="d-flex align-items-center mt-4">
                <li>
                  <a href="#">
                    <i class="fab fa-facebook-f"></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i class="fab fa-linkedin-in"></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i class="fab fa-twitter"></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i class="fab fa-google"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom container">
        <div className="pt-3 pb-2">
          <p>
            © 2018 - 2023 CyberSoft. Trung tâm dạy học lập trình hàng đầu Việt
            Nam
          </p>
        </div>
      </div>
    </footer>
  );
}
