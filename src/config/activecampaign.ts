/**
 * Configuracao do ActiveCampaign para o Quiz Diagnostico de IA
 *
 * TAXONOMIA DE GOVERNANCA:
 * - Formato: [CODIGO]_[AREA]_[TIPO]_[Nome]
 * - Areas: MKT, COM, CS, PROD, MASTER
 * - Tipos: Lista, Tag, Auto, Pipe, Form, Camp, Pro
 * - Temporarios: sufixo _TEMP_[MES][ANO]
 *
 * IDs criados em: 08/Jan/2026
 * Ambiente: Academia Lendaria
 */

export const AC_CONFIG = {
  // Lista para leads do quiz
  // Taxonomia: 03_MKT_Lista_IscaQuizDiagnosticoIA_TEMP_JAN26
  list: {
    id: 59,
    name: '03_MKT_Lista_IscaQuizDiagnosticoIA_TEMP_JAN26'
  },

  // Tags principais - NOVA TAXONOMIA
  tags: {
    // Origem
    origemIsca: {
      id: 235,
      name: 'MKT_Tag_IscaQuizDiagnosticoIA'
    },
    // Completou
    completouQuiz: {
      id: 236,
      name: 'MKT_Tag_CompletouQuizIA'
    },
    // Perfis de resultado
    perfis: {
      sobrecarregado: {
        id: 237,
        name: 'MKT_Tag_QuizPerfilSobrecarregado'
      },
      'curioso-travado': {
        id: 238,
        name: 'MKT_Tag_QuizPerfilCuriosoTravado'
      },
      'tecnico-frustrado': {
        id: 239,
        name: 'MKT_Tag_QuizPerfilTecnicoFrustrado'
      },
      'lider-isolado': {
        id: 240,
        name: 'MKT_Tag_QuizPerfilLiderIsolado'
      }
    },
    // Lead Score
    leadScore: {
      hot: {
        id: 241,
        name: 'MKT_Tag_QuizLeadHot'
      },
      warm: {
        id: 242,
        name: 'MKT_Tag_QuizLeadWarm'
      },
      cold: {
        id: 243,
        name: 'MKT_Tag_QuizLeadCold'
      }
    }
  },

  // API Proxy endpoint
  apiEndpoint: 'https://api-proxy-activecampaign.vercel.app/api/lead/qualify',

  // Mapeamento de perfil para tag ID
  getPerfilTagId: (perfil: 'sobrecarregado' | 'curioso-travado' | 'tecnico-frustrado' | 'lider-isolado'): number => {
    const map: Record<string, number> = {
      'sobrecarregado': 237,
      'curioso-travado': 238,
      'tecnico-frustrado': 239,
      'lider-isolado': 240
    }
    return map[perfil]
  },

  // Mapeamento de lead score para tag ID
  getLeadScoreTagId: (score: 'hot' | 'warm' | 'cold'): number => {
    const map: Record<string, number> = {
      hot: 241,
      warm: 242,
      cold: 243
    }
    return map[score]
  }
}

export default AC_CONFIG
