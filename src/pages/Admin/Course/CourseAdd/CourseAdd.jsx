import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Swal from 'sweetalert2';
import * as Yup from 'yup';
import { ACCESS_TOKEN, CYBERSOFT_TOKEN, GROUP_ID } from '../../../../constant';
import { getLocal } from '../../../../utils';
import './CourseAdd.scss';


function CourseAdd() {

    const [listCourseCategory, setListCourseCategory] = useState([]);

    const courseCategory = async () => {
        try {
            const resp = await axios({
                method: 'get',
                url: 'https://elearningnew.cybersoft.edu.vn/api/QuanLyKhoaHoc/LayDanhMucKhoaHoc',
                headers: {
                    TokenCybersoft: `${CYBERSOFT_TOKEN}`
                }
            })
            setListCourseCategory(resp.data)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        courseCategory()
    }, [])

    const regex = {
        numberRegex: /^[0-9]+$/,
        imageRegex: /\.(jpe?g|png|gif|bmp)$/i,
    }

    const schema = Yup.object({
        maKhoaHoc: Yup.string().required('Mã khóa học không được để trống'),
        tenKhoaHoc: Yup.string().required('Têm khóa học không được để trống'),
        danhGia: Yup.string().required('Đánh giá không được để trống').matches(regex.numberRegex, 'Đánh giá phải là 1 con số'),
        luotXem: Yup.string().required('Lượt xem không được để trống').matches(regex.numberRegex, 'Lượt xem phải là 1 con số'),
        nguoiTao: Yup.string().required('Người tạo không được để trống'),
        ngayTao: Yup.string().required('Ngày tạo phải đúng định dạng'),
        hinhAnh: Yup.string().required('Hình ảnh không được để trống').matches(regex.imageRegex, 'Hình ảnh phải có định dạng JPG, JPEG, PNG, GIF hoặc BMP'),
        danhMucKhoaHoc: Yup.string().required('Vui lòng chọn Danh mục khóa học'),
        moTa: Yup.string().required('Mô tả không được để trống'),

    })

    const formik = useFormik({
        initialValues: {
            maKhoaHoc: '',
            tenKhoaHoc: '',
            danhGia: '',
            luotXem: '',
            danhMucKhoaHoc: '',
            nguoiTao: '',
            ngayTao: '',
            hinhAnh: '',
            moTa: '',
            maNhom: '',
        },

        validationSchema: schema,

        onSubmit: async (values) => {
            try {
                const resp = await axios({
                    method: 'post',
                    url: 'https://elearningnew.cybersoft.edu.vn/api/QuanLyKhoaHoc/ThemKhoaHoc',
                    data: {
                        "maKhoaHoc": values.maKhoaHoc,
                        // "biDanh": "string",
                        "tenKhoaHoc": values.tenKhoaHoc,
                        "moTa": values.moTa,
                        "luotXem": values.luotXem,
                        "danhGia": values.danhGia,
                        "hinhAnh": values.hinhAnh,
                        "maNhom": GROUP_ID,
                        "ngayTao": values.ngayTao,
                        "maDanhMucKhoaHoc": values.danhMucKhoaHoc,
                        "taiKhoanNguoiTao": values.nguoiTao
                    },
                    headers: {
                        Authorization: `Bearer ${getLocal(ACCESS_TOKEN)}`,
                        TokenCybersoft: `${CYBERSOFT_TOKEN}`,
                    }
                })
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Thêm khóa học thành công ',
                    showConfirmButton: false,
                    timer: 1500
                })
                formik.resetForm()
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
                <h1>Thêm Khóa Học</h1>
            </div>
            <div className="content">
                <form noValidate onSubmit={formik.handleSubmit}>
                    <div className="row">
                        <div className="col-md-6 col-item">
                            <div className="form-group-admin">
                                <input className='input-admin' required type="text" name="maKhoaHoc"
                                    {...formik.getFieldProps('maKhoaHoc')}
                                />
                                {formik.errors.maKhoaHoc && formik.touched.maKhoaHoc && <p className='text-error'>{formik.errors.maKhoaHoc}</p>}
                                <span className="highlight"></span>
                                <label className='label-admin' for="maKhoaHoc">Mã khóa học:</label>
                            </div>
                        </div>
                        <div className="col-md-6 col-item">
                            <div className="form-group-admin">
                                <input className='input-admin' required type="text" name="danhGia"
                                    {...formik.getFieldProps('danhGia')}
                                />
                                {formik.errors.danhGia && formik.touched.danhGia && <p className='text-error'>{formik.errors.danhGia}</p>}
                                <span className="highlight"></span>
                                <label className='label-admin' for="danhGia">Đánh giá :</label>
                            </div>
                        </div>
                        <div className="col-md-6 col-item">
                            <div className="form-group-admin">
                                <input className='input-admin' required type="text" name="tenKhoaHoc"
                                    {...formik.getFieldProps('tenKhoaHoc')}
                                />
                                {formik.errors.tenKhoaHoc && formik.touched.tenKhoaHoc && <p className='text-error'>{formik.errors.tenKhoaHoc}</p>}
                                <span className="highlight"></span>
                                <label className='label-admin' for="tenKhoaHoc">Tên khóa học :</label>
                            </div>
                        </div>
                        <div className="col-md-6 col-item">
                            <div className="form-group-admin">
                                <input className='input-admin' required type="text" name="luotXem"
                                    {...formik.getFieldProps('luotXem')}
                                />
                                {formik.errors.luotXem && formik.touched.luotXem && <p className='text-error'>{formik.errors.luotXem}</p>}
                                <span className="highlight"></span>
                                <label className='label-admin' for="luotXem">Lượt xem :</label>
                            </div>
                        </div>
                        <div className="col-md-6 col-item">
                            <div className="form-group-admin form-type">
                                <div className='type-user mb-4 mr-3'>Danh mục khóa học: </div>
                                <select className="form-select select-category" value={formik.values.danhMucKhoaHoc} onChange={(e) => formik.setFieldValue('danhMucKhoaHoc', e.target.value)}>
                                    <option value=''>Vui lòng chọn khóa học</option>
                                    {listCourseCategory.map((item) => {
                                        return (
                                            <option key={item.maDanhMuc} value={item.maDanhMuc}>{item.tenDanhMuc}</option>
                                        )
                                    })}
                                </select>
                            {formik.errors.danhMucKhoaHoc && formik.touched.danhMucKhoaHoc && <p className='text-error'>{formik.errors.danhMucKhoaHoc}</p>}
                            </div>
                        </div>
                        <div className="col-md-6 col-item mt-3">
                            <div className='type-user mb-0 mr-3'>Ngày tạo: </div>
                            <div className="form-group-admin">
                                <input className='input-admin' type="date" name="ngayTao"
                                    {...formik.getFieldProps('ngayTao')}
                                />
                                {formik.errors.ngayTao && formik.touched.ngayTao && <p className='text-error'>{formik.errors.ngayTao}</p>}
                                <span className="highlight"></span>
                                {/* <label className='label-admin' for="ngayTao">Ngày tạo :</label> */}
                            </div>
                        </div>
                        <div className="col-md-6 col-item">
                            <div className="form-group-admin">
                                <input className='input-admin' required type="text" name="nguoiTao"
                                    {...formik.getFieldProps('nguoiTao')}
                                />
                                {formik.errors.nguoiTao && formik.touched.nguoiTao && <p className='text-error'>{formik.errors.nguoiTao}</p>}
                                <span className="highlight"></span>
                                <label className='label-admin' for="nguoiTao">Người tạo :</label>
                            </div>
                        </div>

                        <div className="col-md-6 col-item mt-3">
                            <div className="form-group-admin">
                                <input className='input-admin' required type="text" name="hinhAnh"
                                    {...formik.getFieldProps('hinhAnh')}
                                />
                                {formik.errors.hinhAnh && formik.touched.hinhAnh && <p className='text-error'>{formik.errors.hinhAnh}</p>}
                                <span className="highlight"></span>
                                <label className='label-admin' for="hinhAnh">Hình ảnh :</label>
                            </div>
                        </div>
                    </div>
                    {/* <div className="col-md-12 col-item mt-3 px-0">
                        <div className="form-group-admin">
                            <textarea className='input-admin input-moTa'  required type="text" name="moTa"
                                {...formik.getFieldProps('moTa')}
                            />
                            {formik.errors.moTa && formik.touched.moTa && <p className='text-error'>{formik.errors.moTa}</p>}
                            <span className="highlight"></span>
                            <label className='label-admin' for="moTa">Mô tả :</label>


                        </div>
                    </div> */}

                    <div className="col-md-12 col-item mt-3 px-0">
                        <div className='type-user mb-0 mr-3 mb-3'>Mô tả: </div>
                        <div className="form-group-admin">
                            <textarea className='input-moTa' name="moTa"
                                {...formik.getFieldProps('moTa')}
                            />
                            {formik.errors.moTa && formik.touched.moTa && <p className='text-error'>{formik.errors.moTa}</p>}
                            <span className="highlight"></span>
                        </div>
                    </div>

                    <div className='footer-buttons'>
                        <button className="button-back">
                            <NavLink to='/admin/coursemanagement'>
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

export default CourseAdd