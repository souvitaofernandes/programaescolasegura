import { Pillar } from './types';

export const pillars: Pillar[] = [
  {
    id: 'governanca',
    name: 'Governança e Políticas',
    description:
      'Avalia se a escola possui políticas formais, responsáveis designados e processos documentados para segurança digital e proteção de dados.',
    weight: 0.2,
    icon: 'Shield',
  },
  {
    id: 'protecao-dados',
    name: 'Proteção de Dados e Privacidade',
    description:
      'Avalia o nível de conformidade com a LGPD, gestão de consentimento, tratamento de dados de menores e práticas de privacidade.',
    weight: 0.2,
    icon: 'Lock',
  },
  {
    id: 'infraestrutura',
    name: 'Segurança da Infraestrutura Digital',
    description:
      'Avalia controles técnicos como gestão de acessos, segurança de rede, dispositivos, backup e proteção contra ameaças.',
    weight: 0.15,
    icon: 'Server',
  },
  {
    id: 'capacitacao',
    name: 'Capacitação e Cultura Digital',
    description:
      'Avalia se professores, funcionários e alunos recebem formação adequada sobre segurança digital e uso responsável de tecnologia.',
    weight: 0.15,
    icon: 'GraduationCap',
  },
  {
    id: 'protecao-criancas',
    name: 'Proteção Digital de Crianças e Adolescentes',
    description:
      'Avalia as práticas da escola para prevenção de cyberbullying, exposição a conteúdo inadequado, aliciamento online e uso seguro de plataformas.',
    weight: 0.2,
    icon: 'Users',
  },
  {
    id: 'resposta-incidentes',
    name: 'Resposta a Incidentes e Continuidade',
    description:
      'Avalia se a escola possui planos e procedimentos para responder a incidentes de segurança, vazamentos de dados e situações de crise digital.',
    weight: 0.1,
    icon: 'AlertTriangle',
  },
];
