import React from "react";
import { X, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { Paciente } from "../../interfaces";

interface PacienteModalProps {
  isOpen: boolean;
  onClose: () => void;
  paciente: Paciente | null;
}

const TableRow = ({ 
  label, 
  value,
  isLast = false
}: { 
  label: string, 
  value: React.ReactNode,
  isLast?: boolean
}) => (
  <div className={`flex flex-col sm:flex-row border-b border-slate-200 ${isLast ? "border-b-0" : ""}`}>
    <div className="sm:w-1/3 bg-slate-50 p-3 sm:px-4 sm:py-3.5 text-sm font-semibold text-slate-600 flex items-center">
      {label}
    </div>
    <div className="sm:w-2/3 bg-white p-3 sm:px-4 sm:py-3.5 text-sm text-slate-800 flex items-center wrap-break-word font-medium">
      {value}
    </div>
  </div>
);

export const PacienteModal: React.FC<PacienteModalProps> = ({ isOpen, onClose, paciente }) => {
  if (!paciente) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* 1. FONDO OSCURO (BACKDROP) 
              🔥 CAMBIO CLAVE: z-[60]
              Esto asegura que esté POR ENCIMA del Header (que suele ser z-50)
          */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 z-60" 
          />

          {/* 2. WRAPPER DE INTERACCIÓN 
              🔥 CAMBIO CLAVE: z-[70]
              Para que el modal flote incluso más arriba que el fondo oscuro
          */}
          <div 
            className="fixed inset-0 z-70 flex items-center justify-center p-4 overflow-y-auto"
            onClick={onClose}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", bounce: 0.3, duration: 0.4 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-xl overflow-hidden relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={onClose} 
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors z-10"
              >
                <X size={20} />
              </button>

              <div className="flex flex-col max-h-[90vh]">
                
                {/* Encabezado */}
                <div className="p-6 pb-4 flex items-center gap-5">
                  <div className="h-16 w-16 bg-cyan-50 rounded-2xl flex items-center justify-center shrink-0 border border-cyan-100 text-cyan-600 shadow-sm">
                    <User size={32} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-800 leading-tight">
                      {paciente.apellidos}, {paciente.nombres}
                    </h2>
                    <div className="flex items-center gap-2 mt-1.5">
                        <span className="text-sm text-slate-500">Código:</span>
                        <span className="bg-slate-100 text-slate-600 border border-slate-200 text-xs font-bold px-2 py-0.5 rounded-lg">
                            {paciente.codigo || "S/N"}
                        </span>
                    </div>
                  </div>
                </div>
                
                {/* Cuerpo */}
                <div className="p-6 pt-2 overflow-y-auto">
                  <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                    <TableRow label="DNI" value={paciente.dni} />
                    <TableRow label="Correo" value={paciente.email || "No registrado"} />
                    <TableRow label="Edad" value={`${paciente.edad} años`} />
                    <TableRow label="Fecha Nacimiento" value={new Date(paciente.fechaNacimiento).toLocaleDateString()} />
                    <TableRow label="Sexo" value={paciente.sexo} />
                    <TableRow label="Teléfono" value={paciente.telefono || "No registrado"} />
                    <TableRow label="Dirección" value={paciente.direccion || "No registrada"} />
                    <TableRow 
                      label="Seguro" 
                      value={
                        <div className="flex flex-col">
                            <span className={`font-bold text-sm ${
                                  paciente.nombreSeguro === "SIS" ? "text-emerald-700" :
                                  paciente.nombreSeguro === "EsSalud" ? "text-blue-700" :
                                  paciente.nombreSeguro === "EPS Pacífico" ? "text-purple-700" :
                                  "text-slate-700"
                              }`}>
                                {paciente.nombreSeguro || "Particular"}
                            </span>
                            <span className="text-xs text-slate-400 font-normal">Plan Base</span>
                        </div>
                      } 
                    />
                    <TableRow 
                      isLast={true} 
                      label="N° Historial" 
                      value={<span className="font-bold text-slate-900">{paciente.historiaClinica || "Pendiente"}</span>} 
                    />
                  </div>
                </div>

              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};