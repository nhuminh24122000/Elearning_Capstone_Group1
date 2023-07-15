import React, { useEffect, useRef, useState } from 'react';
import './CourseAdd.scss';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { ACCESS_TOKEN, CYBERSOFT_TOKEN, GROUP_ID } from '../../../../constant';
import { useFormik } from 'formik';
import { getLocal } from '../../../../utils';
import Swal from 'sweetalert2';
import * as Yup from 'yup';

// import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

// import { Editor } from '@tinymce/tinymce-react';





function CourseAdd() {
    // const editorRef = useRef(null);
    // const log = () => {
    //     if (editorRef.current) {
    //         console.log(editorRef.current.getContent());
    //     }
    // };




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
            console.log('values', values)

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
                console.log('resp', resp)
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

    // const [uploadedImage, setUploadedImage] = useState(null);
    // const upLoadImage = async () => {
    //     try {
    //         const resp = await axios({
    //             method: 'post',
    //             url: 'https://elearningnew.cybersoft.edu.vn/api/QuanLyKhoaHoc/UploadHinhAnhKhoaHoc',
    //             headers: {
    //                 'Content-Type': 'multipart/form-data',
    //                 TokenCybersoft: `${CYBERSOFT_TOKEN}`,
    //             }
    //         })
    //         console.log('resp', resp)
    //         setUploadedImage(resp);
    //     } catch (err) {

    //     }
    // }



    return (
        <div className='container'>
            <div className="title">
                <h1>Thêm Khóa Học</h1>
            </div>
            <div className="content">
                <form noValidate onSubmit={formik.handleSubmit}>
                    <div className="row">
                        <div className="col-md-6 col-item">
                            <div className="form-group">
                                <input required type="text" name="maKhoaHoc"
                                    {...formik.getFieldProps('maKhoaHoc')}
                                />
                                {formik.errors.maKhoaHoc && formik.touched.maKhoaHoc && <p className='text-error'>{formik.errors.maKhoaHoc}</p>}
                                <span className="highlight"></span>
                                <label className='label-admin' for="maKhoaHoc">Mã khóa học:</label>
                            </div>
                        </div>
                        <div className="col-md-6 col-item">
                            <div className="form-group">
                                <input required type="text" name="danhGia"
                                    {...formik.getFieldProps('danhGia')}
                                />
                                {formik.errors.danhGia && formik.touched.danhGia && <p className='text-error'>{formik.errors.danhGia}</p>}
                                <span className="highlight"></span>
                                <label className='label-admin' for="danhGia">Đánh giá :</label>
                            </div>
                        </div>
                        <div className="col-md-6 col-item">
                            <div className="form-group">
                                <input required type="text" name="tenKhoaHoc"
                                    {...formik.getFieldProps('tenKhoaHoc')}
                                />
                                {formik.errors.tenKhoaHoc && formik.touched.tenKhoaHoc && <p className='text-error'>{formik.errors.tenKhoaHoc}</p>}
                                <span className="highlight"></span>
                                <label className='label-admin' for="tenKhoaHoc">Tên khóa học :</label>
                            </div>
                        </div>
                        <div className="col-md-6 col-item">
                            <div className="form-group">
                                <input required type="text" name="luotXem"
                                    {...formik.getFieldProps('luotXem')}
                                />
                                {formik.errors.luotXem && formik.touched.luotXem && <p className='text-error'>{formik.errors.luotXem}</p>}
                                <span className="highlight"></span>
                                <label className='label-admin' for="luotXem">Lượt xem :</label>
                            </div>
                        </div>
                        <div className="col-md-6 col-item">
                            <div className="form-group form-type">
                                <div className='type-user mb-0 mr-3'>Danh mục khóa học: </div>
                                <select className="form-select select-category" value={formik.values.danhMucKhoaHoc} onChange={(e) => formik.setFieldValue('danhMucKhoaHoc', e.target.value)}>
                                    <option value=''>Vui lòng chọn khóa học</option>
                                    {listCourseCategory.map((item) => {
                                        return (
                                            <option key={item.maDanhMuc} value={item.maDanhMuc}>{item.tenDanhMuc}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            {formik.errors.danhMucKhoaHoc && formik.touched.danhMucKhoaHoc && <p className='text-error'>{formik.errors.danhMucKhoaHoc}</p>}
                        </div>
                        <div className="col-md-6 col-item mt-3">
                            <div className='type-user mb-0 mr-3'>Ngày tạo: </div>
                            <div className="form-group">
                                <input type="date" name="ngayTao"
                                    {...formik.getFieldProps('ngayTao')}
                                />
                                {formik.errors.ngayTao && formik.touched.ngayTao && <p className='text-error'>{formik.errors.ngayTao}</p>}
                                <span className="highlight"></span>
                                {/* <label className='label-admin' for="ngayTao">Ngày tạo :</label> */}
                            </div>
                        </div>
                        <div className="col-md-6 col-item">
                            <div className="form-group">
                                <input required type="text" name="nguoiTao"
                                    {...formik.getFieldProps('nguoiTao')}
                                />
                                {formik.errors.nguoiTao && formik.touched.nguoiTao && <p className='text-error'>{formik.errors.nguoiTao}</p>}
                                <span className="highlight"></span>
                                <label className='label-admin' for="nguoiTao">Người tạo :</label>
                            </div>
                        </div>

                        <div className="col-md-6 col-item mt-3">
                            <div className="form-group">
                                <input required type="text" name="hinhAnh"
                                    {...formik.getFieldProps('hinhAnh')}
                                />
                                {formik.errors.hinhAnh && formik.touched.hinhAnh && <p className='text-error'>{formik.errors.hinhAnh}</p>}
                                <span className="highlight"></span>
                                <label className='label-admin' for="hinhAnh">Hình ảnh :</label>
                            </div>
                        </div>
                        {/* <div className="col-12 d-flex  justify-content-end" >
                            <button className='btn-upload' onClick={upLoadImage}>Tải lên</button>
                        </div> */}
                    </div>
                    <div className="col-md-12 col-item mt-3">
                        <div className="form-group">
                            <input required type="text" name="moTa" className='input-moTa'
                                {...formik.getFieldProps('moTa')}
                            />
                            {formik.errors.moTa && formik.touched.moTa && <p className='text-error'>{formik.errors.moTa}</p>}
                            <span className="highlight"></span>
                            <label className='label-admin' for="moTa">Mô tả :</label>


                        </div>
                    </div>


                    {/* <div className="col-md-12 col-item mt-3 form-ckeditor">
                        <div className='type-user mb-0 mr-3'>Mô tả: </div>
                        <div className="form-group">

                            <CKEditor
                                editor={ClassicEditor}
                                data={formik.values.moTa}
                                onChange={(event, editor) => {
                                    const data = editor.getData();
                                    // const modifiedData = data.replace(/<\/?p>/g, '');
                                    formik.setFieldValue('moTa', data);
                                    console.log('data', data)


                                    // Nếu bạn muốn trình soạn thảo lấy trạng thái tốt nhất sau khi thay đổi,
                                    // bạn cũng có thể gọi phương thức editor.checkSelectionChange() ở đây.

                                    // Cập nhật lại dữ liệu trong trình soạn thảo để hiển thị dữ liệu đã thay đổi
                                    // editor.setData(modifiedData);
                                }}
                            />
                            {formik.errors.moTa && formik.touched.moTa && (
                                <p className="text-error">{formik.errors.moTa}</p>
                            )}


                            <Editor
                                onInit={(evt, editor) => editorRef.current = editor}
                                initialValue={formik.values.moTa}
                                onChange={(event, editor) => {
                                    const content = editor.getContent();
                                    formik.setFieldValue('moTa', content);
                                }}
                                init={{
                                    height: 500,
                                    menubar: false,
                                    plugins: [
                                        'advlist autolink lists link image charmap print preview anchor',
                                        'searchreplace visualblocks code fullscreen',
                                        'insertdatetime media table paste code help wordcount'
                                    ],
                                    toolbar: 'undo redo | formatselect | ' +
                                        'bold italic backcolor | alignleft aligncenter ' +
                                        'alignright alignjustify | bullist numlist outdent indent | ' +
                                        'removeformat | help',
                                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px; margin: 0; padding: 0; }',
                                    forced_root_block: false, // Bỏ giá trị mặc định là thẻ <p>
                                    force_br_newlines: true, // Sử dụng <br> cho các xuống dòng
                                    force_p_newlines: false,
                                }}
                            />
                            {formik.errors.moTa && formik.touched.moTa && (
                                <p className="text-error">{formik.errors.moTa}</p>
                            )}
                            <button onClick={log}>Log editor content</button>


                        </div>
                    </div> */}



                    <div className='footer'>
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