import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { RotateCcw, Share2, ArrowRight, Lightbulb } from 'lucide-react';
import { useInView } from '../hooks/useInView';
import { useLeadCapture } from '../hooks/useLeadCapture';
import { quizProfiles, type ProfileType } from '../data/content';
import { EventCTA } from '../components/EventCTA';

// Diamond Logo - Lendaria
function DiamondLogo({ className = "w-12 h-12", fill = "#000000" }: { className?: string; fill?: string }) {
  return (
    <svg className={className} viewBox="0 0 320 320" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill={fill} d="M247.258 18.749A63.908 63.908 0 0 0 202.029 0h-84.091a63.906 63.906 0 0 0-45.229 18.749L18.748 72.596C6.749 84.596 0 100.961 0 117.944v84.095c0 16.866 6.75 33.232 18.748 45.231l53.978 53.981A63.907 63.907 0 0 0 117.954 320h84.092a63.908 63.908 0 0 0 45.228-18.749l53.978-53.981A63.91 63.91 0 0 0 320 202.039v-84.095a63.913 63.913 0 0 0-18.748-45.231l-53.978-53.98-.016.016Zm3.749 45.964c2 0 3.117.25 3.866.367.867 3.366 1 16-10.865 39.865-5.5 11.116-12.749 22.732-21.248 34.481a410.027 410.027 0 0 0-20.364-21.865c-7.25-7.25-14.499-14-21.865-20.366 7.616-5.5 15.249-10.5 22.731-14.866 27.231-15.866 42.479-17.499 47.729-17.499v-.117h.016Zm-44.362 95.212c-6.999 8.25-14.498 16.366-22.364 24.365-7.999 8-16.115 15.5-24.364 22.366-8.249-7-16.365-14.366-24.364-22.366-8-7.999-15.499-16.115-22.365-24.365 6.999-8.25 14.499-16.366 22.365-24.365 7.865-8 16.115-15.5 24.364-22.366 8.249 7 16.365 14.366 24.364 22.366 7.999 7.999 15.498 16.115 22.364 24.365ZM90.707 36.865c7.25-7.25 16.865-11.25 27.114-11.25h84.091c10.249 0 19.865 4 27.114 11.25l4.616 4.616c-20.997 5.117-46.978 18.866-73.842 39.115-26.864-20.25-52.844-33.865-73.842-39.115l4.616-4.616h.133ZM65.093 65.097c.617-.117 1.867-.367 3.867-.367 15.865 0 38.612 12.25 47.728 17.5 7.499 4.365 15.115 9.365 22.731 14.865-7.366 6.366-14.615 13.116-21.865 20.366a410.071 410.071 0 0 0-20.364 21.865c-8.5-11.749-15.748-23.365-21.248-34.481C64.077 80.979 64.193 68.363 65.077 64.98v.117h.016Zm-28.23 164.058c-7.25-7.25-11.249-16.866-11.249-27.116v-84.095c0-10.25 4-19.866 11.249-27.115l4.616-4.617c5.116 20.999 18.865 46.981 38.98 73.846-20.249 26.866-33.864 52.848-38.98 73.847l-4.616-4.617v-.133Zm31.98 25.982c-2 0-3.117-.25-3.866-.367-.867-3.366-1-15.999 10.865-39.865 5.5-11.116 12.749-22.732 21.248-34.481a410.071 410.071 0 0 0 20.364 21.865c7.25 7.25 14.499 14 21.865 20.366-7.616 5.5-15.249 10.5-22.731 14.866-27.23 15.866-42.48 17.499-47.728 17.499v.117h-.017Zm160.3 27.865c-7.249 7.25-16.865 11.249-27.114 11.249h-84.091c-10.249 0-19.865-3.999-27.114-11.249l-4.616-4.617c20.997-5.116 46.978-18.865 73.842-39.114 26.864 20.249 52.845 33.865 73.842 39.114l-4.616 4.617h-.133Zm25.614-28.232c-.617.117-1.867.367-3.866.367-15.865 0-38.613-12.25-47.729-17.499-7.499-4.367-15.115-9.367-22.731-14.866a410.464 410.464 0 0 0 21.865-20.366 410.027 410.027 0 0 0 20.364-21.865c8.499 11.749 15.748 23.365 21.248 34.481 11.865 23.866 11.749 36.482 10.865 39.865v-.117h-.016Zm39.479-52.864c0 10.25-4 19.866-11.249 27.115l-4.616 4.617c-5.116-20.999-18.865-46.981-38.979-73.846 20.248-26.866 33.863-52.848 38.979-73.847l4.616 4.617c7.249 7.25 11.249 16.866 11.249 27.115v84.229Z"/>
    </svg>
  );
}

export function ResultadoPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { ref, isInView } = useInView({ threshold: 0.1 });

  const { sendLead } = useLeadCapture();

  const perfilId = searchParams.get('perfil') as ProfileType | null;
  const email = searchParams.get('email') || '';
  const nome = searchParams.get('nome') || '';
  const situacao = searchParams.get('situacao') || '';
  const disponibilidade = searchParams.get('disponibilidade') || '';

  // Validate profile
  const profile = perfilId && quizProfiles[perfilId] ? quizProfiles[perfilId] : null;

  // Send profile result to CRM on mount
  useEffect(() => {
    if (profile && email) {
      sendLead({
        email,
        nome,
        situacao,
        disponibilidadeEvento: disponibilidade,
        perfilResultado: profile.id
      });
    }
  }, []);

  if (!profile) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Perfil nao encontrado
          </h1>
          <p className="text-gray-600 mb-6">
            Parece que houve um problema. Por favor, refaca o quiz.
          </p>
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white font-semibold rounded-xl hover:bg-gray-800 transition-all"
          >
            Voltar ao inicio
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  }

  const colorClasses = {
    amber: {
      gradient: 'gradient-text-amber',
      bg: 'bg-amber-50',
      border: 'border-amber-300',
      text: 'text-amber-600',
      lightBg: 'bg-amber-100/50'
    },
    cyan: {
      gradient: 'gradient-text-cyan',
      bg: 'bg-cyan-50',
      border: 'border-cyan-300',
      text: 'text-cyan-600',
      lightBg: 'bg-cyan-100/50'
    },
    purple: {
      gradient: 'gradient-text-purple',
      bg: 'bg-purple-50',
      border: 'border-purple-300',
      text: 'text-purple-600',
      lightBg: 'bg-purple-100/50'
    },
    emerald: {
      gradient: 'gradient-text-emerald',
      bg: 'bg-emerald-50',
      border: 'border-emerald-300',
      text: 'text-emerald-600',
      lightBg: 'bg-emerald-100/50'
    }
  };

  const colors = colorClasses[profile.color];

  const handleShare = async () => {
    const shareText = `Fiz o Quiz Diagnostico de IA e descobri que sou "${profile.title}". Faca o seu tambem!`;
    const shareUrl = window.location.origin;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Quiz Diagnostico de IA',
          text: shareText,
          url: shareUrl
        });
      } catch (err) {
        // User cancelled or error
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
      alert('Link copiado para a area de transferencia!');
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="py-4 px-6 border-b border-gray-100">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <DiamondLogo className="w-8 h-8" fill="#0A0A0A" />
            <span className="font-semibold text-gray-900 hidden sm:block">
              Academia Lendar[IA]
            </span>
          </div>
          {nome && (
            <span className="text-gray-500 text-sm">
              {nome.split(' ')[0]}
            </span>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 py-12 px-6">
        <div ref={ref} className="max-w-2xl mx-auto">
          {/* Result Header */}
          <div
            className={`text-center mb-10 transition-all duration-700 ${
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <span className={`font-medium text-sm uppercase tracking-wider ${colors.text}`}>
              Seu Resultado
            </span>
            <div className="mt-4 mb-2">
              <span className="text-6xl">{profile.emoji}</span>
            </div>
            <h1 className={`text-3xl md:text-4xl font-bold ${colors.gradient}`}>
              {profile.title}
            </h1>
            <p className="text-gray-600 text-lg mt-2">
              {profile.subtitle}
            </p>
          </div>

          {/* Profile Description Card */}
          <div
            className={`${colors.bg} rounded-2xl p-6 md:p-8 border-l-4 ${colors.border} mb-6 transition-all duration-700 delay-200 ${
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <p className="text-gray-700 text-lg leading-relaxed">
              {profile.description}
            </p>
          </div>

          {/* Insight Card */}
          <div
            className={`bg-white rounded-2xl p-6 md:p-8 border border-gray-200 mb-6 transition-all duration-700 delay-300 ${
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="flex items-start gap-4">
              <div className={`w-10 h-10 rounded-lg ${colors.lightBg} flex items-center justify-center flex-shrink-0`}>
                <Lightbulb className={`w-5 h-5 ${colors.text}`} />
              </div>
              <div>
                <p className={`font-semibold ${colors.text} mb-2`}>
                  O insight principal:
                </p>
                <p className="text-gray-700">
                  {profile.insight}
                </p>
              </div>
            </div>
          </div>

          {/* Event Hook Card */}
          <div
            className={`${colors.lightBg} rounded-2xl p-6 md:p-8 border ${colors.border} mb-10 transition-all duration-700 delay-400 ${
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <p className={`font-semibold ${colors.text} mb-2`}>
              A solucao para voce:
            </p>
            <p className="text-gray-700 text-lg">
              {profile.eventHook}
            </p>
          </div>

          {/* Action Buttons */}
          <div
            className={`flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 transition-all duration-700 delay-500 ${
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition-all"
            >
              <Share2 className="w-5 h-5" />
              Compartilhar resultado
            </button>
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 px-6 py-3 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Refazer quiz
            </button>
          </div>
        </div>

        {/* Event CTA Section */}
        <EventCTA profileHook={profile.eventHook} />
      </main>

      {/* Footer */}
      <footer className="py-8 px-6 bg-gray-50 border-t border-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <DiamondLogo className="w-8 h-8 mx-auto mb-4" fill="#9CA3AF" />
          <p className="text-gray-500 text-sm">
            Academia Lendar[IA] - Eternizando legados atraves da IA
          </p>
        </div>
      </footer>
    </div>
  );
}
