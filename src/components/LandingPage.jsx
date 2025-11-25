import React from 'react';
import { Play, CheckCircle, Zap, TrendingUp, Instagram, Smartphone, Gift, Shield, MousePointer, Users } from 'lucide-react';

const LandingPage = ({ onTryDemo }) => {
  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-indigo-500/30 overflow-x-hidden">
      
      {/* --- NAV --- */}
      <nav className="flex justify-between items-center p-6 max-w-6xl mx-auto border-b border-white/5 sticky top-0 bg-[#050505]/80 backdrop-blur-md z-50">
        <div className="flex items-center gap-2 font-bold text-xl tracking-tighter">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/30">🚀</div>
          AdverGame Suite
        </div>
        <button 
          onClick={onTryDemo}
          className="hidden md:block px-5 py-2 text-sm font-medium text-neutral-300 hover:text-white transition-colors border border-white/10 rounded-full hover:bg-white/5"
        >
          Ver Demo
        </button>
      </nav>

      {/* --- HERO SECTION --- */}
      <header className="max-w-5xl mx-auto px-6 py-20 lg:py-32 text-center relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/20 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-indigo-300 text-xs font-bold uppercase tracking-widest animate-fade-in">
            <Zap size={14} fill="currentColor"/> La nueva forma de vender en Instagram
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-black tracking-tight leading-tight">
            Deja de postear fotos. <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">Empieza a crear Juegos.</span>
          </h1>
          
          <p className="text-lg text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            Transforma seguidores pasivos en clientes comprando. Crea ruletas de premios personalizadas en minutos, captura emails y llena tu local con cupones que la gente <b>realmente quiere ganar</b>.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <button onClick={onTryDemo} className="px-8 py-4 bg-white text-black rounded-full font-bold text-lg hover:scale-105 transition-transform flex items-center gap-2 shadow-[0_0_40px_-10px_rgba(255,255,255,0.5)]">
              <Play size={20} fill="black" /> Probar el Juego
            </button>
            <a href="#pricing" className="px-8 py-4 bg-white/5 border border-white/10 text-white rounded-full font-bold text-lg hover:bg-white/10 transition-colors">
              Comprar Licencia
            </a>
          </div>
        </div>
      </header>

      {/* --- PROBLEM VS SOLUTION --- */}
      <section className="py-20 bg-neutral-900/30 border-y border-white/5">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
           <div className="space-y-6">
              <h2 className="text-3xl font-bold">El problema de las Historias de Instagram</h2>
              <p className="text-neutral-400 leading-relaxed">
                {/* AQUÍ ESTABA EL ERROR: He cambiado las comillas dobles por &quot; */}
                Tus seguidores ven cientos de historias al día. Una foto estática con un &quot;20% OFF&quot; es invisible para ellos. Deslizan y se olvidan.
                <br/><br/>
                El resultado: <b>Muchos views, pocas ventas y cero datos de tus clientes.</b>
              </p>
           </div>
           <div className="p-6 bg-black/40 rounded-2xl border border-white/10 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-transparent pointer-events-none"/>
              <div className="flex items-center gap-4 text-neutral-500 mb-4">
                 <div className="w-12 h-12 rounded-full bg-neutral-800 flex items-center justify-center">😑</div>
                 <div>
                    <div className="h-2 w-32 bg-neutral-800 rounded mb-1"/>
                    <div className="h-2 w-20 bg-neutral-800 rounded"/>
                 </div>
              </div>
              <div className="h-64 bg-neutral-800/50 rounded-xl flex items-center justify-center text-neutral-600 font-mono text-sm">
                 PUBLICIDAD ABURRIDA
              </div>
           </div>
        </div>
      </section>

      {/* --- FEATURES GRID --- */}
      <section className="py-32 max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black mb-4">¿Por qué AdverGame Suite™ funciona?</h2>
          <p className="text-neutral-400">Psicología aplicada a las ventas. No es suerte, es estrategia.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            { 
              icon: <Smartphone className="text-purple-400"/>, 
              title: "Experiencia Móvil Nativa", 
              desc: "Diseñado para verse increíble dentro del navegador de Instagram y TikTok. Sin descargas." 
            },
            { 
              icon: <Users className="text-pink-400"/>, 
              title: "Captura de Leads Real", 
              desc: "El juego está bloqueado. Para girar la ruleta, el usuario debe dejarte su email. Construye tu base de datos." 
            },
            { 
              icon: <Shield className="text-green-400"/>, 
              title: "Sistema Anti-Fraude", 
              desc: "Cada email puede jugar una sola vez. Evita que los clientes abusen de tus promociones." 
            },
            { 
              icon: <Gift className="text-yellow-400"/>, 
              title: "Psicología de Casino", 
              desc: "Sonidos, luces y el efecto 'casi gano' liberan dopamina y aumentan el deseo de canjear el premio." 
            },
            { 
              icon: <MousePointer className="text-blue-400"/>, 
              title: "Panel de Control", 
              desc: "Tú decides los premios y la probabilidad de ganar (0% a 100%). Tienes el control total." 
            },
            { 
              icon: <Instagram className="text-orange-400"/>, 
              title: "Viralidad Integrada", 
              desc: "Botón de WhatsApp al finalizar para que los ganadores inviten a sus amigos a jugar." 
            }
          ].map((item, i) => (
            <div key={i} className="p-8 rounded-3xl bg-white/5 border border-white/5 hover:border-indigo-500/30 hover:bg-indigo-500/5 transition-all group">
              <div className="mb-4 p-3 bg-black rounded-xl inline-block border border-white/10 group-hover:scale-110 transition-transform">{item.icon}</div>
              <h3 className="text-lg font-bold mb-2 text-white">{item.title}</h3>
              <p className="text-sm text-neutral-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- HOW IT WORKS --- */}
      <section className="py-20 bg-gradient-to-b from-[#0a0a0a] to-indigo-900/20 border-y border-white/5">
         <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-12">Lanza tu campaña en 3 pasos</h2>
            <div className="grid md:grid-cols-3 gap-8 text-left">
               <div className="relative pl-8 border-l-2 border-indigo-500">
                  <span className="absolute -left-[9px] top-0 w-4 h-4 bg-indigo-500 rounded-full"/>
                  <h4 className="text-lg font-bold text-white mb-2">1. Configura</h4>
                  <p className="text-sm text-neutral-400">Entra a tu panel privado. Sube tu logo, define tus premios y ajusta la dificultad.</p>
               </div>
               <div className="relative pl-8 border-l-2 border-purple-500">
                  <span className="absolute -left-[9px] top-0 w-4 h-4 bg-purple-500 rounded-full"/>
                  <h4 className="text-lg font-bold text-white mb-2">2. Publica</h4>
                  <p className="text-sm text-neutral-400">El sistema te da un link único. Pégalo en tu Bio de Instagram o en tus Stories.</p>
               </div>
               <div className="relative pl-8 border-l-2 border-pink-500">
                  <span className="absolute -left-[9px] top-0 w-4 h-4 bg-pink-500 rounded-full"/>
                  <h4 className="text-lg font-bold text-white mb-2">3. Vende</h4>
                  <p className="text-sm text-neutral-400">Tus seguidores juegan, te dejan su mail y van a tu local a canjear el premio.</p>
               </div>
            </div>
         </div>
      </section>

      {/* --- PRICING CTA --- */}
      <section id="pricing" className="max-w-3xl mx-auto px-6 py-32 text-center">
        <div className="p-12 rounded-[3rem] bg-[#111] border border-white/10 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-indigo-500/20 blur-[100px] rounded-full pointer-events-none" />
          
          <div className="relative z-10">
            <h2 className="text-4xl font-black mb-6">Oferta de Lanzamiento</h2>
            <p className="text-neutral-400 mb-8">
              Acceso de por vida. Sin mensualidades. Todo incluido.
            </p>
            
            <div className="flex items-center justify-center gap-3 mb-8">
              <span className="text-2xl text-neutral-500 line-through">$14.99</span>
              <span className="text-6xl font-black text-white">$9.99</span>
            </div>

            {/* BOTÓN DE GUMROAD REAL */}
            <a 
              href="https://drivemarket.gumroad.com/l/advergame-suite" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block w-full md:w-auto px-12 py-5 bg-white text-black rounded-2xl font-black text-xl hover:scale-105 hover:bg-neutral-200 transition-all shadow-[0_0_30px_rgba(255,255,255,0.3)]"
            >
              OBTENER MI LICENCIA AHORA
            </a>
            
            <div className="mt-6 flex items-center justify-center gap-4 text-xs text-neutral-500">
               <span className="flex items-center gap-1"><CheckCircle size={12}/> Pago Seguro</span>
               <span className="flex items-center gap-1"><CheckCircle size={12}/> Entrega Inmediata</span>
               <span className="flex items-center gap-1"><CheckCircle size={12}/> Soporte Incluido</span>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 py-8 text-center text-neutral-600 text-xs">
        <p>&copy; 2024 AdverGame Suite. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default LandingPage;