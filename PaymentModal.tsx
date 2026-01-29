
import React, { useState, useEffect } from 'react';
import { Product, CartItem } from '../types';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: (Product & { quantity?: number }) | null;
  cartItems?: CartItem[];
}

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, product, cartItems = [] }) => {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [transactionId, setTransactionId] = useState('');
  const [displayDate, setDisplayDate] = useState('');
  const [displayTime, setDisplayTime] = useState('');
  const [idGame, setIdGame] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [isLogging, setIsLogging] = useState(false);

  const adminNumber = "6285198326016"; 
  
  const isCartCheckout = !product && cartItems.length > 0;
  const totalPrice = isCartCheckout 
    ? cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    : (product ? product.price * (product.quantity || 1) : 0);

  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => {
        setIsConfirmed(false);
        setTransactionId('');
        setDisplayDate('');
        setDisplayTime('');
        setIdGame('');
        setWhatsapp('');
        setIsLogging(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen || (!product && !isCartCheckout)) return null;

  const qrisFullImage = "https://i.ibb.co.com/Fb3g4Qk0/Screenshot-2026-01-28-15-37-11-859-com-android-chrome.png";
  const privateServerUrl = "https://www.roblox.com/share?code=eb8ac06f96738c4b9fa374eacd15f495&type=Server";

  const handleDownloadQR = async () => {
    try {
      // Mencoba fetch blob untuk download langsung
      const response = await fetch(qrisFullImage);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `QRIS-FISHIT-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      // Jika CORS gagal, buka di tab baru sebagai fallback
      window.open(qrisFullImage, '_blank');
    }
  };

  const handleConfirm = async () => {
    if (!idGame.trim()) {
      alert("Silahkan masukkan ID Game / Nickname Anda agar pesanan dapat diproses.");
      return;
    }

    setIsLogging(true);

    const now = new Date();
    const date = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = String(now.getFullYear());
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    
    const uniqueCode = `${date}${month}${year}${hours}${minutes}${seconds}`;
    
    setTransactionId(uniqueCode);
    setDisplayDate(`${date}/${month}/${year}`);
    setDisplayTime(`${hours}:${minutes} WIB`);
    setIsConfirmed(true);
    setIsLogging(false);
  };

  const sendNotificationToAdmin = () => {
    let itemDetails = "";
    if (isCartCheckout) {
      itemDetails = cartItems.map(item => `- ${item.name} (${item.quantity}x)`).join('%0A');
    } else if (product) {
      itemDetails = `- ${product.name} (${product.quantity || 1}x)`;
    }

    const message = `*NOTIFIKASI PESANAN BARU - FISH IT STORE*%0A` +
      `--------------------------------------%0A` +
      `*ID Transaksi:* ${transactionId}%0A` +
      `*Items:*%0A${itemDetails}%0A` +
      `*Total Bayar:* Rp ${totalPrice.toLocaleString('id-ID')}%0A` +
      `*ID Game:* ${idGame}%0A` +
      `*WhatsApp Pembeli:* ${whatsapp || '-'}%0A` +
      `*Waktu:* ${displayDate} | ${displayTime}%0A` +
      `--------------------------------------%0A` +
      `_Mohon segera diproses, terima kasih!_`;

    window.open(`https://wa.me/${adminNumber}?text=${message}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-md" onClick={onClose} />
      
      <div className="relative w-full max-w-lg bg-[#0b121e] border border-slate-800 rounded-[2rem] shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in duration-300">
        {!isConfirmed ? (
          <>
            <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-900/50">
              <div className="flex flex-col">
                <h2 className="text-xl font-outfit font-bold text-white uppercase tracking-tight">Checkout QRIS</h2>
                <p className="text-[10px] text-cyan-500 font-bold uppercase tracking-[0.2em]">Sistem Pembayaran Instant</p>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-slate-800 rounded-full transition-colors text-slate-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex-grow overflow-y-auto max-h-[75vh] hide-scrollbar">
              <div className="px-6 py-4 bg-slate-800/30 border-b border-slate-800/50">
                 <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Metode Pembayaran</p>
                      <p className="text-sm font-bold text-white leading-tight">QRIS (Gopay, Dana, OVO, Bank)</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Total Bayar</p>
                      <p className="text-xl font-black text-cyan-400">Rp {totalPrice.toLocaleString('id-ID')}</p>
                    </div>
                 </div>
              </div>

              <div className="p-6 space-y-6">
                {/* QR Section with Download Feature */}
                <div className="flex flex-col items-center gap-4">
                  <div className="w-full max-w-[260px] bg-white rounded-2xl p-2 shadow-2xl relative group">
                    <img src={qrisFullImage} alt="QRIS" className="w-full h-full object-cover rounded-xl" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center">
                       <p className="text-white text-[10px] font-black uppercase tracking-widest">Scan Me</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-center gap-2 w-full max-w-[260px]">
                    <button 
                      onClick={handleDownloadQR}
                      className="w-full py-2.5 bg-cyan-900/30 hover:bg-cyan-900/50 text-cyan-400 border border-cyan-800/50 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 group"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 group-hover:translate-y-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      <span className="text-[10px] font-black uppercase tracking-widest">Simpan QR Ke Galeri</span>
                    </button>
                  </div>
                </div>

                <div className="space-y-4 pt-2">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1 mb-2 block">ID Game / Nickname *</label>
                    <input type="text" value={idGame} onChange={(e) => setIdGame(e.target.value)} placeholder="Masukkan Nickname Roblox" className="w-full bg-slate-950/50 border border-slate-800 focus:border-cyan-500/50 rounded-2xl p-4 text-sm text-white outline-none placeholder:text-slate-700" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1 mb-2 block">WhatsApp (Opsional)</label>
                    <input type="text" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} placeholder="Nomor WhatsApp Anda" className="w-full bg-slate-950/50 border border-slate-800 focus:border-cyan-500/50 rounded-2xl p-4 text-sm text-white outline-none placeholder:text-slate-700" />
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-slate-800 bg-slate-900">
              <button 
                onClick={handleConfirm} 
                disabled={isLogging}
                className="w-full py-4 bg-white text-slate-950 font-black rounded-2xl transition-all shadow-xl active:scale-95 text-sm uppercase tracking-widest flex items-center justify-center gap-2"
              >
                {isLogging ? (
                  <span className="w-5 h-5 border-2 border-slate-900 border-t-transparent rounded-full animate-spin"></span>
                ) : 'KONFIRMASI PEMBAYARAN'}
              </button>
            </div>
          </>
        ) : (
          <div className="p-8 flex flex-col items-center">
            {/* Success Icon */}
            <div className="w-20 h-20 bg-[#10b98120] rounded-full flex items-center justify-center mb-6 relative">
              <div className="absolute inset-0 bg-[#10b98130] blur-xl rounded-full"></div>
              <div className="w-14 h-14 bg-[#10b981] rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" /></svg>
              </div>
            </div>

            {/* Success Header */}
            <h2 className="text-3xl font-[900] text-white mb-2 font-outfit tracking-tight">KONFIRMASI BERHASIL!</h2>
            <p className="text-slate-400 text-[11px] leading-relaxed text-center mb-8 max-w-sm">
              Pembayaran Anda Sedang kami Proses. Harap Menunggu <span className="text-[#10b981] font-bold">3-5 Menit</span>, Dimohon untuk Masuk ke dalam Private Server dibawah ya
            </p>
            
            {/* Action Buttons */}
            <div className="w-full grid grid-cols-2 gap-4 mb-8">
              <button 
                onClick={sendNotificationToAdmin} 
                className="py-6 bg-[#0fa968] hover:bg-[#0d945a] rounded-[1.5rem] flex flex-col items-center justify-center gap-2 transition-all active:scale-95 group"
              >
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.94 3.659 1.437 5.63 1.437h.008c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                <span className="text-white text-xs font-[900] uppercase tracking-wider">KONTAK MIMIN!</span>
              </button>
              <a 
                href={privateServerUrl} 
                target="_blank" 
                className="py-6 bg-[#3b82f6] hover:bg-[#2563eb] rounded-[1.5rem] flex flex-col items-center justify-center gap-2 transition-all active:scale-95 group"
              >
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                <span className="text-white text-xs font-[900] uppercase tracking-wider">JOIN SERVER</span>
              </a>
            </div>

            {/* Digital Receipt Card */}
            <div className="w-full bg-[#0d1726] border border-[#1e293b] rounded-[2rem] p-8 mb-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">ITEM DIBELI</p>
                  <div className="flex flex-col">
                    <h4 className="text-white text-lg font-black font-outfit leading-tight">
                      {isCartCheckout ? (
                        cartItems.length > 1 ? `${cartItems[0].name} & ${cartItems.length - 1} lainnya` : cartItems[0].name
                      ) : (
                        product ? product.name : '-'
                      )}
                    </h4>
                    <p className="text-cyan-400 text-xs font-bold uppercase tracking-widest mt-1">
                      {isCartCheckout ? (
                        `${cartItems.reduce((acc, item) => acc + item.quantity, 0)} Items Total`
                      ) : (
                        product ? `Kuantitas: ${product.quantity || 1}x` : ''
                      )}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">TOTAL BAYAR</p>
                  <p className="text-white text-lg font-black">Rp {totalPrice.toLocaleString('id-ID')}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-y-6 pt-6 border-t border-[#1e293b]">
                <div>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">ID GAME</p>
                  <p className="text-white text-sm font-bold">{idGame}</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">STATUS</p>
                  <p className="text-[#10b981] text-sm font-black uppercase">TERCATAT</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">TANGGAL</p>
                  <p className="text-white text-sm font-bold">{displayDate}</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">WAKTU</p>
                  <p className="text-white text-sm font-bold">{displayTime}</p>
                </div>
              </div>

              <div className="mt-8 bg-[#0a111c] border border-[#1e293b] rounded-2xl p-4">
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-2">ID TRANSAKSI UNIK</p>
                <p className="text-[#22d3ee] text-base font-[900] tracking-[0.1em] font-mono">{transactionId}</p>
              </div>
            </div>

            <button 
              onClick={onClose} 
              className="w-full py-5 bg-[#1e293b] hover:bg-[#2e3c50] text-slate-300 font-[900] text-xs uppercase tracking-[0.1em] rounded-2xl transition-all active:scale-95"
            >
              KEMBALI KE TOKO
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentModal;
