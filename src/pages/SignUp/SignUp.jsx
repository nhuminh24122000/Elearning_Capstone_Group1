import React from "react";
import SignUpImage from "../../assets/img/signupimage.png";
import GoogleIcon from "../../assets/img/googleicon.png";
import "./SignUp.scss";
import { NavLink, useNavigate } from "react-router-dom";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { axiosWithAuth } from "../../services/product.services";

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

// Validate Yup
const schemaSignUp = Yup.object({
  taiKhoan: Yup.string()
  .required('Tài khoản phải được điền vào ô').trim()
  .min(2, 'Phải ít nhất 2 ký tự')
  .max(10, 'Không quá 10 ký tự'),
  matKhau: Yup.string()
  .required('Mật khẩu phải được điền vào ô').trim()
  .min(2, 'Phải ít nhất 2 ký tự')
  .max(10, 'Không quá 10 ký tự'),
  xacNhanMatKhau: Yup.string()
  .required('Xác nhận mật khẩu phải được điền vào ô').trim()
  .oneOf([Yup.ref('matKhau')], 'Xác nhận mật khẩu phải trùng khớp')
  .min(2, 'Phải ít nhất 2 ký tự')
  .max(10, 'Không quá 10 ký tự'),
  hoTen: Yup.string()
  .required('Họ tên phải được điền vào ô').trim()
  .min(5, 'Phải ít nhất 2 ký tự')
  .max(20, 'Không quá 10 ký tự'),
  soDT: Yup.string()
  .matches(phoneRegExp, 'Số ĐT không hợp lệ')
  .required('Số ĐT phải được điền vào ô').trim()
  .max(10, 'Không quá 10 ký tự'),
  email: Yup.string()
  .email()
  .required('Email phải được điền vào ô').trim(),
})

function SignUp(props) {
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
      xacNhanMatKhau: "",
      hoTen: "",
      soDT: "",
      maNhom: "GP01",
      email: "",
    },

    validationSchema: schemaSignUp,

    onSubmit: async (values) => {
      console.log(values);
      try {
        const resp = await axiosWithAuth.post('QuanLyNguoiDung/DangKy',
        {
          taiKhoan: values.taiKhoan,
          matKhau: values.matKhau,  
          hoTen: values.hoTen,
          soDT: values.soDT,
          maNhom: values.maNhom,
          email: values.email,
        })
        console.log(resp);

        if (resp.status === 200) {
          props.showAlert('Đăng ký tài khoản thành công!', 'success')
        }
 
        setTimeout(() => {
          navigate('/signin')
        }, 1500);
      } catch (err) {
        console.log(err);
        props.showAlert('Đăng ký tài khoản thất bại, xin vui lòng nhập lại thông tin!', 'danger')
      }
    }
  })

  return (
    <form className="signup-wrapper" onSubmit={formik.handleSubmit}>
      <div className="signup-container row">
        <div className="signup-left col-7">
          <h1 className="text-center">Tạo tài khoản</h1>
          <div className="signup-form">
            <div className="form-left">
              <div className="form-group">
                <label>Tài Khoản</label>
                <input 
                type="text" 
                name="taiKhoan" 
                {...formik.getFieldProps('taiKhoan')}
                />
                {formik.errors.taiKhoan && formik.touched.taiKhoan && <p className="error-message">{formik.errors.taiKhoan}</p>}
              </div>
              <div className="form-group">
                <label>Mật Khẩu</label>
                <input 
                type="password" 
                name="matKhau" 
                {...formik.getFieldProps('matKhau')}
                />
                {formik.errors.matKhau && formik.touched.matKhau && <p className="error-message">{formik.errors.matKhau}</p>}
              </div>
              <div className="form-group">
                <label>Xác nhận mật khẩu</label>
                <input
                  type="password"
                  name="xacNhanMatKhau"
                  {...formik.getFieldProps('xacNhanMatKhau')}
                />
                {formik.errors.xacNhanMatKhau && formik.touched.xacNhanMatKhau && <p className="error-message">{formik.errors.xacNhanMatKhau}</p>}
              </div>
            </div>
            <div className="form-right">
              <div className="form-group">
                <label>Họ Tên</label>
                <input 
                type="text" 
                name="hoTen" 
                {...formik.getFieldProps('hoTen')}
                />
                {formik.errors.hoTen && formik.touched.hoTen && <p className="error-message">{formik.errors.hoTen}</p>}
              </div>
              <div className="form-group">
                <label>Email</label>
                <input 
                type="text" 
                name="email" 
                {...formik.getFieldProps('email')}
                />
                {formik.errors.email && formik.touched.email && <p className="error-message">{formik.errors.email}</p>}
              </div>
              <div className="form-group">
                <label>Số Điện Thoại</label>
                <input 
                type="text" 
                name="soDT" 
                {...formik.getFieldProps('soDT')}
                />
                {formik.errors.soDT && formik.touched.soDT && <p className="error-message">{formik.errors.soDT}</p>}
              </div>
            </div>
          </div>
          <div className="signup-agree mt-4">
            <input className="mt-3" type="checkbox" name="" id="" />
            <span className="ml-2">Tôi đồng ý với tất cả các tuyên bố trong <NavLink href="#">Điều khoản dịch vụ</NavLink></span>
          </div>
          <div className="group-button">
            <button type="submit" className="btn signup-account">
              <i className="fa-solid fa-circle-user"></i>
              <span>Tạo tài khoản</span>
            </button>
            <NavLink className='signup-google'>
              <img src={GoogleIcon} alt="" />
              <span>Đăng ký Google</span>
            </NavLink>
          </div>
        </div>
        <div className="signup-right col-5">
          <img src={SignUpImage} alt="" />
          Đã có tài khoản? <NavLink to={'/signin'}>Đăng nhập</NavLink>
        </div>
      </div>
    </form>
  );
}

export default SignUp;
