
import React, { useState, useEffect } from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, quantity: number) => void;
  onBuyNow: (product: Product, quantity: number) => void;
}

const Countdown: React.FC<{ endDate: string }> = ({ endDate }) => {
  const [timeLeft, setTimeLeft] = useState<{ d: number; h: number; m: number; s: number } | null>(null);

  useEffect(() => {
    const calculate = () => {
      const difference = +new Date(endDate) - +new Date();
      if (difference <= 0) {
        setTimeLeft(null);
        return;
      }
      setTimeLeft({
        d: Math.floor(difference / (1000 * 60 * 60 * 24)),
        h: Math.floor((difference / (1000 * 60 * 60)) % 24),
        m: Math.floor((difference / 1000 / 60) % 60),
        s: Math.floor((difference / 1000) % 60),
      });
    };

    calculate();
    const timer = setInterval(calculate, 1000);
    return () => clearInterval(timer);
  }, [endDate]);

  if (!timeLeft) return <div className="text-[10px] font-bold text-rose-500 uppercase tracking-widest">Berakhir!</div>;

  return (
    <div className="flex items-center gap-1 mt-1">
      <span className="text-[9px] text-slate-400 font-bold uppercase mr-1">Sisa Waktu:</span>
      <div className="flex gap-0.5">
        <div className="bg-amber-400 text-slate-950 px-1 py-0.5 rounded text-[10px] font-black shadow-[0_0_10px_rgba(251,191,36,0.4)]">
          {timeLeft.d}d
        </div>
        <div className="bg-amber-400 text-slate-950 px-1 py-0.5 rounded text-[10px] font-black shadow-[0_0_10px_rgba(251,191,36,0.4)]">
          {timeLeft.h}h
        </div>
        <div className="bg-amber-400 text-slate-950 px-1 py-0.5 rounded text-[10px] font-black shadow-[0_0_10px_rgba(251,191,36,0.4)]">
          {timeLeft.m}m
        </div>
      </div>
    </div>
  );
};

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onBuyNow }) => {
  const [selectedPack, setSelectedPack] = useState<'1x' | '5x'>('1x');
  const [quantity, setQuantity] = useState(1);
  const isPromo = product.category === 'PROMO';
  const has5x = !!product.price5x;
  
  const currentPrice = selectedPack === '5x' && product.price5x ? product.price5x : product.price;
  const currentOldPrice = selectedPack === '5x' && product.oldPrice5x ? product.oldPrice5x : product.oldPrice;
  const hasDiscount = !!currentOldPrice && currentOldPrice > currentPrice;

  // Logika Otomatisasi untuk Skin Crates
  const handleQtyChange = (val: number) => {
    const nextQty = quantity + val;

    if (has5x) {
      if (selectedPack === '1x' && nextQty >= 5) {
        // Otomatis pindah ke 5x hemat jika mencapai 5
        setSelectedPack('5x');
        setQuantity(1);
        return;
      }
      if (selectedPack === '5x' && nextQty < 1) {
        // Otomatis balik ke 1x jika dikurangi dari pack 5x
        setSelectedPack('1x');
        setQuantity(4);
        return;
      }
    }

    setQuantity(Math.max(1, Math.min(99, nextQty)));
  };

  const getSelectedProductData = (): Product => {
    if (selectedPack === '5x' && product.price5x) {
      return {
        ...product,
        name: `${product.name} (5x Pack)`,
        price: product.price5x,
        oldPrice: product.oldPrice5x
      };
    }
    return {
      ...product,
      name: has5x ? `${product.name} (1x)` : product.name
    };
  };

  return (
    <div className={`group relative flex flex-col bg-slate-900/50 backdrop-blur-sm border rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.02] shadow-lg ${isPromo ? 'border-amber-500/50 ring-1 ring-amber-500/20' : 'border-slate-800 hover:border-slate-700'}`}>
      <div className="relative h-36 overflow-hidden bg-slate-950">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        {product.rarity && !isPromo && product.category !== 'Secret Fish' && (
          <span className="absolute top-2 left-2 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-widest bg-black/70 text-white rounded-md backdrop-blur-md border border-white/10">
            {product.rarity}
          </span>
        )}

        {isPromo && (
          <div className="absolute top-2 left-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-slate-950 text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest shadow-lg animate-pulse">
            SALE
          </div>
        )}

        {hasDiscount && (
          <div className="absolute top-2 right-2 bg-rose-600 text-white text-[8px] font-black px-1.5 py-0.5 rounded uppercase tracking-widest shadow-lg">
            SAVE {Math.round((1 - currentPrice / currentOldPrice!) * 100)}%
          </div>
        )}
      </div>
      
      <div className="p-3 flex flex-col flex-grow">
        <h3 className={`text-sm font-bold font-outfit transition-colors leading-tight line-clamp-1 ${isPromo ? 'text-amber-400 group-hover:text-white' : 'text-white group-hover:text-cyan-400'}`}>
          {product.name}
        </h3>
        
        {isPromo && product.promoEndDate && (
          <Countdown endDate={product.promoEndDate} />
        )}

        <p className="mt-1 text-[10px] text-slate-400 line-clamp-2 leading-tight">
          {product.description}
        </p>

        {has5x && (
          <div className="mt-3 flex gap-1 p-1 bg-slate-950/50 border border-slate-800 rounded-lg">
            <button 
              onClick={() => { setSelectedPack('1x'); setQuantity(1); }}
              className={`flex-1 py-1 text-[9px] font-black uppercase tracking-widest rounded-md transition-all ${selectedPack === '1x' ? 'bg-slate-700 text-white shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}
            >
              1x Beli
            </button>
            <button 
              onClick={() => { setSelectedPack('5x'); setQuantity(1); }}
              className={`flex-1 py-1 text-[9px] font-black uppercase tracking-widest rounded-md transition-all flex items-center justify-center gap-1 ${selectedPack === '5x' ? 'bg-cyan-600 text-white shadow-md' : 'text-slate-500 hover:text-cyan-400'}`}
            >
              5x Hemat
              <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
            </button>
          </div>
        )}
        
        <div className="mt-auto pt-3">
          {/* Quantity Selector */}
          <div className="flex items-center justify-between mb-3 p-1.5 bg-slate-950/40 border border-slate-800/50 rounded-xl">
            <span className="text-[9px] font-bold text-slate-500 uppercase ml-2 tracking-widest">Qty</span>
            <div className="flex items-center gap-3">
              <button onClick={() => handleQtyChange(-1)} className="w-6 h-6 flex items-center justify-center bg-slate-800 rounded-md hover:bg-slate-700 text-white text-xs font-bold transition-colors">-</button>
              <span className="text-xs font-black text-white w-4 text-center">{quantity}</span>
              <button onClick={() => handleQtyChange(1)} className="w-6 h-6 flex items-center justify-center bg-slate-800 rounded-md hover:bg-slate-700 text-white text-xs font-bold transition-colors">+</button>
            </div>
          </div>

          <div className="flex flex-col mb-2">
            {hasDiscount && (
              <span className="text-[10px] text-slate-500 line-through font-bold">
                Rp {currentOldPrice?.toLocaleString('id-ID')}
              </span>
            )}
            <div className={`text-base font-black ${isPromo ? 'text-amber-400' : 'text-white'}`}>
              Rp {(currentPrice * quantity).toLocaleString('id-ID')}
            </div>
          </div>
          <div className="flex gap-1.5">
            <button 
              onClick={() => onBuyNow(getSelectedProductData(), quantity)}
              className={`flex-grow py-1.5 text-white text-[10px] font-bold rounded-lg transition-all active:scale-95 shadow-md ${isPromo ? 'bg-amber-600 hover:bg-amber-500 shadow-amber-900/20' : 'bg-cyan-600 hover:bg-cyan-500 shadow-cyan-900/20'}`}
            >
              Beli Sekarang
            </button>
            <button 
              onClick={() => onAddToCart(getSelectedProductData(), quantity)}
              className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-all active:scale-95 border border-slate-700"
              aria-label="Tambah ke keranjang"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
