import axios from "axios";
import { logout } from "./utils/auth";

export const token = localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null

export const instance = axios.create({
    baseURL: 'http://localhost:5000/api/v1',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'token': token ? `${token}` : null,
    },
    withCredentials: true,
});

instance.interceptors.response.use(
    response => response,
    error => {
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
            // Token expired or invalid — redirect to login
            location.replace("/login")
        }
        return Promise.reject(error)
    }
)