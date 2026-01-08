import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ChevronRight, RotateCcw } from 'lucide-react';
import { useInView } from '../hooks/useInView';
import { quizQuestions, type ProfileType } from '../data/content';

// Diamond Logo - Lendaria
function DiamondLogo({ className = "w-12 h-12", fill = "#000000" }: { className?: string; fill?: string }) {
  return (
    <svg className={className} viewBox="0 0 320 320" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill={fill} d="M247.258 18.749A63.908 63.908 0 0 0 202.029 0h-84.091a63.906 63.906 0 0 0-45.229 18.749L18.748 72.596C6.749 84.596 0 100.961 0 117.944v84.095c0 16.866 6.75 33.232 18.748 45.231l53.978 53.981A63.907 63.907 0 0 0 117.954 320h84.092a63.908 63.908 0 0 0 45.228-18.749l53.978-53.981A63.91 63.91 0 0 0 320 202.039v-84.095a63.913 63.913 0 0 0-18.748-45.231l-53.978-53.98-.016.016Zm3.749 45.964c2 0 3.117.25 3.866.367.867 3.366 1 16-10.865 39.865-5.5 11.116-12.749 22.732-21.248 34.481a410.027 410.027 0 0 0-20.364-21.865c-7.25-7.25-14.499-14-21.865-20.366 7.616-5.5 15.249-10.5 22.731-14.866 27.231-15.866 42.479-17.499 47.729-17.499v-.117h.016Zm-44.362 95.212c-6.999 8.25-14.498 16.366-22.364 24.365-7.999 8-16.115 15.5-24.364 22.366-8.249-7-16.365-14.366-24.364-22.366-8-7.999-15.499-16.115-22.365-24.365 6.999-8.25 14.499-16.366 22.365-24.365 7.865-8 16.115-15.5 24.364-22.366 8.249 7 16.365 14.366 24.364 22.366 7.999 7.999 15.498 16.115 22.364 24.365ZM90.707 36.865c7.25-7.25 16.865-11.25 27.114-11.25h84.091c10.249 0 19.865 4 27.114 11.25l4.616 4.616c-20.997 5.117-46.978 18.866-73.842 39.115-26.864-20.25-52.844-33.865-73.842-39.115l4.616-4.616h.133ZM65.093 65.097c.617-.117 1.867-.367 3.867-.367 15.865 0 38.612 12.25 47.728 17.5 7.499 4.365 15.115 9.365 22.731 14.865-7.366 6.366-14.615 13.116-21.865 20.366a410.071 410.071 0 0 0-20.364 21.865c-8.5-11.749-15.748-23.365-21.248-34.481C64.077 80.979 64.193 68.363 65.077 64.98v.117h.016Zm-28.23 164.058c-7.25-7.25-11.249-16.866-11.249-27.116v-84.095c0-10.25 4-19.866 11.249-27.115l4.616-4.617c5.116 20.999 18.865 46.981 38.98 73.846-20.249 26.866-33.864 52.848-38.98 73.847l-4.616-4.617v-.133Zm31.98 25.982c-2 0-3.117-.25-3.866-.367-.867-3.366-1-15.999 10.865-39.865 5.5-11.116 12.749-22.732 21.248-34.481a410.071 410.071 0 0 0 20.364 21.865c7.25 7.25 14.499 14 21.865 20.366-7.616 5.5-15.249 10.5-22.731 14.866-27.23 15.866-42.48 17.499-47.728 17.499v.117h-.017Zm160.3 27.865c-7.249 7.25-16.865 11.249-27.114 11.249h-84.091c-10.249 0-19.865-3.999-27.114-11.249l-4.616-4.617c20.997-5.116 46.978-18.865 73.842-39.114 26.864 20.249 52.845 33.865 73.842 39.114l-4.616 4.617h-.133Zm25.614-28.232c-.617.117-1.867.367-3.866.367-15.865 0-38.613-12.25-47.729-17.499-7.499-4.367-15.115-9.367-22.731-14.866a410.464 410.464 0 0 0 21.865-20.366 410.027 410.027 0 0 0 20.364-21.865c8.499 11.749 15.748 23.365 21.248 34.481 11.865 23.866 11.749 36.482 10.865 39.865v-.117h-.016Zm39.479-52.864c0 10.25-4 19.866-11.249 27.115l-4.616 4.617c-5.116-20.999-18.865-46.981-38.979-73.846 20.248-26.866 33.863-52.848 38.979-73.847l4.616 4.617c7.249 7.25 11.249 16.866 11.249 27.115v84.229Z"/>
    </svg>
  );
}

interface QuizState {
  currentQuestion: number;
  answers: Record<number, ProfileType>;
  completed: boolean;
  result: ProfileType | null;
}

export function QuizPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const email = searchParams.get('email') || '';
  const nome = searchParams.get('nome') || '';
  const situacao = searchParams.get('situacao') || '';
  const disponibilidade = searchParams.get('disponibilidade') || '';

  const { ref: sectionRef, isInView } = useInView({ threshold: 0.1 });

  const [state, setState] = useState<QuizState>({
    currentQuestion: 0,
    answers: {},
    completed: false,
    result: null
  });
  const [isAnimating, setIsAnimating] = useState(false);

  const handleAnswer = (questionId: number, profile: ProfileType) => {
    if (isAnimating) return;

    setIsAnimating(true);

    const newAnswers = { ...state.answers, [questionId]: profile };

    // Check if all questions answered
    if (Object.keys(newAnswers).length === quizQuestions.length) {
      // Calculate result
      const profileCounts: Record<ProfileType, number> = {
        'sobrecarregado': 0,
        'curioso-travado': 0,
        'tecnico-frustrado': 0,
        'lider-isolado': 0
      };

      Object.values(newAnswers).forEach((p) => {
        profileCounts[p]++;
      });

      const dominantProfile = Object.entries(profileCounts).sort(
        ([, a], [, b]) => b - a
      )[0][0] as ProfileType;

      setTimeout(() => {
        // Navigate to result page
        const params = new URLSearchParams({
          perfil: dominantProfile,
          email,
          nome,
          situacao,
          disponibilidade
        });
        navigate(`/resultado?${params.toString()}`);
      }, 500);
    } else {
      setTimeout(() => {
        setState({
          ...state,
          answers: newAnswers,
          currentQuestion: state.currentQuestion + 1
        });
        setIsAnimating(false);
      }, 400);
    }
  };

  const resetQuiz = () => {
    setState({
      currentQuestion: 0,
      answers: {},
      completed: false,
      result: null
    });
  };

  const progress = (Object.keys(state.answers).length / quizQuestions.length) * 100;
  const currentQ = quizQuestions[state.currentQuestion];

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
              Ola, {nome.split(' ')[0]}
            </span>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center py-12 px-6">
        <div ref={sectionRef} className="max-w-2xl w-full">
          {/* Section Header */}
          <div
            className={`text-center mb-10 transition-all duration-700 ${
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <span className="text-cyan-600 font-medium text-sm uppercase tracking-wider">
              Quiz Diagnostico
            </span>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mt-3">
              Descubra seu perfil de uso de IA
            </h1>
            <p className="text-gray-600 mt-2">
              Responda com sinceridade para um diagnostico preciso
            </p>
          </div>

          {/* Progress Bar */}
          <div
            className={`mb-8 transition-all duration-700 delay-100 ${
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-500 text-sm">
                Pergunta {state.currentQuestion + 1} de {quizQuestions.length}
              </span>
              <span className="text-cyan-600 font-semibold text-sm">
                {Math.round(progress)}%
              </span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Question Card */}
          <div
            className={`bg-gray-50 rounded-2xl p-6 md:p-8 transition-all duration-500 ${
              isAnimating ? 'opacity-50 scale-[0.98]' : 'opacity-100 scale-100'
            } ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ transitionDelay: isInView ? '200ms' : '0ms' }}
          >
            <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-6">
              {currentQ.question}
            </h2>

            <div className="space-y-3">
              {currentQ.options.map((option, index) => (
                <button
                  key={option.id}
                  onClick={() => handleAnswer(currentQ.id, option.profile)}
                  disabled={isAnimating}
                  className="w-full text-left p-4 bg-white rounded-xl border-2 border-gray-200 hover:border-cyan-400 hover:bg-cyan-50/50 transition-all group disabled:opacity-50"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700 group-hover:text-gray-900 transition-colors">
                      {option.text}
                    </span>
                    <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-cyan-500 group-hover:translate-x-1 transition-all" />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Helper text */}
          <div className="mt-6 flex items-center justify-between">
            <p className="text-gray-400 text-sm">
              Escolha a opcao que mais se parece com voce
            </p>
            {state.currentQuestion > 0 && (
              <button
                onClick={resetQuiz}
                className="flex items-center gap-1 text-gray-400 hover:text-gray-600 text-sm transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                Recomecar
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
