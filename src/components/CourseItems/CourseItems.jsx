import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Rating } from "react-simple-star-rating";
import RegisterButton from "../RegisterButton/RegisterButton";
import "./style.css";

export default function CourseItems(props) {
  const { maKhoaHoc, tenKhoaHoc, hinhAnh, luotXem } = props.course;
  const [rating, setRating] = useState(4);
  const navigate = useNavigate();

  return (
    <div className="card mb-3 text-center">
      <img src={hinhAnh} alt="" style={{ width: "100%", height: 150 }} />
      <p className="lead font-weight-bold">{tenKhoaHoc}</p>
      <p className="lead" style={{ fontSize: "1rem" }}>
        <Rating initialValue={rating} /> ({luotXem})
      </p>
      <p>
        <button
          className="btn btn-info mr-2"
          onClick={() => navigate(`/coursedetail/${maKhoaHoc}`)}
        >
          Xem chi tiết
        </button>
        <RegisterButton navigate={navigate} maKhoaHoc={maKhoaHoc} />
      </p>
    </div>
  );
}
