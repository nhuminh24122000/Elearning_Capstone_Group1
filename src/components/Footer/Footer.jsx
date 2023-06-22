import React from "react";
import { NavLink } from "react-router-dom";
import LogoFooter from '../../assets/img/cyberlogo-white.png'

// SCSS
import "./Footer.scss";

export default function Footer() {
  return (
    <footer>
      <div className="wrapper pt-5 pb-4">
        <div className="container">
          <div className="row g-4">
            <div className="footer-left col col-lg-4 col-md-4 col-sm-6 col-12">
              <div className="px-5">
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
            <div className="col col-lg-4 col-md-4 col-sm-6 col-12">
              <div className="border-end border-start border-sencondary px-5">
                <h2>VỀ CYBERSOFT</h2>
                <ul>
                  <li>
                    <NavLink to="/">Courses</NavLink>
                  </li>
                  <li>
                    <NavLink to="/">About</NavLink>
                  </li>
                  <li>
                    <NavLink to="/">Contact</NavLink>
                  </li>
                  <li>
                    <NavLink to="/">Help Desk</NavLink>
                  </li>
                </ul>
              </div>
            </div>
            <div className="footer-newsletter col col-lg-4 col-md-4 col-sm-12 col-12">
              <h2>NEWSLETTER</h2>
              <p>
                Subscribe to our mailing list and get updates to your email inbox.
              </p>
              <div class="footer-input">
                <input
                  type="email"
                  name="email"
                  id=""
                  placeholder="Email Address"
                />
                <i class="fa-solid fa-paper-plane"></i>
              </div>
              <ul class="d-flex align-items-center mt-4">
                <li><a href="#"><i class="fab fa-facebook-f"></i></a></li>
                <li><a href="#"><i class="fab fa-linkedin-in"></i></a></li>
                <li><a href="#"><i class="fab fa-twitter"></i></a></li>
                <li><a href="#"><i class="fab fa-google"></i></a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="rectangle">
        <div className="text-center pt-3 pb-2">
          <p>
            © 2022 Cybersoft All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
}