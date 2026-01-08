import { CheckCircle, ArrowRight, Shield, Users, Calendar } from 'lucide-react';
import { eventCTA, eventInfo } from '../data/content';
import { useInView } from '../hooks/useInView';

interface EventCTAProps {
  profileHook?: string;
  className?: string;
}

export function EventCTA({ profileHook, className = '' }: EventCTAProps) {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <section
      ref={ref}
      className={`bg-gradient-to-br from-gray-900 to-black py-16 px-6 ${className}`}
    >
      <div className="max-w-2xl mx-auto">
        {/* Badge */}
        <div
          className={`text-center mb-8 transition-all duration-700 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-400 text-sm font-medium">
            <Calendar className="w-4 h-4" />
            {eventCTA.badge}
          </span>
        </div>

        {/* Headline */}
        <div
          className={`text-center mb-6 transition-all duration-700 delay-100 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {eventCTA.headline}
          </h2>
          <p className="text-gray-400 text-lg">
            {eventCTA.subheadline}
          </p>
        </div>

        {/* Profile-specific hook */}
        {profileHook && (
          <div
            className={`bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-6 mb-8 transition-all duration-700 delay-200 ${
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <p className="text-cyan-300 text-center">
              {profileHook}
            </p>
          </div>
        )}

        {/* Benefits list */}
        <div
          className={`space-y-4 mb-8 transition-all duration-700 delay-300 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {eventCTA.bullets.map((bullet, index) => (
            <div key={index} className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
              <span className="text-gray-300">{bullet}</span>
            </div>
          ))}
        </div>

        {/* Guarantee */}
        <div
          className={`flex items-center justify-center gap-2 mb-8 transition-all duration-700 delay-400 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <Shield className="w-5 h-5 text-emerald-400" />
          <span className="text-emerald-400 font-medium">{eventCTA.guarantee}</span>
        </div>

        {/* CTA Button */}
        <div
          className={`text-center transition-all duration-700 delay-500 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <a
            href={eventCTA.buttonUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-bold rounded-xl hover:bg-gray-100 transition-all hover:scale-105 btn-fill"
          >
            {eventCTA.buttonText}
            <ArrowRight className="w-5 h-5" />
          </a>

          <div className="mt-4 flex items-center justify-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              {eventCTA.urgency}
            </span>
          </div>

          <p className="mt-6 text-2xl font-bold text-white">
            {eventCTA.price}
          </p>
          <p className="text-gray-500 text-sm">
            {eventInfo.dates}
          </p>
        </div>
      </div>
    </section>
  );
}
