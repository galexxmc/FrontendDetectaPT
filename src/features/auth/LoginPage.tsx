import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Loader2, Lock, Mail, ArrowRight, ShieldCheck } from "lucide-react";
// Asegúrate de tener esta imagen o coméntala si no existe aún
import logoDetecta from "../../assets/Logo-Detecta-Vertical.png"; 
import type { LoginRequest } from "../../interfaces";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    if (isAuthenticated && !isSuccess) {
      // Si ya está logueado, redirigir (crearemos esta ruta luego)
      navigate("/pacientes"); 
    }
  }, [isAuthenticated, navigate, isSuccess]);

  const { register, handleSubmit } = useForm<LoginRequest>();

  const onSubmit = async (data: LoginRequest) => {
    setIsSubmitting(true);
    try {
      await login(data);
      setIsSuccess(true);
      setTimeout(() => setIsFadingOut(true), 3000);
      setTimeout(() => navigate("/pacientes"), 3800);
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "¡Error!",
        text: "Credenciales incorrectas o servidor no disponible",
        icon: "error",
        timer: 2000,
        showConfirmButton: false,
        customClass: { popup: "!rounded-3xl" },
      });
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 relative overflow-hidden bg-slate-900">
      
      {/* Animación de Fondo / Éxito */}
      <AnimatePresence>
        {isSuccess && (
          <motion.div
            className="fixed inset-0 bg-white pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.0, duration: 0.8 }}
            style={{ zIndex: 20 }}
          />
        )}
      </AnimatePresence>

      <motion.img
        layout
        src={logoDetecta}
        alt="Logo Detecta"
        animate={{
          scale: isSuccess ? 0.75 : 1,
          opacity: isFadingOut ? 0 : 1,
          y: isSuccess ? -50 : 0,
        }}
        transition={{
          scale: { type: "spring", stiffness: 100, damping: 20 },
          y: { type: "spring", stiffness: 100, damping: 20 },
          opacity: { duration: 0.5, ease: "easeInOut" },
        }}
        className="w-40 h-auto object-contain drop-shadow-md mx-auto mb-5 relative z-50"
      />

      {/* Círculos de carga al éxito */}
      <AnimatePresence>
        {isSuccess && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: isFadingOut ? 0 : 1, y: -50 }}
            transition={{ duration: 1 }}
            style={{ zIndex: 40 }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="relative flex items-center justify-center"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                className="absolute w-48 h-48 rounded-full border-2 border-dotted border-lime-400 shadow-[0_0_15px_rgba(163,230,53,0.3)]"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                className="absolute w-55 h-55 rounded-full border-4 border-cyan-500 border-t-transparent shadow-[0_0_20px_rgba(6,182,212,0.4)]"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Formulario */}
      <AnimatePresence mode="popLayout">
        {!isSuccess && (
          <motion.div
            key="login-form"
            className="w-full max-w-md relative"
            style={{ zIndex: 30 }}
            initial={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, height: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-8 rounded-3xl shadow-2xl">
              <h1 className="text-2xl font-bold text-white mb-2 text-center">Bienvenido</h1>
              <p className="text-gray-400 text-sm mb-6 text-center">Ingresa tus credenciales</p>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 text-left">
                <div>
                  <label className="text-xs font-semibold text-gray-400 uppercase ml-1">Correo</label>
                  <div className="relative mt-1">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500"><Mail size={18} /></div>
                    <input
                      {...register("email", { required: true })}
                      className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white focus:ring-2 focus:ring-cyan-500 transition"
                      placeholder="admin@detecta.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-400 uppercase ml-1">Contraseña</label>
                  <div className="relative mt-1">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500"><Lock size={18} /></div>
                    <input
                      type="password"
                      {...register("password", { required: true })}
                      className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white focus:ring-2 focus:ring-cyan-500 transition"
                      placeholder="••••••"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2 mt-4"
                >
                  {isSubmitting ? <Loader2 className="animate-spin" /> : <>Ingresar <ArrowRight size={20} /></>}
                </button>
              </form>
            </div>
            
            <div className="mt-8 flex justify-center items-center gap-2 text-gray-600 text-xs">
              <ShieldCheck size={14} /> <span>Acceso Seguro v1.0</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};