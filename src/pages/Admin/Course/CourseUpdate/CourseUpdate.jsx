import React, { useEffect, useState } from 'react';
import './CourseUpdate.scss';
import { NavLink, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { CYBERSOFT_TOKEN, GROUP_ID } from '../../../../constant';
import { useFormik } from 'formik';
import Swal from 'sweetalert2';


function CourseUpdate() {
    const params = useParams();
    const { listCourseAdmin } = useSelector(state => state.CourseAdminReducer);
    const listItem = listCourseAdmin.find(item => item.maKhoaHoc === params.id)
    console.log('listItem', listItem)
    const { maKhoaHoc, tenKhoaHoc, danhGia, luotXem, danhMucKhoaHoc, ngayTao, nguoiTao, hinhAnh, moTa, maNhom } = listItem
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

    const formik = useFormik({
        initialValues: {
            maKhoaHoc: maKhoaHoc,
            tenKhoaHoc: tenKhoaHoc,
            danhGia: danhGia,
            luotXem: luotXem,
            danhMucKhoaHoc: danhMucKhoaHoc.maDanhMucKhoahoc,
            nguoiTao: nguoiTao.taiKhoan,
            ngayTao: ngayTao,
            hinhAnh: hinhAnh,
            moTa: moTa,
            maNhom: maNhom,
        },

        onSubmit: async (values) => {
            console.log('values', values)


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
                const resp = await axios ({
                    method: 'put',
                    url: 'https://elearningnew.cybersoft.edu.vn/api/QuanLyKhoaHoc/CapNhatKhoaHoc',
                    data: {
                        "maKhoaHoc": values.maKhoaHoc,
                        // "biDanh": ,
                        "tenKhoaHoc": values.tenKhoaHoc,
                        "moTa": values.moTa,
                        "luotXem": values.luotXem,
                        "danhGia": values.danhGia,
                        "hinhAnh": values.hinhAnh,
                        "maNhom": GROUP_ID,
                        "ngayTao": values.ngayTao,
                        "maDanhMucKhoaHoc": values.danhMucKhoaHoc,
                        "taiKhoanNguoiTao": values.nguoiTao,
                      },
                    headers: {
                        TokenCybersoft: `${CYBERSOFT_TOKEN}`,
                    }
                })
                console.log('resp',resp)
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Cập nhật khóa học thành công ',
                    showConfirmButton: false,
                    timer: 1500
                })
            } catch (err) {
                console.log(err.response.data)
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: err.response.data,
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        }
    })


    return (
        <div className='container'>
            <div className="title">
                <h1>Cập Nhật Khóa Học</h1>
            </div>
            <div className="content">
                <form noValidate onSubmit={formik.handleSubmit}>
                    <div className="row">
                        <div className="col-md-6 col-item">
                            <div className="form-group">
                                <input required type="text" name="maKhoaHoc" className="disabled-input"
                                    // value={maKhoaHoc}
                                    {...formik.getFieldProps('maKhoaHoc')}
                                // value={formik.getFieldProps('maKhoaHoc')}
                                />
                                <span className="highlight"></span>
                                <label className='label-admin' for="maKhoaHoc">Mã khóa học:</label>
                            </div>
                        </div>
                        <div className="col-md-6 col-item">
                            <div className="form-group">
                                <input required type="text" name="danhGia"
                                    {...formik.getFieldProps('danhGia')}
                                    value={formik.values.danhGia === undefined && !formik.touched.danhGia ? 10 : formik.values.danhGia}
                                />
                                <span className="highlight"></span>
                                <label className='label-admin' for="danhGia">Đánh giá :</label>
                            </div>
                        </div>
                        <div className="col-md-6 col-item">
                            <div className="form-group">
                                <input required type="text" name="tenKhoaHoc"
                                    // value={tenKhoaHoc}
                                    {...formik.getFieldProps('tenKhoaHoc')}
                                />
                                <span className="highlight"></span>
                                <label className='label-admin' for="tenKhoaHoc">Tên khóa học :</label>
                            </div>
                        </div>
                        <div className="col-md-6 col-item">
                            <div className="form-group">
                                <input required type="text" name="luotXem"
                                    value={luotXem}
                                    {...formik.getFieldProps('luotXem')}
                                />
                                <span className="highlight"></span>
                                <label className='label-admin' for="luotXem">Lượt xem :</label>
                            </div>
                        </div>
                        <div className="col-md-6 col-item">
                            <div className="form-group form-type">
                                <div className='type-user mb-0 mr-3'>Danh mục khóa học: </div>
                                <select className="form-select select-category"
                                    {...formik.getFieldProps('danhMucKhoaHoc')}
                                    onChange={(e) => formik.setFieldValue('danhMucKhoaHoc', e.target.value)}
                                >
                                    <option value=''>Vui lòng chọn khóa học</option>
                                    {listCourseCategory.map((item) => {
                                        return (
                                            <option key={item.maDanhMuc} value={item.maDanhMuc}>{item.tenDanhMuc}</option>
                                        )
                                    })}

                                </select>
                            </div>
                        </div>
                        <div className="col-md-6 col-item mt-3">
                            <div className='type-user mb-0 mr-3'>Ngày tạo: </div>
                            <div className="form-group">
                                <input name="ngayTao"
                                    value={ngayTao}
                                    {...formik.getFieldProps('ngayTao')}
                                />
                                <span className="highlight"></span>
                            </div>
                        </div>
                        <div className="col-md-6 col-item">
                            <div className="form-group">
                                <input required type="text" name="nguoiTao"
                                    // value={nguoiTao.taiKhoan}
                                    {...formik.getFieldProps('nguoiTao')}
                                />
                                <span className="highlight"></span>
                                <label className='label-admin' for="nguoiTao">Người tạo :</label>
                            </div>
                        </div>

                        <div className="col-md-6 col-item mt-3">
                            <div className="form-group">
                                <input required type="text" name="hinhAnh"
                                    value={hinhAnh}
                                    {...formik.getFieldProps('hinhAnh')}
                                />
                                <span className="highlight"></span>
                                <label className='label-admin' for="hinhAnh">Hình ảnh :</label>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-12 col-item mt-3">
                        <div className="form-group">
                            <input required type="text" name="moTa" className='input-moTa'
                                value={moTa}
                                {...formik.getFieldProps('moTa')}
                            />
                            <span className="highlight"></span>
                            <label className='label-admin' for="moTa">Mô tả :</label>
                        </div>
                    </div>





                    <div className='footer'>
                        <button className="button-back">
                            <NavLink to='/admin/coursemanagement'>
                                <i className="fa fa-arrow-left mr-3"></i>
                                <span className="back arrow">Trở lại</span>
                            </NavLink>
                        </button>
                        <button type='submit' className='btn-add'>Cập Nhật</button>
                    </div>
                </form>
            </div>

        </div>
    )

}

export default CourseUpdate