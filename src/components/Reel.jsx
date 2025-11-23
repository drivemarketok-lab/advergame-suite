import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Símbolos disponibles
const SYMBOLS = ['🍒', '🍋', '🍇', '💎', '🔔', '7️⃣'];

const Reel = ({ targetSymbol, isSpinning, delay }) => {
  return (
    <div className="relative h-28 w-24 overflow-hidden bg-slate-900/80 rounded-xl border border-white/10 shadow-inner flex items-center justify-center">
      <AnimatePresence mode='wait'>
        {!isSpinning ? (
          <motion.div
            key="static"
            initial={{ y: -50, opacity: 0, filter: "blur(10px)" }}
            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="text-6xl filter drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]"
          >
            {targetSymbol}
          </motion.div>
        ) : (
          <motion.div
            key="spinning"
            initial={{ y: 0 }}
            animate={{ y: [0, -1200] }}
            transition={{ 
              repeat: Infinity, 
              duration: 0.4, 
              ease: "linear", 
              delay: delay 
            }}
            className="absolute flex flex-col gap-8 top-0 opacity-50 blur-[2px]"
          >
            {/* Tira larga para animación */}
            {[...SYMBOLS, ...SYMBOLS, ...SYMBOLS, ...SYMBOLS].map((s, i) => (
              <span key={i} className="text-6xl grayscale">{s}</span>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Brillo Vidrio */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
      <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] pointer-events-none" />
    </div>
  );
};

export default Reel;