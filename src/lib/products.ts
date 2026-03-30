// ============================================================
// Escola Segura — Estrutura de Monetização
// ============================================================

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number; // em centavos (Stripe-ready)
  priceDisplay: string;
  type: 'digital' | 'service' | 'subscription';
  tier: 'entry' | 'core' | 'premium' | 'enterprise';
  includes: string[];
  stripePriceId?: string; // para futura integração
}

export interface Bundle {
  id: string;
  name: string;
  products: string[]; // IDs dos produtos
  price: number;
  priceDisplay: string;
  savings: string;
  description: string;
}

// ----------------------------------------------------------
// ESCADA DE PRODUTOS
// ----------------------------------------------------------

export const products: Product[] = [
  // NÍVEL 0 — Entrada gratuita (lead capture)
  {
    id: 'diagnostico-gratuito',
    name: 'Diagnóstico Gratuito',
    description:
      'Score geral, semáforo por pilar, 3 riscos principais e 3 prioridades imediatas.',
    price: 0,
    priceDisplay: 'Gratuito',
    type: 'digital',
    tier: 'entry',
    includes: [
      'Score geral de prontidão digital',
      'Semáforo por pilar (6 pilares)',
      '3 principais áreas de atenção',
      '3 prioridades imediatas de ação',
      'Classificação de maturidade',
    ],
  },

  // NÍVEL 1 — Produto principal (conversão)
  {
    id: 'relatorio-executivo',
    name: 'Relatório Executivo',
    description:
      'Diagnóstico completo com análise detalhada, mapa de riscos, recomendações e roadmap de 90 dias.',
    price: 29700, // R$ 297,00
    priceDisplay: 'R$ 297',
    type: 'digital',
    tier: 'core',
    includes: [
      'Tudo do diagnóstico gratuito',
      'Análise detalhada de cada pilar',
      'Mapa de riscos priorizado por severidade',
      'Recomendações acionáveis por área',
      'Roadmap estruturado de 90 dias (30-60-90)',
      'Parecer executivo para apresentar à gestão',
      'Checklist de conformidade LGPD para escolas',
      'Relatório em PDF profissional',
    ],
  },

  // NÍVEL 2 — Serviços (upsell)
  {
    id: 'workshop',
    name: 'Workshop de Segurança Digital',
    description:
      'Capacitação de 3 horas para equipe escolar. Presencial ou online.',
    price: 250000, // R$ 2.500,00
    priceDisplay: 'A partir de R$ 2.500',
    type: 'service',
    tier: 'premium',
    includes: [
      'Workshop de 3 horas (presencial ou online)',
      'Material didático para a equipe',
      'Certificado de participação',
      'Plano de ação pós-workshop',
      'Conteúdo customizado para o contexto da escola',
    ],
  },
  {
    id: 'consultoria-adequacao',
    name: 'Consultoria de Adequação',
    description:
      'Revisão de políticas, contratos e processos com plano de implementação completo.',
    price: 500000, // R$ 5.000,00
    priceDisplay: 'A partir de R$ 5.000',
    type: 'service',
    tier: 'premium',
    includes: [
      'Diagnóstico aprofundado in loco',
      'Revisão de políticas e contratos',
      'Adequação de processos à LGPD',
      'Plano de implementação detalhado',
      'Modelos de documentos (políticas, termos)',
      'Suporte por 30 dias após entrega',
    ],
  },

  // NÍVEL 3 — Recorrência (enterprise)
  {
    id: 'acompanhamento-mensal',
    name: 'Acompanhamento Mensal',
    description:
      'Suporte contínuo para implementação e evolução da maturidade digital.',
    price: 200000, // R$ 2.000/mês
    priceDisplay: 'A partir de R$ 2.000/mês',
    type: 'subscription',
    tier: 'enterprise',
    includes: [
      'Reunião mensal de acompanhamento',
      'Revisão contínua de políticas e processos',
      'Suporte para incidentes',
      'Reavaliação trimestral do score',
      'Relatório de evolução',
      'Canal direto com especialista',
    ],
  },
];

// ----------------------------------------------------------
// BUNDLES
// ----------------------------------------------------------

export const bundles: Bundle[] = [
  {
    id: 'bundle-diagnostico-workshop',
    name: 'Diagnóstico + Workshop',
    products: ['relatorio-executivo', 'workshop'],
    price: 249700, // R$ 2.497,00
    priceDisplay: 'R$ 2.497',
    savings: 'Economize R$ 300',
    description:
      'Relatório executivo completo + workshop de 3 horas para a equipe. O diagnóstico fundamenta o workshop.',
  },
  {
    id: 'bundle-completo',
    name: 'Pacote Completo',
    products: ['relatorio-executivo', 'workshop', 'consultoria-adequacao'],
    price: 699700, // R$ 6.997,00
    priceDisplay: 'R$ 6.997',
    savings: 'Economize R$ 800',
    description:
      'Diagnóstico + workshop + consultoria de adequação. Da visibilidade à ação completa.',
  },
];

// ----------------------------------------------------------
// ESTRATÉGIA DE MONETIZAÇÃO (documentação)
// ----------------------------------------------------------

/**
 * PONTOS DE OFERTA NO FLUXO:
 *
 * 1. PÓS-SCORE (tela de resultado):
 *    - Resultado parcial gratuito → CTA para relatório executivo
 *    - Mostrar o que o relatório completo inclui a mais
 *    - Ancoragem: "Consultoria similar custaria R$ 5.000-15.000"
 *
 * 2. PÓS-COMPRA DO RELATÓRIO:
 *    - Oferta de reunião estratégica gratuita (30 min)
 *    - A reunião é a porta para workshop/consultoria
 *    - Lista de serviços complementares com preços
 *
 * 3. NO PRÓPRIO RELATÓRIO:
 *    - Cada pilar com score baixo sugere serviço específico
 *    - Final do relatório: CTA para próximo nível
 *
 * ESTRATÉGIA DE LEAD CAPTURE:
 * - Formulário de identificação ANTES do assessment
 * - Email obrigatório para receber o resultado
 * - Dados segmentados por porte/tipo/região para follow-up
 *
 * ESTRATÉGIA PARA NÃO ENTREGAR VALOR DEMAIS GRÁTIS:
 * - Gratuito: score geral + semáforo + 3 riscos + 3 prioridades
 * - Pago: análise detalhada + recomendações específicas + roadmap + parecer
 * - O gratuito gera consciência do problema; o pago entrega a solução
 *
 * MODELO B2B COM TICKET MAIOR:
 * - Para redes de ensino: diagnóstico consolidado + benchmark entre unidades
 * - Para associações: diagnóstico customizado para associados
 * - Preço por escola diminui com volume (10+ escolas: desconto progressivo)
 */
