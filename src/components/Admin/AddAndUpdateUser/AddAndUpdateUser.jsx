import React from 'react';
import './AddAndUpdateUser.scss';
import { NavLink } from "react-router-dom";
import axios from 'axios';
import { useFormik } from 'formik';
import Swal from 'sweetalert2';
import * as Yup from 'yup';



function AddAndUpdateUser({ title, buttonText, onSubmit }) {

    // const regex = {
    //     phone: /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
    // }

    // const schema = Yup.object({
    //     taiKhoan: Yup.string()
    //         .required('Tài khoản không được để trống').trim()
    //         .min(2, 'Phải ít nhất 2 ký tự')
    //         .max(10, 'Không quá 10 ký tự'),
    //     matKhau: Yup.string()
    //         .required('Mật khẩu không được để trống').trim()
    //         .min(2, 'Phải ít nhất 2 ký tự')
    //         .max(10, 'Không quá 10 ký tự'),
    //     hoTen: Yup.string()
    //         .required('Họ tên không được để trống').trim()
    //         .min(5, 'Phải ít nhất 2 ký tự')
    //         .max(20, 'Không quá 10 ký tự'),
    //     soDT: Yup.string()
    //         .matches(regex.phone, 'Số ĐT không hợp lệ')
    //         .required('Số ĐT không được để trống').trim()
    //         .max(10, 'Không quá 10 ký tự'),
    //     email: Yup.string()
    //         .email()
    //         .required('Email không được để trống').trim(),
    // })

    // const formik = useFormik({
    //     initialValues: {
    //         taiKhoan: '',
    //         matKhau: '',
    //         hoTen: '',
    //         soDT: '',
    //         email: '',
    //     },

    //     validationSchema: schema,

    //     onSubmit: (values) => {
    //         onSubmit(values); 
    //     },

    // })





    // return (
    //     <div className='container'>
    //         <div className="title">
    //             <h1>{title}</h1>
    //         </div>
    //         <div className="content">
    //             <form onSubmit={onSubmit}>
    //                 <div className="row">
    //                     <div className="col-md-6 col-item">
    //                         <div class="form-group">
    //                             <input type="text" name="taiKhoan"
    //                                 value={formik.values.taiKhoan}
    //                                 {...formik.getFieldProps('taiKhoan')}
    //                             />
    //                             {/* required */}
    //                             <span class="highlight"></span>
    //                             <label for="taiKhoan">Tài khoản:</label>
    //                         </div>
    //                     </div>
    //                     <div className="col-md-6 col-item">
    //                         <div class="form-group">
    //                             <input type="text" name="email"
    //                                 value={formik.values.email}
    //                                 {...formik.getFieldProps('email')}
    //                             />
    //                             <span class="highlight"></span>
    //                             <label for="email">Email :</label>
    //                         </div>

    //                     </div>
    //                     <div className="col-md-6 col-item">
    //                         <div class="form-group">
    //                             <input type="text" name="matKhau"
    //                                 {...formik.getFieldProps('matKhau')}
    //                             />
    //                             <span class="highlight"></span>
    //                             <label for="matKhau">Mật khẩu:</label>
    //                         </div>

    //                     </div>
    //                     <div className="col-md-6 col-item">
    //                         <div class="form-group">
    //                             <input type="text" name="soDT"
    //                                 {...formik.getFieldProps('soDT')}
    //                             />
    //                             <span class="highlight"></span>
    //                             <span class="bar"></span>
    //                             <label for="soDT">Số điện thoại:</label>
    //                         </div>
    //                     </div>
    //                     <div className="col-md-6 col-item">
    //                         <div class="form-group">
    //                             <input type="text" name="hoTen"
    //                                 {...formik.getFieldProps('hoTen')}
    //                             />
    //                             <span class="highlight"></span>
    //                             <label for="hoTen">Họ Tên:</label>
    //                         </div>
    //                     </div>

    //                     <div className="col-md-6 col-item">
    //                         <div className="form-group form-type">
    //                             <div className='type-user mb-0 mr-3'>Loại người dùng: </div>
    //                             <select className="form-select" >
    //                                 <option value=''>Vui lòng chọn người dùng</option>
    //                                 <option value="GV">Giáo Viên</option>
    //                                 <option value="HV">Học Viên</option>
    //                             </select>
    //                         </div>
    //                     </div>


    //                     {/* </div> */}
    //                 </div>


    //                 <div className='footer'>
    //                     <button className="button-back">
    //                         <NavLink to='/admin/usermanagement'>
    //                             <i className="fa fa-arrow-left mr-3"></i>
    //                             <span className="back arrow">Trở lại</span>
    //                         </NavLink>
    //                     </button>
    //                     <button className='btn-add'>{buttonText}</button>
    //                 </div>
    //             </form>
    //         </div>
    //     </div>
    // )
}

export default AddAndUpdateUser