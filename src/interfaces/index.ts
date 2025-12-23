// --- AUTENTICACIÓN ---

export interface User {
    email: string;
    nombre: string;
    nombreCompleto?: string; 
    rol: string;
}

export interface LoginRequest {
    email: string;
    password?: string;
    clave?: string; // Por compatibilidad si tu backend lo pide así
}

export interface LoginResponse {
    token: string;
    nombre: string;
    email: string;
}

export interface RegisterRequest {
    nombre: string;
    apellido: string;
    email: string;
    password: string;
}

// --- PACIENTES ---

export interface Paciente {
    id: number;           
    codigo: string;       
    direccion: string;
    nombres: string;
    apellidos: string;
    dni: string;
    edad: number;
    email: string;
    telefono: string;
    sexo: string;
    fechaNacimiento: string;
    nombreSeguro?: string;
    historiaClinica: string;
}

export interface PaginatedResponse<T> {
    items: T[];          // Aquí está la lista real de datos
    pageNumber: number;
    totalPages: number;
    totalCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
}