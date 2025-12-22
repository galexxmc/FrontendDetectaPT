import React from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { AnimatePresence, motion } from "framer-motion";
import { useLocation, useOutlet } from "react-router-dom";

export const MainLayout: React.FC = () => {
  const location = useLocation();
  const currentOutlet = useOutlet();

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans text-slate-900 overflow-hidden">
      <Header />
      <main className="flex-1 w-full max-w-7xl mx-auto p-6 md:p-8 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="w-full"
          >
            {currentOutlet} 
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
};