import axios from "axios";

const axiosInstance = axios.create({baseURL:'https://platform-flask-production-28c4.up.railway.app/'});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);}
);


export default axiosInstance;
