import React from 'react';
import { ShoppingBag, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ViewType } from '../types';

interface HeaderProps {
  currentView: ViewType;
  setView: (view: ViewType, category?: string | null) => void;
  cartCount: number;
}

export default function Header({ currentView, setView, cartCount }: HeaderProps) {
  const [showDropdown, setShowDropdown] = React.useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-editorial-bg border-b border-editorial-ink">
      <div className="max-w-7xl mx-auto px-8 h-20 flex items-end justify-between pb-4">
        <div 
          className="flex flex-col cursor-pointer"
          onClick={() => setView('shop', null)}
        >
          <span className="text-[10px] uppercase tracking-[0.3em] opacity-60 mb-0.5">Artista gráfico</span>
          <h1 className="text-3xl font-serif italic tracking-tight text-editorial-ink">Kuko Báez Studio</h1>
        </div>

        <nav className="flex items-center gap-10">
          <div 
            className="relative"
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
          >
            <button
              onClick={() => setView('shop', null)}
              className={`flex items-center gap-1 text-[11px] uppercase tracking-[0.2em] font-semibold transition-all duration-300 pb-1 ${
                currentView === 'shop' 
                  ? 'border-b border-editorial-ink text-editorial-ink' 
                  : 'text-editorial-ink opacity-40 hover:opacity-100'
              }`}
            >
              Galería <ChevronDown className={`w-3 h-3 transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {showDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full left-0 pt-4 w-48"
                >
                  <div className="bg-editorial-bg border border-editorial-ink shadow-2xl p-4 space-y-3">
                    <button 
                      onClick={() => { setView('shop', 'Retrato'); setShowDropdown(false); }}
                      className="block text-[10px] uppercase tracking-widest font-bold opacity-60 hover:opacity-100 transition-opacity w-full text-left"
                    >
                      Retratos
                    </button>
                    <button 
                      onClick={() => { setView('shop', 'Íntimo'); setShowDropdown(false); }}
                      className="block text-[10px] uppercase tracking-widest font-bold opacity-60 hover:opacity-100 transition-opacity w-full text-left"
                    >
                      Arte Íntimo
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <NavItem 
            active={currentView === 'commissions'} 
            onClick={() => setView('commissions')}
            label="Encargos"
          />
          <button
            onClick={() => setView('cart')}
            className={`flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] font-semibold transition-all duration-300 pb-1 ${
              currentView === 'cart' 
                ? 'border-b border-editorial-ink text-editorial-ink' 
                : 'text-editorial-ink opacity-40 hover:opacity-100'
            }`}
          >
            Carrito ({cartCount})
          </button>
        </nav>
      </div>
    </header>
  );
}

function NavItem({ active, onClick, label }: { active: boolean, onClick: () => void, label: string }) {
  return (
    <button
      onClick={onClick}
      className={`text-[11px] uppercase tracking-[0.2em] font-semibold transition-all duration-300 pb-1 ${
        active 
          ? 'border-b border-editorial-ink text-editorial-ink' 
          : 'text-editorial-ink opacity-40 hover:opacity-100'
      }`}
    >
      {label}
    </button>
  );
}
