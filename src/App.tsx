/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ViewType, ArtWork, CartItem } from './types';
import Header from './components/Header';
import ArtGallery from './components/ArtGallery';
import Commissions from './components/Commissions';
import Cart from './components/Cart';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, ArrowRight } from 'lucide-react';

export default function App() {
  const [view, setView] = React.useState<ViewType>('shop');
  const [cartItems, setCartItems] = React.useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);

  const handleSetView = (newView: ViewType, category: string | null = null) => {
    setView(newView);
    setSelectedCategory(category);
  };

  const addToCart = (work: ArtWork) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === work.id);
      if (existing) {
        return prev.map(item => item.id === work.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...work, quantity: 1 }];
    });
    // Optional: Switch to cart view or show notification
  };

  const updateQuantity = (id: string, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-editorial-bg text-editorial-ink selection:bg-editorial-accent/30 selection:text-editorial-ink overflow-x-hidden">
      <div className="relative z-10 font-sans">
        <Header 
          currentView={view} 
          setView={handleSetView} 
          cartCount={cartCount} 
        />
        
        <main className="min-h-[calc(100vh-128px)]">
          <AnimatePresence mode="wait">
            {view === 'shop' && (
              <motion.div
                key="shop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <ArtGallery 
                  onAddToCart={addToCart} 
                  categoryFilter={selectedCategory} 
                />
                
                {/* Newsletter Section */}
                <section className="py-32 px-8 border-t border-editorial-ink mt-20">
                   <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-end justify-between gap-12">
                      <div className="max-w-xl">
                        <span className="text-editorial-accent font-bold tracking-[0.4em] text-[10px] uppercase mb-4 block">Newsletter</span>
                        <h2 className="text-6xl font-serif italic mb-6 tracking-tighter text-editorial-ink">Acceso Exclusivo</h2>
                        <p className="text-sm opacity-70 leading-relaxed font-sans">
                          Únete a mi círculo íntimo para recibir adelantos de nuevas obras, historias sobre el proceso creativo y acceso anticipado a piezas de edición limitada.
                        </p>
                      </div>

                      <form className="w-full max-w-md" onSubmit={(e) => e.preventDefault()}>
                        <div className="flex border-b border-editorial-ink pb-4">
                          <input 
                            type="email" 
                            placeholder="Tu email principal" 
                            className="flex-1 bg-transparent text-sm outline-none placeholder:opacity-40"
                          />
                          <button className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest hover:text-editorial-accent transition-colors">
                            Suscribirme <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </form>
                   </div>
                </section>
              </motion.div>
            )}

            {view === 'commissions' && (
              <motion.div
                key="commissions"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Commissions />
              </motion.div>
            )}

            {view === 'cart' && (
              <motion.div
                key="cart"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Cart 
                  items={cartItems} 
                  onUpdateQuantity={updateQuantity} 
                  onRemove={removeFromCart} 
                  onCheckout={() => alert('¡Compra simulada! Redirigiendo a pasarela...')}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        <footer className="h-16 border-t border-editorial-ink px-8 flex justify-between items-center text-[9px] uppercase tracking-[0.2em] opacity-50 relative z-10">
          <span>© 2026 Kuko Báez Studio</span>
          <div className="flex gap-8">
            <a href="#" className="hover:opacity-100 transition-opacity">Instagram</a>
            <a href="#" className="hover:opacity-100 transition-opacity">TikTok</a>
            <a href="#" className="hover:opacity-100 transition-opacity text-editorial-ink font-bold">kbaez.dibujos@gmail.com</a>
          </div>
          <span />
        </footer>
      </div>
    </div>
  );
}

function FooterLink({ href, label }: { href: string, label: string }) {
  return (
    <a 
      href={href} 
      className="text-gray-400 hover:text-orange-500 text-sm transition-colors font-medium tracking-wide"
    >
      {label}
    </a>
  );
}
