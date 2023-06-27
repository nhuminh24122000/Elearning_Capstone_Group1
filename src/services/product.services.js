import axios from "axios";
import { CYBERSOFT_TOKEN } from "../constant";

const BASE_URL = "https://elearningnew.cybersoft.edu.vn/api/";

export const axiosWithAuth = axios.create({
  baseURL: BASE_URL,
  timeout: 180_000,
});

axiosWithAuth.interceptors.request.use((config) => {
  config.headers = {
    TokenCybersoft: CYBERSOFT_TOKEN,
  };
  return config;
}, (err) => {
    return Promise.reject(err);
});
