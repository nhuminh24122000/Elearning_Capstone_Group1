import React from 'react';
import './UserUpdate.scss';
import axios from 'axios';
import { ACCESS_TOKEN, CYBERSOFT_TOKEN, GROUP_ID } from '../../../../constant';
import { NavLink, useParams } from "react-router-dom";
import { useFormik } from 'formik';
import Swal from 'sweetalert2';
import * as Yup from 'yup';
import { useSelector } from 'react-redux'
import { getLocal } from '../../../../utils';


function UserUpdate() {
    const params = useParams();
    console.log('params',params)
    const { listUserAdmin } = useSelector(state => state.UserAdminReducer);
    console.log('listUserAdmin',listUserAdmin)

    const listItem = listUserAdmin && listUserAdmin.find(item => item.taiKhoan === params.id)



    const { taiKhoan, email, matKhau, soDt, hoTen, maLoaiNguoiDung } = listItem;

    const regex = {
        phone: /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
    }


    const schema = Yup.object({
        matKhau: Yup.string()
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
            .email('Email không hợp lệ')
            .required('Email không được để trống').trim(),
        maLoaiNguoiDung: Yup.string().required('Vui lòng chọn người dùng'),
    })


    const formik = useFormik({
        initialValues: {
            taiKhoan: taiKhoan,
            matKhau: matKhau,
            hoTen: hoTen,
            soDT: soDt,
            email: email,
            maLoaiNguoiDung: maLoaiNguoiDung,
        },

        validationSchema: schema,

        onSubmit: async (values) => {
            if(!formik.dirty) {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Vui lòng thay đổi thông tin cần cập nhật',
                    showConfirmButton: false,
                    timer: 1500
                })
                return
            }

            try {
                const resp = await axios({
                    method: 'put',
                    url: 'https://elearningnew.cybersoft.edu.vn/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung',
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
                    title: 'Cập nhật thành công',
                    showConfirmButton: false,
                    timer: 1500
                })

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
        }


    })


    return (
        <div className='container'>
            <div className="title">
                <h1>Cập Nhật Người Dùng</h1>
            </div>
            <div className="content">
                <form noValidate onSubmit={formik.handleSubmit}>
                    <div className="row">
                        <div className="col-md-6 col-item">
                            <div className="form-group">
                                <input required type="text" name="taiKhoan" id='taiKhoan' style={{ cursor: 'no-drop' }} className="disabled-input"
                                    {...formik.getFieldProps('taiKhoan')}
                                />
                                <span className="highlight"></span>
                                <label className='label-admin' for="taiKhoan">Tài khoản:</label>
                            </div>
                        </div>
                        <div className="col-md-6 col-item">
                            <div className="form-group">
                                <input required type="text" name="email"
                                    // value={formik.values.email === '' && !formik.touched.email ? email : formik.values.email}
                                    {...formik.getFieldProps('email')}
                                />
                                {formik.errors.email && formik.touched.email && <p className='text-error'>{formik.errors.email}</p>}
                                <span className="highlight"></span>
                                <label className='label-admin' for="email">Email :</label>
                            </div>

                        </div>
                        <div className="col-md-6 col-item">
                            <div className="form-group">
                                <input required type="text" name="matKhau"
                                    {...formik.getFieldProps('matKhau')}
                                    value={formik.values.matKhau === undefined && !formik.touched.matKhau ? '************' : formik.values.matKhau}
                                />
                                {formik.errors.matKhau && formik.touched.matKhau && <p className='text-error'>{formik.errors.matKhau}</p>}
                                <span className="highlight"></span>
                                <label className='label-admin' for="matKhau">Mật khẩu:</label>
                            </div>

                        </div>
                        <div className="col-md-6 col-item">
                            <div className="form-group">
                                <input required type="text" name="soDT"
                                    // value={formik.values.soDT === '' && !formik.touched.soDT ? soDt : formik.values.soDT}
                                    {...formik.getFieldProps('soDT')}
                                />
                                {formik.errors.soDT && formik.touched.soDT && <p className='text-error'>{formik.errors.soDT}</p>}
                                <span className="highlight"></span>
                                <label className='label-admin' for="soDT">Số điện thoại:</label>
                            </div>
                        </div>
                        <div className="col-md-6 col-item">
                            <div className="form-group">
                                <input required type="text" name="hoTen"
                                    // value={formik.values.hoTen === '' && !formik.touched.hoTen ? hoTen : formik.values.hoTen}
                                    {...formik.getFieldProps('hoTen')}
                                />
                                {formik.errors.hoTen && formik.touched.hoTen && <p className='text-error'>{formik.errors.hoTen}</p>}
                                <span class="highlight"></span>
                                <label className='label-admin' for="hoTen">Họ Tên:</label>
                            </div>
                        </div>

                        <div className="col-md-6 col-item">
                            <div className="form-group form-type">
                                <div className='d-flex'>
                                    <div className='type-user mb-0 mr-3'>Loại người dùng: </div>
                                    <select className="form-select"
                                        value={formik.values.maLoaiNguoiDung === '' && !formik.touched.maLoaiNguoiDung ? maLoaiNguoiDung.toUpperCase() : formik.values.maLoaiNguoiDung} onChange={(e) => formik.setFieldValue('maLoaiNguoiDung', e.target.value)}
                                    >
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
                    </div>


                    <div className='footer'>
                        <button className="button-back">
                            <NavLink to='/admin/usermanagement'>
                                <i className="fa fa-arrow-left mr-3"></i>
                                <span className="back arrow">Trở lại</span>
                            </NavLink>
                        </button>
                        <button type='submit' className='btn-add'>Cập nhật</button>
                    </div>
                </form>
            </div>
        </div>
    )

}

export default UserUpdate