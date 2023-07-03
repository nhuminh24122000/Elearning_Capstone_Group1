import React from 'react';
import './CourseItem.scss';
import { ACCESS_TOKEN, CYBERSOFT_TOKEN, defaultImage } from '../../constant';
import { NavLink } from 'react-router-dom';
import { Rating } from 'react-simple-star-rating';
import axios from 'axios';
import { getLocal } from '../../utils';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';


function CourseItem({ item, handleProfile, listSearch, setListSearch }) {
    const { userProfile } = useSelector(state => state.UserReducer);
    const { hinhAnh, tenKhoaHoc, moTa, luotXem, maKhoaHoc, showCancelButton } = item;

    const xoaKhoaHoc = async (id) => {
        const result = await Swal.fire({
            title: 'Bạn muốn xóa khoác học này?',
            // text: "",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'OK'
        });


        if (result.isConfirmed) {
            try {
                await axios({
                    method: 'post',
                    url: 'https://elearningnew.cybersoft.edu.vn/api/QuanLyKhoaHoc/HuyGhiDanh',
                    data: {
                        maKhoaHoc: id,
                        taiKhoan: userProfile.taiKhoan
                    },
                    headers: {
                        Authorization: `Bearer ${getLocal(ACCESS_TOKEN)}`,
                        TokenCybersoft: `${CYBERSOFT_TOKEN}`,
                    }
                })
                handleProfile();
                setListSearch(listSearch?.filter(item => item.maKhoaHoc !== id));


                Swal.fire(
                    'Xóa thành công',
                    '',
                    'success'
                );

                setTimeout(() => {
                    Swal.close();
                }, 1000)
            } catch (err) {
                console.log(err)
            }
        }

    }


    return (
        // <>
        //     <div className="col-lg-3" >
        //         <img style={{ height: 150 }} src={hinhAnh} className="img-fluid" onError={(e) => e.target.src = defaultImage} />
        //     </div>
        //     <div className="col-lg-9 pr-0">
        //         <h1>
        //             <NavLink className={'idCourse'}
        //                 style={{
        //                     textDecoration: "none",
        //                     color: "black",
        //                     cursor: "pointer",
        //                 }}
        //             >
        //                 {tenKhoaHoc}
        //             </NavLink>
        //         </h1>
        //         <div className="d-flex">
        //             <NavLink
        //                 className="col-9 p-0 my-4 list-des" >{moTa.length > 220 ? <p>{moTa.slice(0, 220)} ...</p> : <p>{moTa}</p>}
        //             </NavLink>
        //             <div className="text-right col-3">
        //                 <p>
        //                     <Rating initialValue={4} />
        //                     <span>
        //                         ({luotXem} lượt xem)
        //                     </span>
        //                 </p>
        //                 <button onClick={() => { xoaKhoaHoc(maKhoaHoc) }} className='btn-danger'>Xóa</button>
        //             </div>
        //         </div>
        //     </div>

        // </>

        <>
            <div className="course-item  col-md-3">
                <img
                    style={{ height: 150 }}
                    src={hinhAnh}
                    onError={(e) => {
                        e.target.src = defaultImage;
                        e.target.style.width = '100%';
                    }}
                    alt=""
                    className="img-fluid"
                />
            </div>
            <div className="col-md-9 pr-0">
                <h1>
                    <NavLink
                        className={'idCourse'}
                        style={{
                            textDecoration: "none",
                            color: "black",
                            cursor: "pointer",
                        }}

                        to={`/coursedetail/${maKhoaHoc}`}
                    >
                        {tenKhoaHoc}
                    </NavLink>
                </h1>
                <div className="d-flex">
                    <NavLink
                        to={`/coursedetail/${maKhoaHoc}`}
                        className="col-9 col-sm-8 p-0 my-4 list-des" >{moTa.length > 200 ?   <p>{moTa.slice(0, 200)} ...</p> : <p>{moTa}</p>}
                        {/* // className="col-9 col-sm-8 p-0 my-4 list-des" >{moTa.length > 220 ? <p>{window.innerWidth < 769 ? moTa.slice(0, 100) : moTa.slice(0, 220)} ...</p> : <p>{moTa}</p>} */}

                    </NavLink>
                    <div className="text-right col-3 col-sm-4">
                        {/* <p> */}
                        <Rating initialValue={4} />
                        <p>
                            {/* {soLuongHocVien ? soLuongHocVien : 0} học viên */}
                            ({luotXem} lượt xem)
                        </p>
                        {/* </p> */}
                        {showCancelButton && <button onClick={() => { xoaKhoaHoc(item.maKhoaHoc) }} className='btn-delete'>Xóa</button>}
                        {/* <button onClick={() => { xoaKhoaHoc(item.maKhoaHoc) }} className='btn-danger'>Xóa</button> */}
                    </div>
                </div>
            </div>
        </>
        // </div>

    )
}

export default CourseItem