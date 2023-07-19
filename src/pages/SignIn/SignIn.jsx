import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./SignIn.scss";
import SignInImage from "../../assets/img/signinimage.png";
import { useFormik } from "formik";
import * as Yup from "yup";
import { axiosWithAuth } from "../../services/config.services";
import { getLocal, saveLocal } from "../../utils";
import { ACCESS_TOKEN, CYBERSOFT_TOKEN } from "../../constant";
import { Input } from "antd";
import { setUserProfile } from "../../redux/reducers/userReducer";
import axios from "axios";
import { useDispatch } from "react-redux";
import Swal from 'sweetalert2';


// Validate Yup form
const schemaSignIn = Yup.object({
  taiKhoan: Yup.string()
    .required("Tài khoản phải được điền vào ô")
    .min(2, "Phải ít nhất 2 ký tự")
    .max(10, "Không quá 10 ký tự"),
  matKhau: Yup.string()
    .required("Mật khẩu phải được điền vào ô")
    .min(2, "Phải ít nhất 2 ký tự")
    .max(10, "Không quá 10 ký tự"),
});

function SignIn(props) {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
    },

    validationSchema: schemaSignIn,

    onSubmit: async (values) => {
      console.log(values);
      try {
        const resp = await axiosWithAuth.post("QuanLyNguoiDung/DangNhap", {
          taiKhoan: values.taiKhoan,
          matKhau: values.matKhau,
        });
        console.log(resp);

        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Đăng nhập tài khoản thành công! ',
          showConfirmButton: false,
          timer: 1500
      })
        saveLocal(ACCESS_TOKEN, resp.data.accessToken);
        setTimeout(() => {
          navigate("/userinfo");
        }, 1500);

      } catch (err) {
        console.log(err);
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Đăng nhập tài khoản thất bại, xin vui lòng thử lại ',
          showConfirmButton: false,
          timer: 1500
      })
      }
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="signin-wrapper">
        <div className="signin-container">
          <img src={SignInImage} alt="" />
          <h1>Đăng Nhập</h1>
          <div className="form-group">
            <i className="fa-solid fa-user"></i>
            <input
              type="text"
              placeholder="Tài khoản"
              name="taiKhoan"
              {...formik.getFieldProps("taiKhoan")}
            />
          </div>
          {formik.errors.taiKhoan && formik.touched.taiKhoan && (
            <span className="error-message">{formik.errors.taiKhoan}</span>
          )}
          <div className="form-group mt-xl-5 mt-4">
            <i className="fa-solid fa-lock"></i>
            <Input.Password
              className="passwordAntd"
              name="matKhau"
              placeholder="Mật khẩu"
              {...formik.getFieldProps("matKhau")}
            />
          </div>
          {formik.errors.matKhau && formik.touched.matKhau && (
            <span className="error-message">{formik.errors.matKhau}</span>
          )}
          <div className="mt-4 d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <input type="checkbox" name="" id="" />
              <span className="remember">Ghi nhớ tài khoản</span>
            </div>
            <NavLink>Quên mật khẩu?</NavLink>
          </div>
          <div className="text-center">
            <button type="submit" className="btn-sign-in">
              Đăng Nhập
            </button>
          </div>
          <p className="text-center">
            Chưa có tài khoản? <NavLink to={"/signup"}>Đăng Ký</NavLink>
          </p>
        </div>
      </div>
    </form>
  );
}

export default SignIn;
