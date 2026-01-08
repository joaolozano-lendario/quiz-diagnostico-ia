// ============================================================================
// QUIZ DIAGNOSTICO IA 2.0 - Content Data
// Isca Imersao IA para Negocios | Academia Lendaria
//
// ARQUITETURA ESTRATEGICA:
// - 8 perguntas que FILTRAM, QUALIFICAM, EDUCAM e POSICIONAM
// - Entrega hiperpersonalizada baseada em combinacao de respostas
// - CTAs dinamicos baseados em urgencia
// - Conexao com narrativa dos ADS (Davi vs Golias, Segunda Onda, etc)
// ============================================================================

// ----------------------------------------------------------------------------
// EVENT INFO
// ----------------------------------------------------------------------------

export const eventInfo = {
  name: 'Imersao Pratica de IA para Negocios',
  dates: '24 e 25 de Janeiro de 2026',
  url: 'https://imersao.academialendaria.ai/'
};

// ----------------------------------------------------------------------------
// HERO CONTENT
// ----------------------------------------------------------------------------

export const heroContent = {
  badge: 'DIAGNOSTICO GRATUITO | 3 MINUTOS',
  headline: 'Descubra seu perfil de empresario com IA',
  subheadline: 'Responda 8 perguntas e receba um plano de acao personalizado para implementar IA no seu negocio - mesmo que voce ja tenha tentado e nao funcionou.',
  cta: 'Comecar Diagnostico',

  // Prova social sutil
  socialProof: {
    number: '2.847',
    text: 'empresarios ja fizeram este diagnostico'
  }
};

// ----------------------------------------------------------------------------
// TIPOS E INTERFACES
// ----------------------------------------------------------------------------

export type ProfileType = 'sobrecarregado' | 'curioso-travado' | 'tecnico-frustrado' | 'lider-isolado';
export type UrgencyType = 'urgente' | 'breve' | 'medio-prazo' | 'pesquisando';
export type SituationType = 'empresario-qualificado' | 'empresario-iniciante' | 'clt-futuro' | 'consultor';
export type TeamSizeType = 'solo' | 'micro' | 'medio' | 'grande';
export type ExperienceType = 'nunca-usou' | 'usa-basico' | 'tentou-falhou' | 'usa-bem';

export interface QuizQuestion {
  id: number;
  question: string;
  subtitle?: string;
  type: 'single' | 'multiple';
  category: 'situacao' | 'tamanho' | 'experiencia' | 'ferramentas' | 'dor' | 'objetivo' | 'bloqueio' | 'urgencia';
  options: {
    id: string;
    text: string;
    subtext?: string;
    value: string;
    profile?: ProfileType;
    points?: number;
    qualification?: number;
  }[];
}

// ----------------------------------------------------------------------------
// AS 8 PERGUNTAS ESTRATEGICAS
// ----------------------------------------------------------------------------

export const quizQuestions: QuizQuestion[] = [
  // P1 - SITUACAO PROFISSIONAL
  {
    id: 1,
    question: "Qual dessas opcoes melhor descreve voce hoje?",
    subtitle: "Isso nos ajuda a personalizar seu diagnostico",
    type: 'single',
    category: 'situacao',
    options: [
      { id: "1a", text: "Empresario com negocio ativo", subtext: "Faturando pelo menos R$ 20k/mes", value: 'empresario-qualificado', qualification: 3 },
      { id: "1b", text: "Empresario comecando", subtext: "Ainda construindo o negocio", value: 'empresario-iniciante', qualification: 2 },
      { id: "1c", text: "Profissional CLT", subtext: "Quer usar IA no trabalho ou empreender", value: 'clt-futuro', qualification: 1 },
      { id: "1d", text: "Consultor ou Freelancer", subtext: "Presta servicos de forma independente", value: 'consultor', qualification: 2 }
    ]
  },

  // P2 - TAMANHO DA OPERACAO
  {
    id: 2,
    question: "Quantas pessoas trabalham com voce?",
    subtitle: "Incluindo voce, socios e colaboradores",
    type: 'single',
    category: 'tamanho',
    options: [
      { id: "2a", text: "So eu", subtext: "One-person business", value: 'solo', qualification: 1 },
      { id: "2b", text: "2 a 5 pessoas", subtext: "Time enxuto", value: 'micro', qualification: 2 },
      { id: "2c", text: "6 a 20 pessoas", subtext: "Empresa em crescimento", value: 'medio', qualification: 3 },
      { id: "2d", text: "Mais de 20 pessoas", subtext: "Operacao estruturada", value: 'grande', qualification: 3 }
    ]
  },

  // P3 - EXPERIENCIA COM IA
  {
    id: 3,
    question: "Qual sua experiencia com IA ate agora?",
    subtitle: "Seja honesto - nao existe resposta errada",
    type: 'single',
    category: 'experiencia',
    options: [
      { id: "3a", text: "Nunca usei seriamente", subtext: "Talvez tenha testado uma vez ou outra", value: 'nunca-usou', profile: 'curioso-travado', points: 2 },
      { id: "3b", text: "Uso pra coisas basicas", subtext: "ChatGPT pra tirar duvidas, escrever textos", value: 'usa-basico', profile: 'curioso-travado', points: 1 },
      { id: "3c", text: "Ja tentei implementar mas nao funcionou", subtext: "Testei ferramentas, fiz cursos, mas nao deu certo", value: 'tentou-falhou', profile: 'tecnico-frustrado', points: 3 },
      { id: "3d", text: "Uso IA no dia a dia e funciona", subtext: "Ja faz parte da minha rotina", value: 'usa-bem', profile: 'lider-isolado', points: 1 }
    ]
  },

  // P4 - FERRAMENTAS CONHECIDAS
  {
    id: 4,
    question: "Quais dessas ferramentas voce ja usou?",
    subtitle: "Selecione todas que se aplicam",
    type: 'multiple',
    category: 'ferramentas',
    options: [
      { id: "4a", text: "ChatGPT", value: 'chatgpt' },
      { id: "4b", text: "Claude", value: 'claude' },
      { id: "4c", text: "Gemini / Google AI", value: 'gemini' },
      { id: "4d", text: "Copilot / Bing AI", value: 'copilot' },
      { id: "4e", text: "Midjourney / DALL-E", value: 'imagem' },
      { id: "4f", text: "Make / Zapier / n8n", value: 'automacao' },
      { id: "4g", text: "Lovable / Bolt / v0", value: 'nocode-apps' },
      { id: "4h", text: "Nenhuma dessas", value: 'nenhuma' }
    ]
  },

  // P5 - MAIOR DOR
  {
    id: 5,
    question: "Qual desses problemas mais te incomoda HOJE?",
    subtitle: "Escolha o que mais pesa na sua rotina",
    type: 'single',
    category: 'dor',
    options: [
      { id: "5a", text: "Trabalho demais e nao consigo parar pra aprender", subtext: "O dia acaba e voce ainda tem coisas pra fazer", value: 'dor-tempo', profile: 'sobrecarregado', points: 3 },
      { id: "5b", text: "Sei que preciso de IA mas nao sei por onde comecar", subtext: "Muita informacao, pouca direcao", value: 'dor-direcao', profile: 'curioso-travado', points: 3 },
      { id: "5c", text: "Ja tentei usar IA e os resultados foram decepcionantes", subtext: "Investiu tempo/dinheiro e nao funcionou", value: 'dor-frustrado', profile: 'tecnico-frustrado', points: 3 },
      { id: "5d", text: "Uso IA mas meu time nao acompanha", subtext: "Voce esta sozinho tentando modernizar a empresa", value: 'dor-equipe', profile: 'lider-isolado', points: 3 }
    ]
  },

  // P6 - OBJETIVO PRINCIPAL
  {
    id: 6,
    question: "Se a IA funcionasse perfeitamente pra voce, qual seria o maior ganho?",
    subtitle: "O que voce mais quer conquistar",
    type: 'single',
    category: 'objetivo',
    options: [
      { id: "6a", text: "Ter mais tempo livre", subtext: "Trabalhar menos horas, ter vida fora do trabalho", value: 'objetivo-tempo' },
      { id: "6b", text: "Aumentar faturamento sem aumentar custos", subtext: "Escalar sem contratar proporcionalmente", value: 'objetivo-escala' },
      { id: "6c", text: "Eliminar tarefas repetitivas", subtext: "Parar de fazer o que poderia ser automatizado", value: 'objetivo-automacao' },
      { id: "6d", text: "Tomar decisoes melhores com dados", subtext: "Ter clareza e informacao pra decidir", value: 'objetivo-dados' }
    ]
  },

  // P7 - BLOQUEIO PRINCIPAL
  {
    id: 7,
    question: "O que MAIS te impede de implementar IA hoje?",
    subtitle: "Seja honesto - isso vai personalizar seu plano",
    type: 'single',
    category: 'bloqueio',
    options: [
      { id: "7a", text: "Falta de tempo", subtext: "Nao tenho horas livres pra aprender", value: 'bloqueio-tempo', profile: 'sobrecarregado', points: 2 },
      { id: "7b", text: "Nao sei o que priorizar", subtext: "Sao muitas opcoes, fico paralisado", value: 'bloqueio-direcao', profile: 'curioso-travado', points: 2 },
      { id: "7c", text: "Ja tentei e nao funcionou", subtext: "Perdi a fe que vai dar certo", value: 'bloqueio-frustrado', profile: 'tecnico-frustrado', points: 2 },
      { id: "7d", text: "Minha equipe nao esta preparada", subtext: "Eu ate sei, mas o time nao acompanha", value: 'bloqueio-equipe', profile: 'lider-isolado', points: 2 },
      { id: "7e", text: "Custo das ferramentas/consultoria", subtext: "Parece caro demais pro retorno", value: 'bloqueio-custo' }
    ]
  },

  // P8 - MOMENTO DE DECISAO
  {
    id: 8,
    question: "Quando voce quer resolver isso?",
    subtitle: "Isso define a intensidade do seu plano",
    type: 'single',
    category: 'urgencia',
    options: [
      { id: "8a", text: "Agora, e urgente", subtext: "Preciso resolver isso o mais rapido possivel", value: 'urgente', qualification: 3 },
      { id: "8b", text: "Nos proximos 30 dias", subtext: "E prioridade, mas nao desespero", value: 'breve', qualification: 2 },
      { id: "8c", text: "Nos proximos 3 meses", subtext: "Quero me preparar com calma", value: 'medio-prazo', qualification: 1 },
      { id: "8d", text: "So estou pesquisando", subtext: "Quero entender melhor antes de decidir", value: 'pesquisando', qualification: 0 }
    ]
  }
];

// ----------------------------------------------------------------------------
// PERFIS DE RESULTADO
// ----------------------------------------------------------------------------

export interface QuizProfile {
  id: ProfileType;
  title: string;
  emoji: string;
  tagline: string;
  description: string;
  insight: {
    problema: string;
    verdade: string;
    possibilidade: string;
  };
  estatistica: string;
  color: 'amber' | 'cyan' | 'purple' | 'emerald';
}

export const quizProfiles: Record<ProfileType, QuizProfile> = {
  'sobrecarregado': {
    id: 'sobrecarregado',
    title: "O Empresario Sobrecarregado",
    emoji: "🔥",
    tagline: "Voce trabalha demais para aprender algo novo",
    description: "Seu dia e uma sequencia de urgencias. Voce sabe que IA poderia ajudar, mas quando? Nao existe espaco na agenda. Enquanto isso, concorrentes menores estao usando IA pra fazer em 1 hora o que voce leva o dia inteiro.",
    insight: {
      problema: "O problema nao e falta de vontade. E que voce esta fazendo trabalho de 5 pessoas sozinho.",
      verdade: "Com IA bem implementada, uma empresa de 5 pode operar como se tivesse 50. Nao e exagero - e matematica.",
      possibilidade: "Imagine recuperar 2 horas por dia. O que voce faria com 40 horas extras por mes?"
    },
    estatistica: "73% dos empresarios sobrecarregados que implementaram IA relataram recuperar pelo menos 10h por semana",
    color: 'amber'
  },

  'curioso-travado': {
    id: 'curioso-travado',
    title: "O Curioso Travado",
    emoji: "🎯",
    tagline: "Voce sabe que precisa, mas nao consegue comecar",
    description: "Ja leu artigos, viu videos, fez algumas tentativas. Mas nunca passou do brincar com ChatGPT. Falta um caminho claro. Enquanto isso, quem comecou ha 6 meses ja esta colhendo resultados.",
    insight: {
      problema: "O problema nao e falta de informacao. E excesso de opcoes sem direcao clara.",
      verdade: "Estamos na Segunda Onda da IA. Quem se move agora constroi vantagem. Quem espera vai correr atras.",
      possibilidade: "E se voce tivesse um especialista te mostrando exatamente por onde comecar, no SEU contexto?"
    },
    estatistica: "Empresarios que implementam IA com orientacao especializada tem 4x mais chance de sucesso do que tentando sozinhos",
    color: 'cyan'
  },

  'tecnico-frustrado': {
    id: 'tecnico-frustrado',
    title: "O Frustrado",
    emoji: "⚙️",
    tagline: "Voce tentou e nao funcionou",
    description: "Ja pagou ferramentas, fez cursos, testou prompts mirabolantes. Os resultados foram genericos, nao serviram pro seu contexto. A frustracao e real. Mas o problema nao era voce.",
    insight: {
      problema: "O problema nao e a ferramenta. E a falta de configuracao pro SEU contexto especifico.",
      verdade: "IA generica da resultado generico. IA configurada pro seu negocio da resultado real.",
      possibilidade: "E se um especialista configurasse a IA especificamente pro seu caso, com seus dados, seus processos?"
    },
    estatistica: "89% das implementacoes de IA falham por falta de customizacao - nao por limitacao da tecnologia",
    color: 'purple'
  },

  'lider-isolado': {
    id: 'lider-isolado',
    title: "O Lider Isolado",
    emoji: "👥",
    tagline: "Voce usa IA, mas seu time nao acompanha",
    description: "Voce entendeu o jogo. Usa IA no dia a dia. Mas olha pro lado e seu time continua no modo antigo. Voce se sente sozinho tentando modernizar a empresa. Mandar link de tutorial nao funciona.",
    insight: {
      problema: "O problema nao e o time. E que aprender IA sozinho por tutorial nao funciona.",
      verdade: "Time precisa ser treinado JUNTO, com especialistas guiando, resolvendo duvidas em tempo real.",
      possibilidade: "E se voce pudesse levar seu time inteiro pra uma imersao pratica, onde todos saem implementando?"
    },
    estatistica: "Empresas que treinam equipes juntas tem 6x mais adocao de IA do que treinamentos individuais",
    color: 'emerald'
  }
};

// ----------------------------------------------------------------------------
// PLANOS DE ACAO HIPERPERSONALIZADOS
// ----------------------------------------------------------------------------

export interface PlanoDeAcao {
  perfil: ProfileType;
  titulo: string;
  subtitulo: string;
  diagnostico: {
    situacao: string;
    porque: string;
    consequencia: string;
  };
  passos: {
    numero: number;
    titulo: string;
    descricao: string;
    tempo: string;
  }[];
  ferramentas: {
    nome: string;
    porque: string;
    url: string;
    nivel: 'iniciante' | 'intermediario' | 'avancado';
  }[];
  checklist: string[];
  metricaSucesso: string;
}

export const planosDeAcao: Record<ProfileType, PlanoDeAcao> = {
  'sobrecarregado': {
    perfil: 'sobrecarregado',
    titulo: 'Plano de Resgate: Recupere 2 Horas por Dia',
    subtitulo: 'Automacoes que trabalham enquanto voce descansa',
    diagnostico: {
      situacao: "Voce esta preso no operacional. Cada hora que passa fazendo tarefa repetitiva e uma hora que nao volta.",
      porque: "Nao e preguica nem falta de vontade. E que o negocio cresceu e os processos nao acompanharam.",
      consequencia: "Se continuar assim, vai queimar. E o negocio vai sofrer junto."
    },
    passos: [
      { numero: 1, titulo: "Mapeie os Ladroes de Tempo", descricao: "Liste as 5 tarefas que mais consomem seu tempo e que voce faz repetidamente (responder emails similares, agendar reunioes, gerar relatorios, etc)", tempo: "30 minutos" },
      { numero: 2, titulo: "Escolha a Mais Repetitiva", descricao: "Nao comece pela mais importante. Comece pela mais REPETITIVA. Essa e a que IA resolve melhor.", tempo: "10 minutos" },
      { numero: 3, titulo: "Configure Uma Automacao Simples", descricao: "Use Zapier ou Make para criar um fluxo basico. Exemplo: Email chega -> IA classifica -> Resposta automatica ou encaminha.", tempo: "1 hora" },
      { numero: 4, titulo: "Teste por 5 Dias", descricao: "Deixe rodando e observe. Ajuste o que precisar. Nao desista no primeiro erro.", tempo: "5 dias" },
      { numero: 5, titulo: "Documente e Repita", descricao: "Funcionou? Documente o processo e parta para a proxima tarefa da lista.", tempo: "30 minutos" }
    ],
    ferramentas: [
      { nome: 'Zapier', porque: 'Conecta seus apps sem precisar de codigo. Perfeito pra comecar.', url: 'https://zapier.com', nivel: 'iniciante' },
      { nome: 'Make (ex-Integromat)', porque: 'Mais poderoso que Zapier, permite fluxos complexos.', url: 'https://make.com', nivel: 'intermediario' },
      { nome: 'ChatGPT + Zapier', porque: 'Combina automacao com inteligencia. Respostas personalizadas automaticas.', url: 'https://zapier.com/apps/chatgpt/integrations', nivel: 'intermediario' },
      { nome: 'Calendly', porque: 'Elimina o vai-e-vem de agendar reunioes. Economia instantanea.', url: 'https://calendly.com', nivel: 'iniciante' }
    ],
    checklist: [
      'Listei as 5 tarefas que mais consomem meu tempo',
      'Escolhi a mais repetitiva (nao a mais importante)',
      'Criei conta no Zapier ou Make',
      'Configurei minha primeira automacao',
      'Testei por 5 dias e ajustei',
      'Documentei o que funcionou',
      'Identifiquei a proxima tarefa para automatizar'
    ],
    metricaSucesso: "Meta: Recuperar 2 horas por dia em 30 dias. Meca quanto tempo gasta hoje nas tarefas repetitivas e compare apos as automacoes."
  },

  'curioso-travado': {
    perfil: 'curioso-travado',
    titulo: 'Plano de Decolagem: Seu Primeiro Projeto em 7 Dias',
    subtitulo: 'Saia do zero ao resultado concreto em uma semana',
    diagnostico: {
      situacao: "Voce sabe que precisa de IA. Ja pesquisou bastante. Mas na hora de comecar, paralisa.",
      porque: "Nao e inseguranca. E que sao MUITAS opcoes e ninguem te mostrou um caminho claro.",
      consequencia: "Cada dia que passa, a distancia entre voce e quem ja comecou aumenta."
    },
    passos: [
      { numero: 1, titulo: "Escolha UM Problema Especifico", descricao: "Nao 'usar IA'. Um problema concreto: 'responder emails de clientes mais rapido' ou 'criar posts para redes sociais'.", tempo: "Dia 1" },
      { numero: 2, titulo: "Crie Conta no ChatGPT ou Claude", descricao: "Se ainda nao tem, crie. A versao gratuita ja resolve muito. Plus/Pro se quiser mais poder.", tempo: "Dia 2" },
      { numero: 3, titulo: "Escreva Seu Primeiro Prompt Estruturado", descricao: "Use o formato: [CONTEXTO] + [TAREFA] + [FORMATO DESEJADO]. Nao faca pergunta generica.", tempo: "Dia 3-4" },
      { numero: 4, titulo: "Refine Ate Funcionar", descricao: "O primeiro resultado nunca e perfeito. Ajuste o prompt, de mais contexto, seja mais especifico.", tempo: "Dia 5-6" },
      { numero: 5, titulo: "Documente e Defina o Proximo", descricao: "Salve o prompt que funcionou. Escreva o que aprendeu. Escolha o proximo problema.", tempo: "Dia 7" }
    ],
    ferramentas: [
      { nome: 'ChatGPT', porque: 'O mais popular e versatil. Otimo pra comecar.', url: 'https://chat.openai.com', nivel: 'iniciante' },
      { nome: 'Claude', porque: 'Melhor para textos longos e analises complexas.', url: 'https://claude.ai', nivel: 'iniciante' },
      { nome: 'Perplexity', porque: 'IA + busca. Perfeito para pesquisas com fontes.', url: 'https://perplexity.ai', nivel: 'iniciante' },
      { nome: 'Google AI Studio', porque: 'Gratuito e poderoso. Bom para experimentar.', url: 'https://aistudio.google.com', nivel: 'intermediario' }
    ],
    checklist: [
      'Defini UM problema especifico (nao generico)',
      'Criei conta no ChatGPT ou Claude',
      'Escrevi meu primeiro prompt estruturado',
      'Refinei pelo menos 3 vezes ate funcionar',
      'Salvei o prompt que funcionou',
      'Documentei o que aprendi',
      'Defini o proximo problema para resolver'
    ],
    metricaSucesso: "Meta: Resolver UM problema real do seu negocio com IA em 7 dias. O objetivo nao e virar expert - e ter um resultado concreto."
  },

  'tecnico-frustrado': {
    perfil: 'tecnico-frustrado',
    titulo: 'Plano de Recuperacao: O Que Deu Errado + Como Corrigir',
    subtitulo: 'Transforme frustracao em implementacao que funciona',
    diagnostico: {
      situacao: "Voce ja investiu tempo e dinheiro em IA. Fez cursos, testou ferramentas. Nao funcionou.",
      porque: "O problema nao foi voce. Foi falta de customizacao. IA generica da resultado generico.",
      consequencia: "A frustracao pode te fazer desistir - e ai voce perde a maior oportunidade da decada."
    },
    passos: [
      { numero: 1, titulo: "Faca a Autopsia do Fracasso", descricao: "Liste: Qual ferramenta? Qual era o objetivo? O que exatamente nao funcionou? Seja especifico.", tempo: "1 hora" },
      { numero: 2, titulo: "Identifique o Padrao", descricao: "Provavelmente o problema foi: prompt generico demais, falta de contexto do seu negocio, ou expectativa irreal.", tempo: "30 minutos" },
      { numero: 3, titulo: "Recomece com Contexto Especifico", descricao: "Escolha UM processo do seu negocio. Descreva em detalhes: o que entra, o que sai, quem usa, qual o objetivo.", tempo: "1 hora" },
      { numero: 4, titulo: "Construa o Prompt com Seus Dados", descricao: "Use exemplos REAIS do seu negocio no prompt. Nao exemplos genericos de tutorial.", tempo: "2 horas" },
      { numero: 5, titulo: "Teste com Caso Real", descricao: "Nao teste com exemplo inventado. Use um caso real que voce precisa resolver hoje.", tempo: "Imediato" }
    ],
    ferramentas: [
      { nome: 'ChatGPT com Custom Instructions', porque: 'Configure uma vez o contexto do seu negocio, use sempre.', url: 'https://chat.openai.com', nivel: 'intermediario' },
      { nome: 'Claude Projects', porque: 'Suba documentos do seu negocio e a IA aprende seu contexto.', url: 'https://claude.ai', nivel: 'intermediario' },
      { nome: 'Google NotebookLM', porque: 'Transforme seus documentos em uma IA que conhece seu negocio.', url: 'https://notebooklm.google.com', nivel: 'intermediario' },
      { nome: 'Make + ChatGPT', porque: 'Automacao com inteligencia, usando SEUS dados.', url: 'https://make.com', nivel: 'avancado' }
    ],
    checklist: [
      'Fiz a autopsia: listei o que tentei e por que nao funcionou',
      'Identifiquei o padrao de falha (generico demais, sem contexto, etc)',
      'Escolhi UM processo especifico do meu negocio',
      'Descrevi o processo em detalhes (entrada, saida, objetivo)',
      'Construi prompt usando exemplos REAIS',
      'Testei com um caso real (nao inventado)',
      'Documentei o que funcionou dessa vez'
    ],
    metricaSucesso: "Meta: Ter UMA implementacao funcionando com resultados reais em 14 dias. Nao varios testes - um que funciona de verdade."
  },

  'lider-isolado': {
    perfil: 'lider-isolado',
    titulo: 'Plano de Multiplicacao: Como Fazer Seu Time Adotar IA',
    subtitulo: 'De lider solitario a equipe que implementa junto',
    diagnostico: {
      situacao: "Voce ja usa IA e ve os resultados. Mas olha pro time e ninguem acompanha.",
      porque: "Mandar link de tutorial nao funciona. Adultos aprendem fazendo, com suporte, resolvendo problemas reais.",
      consequencia: "Enquanto so voce usa, o potencial de escala e limitado. E voce continua sobrecarregado."
    },
    passos: [
      { numero: 1, titulo: "Identifique os Early Adopters", descricao: "Quem no time tem curiosidade por tecnologia? Comece com 2-3 pessoas, nao o time inteiro.", tempo: "Esta semana" },
      { numero: 2, titulo: "Escolha Um Caso de Uso com Resultado Visivel", descricao: "Nao comece pelo mais complexo. Escolha algo que todo mundo sofre e que IA resolve rapido.", tempo: "1 reuniao" },
      { numero: 3, titulo: "Mostre, Nao Conte", descricao: "Faca uma demonstracao ao vivo resolvendo um problema real da equipe. Deixe eles verem o resultado.", tempo: "30 minutos" },
      { numero: 4, titulo: "Crie um Grupo Piloto", descricao: "Com os early adopters, crie um grupo. Reuniao semanal de 30min: o que tentaram, o que funcionou, duvidas.", tempo: "4 semanas" },
      { numero: 5, titulo: "Documente e Escale", descricao: "Os casos de sucesso viram templates. Os early adopters viram multiplicadores.", tempo: "Continuo" }
    ],
    ferramentas: [
      { nome: 'Notion AI', porque: 'IA integrada onde o time ja trabalha. Baixa friccao de adocao.', url: 'https://notion.so/product/ai', nivel: 'iniciante' },
      { nome: 'Microsoft Copilot', porque: 'Se usam Office 365, e a forma mais natural de comecar.', url: 'https://copilot.microsoft.com', nivel: 'iniciante' },
      { nome: 'Loom + IA', porque: 'Grave tutoriais curtos. IA transcreve e resume. Time aprende assincronamente.', url: 'https://loom.com', nivel: 'iniciante' },
      { nome: 'Slack + ChatGPT', porque: 'IA no chat que o time ja usa. Perguntas respondidas em segundos.', url: 'https://slack.com/apps', nivel: 'intermediario' }
    ],
    checklist: [
      'Identifiquei 2-3 early adopters no time',
      'Escolhi um caso de uso com resultado visivel e rapido',
      'Fiz demonstracao ao vivo (nao mandei link)',
      'Criei grupo piloto com reunioes semanais',
      'Documentei os primeiros casos de sucesso',
      'Early adopters estao ajudando outros',
      'Tenho templates que qualquer um pode usar'
    ],
    metricaSucesso: "Meta: Em 30 dias, ter pelo menos 3 pessoas do time usando IA regularmente (nao so voce). Em 60 dias, ter casos de sucesso documentados."
  }
};

// ----------------------------------------------------------------------------
// CONTEXTOS PERSONALIZADOS
// ----------------------------------------------------------------------------

export const contextosPersonalizados: Record<SituationType, Record<TeamSizeType, string>> = {
  'empresario-qualificado': {
    'solo': 'Como empresario solo faturando bem, IA e seu multiplicador de forca. Voce pode operar como se tivesse um time de 5.',
    'micro': 'Com um time enxuto e faturamento solido, voce esta no momento ideal pra implementar IA e escalar sem aumentar custo.',
    'medio': 'Empresa em crescimento com time de 6-20 pessoas: IA pode ser a diferenca entre escalar com qualidade ou virar refem do operacional.',
    'grande': 'Com mais de 20 pessoas, IA nao e opcional - e questao de competitividade. Seus concorrentes menores estao usando pra competir com voce.'
  },
  'empresario-iniciante': {
    'solo': 'Comecando sozinho? IA e sua vantagem injusta. Voce pode fazer o trabalho de uma equipe antes mesmo de ter uma.',
    'micro': 'Time pequeno e negocio comecando: esse e o momento de construir processos certos desde o inicio. IA desde a base.',
    'medio': 'Crescendo rapido com equipe? Cuidado pra nao criar processos que vao travar. IA agora evita retrabalho depois.',
    'grande': 'Time grande mas negocio ainda estruturando? Momento critico. IA pode acelerar ou voce pode criar mais burocracia.'
  },
  'clt-futuro': {
    'solo': 'Trabalhando CLT mas pensando em empreender? Aprender IA agora e construir vantagem antes de comecar.',
    'micro': 'CLT com side project? IA e o que permite ter um negocio paralelo sem se matar de trabalhar.',
    'medio': 'Voce trabalha numa empresa media? IA pode ser seu diferencial competitivo interno.',
    'grande': 'Numa empresa grande, quem domina IA se destaca. Voce pode ser essa pessoa.'
  },
  'consultor': {
    'solo': 'Consultor solo: IA multiplica sua capacidade de entrega. O mesmo voce pode atender 3x mais clientes.',
    'micro': 'Consultoria com equipe pequena: IA e diferencial competitivo. Entregue mais rapido, com mais qualidade.',
    'medio': 'Consultoria em crescimento: IA permite escalar sem perder a qualidade que te trouxe ate aqui.',
    'grande': 'Consultoria grande: IA nao e diferencial, e sobrevivencia. Seus clientes ja estao perguntando.'
  }
};

// ----------------------------------------------------------------------------
// INSIGHTS POR FERRAMENTA
// ----------------------------------------------------------------------------

export const insightsPorFerramenta: Record<string, string> = {
  'chatgpt': 'Voce ja usa ChatGPT - otimo comeco. Agora e hora de ir alem de perguntas basicas e criar sistemas.',
  'claude': 'Claude e poderoso pra analises longas. Voce esta no caminho certo - falta estruturar o uso.',
  'gemini': 'Google AI tem potencial enorme, especialmente integrado com Workspace. Hora de explorar mais.',
  'copilot': 'Copilot no Office e porta de entrada. Agora e expandir pra automacoes mais poderosas.',
  'imagem': 'Geracao de imagem e so a ponta do iceberg. IA pode fazer muito mais pelo seu negocio.',
  'automacao': 'Voce ja usa ferramentas de automacao - esta a um passo de adicionar inteligencia nos fluxos.',
  'nocode-apps': 'Lovable/Bolt/v0 mostram que voce pensa em construir. Hora de combinar com IA generativa.',
  'nenhuma': 'Tudo bem comecar do zero. Na verdade, e melhor - voce nao tem vicios pra desaprender.'
};

// ----------------------------------------------------------------------------
// CTAs DINAMICOS
// ----------------------------------------------------------------------------

export interface CTADinamico {
  urgencia: UrgencyType;
  titulo: string;
  subtitulo: string;
  bullets: string[];
  cta: string;
  url: string;
  nota: string;
}

export const ctasDinamicos: Record<UrgencyType, CTADinamico> = {
  'urgente': {
    urgencia: 'urgente',
    titulo: 'Voce disse que e urgente. Entao vamos resolver em 48 horas.',
    subtitulo: 'Na Imersao Pratica de IA para Negocios, nosso time de especialistas implementa COM voce. Nao e curso. Nao e palestra. E implementacao real.',
    bullets: [
      'Time tecnico implementando ao seu lado em tempo real',
      'Seu primeiro sistema de IA funcionando em 48 horas',
      'Especialistas resolvendo suas duvidas na hora',
      'Garantia: funciona ou devolvemos seu dinheiro'
    ],
    cta: 'QUERO IMPLEMENTAR EM 48H',
    url: 'https://imersao.academialendaria.ai/',
    nota: '24 e 25 de Janeiro de 2026 | 100% Online | Vagas Limitadas'
  },
  'breve': {
    urgencia: 'breve',
    titulo: 'Nos proximos 30 dias? A Imersao e dia 24-25 de Janeiro.',
    subtitulo: 'Timing perfeito. Voce quer implementar em breve, e a Imersao acontece no final do mes. Dois dias intensivos, resultado concreto.',
    bullets: [
      'Dois dias focados, sem enrolacao',
      'Saia com pelo menos uma solucao implementada',
      'Time de especialistas do seu lado',
      'Garantia de resultado ou dinheiro de volta'
    ],
    cta: 'GARANTIR MINHA VAGA',
    url: 'https://imersao.academialendaria.ai/',
    nota: '24 e 25 de Janeiro de 2026 | 100% Online'
  },
  'medio-prazo': {
    urgencia: 'medio-prazo',
    titulo: 'Quer se preparar com calma? Comece pelo plano acima.',
    subtitulo: 'Use o plano de acao personalizado que preparamos. E se quiser acelerar, a Imersao de Janeiro e uma opcao.',
    bullets: [
      'Comece pelo plano de 7 dias acima',
      'Teste, aprenda, evolua no seu ritmo',
      'Se quiser acelerar: Imersao em Janeiro',
      'Sem pressao - o plano ja te da um bom comeco'
    ],
    cta: 'CONHECER A IMERSAO',
    url: 'https://imersao.academialendaria.ai/',
    nota: 'Opcional: 24 e 25 de Janeiro de 2026'
  },
  'pesquisando': {
    urgencia: 'pesquisando',
    titulo: 'So pesquisando? Perfeito. Leve o plano e teste.',
    subtitulo: 'O plano de acao acima e seu, sem compromisso. Aplique, veja os resultados, e depois decide se quer ir alem.',
    bullets: [
      'Plano 100% gratuito e pratico',
      'Sem precisar comprar nada pra comecar',
      'Resultados em 7 dias se aplicar',
      'Quando quiser acelerar, estamos aqui'
    ],
    cta: 'SABER MAIS SOBRE A IMERSAO',
    url: 'https://imersao.academialendaria.ai/',
    nota: 'Sem compromisso - explore no seu tempo'
  }
};

// ----------------------------------------------------------------------------
// TAGS ACTIVECAMPAIGN
// ----------------------------------------------------------------------------

// NOVA TAXONOMIA DE GOVERNANCA (08/Jan/2026)
// Tags reais criadas no ActiveCampaign seguindo padrao MKT_Tag_*
export const tagIds = {
  // Tags principais criadas no AC
  isca: 235,           // MKT_Tag_IscaQuizDiagnosticoIA
  completouQuiz: 236,  // MKT_Tag_CompletouQuizIA
  
  // Perfis de resultado
  perfis: {
    'sobrecarregado': 237,    // MKT_Tag_QuizPerfilSobrecarregado
    'curioso-travado': 238,   // MKT_Tag_QuizPerfilCuriosoTravado
    'tecnico-frustrado': 239, // MKT_Tag_QuizPerfilTecnicoFrustrado
    'lider-isolado': 240      // MKT_Tag_QuizPerfilLiderIsolado
  },
  
  // Lead Score
  leadScore: {
    'hot': 241,  // MKT_Tag_QuizLeadHot
    'warm': 242, // MKT_Tag_QuizLeadWarm
    'cold': 243  // MKT_Tag_QuizLeadCold
  }
};

// ----------------------------------------------------------------------------
// ENTREGA - Estrutura da pagina de resultado
// ----------------------------------------------------------------------------

export const entrega = {
  header: {
    badge: 'SEU DIAGNOSTICO COMPLETO',
    titulo: 'Seu Perfil de Empresario com IA'
  },
  secoes: [
    { id: 'perfil', titulo: 'Seu Perfil', descricao: 'Baseado nas suas respostas, identificamos seu perfil' },
    { id: 'contexto', titulo: 'Seu Contexto', descricao: 'Analise personalizada da sua situacao' },
    { id: 'diagnostico', titulo: 'Diagnostico', descricao: 'O que esta acontecendo e por que' },
    { id: 'plano', titulo: 'Seu Plano de Acao', descricao: 'Passos praticos para os proximos 7-30 dias' },
    { id: 'ferramentas', titulo: 'Ferramentas Recomendadas', descricao: 'Baseadas no seu nivel e objetivo' },
    { id: 'checklist', titulo: 'Checklist de Execucao', descricao: 'Marque conforme avanca' },
    { id: 'proximo-passo', titulo: 'Proximo Passo', descricao: 'Quer acelerar os resultados?' }
  ],
  email: {
    assunto: '[Diagnostico] Seu perfil: {PERFIL_TITULO}',
    preview: 'Plano de acao personalizado para implementar IA no seu negocio'
  }
};

// ----------------------------------------------------------------------------
// FUNCOES HELPERS
// ----------------------------------------------------------------------------

export function calcularPerfilDominante(respostas: Record<number, string | string[]>): ProfileType {
  const pontos: Record<ProfileType, number> = {
    'sobrecarregado': 0,
    'curioso-travado': 0,
    'tecnico-frustrado': 0,
    'lider-isolado': 0
  };

  const exp = respostas[3] as string;
  if (exp === 'nunca-usou' || exp === 'usa-basico') pontos['curioso-travado'] += 2;
  if (exp === 'tentou-falhou') pontos['tecnico-frustrado'] += 3;
  if (exp === 'usa-bem') pontos['lider-isolado'] += 2;

  const dor = respostas[5] as string;
  if (dor === 'dor-tempo') pontos['sobrecarregado'] += 4;
  if (dor === 'dor-direcao') pontos['curioso-travado'] += 4;
  if (dor === 'dor-frustrado') pontos['tecnico-frustrado'] += 4;
  if (dor === 'dor-equipe') pontos['lider-isolado'] += 4;

  const bloqueio = respostas[7] as string;
  if (bloqueio === 'bloqueio-tempo') pontos['sobrecarregado'] += 2;
  if (bloqueio === 'bloqueio-direcao') pontos['curioso-travado'] += 2;
  if (bloqueio === 'bloqueio-frustrado') pontos['tecnico-frustrado'] += 2;
  if (bloqueio === 'bloqueio-equipe') pontos['lider-isolado'] += 2;

  let maxPontos = 0;
  let perfilDominante: ProfileType = 'curioso-travado';
  for (const [perfil, pts] of Object.entries(pontos)) {
    if (pts > maxPontos) {
      maxPontos = pts;
      perfilDominante = perfil as ProfileType;
    }
  }
  return perfilDominante;
}

export function calcularLeadScore(respostas: Record<number, string | string[]>): number {
  let score = 0;
  const situacao = respostas[1] as string;
  if (situacao === 'empresario-qualificado') score += 3;
  else if (situacao === 'empresario-iniciante' || situacao === 'consultor') score += 2;
  else score += 1;

  const tamanho = respostas[2] as string;
  if (tamanho === 'medio' || tamanho === 'grande') score += 3;
  else if (tamanho === 'micro') score += 2;
  else score += 1;

  const urgencia = respostas[8] as string;
  if (urgencia === 'urgente') score += 3;
  else if (urgencia === 'breve') score += 2;
  else if (urgencia === 'medio-prazo') score += 1;

  return score;
}

export function classificarLead(score: number): 'hot' | 'warm' | 'cold' {
  if (score >= 7) return 'hot';
  if (score >= 4) return 'warm';
  return 'cold';
}

export function gerarContextoPersonalizado(
  situacao: SituationType,
  tamanho: TeamSizeType,
  ferramentas: string[]
): string {
  let contexto = contextosPersonalizados[situacao]?.[tamanho] || '';
  if (ferramentas.length > 0 && ferramentas[0] !== 'nenhuma') {
    const primeiraFerramenta = ferramentas[0];
    const insightFerramenta = insightsPorFerramenta[primeiraFerramenta];
    if (insightFerramenta) {
      contexto += '\n\n' + insightFerramenta;
    }
  } else if (ferramentas.includes('nenhuma')) {
    contexto += '\n\n' + insightsPorFerramenta['nenhuma'];
  }
  return contexto;
}

export function obterCTADinamico(urgencia: UrgencyType): CTADinamico {
  return ctasDinamicos[urgencia] || ctasDinamicos['pesquisando'];
}

export interface ResultadoCompleto {
  perfil: QuizProfile;
  plano: PlanoDeAcao;
  contexto: string;
  cta: CTADinamico;
  leadScore: number;
  leadClassificacao: 'hot' | 'warm' | 'cold';
  tags: number[];
}

export function montarResultadoCompleto(respostas: Record<number, string | string[]>): ResultadoCompleto {
  const perfilId = calcularPerfilDominante(respostas);
  const perfil = quizProfiles[perfilId];
  const plano = planosDeAcao[perfilId];

  const situacao = respostas[1] as SituationType;
  const tamanho = respostas[2] as TeamSizeType;
  const ferramentas = respostas[4] as string[];
  const urgencia = respostas[8] as UrgencyType;

  const contexto = gerarContextoPersonalizado(situacao, tamanho, ferramentas);
  const cta = obterCTADinamico(urgencia);
  const leadScore = calcularLeadScore(respostas);
  const leadClassificacao = classificarLead(leadScore);

  const tags: number[] = [
    tagIds.isca,
    tagIds.completouQuiz,
    tagIds.perfis[perfilId],
    tagIds.situacao[situacao],
    tagIds.tamanho[tamanho],
    tagIds.experiencia[respostas[3] as ExperienceType],
    tagIds.dor[respostas[5] as string],
    tagIds.objetivo[respostas[6] as string],
    tagIds.bloqueio[respostas[7] as string],
    tagIds.urgencia[urgencia],
    tagIds.leadScore[leadClassificacao]
  ];

  if (Array.isArray(ferramentas)) {
    ferramentas.forEach(f => {
      const tagId = tagIds.ferramentas[f as keyof typeof tagIds.ferramentas];
      if (tagId) tags.push(tagId);
    });
  }

  return {
    perfil,
    plano,
    contexto,
    cta,
    leadScore,
    leadClassificacao,
    tags: tags.filter(Boolean)
  };
}

// ----------------------------------------------------------------------------
// COMPATIBILIDADE - qualificacaoOptions (usado em CapturaPage)
// ----------------------------------------------------------------------------

export const qualificacaoOptions = {
  situacao: [
    { value: 'empresario-qualificado', label: 'Empresario com negocio ativo (fatura +R$20k/mes)' },
    { value: 'empresario-iniciante', label: 'Empresario comecando' },
    { value: 'clt-futuro', label: 'Profissional CLT' },
    { value: 'consultor', label: 'Consultor/Freelancer' }
  ],
  disponibilidadeEvento: [
    { value: 'sim-24-25', label: 'Sim, estarei livre dias 24-25 Janeiro' },
    { value: 'talvez', label: 'Talvez, preciso verificar agenda' },
    { value: 'nao-mas-interessado', label: 'Nao, mas quero saber mais' },
    { value: 'nao-interessado', label: 'Nao tenho interesse no evento' }
  ]
};

// ----------------------------------------------------------------------------
// COMPATIBILIDADE - eventCTA (usado em EventCTA.tsx)
// ----------------------------------------------------------------------------

export const eventCTA = {
  badge: '24-25 JANEIRO 2026 | 100% ONLINE',
  headline: 'Implemente IA no seu negocio em 48 horas',
  subheadline: 'Time de especialistas implementando COM voce, em tempo real.',
  bullets: [
    'Time tecnico implementando ao seu lado em tempo real',
    'Seu primeiro sistema de IA funcionando em 48 horas',
    'Especialistas resolvendo suas duvidas na hora',
    'Acesso a comunidade de empresarios que usam IA'
  ],
  guarantee: 'Garantia: funciona ou devolvemos seu dinheiro',
  buttonUrl: 'https://imersao.academialendaria.ai/',
  buttonText: 'QUERO IMPLEMENTAR EM 48H',
  urgency: 'Vagas limitadas',
  price: 'R$ 297'
};
