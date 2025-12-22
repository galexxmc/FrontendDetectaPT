import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Trash2, UserPlus, Eye, Pencil, Activity, Hash } from "lucide-react";
import { usePacientes } from "../../hooks/usePacientes";
import type { Paciente } from "../../interfaces";

export const ListaPacientes = () => {
  const navigate = useNavigate();
  const { pacientes, cargando, handleEliminar } = usePacientes();

  const handleVisualizar = (p: Paciente) => {
    Swal.fire({
      title: "Detalle del Paciente",
      html: `
        <div class="text-left">
            <p><strong>Nombre:</strong> ${p.nombres} ${p.apellidos}</p>
            <p><strong>DNI:</strong> ${p.dni}</p>
            <p><strong>Seguro:</strong> ${p.nombreSeguro || "Ninguno"}</p>
        </div>
      `,
      icon: "info"
    });
  };

  return (
      <div className="p-4 md:p-8 max-w-7xl mx-auto">
        {/* Encabezado de la página */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8 gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-800">Gestión de Pacientes</h1>
            <p className="text-slate-500 text-sm md:text-base">Listado general de pacientes registrados</p>
          </div>
          <button onClick={() => navigate("/crear")} className="bg-cyan-600 hover:bg-cyan-700 text-white px-5 py-2.5 rounded-lg font-medium flex items-center gap-2 transition shadow-sm">
            <UserPlus size={18} /> Nuevo Paciente
          </button>
        </div>

        {/* Tabla Estilo "Imagen" */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          {cargando ? (
            <div className="p-12 text-center text-slate-500 animate-pulse">Cargando datos...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-center">
                {/* HEAD: Fondo Oscuro como en la foto */}
                <thead className="bg-slate-900 text-white justify-center text-center">
                  <tr>
                    <th className="p-4 text-sm font-semibold text-center whitespace-nowrap">Código</th>
                    <th className="p-4 text-sm font-semibold whitespace-nowrap">Apellidos</th>
                    <th className="p-4 text-sm font-semibold whitespace-nowrap">Nombres</th>
                    <th className="p-4 text-sm font-semibold text-center whitespace-nowrap">DNI</th>
                    <th className="p-4 text-sm font-semibold text-center whitespace-nowrap">Seguro</th>
                    <th className="p-4 text-sm font-semibold text-center whitespace-nowrap">Historia Clínica</th>
                    <th className="p-4 text-sm font-semibold text-center whitespace-nowrap">Acciones</th>
                  </tr>
                </thead>
                
                <tbody className="divide-y divide-slate-100">
                  {pacientes?.length > 0 ? (
                    pacientes.map((p, index) => (
                      <tr key={p.id || index} className="hover:bg-slate-50 transition-colors">
                        
                        {/* 1. Código (Estilo Caja Gris) */}

                    <td className="p-4 whitespace-nowrap">
                        <div className="flex items-center gap-2 justify-center">
                          <Hash size={12} className="text-slate-400" />
                          <span className="text-slate-700 bg-slate-100 px-2 py-1 rounded font-mono text-xs font-bold border border-slate-200">
                            {p.codigo}
                          </span>
                        </div>
                      </td>

                        {/* 2. Apellidos */}
                        <td className="p-4 text-slate-700 whitespace-nowrap text-sm">{p.apellidos}</td>

                        {/* 3. Nombres */}
                        <td className="p-4 text-slate-600 whitespace-nowrap text-sm">{p.nombres}</td>

                        {/* 4. DNI (Estilo Caja Simple) */}
                        <td className="p-4 text-center whitespace-nowrap">
                            <span className="bg-slate-50 text-slate-600 px-2 py-1 rounded-md font-mono text-xs font-bold border border-slate-200">
                                {p.dni}
                            </span>
                        </td>

                        {/* 5. Seguro (Estilo Badge/Píldora de color) */}
                        <td className="p-4 text-center whitespace-nowrap">
                            <span className={`px-2 py-1 rounded-full text-xs font-bold border ${
                                p.nombreSeguro === "SIS" 
                                    ? "bg-emerald-100 text-emerald-700 border-emerald-100" :
                                p.nombreSeguro === "EsSalud" 
                                    ? "bg-blue-100 text-blue-700 border-blue-100" :
                                p.nombreSeguro === "EPS Pacífico" 
                                    ? "bg-purple-100 text-purple-700 border-purple-100" :
                                p.nombreSeguro === "Rimac Seguros"
                                    ? "bg-red-100 text-red-700 border-red-100" :
                                "bg-slate-100 text-slate-600 border-slate-100"
                            }`}>
                                {/* Mostramos el nombre o "Particular" si viene vacío */}
                                {p.nombreSeguro || "Particular"}
                            </span>
                        </td>

                        {/* 6. Historia Clínica (Texto con Ícono de pulso) */}
                        <td className="p-4 text-center whitespace-nowrap">
                            <div className="flex items-center justify-center gap-1.5 text-slate-600 text-sm">
                                <Activity size={16} className="text-cyan-500" />
                                <span className="font-medium">{p.historial?.codigoHistoria || "Pendiente"}</span>
                            </div>
                        </td>

                        {/* 7. Acciones (Iconos limpios) */}
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
                    <tr>
                      <td colSpan={7} className="p-12 text-center text-slate-400">
                        No hay pacientes registrados aún.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
  );
};