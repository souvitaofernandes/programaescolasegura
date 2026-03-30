import { Question } from './types';

// ============================================================
// Escola Segura — Questionário Completo do Assessment
// 36 perguntas | 6 pilares | Pesos 1-3 | Opções pontuadas 0-3
// ============================================================

// Opções reutilizáveis
const SIM_NAO_PARCIAL = [
  { label: 'Sim, de forma completa e documentada', value: 3 },
  { label: 'Sim, parcialmente ou de forma informal', value: 2 },
  { label: 'Estamos começando a implementar', value: 1 },
  { label: 'Não', value: 0 },
];

const FREQUENCIA = [
  { label: 'Regularmente (pelo menos semestral)', value: 3 },
  { label: 'Anualmente', value: 2 },
  { label: 'Já fizemos, mas sem periodicidade definida', value: 1 },
  { label: 'Nunca realizamos', value: 0 },
];

const MATURIDADE_4 = [
  { label: 'Processo maduro e revisado periodicamente', value: 3 },
  { label: 'Processo definido, mas sem revisão periódica', value: 2 },
  { label: 'Processo informal ou em construção', value: 1 },
  { label: 'Não existe processo', value: 0 },
];

export const questions: Question[] = [
  // ============================================================
  // PILAR 1: GOVERNANÇA E POLÍTICAS (7 perguntas)
  // ============================================================
  {
    id: 'gov-01',
    pillar: 'governanca',
    question:
      'A escola possui uma política de segurança digital formalmente documentada e aprovada pela gestão?',
    type: 'single-choice',
    options: SIM_NAO_PARCIAL,
    weight: 3,
    criticality: 'critical',
    explanation:
      'A existência de uma política formal é a base de qualquer programa de segurança. Sem ela, todas as ações são reativas e inconsistentes.',
    contextMessage:
      'Uma política de segurança digital não precisa ser complexa, mas precisa existir, estar escrita e ser conhecida pela equipe.',
  },
  {
    id: 'gov-02',
    pillar: 'governanca',
    question:
      'Existe um responsável designado (pessoa ou comitê) pela segurança digital e proteção de dados na escola?',
    type: 'single-choice',
    options: [
      { label: 'Sim, com atribuições claras e dedicação formal', value: 3 },
      { label: 'Sim, mas acumula outras funções sem atribuição formal', value: 2 },
      { label: 'Há alguém que cuida disso informalmente', value: 1 },
      { label: 'Não há responsável definido', value: 0 },
    ],
    weight: 3,
    criticality: 'critical',
    explanation:
      'Sem um responsável claro, não há accountability. Incidentes ficam sem dono e ações preventivas não acontecem.',
    contextMessage:
      'A LGPD exige a indicação de um Encarregado de Dados (DPO). Na prática, a escola precisa de alguém que centralize as decisões sobre segurança digital.',
  },
  {
    id: 'gov-03',
    pillar: 'governanca',
    question:
      'A escola possui um código de conduta digital (ou política de uso aceitável) para alunos, professores e funcionários?',
    type: 'single-choice',
    options: SIM_NAO_PARCIAL,
    weight: 2,
    criticality: 'important',
    explanation:
      'Um código de conduta digital define expectativas de comportamento no uso de tecnologia. Sem ele, não há base para orientação ou medidas disciplinares.',
  },
  {
    id: 'gov-04',
    pillar: 'governanca',
    question:
      'Os contratos com fornecedores de tecnologia (plataformas educacionais, sistemas, nuvem) incluem cláusulas sobre proteção de dados?',
    type: 'single-choice',
    options: [
      { label: 'Sim, revisamos e negociamos cláusulas de proteção de dados', value: 3 },
      { label: 'Sim, mas usamos o contrato padrão do fornecedor sem revisão', value: 2 },
      { label: 'Não sabemos o que está nos contratos sobre esse tema', value: 1 },
      { label: 'Não temos contratos formais com fornecedores de tecnologia', value: 0 },
    ],
    weight: 2,
    criticality: 'important',
    explanation:
      'Fornecedores de tecnologia processam dados dos alunos. Sem cláusulas contratuais adequadas, a escola não tem garantia de como esses dados são tratados.',
  },
  {
    id: 'gov-05',
    pillar: 'governanca',
    question:
      'A escola realiza revisão periódica de suas políticas de segurança e privacidade?',
    type: 'single-choice',
    options: FREQUENCIA,
    weight: 1,
    criticality: 'standard',
    explanation:
      'Políticas desatualizadas perdem eficácia. O ambiente digital muda rapidamente e as políticas precisam acompanhar.',
  },
  {
    id: 'gov-06',
    pillar: 'governanca',
    question:
      'A gestão da escola participa ativamente de decisões sobre segurança digital e proteção de dados?',
    type: 'single-choice',
    options: [
      { label: 'Sim, é pauta regular em reuniões de gestão', value: 3 },
      { label: 'Sim, mas apenas quando surge um problema', value: 2 },
      { label: 'Delegam completamente para a equipe de TI', value: 1 },
      { label: 'O tema não chega à gestão', value: 0 },
    ],
    weight: 2,
    criticality: 'important',
    explanation:
      'Segurança digital é decisão estratégica, não apenas técnica. Sem envolvimento da gestão, falta prioridade e recursos.',
  },
  {
    id: 'gov-07',
    pillar: 'governanca',
    question:
      'A escola possui orçamento definido (mesmo que modesto) para iniciativas de segurança digital?',
    type: 'single-choice',
    options: [
      { label: 'Sim, com orçamento anual planejado', value: 3 },
      { label: 'Não há orçamento fixo, mas recursos são liberados quando necessário', value: 2 },
      { label: 'Recursos só são alocados em situação de crise', value: 1 },
      { label: 'Não há qualquer recurso destinado a isso', value: 0 },
    ],
    weight: 1,
    criticality: 'standard',
    explanation:
      'Sem recurso financeiro, mesmo que pequeno, a escola sinaliza que segurança digital não é prioridade real.',
  },

  // ============================================================
  // PILAR 2: PROTEÇÃO DE DADOS E PRIVACIDADE (7 perguntas)
  // ============================================================
  {
    id: 'dados-01',
    pillar: 'protecao-dados',
    question:
      'A escola possui mapeamento dos dados pessoais que coleta, armazena e compartilha (inventário de dados)?',
    type: 'single-choice',
    options: SIM_NAO_PARCIAL,
    weight: 3,
    criticality: 'critical',
    explanation:
      'Sem saber quais dados possui e onde estão, é impossível protegê-los adequadamente. O inventário de dados é o primeiro passo prático da conformidade com a LGPD.',
    contextMessage:
      'Dados de alunos menores de idade exigem atenção redobrada sob a LGPD (art. 14).',
  },
  {
    id: 'dados-02',
    pillar: 'protecao-dados',
    question:
      'A escola coleta consentimento dos pais/responsáveis para tratamento de dados pessoais dos alunos, incluindo uso de imagem?',
    type: 'single-choice',
    options: [
      { label: 'Sim, com termos específicos e atualizados', value: 3 },
      { label: 'Sim, mas de forma genérica na matrícula', value: 2 },
      { label: 'Parcialmente — apenas para uso de imagem', value: 1 },
      { label: 'Não coletamos consentimento específico', value: 0 },
    ],
    weight: 3,
    criticality: 'critical',
    explanation:
      'A LGPD exige base legal para o tratamento de dados de menores, e o consentimento dos responsáveis é uma das bases mais relevantes nesse contexto.',
  },
  {
    id: 'dados-03',
    pillar: 'protecao-dados',
    question:
      'A escola tem um Encarregado de Dados (DPO) indicado, mesmo que seja alguém interno acumulando a função?',
    type: 'single-choice',
    options: [
      { label: 'Sim, com indicação formal e publicada', value: 3 },
      { label: 'Sim, indicado internamente mas sem publicação', value: 2 },
      { label: 'Estamos em processo de definição', value: 1 },
      { label: 'Não temos DPO indicado', value: 0 },
    ],
    weight: 2,
    criticality: 'important',
    explanation:
      'A LGPD exige a indicação de um Encarregado (DPO). Mesmo em escolas pequenas, alguém precisa ser o ponto focal para questões de dados pessoais.',
  },
  {
    id: 'dados-04',
    pillar: 'protecao-dados',
    question:
      'Dados pessoais de alunos e funcionários são compartilhados com terceiros (plataformas, apps, parceiros) de forma controlada?',
    type: 'single-choice',
    options: [
      { label: 'Sim, apenas com base legal e contratos adequados', value: 3 },
      { label: 'Compartilhamos, mas sem controle formal', value: 2 },
      { label: 'Não sabemos exatamente com quem compartilhamos', value: 1 },
      { label: 'Não há controle sobre compartilhamento', value: 0 },
    ],
    weight: 3,
    criticality: 'critical',
    explanation:
      'O compartilhamento descontrolado de dados é uma das maiores fontes de risco. Plataformas educacionais, apps e parceiros podem tratar dados de forma inadequada.',
  },
  {
    id: 'dados-05',
    pillar: 'protecao-dados',
    question:
      'A escola tem política de retenção e descarte de dados pessoais (por quanto tempo guarda e quando deleta)?',
    type: 'single-choice',
    options: MATURIDADE_4,
    weight: 2,
    criticality: 'important',
    explanation:
      'Guardar dados além do necessário aumenta o risco. A LGPD exige que dados sejam mantidos apenas enquanto cumprirem sua finalidade.',
  },
  {
    id: 'dados-06',
    pillar: 'protecao-dados',
    question:
      'A escola possui aviso de privacidade (informando como trata os dados pessoais) acessível para pais, alunos e funcionários?',
    type: 'single-choice',
    options: SIM_NAO_PARCIAL,
    weight: 2,
    criticality: 'important',
    explanation:
      'Transparência é princípio fundamental da LGPD. Um aviso de privacidade claro e acessível é boa prática e demonstra maturidade.',
  },
  {
    id: 'dados-07',
    pillar: 'protecao-dados',
    question:
      'Existe um canal para que pais, alunos ou funcionários exerçam seus direitos sobre dados pessoais (acesso, correção, exclusão)?',
    type: 'single-choice',
    options: [
      { label: 'Sim, com canal definido e processo documentado', value: 3 },
      { label: 'Sim, mas sem processo formal (resolvemos caso a caso)', value: 2 },
      { label: 'Não temos canal específico, mas atendemos se solicitado', value: 1 },
      { label: 'Não temos canal nem processo para isso', value: 0 },
    ],
    weight: 1,
    criticality: 'standard',
    explanation:
      'A LGPD garante direitos aos titulares de dados. A escola precisa ter um caminho claro para atender a essas solicitações.',
  },

  // ============================================================
  // PILAR 3: SEGURANÇA DA INFRAESTRUTURA DIGITAL (6 perguntas)
  // ============================================================
  {
    id: 'infra-01',
    pillar: 'infraestrutura',
    question:
      'A rede Wi-Fi da escola possui segmentação (separando a rede administrativa da rede de alunos e visitantes)?',
    type: 'single-choice',
    options: [
      { label: 'Sim, com redes segmentadas e políticas de acesso distintas', value: 3 },
      { label: 'Sim, redes separadas mas sem políticas diferenciadas', value: 2 },
      { label: 'Rede única com senha compartilhada', value: 1 },
      { label: 'Rede aberta ou sem controle', value: 0 },
    ],
    weight: 2,
    criticality: 'important',
    explanation:
      'Uma rede sem segmentação permite que qualquer dispositivo acesse sistemas administrativos e dados sensíveis.',
  },
  {
    id: 'infra-02',
    pillar: 'infraestrutura',
    question:
      'Os sistemas e plataformas usados pela escola exigem autenticação individual (cada pessoa com seu login e senha)?',
    type: 'single-choice',
    options: [
      { label: 'Sim, com autenticação individual e senhas fortes obrigatórias', value: 3 },
      { label: 'Sim, autenticação individual mas sem exigência de senha forte', value: 2 },
      { label: 'Alguns sistemas usam logins compartilhados', value: 1 },
      { label: 'Logins compartilhados são a prática comum', value: 0 },
    ],
    weight: 2,
    criticality: 'important',
    explanation:
      'Logins compartilhados impossibilitam rastreamento de ações e aumentam o risco de acesso indevido.',
  },
  {
    id: 'infra-03',
    pillar: 'infraestrutura',
    question:
      'A escola realiza backup regular dos dados críticos (sistemas acadêmicos, financeiros, documentos)?',
    type: 'single-choice',
    options: [
      { label: 'Sim, backup automático com teste de restauração periódico', value: 3 },
      { label: 'Sim, backup automático mas sem teste de restauração', value: 2 },
      { label: 'Backup manual e esporádico', value: 1 },
      { label: 'Não realizamos backup', value: 0 },
    ],
    weight: 3,
    criticality: 'critical',
    explanation:
      'Sem backup, um ataque ransomware, falha de hardware ou erro humano pode significar perda irreversível de dados.',
  },
  {
    id: 'infra-04',
    pillar: 'infraestrutura',
    question:
      'Os dispositivos usados por funcionários (computadores, tablets) possuem antivírus/antimalware atualizado?',
    type: 'single-choice',
    options: SIM_NAO_PARCIAL,
    weight: 1,
    criticality: 'standard',
    explanation:
      'Dispositivos sem proteção são vetores de entrada para malware que pode comprometer toda a rede da escola.',
  },
  {
    id: 'infra-05',
    pillar: 'infraestrutura',
    question:
      'O acesso a sistemas administrativos e dados sensíveis é controlado por níveis de permissão (nem todos acessam tudo)?',
    type: 'single-choice',
    options: MATURIDADE_4,
    weight: 2,
    criticality: 'important',
    explanation:
      'O princípio de menor privilégio é fundamental. Nem todo funcionário precisa acessar dados financeiros ou prontuários de alunos.',
  },
  {
    id: 'infra-06',
    pillar: 'infraestrutura',
    question:
      'Sistemas e softwares usados pela escola são atualizados regularmente (patches de segurança)?',
    type: 'single-choice',
    options: [
      { label: 'Sim, com processo regular de atualização', value: 3 },
      { label: 'Atualizamos quando lembramos ou quando há problema', value: 2 },
      { label: 'Raramente atualizamos', value: 1 },
      { label: 'Não temos controle sobre atualizações', value: 0 },
    ],
    weight: 1,
    criticality: 'standard',
    explanation:
      'Softwares desatualizados contêm vulnerabilidades conhecidas que podem ser exploradas.',
  },

  // ============================================================
  // PILAR 4: CAPACITAÇÃO E CULTURA DIGITAL (5 perguntas)
  // ============================================================
  {
    id: 'cap-01',
    pillar: 'capacitacao',
    question:
      'Professores e funcionários recebem formação sobre segurança digital e proteção de dados?',
    type: 'single-choice',
    options: FREQUENCIA,
    weight: 3,
    criticality: 'critical',
    explanation:
      'Pessoas são o principal vetor de incidentes. Sem formação, toda a equipe é uma vulnerabilidade.',
    contextMessage:
      'Não precisa ser uma formação complexa. O importante é que seja regular e prática.',
  },
  {
    id: 'cap-02',
    pillar: 'capacitacao',
    question:
      'Alunos recebem orientação sobre cidadania digital, privacidade e segurança online como parte do currículo ou da rotina escolar?',
    type: 'single-choice',
    options: [
      { label: 'Sim, de forma integrada ao currículo com abordagem estruturada', value: 3 },
      { label: 'Sim, em ações pontuais (palestras, semanas temáticas)', value: 2 },
      { label: 'Apenas quando surge um problema', value: 1 },
      { label: 'Não abordamos esse tema com os alunos', value: 0 },
    ],
    weight: 2,
    criticality: 'important',
    explanation:
      'Educar alunos sobre uso seguro e ético da tecnologia é parte da missão formadora da escola.',
  },
  {
    id: 'cap-03',
    pillar: 'capacitacao',
    question:
      'A equipe sabe identificar tentativas de phishing (e-mails, mensagens ou links fraudulentos)?',
    type: 'single-choice',
    options: [
      { label: 'Sim, recebem orientação específica e simulações', value: 3 },
      { label: 'Sim, recebem orientação mas sem simulações práticas', value: 2 },
      { label: 'Apenas alguns sabem, sem orientação formal', value: 1 },
      { label: 'Não há orientação sobre o tema', value: 0 },
    ],
    weight: 2,
    criticality: 'important',
    explanation:
      'Phishing é o ataque mais comum contra escolas. Uma única pessoa enganada pode comprometer sistemas inteiros.',
  },
  {
    id: 'cap-04',
    pillar: 'capacitacao',
    question:
      'Pais e responsáveis recebem orientação da escola sobre segurança digital dos filhos?',
    type: 'single-choice',
    options: [
      { label: 'Sim, com materiais e encontros regulares', value: 3 },
      { label: 'Sim, eventualmente (reuniões de pais, comunicados)', value: 2 },
      { label: 'Apenas quando há um incidente', value: 1 },
      { label: 'Não oferecemos orientação sobre isso', value: 0 },
    ],
    weight: 1,
    criticality: 'standard',
    explanation:
      'A proteção digital de crianças e adolescentes exige parceria entre escola e família.',
  },
  {
    id: 'cap-05',
    pillar: 'capacitacao',
    question:
      'A escola promove discussões sobre ética digital, direitos autorais, e uso responsável de IA com alunos e equipe?',
    type: 'single-choice',
    options: [
      { label: 'Sim, de forma regular e integrada às atividades', value: 3 },
      { label: 'Sim, em iniciativas pontuais', value: 2 },
      { label: 'O tema surge esporadicamente, sem estrutura', value: 1 },
      { label: 'Não abordamos esses temas', value: 0 },
    ],
    weight: 1,
    criticality: 'standard',
    explanation:
      'Com a popularização de IA generativa, a escola precisa orientar sobre uso ético e responsável de tecnologias emergentes.',
  },

  // ============================================================
  // PILAR 5: PROTEÇÃO DIGITAL DE CRIANÇAS E ADOLESCENTES (7 perguntas)
  // ============================================================
  {
    id: 'prot-01',
    pillar: 'protecao-criancas',
    question:
      'A escola possui protocolo documentado para prevenção e resposta ao cyberbullying?',
    type: 'single-choice',
    options: SIM_NAO_PARCIAL,
    weight: 3,
    criticality: 'critical',
    explanation:
      'Cyberbullying é uma das situações mais frequentes e danosas no ambiente escolar digital. Sem protocolo, as respostas são inconsistentes e tardias.',
    contextMessage:
      'A Lei 13.185/2015 (Lei do Bullying) obriga escolas a terem medidas de prevenção e combate ao bullying, incluindo o cyberbullying.',
  },
  {
    id: 'prot-02',
    pillar: 'protecao-criancas',
    question:
      'A escola utiliza filtros de conteúdo na rede para bloquear acesso a material inadequado para menores?',
    type: 'single-choice',
    options: [
      { label: 'Sim, com filtros configurados e monitorados regularmente', value: 3 },
      { label: 'Sim, filtros básicos instalados', value: 2 },
      { label: 'Apenas em alguns dispositivos ou redes', value: 1 },
      { label: 'Não utilizamos filtros de conteúdo', value: 0 },
    ],
    weight: 2,
    criticality: 'important',
    explanation:
      'Filtros de conteúdo são uma camada de proteção importante, especialmente para alunos mais jovens que acessam a internet na escola.',
  },
  {
    id: 'prot-03',
    pillar: 'protecao-criancas',
    question:
      'Há um canal seguro e acessível para que alunos reportem situações de risco online (assédio, exposição a conteúdo, aliciamento)?',
    type: 'single-choice',
    options: [
      { label: 'Sim, canal dedicado e conhecido pelos alunos', value: 3 },
      { label: 'Sim, mas é o mesmo canal genérico de reclamações', value: 2 },
      { label: 'Os alunos podem falar com um professor, mas não há canal formal', value: 1 },
      { label: 'Não há canal para esse tipo de relato', value: 0 },
    ],
    weight: 3,
    criticality: 'critical',
    explanation:
      'Se o aluno não tem a quem recorrer de forma segura, situações graves podem se agravar silenciosamente.',
  },
  {
    id: 'prot-04',
    pillar: 'protecao-criancas',
    question:
      'A escola monitora ou supervisiona o uso de dispositivos e plataformas digitais pelos alunos durante o horário escolar?',
    type: 'single-choice',
    options: [
      { label: 'Sim, com política clara e supervisão ativa', value: 3 },
      { label: 'Sim, mas depende de cada professor', value: 2 },
      { label: 'Supervisão mínima, sem padrão', value: 1 },
      { label: 'Não há supervisão do uso de dispositivos', value: 0 },
    ],
    weight: 2,
    criticality: 'important',
    explanation:
      'Supervisão proporcional e transparente protege os alunos sem invadir sua privacidade.',
  },
  {
    id: 'prot-05',
    pillar: 'protecao-criancas',
    question:
      'As plataformas e aplicativos usados com alunos foram avaliados quanto à adequação para menores (termos de uso, idade mínima, coleta de dados)?',
    type: 'single-choice',
    options: [
      { label: 'Sim, avaliamos antes de adotar qualquer ferramenta', value: 3 },
      { label: 'Avaliamos algumas, mas não todas', value: 2 },
      { label: 'Não avaliamos formalmente, mas evitamos ferramentas problemáticas', value: 1 },
      { label: 'Não fazemos esse tipo de avaliação', value: 0 },
    ],
    weight: 2,
    criticality: 'important',
    explanation:
      'Muitas plataformas populares não são adequadas para menores. Usar uma ferramenta sem avaliar pode expor alunos a riscos desnecessários.',
  },
  {
    id: 'prot-06',
    pillar: 'protecao-criancas',
    question:
      'A escola tem regras claras sobre publicação de fotos e vídeos de alunos em redes sociais e materiais de divulgação?',
    type: 'single-choice',
    options: SIM_NAO_PARCIAL,
    weight: 2,
    criticality: 'important',
    explanation:
      'A exposição não autorizada da imagem de menores é um risco jurídico e de segurança. Regras claras protegem a escola e os alunos.',
  },
  {
    id: 'prot-07',
    pillar: 'protecao-criancas',
    question:
      'A escola orienta professores sobre limites na comunicação digital com alunos (mensagens privadas, redes sociais pessoais)?',
    type: 'single-choice',
    options: [
      { label: 'Sim, com orientações claras e canais institucionais definidos', value: 3 },
      { label: 'Sim, mas de forma informal', value: 2 },
      { label: 'Cada professor define seus próprios limites', value: 1 },
      { label: 'Não há orientação sobre isso', value: 0 },
    ],
    weight: 2,
    criticality: 'important',
    explanation:
      'Comunicação sem limites claros entre professores e alunos em canais privados é um risco sério que precisa ser gerenciado.',
  },

  // ============================================================
  // PILAR 6: RESPOSTA A INCIDENTES E CONTINUIDADE (4 perguntas)
  // ============================================================
  {
    id: 'inc-01',
    pillar: 'resposta-incidentes',
    question:
      'A escola possui um plano de resposta a incidentes de segurança digital (vazamento de dados, invasão de sistemas, etc.)?',
    type: 'single-choice',
    options: SIM_NAO_PARCIAL,
    weight: 3,
    criticality: 'critical',
    explanation:
      'Sem um plano, a resposta a incidentes é caótica, lenta e pode agravar o dano. A LGPD exige notificação de incidentes à ANPD em casos de risco relevante.',
    contextMessage:
      'Não precisa ser um plano complexo. O essencial é saber: quem faz o quê, em que ordem, e quem precisa ser notificado.',
  },
  {
    id: 'inc-02',
    pillar: 'resposta-incidentes',
    question:
      'A escola já realizou algum exercício ou simulação de resposta a incidentes digitais?',
    type: 'single-choice',
    options: [
      { label: 'Sim, realizamos simulações periodicamente', value: 3 },
      { label: 'Sim, realizamos ao menos uma vez', value: 2 },
      { label: 'Não, mas temos plano de fazer', value: 1 },
      { label: 'Nunca realizamos e não temos plano para isso', value: 0 },
    ],
    weight: 1,
    criticality: 'standard',
    explanation:
      'Um plano que nunca foi testado é apenas teoria. Simulações revelam falhas antes que incidentes reais aconteçam.',
  },
  {
    id: 'inc-03',
    pillar: 'resposta-incidentes',
    question:
      'A escola sabe o que fazer e quem notificar em caso de vazamento de dados pessoais?',
    type: 'single-choice',
    options: [
      { label: 'Sim, temos procedimento documentado com fluxo de notificação', value: 3 },
      { label: 'Sabemos que precisamos notificar, mas não temos procedimento formal', value: 2 },
      { label: 'Não temos certeza do que fazer', value: 1 },
      { label: 'Nunca pensamos sobre isso', value: 0 },
    ],
    weight: 2,
    criticality: 'important',
    explanation:
      'A LGPD exige comunicação de incidentes de segurança à ANPD e aos titulares quando houver risco relevante. A escola precisa saber agir rápido.',
  },
  {
    id: 'inc-04',
    pillar: 'resposta-incidentes',
    question:
      'Em caso de indisponibilidade dos sistemas principais (ex: sistema acadêmico fora do ar), a escola tem alternativas para manter a operação?',
    type: 'single-choice',
    options: [
      { label: 'Sim, com procedimentos de contingência documentados', value: 3 },
      { label: 'Temos alternativas informais que a equipe conhece', value: 2 },
      { label: 'Improvisamos quando acontece', value: 1 },
      { label: 'Ficaríamos sem operação até o sistema voltar', value: 0 },
    ],
    weight: 1,
    criticality: 'standard',
    explanation:
      'Dependência total de sistemas digitais sem plano B é um risco operacional real.',
  },
];

// ============================================================
// Helpers para acessar dados do questionário
// ============================================================

export function getQuestionsByPillar(pillarId: string): Question[] {
  return questions.filter((q) => q.pillar === pillarId);
}

export function getTotalQuestions(): number {
  return questions.length;
}

export function getCriticalQuestions(): Question[] {
  return questions.filter((q) => q.criticality === 'critical');
}
