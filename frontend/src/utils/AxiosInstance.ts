import axios from "axios";

export const axiosInstance = axios.create({
    baseURL : "http://localhost:5500/api" , 
    withCredentials : true , 
});