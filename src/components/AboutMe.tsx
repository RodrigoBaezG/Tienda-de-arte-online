import React from 'react';
import { motion } from 'motion/react';
import { Palette, Heart, Zap, Globe } from 'lucide-react';

export default function AboutMe() {
  return (
    <div className="pt-32 pb-12 px-8 max-w-5xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-20">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="md:col-span-5"
        >
          <div className="aspect-[4/5] bg-editorial-muted shadow-2xl relative overflow-hidden">
             <img 
              src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=800" 
              alt="K. Baez" 
              className="w-full h-full object-cover grayscale brightness-90 contrast-125"
              referrerPolicy="no-referrer"
            />
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="md:col-span-7 flex flex-col justify-center"
        >
          <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-editorial-accent mb-6">Nota del Autor</span>
          <h1 className="text-6xl font-serif italic mb-8 tracking-tighter leading-none">El Artista Detrás de <br /> K. Baez Studio</h1>
          <p className="text-xl text-editorial-ink opacity-80 leading-relaxed font-sans mb-8">
            Soy un creador visual obsesionado con la intersección entre la tecnología y la emoción humana. Mi objetivo no es solo crear imágenes, sino construir mundos donde el espectador pueda perderse.
          </p>
          <div className="h-px bg-editorial-ink w-24 mb-8" />
          <p className="text-sm text-editorial-ink opacity-60 leading-relaxed max-w-md">
            Cada trazo digital es una amalgama de años de experimentación con algoritmos y técnicas de dibujo tradicionales, buscando la armonía en el caos del bit-stream.
          </p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-0 border-t border-l border-editorial-ink">
        <Feature 
          icon={<Palette className="w-5 h-5" />}
          title="Estilo Único"
          text="Fusión de técnicas de pintura tradicional aplicadas al medio digital."
        />
        <Feature 
          icon={<Zap className="w-5 h-5" />}
          title="Visión Futurista"
          text="Exploración constante de nuevas fronteras tecnológicas."
        />
        <Feature 
          icon={<Heart className="w-5 h-5" />}
          title="Pasión Pura"
          text="Cada píxel es colocado con intención artística."
        />
        <Feature 
          icon={<Globe className="w-5 h-5" />}
          title="Alcance Global"
          text="Presente en colecciones privadas de todo el mundo."
        />
      </div>

      <div className="mt-32 border border-editorial-ink p-16 text-center bg-editorial-soft">
        <h3 className="text-3xl font-serif italic mb-6">"El arte digital no es solo píxeles; es la arquitectura de mis sueños."</h3>
        <span className="text-[10px] uppercase tracking-widest font-bold opacity-40">— Manifestó Artístico 2026</span>
      </div>
    </div>
  );
}

function Feature({ icon, title, text }: { icon: React.ReactNode, title: string, text: string }) {
  return (
    <div className="p-8 border-r border-b border-editorial-ink bg-editorial-bg flex flex-col gap-6">
      <div className="w-10 h-10 rounded-full border border-editorial-ink flex items-center justify-center opacity-40">
        {icon}
      </div>
      <div>
        <h4 className="text-[10px] font-bold uppercase tracking-widest mb-2">{title}</h4>
        <p className="text-xs opacity-60 leading-relaxed">{text}</p>
      </div>
    </div>
  );
}
