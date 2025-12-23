import { useState } from "react"; // 👈 Importamos useState
import { useNavigate } from "react-router-dom";
// Ya no necesitamos Swal aquí para visualizar
import { Trash2, UserPlus, Eye, Pencil, Activity } from "lucide-react";
import { usePacientes } from "../../hooks/usePacientes";
import type { Paciente } from "../../interfaces";
import { PacienteModal } from "./PacienteModal"; // 👈 Importamos el nuevo componente Modal

export const ListaPacientes = () => {
  const navigate = useNavigate();
  const { pacientes, cargando, handleEliminar } = usePacientes();
  
  // --- ESTADOS PARA EL MODAL ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Paciente | null>(null);

  // --- NUEVA FUNCIÓN PARA ABRIR EL MODAL ---
  const handleVisualizar = (p: Paciente) => {
    setSelectedPatient(p); // Guardamos el paciente clickeado
    setIsModalOpen(true);  // Abrimos el modal
  };

  return (
      <div className="p-4 md:p-8 max-w-7xl mx-auto relative">
        {/* Encabezado de la página (Sin cambios) */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8 gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-800">Gestión de Pacientes</h1>
            <p className="text-slate-500 text-sm md:text-base">Listado general de pacientes registrados</p>
          </div>
          <button onClick={() => navigate("/crear")} className="bg-cyan-600 hover:bg-cyan-700 text-white px-5 py-2.5 rounded-lg font-medium flex items-center gap-2 transition shadow-sm">
            <UserPlus size={18} /> Nuevo Paciente
          </button>
        </div>

        {/* Tabla Estilo "Imagen" (Sin cambios en la estructura) */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          {cargando ? (
            <div className="p-12 text-center text-slate-500 animate-pulse">Cargando datos...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                {/* HEAD (Sin cambios) */}
                <thead className="bg-slate-900 text-white">
                  <tr>
                    <th className="p-4 text-sm font-semibold text-center whitespace-nowrap">Código</th>
                    <th className="p-4 text-sm font-semibold text-center whitespace-nowrap">Apellidos</th>
                    <th className="p-4 text-sm font-semibold text-center whitespace-nowrap">Nombres</th>
                    <th className="p-4 text-sm font-semibold text-center whitespace-nowrap">DNI</th>
                    <th className="p-4 text-sm font-semibold text-center whitespace-nowrap">Seguro</th>
                    <th className="p-4 text-sm font-semibold text-center whitespace-nowrap">Historia Clínica</th>
                    <th className="p-4 text-sm font-semibold text-center whitespace-nowrap">Acciones</th>
                  </tr>
                </thead>
                
                <tbody className="divide-y divide-slate-100 text-center">
                  {pacientes?.length > 0 ? (
                    pacientes.map((p, index) => (
                      <tr key={p.id || index} className="hover:bg-slate-50 transition-colors">
                        {/* 1. Código */}
                        <td className="p-4 text-center whitespace-nowrap">
                           <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 font-mono text-xs font-bold border border-slate-200">
                             <span className="text-slate-400">#</span> {p.codigo || "S/N"}
                           </span>
                        </td>
                        {/* 2. Apellidos */}
                        <td className="p-4 text-slate-700 whitespace-nowrap text-sm">{p.apellidos}</td>
                        {/* 3. Nombres */}
                        <td className="p-4 text-slate-600 whitespace-nowrap text-sm">{p.nombres}</td>
                        {/* 4. DNI */}
                        <td className="p-4 text-center whitespace-nowrap">
                            <span className="font-mono bg-slate-100 text-slate-600 px-2 py-1 rounded-md text-xs font-bold border border-slate-200">{p.dni}</span>
                        </td>
                        {/* 5. Seguro */}
                        <td className="p-4 text-center whitespace-nowrap">
                            <span className={`px-2 py-1 rounded-full text-xs font-bold border ${
                                p.nombreSeguro === "SIS" ? "bg-emerald-100 text-emerald-700 border-emerald-100" :
                                p.nombreSeguro === "EsSalud" ? "bg-blue-100 text-blue-700 border-blue-100" :
                                p.nombreSeguro === "EPS Pacífico" ? "bg-purple-100 text-purple-700 border-purple-100" :
                                "bg-slate-100 text-slate-600 border-slate-100"
                            }`}>
                                {p.nombreSeguro || "Particular"}
                            </span>
                        </td>
                        {/* 6. Historia Clínica */}
                        <td className="p-4 text-center whitespace-nowrap">
                            <div className="flex items-center justify-center gap-1.5 text-slate-600 text-sm">
                                <Activity size={16} className="text-cyan-500" />
                                <span className="font-medium">{p.historiaClinica || "Pendiente"}</span>
                            </div>
                        </td>
                        {/* 7. Acciones (El botón del ojo ahora llama a la nueva función) */}
                        <td className="p-4 text-center whitespace-nowrap">
                          <div className="flex justify-center gap-2">
                            <button onClick={() => handleVisualizar(p)} className="p-1.5 text-slate-400 hover:text-cyan-600 transition-colors rounded-md hover:bg-cyan-50" title="Ver Detalle">
                                <Eye size={18} />
                            </button>
                            <button onClick={() => navigate(`/editar/${p.id}`)} className="p-1.5 text-slate-400 hover:text-amber-500 transition-colors rounded-md hover:bg-amber-50" title="Editar">
                                <Pencil size={18} />
                            </button>
                            <button onClick={() => handleEliminar(p.id)} className="p-1.5 text-slate-400 hover:text-red-500 transition-colors rounded-md hover:bg-red-50" title="Eliminar">
                                <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr><td colSpan={7} className="p-12 text-center text-slate-400">No hay pacientes registrados aún.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* 🔥 AQUÍ RENDERIZAMOS EL MODAL 🔥 */}
        <PacienteModal 
            isOpen={isModalOpen} 
            onClose={() => setIsModalOpen(false)} 
            paciente={selectedPatient} 
        />
      </div>
  );
};