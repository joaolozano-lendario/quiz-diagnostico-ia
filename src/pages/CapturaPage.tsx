import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, User, Phone, ChevronRight, Sparkles, Target, Zap, Bot } from 'lucide-react';
import { heroContent, qualificacaoOptions, eventInfo } from '../data/content';
import { useInView } from '../hooks/useInView';
import { useLeadCapture } from '../hooks/useLeadCapture';

// Diamond Logo - Lendaria
function DiamondLogo({ className = "w-12 h-12", fill = "#000000" }: { className?: string; fill?: string }) {
  return (
    <svg className={className} viewBox="0 0 320 320" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill={fill} d="M247.258 18.749A63.908 63.908 0 0 0 202.029 0h-84.091a63.906 63.906 0 0 0-45.229 18.749L18.748 72.596C6.749 84.596 0 100.961 0 117.944v84.095c0 16.866 6.75 33.232 18.748 45.231l53.978 53.981A63.907 63.907 0 0 0 117.954 320h84.092a63.908 63.908 0 0 0 45.228-18.749l53.978-53.981A63.91 63.91 0 0 0 320 202.039v-84.095a63.913 63.913 0 0 0-18.748-45.231l-53.978-53.98-.016.016Zm3.749 45.964c2 0 3.117.25 3.866.367.867 3.366 1 16-10.865 39.865-5.5 11.116-12.749 22.732-21.248 34.481a410.027 410.027 0 0 0-20.364-21.865c-7.25-7.25-14.499-14-21.865-20.366 7.616-5.5 15.249-10.5 22.731-14.866 27.231-15.866 42.479-17.499 47.729-17.499v-.117h.016Zm-44.362 95.212c-6.999 8.25-14.498 16.366-22.364 24.365-7.999 8-16.115 15.5-24.364 22.366-8.249-7-16.365-14.366-24.364-22.366-8-7.999-15.499-16.115-22.365-24.365 6.999-8.25 14.499-16.366 22.365-24.365 7.865-8 16.115-15.5 24.364-22.366 8.249 7 16.365 14.366 24.364 22.366 7.999 7.999 15.498 16.115 22.364 24.365ZM90.707 36.865c7.25-7.25 16.865-11.25 27.114-11.25h84.091c10.249 0 19.865 4 27.114 11.25l4.616 4.616c-20.997 5.117-46.978 18.866-73.842 39.115-26.864-20.25-52.844-33.865-73.842-39.115l4.616-4.616h.133ZM65.093 65.097c.617-.117 1.867-.367 3.867-.367 15.865 0 38.612 12.25 47.728 17.5 7.499 4.365 15.115 9.365 22.731 14.865-7.366 6.366-14.615 13.116-21.865 20.366a410.071 410.071 0 0 0-20.364 21.865c-8.5-11.749-15.748-23.365-21.248-34.481C64.077 80.979 64.193 68.363 65.077 64.98v.117h.016Zm-28.23 164.058c-7.25-7.25-11.249-16.866-11.249-27.116v-84.095c0-10.25 4-19.866 11.249-27.115l4.616-4.617c5.116 20.999 18.865 46.981 38.98 73.846-20.249 26.866-33.864 52.848-38.98 73.847l-4.616-4.617v-.133Zm31.98 25.982c-2 0-3.117-.25-3.866-.367-.867-3.366-1-15.999 10.865-39.865 5.5-11.116 12.749-22.732 21.248-34.481a410.071 410.071 0 0 0 20.364 21.865c7.25 7.25 14.499 14 21.865 20.366-7.616 5.5-15.249 10.5-22.731 14.866-27.23 15.866-42.48 17.499-47.728 17.499v.117h-.017Zm160.3 27.865c-7.249 7.25-16.865 11.249-27.114 11.249h-84.091c-10.249 0-19.865-3.999-27.114-11.249l-4.616-4.617c20.997-5.116 46.978-18.865 73.842-39.114 26.864 20.249 52.845 33.865 73.842 39.114l-4.616 4.617h-.133Zm25.614-28.232c-.617.117-1.867.367-3.866.367-15.865 0-38.613-12.25-47.729-17.499-7.499-4.367-15.115-9.367-22.731-14.866a410.464 410.464 0 0 0 21.865-20.366 410.027 410.027 0 0 0 20.364-21.865c8.499 11.749 15.748 23.365 21.248 34.481 11.865 23.866 11.749 36.482 10.865 39.865v-.117h-.016Zm39.479-52.864c0 10.25-4 19.866-11.249 27.115l-4.616 4.617c-5.116-20.999-18.865-46.981-38.979-73.846 20.248-26.866 33.863-52.848 38.979-73.847l4.616 4.617c7.249 7.25 11.249 16.866 11.249 27.115v84.229Z"/>
    </svg>
  );
}

// Feature card
function FeatureCard({ icon: Icon, title, description }: { icon: React.ElementType; title: string; description: string }) {
  const { ref, isInView } = useInView({ threshold: 0.2 });

  return (
    <div
      ref={ref}
      className={`bg-white rounded-xl p-6 border border-gray-100 card-hover transition-all duration-500 ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      <div className="w-10 h-10 bg-cyan-50 rounded-lg flex items-center justify-center mb-4">
        <Icon className="w-5 h-5 text-cyan-600" />
      </div>
      <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
}

export function CapturaPage() {
  const navigate = useNavigate();
  const { ref: heroRef, isInView: heroInView } = useInView({ threshold: 0.1 });
  const { ref: formRef, isInView: formInView } = useInView({ threshold: 0.1 });

  const { sendLead, isLoading } = useLeadCapture();

  // Form state
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    whatsapp: '',
    situacao: '',
    disponibilidadeEvento: ''
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Send lead data
    await sendLead({
      email: formData.email,
      nome: formData.nome,
      whatsapp: formData.whatsapp,
      situacao: formData.situacao,
      disponibilidadeEvento: formData.disponibilidadeEvento
    });

    // Navigate to quiz with params
    const params = new URLSearchParams({
      email: formData.email,
      nome: formData.nome,
      situacao: formData.situacao,
      disponibilidade: formData.disponibilidadeEvento
    });

    navigate(`/quiz?${params.toString()}`);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="py-4 px-6 bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <DiamondLogo className="w-8 h-8" fill="#0A0A0A" />
            <span className="font-semibold text-gray-900 hidden sm:block">
              Academia Lendar[IA]
            </span>
          </div>
          <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
            {eventInfo.dates}
          </span>
        </div>
      </header>

      {/* Hero */}
      <section ref={heroRef} className="py-16 px-6 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div
            className={`mb-6 transition-all duration-700 ${
              heroInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-50 border border-cyan-200 rounded-full text-cyan-700 text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              {heroContent.badge}
            </span>
          </div>

          {/* Headline */}
          <h1
            className={`text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight transition-all duration-700 delay-100 ${
              heroInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {heroContent.headline}
          </h1>

          {/* Subheadline */}
          <p
            className={`text-lg md:text-xl text-gray-600 max-w-2xl mx-auto transition-all duration-700 delay-200 ${
              heroInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {heroContent.subheadline}
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6">
          <FeatureCard
            icon={Target}
            title="Identifique seu perfil"
            description="Descubra qual dos 4 perfis de uso de IA voce se encaixa"
          />
          <FeatureCard
            icon={Zap}
            title="Entenda suas barreiras"
            description="Saiba exatamente o que esta te impedindo de usar IA"
          />
          <FeatureCard
            icon={Bot}
            title="Receba seu plano"
            description="Um caminho claro para implementar IA no seu negocio"
          />
        </div>
      </section>

      {/* Form Section */}
      <section ref={formRef} className="py-16 px-6 bg-white">
        <div className="max-w-lg mx-auto">
          <div
            className={`text-center mb-8 transition-all duration-700 ${
              formInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Comece seu diagnostico
            </h2>
            <p className="text-gray-600">
              Preencha seus dados para iniciar o quiz
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className={`space-y-5 transition-all duration-700 delay-100 ${
              formInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {/* Nome */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Seu nome
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  required
                  placeholder="Como voce se chama?"
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Seu melhor email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="seu@email.com"
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                />
              </div>
            </div>

            {/* WhatsApp */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                WhatsApp
              </label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="tel"
                  name="whatsapp"
                  value={formData.whatsapp}
                  onChange={handleChange}
                  required
                  placeholder="(11) 99999-9999"
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                />
              </div>
            </div>

            {/* Situacao */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Qual sua situacao atual?
              </label>
              <select
                name="situacao"
                value={formData.situacao}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all appearance-none cursor-pointer"
              >
                <option value="">Selecione...</option>
                {qualificacaoOptions.situacao.map(opt => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Disponibilidade Evento */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Voce estara disponivel nos dias {eventInfo.dates.split(' ')[0]} e {eventInfo.dates.split(' ')[2]}?
              </label>
              <select
                name="disponibilidadeEvento"
                value={formData.disponibilidadeEvento}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all appearance-none cursor-pointer"
              >
                <option value="">Selecione...</option>
                {qualificacaoOptions.disponibilidadeEvento.map(opt => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-gray-900 text-white font-semibold rounded-xl hover:bg-gray-800 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed btn-fill"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Processando...
                </>
              ) : (
                <>
                  {heroContent.cta}
                  <ChevronRight className="w-5 h-5" />
                </>
              )}
            </button>

            <p className="text-center text-xs text-gray-500">
              Seus dados estao seguros. Nao compartilhamos com terceiros.
            </p>
          </form>
        </div>
      </section>

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
