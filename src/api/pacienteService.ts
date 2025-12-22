import axiosClient from './axiosClient';
import type { Paciente, PaginatedResponse } from '../interfaces';

export const pacienteService = {
    
    getAll: async (page = 1, pageSize = 10, search = ''): Promise<Paciente[]> => {
        const response = await axiosClient.get<PaginatedResponse<Paciente>>('/Pacientes', {
            params: { 
                pageNumber: page, 
                pageSize: pageSize, 
                searchTerm: search 
            }
        });
        return response.data.items; 
    },

    getById: async (id: number): Promise<Paciente> => {
        const response = await axiosClient.get<Paciente>(`/Pacientes/${id}`);
        return response.data;
    },

    // CORRECCIÓN AQUÍ: Cambiamos 'Promise<int>' por 'Promise<number>'
    create: async (paciente: Partial<Paciente>): Promise<number> => {
        // CORRECCIÓN AQUÍ: Cambiamos '<int>' por '<number>'
        const response = await axiosClient.post<number>('/Pacientes', paciente);
        return response.data;
    },

    update: async (id: number, paciente: Partial<Paciente>): Promise<void> => {
        const payload = { ...paciente, id }; 
        await axiosClient.put(`/Pacientes/${id}`, payload);
    },

    delete: async (id: number): Promise<void> => {
        await axiosClient.delete(`/Pacientes/${id}`, {
            params: { 
                motivo: "Eliminado desde Frontend Web" 
            }
        });
    }
};