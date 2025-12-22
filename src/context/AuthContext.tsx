import React, { createContext, useContext, useState, type ReactNode } from 'react';
import { jwtDecode } from 'jwt-decode';
import { authService } from '../api/authService';
import type { User, LoginRequest, RegisterRequest } from '../interfaces';

interface JwtPayload {
  email: string;
  unique_name?: string; 
  nameid?: string;
  role?: string;
  nombre_completo?: string; 
  exp?: number; 
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (data: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Función auxiliar para decodificar token
const decodeUser = (token: string): User | null => {
  try {
    const decoded = jwtDecode<JwtPayload>(token);
    return {
      email: decoded.email,
      nombre: decoded.nombre_completo || decoded.unique_name || "Usuario",
      nombreCompleto: decoded.nombre_completo || decoded.unique_name || "Usuario",
      rol: decoded.role || 'User'
    };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return null;
  }
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  
  // Leemos el token al iniciar (Lazy State)
  const [user, setUser] = useState<User | null>(() => {
    const token = localStorage.getItem('token');
    return token ? decodeUser(token) : null;
  });

  const isAuthenticated = !!user;
  const [isLoading] = useState(false);

  const login = async (data: LoginRequest) => {
    const response = await authService.login(data);
    const userData = decodeUser(response.token);
    
    if (userData) {
      localStorage.setItem('token', response.token);
      setUser(userData); 
    }
  };

  const register = async (data: RegisterRequest) => {
    await authService.register(data);
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth debe usarse dentro de un AuthProvider');
  return context;
};