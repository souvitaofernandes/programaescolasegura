'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { questions } from '@/lib/questions';
import { pillars } from '@/lib/pillars';
import { copy } from '@/lib/copy';
import { store } from '@/lib/store';
import { calculateAssessmentResult } from '@/lib/scoring';
import { track } from '@/lib/tracking';

export default function AssessmentWizard() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number[]>>({});
  const [showExplanation, setShowExplanation] = useState(false);

  const total = questions.length;
  const question = questions[currentIndex];
  const pillar = pillars.find((p) => p.id === question.pillar);
  const progress = ((currentIndex + 1) / total) * 100;
  const selectedValues = answers[question.id] ?? [];

  // Load saved state
  useEffect(() => {
    const savedAnswers = store.getAnswers();
    if (savedAnswers.length > 0) {
      const map: Record<string, number[]> = {};
      savedAnswers.forEach((a) => { map[a.questionId] = a.selectedValues; });
      setAnswers(map);
    }
    const savedIndex = store.getCurrentQuestion();
    if (savedIndex > 0 && savedIndex < total) {
      setCurrentIndex(savedIndex);
    }
    track({ event: 'assessment_start' });
  }, [total]);

  const selectOption = useCallback((value: number) => {
    setAnswers((prev) => {
      const updated = { ...prev, [question.id]: [value] };
      store.setAnswer(question.id, [value]);
      return updated;
    });
  }, [question.id]);

  function goNext() {
    if (currentIndex < total - 1) {
      const next = currentIndex + 1;
      setCurrentIndex(next);
      store.setCurrentQuestion(next);
      setShowExplanation(false);

      const pct = Math.round(((next + 1) / total) * 100);
      track({ event: 'assessment_progress', questionIndex: next, total, percentage: pct });
    }
  }

  function goPrev() {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      store.setCurrentQuestion(currentIndex - 1);
      setShowExplanation(false);
    }
  }

  function finish() {
    const schoolInfo = store.getSchoolInfo();
    if (!schoolInfo) {
      router.push('/diagnostico');
      return;
    }

    const answerArray = Object.entries(answers).map(([questionId, selectedValues]) => ({
      questionId,
      selectedValues,
    }));

    const result = calculateAssessmentResult(answerArray, schoolInfo);
    store.setResult(result);

    const startedAt = store.getStartedAt();
    const duration = startedAt
      ? Math.round((Date.now() - new Date(startedAt).getTime()) / 1000)
      : 0;

    track({ event: 'assessment_complete', durationSeconds: duration });
    router.push('/resultado');
  }

  const isLastQuestion = currentIndex === total - 1;
  const hasAnswer = selectedValues.length > 0;

  // Encouragement messages
  const encourageMsg = copy.assessment.encourageMessages.find(
    (m) => Math.round(progress) >= m.at && Math.round(progress) < m.at + 10
  );

  return (
    <div className="mx-auto w-full max-w-2xl">
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-navy-800">
            {copy.assessment.progressLabel
              .replace('{current}', String(currentIndex + 1))
              .replace('{total}', String(total))}
          </span>
          <span className="text-sm text-text-muted">
            {Math.round(progress)}%
          </span>
        </div>
        <div className="h-2 w-full rounded-full bg-navy-100">
          <div
            className="h-2 rounded-full bg-navy-600 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        {encourageMsg && (
          <p className="mt-2 text-xs text-navy-500 font-medium">{encourageMsg.message}</p>
        )}
      </div>

      {/* Pillar badge */}
      <div className="mb-4">
        <span className="inline-block rounded-full bg-navy-50 border border-navy-200 px-3 py-1 text-xs font-medium text-navy-700">
          {pillar?.name}
        </span>
      </div>

      {/* Question */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-navy-900 leading-relaxed mb-2">
          {question.question}
        </h2>

        {question.contextMessage && (
          <p className="text-sm text-text-secondary leading-relaxed mb-4 bg-navy-50 border border-navy-100 rounded-lg px-4 py-3">
            {question.contextMessage}
          </p>
        )}

        {/* Explanation toggle */}
        <button
          type="button"
          onClick={() => setShowExplanation(!showExplanation)}
          className="text-xs text-navy-500 hover:text-navy-700 underline underline-offset-2 transition-colors"
        >
          {copy.assessment.helpToggle}
        </button>
        {showExplanation && (
          <p className="mt-2 text-sm text-text-secondary leading-relaxed bg-surface rounded-lg px-4 py-3 border border-border">
            {question.explanation}
          </p>
        )}
      </div>

      {/* Options */}
      <div className="space-y-3 mb-10">
        {question.options.map((option, idx) => {
          const isSelected = selectedValues.includes(option.value);
          return (
            <button
              key={idx}
              type="button"
              onClick={() => selectOption(option.value)}
              className={`w-full rounded-xl border-2 px-5 py-4 text-left text-sm transition-all ${
                isSelected
                  ? 'border-navy-500 bg-navy-50 text-navy-900 font-medium shadow-sm'
                  : 'border-border bg-white text-text-secondary hover:border-navy-300 hover:bg-navy-50/50'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                    isSelected
                      ? 'border-navy-600 bg-navy-600'
                      : 'border-border-strong'
                  }`}
                >
                  {isSelected && (
                    <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <span>{option.label}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={goPrev}
          disabled={currentIndex === 0}
          className="rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-text-secondary transition-colors hover:bg-surface disabled:opacity-30 disabled:cursor-not-allowed"
        >
          {copy.assessment.ctaPrev}
        </button>

        {isLastQuestion ? (
          <button
            type="button"
            onClick={finish}
            disabled={!hasAnswer}
            className="rounded-lg bg-navy-800 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-navy-700 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {copy.assessment.ctaFinish}
          </button>
        ) : (
          <button
            type="button"
            onClick={goNext}
            disabled={!hasAnswer}
            className="rounded-lg bg-navy-800 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-navy-700 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {copy.assessment.ctaNext}
          </button>
        )}
      </div>
    </div>
  );
}
