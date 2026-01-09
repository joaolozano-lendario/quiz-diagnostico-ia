import React from 'react';
import { ArrowRight, Users, Zap, Moon, Gift, Shield } from 'lucide-react';
import { eventCTA } from '../data/content';
import { useInView } from '../hooks/useInView';

interface EventCTAProps {
  profileHook?: string;
  className?: string;
}

export function EventCTA({ profileHook, className = '' }: EventCTAProps) {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  const iconMap: Record<string, React.ReactNode> = {
    Users: <Users className="w-6 h-6" />,
    Zap: <Zap className="w-6 h-6" />,
    Moon: <Moon className="w-6 h-6" />,
    Gift: <Gift className="w-6 h-6" />
  };

  return (
    <section
      ref={ref}
      className={`bg-gradient-to-br from-gray-900 to-black py-20 px-6 ${className}`}
    >
      <div className="max-w-4xl mx-auto">
        {/* Contexto Narrativo */}
        <div
          className={`text-center mb-12 transition-all duration-700 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-gray-400 text-lg mb-3">{eventCTA.contexto.preTitle}</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {eventCTA.contexto.title}
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-6">
            {eventCTA.contexto.subtitle}
          </p>
          <div className="max-w-2xl mx-auto">
            <p className="text-gray-500 mb-2">{eventCTA.ponte.principal}</p>
            <p className="text-white font-medium">{eventCTA.ponte.prova}</p>
          </div>
        </div>

        {/* Profile-specific hook */}
        {profileHook && (
          <div
            className={`bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-6 mb-8 transition-all duration-700 delay-100 ${
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <p className="text-cyan-300 text-center">{profileHook}</p>
          </div>
        )}

        {/* Card do Evento */}
        <div
          className={`bg-gray-900/80 rounded-2xl border border-gray-800 overflow-hidden mb-8 transition-all duration-700 delay-200 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Header */}
          <div className="p-8 border-b border-gray-800 text-center">
            <span className="inline-block px-4 py-2 bg-white text-black text-sm font-bold rounded-lg mb-4">
              {eventCTA.preco.badge}
            </span>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
              {eventCTA.evento.badge}
            </h3>
            <p className="text-gray-400">{eventCTA.evento.data}</p>
            <p className="text-gray-500 text-sm mt-1">{eventCTA.evento.formato}</p>
          </div>

          {/* O que inclui */}
          <div className="p-8 border-b border-gray-800">
            <h4 className="text-lg font-semibold text-gray-400 uppercase tracking-wider mb-6 text-center">
              {eventCTA.oqueinclui.titulo}
            </h4>
            <div className="grid md:grid-cols-2 gap-4">
              {eventCTA.oqueinclui.itens.map((item, idx) => (
                <div key={idx} className="p-4 bg-black/40 rounded-xl border border-gray-800">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 text-white">
                      {iconMap[item.icone]}
                    </div>
                    <div>
                      <h5 className="font-semibold text-white mb-1">{item.titulo}</h5>
                      <p className="text-gray-400 text-sm">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Preco e CTA */}
          <div className="p-8 bg-black/50">
            <div className="text-center mb-6">
              <div className="flex items-center justify-center gap-4 mb-2">
                <span className="text-gray-500 line-through text-2xl">{eventCTA.preco.de}</span>
                <span className="text-5xl font-bold text-white">{eventCTA.preco.por}</span>
              </div>
              <p className="text-gray-400">ou {eventCTA.preco.parcelas}</p>
              <p className="text-green-400 text-sm mt-1">{eventCTA.preco.economia}</p>
            </div>

            <a
              href={eventCTA.buttonUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full max-w-md mx-auto px-8 py-5 bg-white text-black font-bold rounded-xl hover:bg-gray-100 transition-all text-lg text-center shadow-2xl shadow-white/10"
            >
              {eventCTA.buttonText}
              <ArrowRight className="w-5 h-5 inline ml-2" />
            </a>

            <p className="text-gray-500 text-sm mt-4 text-center">
              {eventCTA.urgencia.texto} · {eventCTA.urgencia.subtexto}
            </p>
          </div>
        </div>

        {/* Garantia */}
        <div
          className={`text-center p-6 rounded-xl border border-gray-800 bg-gray-900/50 transition-all duration-700 delay-300 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <h4 className="text-white font-semibold mb-2">{eventCTA.garantia.titulo}</h4>
          <p className="text-gray-400 text-sm max-w-lg mx-auto">{eventCTA.garantia.texto}</p>
        </div>
      </div>
    </section>
  );
}
