import React from 'react';
import { motion } from 'motion/react';
import { 
  Rocket, 
  Search, 
  Share2, 
  Mail, 
  Bot, 
  ChevronRight, 
  Zap, 
  Target,
  Sparkles,
  Loader2
} from 'lucide-react';
import { getBusinessStrategy } from '../lib/gemini';

export default function BusinessDashboard() {
  const [loading, setLoading] = React.useState(false);
  const [strategy, setStrategy] = React.useState<string | null>(null);
  const [category, setCategory] = React.useState('Arte Digital / NFT');

  const generateStrategy = async () => {
    setLoading(true);
    const result = await getBusinessStrategy(category, "Quiero un plan para promocionar mi tienda de arte digital sin inversión publicitaria, enfocado en crecimiento orgánico.");
    setStrategy(result || "No se pudo generar la estrategia.");
    setLoading(false);
  };

  return (
    <div className="pt-20 min-h-[calc(100vh-128px)] flex flex-col md:flex-row border-t border-editorial-ink">
      {/* Left Column: Business Vision */}
      <div className="w-full md:w-1/4 border-r border-editorial-ink p-10 flex flex-col justify-between bg-editorial-bg">
        <div>
          <h2 className="text-6xl font-serif leading-[0.85] mb-12 tracking-tighter">
            Plan de<br />Negocio <span className="text-xl align-top italic opacity-40">01</span>
          </h2>
          <div className="space-y-10">
            <div>
              <p className="text-[10px] uppercase tracking-widest font-bold mb-3 text-editorial-accent">Fase I: Infraestructura AI</p>
              <p className="text-sm leading-relaxed opacity-80">Automatización de flujos con modelos de lenguaje para gestión de clientes y generación automática de metadatos SEO.</p>
            </div>
            <div className="pt-6 border-t border-editorial-ink/10">
              <p className="text-[10px] uppercase tracking-widest font-bold mb-3 text-editorial-accent">Fase II: Monetización</p>
              <p className="text-sm leading-relaxed opacity-80">Integración de pasarelas de pago digitales y sistemas de entrega inmediata de activos de alta resolución.</p>
            </div>
          </div>
        </div>
        
        <div className="bg-editorial-ink text-editorial-bg p-8 mt-12">
          <p className="text-[10px] uppercase tracking-[0.2em] mb-4 opacity-50">Estrategia Global</p>
          <p className="text-2xl font-serif italic mb-6 leading-tight">"Crecimiento orgánico mediante autoridad visual."</p>
          <div className="flex justify-between items-center text-[10px] opacity-50 font-mono">
            <span>ROI PROYECTADO: +180%</span>
            <div className="w-8 h-8 border border-editorial-bg/30 rounded-full flex items-center justify-center italic">i</div>
          </div>
        </div>
      </div>

      {/* Center Column: Strategy Generator */}
      <div className="w-full md:w-1/2 p-10 flex flex-col bg-editorial-soft">
        <div className="flex justify-between items-baseline mb-10 border-b border-editorial-ink pb-4">
          <h3 className="text-xl font-serif italic">Estrategia Personalizada</h3>
          <span className="text-[10px] uppercase tracking-widest opacity-60 font-bold">Generador AI</span>
        </div>

        <div className="flex-1">
          {strategy ? (
             <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               className="prose prose-sm max-w-none prose-editorial whitespace-pre-wrap font-sans text-editorial-ink opacity-80 leading-relaxed"
             >
                {strategy}
             </motion.div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center border border-editorial-ink/10 rounded-sm p-12">
              <Sparkles className="w-12 h-12 text-editorial-accent mb-6 opacity-40" />
              <p className="font-serif italic text-xl mb-8">Elige una categoría para develar tu mapa de ruta estratégico.</p>
              
              <div className="w-full max-w-xs space-y-4">
                <select 
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-editorial-bg border border-editorial-ink p-4 text-[10px] uppercase font-bold tracking-widest outline-none appearance-none cursor-pointer text-center"
                >
                  <option value="Arte Digital / NFT">Arte Digital / NFT</option>
                  <option value="Ilustración Editorial">Ilustración Editorial</option>
                  <option value="Concept Art">Concept Art</option>
                </select>

                <button 
                  onClick={generateStrategy}
                  disabled={loading}
                  className="w-full py-4 bg-editorial-ink text-editorial-bg text-[10px] uppercase font-bold tracking-[0.3em] hover:bg-editorial-accent transition-colors disabled:opacity-50"
                >
                  {loading ? 'Consultando...' : 'Generar Proyecto'}
                </button>
              </div>
            </div>
          )}
        </div>
        
        {strategy && (
          <button 
            onClick={() => setStrategy(null)}
            className="mt-8 text-[10px] uppercase font-bold tracking-widest border-b border-editorial-ink self-start pb-1 opacity-60 hover:opacity-100 transition-opacity"
          >
            Nueva Consulta
          </button>
        )}
      </div>

      {/* Right Column: AI Ecosystem */}
      <div className="w-full md:w-1/4 border-l border-editorial-ink p-10 bg-editorial-muted flex flex-col">
        <h2 className="text-xl font-serif mb-12 border-b border-editorial-ink pb-4 italic underline underline-offset-8 decoration-1">Ecosistema AI</h2>
        
        <div className="space-y-16 flex-1">
          <EcosystemStep 
            number="01" 
            title="Auto-Curaduría" 
            desc="Sistemas que analizan el sentimiento visual en redes para sugerir temas."
          />
          <EcosystemStep 
            number="02" 
            title="Soporte Inteligente" 
            desc="Modelos entrenados en tu voz artística para atender coleccionistas."
          />
          <EcosystemStep 
            number="03" 
            title="Email Inteligente" 
            desc="Segmentación basada en la profundidad de interacción con tu galería."
          />
        </div>

        <div className="mt-12 pt-8 border-t border-editorial-ink/10">
          <div className="flex items-center gap-4 text-editorial-ink opacity-40 grayscale group-hover:grayscale-0 transition-all">
            <Bot className="w-5 h-5 flex-shrink-0" />
            <span className="text-[10px] uppercase tracking-widest leading-none">Powered by Gemini Logic</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function EcosystemStep({ number, title, desc }: { number: string, title: string, desc: string }) {
  return (
    <div className="relative pl-8 border-l border-editorial-ink">
      <span className="text-[9px] absolute -left-[5px] top-0 bg-editorial-muted py-1 font-mono">{number}</span>
      <h4 className="text-[11px] font-bold uppercase tracking-widest mb-2">{title}</h4>
      <p className="text-xs opacity-60 leading-relaxed">{desc}</p>
    </div>
  );
}

function Step({ number, title, active = false }: { number: string, title: string, active?: boolean }) {
  return (
    <div className={`flex items-center gap-4 p-3 rounded-xl border ${active ? 'border-orange-500/30 bg-orange-500/5' : 'border-white/5 opacity-50'}`}>
      <span className={`font-mono font-bold text-sm ${active ? 'text-orange-500' : 'text-gray-600'}`}>{number}</span>
      <span className={`text-sm font-medium ${active ? 'text-white' : 'text-gray-400'}`}>{title}</span>
      {active && <ChevronRight className="w-4 h-4 ml-auto text-orange-500" />}
    </div>
  );
}

function StrategyCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="bg-zinc-900 border border-white/5 p-6 rounded-2xl hover:border-orange-500/20 transition-colors">
      <div className="mb-4">{icon}</div>
      <h3 className="text-white font-bold mb-2">{title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
    </div>
  );
}
