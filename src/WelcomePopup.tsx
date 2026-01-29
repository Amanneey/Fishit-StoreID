
import React, { useState, useEffect } from 'react';

const WelcomePopup: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasVisited = localStorage.getItem('fishit_visited_session');
    if (!hasVisited) {
      // Small delay for better UX
      const timer = setTimeout(() => setIsOpen(true), 500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem('fishit_visited_session', 'true');
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md" onClick={handleClose} />
      
      {/* Modal Container */}
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-[2.5rem] shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden animate-in fade-in zoom-in duration-500">
        
        {/* Glow effect */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl"></div>

        <div className="relative p-8 flex flex-col items-center text-center">
          {/* Icon */}
          <div className="w-20 h-20 bg-gradient-to-tr from-cyan-500 to-indigo-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-cyan-500/20 mb-6 rotate-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>

          <h2 className="text-2xl font-black font-outfit mb-4 uppercase tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-500 drop-shadow-[0_0_10px_rgba(34,211,238,0.3)]">
              Halo Sobat Talon!
            </span>
          </h2>
          
          <div className="space-y-4 text-slate-400 text-sm leading-relaxed">
            <p>
              Selamat datang di <span className="text-cyan-400 font-bold">FISH IT STORE ID</span>.
            </p>
            
            <div className="bg-slate-950/50 border border-slate-800 rounded-2xl p-5 text-left relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 blur-2xl rounded-full"></div>
              
              <p className="text-[10px] text-cyan-500 font-black uppercase tracking-widest mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-pulse"></span>
                Penting Untuk Diketahui:
              </p>
              
              <ul className="space-y-3 text-[11px]">
                <li className="flex gap-2">
                  <span className="text-cyan-400 font-bold">•</span>
                  <span>Pastikan ID Game / Nickname Roblox diisi dengan benar.</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-cyan-400 font-bold">•</span>
                  <span>Proses pengiriman memakan waktu <span className="text-white font-bold">3-5 Menit</span>.</span>
                </li>
                <li className="flex gap-2 items-start bg-emerald-500/10 -mx-2 px-2 py-2 rounded-lg border border-emerald-500/20">
                  <span className="text-emerald-400 font-bold mt-0.5 animate-bounce">!</span>
                  <span className="text-emerald-300 font-bold leading-tight">
                    WAJIB: Klik tombol <span className="text-white bg-emerald-600 px-1.5 py-0.5 rounded text-[9px] mx-0.5">KONTAK MIMIN!</span> setelah Pembayaran agar pesanan langsung kami proses!
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-cyan-400 font-bold">•</span>
                  <span>Gunakan Link Private Server yang disediakan setelah konfirmasi.</span>
                </li>
              </ul>
            </div>
          </div>

          <button 
            onClick={handleClose}
            className="mt-8 w-full py-4 bg-white hover:bg-slate-200 text-slate-950 font-black rounded-2xl transition-all shadow-xl active:scale-[0.98] uppercase tracking-widest text-xs"
          >
            Siap, Lanjut ke Toko
          </button>
          
          <p className="mt-4 text-[9px] text-slate-500 font-bold uppercase tracking-widest">
            Terima kasih telah mempercayai kami
          </p>
        </div>
      </div>
    </div>
  );
};

export default WelcomePopup;
