import { useState } from 'react';
import type { ProfileType } from '../data/content';
import { AC_CONFIG } from '../config/activecampaign';

export interface LeadData {
  email: string;
  nome?: string;
  whatsapp?: string;
  situacao?: string;
  disponibilidadeEvento?: string;
  perfilResultado?: ProfileType;
  leadScore?: number;
}

interface UseLeadCaptureReturn {
  isLoading: boolean;
  error: string | null;
  success: boolean;
  sendLead: (data: LeadData) => Promise<boolean>;
  buildTagIds: (data: LeadData) => number[];
}

// Classificar lead por score
function classificarLead(score: number): 'hot' | 'warm' | 'cold' {
  if (score >= 7) return 'hot';
  if (score >= 4) return 'warm';
  return 'cold';
}

// Build tag IDs based on lead data for CRM segmentation
const buildTagIds = (data: LeadData): number[] => {
  const tagIds: number[] = [
    AC_CONFIG.tags.origemIsca.id,     // 235 - MKT_Tag_IscaQuizDiagnosticoIA
    AC_CONFIG.tags.completouQuiz.id   // 236 - MKT_Tag_CompletouQuizIA
  ];

  // Add perfil tag
  if (data.perfilResultado) {
    const perfilTagId = AC_CONFIG.getPerfilTagId(data.perfilResultado);
    if (perfilTagId) tagIds.push(perfilTagId);
  }

  // Add lead score tag
  if (data.leadScore !== undefined) {
    const scoreClass = classificarLead(data.leadScore);
    const scoreTagId = AC_CONFIG.getLeadScoreTagId(scoreClass);
    if (scoreTagId) tagIds.push(scoreTagId);
  }

  return tagIds;
};

// Build field values for AC custom fields
const buildFieldValues = (data: LeadData): Array<{field: number, value: string}> => {
  const fieldValues: Array<{field: number, value: string}> = [];

  // Perfil resultado
  if (data.perfilResultado) {
    fieldValues.push({
      field: AC_CONFIG.fields.perfil.id,
      value: data.perfilResultado
    });
  }

  // Lead score
  if (data.leadScore !== undefined) {
    fieldValues.push({
      field: AC_CONFIG.fields.score.id,
      value: String(data.leadScore)
    });

    // Temperatura baseada no score
    const temperatura = classificarLead(data.leadScore);
    fieldValues.push({
      field: AC_CONFIG.fields.temperatura.id,
      value: temperatura
    });
  }

  // Situacao
  if (data.situacao) {
    fieldValues.push({
      field: AC_CONFIG.fields.situacao.id,
      value: data.situacao
    });
  }

  // Disponibilidade evento
  if (data.disponibilidadeEvento) {
    fieldValues.push({
      field: AC_CONFIG.fields.disponibilidadeEvento.id,
      value: data.disponibilidadeEvento
    });
  }

  // Data de captura
  fieldValues.push({
    field: AC_CONFIG.fields.dataCaptura.id,
    value: new Date().toISOString().split('T')[0]
  });

  return fieldValues;
};

export function useLeadCapture(): UseLeadCaptureReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const sendLead = async (data: LeadData): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const tagIds = buildTagIds(data);

      // Extrair primeiro e ultimo nome
      const nameParts = (data.nome || '').trim().split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';

      // Build field values para campos customizados
      const fieldValues = buildFieldValues(data);

      // Payload para API Proxy
      const payload = {
        email: data.email,
        nome: data.nome,
        firstName,
        lastName,
        phone: data.whatsapp || '',
        isca: 'quiz-diagnostico-ia',
        listId: AC_CONFIG.list.id,
        tags: tagIds,
        fieldValues: fieldValues,
        meta: {
          situacao: data.situacao,
          disponibilidadeEvento: data.disponibilidadeEvento,
          perfilResultado: data.perfilResultado,
          leadScore: data.leadScore,
          dataCaptura: new Date().toISOString().split('T')[0]
        }
      };

      console.log('[LeadCapture] Sending to AC:', payload);

      // Chamar API Proxy
      const response = await fetch(AC_CONFIG.apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'HTTP ' + response.status);
      }

      const result = await response.json();
      console.log('[LeadCapture] AC Response:', result);

      // Facebook Pixel - Lead Event
      if (typeof window !== 'undefined' && (window as any).fbq) {
        (window as any).fbq('track', 'Lead', {
          content_name: 'Quiz Diagnostico IA',
          content_category: 'isca',
          value: data.leadScore || 0,
          currency: 'BRL'
        });
      }

      // GTM DataLayer - Lead Event
      if (typeof window !== 'undefined' && (window as any).dataLayer) {
        (window as any).dataLayer.push({
          event: 'generate_lead',
          lead_source: 'quiz-diagnostico-ia',
          lead_profile: data.perfilResultado,
          lead_score: data.leadScore,
          lead_situacao: data.situacao
        });
      }

      setSuccess(true);
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao enviar dados';
      setError(errorMessage);
      console.error('[LeadCapture] Error:', err);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    success,
    sendLead,
    buildTagIds
  };
}
