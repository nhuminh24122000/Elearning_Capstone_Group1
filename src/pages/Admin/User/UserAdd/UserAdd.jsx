import React from 'react';
import './UserAdd.scss';
// import AddAndUpdateUser from '../../../../components/Admin/AddAndUpdateUser/AddAndUpdateUser';
import axios from 'axios';
import { getLocal } from '../../../../utils';
import { ACCESS_TOKEN, CYBERSOFT_TOKEN, GROUP_ID } from '../../../../constant';
import { NavLink } from "react-router-dom";
import { useFormik } from 'formik';
import Swal from 'sweetalert2';
import * as Yup from 'yup';


function UserAdd() {

    const regex = {
        phone: /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
    }

    const schema = Yup.object({
        taiKhoan: Yup.string()
            .required('Tài khoản không được để trống').trim()
            .min(3, 'Phải ít nhất 3 ký tự')
            .max(12, 'Không quá 12 ký tự'),
        matKhau: Yup.string()
            .required('Mật khẩu không được để trống').trim()
            .min(3, 'Phải ít nhất 3 ký tự')
            .max(12, 'Không quá 12 ký tự'),
        hoTen: Yup.string()
            .required('Họ tên không được để trống').trim()
            .min(3, 'Phải ít nhất 3 ký tự')
            .max(20, 'Không quá 20 ký tự'),
        soDT: Yup.string()
            .matches(regex.phone, 'Số ĐT không hợp lệ')
            .required('Số ĐT không được để trống').trim()
            .max(10, 'Không quá 12 ký tự'),
        email: Yup.string()
            .email()
            .required('Email không được để trống').trim(),
        maLoaiNguoiDung: Yup.string().required('Vui lòng chọn người dùng'),



    })

    const formik = useFormik({
        initialValues: {
            taiKhoan: '',
            matKhau: '',
            hoTen: '',
            soDT: '',
            email: '',
            maLoaiNguoiDung: ''
        },

        validationSchema: schema,

        onSubmit: async (values) => {
            console.log('values',values)
            try {
                const resp = await axios({
                    method: 'post',
                    url: 'https://elearningnew.cybersoft.edu.vn/api/QuanLyNguoiDung/ThemNguoiDung',
                    data: {
                        "taiKhoan": values.taiKhoan,
                        "matKhau": values.matKhau,
                        "hoTen": values.hoTen,
                        "soDT": values.soDT,
                        'maLoaiNguoiDung': values.maLoaiNguoiDung,
                        "maNhom": GROUP_ID,
                        "email": values.email
                    },
                    headers: {
                        Authorization: `Bearer ${getLocal(ACCESS_TOKEN)}`,
                        TokenCybersoft: `${CYBERSOFT_TOKEN}`,
                    }
                })
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Thêm người dùng thành công ',
                    showConfirmButton: false,
                    timer: 1500
                })
                formik.resetForm();
            } catch (err) {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: err.response.data,
                    showConfirmButton: false,
                    timer: 1500
                })
                console.log(err)
            }

        },

    })


    return (
        <div className='container'>
            <div className="title">
                <h1>Thêm Người Dùng</h1>
            </div>
            <div className="content">
                <form onSubmit={formik.handleSubmit} noValidate >
                    <div className="row">
                        <div className="col-md-6 col-item">
                            <div class="form-group">
                                <input required type="text" name="taiKhoan" id='taiKhoan' 
                                    value={formik.values.taiKhoan}
                                    {...formik.getFieldProps('taiKhoan')}
                                />
                                
                                {formik.errors.taiKhoan && formik.touched.taiKhoan && <p className='text-error'>{formik.errors.taiKhoan}</p>}
                                <span class="highlight"></span>
                                <label for="taiKhoan">Tài khoản:</label>
                            </div>
                        </div>
                        <div className="col-md-6 col-item">
                            <div class="form-group">
                                <input required type="text" name="email"
                                    {...formik.getFieldProps('email')}
                                />
                                {formik.errors.email && formik.touched.email && <p className='text-error'>{formik.errors.email}</p>}
                                <span class="highlight"></span>
                                <label for="email">Email :</label>
                            </div>

                        </div>
                        <div className="col-md-6 col-item">
                            <div class="form-group">
                                <input required type="text" name="matKhau"
                                    {...formik.getFieldProps('matKhau')}
                                />
                                {formik.errors.matKhau && formik.touched.matKhau && <p className='text-error'>{formik.errors.matKhau}</p>}
                                <span class="highlight"></span>
                                <label for="matKhau">Mật khẩu:</label>
                            </div>

                        </div>
                        <div className="col-md-6 col-item">
                            <div class="form-group">
                                <input required type="text" name="soDT"
                                    {...formik.getFieldProps('soDT')}
                                />
                                {formik.errors.soDT && formik.touched.soDT && <p className='text-error'>{formik.errors.soDT}</p>}
                                <span class="highlight"></span>
                                <span class="bar"></span>
                                <label for="soDT">Số điện thoại:</label>
                            </div>
                        </div>
                        <div className="col-md-6 col-item">
                            <div class="form-group">
                                <input required type="text" name="hoTen"
                                    {...formik.getFieldProps('hoTen')}
                                />
                                {formik.errors.hoTen && formik.touched.hoTen && <p className='text-error'>{formik.errors.hoTen}</p>}
                                <span class="highlight"></span>
                                <label for="hoTen">Họ Tên:</label>
                            </div>
                        </div>

                        <div className="col-md-6 col-item">
                            <div className="form-group form-type">
                                <div className='d-flex'>
                                    <div className='type-user mb-0 mr-3'>Loại người dùng: </div>
                                    <select className="form-select" value={formik.values.maLoaiNguoiDung} onChange={(e) => formik.setFieldValue('maLoaiNguoiDung', e.target.value)}>
                                        <option value=''>Vui lòng chọn người dùng</option>
                                        <option value="GV">Giáo Viên</option>
                                        <option value="HV">Học Viên</option>
                                    </select>

                                </div>
                                {formik.errors.maLoaiNguoiDung && formik.touched.maLoaiNguoiDung && (
                                    <p className="text-error">{formik.errors.maLoaiNguoiDung}</p>
                                )}
                            </div>
                        </div>


                        {/* </div> */}
                    </div>


                    <div className='footer'>
                        <button className="button-back">
                            <NavLink to='/admin/usermanagement'>
                                <i className="fa fa-arrow-left mr-3"></i>
                                <span className="back arrow">Trở lại</span>
                            </NavLink>
                        </button>
                        <button type='submit' className='btn-add'>Thêm</button>
                    </div>
                </form>
            </div>
        </div>
    )

}

export default UserAdd