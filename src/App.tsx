
import React, { useState } from 'react';
import { Product, CartItem, Category } from './types';
import { PRODUCTS } from './constants';
import ProductCard from './components/ProductCard';
import CartSidebar from './components/CartSidebar';
import WhatsAppButton from './components/WhatsAppButton';
import PaymentModal from './components/PaymentModal';
import AIAssistant from './components/AIAssistant';
import WelcomePopup from './components/WelcomePopup';

const SECTIONS: Category[] = ['Secret Fish', 'Gamepass', 'Skin Crates', 'Enchant Items', 'Bundle Pack'];

const App: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartCheckout, setIsCartCheckout] = useState(false);
  const [buyQuantity, setBuyQuantity] = useState(1);

  // Slugify helper to ensure IDs and Hrefs match perfectly
  const slugify = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  const addToCart = (product: Product, quantity: number) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id && item.name === product.name);
      if (existing) {
        return prev.map(item => (item.id === product.id && item.name === product.name) ? { ...item, quantity: item.quantity + quantity } : item);
      }
      return [...prev, { ...product, quantity }];
    });
    setIsCartOpen(true);
  };

  const handleBuyNow = (product: Product, quantity: number) => {
    setSelectedProduct(product);
    setBuyQuantity(quantity);
    setIsCartCheckout(false);
    setIsPaymentOpen(true);
  };

  const handleCartCheckout = () => {
    setSelectedProduct(null);
    setIsCartCheckout(true);
    setIsCartOpen(false);
    setIsPaymentOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter((item) => item.id !== id));
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#020617] text-slate-50 flex flex-col">
      <WelcomePopup />
      
      {/* Navigation Bar - Matching Screenshot Style */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-[#020617]/90 backdrop-blur-xl border-b border-slate-900 px-4 md:px-8 py-5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Logo (Hidden or small on mobile to make room for menu) */}
          <div className="flex items-center gap-3 cursor-pointer flex-shrink-0" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <img src="https://i.ibb.co.com/Dx9zVZJ/1769599055539.png" alt="Logo" className="w-8 h-8 object-cover rounded-lg md:hidden" />
            <h1 className="text-lg font-black font-outfit text-white hidden md:block uppercase tracking-tighter">FISH IT STORE</h1>
          </div>

          {/* Centered Navigation Links - Exactly like the screenshot */}
          <div className="flex items-center gap-4 md:gap-8 overflow-x-auto no-scrollbar mx-4">
            {SECTIONS.map(s => (
              <a 
                key={s} 
                href={`#${slugify(s)}`} 
                className="whitespace-nowrap text-[10px] md:text-[12px] font-[800] uppercase tracking-[0.15em] text-slate-400 hover:text-cyan-400 transition-all duration-300 relative group pb-1"
              >
                {s}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-cyan-500 transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </div>

          {/* Cart Icon - Matching the boxy style from screenshot */}
          <button 
            onClick={() => setIsCartOpen(true)} 
            className="relative p-3 bg-slate-900/50 border border-slate-800 rounded-xl flex-shrink-0 hover:bg-slate-800 transition-all active:scale-90"
          >
            <svg className="h-5 w-5 md:h-6 md:w-6 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-cyan-600 text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-[#020617] shadow-lg">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto w-full pt-32 pb-20 px-6 flex-grow">
        <header className="mb-16">
          <h2 className="text-4xl md:text-6xl font-black font-outfit bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-500 tracking-tight">Halo Sobat Talon!</h2>
          <p className="text-slate-500 font-medium text-lg mt-2">Pusat kebutuhan FISH IT terlengkap dan termurah.</p>
        </header>

        <div className="space-y-32">
          {SECTIONS.map((section) => (
            <section key={section} id={slugify(section)} className="scroll-mt-28">
              <div className="flex items-center gap-4 mb-10 border-b border-slate-900 pb-6">
                <div className="w-2.5 h-10 bg-cyan-500 rounded-full shadow-[0_0_20px_rgba(6,182,212,0.6)]"></div>
                <h3 className="text-3xl font-black uppercase text-white tracking-tight">{section}</h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
                {PRODUCTS.filter(p => p.category === section).map(product => (
                  <ProductCard key={product.id} product={product} onAddToCart={addToCart} onBuyNow={handleBuyNow} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>

      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} items={cart} onRemove={removeFromCart} onCheckout={handleCartCheckout} />
      <PaymentModal 
        isOpen={isPaymentOpen} 
        onClose={() => setIsPaymentOpen(false)} 
        product={selectedProduct ? { ...selectedProduct, quantity: buyQuantity } as any : null} 
        cartItems={isCartCheckout ? cart : []} 
      />
      <AIAssistant />
      <WhatsAppButton />
    </div>
  );
};

export default App;
