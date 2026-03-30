import {
  AssessmentAnswer,
  AssessmentResult,
  PillarScore,
  PriorityItem,
  RiskItem,
  ScoreBand,
  SchoolInfo,
} from './types';
import { questions } from './questions';
import { pillars } from './pillars';

// ============================================================
// Motor de Score — Determinístico
// Mesmas respostas = mesmo resultado, sempre.
// ============================================================

/**
 * Converte score numérico (0-100) na faixa correspondente
 */
export function getScoreBand(score: number): ScoreBand {
  if (score <= 25) return 'critico';
  if (score <= 50) return 'atencao';
  if (score <= 75) return 'adequado';
  return 'avancado';
}

/**
 * Retorna a cor associada à faixa de score
 */
export function getBandColor(band: ScoreBand): string {
  const colors: Record<ScoreBand, string> = {
    critico: '#DC2626',
    atencao: '#F59E0B',
    adequado: '#3B82F6',
    avancado: '#16A34A',
  };
  return colors[band];
}

/**
 * Retorna o label da faixa de score
 */
export function getBandLabel(band: ScoreBand): string {
  const labels: Record<ScoreBand, string> = {
    critico: 'Crítico',
    atencao: 'Atenção',
    adequado: 'Adequado',
    avancado: 'Avançado',
  };
  return labels[band];
}

/**
 * Retorna a descrição executiva da faixa de score
 */
export function getBandDescription(band: ScoreBand): string {
  const descriptions: Record<ScoreBand, string> = {
    critico:
      'A escola apresenta exposição significativa em segurança digital. Existem lacunas críticas que demandam ação imediata para reduzir riscos jurídicos, operacionais e de proteção dos alunos.',
    atencao:
      'A escola possui algumas iniciativas, mas há lacunas importantes que precisam ser endereçadas. O nível atual de maturidade deixa a instituição vulnerável a incidentes e dificuldades de conformidade.',
    adequado:
      'A escola demonstra boa base de maturidade em segurança digital. Existem oportunidades claras de melhoria que podem elevar a proteção e a conformidade a um patamar mais robusto.',
    avancado:
      'A escola demonstra maturidade sólida em segurança digital. O foco deve estar na manutenção, evolução contínua e preparação para desafios emergentes.',
  };
  return descriptions[band];
}

/**
 * Calcula o score de um pilar específico
 */
function calculatePillarScore(
  pillarId: string,
  answers: AssessmentAnswer[]
): { score: number; achieved: number; maxPossible: number } {
  const pillarQuestions = questions.filter((q) => q.pillar === pillarId);
  let achieved = 0;
  let maxPossible = 0;

  for (const question of pillarQuestions) {
    const answer = answers.find((a) => a.questionId === question.id);
    const maxOptionValue = Math.max(...question.options.map((o) => o.value));

    maxPossible += maxOptionValue * question.weight;

    if (answer && answer.selectedValues.length > 0) {
      if (question.type === 'multiple-choice') {
        // Para multiple-choice, soma os valores selecionados (cap no máximo)
        const sum = answer.selectedValues.reduce((a, b) => a + b, 0);
        achieved += Math.min(sum, maxOptionValue) * question.weight;
      } else {
        achieved += answer.selectedValues[0] * question.weight;
      }
    }
    // Se não respondeu, achieved += 0 (pior cenário)
  }

  const score = maxPossible > 0 ? (achieved / maxPossible) * 100 : 0;
  return { score: Math.round(score * 10) / 10, achieved, maxPossible };
}

/**
 * Identifica os 3 principais riscos baseado nos pilares com menor score
 */
function identifyTopRisks(pillarScores: PillarScore[]): RiskItem[] {
  const riskDescriptions: Record<string, Record<ScoreBand, string>> = {
    governanca: {
      critico: 'Ausência de políticas e governança expõe a escola a decisões inconsistentes e responsabilidades indefinidas.',
      atencao: 'Políticas existem parcialmente, mas falta formalização e engajamento da gestão.',
      adequado: 'Governança estabelecida com oportunidades de refinamento e revisão periódica.',
      avancado: 'Governança madura. Foco em melhoria contínua.',
    },
    'protecao-dados': {
      critico: 'Risco elevado de não conformidade com a LGPD. Dados pessoais de menores podem estar sem proteção adequada.',
      atencao: 'Iniciativas de proteção de dados existem, mas há gaps que podem resultar em exposição de dados pessoais.',
      adequado: 'Proteção de dados em bom nível com pontos de melhoria em processos e documentação.',
      avancado: 'Práticas sólidas de proteção de dados. Manter monitoramento e atualização.',
    },
    infraestrutura: {
      critico: 'Infraestrutura digital sem controles básicos de segurança, exposta a ataques e perda de dados.',
      atencao: 'Controles técnicos parciais. Vulnerabilidades conhecidas precisam ser endereçadas.',
      adequado: 'Infraestrutura com boa base de segurança e pontos específicos para reforço.',
      avancado: 'Infraestrutura bem protegida. Foco em monitoramento e atualização contínua.',
    },
    capacitacao: {
      critico: 'Equipe sem formação em segurança digital — principal vetor de incidentes.',
      atencao: 'Formação existe mas é insuficiente ou irregular para criar cultura de segurança.',
      adequado: 'Programa de capacitação estabelecido com espaço para expansão e aprofundamento.',
      avancado: 'Cultura digital madura. Manter programas de atualização contínua.',
    },
    'protecao-criancas': {
      critico: 'Alunos sem proteção adequada no ambiente digital. Risco de cyberbullying, exposição e aliciamento sem resposta estruturada.',
      atencao: 'Proteção parcial dos alunos no ambiente digital. Protocolos precisam ser fortalecidos.',
      adequado: 'Boa proteção digital dos alunos com oportunidades de reforço em protocolos e canais.',
      avancado: 'Proteção robusta. Manter vigilância e atualizar protocolos conforme necessário.',
    },
    'resposta-incidentes': {
      critico: 'Escola sem capacidade de resposta a incidentes digitais. Em caso de crise, a reação será improvisada.',
      atencao: 'Alguma preparação existe, mas sem planos testados ou procedimentos claros.',
      adequado: 'Preparação para incidentes em bom nível. Testar e refinar procedimentos.',
      avancado: 'Boa capacidade de resposta. Manter simulações e atualizar planos.',
    },
  };

  // Ordena por score (menor primeiro), desempata por peso do pilar (maior peso = mais crítico)
  const sorted = [...pillarScores].sort((a, b) => {
    if (a.score !== b.score) return a.score - b.score;
    const pillarA = pillars.find((p) => p.id === a.pillarId);
    const pillarB = pillars.find((p) => p.id === b.pillarId);
    return (pillarB?.weight ?? 0) - (pillarA?.weight ?? 0);
  });

  return sorted.slice(0, 3).map((ps) => ({
    pillarId: ps.pillarId,
    pillarName: ps.pillarName,
    description:
      riskDescriptions[ps.pillarId]?.[ps.band] ??
      'Área com oportunidade de melhoria.',
    severity: ps.band === 'critico' ? 'high' : ps.band === 'atencao' ? 'medium' : 'low',
  }));
}

/**
 * Identifica as 3 prioridades imediatas baseado em perguntas críticas com score baixo
 */
function identifyTopPriorities(answers: AssessmentAnswer[]): PriorityItem[] {
  const priorityActions: Record<string, string> = {
    'gov-01': 'Criar e formalizar uma política de segurança digital, mesmo que inicial e simples.',
    'gov-02': 'Designar formalmente um responsável pela segurança digital e proteção de dados.',
    'dados-01': 'Realizar um inventário de dados pessoais coletados, armazenados e compartilhados.',
    'dados-02': 'Implementar termos de consentimento específicos para tratamento de dados de alunos.',
    'dados-04': 'Mapear e regularizar o compartilhamento de dados com plataformas e fornecedores.',
    'infra-03': 'Implementar backup automatizado dos sistemas e dados críticos com testes periódicos.',
    'cap-01': 'Iniciar programa de formação em segurança digital para toda a equipe.',
    'prot-01': 'Criar protocolo documentado de prevenção e resposta ao cyberbullying.',
    'prot-03': 'Estabelecer canal seguro e acessível para alunos reportarem situações de risco online.',
    'inc-01': 'Criar plano básico de resposta a incidentes de segurança digital.',
  };

  // Filtra perguntas críticas (weight 3) com respostas 0 ou 1
  const criticalLowScores = questions
    .filter((q) => q.weight === 3)
    .map((q) => {
      const answer = answers.find((a) => a.questionId === q.id);
      const value = answer?.selectedValues[0] ?? 0;
      return { question: q, value };
    })
    .filter((item) => item.value <= 1)
    .sort((a, b) => a.value - b.value);

  return criticalLowScores.slice(0, 3).map((item) => ({
    questionId: item.question.id,
    pillarId: item.question.pillar,
    description: item.question.question,
    action:
      priorityActions[item.question.id] ??
      'Implementar controle adequado para reduzir a exposição nesta área.',
  }));
}

/**
 * Calcula o resultado completo do assessment.
 * Função principal — determinística.
 */
export function calculateAssessmentResult(
  answers: AssessmentAnswer[],
  schoolInfo: SchoolInfo
): AssessmentResult {
  // Calcula score de cada pilar
  const pillarScores: PillarScore[] = pillars.map((pillar) => {
    const { score, achieved, maxPossible } = calculatePillarScore(
      pillar.id,
      answers
    );
    return {
      pillarId: pillar.id,
      pillarName: pillar.name,
      score,
      band: getScoreBand(score),
      maxPossible,
      achieved,
    };
  });

  // Calcula score geral (média ponderada dos pilares)
  let weightedSum = 0;
  let totalWeight = 0;
  for (const ps of pillarScores) {
    const pillar = pillars.find((p) => p.id === ps.pillarId);
    if (pillar) {
      weightedSum += ps.score * pillar.weight;
      totalWeight += pillar.weight;
    }
  }
  const overallScore =
    totalWeight > 0
      ? Math.round((weightedSum / totalWeight) * 10) / 10
      : 0;

  const topRisks = identifyTopRisks(pillarScores);
  const topPriorities = identifyTopPriorities(answers);

  return {
    overallScore,
    overallBand: getScoreBand(overallScore),
    pillarScores,
    topRisks,
    topPriorities,
    completedAt: new Date().toISOString(),
    schoolInfo,
  };
}
