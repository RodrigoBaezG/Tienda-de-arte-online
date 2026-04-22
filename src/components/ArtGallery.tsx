import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingCart, Eye, Sparkles, X } from 'lucide-react';
import { ARTWORKS } from '../constants';
import { ArtWork } from '../types';

interface ArtGalleryProps {
  onAddToCart: (work: ArtWork) => void;
  categoryFilter: string | null;
}

export default function ArtGallery({ onAddToCart, categoryFilter }: ArtGalleryProps) {
  const [selectedArt, setSelectedArt] = React.useState<ArtWork | null>(null);

  // Filter artworks based on category
  const filteredArtworks = categoryFilter 
    ? ARTWORKS.filter(work => work.category.toLowerCase().includes(categoryFilter.toLowerCase()))
    : ARTWORKS;

  return (
    <div className="pt-28 pb-12 px-8 max-w-7xl mx-auto">
      <header className="mb-16 border-b border-editorial-ink pb-8 flex justify-between items-baseline">
        <div className="max-w-2xl">
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl font-serif italic mb-4 tracking-tighter text-editorial-ink"
          >
            Colecciones <span className="opacity-40">disponibles</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-sm leading-relaxed opacity-70 font-sans"
          >
            Explora mis obras originales disponibles para adquisición inmediata. Cada pieza se entrega con un certificado de autenticidad digital.
          </motion.p>
        </div>
        <div className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-60">
          {categoryFilter ? `Colección: ${categoryFilter}` : 'Catálogo Completo'}
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-editorial-ink">
        {filteredArtworks.map((work, index) => (
          <div key={work.id}>
            <ArtCard 
              work={work} 
              index={index} 
              onView={() => setSelectedArt(work)}
            />
          </div>
        ))}
      </div>

      <AnimatePresence>
        {selectedArt && (
          <ArtModal 
            work={selectedArt} 
            onClose={() => setSelectedArt(null)} 
            onAddToCart={onAddToCart}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function ArtCard({ work, index, onView }: { work: ArtWork, index: number, onView: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: index * 0.05 }}
      className="group relative h-[500px] bg-editorial-soft border-r border-b border-editorial-ink p-10 flex flex-col items-center justify-center text-center cursor-pointer overflow-hidden"
      onClick={onView}
    >
      <div className="w-full h-full flex flex-col items-center justify-center transition-all duration-700 group-hover:scale-105">
        <div className="w-48 h-64 bg-editorial-muted shadow-2xl transform transition-transform duration-700 group-hover:-rotate-3 mb-8 overflow-hidden">
           <img 
            src={work.image} 
            alt={work.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <h3 className="font-serif italic text-2xl text-editorial-ink mb-1">{work.title}</h3>
        <p className="text-[10px] uppercase tracking-widest opacity-60 font-bold">{work.category}</p>
      </div>
      
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
        <span className="text-[10px] font-bold uppercase tracking-tighter border border-editorial-ink px-3 py-1">Ver Detalles</span>
      </div>
    </motion.div>
  );
}

function ArtModal({ work, onClose, onAddToCart }: { work: ArtWork, onClose: () => void, onAddToCart: (work: ArtWork) => void }) {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-editorial-ink/90 backdrop-blur-sm"
      />
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="relative bg-editorial-bg w-full max-w-5xl rounded-sm overflow-hidden border border-editorial-ink flex flex-col md:flex-row max-h-[90vh]"
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-10 text-editorial-ink hover:scale-125 transition-transform"
        >
          <X className="w-6 h-6" />
        </button>
        
        <div className="w-full md:w-3/5 overflow-hidden bg-editorial-muted p-12 flex items-center justify-center">
          <img 
            src={work.image} 
            alt={work.title} 
            className="w-full h-full object-contain shadow-2xl"
            referrerPolicy="no-referrer"
          />
        </div>
        
        <div className="w-full md:w-2/5 p-12 flex flex-col border-l border-editorial-ink bg-editorial-bg">
          <div className="mb-auto">
            <span className="text-editorial-accent font-bold tracking-[0.3em] text-[10px] uppercase mb-4 block">Edición {work.id.padStart(2, '0')}</span>
            <h2 className="text-5xl font-serif italic text-editorial-ink mb-6 leading-none">{work.title}</h2>
            <div className="text-editorial-ink font-mono text-xl mb-10 pb-4 border-b border-editorial-ink/10">${work.price}.00</div>
            
            <div className="space-y-6 mb-12">
              <h4 className="text-editorial-ink font-bold uppercase text-[10px] tracking-widest opacity-40">Reseña de Obra</h4>
              <p className="text-sm text-editorial-ink/80 leading-relaxed font-sans">
                {work.description} Esta pieza es parte de una serie limitada que explora la dualidad de la existencia digital. Cada trazo ha sido renderizado para capturar la esencia de lo efímero.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <button 
              onClick={() => {
                onAddToCart(work);
                onClose();
              }}
              className="w-full py-5 bg-editorial-ink text-editorial-bg text-[11px] uppercase font-bold tracking-[0.4em] hover:bg-editorial-accent transition-all flex items-center justify-center gap-2"
            >
              <ShoppingCart className="w-4 h-4" /> Añadir al Carrito
            </button>
            <div className="text-[9px] uppercase tracking-widest text-center opacity-40 font-bold">
              Impresión Certificada Giclée Disponible
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
