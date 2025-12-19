import axios from 'axios';

// ⚠️ IMPORTANTE: Asegúrate de que este puerto (5017) sea el mismo que usa tu Swagger/.NET
const BASE_URL = 'http://localhost:5017/api';

const axiosClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor: Pega el token automáticamente en cada petición si existe
axiosClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default axiosClient;