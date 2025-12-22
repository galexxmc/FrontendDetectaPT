import axiosClient from './axiosClient';
import type { LoginRequest, LoginResponse, RegisterRequest } from '../interfaces';

export const authService = {
    
    login: async (credentials: LoginRequest): Promise<LoginResponse> => {
        // Enviamos 'clave' y 'password' para asegurar compatibilidad
        const payload = {
            email: credentials.email,
            clave: credentials.password,
            password: credentials.password 
        };
        const response = await axiosClient.post<LoginResponse>('/Usuarios/login', payload);
        return response.data;
    },

    register: async (data: RegisterRequest) => {
        const payload = {
            nombres: data.nombre,
            apellidos: data.apellido,
            email: data.email,
            clave: data.password,
            password: data.password
        };
        const response = await axiosClient.post('/Usuarios/register', payload);
        return response.data;
    },

    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
    }
};