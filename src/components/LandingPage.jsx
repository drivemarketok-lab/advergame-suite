import React from 'react';
import { Play, CheckCircle, Zap, TrendingUp, Instagram } from 'lucide-react';

const LandingPage = ({ onTryDemo }) => {
  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-indigo-500/30 overflow-x-hidden">

      {/* NAV */}
      <nav className="flex justify-between items-center p-6 max-w-6xl mx-auto">
        <div className="flex items-center gap-2 font-bold text-xl tracking-tighter">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">🚀</div>
          AdverGame Suite
        </div>
        <button 
          onClick={onTryDemo}
          className="px-5 py-2 text-sm font-medium text-neutral-300 hover:text-white transition-colors border border-white/10 rounded-full hover:bg-white/5"
        >
          Probar Demo Gratis
        </button>
      </nav>

      {/* HERO SECTION */}
      <header className="max-w-6xl mx-auto px-6 py-20 lg:py-32 text-center relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-indigo-600/20 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative z-10 space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-indigo-300 text-xs font-medium uppercase tracking-widest">
            <Zap size={14} fill="currentColor"/> La nueva forma de vender en Instagram
          </div>

          <h1 className="text-5xl lg:text-7xl font-black tracking-tight leading-tight">
            Convierte Seguidores en <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 animate-pulse">Clientes Reales</span>
          </h1>

          <p className="text-lg text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            Deja de regalar likes. Crea juegos adictivos para tu marca, captura emails y llena tu local con cupones que la gente <b>realmente quiere ganar</b>.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button onClick={onTryDemo} className="px-8 py-4 bg-white text-black rounded-full font-bold text-lg hover:scale-105 transition-transform flex items-center gap-2 shadow-[0_0_40px_-10px_rgba(255,255,255,0.5)]">
              <Play size={20} fill="black" /> Ver Demo en Vivo
            </button>
            {/* AQUÍ ES DONDE PONES TU LINK DE GUMROAD */}
            <a href="#" className="px-8 py-4 bg-white/5 border border-white/10 text-white rounded-full font-bold text-lg hover:bg-white/10 transition-colors">
              Comprar Licencia
            </a>
          </div>
        </div>
      </header>

      {/* BENEFICIOS */}
      <section className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6 mb-32">
        {[
          { icon: <Instagram className="text-pink-500"/>, title: "Viral en Redes", desc: "El link perfecto para tu Bio. Tus seguidores jugarán, ganarán y compartirán." },
          { icon: <TrendingUp className="text-green-500"/>, title: "+30% Conversión", desc: "La gamificación convierte 10 veces más que un formulario aburrido." },
          { icon: <CheckCircle className="text-blue-500"/>, title: "Base de Datos Propia", desc: "Captura emails reales de tus clientes. El activo más valioso de tu negocio." }
        ].map((item, i) => (
          <div key={i} className="p-8 rounded-3xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
            <div className="mb-4 p-3 bg-white/5 rounded-2xl inline-block">{item.icon}</div>
            <h3 className="text-xl font-bold mb-2">{item.title}</h3>
            <p className="text-neutral-400 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </section>

      <footer className="border-t border-white/10 py-8 text-center text-neutral-600 text-sm">
        &copy; 2024 AdverGame Suite. Todos los derechos reservados.
      </footer>
    </div>
  );
};

export default LandingPage;