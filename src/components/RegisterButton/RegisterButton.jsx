import React from "react";
import { useNavigate } from "react-router-dom";
import { registerCourseApi } from "../../services/course";
import { getLocal } from "../../utils/index";

export default function RegisterButton(props) {
  const { navigate, maKhoaHoc } = props;
  const userCredentials = getLocal("userCredentials");
  const _navigate = useNavigate();
  return (
    <button
      className="btn btn-success"
      onClick={() => {
        if (userCredentials) {
          const registerInfo = {
            accessToken: userCredentials.accessToken,
            info: {
              maKhoaHoc,
              taiKhoan: userCredentials.taiKhoan,
            },
          };
          registerCourseApi(registerInfo)
            .then((res) => alert(res.data))
            .catch((err) => {
              alert(err.response.data);
            });
          navigate(`/coursedetail/${maKhoaHoc}`);
        } else {
          _navigate("/signin");
        }
      }}
    >
      Đăng ký
    </button>
  );
}
