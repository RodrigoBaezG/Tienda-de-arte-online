import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { CartItem } from '../types';

interface CartProps {
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
  onCheckout: () => void;
}

export default function Cart({ items, onUpdateQuantity, onRemove, onCheckout }: CartProps) {
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (items.length === 0) {
    return (
      <div className="pt-40 pb-20 px-8 max-w-7xl mx-auto flex flex-col items-center justify-center text-center">
        <ShoppingBag className="w-16 h-16 text-editorial-muted mb-6" />
        <h2 className="text-4xl font-serif italic text-editorial-ink mb-2">Tu carrito está vacío</h2>
        <p className="text-sm opacity-60 mb-8 uppercase tracking-widest font-bold">Explora la galería para añadir tus obras favoritas</p>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-20 px-8 max-w-7xl mx-auto">
      <header className="mb-12 border-b border-editorial-ink pb-8">
        <h1 className="text-6xl font-serif italic text-editorial-ink tracking-tighter">Mi Carrito</h1>
        <p className="text-[10px] uppercase font-bold tracking-[0.3em] opacity-60 mt-2">Detalle de tu selección artística</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-8 space-y-0 border-t border-editorial-ink">
          <AnimatePresence mode="popLayout">
            {items.map((item) => (
              <motion.div 
                key={item.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, x: -20 }}
                className="py-10 border-b border-editorial-ink flex gap-10 items-center"
              >
                <div className="w-40 aspect-[4/5] bg-editorial-muted flex-shrink-0">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                </div>
                
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span className="text-[9px] uppercase font-bold tracking-widest text-editorial-accent mb-1 block">{item.category}</span>
                      <h3 className="text-3xl font-serif italic text-editorial-ink">{item.title}</h3>
                    </div>
                    <button 
                      onClick={() => onRemove(item.id)}
                      className="text-editorial-ink/40 hover:text-editorial-ink transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <div className="flex justify-between items-end">
                    <div className="flex items-center border border-editorial-ink rounded-sm px-2">
                       <button onClick={() => onUpdateQuantity(item.id, -1)} className="p-2 hover:text-editorial-accent transition-colors"><Minus className="w-3 h-3" /></button>
                       <span className="px-4 font-mono text-sm">{item.quantity}</span>
                       <button onClick={() => onUpdateQuantity(item.id, 1)} className="p-2 hover:text-editorial-accent transition-colors"><Plus className="w-3 h-3" /></button>
                    </div>
                    <div className="font-mono text-xl">${item.price * item.quantity}.00</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="lg:col-span-4 self-start">
          <div className="p-10 border border-editorial-ink bg-editorial-soft">
            <h3 className="text-[10px] uppercase font-bold tracking-[0.3em] mb-8 pb-4 border-b border-editorial-ink/10">Resumen del Pedido</h3>
            
            <div className="space-y-6 mb-10">
              <div className="flex justify-between items-center text-sm">
                <span className="opacity-60 uppercase font-bold tracking-widest text-[10px]">Subtotal</span>
                <span className="font-mono">${subtotal}.00</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="opacity-60 uppercase font-bold tracking-widest text-[10px]">Envío Digital</span>
                <span className="font-mono">$0.00</span>
              </div>
              <div className="h-px bg-editorial-ink/20" />
              <div className="flex justify-between items-center text-xl">
                <span className="font-serif italic">Total</span>
                <span className="font-mono">${subtotal}.00</span>
              </div>
            </div>

            <button 
              onClick={onCheckout}
              className="w-full py-5 bg-editorial-ink text-editorial-bg text-[11px] uppercase font-bold tracking-[0.4em] hover:bg-editorial-accent transition-all flex items-center justify-center gap-3"
            >
              Completar Compra <ArrowRight className="w-4 h-4" />
            </button>
            <div className="mt-6 text-[9px] uppercase tracking-widest text-center opacity-40 font-bold leading-relaxed">
              Recibirás un enlace de descarga segura tras la confirmación del pago.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
