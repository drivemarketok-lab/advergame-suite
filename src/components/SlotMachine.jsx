import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Heart, Zap, Gift, Trophy, Lock, Clock, Share2 } from 'lucide-react';
import { cn } from '../utils/cn';
import QRCode from "react-qr-code";
import confetti from 'canvas-confetti';
import Reel from './Reel';

// TUS ARCHIVOS LOCALES
const AUDIO_SRC = {
  spin: '/sounds/spin.wav',
  win: '/sounds/win.wav',
  lose: '/sounds/lose.wav'
};

const SlotMachine = ({ config }) => {
  const [gameState, setGameState] = useState('idle'); 
  const [email, setEmail] = useState('');
  const [attempts, setAttempts] = useState(3);
  const [reels, setReels] = useState(['7️⃣', '7️⃣', '7️⃣']);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [prizeLevel, setPrizeLevel] = useState('none');
  const [consolationPercent, setConsolationPercent] = useState(5);

  // Referencias
  const audioRefs = useRef({
    spin: null,
    win: null,
    lose: null
  });

  // INICIALIZACIÓN
  useEffect(() => {
    if (typeof window !== 'undefined') {
      audioRefs.current.spin = new Audio(AUDIO_SRC.spin);
      audioRefs.current.spin.loop = true; 
      audioRefs.current.spin.volume = 0.2; // Volumen ambiente al inicio

      audioRefs.current.win = new Audio(AUDIO_SRC.win);
      audioRefs.current.win.volume = 1.0;

      audioRefs.current.lose = new Audio(AUDIO_SRC.lose);
      audioRefs.current.lose.volume = 0.6;

      // Precarga
      Object.values(audioRefs.current).forEach(audio => {
        if (audio) audio.load();
      });
    }
  }, []);

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const getExpiryDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + 5); 
    return date.toLocaleDateString('es-ES');
  };
  const expiryDate = getExpiryDate();

  // --- REPRODUCTOR ---
  const playSound = (type) => {
    if (!soundEnabled) return;
    const audio = audioRefs.current[type];
    
    // Si pedimos SPIN y ya está sonando, no lo reiniciamos (para que sea continuo desde el email)
    if (type === 'spin' && !audio.paused) return;

    // Detener otros sonidos
    Object.values(audioRefs.current).forEach(a => {
        if (a && a !== audio) {
            a.pause();
            a.currentTime = 0;
        }
    });

    if (audio) {
        if (type !== 'spin') audio.currentTime = 0; // Reiniciar solo si no es spin
        
        const promise = audio.play();
        if (promise !== undefined) {
            promise.catch(e => console.log("Esperando interacción..."));
        }
    }
  };

  const stopSpinSound = () => {
      const spin = audioRefs.current.spin;
      if (spin) {
          spin.pause();
          spin.currentTime = 0;
      }
  };

  // Desbloqueo y ARRANQUE DE MOTOR AL TOCAR
  const startEngine = () => {
      // Desbloqueamos todos
      Object.values(audioRefs.current).forEach(audio => {
          if (audio) {
              audio.play().then(() => {
                  // Si NO es el spin, lo pausamos inmediatamente (solo queremos desbloquear)
                  if (audio !== audioRefs.current.spin) {
                      audio.pause();
                  }
              }).catch(() => {});
          }
      });
      
      // Encendemos el motor explícitamente
      playSound('spin');
  };

  const triggerConfetti = () => {
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 50 };
    const randomInRange = (min, max) => Math.random() * (max - min) + min;
    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);
      const particleCount = 50 * (timeLeft / duration);
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);
  };

  const shareOnWhatsApp = () => {
    const text = `¡Gané ${config.prizeTextBig} en ${config.brandName}! 🎁`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleSpin = (isRisking = false) => {
    if (gameState === 'spinning' || attempts <= 0) return;
    
    setGameState('spinning');
    
    // Aseguramos que el sonido esté sonando (y subimos volumen si quieres)
    if (audioRefs.current.spin) audioRefs.current.spin.volume = 0.8; // Más fuerte al girar
    playSound('spin');

    setTimeout(() => {
      let finalSymbols = [];
      let nextState = '';
      const winRate = config.winProbability / 100;
      const currentChance = isRisking ? (winRate * 0.5) : winRate; 
      const isWin = Math.random() < currentChance;

      stopSpinSound();

      if (!isRisking) {
        if (isWin) {
          finalSymbols = ['🍋', '🍋', '🍋'];
          nextState = 'decision';
          setPrizeLevel('small');
          triggerConfetti();
          playSound('win');
        } else {
          finalSymbols = ['🍒', '🍒', '🍇'];
          nextState = 'ready';
          setAttempts(prev => prev - 1);
        }
      } else {
        if (isWin) {
          finalSymbols = ['💎', '💎', '💎'];
          nextState = 'won';
          setPrizeLevel('big');
          triggerConfetti();
          playSound('win');
        } else {
           finalSymbols = ['💀', '💀', '💀'];
           nextState = 'lost';
           setAttempts(0);
           setPrizeLevel('consolation');
           setConsolationPercent(Math.floor(Math.random() * (10 - 5 + 1)) + 5);
           playSound('lose');
        }
      }
      
      if (!isRisking && nextState === 'ready' && attempts - 1 <= 0) {
          nextState = 'lost';
          setPrizeLevel('consolation');
          setConsolationPercent(Math.floor(Math.random() * (10 - 5 + 1)) + 5);
          playSound('lose');
      }
      
      setReels(finalSymbols);
      setGameState(nextState);
    }, 4500); 
  };

  const keepSmallPrize = () => {
    setReels(['🍋', '🍋', '🍋']);
    setGameState('won');
    setPrizeLevel('small');
    playSound('win');
  };

  const renderInteractionArea = () => {
    if (gameState === 'decision') {
      return (
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="w-full">
           <div className="bg-[#1a1a1a] border border-yellow-500/20 p-5 rounded-2xl text-center relative group">
             <div className="relative z-10">
                <Zap className="mx-auto text-yellow-400 w-8 h-8 mb-2" />
                <h3 className="text-lg font-bold text-white mb-1">¡Ganaste {config.prizeTextSmall}!</h3>
                <p className="text-neutral-400 text-xs mb-5">¿Te retiras o arriesgas todo?</p>
                <div className="grid grid-cols-2 gap-3">
                  <button onClick={keepSmallPrize} className="py-3 bg-neutral-800 border border-white/5 rounded-xl text-xs font-bold text-neutral-300">RETIRARME</button>
                  <button onClick={() => handleSpin(true)} className="py-3 bg-yellow-500 text-black rounded-xl text-xs font-bold">ARRIESGAR</button>
                </div>
             </div>
           </div>
        </motion.div>
      );
    }
    if (gameState === 'won') {
       const prizeText = prizeLevel === 'big' ? config.prizeTextBig : config.prizeTextSmall;
       const qrValue = `${typeof window !== 'undefined' ? window.location.origin : ''}/?mode=ticket&prize=${encodeURIComponent(prizeText)}&brand=${encodeURIComponent(config.brandName)}&expires=${encodeURIComponent(expiryDate)}`;
       
       return (
        <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="w-full text-center">
           <div className="bg-emerald-900/50 border border-emerald-500/30 p-6 rounded-2xl relative">
             <div className="relative z-10">
                <Trophy className="w-8 h-8 text-emerald-400 mx-auto mb-3" />
                <h2 className="text-2xl font-black text-white mb-1">¡FELICIDADES!</h2>
                <p className="text-emerald-200/80 text-sm mb-4">Premio: {prizeText}</p>
                <div className="bg-white p-2 rounded-xl inline-block mb-3">
                    <QRCode value={qrValue} size={100} bgColor="#ffffff" fgColor="#000000" />
                </div>
                <div className="space-y-2">
                   <div className="text-[10px] text-emerald-400 uppercase font-bold">Guarda este cupón</div>
                   <button onClick={shareOnWhatsApp} className="flex items-center justify-center gap-2 w-full py-2 bg-[#25D366] text-black font-bold rounded-lg text-xs mt-3">
                      <Share2 size={14} /> Contar a amigos
                   </button>
                </div>
             </div>
           </div>
        </motion.div>
       );
    }
    if (gameState === 'lost') {
      const qrValue = `${typeof window !== 'undefined' ? window.location.origin : ''}/?mode=ticket&discount=${consolationPercent}&brand=${encodeURIComponent(config.brandName)}&expires=${encodeURIComponent(expiryDate)}`;
      
      return (
        <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="w-full text-center">
           <div className="bg-neutral-900 border border-white/10 p-6 rounded-2xl relative">
             <Gift className="w-10 h-10 text-neutral-500 mx-auto mb-2 relative z-10" />
             <h2 className="text-lg font-bold text-white mb-1">Juego Terminado</h2>
             <div className="bg-white p-3 rounded-xl inline-block mb-3 mt-4">
                <QRCode value={qrValue} size={90} bgColor="#ffffff" fgColor="#171717" />
             </div>
             <div className="bg-white/10 py-1 px-3 rounded-full text-sm text-white inline-block mt-2">
                TU CUPÓN: <b>{consolationPercent}% OFF</b>
             </div>
           </div>
        </motion.div>
       );
    }
    return (
      <div className="w-full space-y-3">
         {gameState === 'idle' && (
           <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-4 w-4 text-neutral-500 group-focus-within:text-indigo-400 transition-colors" />
              </div>
              <input 
                type="email" 
                placeholder="Ingresa tu email..." 
                value={email} 
                // AQUÍ ESTÁ LA CLAVE: AL TOCAR, ARRANCAN LOS MOTORES
                onFocus={startEngine}
                onChange={(e) => setEmail(e.target.value)} 
                className="w-full bg-[#0a0a0a] border border-white/10 text-white pl-10 pr-4 py-4 rounded-xl focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm transition-all shadow-inner" 
              />
           </div>
         )}
         {(gameState === 'idle' || gameState === 'ready') && (
           <button 
             onClick={() => { 
               // Si ya estaba sonando, esto solo confirma
               startEngine();
               if(gameState === 'idle') { 
                 if(isValidEmail) setGameState('ready'); 
               } else { 
                 handleSpin(false); 
               } 
             }} 
             disabled={gameState === 'idle' && !isValidEmail} 
             className={cn("w-full py-4 rounded-xl font-black text-sm tracking-[0.2em] uppercase bg-gradient-to-b from-indigo-500 to-indigo-700 text-white shadow-lg")}
           >
             {gameState === 'idle' ? 'Desbloquear' : 'Girar Ahora'}
           </button>
         )}
         {gameState === 'spinning' && (<div className="text-center py-4"><span className="text-indigo-400 text-xs font-mono animate-pulse">PROCESANDO JUGADA...</span></div>)}
      </div>
    );
  };

  return (
    <div className="w-full max-w-[400px] mx-auto bg-[#050505] rounded-[3rem] shadow-2xl overflow-hidden min-h-[750px] flex flex-col border border-white/10">
        <div className="bg-black/40 p-6 flex justify-between items-center border-b border-white/5">
           <div className="flex gap-1.5">{[1, 2, 3].map(i => (<Heart key={i} size={16} className={cn("transition-all", i <= attempts ? "text-rose-500 fill-rose-500" : "text-neutral-800")} />))}</div>
           <button onClick={() => setSoundEnabled(!soundEnabled)} className="text-neutral-600 hover:text-white">{soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}</button>
        </div>
        
        <div className="flex-1 flex flex-col items-center justify-center p-6 gap-8 relative">
          <div className="text-center space-y-2">
             <span className="text-3xl">{config.logoType === 'emoji' ? config.logoEmoji : '👑'}</span>
             <h1 className="text-2xl font-black text-white">{config.prizeTextBig}</h1>
             <p className="text-xs text-neutral-500 font-medium tracking-wide">INTENTA TU SUERTE</p>
          </div>

          <div className="bg-black rounded-xl p-2 flex gap-2 border border-white/5 relative">
              <Reel targetSymbol={reels[0]} isSpinning={gameState === 'spinning'} delay={0} />
              <Reel targetSymbol={reels[1]} isSpinning={gameState === 'spinning'} delay={0.1} />
              <Reel targetSymbol={reels[2]} isSpinning={gameState === 'spinning'} delay={0.2} />
              <div className="absolute top-1/2 left-0 w-full h-[2px] bg-red-500/50 -translate-y-1/2 z-20" />
          </div>

          <div className="w-full min-h-[180px] flex items-end justify-center">
             <AnimatePresence mode='wait'>{renderInteractionArea()}</AnimatePresence>
          </div>
        </div>

        <div className="bg-black py-4 px-6 text-center border-t border-white/5">
          <p className="text-[9px] text-neutral-600 font-medium leading-normal">{config.legalText}</p>
          <p className="text-[8px] text-neutral-800 font-bold uppercase tracking-widest mt-2">Security by AdverGame Suite™</p>
        </div>
    </div>
  );
};

export default SlotMachine;