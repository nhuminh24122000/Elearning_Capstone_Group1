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
                        <h1>Tổng quan</h1>
                        <div className="row list-unstyled d-flex align-items-center justify-content-center">
                            <div className="col-md-6 col-xl-3 ">
                                <div className="media">
                                    <i class="fa-solid fa-user-graduate"></i>
                                    <h2 className="mt-0">Tổng số học viên: 5</h2>
                                </div>
                            </div>
                            <div className="col-md-6 col-xl-3 ">
                                <li className="media">
                                    <i class="fa-solid fa-user-tie"></i>
                                    <h2 className="mt-0">Tổng số giảng viên: 15</h2>
                                </li>
                            </div>
                            <div className="col-md-6 col-xl-3 ">
                                <li className="media">
                                    <i class="fa-solid fa-book-open"></i>
                                    <h2 className="mt-0">Tổng số khóa học: 35</h2>
                                </li>
                            </div>
                            <div className="col-md-6 col-xl-3 ">
                                <li className="media">
                                    <i class="fa-solid fa-sack-dollar"></i>
                                    <h2 className="mt-0">Tổng doanh thu: 55</h2>
                                </li>
                            </div>
                        </div>

                        <div>
                            <h1 className="mt-5">Doanh thu</h1>
                            <div className="row ">
                                <div className="col-12 col-sm-6 col-bar">
                                    <div className="bar" >
                                        <BarChart />
                                    </div>
                                </div>
                                <div className="col-12 col-sm-6 col-pie">
                                    <div className="pie ">
                                        <PieChart />
                                    </div>
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
