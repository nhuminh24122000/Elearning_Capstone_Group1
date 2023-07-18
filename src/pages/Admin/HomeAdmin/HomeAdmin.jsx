import React from "react";
import "./HomeAdmin.scss";
import SignIn from "../../SignIn/SignIn";
import { getLocal } from "../../../utils";
import { ACCESS_TOKEN } from "../../../constant";
import BarChart from "../../../components/BarChart/BarChart";
import PieChart from "../../../components/PieChart/PieChart";

function HomeAdmin() {
  return (
    <>
      {getLocal(ACCESS_TOKEN) ? (
        <>
          <div className="wrapper">
            <h2>Tổng quan</h2>
            <ul className="list-unstyled d-flex align-items-center justify-content-center">
              <li className="media">
                <i class="fa-solid fa-user-graduate"></i>
                <div className="media-body text-right">
                  <h5 className="mt-0 mb-1">Tổng số học viên</h5>
                  <p>5</p>
                </div>
              </li>
              <li className="media my-4">
                <i class="fa-solid fa-user-tie"></i>
                <div className="media-body text-right">
                  <h5 className="mt-0 mb-1">Tổng số giảng viên</h5>
                  <p>15</p>
                </div>
              </li>
              <li className="media">
                <i class="fa-solid fa-book-open"></i>
                <div className="media-body text-right">
                  <h5 className="mt-0 mb-1">Tổng số khóa học</h5>
                  <p>35</p>
                </div>
              </li>
              <li className="media">
                <i class="fa-solid fa-sack-dollar"></i>
                <div className="media-body text-right">
                  <h5 className="mt-0 mb-1">Tổng doanh thu</h5>
                  <p>55</p>
                </div>
              </li>
            </ul>
            <div>
              <h2 className="mt-5">Doanh thu</h2>
              <div className="d-flex mt-4">
                <div className="bar col-6 mr-4">
                  <BarChart />
                </div>
                <div className="pie col-6">
                  <PieChart />
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <SignIn />
      )}
    </>
  );
}

export default HomeAdmin;
