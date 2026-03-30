import {
  AssessmentResult,
  ExecutiveReport,
  RoadmapPhase,
  ScoreBand,
} from './types';
import { getBandLabel, getBandDescription } from './scoring';
import { pillars } from './pillars';

// ============================================================
// FASE 7 — Camada de IA e Templates de Relatório
//
// O relatório é gerado deterministicamente via templates.
// A IA (futura) personaliza o parecer e o roadmap.
// ============================================================

// ----------------------------------------------------------
// Templates de parecer por faixa de score (por pilar)
// ----------------------------------------------------------

const pillarTemplates: Record<string, Record<ScoreBand, string>> = {
  governanca: {
    critico:
      'A escola não possui políticas formais de segurança digital nem responsável designado. Todas as decisões são reativas. É necessário criar uma base mínima de governança antes de avançar em outras frentes.',
    atencao:
      'Existem iniciativas de governança, mas faltam formalização e engajamento consistente da gestão. A escola precisa documentar políticas e designar responsabilidades claras.',
    adequado:
      'A governança de segurança digital está estabelecida com políticas documentadas e responsável designado. Recomenda-se revisar periodicamente e garantir que a gestão mantenha o tema como pauta recorrente.',
    avancado:
      'A escola demonstra governança madura em segurança digital, com políticas formais, responsável designado, orçamento dedicado e revisão periódica. Manter o nível atual e buscar evolução contínua.',
  },
  'protecao-dados': {
    critico:
      'A escola apresenta lacunas significativas na proteção de dados pessoais. Sem inventário de dados, consentimento adequado ou DPO indicado, o risco de não conformidade com a LGPD é elevado — especialmente considerando o tratamento de dados de menores.',
    atencao:
      'A proteção de dados está parcialmente endereçada, mas há gaps que deixam a escola vulnerável. Priorize o mapeamento de dados, a formalização de consentimentos e a regularização do compartilhamento com terceiros.',
    adequado:
      'A escola demonstra boas práticas de proteção de dados, com consentimento, DPO e processos em operação. Oportunidades de melhoria incluem política de retenção, canal de direitos e revisão de contratos com fornecedores.',
    avancado:
      'Maturidade sólida em proteção de dados. A escola tem processos formais, documentação adequada e práticas alinhadas à LGPD. Manter monitoramento e atualizar conforme evolução regulatória.',
  },
  infraestrutura: {
    critico:
      'A infraestrutura digital da escola carece de controles básicos de segurança. Redes sem segmentação, backups ausentes e logins compartilhados criam superfície de ataque significativa.',
    atencao:
      'Controles técnicos existem parcialmente. Priorize backup automatizado, segmentação de rede e autenticação individual para reduzir os riscos mais imediatos.',
    adequado:
      'A infraestrutura tem boa base de segurança. Para avançar, implemente testes de restauração de backup, fortaleça políticas de senha e mantenha processo regular de atualização de sistemas.',
    avancado:
      'Infraestrutura bem protegida com controles robustos. Continue monitorando, testando backups e atualizando sistemas para manter o nível de segurança.',
  },
  capacitacao: {
    critico:
      'A equipe não recebe formação em segurança digital. Este é um dos maiores fatores de risco — pessoas sem orientação são o principal vetor de incidentes. Inicie imediatamente um programa básico de capacitação.',
    atencao:
      'Capacitação existe mas é irregular ou limitada. Para criar cultura de segurança, é preciso tornar a formação regular, prática e que alcance toda a equipe, incluindo orientação a alunos e famílias.',
    adequado:
      'Bom programa de capacitação em operação. Oportunidades incluem simulações de phishing, integração de cidadania digital ao currículo e orientação sistemática a pais.',
    avancado:
      'Cultura digital madura com formação regular para equipe e alunos. Mantenha a atualização dos temas (IA, novos riscos) e expanda o alcance para toda a comunidade escolar.',
  },
  'protecao-criancas': {
    critico:
      'A proteção digital de crianças e adolescentes está em nível crítico. Sem protocolos para cyberbullying, sem canal de relato e sem supervisão adequada, os alunos estão expostos a riscos sérios no ambiente digital.',
    atencao:
      'Iniciativas de proteção existem, mas protocolos precisam ser formalizados e canais de relato precisam ser criados ou fortalecidos. A escola deve priorizar a documentação de procedimentos e avaliação de ferramentas.',
    adequado:
      'Boa base de proteção digital dos alunos. Para consolidar, formalize o protocolo de cyberbullying, avalie todas as plataformas usadas com alunos e garanta que o canal de relato seja conhecido e acessível.',
    avancado:
      'Proteção robusta dos alunos no ambiente digital. Continue mantendo protocolos atualizados, supervisão adequada e diálogo aberto sobre riscos digitais.',
  },
  'resposta-incidentes': {
    critico:
      'A escola não possui capacidade de resposta a incidentes digitais. Em caso de vazamento de dados, ataque ou crise digital, a reação será improvisada — o que pode agravar danos e gerar responsabilidade legal.',
    atencao:
      'Há alguma preparação, mas sem planos documentados e testados. Priorize a criação de um plano básico de resposta a incidentes com fluxo de notificação claro.',
    adequado:
      'A escola possui plano de resposta a incidentes em bom nível. Para evoluir, realize simulações periódicas e documente procedimentos de notificação conforme a LGPD.',
    avancado:
      'Boa capacidade de resposta e continuidade. Mantenha simulações regulares e atualize os planos conforme mudanças na infraestrutura e legislação.',
  },
};

// ----------------------------------------------------------
// Roadmap de 90 dias baseado no score geral
// ----------------------------------------------------------

function generateRoadmap(result: AssessmentResult): RoadmapPhase[] {
  const lowPillars = result.pillarScores
    .filter((ps) => ps.band === 'critico' || ps.band === 'atencao')
    .sort((a, b) => a.score - b.score);

  const medPillars = result.pillarScores
    .filter((ps) => ps.band === 'adequado')
    .sort((a, b) => a.score - b.score);

  const phase1Actions: string[] = [];
  const phase2Actions: string[] = [];
  const phase3Actions: string[] = [];

  // Fase 1 (dias 1-30): Quick wins e ações urgentes
  if (result.topPriorities.length > 0) {
    result.topPriorities.forEach((p) => phase1Actions.push(p.action));
  }
  phase1Actions.push('Realizar reunião de alinhamento com a equipe de gestão sobre segurança digital.');
  if (lowPillars.some((p) => p.pillarId === 'governanca')) {
    phase1Actions.push('Designar responsável formal pela segurança digital e proteção de dados.');
  }
  if (lowPillars.some((p) => p.pillarId === 'protecao-dados')) {
    phase1Actions.push('Iniciar inventário de dados pessoais coletados e compartilhados pela escola.');
  }
  if (lowPillars.some((p) => p.pillarId === 'infraestrutura')) {
    phase1Actions.push('Verificar e implementar backup automatizado dos sistemas críticos.');
  }

  // Fase 2 (dias 31-60): Estruturação
  if (lowPillars.some((p) => p.pillarId === 'governanca')) {
    phase2Actions.push('Elaborar política de segurança digital e código de conduta digital.');
  }
  if (lowPillars.some((p) => p.pillarId === 'protecao-dados')) {
    phase2Actions.push('Implementar termos de consentimento específicos e aviso de privacidade.');
  }
  if (lowPillars.some((p) => p.pillarId === 'protecao-criancas')) {
    phase2Actions.push('Criar protocolo de prevenção e resposta ao cyberbullying.');
    phase2Actions.push('Estabelecer canal seguro para relatos de alunos.');
  }
  phase2Actions.push('Iniciar programa de capacitação em segurança digital para a equipe.');
  if (lowPillars.some((p) => p.pillarId === 'infraestrutura')) {
    phase2Actions.push('Implementar segmentação de rede e autenticação individual nos sistemas.');
  }

  // Fase 3 (dias 61-90): Consolidação
  phase3Actions.push('Revisar e finalizar todas as políticas criadas na fase anterior.');
  if (lowPillars.some((p) => p.pillarId === 'resposta-incidentes')) {
    phase3Actions.push('Criar plano de resposta a incidentes com fluxo de notificação.');
  }
  phase3Actions.push('Realizar sessão de orientação sobre segurança digital para pais e responsáveis.');
  medPillars.forEach((p) => {
    phase3Actions.push(`Revisar e aprimorar controles do pilar "${p.pillarName}".`);
  });
  phase3Actions.push('Agendar reavaliação do diagnóstico para medir evolução.');

  return [
    {
      phase: 'Fase 1 — Ações Imediatas',
      period: 'Dias 1 a 30',
      actions: [...new Set(phase1Actions)].slice(0, 6),
    },
    {
      phase: 'Fase 2 — Estruturação',
      period: 'Dias 31 a 60',
      actions: [...new Set(phase2Actions)].slice(0, 6),
    },
    {
      phase: 'Fase 3 — Consolidação',
      period: 'Dias 61 a 90',
      actions: [...new Set(phase3Actions)].slice(0, 6),
    },
  ];
}

// ----------------------------------------------------------
// Gerador de Relatório Executivo (determinístico)
// ----------------------------------------------------------

export function generateExecutiveReport(
  result: AssessmentResult
): ExecutiveReport {
  const bandLabel = getBandLabel(result.overallBand);
  const bandDesc = getBandDescription(result.overallBand);

  const executiveSummary = `A ${result.schoolInfo.schoolName} obteve score geral de ${result.overallScore} pontos (de 100), classificando-se no nível "${bandLabel}". ${bandDesc}`;

  const pillarAnalysis = result.pillarScores.map((ps) => {
    const pillar = pillars.find((p) => p.id === ps.pillarId);
    return {
      title: ps.pillarName,
      content: pillarTemplates[ps.pillarId]?.[ps.band] ?? '',
      pillarId: ps.pillarId,
    };
  });

  return {
    schoolName: result.schoolInfo.schoolName,
    generatedAt: new Date().toISOString(),
    overallScore: result.overallScore,
    overallBand: result.overallBand,
    executiveSummary,
    pillarAnalysis,
    topRisks: result.topRisks,
    prioritizedRecommendations: result.topPriorities,
    roadmap90Days: generateRoadmap(result),
  };
}

// ----------------------------------------------------------
// Prompts para futura integração com IA
// (documentados aqui para uso quando a camada IA for ativada)
// ----------------------------------------------------------

export const aiPrompts = {
  executiveSummary: `Você é um consultor sênior em segurança digital escolar. Com base no resultado do diagnóstico abaixo, gere um parecer executivo de 3-4 parágrafos para ser apresentado à direção da escola.

REGRAS:
- Seja objetivo e profissional
- NÃO invente dados que não estejam no resultado
- NÃO cite leis ou artigos específicos sem indicar que é referência informativa
- Foque em riscos reais e ações concretas
- Tom: sério, construtivo, sem alarmismo

DADOS DO DIAGNÓSTICO:
{{resultJson}}`,

  pillarAnalysis: `Com base no score do pilar "{{pillarName}}" ({{score}}/100 - nível {{band}}), gere uma análise de 2 parágrafos com:
1. Diagnóstico da situação atual
2. Recomendações específicas e priorizadas

REGRAS:
- Base apenas nos dados fornecidos
- Tom profissional e construtivo
- Ações implementáveis na realidade escolar brasileira

RESPOSTAS DO PILAR:
{{pillarAnswers}}`,

  roadmap90Days: `Com base no resultado do diagnóstico abaixo, gere um roadmap de 90 dias estruturado em 3 fases (30-60-90 dias).

REGRAS:
- Cada fase deve ter 4-6 ações concretas
- Priorize ações de maior impacto e menor complexidade primeiro
- Considere a realidade de escolas brasileiras (recursos limitados, equipe reduzida)
- NÃO sugira ferramentas ou fornecedores específicos

DADOS:
{{resultJson}}`,

  upsellMessage: `Com base no resultado do diagnóstico (score {{score}}, nível {{band}}), gere uma mensagem de 2-3 frases motivando a aquisição do relatório executivo completo.

REGRAS:
- Destaque o que o relatório completo entrega a mais
- Sem pressão excessiva
- Tom profissional

RESULTADO RESUMIDO:
{{briefResult}}`,
};

// ----------------------------------------------------------
// Campos que alimentam a IA
// ----------------------------------------------------------

export const aiInputFields = {
  required: [
    'schoolInfo.schoolName',
    'schoolInfo.studentCount',
    'schoolInfo.schoolType',
    'overallScore',
    'overallBand',
    'pillarScores',
    'topRisks',
    'topPriorities',
  ],
  optional: [
    'schoolInfo.city',
    'schoolInfo.state',
    'schoolInfo.educationLevels',
    'schoolInfo.role',
  ],
};

// ----------------------------------------------------------
// Critérios para evitar alucinação da IA
// ----------------------------------------------------------

export const aiGuardrails = [
  'Nunca citar artigos de lei específicos sem indicar "referência informativa"',
  'Nunca inventar dados estatísticos sobre incidentes em escolas',
  'Nunca mencionar fornecedores ou ferramentas específicas',
  'Nunca afirmar que a escola "está em conformidade" ou "não está em conformidade" — usar "demonstra práticas alinhadas" ou "apresenta oportunidades de melhoria"',
  'Nunca usar tom alarmista ou de medo',
  'Sempre basear recomendações nos dados do diagnóstico',
  'Limitar parecer ao escopo dos 6 pilares avaliados',
  'Indicar claramente o que é obrigação legal vs. boa prática vs. recomendação',
];
