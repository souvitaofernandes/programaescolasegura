// ============================================================
// Escola Segura — Copy Completa do Produto
// Toda a comunicação textual centralizada
// ============================================================

export const copy = {
  // ----------------------------------------------------------
  // META & SEO
  // ----------------------------------------------------------
  meta: {
    title: 'Escola Segura — Diagnóstico de Prontidão Digital',
    description:
      'Descubra em 15 minutos o nível real de proteção digital da sua escola. Assessment gratuito com score imediato, mapa de riscos e prioridades de ação.',
    ogTitle: 'Sua escola está preparada para os riscos digitais?',
    ogDescription:
      'Diagnóstico gratuito de segurança digital para escolas. Score imediato baseado em 6 pilares e 36 critérios.',
  },

  // ----------------------------------------------------------
  // LANDING PAGE
  // ----------------------------------------------------------
  landing: {
    headline: 'Sua escola sabe onde está exposta no ambiente digital?',
    subheadline:
      'Faça o diagnóstico gratuito e descubra em 15 minutos o nível de prontidão digital da sua instituição — com score imediato, mapa de riscos e prioridades de ação.',
    ctaPrimary: 'Iniciar Diagnóstico Gratuito',
    ctaSecondary: 'Entender a Metodologia',

    // Seção: Problema
    problemTitle: 'O cenário exige atenção',
    problemItems: [
      {
        title: 'Dados de menores em múltiplas plataformas',
        description:
          'Sistemas acadêmicos, plataformas de ensino, apps de comunicação — dados pessoais de alunos circulam em dezenas de ferramentas, muitas vezes sem controle adequado.',
      },
      {
        title: 'Incidentes cada vez mais frequentes',
        description:
          'Cyberbullying, vazamento de dados, phishing e uso inadequado de tecnologia são realidades que escolas enfrentam com frequência crescente.',
      },
      {
        title: 'LGPD e proteção de menores',
        description:
          'A Lei Geral de Proteção de Dados exige que escolas tratem dados pessoais com responsabilidade. Dados de crianças e adolescentes recebem proteção especial.',
      },
      {
        title: 'Falta de visibilidade',
        description:
          'A maioria das escolas não sabe onde está bem, onde está exposta, ou por onde começar a melhorar sua postura de segurança digital.',
      },
    ],

    // Seção: Solução
    solutionTitle: 'Um diagnóstico claro, objetivo e acionável',
    solutionDescription:
      'O Escola Segura avalia a maturidade da sua instituição em 6 pilares essenciais de segurança digital, gerando um score transparente e recomendações práticas.',

    // Seção: Como Funciona
    howItWorksTitle: 'Como funciona',
    howItWorksSteps: [
      {
        step: '1',
        title: 'Identifique sua escola',
        description: 'Preencha dados básicos da instituição para personalizar o diagnóstico.',
      },
      {
        step: '2',
        title: 'Responda o assessment',
        description: '36 perguntas objetivas sobre práticas, políticas e controles da sua escola. Tempo estimado: 12-15 minutos.',
      },
      {
        step: '3',
        title: 'Receba seu score',
        description: 'Score geral e por pilar, semáforo de maturidade, 3 principais riscos e 3 prioridades imediatas.',
      },
      {
        step: '4',
        title: 'Aja com clareza',
        description: 'Use o resultado para tomar decisões informadas ou obtenha o relatório executivo completo com roadmap de ação.',
      },
    ],

    // Seção: Pilares
    pillarsTitle: 'Os 6 pilares do diagnóstico',
    pillarsSubtitle:
      'Cada pilar avalia uma dimensão essencial da segurança digital escolar, com perguntas calibradas e pesos definidos por relevância e risco.',

    // Seção: Para Quem
    audienceTitle: 'Para quem é este diagnóstico',
    audienceItems: [
      'Diretores e coordenadores de escolas privadas',
      'Mantenedores e gestores administrativos',
      'Responsáveis por tecnologia e TI escolar',
      'Profissionais de compliance e proteção de dados na educação',
    ],

    // Seção: Credibilidade
    credibilityTitle: 'Metodologia confiável',
    credibilityItems: [
      {
        title: 'Score determinístico',
        description: 'Mesmas respostas geram o mesmo resultado, sempre. Sem subjetividade, sem IA no cálculo.',
      },
      {
        title: '6 pilares estruturados',
        description: 'Framework baseado em boas práticas de segurança da informação, proteção de dados e proteção de menores.',
      },
      {
        title: '36 critérios objetivos',
        description: 'Perguntas calibradas com pesos e criticidade definidos para refletir o impacto real no risco da escola.',
      },
      {
        title: 'Transparência total',
        description: 'Você entende como cada resposta impacta seu score. Sem caixa preta.',
      },
    ],

    // Seção: CTA final
    finalCtaTitle: 'Pronto para descobrir onde sua escola está?',
    finalCtaDescription:
      'O diagnóstico é gratuito, leva menos de 15 minutos e entrega um resultado imediato. Sem compromisso.',
    finalCtaButton: 'Iniciar Diagnóstico Gratuito',

    // Footer
    footerText: 'Escola Segura — Diagnóstico de Prontidão Digital',
    footerDisclaimer:
      'Este diagnóstico é uma ferramenta de orientação e não substitui consultoria jurídica ou técnica especializada. As referências a legislação (LGPD, ECA, etc.) são informativas e não constituem parecer legal.',
  },

  // ----------------------------------------------------------
  // FORMULÁRIO DE IDENTIFICAÇÃO
  // ----------------------------------------------------------
  schoolForm: {
    title: 'Dados da Escola',
    subtitle:
      'Essas informações permitem personalizar o resultado do diagnóstico para o contexto da sua escola.',
    fields: {
      schoolName: { label: 'Nome da escola', placeholder: 'Ex: Colégio Nova Era' },
      city: { label: 'Cidade', placeholder: 'Ex: São Paulo' },
      state: { label: 'Estado', placeholder: 'Selecione' },
      studentCount: {
        label: 'Número de alunos (aproximado)',
        placeholder: 'Selecione a faixa',
      },
      schoolType: { label: 'Tipo de escola', placeholder: 'Selecione' },
      educationLevels: {
        label: 'Níveis de ensino atendidos',
        placeholder: 'Selecione todos que se aplicam',
      },
      contactName: { label: 'Seu nome', placeholder: 'Nome completo' },
      role: { label: 'Seu cargo / função', placeholder: 'Ex: Diretor(a), Coordenador(a)' },
      contactEmail: { label: 'E-mail profissional', placeholder: 'seu@email.com.br' },
      contactPhone: { label: 'Telefone (opcional)', placeholder: '(11) 99999-9999' },
    },
    privacyNote:
      'Seus dados serão utilizados exclusivamente para personalizar o resultado do diagnóstico e, caso autorizado, para contato sobre o relatório executivo. Não compartilhamos seus dados com terceiros.',
    ctaPrimary: 'Começar Assessment',
  },

  // ----------------------------------------------------------
  // ASSESSMENT
  // ----------------------------------------------------------
  assessment: {
    title: 'Assessment de Prontidão Digital',
    progressLabel: 'Pergunta {current} de {total}',
    pillarLabel: 'Pilar: {pillarName}',
    helpToggle: 'Por que esta pergunta?',
    ctaNext: 'Próxima',
    ctaPrev: 'Anterior',
    ctaFinish: 'Finalizar e Ver Resultado',
    exitConfirm: 'Tem certeza que deseja sair? Seu progresso será perdido.',
    encourageMessages: [
      { at: 25, message: '25% concluído — ótimo começo!' },
      { at: 50, message: 'Metade do caminho! Você está indo muito bem.' },
      { at: 75, message: '75% concluído — falta pouco para seu resultado.' },
      { at: 90, message: 'Quase lá! Mais algumas perguntas.' },
    ],
  },

  // ----------------------------------------------------------
  // RESULTADO
  // ----------------------------------------------------------
  result: {
    title: 'Resultado do Diagnóstico',
    subtitle: 'Score de Prontidão Digital da {schoolName}',
    overallScoreLabel: 'Score Geral',
    pillarScoresTitle: 'Score por Pilar',
    topRisksTitle: 'Principais Áreas de Atenção',
    topPrioritiesTitle: 'Prioridades Imediatas',
    methodNote:
      'Este score foi calculado de forma determinística com base em 36 critérios distribuídos em 6 pilares, ponderados por relevância e criticidade. Mesmas respostas sempre geram o mesmo resultado.',

    // Mensagens por faixa
    bandMessages: {
      critico: {
        title: 'Nível Crítico',
        summary:
          'Sua escola apresenta exposição significativa em segurança digital. Existem lacunas que demandam atenção imediata.',
        recommendation:
          'Recomendamos fortemente o relatório executivo com roadmap de ação para priorizar as medidas mais urgentes.',
      },
      atencao: {
        title: 'Nível de Atenção',
        summary:
          'Sua escola possui iniciativas, mas há lacunas importantes. O nível atual de maturidade deixa a instituição vulnerável.',
        recommendation:
          'O relatório executivo detalha cada lacuna e entrega um plano priorizado de 90 dias para avançar de forma estruturada.',
      },
      adequado: {
        title: 'Nível Adequado',
        summary:
          'Sua escola demonstra boa base de maturidade. Existem oportunidades claras de melhoria para consolidar a posição.',
        recommendation:
          'O relatório executivo identifica os pontos de evolução e entrega um roadmap para alcançar o nível avançado.',
      },
      avancado: {
        title: 'Nível Avançado',
        summary:
          'Sua escola demonstra maturidade sólida em segurança digital. Parabéns pelo trabalho realizado.',
        recommendation:
          'O relatório executivo consolida sua posição e identifica oportunidades de evolução contínua e diferenciação.',
      },
    },

    // CTA para upsell
    reportCtaTitle: 'Quer o diagnóstico completo?',
    reportCtaDescription:
      'O resultado gratuito mostra o panorama geral. O Relatório Executivo detalha cada pilar, identifica vulnerabilidades específicas e entrega um plano de ação priorizado.',
    reportCtaButton: 'Obter Relatório Executivo',
    reportCtaPrice: 'R$ 297',

    // CTA alternativa
    meetingCtaTitle: 'Prefere conversar com um especialista?',
    meetingCtaDescription:
      'Agende uma reunião estratégica de 30 minutos para discutir o resultado e entender os próximos passos mais adequados para sua escola.',
    meetingCtaButton: 'Agendar Reunião',

    // Bloqueio parcial
    partialNote:
      'O resultado gratuito mostra o score geral, semáforo por pilar e as 3 principais prioridades. O relatório executivo inclui análise detalhada, recomendações por pilar e roadmap de 90 dias.',
  },

  // ----------------------------------------------------------
  // UPSELL
  // ----------------------------------------------------------
  upsell: {
    headline: 'Transforme seu diagnóstico em um plano de ação',
    subheadline:
      'Você já sabe onde está. Agora descubra exatamente o que fazer, em que ordem e por quê.',

    // O que está incluso
    includesTitle: 'O que você recebe no Relatório Executivo',
    includesItems: [
      {
        title: 'Análise detalhada por pilar',
        description: 'Cada um dos 6 pilares analisado com profundidade, apontando pontos fortes e vulnerabilidades específicas.',
      },
      {
        title: 'Mapa de riscos priorizado',
        description: 'Riscos classificados por severidade e impacto, para que você saiba onde concentrar esforços primeiro.',
      },
      {
        title: 'Roadmap de 90 dias',
        description: 'Plano de ação estruturado em 3 fases (30-60-90 dias) com ações concretas e priorizadas.',
      },
      {
        title: 'Recomendações acionáveis',
        description: 'Para cada área de melhoria, uma recomendação prática e implementável, adequada à realidade escolar.',
      },
      {
        title: 'Parecer executivo',
        description: 'Síntese profissional do estado atual da escola, adequada para apresentar à mantenedora ou conselho.',
      },
      {
        title: 'Checklist de conformidade',
        description: 'Lista de verificação com os principais pontos de atenção para conformidade com a LGPD no contexto escolar.',
      },
    ],

    // Ancoragem
    anchorText:
      'Uma consultoria presencial para diagnosticar esses mesmos pontos custaria entre R$ 5.000 e R$ 15.000.',

    // Preço
    price: 'R$ 297',
    priceNote: 'Pagamento único. Acesso imediato ao relatório completo.',

    // CTA
    ctaPrimary: 'Obter Relatório Executivo — R$ 297',
    ctaSecondary: 'Agendar reunião com especialista',

    // Garantia
    guaranteeTitle: 'Garantia de valor',
    guaranteeText:
      'Se o relatório não trouxer clareza e direcionamento acionável para sua escola, devolvemos 100% do valor em até 7 dias.',

    // FAQ
    faqTitle: 'Perguntas frequentes',
    faqItems: [
      {
        question: 'O diagnóstico gratuito não é suficiente?',
        answer:
          'O diagnóstico gratuito mostra o panorama geral (score e semáforo). O relatório executivo detalha cada vulnerabilidade, explica o impacto e entrega um plano de ação concreto com roadmap de 90 dias.',
      },
      {
        question: 'Como recebo o relatório?',
        answer:
          'Após a confirmação do pagamento, o relatório fica disponível imediatamente no navegador e também é enviado para o e-mail cadastrado em formato PDF.',
      },
      {
        question: 'Posso compartilhar o relatório com minha equipe?',
        answer:
          'Sim. O relatório é da escola e pode (e deve) ser compartilhado com a equipe de gestão para fundamentar decisões.',
      },
      {
        question: 'Quem desenvolveu esta metodologia?',
        answer:
          'A metodologia foi desenvolvida por especialista em segurança digital, proteção de dados e educação digital, com base em frameworks reconhecidos de segurança da informação e nas exigências da legislação brasileira.',
      },
      {
        question: 'Meus dados estão seguros?',
        answer:
          'Sim. Os dados do assessment são utilizados exclusivamente para gerar o resultado e o relatório. Não compartilhamos dados com terceiros.',
      },
    ],
  },

  // ----------------------------------------------------------
  // CHECKOUT
  // ----------------------------------------------------------
  checkout: {
    title: 'Finalizar Compra',
    subtitle: 'Relatório Executivo — Escola Segura',
    summaryLabel: 'Resumo do pedido',
    productName: 'Relatório Executivo + Roadmap 90 dias',
    price: 'R$ 297,00',
    ctaPay: 'Finalizar Pagamento',
    securityNote: 'Pagamento processado com segurança via Stripe.',
    placeholderNote:
      'Integração de pagamento em fase de implementação. Entre em contato para adquirir o relatório.',
  },

  // ----------------------------------------------------------
  // PÓS-COMPRA
  // ----------------------------------------------------------
  postPurchase: {
    title: 'Obrigado pela sua compra!',
    subtitle: 'Seu Relatório Executivo está pronto.',
    downloadButton: 'Baixar Relatório (PDF)',
    viewButton: 'Visualizar Relatório Online',

    nextStepsTitle: 'Próximos passos recomendados',
    nextSteps: [
      {
        step: '1',
        title: 'Leia o relatório com sua equipe de gestão',
        description: 'Compartilhe o relatório com diretores, coordenadores e responsáveis por TI.',
      },
      {
        step: '2',
        title: 'Priorize as ações do roadmap',
        description: 'Comece pelas ações dos primeiros 30 dias — são as de maior impacto e menor complexidade.',
      },
      {
        step: '3',
        title: 'Agende uma reunião estratégica',
        description: 'Converse com um especialista para tirar dúvidas e aprofundar o plano de ação.',
      },
    ],

    meetingCta: {
      title: 'Quer apoio na implementação?',
      description:
        'Agende uma reunião estratégica gratuita de 30 minutos para discutir o relatório e os próximos passos.',
      button: 'Agendar Reunião Estratégica',
    },

    servicesTitle: 'Serviços complementares',
    services: [
      {
        name: 'Workshop de Segurança Digital',
        description: 'Capacitação de 3 horas para toda a equipe da escola.',
        price: 'A partir de R$ 2.500',
      },
      {
        name: 'Consultoria de Adequação',
        description: 'Revisão de políticas, contratos e processos com plano de implementação.',
        price: 'A partir de R$ 5.000',
      },
      {
        name: 'Acompanhamento Mensal',
        description: 'Suporte contínuo para implementação e evolução da maturidade digital.',
        price: 'A partir de R$ 2.000/mês',
      },
    ],
  },

  // ----------------------------------------------------------
  // MENSAGENS DE SISTEMA
  // ----------------------------------------------------------
  system: {
    loading: 'Calculando seu resultado...',
    error: 'Algo deu errado. Tente novamente.',
    required: 'Este campo é obrigatório.',
    invalidEmail: 'Informe um e-mail válido.',
    saved: 'Progresso salvo.',
    timeout: 'A sessão expirou. Seus dados foram preservados.',
  },

  // ----------------------------------------------------------
  // INSTITUCIONAL
  // ----------------------------------------------------------
  institutional: {
    aboutTitle: 'Sobre o Escola Segura',
    aboutText:
      'O Escola Segura é uma iniciativa de diagnóstico e orientação em segurança digital para instituições de ensino brasileiras. Nossa missão é ajudar escolas a entenderem sua posição atual, identificarem riscos reais e tomarem decisões informadas para proteger sua comunidade escolar no ambiente digital.',
    methodologyTitle: 'Metodologia',
    methodologyText:
      'O diagnóstico é baseado em um framework de 6 pilares que cobrem as principais dimensões da segurança digital escolar: governança, proteção de dados, infraestrutura, capacitação, proteção de menores e resposta a incidentes. Cada pergunta tem peso e criticidade calibrados para refletir o impacto real no risco da instituição. O score é determinístico — mesmas respostas sempre geram o mesmo resultado.',
  },
} as const;

// Opções de formulário
export const formOptions = {
  states: [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
    'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
    'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO',
  ],
  studentCounts: [
    'Até 100 alunos',
    '101 a 300 alunos',
    '301 a 500 alunos',
    '501 a 1.000 alunos',
    '1.001 a 2.000 alunos',
    'Mais de 2.000 alunos',
  ],
  schoolTypes: [
    { label: 'Privada', value: 'private' },
    { label: 'Pública', value: 'public' },
    { label: 'Filantrópica / Confessional', value: 'philanthropic' },
  ],
  educationLevels: [
    'Educação Infantil',
    'Ensino Fundamental I',
    'Ensino Fundamental II',
    'Ensino Médio',
    'Ensino Técnico',
  ],
  roles: [
    'Diretor(a)',
    'Coordenador(a) Pedagógico(a)',
    'Mantenedor(a)',
    'Gestor(a) Administrativo',
    'Responsável por TI',
    'Professor(a)',
    'Outro',
  ],
} as const;
