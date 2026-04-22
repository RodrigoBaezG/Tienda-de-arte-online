import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, Ruler, Palette, MessageSquare, Send, Upload, X, FileText, CheckCircle2 } from 'lucide-react';

export default function Commissions() {
  const [file, setFile] = React.useState<File | null>(null);
  const [isDragging, setIsDragging] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simular envío
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFile(null);
    }, 2000);
  };

  return (
    <div className="pt-28 pb-20 px-8 max-w-5xl mx-auto">
      <header className="mb-16 border-b border-editorial-ink pb-8">
        <span className="text-editorial-accent font-bold tracking-[0.4em] text-[10px] uppercase mb-4 block">Servicio Personalizado</span>
        <h1 className="text-6xl font-serif italic text-editorial-ink mb-6 tracking-tighter">Realizar un Encargo</h1>
        <p className="text-sm opacity-70 max-w-2xl leading-relaxed">
          Transformo tus ideas y recuerdos en arte digital único. Sigue estos pasos para iniciar tu pedido personalizado.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-0 border-t border-l border-editorial-ink mb-20">
        <Step 
          number="01"
          title="Especificar Técnica"
          desc="Elige entre ilustración en Blanco y Negro o a Color."
          icon={<Palette className="w-5 h-5" />}
        />
        <Step 
          number="02"
          title="Definir Tamaño"
          desc="Especifica las dimensiones (A4, A3, Poster, o resolución personalizada)."
          icon={<Ruler className="w-5 h-5" />}
        />
        <Step 
          number="03"
          title="Comentarios"
          desc="Añade detalles sobre la paleta de colores, atmósfera o elementos clave."
          icon={<MessageSquare className="w-5 h-5" />}
        />
        <Step 
          number="04"
          title="Subir Fotos"
          desc="Adjunta tus imágenes de referencia directamente en este formulario."
          icon={<Camera className="w-5 h-5" />}
        />
      </div>

      <div className="bg-editorial-soft border border-editorial-ink p-12 relative overflow-hidden">
        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.div 
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12"
            >
              <div>
                <h3 className="text-3xl font-serif italic mb-6">Detalles del Encargo</h3>
                <p className="text-sm opacity-60 mb-8 leading-relaxed">
                  Completa la información básica y adjunta tus referencias. Recibirás un presupuesto personalizado vía email.
                </p>
                
                <div className="space-y-4">
                   <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-editorial-ink">
                     <div className="w-2 h-2 rounded-full bg-editorial-accent" />
                     Presupuesto Detallado vía Email
                   </div>
                   <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-editorial-ink">
                     <div className="w-2 h-2 rounded-full bg-editorial-accent" />
                     Atención Personalizada Directa
                   </div>
                   <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-editorial-ink">
                     <div className="w-2 h-2 rounded-full bg-editorial-accent" />
                     Revisiones Ilimitadas en Boceto
                   </div>
                </div>
              </div>

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold tracking-widest opacity-60">Técnica</label>
                    <select required className="w-full bg-editorial-bg border border-editorial-ink p-3 text-xs outline-none focus:border-editorial-accent">
                      <option value="">Seleccionar...</option>
                      <option value="Blanco y Negro">Blanco y Negro</option>
                      <option value="Color">Color</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold tracking-widest opacity-60">Tamaño</label>
                    <input type="text" required className="w-full bg-editorial-bg border border-editorial-ink p-3 text-xs outline-none focus:border-editorial-accent" placeholder="Ej: A3 (29.7 x 42 cm)" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold tracking-widest opacity-60">Comentarios Adicionales</label>
                  <textarea rows={3} className="w-full bg-editorial-bg border border-editorial-ink p-3 text-xs outline-none focus:border-editorial-accent resize-none" placeholder="Cuéntame más sobre tu visión..." />
                </div>

                {/* Upload Area */}
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold tracking-widest opacity-60 text-editorial-ink">Imagen de Referencia</label>
                  <div 
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`relative border-2 border-dashed transition-all duration-300 p-8 flex flex-col items-center justify-center cursor-pointer ${
                      isDragging ? 'border-editorial-accent bg-editorial-accent/5' : 'border-editorial-ink/20 hover:border-editorial-ink/40'
                    }`}
                  >
                    <input 
                      type="file" 
                      ref={fileInputRef}
                      onChange={handleFileSelect}
                      className="hidden"
                      accept="image/*"
                    />
                    
                    {file ? (
                      <div className="flex flex-col items-center">
                        <div className="w-16 h-16 bg-editorial-muted rounded-sm mb-3 flex items-center justify-center border border-editorial-ink/10">
                          <FileText className="w-6 h-6 text-editorial-ink opacity-40" />
                        </div>
                        <p className="text-[10px] font-bold uppercase tracking-widest mb-1 text-editorial-ink truncate max-w-[200px]">{file.name}</p>
                        <p className="text-[9px] opacity-40 uppercase tracking-widest">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                        <button 
                          onClick={(e) => { e.stopPropagation(); setFile(null); }}
                          className="mt-4 text-[9px] uppercase font-bold text-editorial-accent hover:underline tracking-widest"
                        >
                          Eliminar Archivo
                        </button>
                      </div>
                    ) : (
                      <>
                        <Upload className="w-6 h-6 text-editorial-ink opacity-20 mb-4" />
                        <p className="text-[10px] font-bold uppercase tracking-widest text-editorial-ink mb-1">Arrastra o selecciona</p>
                        <p className="text-[9px] opacity-40 uppercase tracking-widest">JPG, PNG o TIFF hasta 10MB</p>
                      </>
                    )}
                  </div>
                </div>

                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-editorial-ink text-editorial-bg text-[10px] uppercase font-bold tracking-[0.4em] hover:bg-editorial-accent transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                       Enviando...
                    </span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" /> Enviar Solicitud
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          ) : (
            <motion.div 
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-20 flex flex-col items-center justify-center text-center max-w-md mx-auto"
            >
              <div className="w-20 h-20 bg-editorial-accent/10 rounded-full flex items-center justify-center mb-8">
                <CheckCircle2 className="w-10 h-10 text-editorial-accent" />
              </div>
              <h3 className="text-4xl font-serif italic text-editorial-ink mb-4 tracking-tighter">Solicitud Enviada</h3>
              <p className="text-sm opacity-60 leading-relaxed font-sans mb-10">
                Gracias por confiar en mi estudio. He recibido tus detalles y la imagen de referencia. <strong>Te enviaré un email con el presupuesto detallado</strong> y los siguientes pasos en las próximas 24 horas.
              </p>
              <button 
                onClick={() => setSubmitted(false)}
                className="text-[10px] uppercase font-bold tracking-[0.3em] border-b border-editorial-ink pb-1 hover:text-editorial-accent transition-colors"
              >
                Volver al Formulario
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function Step({ number, title, desc, icon }: { number: string, title: string, desc: string, icon: React.ReactNode }) {
  return (
    <div className="p-8 border-r border-b border-editorial-ink bg-editorial-bg flex flex-col gap-6">
      <div className="flex justify-between items-start">
         <span className="font-mono text-[10px] opacity-40">{number}</span>
         <div className="opacity-40">{icon}</div>
      </div>
      <div>
        <h4 className="text-[10px] font-bold uppercase tracking-widest mb-2">{title}</h4>
        <p className="text-xs opacity-60 leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}
