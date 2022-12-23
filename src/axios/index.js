import axios from "axios";
import store from "../store";

const axiosClient = axios.create({
   // baseURL: 'https://api.horizon-web.net/backend',
    baseURL: 'http://localhost:8000',

    /* headers: {
            "Access-Control-Allow-Headers" : "Content-Type",
            "Access-Control-Allow-Origin": "https://api.horizon-web.net/backend",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS"
        }, */
})

axiosClient.interceptors.request.use(config => {

    config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`

    return config;
})

export default axiosClient;
