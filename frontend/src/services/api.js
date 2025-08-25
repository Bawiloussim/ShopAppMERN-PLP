import axios from 'axios';

// const API_URL = 'http://localhost:5000/api'; // local API_URL

const API_URL = import.meta.env.VITE_API_BASE_URL; //Production API_URL

const api = axios.create({
    baseURL: API_URL,
});


// Ensuite, configurez les intercepteurs
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
        localStorage.removeItem('token');
        window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default api;

