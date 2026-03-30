// ============================================================
// Escola Segura — Diagnóstico de Prontidão Digital
// Core type definitions
// ============================================================

export type PillarId =
  | 'governanca'
  | 'protecao-dados'
  | 'infraestrutura'
  | 'capacitacao'
  | 'protecao-criancas'
  | 'resposta-incidentes';

export interface Pillar {
  id: PillarId;
  name: string;
  description: string;
  weight: number; // 0-1, all weights sum to 1
  icon: string;
}

export type QuestionType = 'single-choice' | 'multiple-choice' | 'yes-no';

export type Criticality = 'standard' | 'important' | 'critical';

export interface QuestionOption {
  label: string;
  value: number; // 0 = pior, 3 = melhor
}

export interface Question {
  id: string;
  pillar: PillarId;
  question: string;
  type: QuestionType;
  options: QuestionOption[];
  weight: 1 | 2 | 3; // 1=padrão, 2=importante, 3=crítico
  criticality: Criticality;
  explanation: string;
  contextMessage?: string;
}

export interface SchoolInfo {
  schoolName: string;
  city: string;
  state: string;
  studentCount: string;
  role: string;
  contactName: string;
  contactEmail: string;
  contactPhone?: string;
  schoolType: 'private' | 'public' | 'philanthropic';
  educationLevels: string[];
}

export interface AssessmentAnswer {
  questionId: string;
  selectedValues: number[];
}

export type ScoreBand = 'critico' | 'atencao' | 'adequado' | 'avancado';

export interface PillarScore {
  pillarId: PillarId;
  pillarName: string;
  score: number; // 0-100
  band: ScoreBand;
  maxPossible: number;
  achieved: number;
}

export interface RiskItem {
  pillarId: PillarId;
  pillarName: string;
  description: string;
  severity: 'high' | 'medium' | 'low';
}

export interface PriorityItem {
  questionId: string;
  pillarId: PillarId;
  description: string;
  action: string;
}

export interface AssessmentResult {
  overallScore: number; // 0-100
  overallBand: ScoreBand;
  pillarScores: PillarScore[];
  topRisks: RiskItem[];
  topPriorities: PriorityItem[];
  completedAt: string;
  schoolInfo: SchoolInfo;
}

export interface ReportSection {
  title: string;
  content: string;
  pillarId?: PillarId;
}

export interface ExecutiveReport {
  schoolName: string;
  generatedAt: string;
  overallScore: number;
  overallBand: ScoreBand;
  executiveSummary: string;
  pillarAnalysis: ReportSection[];
  topRisks: RiskItem[];
  prioritizedRecommendations: PriorityItem[];
  roadmap90Days: RoadmapPhase[];
}

export interface RoadmapPhase {
  phase: string;
  period: string;
  actions: string[];
}
