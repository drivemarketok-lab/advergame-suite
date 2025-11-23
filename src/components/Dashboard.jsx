import React from 'react';
import { Settings, Smartphone, Sparkles, RefreshCw, Percent, FileText } from 'lucide-react';
import { cn } from '../utils/cn';

const Dashboard = ({ config, setConfig }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setConfig(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-[#111111]/80 backdrop-blur-2xl text-neutral-200 p-8 rounded-[2rem] border border-white/5 shadow-2xl h-full flex flex-col">
      
      <div className="flex items-center gap-4 mb-8 pb-6 border-b border-white/5">
        <div className="h-10 w-10 rounded-full bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20">
          <Settings className="text-indigo-400 w-5 h-5" />
        </div>
        <div>
          <h2 className="text-lg font-medium text-white tracking-tight">Configuración</h2>
          <p className="text-xs text-neutral-500 font-medium">Modo Administrador</p>
        </div>
      </div>

      <div className="space-y-8 flex-1 overflow-y-auto pr-2 custom-scrollbar">
        
        <div className="space-y-4">
          <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Identidad</label>
          <div className="space-y-2">
            <span className="text-xs text-neutral-400 ml-1">Nombre del Negocio</span>
            <input type="text" name="brandName" value={config.brandName} onChange={handleChange} className="w-full bg-black/40 border border-white/5 text-white px-4 py-3 rounded-xl focus:ring-1 focus:ring-indigo-500/50 focus:border-indigo-500/50 outline-none transition-all placeholder:text-neutral-700 text-sm" />
          </div>
          <div className="space-y-2">
            <span className="text-xs text-neutral-400 ml-1">Logo / Emoji</span>
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {['⚡', '🔥', '💎', '🍔', '🍕', '🍹', '🎁'].map(emoji => (
                  <button key={emoji} onClick={() => setConfig({...config, logoEmoji: emoji})} className={cn("w-10 h-10 rounded-lg border flex items-center justify-center text-lg transition-all shrink-0", config.logoEmoji === emoji ? "bg-indigo-600 border-indigo-500 text-white shadow-[0_0_15px_-3px_rgba(99,102,241,0.4)]" : "bg-white/5 border-white/5 text-neutral-500 hover:bg-white/10 hover:text-white")}>{emoji}</button>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Economía del Juego</label>
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <span className="text-xs text-neutral-400 ml-1 flex items-center gap-1">Premio Cebo <span className="text-neutral-600">(Fácil)</span></span>
              <input type="text" name="prizeTextSmall" value={config.prizeTextSmall} onChange={handleChange} className="w-full bg-black/40 border border-white/5 text-white px-4 py-3 rounded-xl focus:border-yellow-500/50 outline-none transition-all placeholder:text-neutral-700 text-sm" />
            </div>
            <div className="space-y-2">
              <span className="text-xs text-neutral-400 ml-1 flex items-center gap-1">Premio Jackpot <Sparkles size={10} className="text-purple-400"/></span>
              <input type="text" name="prizeTextBig" value={config.prizeTextBig} onChange={handleChange} className="w-full bg-black/40 border border-white/5 text-white px-4 py-3 rounded-xl focus:border-purple-500/50 outline-none transition-all placeholder:text-neutral-700 text-sm shadow-[0_0_20px_-5px_rgba(168,85,247,0.1)]" />
            </div>
          </div>
        </div>

        <div className="p-5 bg-gradient-to-b from-white/5 to-transparent rounded-2xl border border-white/5 space-y-4">
           <div className="flex justify-between items-center">
              <label className="text-[10px] font-bold text-indigo-300 uppercase tracking-widest flex items-center gap-2"><Percent size={12}/> Probabilidad de Ganar</label>
              <span className="text-xs font-mono text-white bg-indigo-500/20 px-2 py-1 rounded">{config.winProbability}%</span>
           </div>
           <input type="range" name="winProbability" min="0" max="100" step="5" value={config.winProbability} onChange={handleChange} className="w-full h-2 bg-black/50 rounded-lg appearance-none cursor-pointer accent-indigo-500" />
           <div className="flex justify-between text-[10px] text-neutral-500 font-medium uppercase"><span>Imposible</span><span>Justo</span><span>Regalo</span></div>
        </div>

        {/* NUEVO: LEGALES */}
        <div className="space-y-2">
            <span className="text-xs text-neutral-400 ml-1 flex items-center gap-1"><FileText size={12}/> Términos y Condiciones</span>
            <textarea 
              name="legalText" 
              value={config.legalText} 
              onChange={handleChange}
              rows={3}
              className="w-full bg-black/40 border border-white/5 text-white px-4 py-3 rounded-xl focus:border-white/20 outline-none transition-all placeholder:text-neutral-700 text-[10px] resize-none leading-relaxed"
              placeholder="Ej: Válido solo para consumo en local..."
            />
        </div>

      </div>

      <div className="mt-6 pt-4 border-t border-white/5 space-y-3">
        <div className="flex items-center gap-3 px-4 py-3 bg-indigo-950/30 border border-indigo-500/20 rounded-xl">
           <Smartphone className="text-indigo-400 shrink-0" size={16}/>
           <p className="text-[10px] text-indigo-200/80 leading-relaxed">Vista previa activa. Los cambios se guardan automáticamente.</p>
        </div>
        <button onClick={() => { localStorage.removeItem(`advergame_${config.brandName}`); window.location.reload(); }} className="w-full py-3 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 rounded-xl flex items-center justify-center gap-2 transition-all text-[10px] font-bold uppercase tracking-widest hover:shadow-[0_0_15px_-5px_rgba(239,68,68,0.3)]">
          <RefreshCw size={12} /> Resetear Juego
        </button>
      </div>
    </div>
  );
};

export default Dashboard;