import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from '../components/layout/MainLayout';
import { LoginPage } from '../features/auth/LoginPage';
import { ListaPacientes } from '../features/pacientes/ListaPacientes';
import { ProtectedRoute } from './ProtectedRoute';
// Agrega aquí tu AuthLayout si deseas usarlo para el Login

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* RUTA PÚBLICA */}
        <Route path="/login" element={<LoginPage />} />

        {/* RUTAS PRIVADAS (Con Layout y Protección) */}
        <Route element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
            <Route path="/pacientes" element={<ListaPacientes />} />
            {/* Redirección por defecto al entrar a la app */}
            <Route path="/" element={<Navigate to="/pacientes" replace />} />
            <Route path="*" element={<Navigate to="/pacientes" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};