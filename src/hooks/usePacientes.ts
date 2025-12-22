// src/hooks/usePacientes.ts
import { useState, useEffect, useCallback } from 'react';
import Swal from 'sweetalert2';
import { pacienteService } from '../api/pacienteService'; // Importamos el servicio
import type { Paciente } from '../interfaces';

export const usePacientes = () => {
    const [pacientes, setPacientes] = useState<Paciente[]>([]);
    const [cargando, setCargando] = useState(true);

    // Función para cargar datos (Memoizada para poder reusarla si queremos recargar)
    const cargarPacientes = useCallback(async () => {
            try {
                setCargando(true);
                
                // Llamamos al servicio (podrías pasar parámetros si implementas paginación visual)
                const data = await pacienteService.getAll(1, 100); // Traemos 100 por ahora
                
                console.log("📦 Datos recibidos:", data); // Debería ser un array puro [...]

                if (Array.isArray(data)) {
                    setPacientes(data);
                } else {
                    console.error("Formato inesperado:", data);
                    setPacientes([]);
                }

            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (error) {
                // ... manejo de error ...
            } finally {
                setCargando(false);
            }
        }, []);

    // Cargar al iniciar el componente
    useEffect(() => {
        cargarPacientes();
    }, [cargarPacientes]);

    const handleEliminar = async (id: number) => {
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: "Esta acción eliminará el registro de la Base de Datos permanentemente",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        });

        if (result.isConfirmed) {
            try {
                // 1. Llamamos al Backend para borrar
                await pacienteService.delete(id);
                
                // 2. Actualizamos la lista visualmente (para no tener que recargar)
                setPacientes(prev => prev.filter(p => p.idPaciente !== id));
                
                Swal.fire('¡Eliminado!', 'El paciente ha sido eliminado.', 'success');
            } catch (error) {
                console.error(error);
                Swal.fire('Error', 'No se pudo eliminar el registro.', 'error');
            }
        }
    };

    const handleHabilitarPaciente = () => {
        Swal.fire('Info', 'Funcionalidad en construcción', 'info');
    };

    return {
        pacientes,
        cargando,
        handleEliminar,
        handleHabilitarPaciente,
        recargar: cargarPacientes // Exportamos esto por si quieres poner un botón de "Actualizar Tabla"
    };
};