import axios from 'axios';
import { useFormik } from 'formik';
import React from 'react';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import * as Yup from 'yup';
import { ACCESS_TOKEN, CYBERSOFT_TOKEN, GROUP_ID } from '../../constant';
import { getLocal } from '../../utils';
import './MyInfo.scss';



function MyInfo() {
    const { userProfile } = useSelector(state => state.UserReducer);
    const { email, hoTen, soDT, soDt, taiKhoan, matKhau, maLoaiNguoiDung } = userProfile;

    const regex = {
        phone: /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
    }

    const schema = Yup.object({
        matKhau: Yup.string()
            .required('Mật khẩu không được để trống').trim()
            .min(2, 'Phải ít nhất 2 ký tự')
            .max(10, 'Không quá 10 ký tự'),
        hoTen: Yup.string()
            .required('Họ tên không được để trống').trim()
            .min(5, 'Phải ít nhất 5 ký tự')
            .max(20, 'Không quá 20 ký tự'),
        soDT: Yup.string()
            .matches(regex.phone, 'Số ĐT không hợp lệ')
            .required('Số ĐT không được để trống').trim()
            .max(10, 'Không quá 10 ký tự'),
        email: Yup.string()
            .email()
            .required('Email không được để trống').trim(),
    })

    const formik = useFormik({
        initialValues: {
            email: email,
            hoTen: hoTen,
            soDT: soDT,
            taiKhoan: taiKhoan,
            matKhau: matKhau,
            maLoaiNguoiDung: maLoaiNguoiDung,
            maNhom: GROUP_ID,
        },
        validationSchema: schema,
        onSubmit: async (values) => {
            if (!formik.dirty) {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Chưa có gì để thay đổi ',
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
                        taiKhoan: values.taiKhoan,
                        matKhau: values.matKhau,
                        hoTen: values.hoTen,
                        soDT: values.soDT,
                        maLoaiNguoiDung: values.maLoaiNguoiDung,
                        maNhom: GROUP_ID,
                        email: values.email,
                    },
                    headers: {
                        Authorization: `Bearer ${getLocal(ACCESS_TOKEN)}`,
                        TokenCybersoft: `${CYBERSOFT_TOKEN}`,
                    }
                })
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Cập nhật thành công !',
                    showConfirmButton: false,
                    timer: 1500
                })
            } catch (err) {
                console.log(err)
            }
        },
        enableReinitialize: true,
    })

    return (
        <div className="information_area">
            <form onSubmit={formik.handleSubmit}>
                <div className="right_detail row">
                    <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-right">
                        <div className="form-group">
                            <label className='label_form' htmlFor="email">Email :</label>
                            <input disabled type="text" className='form-control input_form' placeholder='Email' id='email' name='email'
                                value={email}
                                />
                        </div>
                        <div className="form-group">
                            <label className='label_form' htmlFor="hoTen">Họ Tên :</label>
                            <input type="text" className='form-control input_form' placeholder='Họ Tên' id='hoTen' name='hoTen'
                                value={formik.values.hoTen  && !formik.touched.hoTen ? hoTen : formik.values.hoTen}
                                {...formik.getFieldProps('hoTen')}
                            />
                            {formik.errors.hoTen && formik.touched.hoTen && <p className='text-error'>{formik.errors.hoTen}</p>}
                        </div>
                        <div className="form-group">
                            <label className='label_form' htmlFor="soDT">Điện thoại :</label>
                            <input type="text" className='form-control input_form' placeholder='Điện thoại' id='soDT' name='soDT'
                                {...formik.getFieldProps('soDT')}
                                value={formik.values.soDT === '' && !formik.touched.soDT ? soDT || soDt : formik.values.soDT}
                            />
                            {formik.errors.soDT && formik.touched.soDT && <p className='text-error'>{formik.errors.soDT}</p>}
                        </div>
                    </div>

                    <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-right col-right-relative">
                        <div className="form-group">
                            <label className='label_form' htmlFor="taiKhoan">Tài Khoản :</label>
                            <input disabled type="text" className='form-control input_form' placeholder='Tài Khoản' id='taiKhoan' name='taiKhoan'
                                // {...formik.getFieldProps('taiKhoan')}
                                value={taiKhoan}
                            />
                        </div>
                        <div className="form-group">
                            <label className='label_form' htmlFor="matKhau">Mật Khẩu :</label>
                            <input type="text" className='form-control input_form' placeholder='Mật Khẩu' id='matKhau' name='matKhau'
                                {...formik.getFieldProps('matKhau')}
                                value={formik.values.matKhau === '' && !formik.touched.matKhau ? matKhau : formik.values.matKhau}
                            />
                            {formik.errors.matKhau && formik.touched.matKhau && <p className='text-error'>{formik.errors.matKhau}</p>}
                        </div>
                        <div className="form-group m-0 d-flex justify-content-center align-items-center">
                            <button type='submit' className='card-botton'>Cập Nhật</button>
                        </div>

                    </div>
                </div>

            </form>
        </div>

    )

}



export default MyInfo