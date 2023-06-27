import axios from "axios";
import { CYBERSOFT_TOKEN, GROUP_ID } from "../constant/index";

export const getCoursesApi = () => {
  return axios({
    method: "GET",
    url: `https://elearningnew.cybersoft.edu.vn/api/QuanLyKhoaHoc/LayDanhSachKhoaHoc?MaNhom=${GROUP_ID}`,
    headers: {
      TokenCybersoft: CYBERSOFT_TOKEN,
    },
  });
};

export const registerCourseApi = (registerInfo) => {
  return axios({
    method: "POST",
    url: "https://elearningnew.cybersoft.edu.vn/api/QuanLyKhoaHoc/DangKyKhoaHoc",
    data: registerInfo.info,
    headers: {
      Authorization: `Bearer ${registerInfo.accessToken}`,
      TokenCybersoft: CYBERSOFT_TOKEN,
    },
  });
};

export const getCoursesBySearchPaginationApi = (searchText, page, pageSize) => {
  return axios({
    method: "GET",
    url: `https://elearningnew.cybersoft.edu.vn/api/QuanLyKhoaHoc/LayDanhSachKhoaHoc_PhanTrang?tenKhoaHoc=${searchText}&page=${page}&pageSize=${pageSize}&MaNhom=${GROUP_ID}`,
    headers: {
      TokenCybersoft: CYBERSOFT_TOKEN,
    },
  });
};