'use client';

import { AssessmentAnswer, AssessmentResult, SchoolInfo } from './types';

// ============================================================
// Simple in-memory + localStorage store for MVP
// No external dependencies needed
// ============================================================

const STORAGE_KEY = 'escola-segura-assessment';

interface StoreData {
  schoolInfo: SchoolInfo | null;
  answers: AssessmentAnswer[];
  currentQuestion: number;
  result: AssessmentResult | null;
  startedAt: string | null;
}

const defaultData: StoreData = {
  schoolInfo: null,
  answers: [],
  currentQuestion: 0,
  result: null,
  startedAt: null,
};

function load(): StoreData {
  if (typeof window === 'undefined') return { ...defaultData };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...defaultData };
    return JSON.parse(raw) as StoreData;
  } catch {
    return { ...defaultData };
  }
}

function save(data: StoreData): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // localStorage full or disabled — silent fail
  }
}

export const store = {
  getSchoolInfo(): SchoolInfo | null {
    return load().schoolInfo;
  },

  setSchoolInfo(info: SchoolInfo): void {
    const data = load();
    data.schoolInfo = info;
    data.startedAt = new Date().toISOString();
    save(data);
  },

  getAnswers(): AssessmentAnswer[] {
    return load().answers;
  },

  setAnswer(questionId: string, selectedValues: number[]): void {
    const data = load();
    const existing = data.answers.findIndex((a) => a.questionId === questionId);
    if (existing >= 0) {
      data.answers[existing].selectedValues = selectedValues;
    } else {
      data.answers.push({ questionId, selectedValues });
    }
    save(data);
  },

  getCurrentQuestion(): number {
    return load().currentQuestion;
  },

  setCurrentQuestion(index: number): void {
    const data = load();
    data.currentQuestion = index;
    save(data);
  },

  getResult(): AssessmentResult | null {
    return load().result;
  },

  setResult(result: AssessmentResult): void {
    const data = load();
    data.result = result;
    save(data);
  },

  getStartedAt(): string | null {
    return load().startedAt;
  },

  clear(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(STORAGE_KEY);
  },
};
