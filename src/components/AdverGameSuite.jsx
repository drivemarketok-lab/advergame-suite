import React, { useState, useEffect } from 'react';
import { CheckCircle, Star, Percent, Gift, CalendarClock } from 'lucide-react';
import Dashboard from './Dashboard';
import SlotMachine from './SlotMachine';
import LandingPage from './LandingPage'; // <--- IMPORTAMOS LA LANDING

export default function AdverGameSuite() {
  // Estados posibles: 'loading', 'landing', 'demo', 'admin', 'ticket'
  const [viewMode, setViewMode] = useState('loading'); 
  const [ticketData, setTicketData] = useState(null);

  const [config, setConfig] = useState({
    brandName: 'Neon Burger',
    prizeTextSmall: 'Papas Gratis',
    prizeTextBig: 'Cena Completa',
    logoType: 'emoji',
    logoEmoji: '🍔',
    winProbability: 50,
    legalText: 'Válido de Lunes a Jueves. No acumulable con otras promociones.'
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    
    // 1. MODO ADMIN (Tú configurando)
    if (params.get('admin') === 'true') {
      setViewMode('admin');
      return;
    }

    // 2. MODO TICKET (Vendedor escaneando)
    if (params.get('mode') === 'ticket') {
      const discount = params.get('discount'); 
      const prize = params.get('prize');       

      setTicketData({
        value: prize || discount, 
        type: prize ? 'text' : 'percent', 
        brand: params.get('brand'),
        expires: params.get('expires'),
        status: 'valid'
      });
      setViewMode('ticket');
      return;
    }

    // 3. SI EL CLIENTE YA COMPRÓ (Tiene un ID de juego propio)
    // Para este MVP, asumimos que si la URL tiene ?client=algo, va directo al juego
    if (params.get('client')) {
        setViewMode('game_final'); // Muestra el juego directo
        return;
    }

    // 4. POR DEFECTO: Mostrar Landing Page
    setViewMode('landing');
  }, []);

  if (viewMode === 'loading') return null;

  // --- RENDERIZADO DE VISTAS ---

  // A) LANDING PAGE
  if (viewMode === 'landing') {
      return <LandingPage onTryDemo={() => setViewMode('demo')} />;
  }

  // B) PANTALLA TICKET (VALIDACIÓN)
  if (viewMode === 'ticket') {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4 font-sans">
        <div className="w-full max-w-sm bg-white rounded-3xl overflow-hidden shadow-2xl relative animate-in fade-in zoom-in duration-500">
           <div className="bg-emerald-500 p-8 text-center relative overflow-hidden">
             <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
             <div className="relative z-10">
               <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm border border-white/30">
                 <CheckCircle className="text-white w-10 h-10" />
               </div>
               <h1 className="text-2xl font-black text-white uppercase tracking-widest">CUPÓN VÁLIDO</h1>
               <p className="text-emerald-100 text-sm font-medium mt-1">Verificado por el sistema</p>
             </div>
           </div>
           <div className="p-8 text-center relative">
             <div className="uppercase text-xs font-bold text-neutral-400 tracking-widest mb-2">PREMIO APLICABLE EN</div>
             <h2 className="text-2xl font-bold text-neutral-800 mb-6">{ticketData?.brand}</h2>
             <div className="border-2 border-dashed border-neutral-200 rounded-2xl p-6 mb-4 bg-neutral-50">
                <p className="text-sm text-neutral-500 mb-2">Detalle del Premio</p>
                {ticketData?.type === 'percent' ? (
                  <div className="text-5xl font-black text-neutral-900 flex items-center justify-center gap-1">
                    {ticketData?.value}
                    <Percent size={30} className="text-neutral-400"/>
                    <span className="text-xl">OFF</span>
                  </div>
                ) : (
                  <div className="text-3xl font-black text-neutral-900 leading-tight break-words">{ticketData?.value}</div>
                )}
             </div>
             <div className="flex items-center justify-center gap-2 text-red-500 font-medium mb-6 text-xs bg-red-50 py-2 px-3 rounded-lg inline-flex">
                <CalendarClock size={14} /> <span>Vence el: {ticketData?.expires}</span>
             </div>
             <div className="flex items-center justify-center gap-2 text-emerald-600 font-medium bg-emerald-50 py-2 px-4 rounded-full text-sm">
                {ticketData?.type === 'percent' ? <Gift size={14}/> : <Star size={14} fill="currentColor" />}
                <span>Autorizado para canje</span>
             </div>
             <div className="absolute top-0 left-0 -mt-3 -ml-3 w-6 h-6 bg-black rounded-full" />
             <div className="absolute top-0 right-0 -mt-3 -mr-3 w-6 h-6 bg-black rounded-full" />
           </div>
        </div>
      </div>
    );
  }

  // C) MODO JUEGO (Demo, Final o Admin)
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center p-4 md:p-8 font-sans relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.1),rgba(255,255,255,0))]" />
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none" />

      {/* Botón volver a home si es Demo */}
      {viewMode === 'demo' && (
          <button onClick={() => setViewMode('landing')} className="absolute top-6 left-6 z-50 text-xs text-neutral-500 hover:text-white flex items-center gap-2">
             ← Volver al Inicio
          </button>
      )}

      <div className={`max-w-7xl w-full grid gap-12 z-10 ${viewMode === 'admin' ? 'grid-cols-1 lg:grid-cols-12' : 'grid-cols-1 place-items-center'}`}>
        
        {/* PANEL (Solo visible en Admin) */}
        {viewMode === 'admin' && (
          <div className="lg:col-span-4 order-2 lg:order-1 h-full w-full">
             <Dashboard config={config} setConfig={setConfig} />
          </div>
        )}

        {/* JUEGO */}
        <div className={`${viewMode === 'admin' ? 'lg:col-span-8 order-1 lg:order-2' : 'w-full max-w-md'} flex justify-center items-center perspective-[2000px] min-h-[800px]`}>
           <SlotMachine config={config} />
        </div>

      </div>
    </div>
  );
}