'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { store } from '@/lib/store';
import { copy } from '@/lib/copy';
import { track } from '@/lib/tracking';
import { AssessmentResult } from '@/lib/types';
import ScoreCircle from '@/components/ScoreCircle';
import PillarCard from '@/components/PillarCard';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ResultadoPage() {
  const [result, setResult] = useState<AssessmentResult | null>(null);

  useEffect(() => {
    const r = store.getResult();
    setResult(r);
    if (r) {
      track({ event: 'result_view', overallScore: r.overallScore, band: r.overallBand });
    }
  }, []);

  if (!result) {
    return (
      <>
        <Header />
        <main className="flex-1 flex items-center justify-center bg-surface">
          <div className="text-center px-4">
            <h1 className="text-2xl font-bold text-navy-900 mb-4">Nenhum resultado encontrado</h1>
            <p className="text-text-secondary mb-8">Complete o diagnóstico para ver seu resultado.</p>
            <Link
              href="/diagnostico"
              className="rounded-xl bg-navy-800 px-6 py-3 text-sm font-semibold text-white hover:bg-navy-700"
            >
              Iniciar Diagnóstico
            </Link>
          </div>
        </main>
      </>
    );
  }

  const bandMsg = copy.result.bandMessages[result.overallBand];

  return (
    <>
      <Header />
      <main className="flex-1 bg-surface">
        <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-16">
          {/* Header do resultado */}
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-navy-900">{copy.result.title}</h1>
            <p className="mt-2 text-text-secondary">
              {copy.result.subtitle.replace('{schoolName}', result.schoolInfo.schoolName)}
            </p>
          </div>

          {/* Score geral */}
          <div className="rounded-2xl border border-border bg-white p-8 text-center shadow-sm mb-8">
            <p className="text-sm font-medium text-text-muted mb-4">{copy.result.overallScoreLabel}</p>
            <ScoreCircle score={result.overallScore} band={result.overallBand} size="lg" />
            <div className="mt-6 max-w-xl mx-auto">
              <h2 className="text-xl font-bold text-navy-900 mb-2">{bandMsg.title}</h2>
              <p className="text-text-secondary leading-relaxed">{bandMsg.summary}</p>
            </div>
          </div>

          {/* Score por pilar */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-navy-900 mb-6">{copy.result.pillarScoresTitle}</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {result.pillarScores.map((ps) => (
                <PillarCard key={ps.pillarId} pillarScore={ps} />
              ))}
            </div>
          </div>

          {/* Principais riscos */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-navy-900 mb-4">{copy.result.topRisksTitle}</h2>
            <div className="space-y-3">
              {result.topRisks.map((risk, i) => (
                <div
                  key={i}
                  className={`rounded-xl border p-5 ${
                    risk.severity === 'high'
                      ? 'border-red-200 bg-red-50'
                      : risk.severity === 'medium'
                        ? 'border-amber-200 bg-amber-50'
                        : 'border-blue-200 bg-blue-50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`mt-0.5 h-2 w-2 rounded-full shrink-0 ${
                      risk.severity === 'high' ? 'bg-red-500' : risk.severity === 'medium' ? 'bg-amber-500' : 'bg-blue-500'
                    }`} />
                    <div>
                      <h3 className="text-sm font-semibold text-navy-900">{risk.pillarName}</h3>
                      <p className="text-sm text-text-secondary mt-1">{risk.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Prioridades imediatas */}
          {result.topPriorities.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-bold text-navy-900 mb-4">{copy.result.topPrioritiesTitle}</h2>
              <div className="space-y-3">
                {result.topPriorities.map((p, i) => (
                  <div key={i} className="rounded-xl border border-border bg-white p-5">
                    <p className="text-sm text-text-secondary mb-2">{p.description}</p>
                    <p className="text-sm font-medium text-navy-800 flex items-start gap-2">
                      <svg className="h-4 w-4 mt-0.5 shrink-0 text-navy-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                      {p.action}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Nota sobre método */}
          <div className="rounded-xl bg-navy-50 border border-navy-100 p-5 mb-10">
            <p className="text-xs text-navy-600 leading-relaxed">{copy.result.methodNote}</p>
          </div>

          {/* CTA — Upsell */}
          <div className="rounded-2xl border-2 border-navy-200 bg-white p-8 sm:p-10 mb-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-navy-900">{copy.result.reportCtaTitle}</h2>
              <p className="mt-3 text-text-secondary leading-relaxed max-w-xl mx-auto">
                {copy.result.reportCtaDescription}
              </p>
            </div>
            <p className="text-sm text-text-muted text-center mb-2">
              {copy.result.partialNote}
            </p>
            <div className="text-center mt-6">
              <Link
                href="/relatorio"
                onClick={() => track({ event: 'upsell_click', product: 'relatorio-executivo' })}
                className="inline-flex items-center justify-center rounded-xl bg-navy-800 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-navy-900/20 transition-all hover:bg-navy-700 hover:shadow-xl"
              >
                {copy.result.reportCtaButton} — {copy.result.reportCtaPrice}
              </Link>
            </div>
            <p className="text-center mt-4 text-sm text-text-secondary">
              {bandMsg.recommendation}
            </p>
          </div>

          {/* CTA — Reunião */}
          <div className="rounded-xl border border-border bg-white p-6 text-center">
            <h3 className="text-lg font-semibold text-navy-900">{copy.result.meetingCtaTitle}</h3>
            <p className="mt-2 text-sm text-text-secondary">{copy.result.meetingCtaDescription}</p>
            <button
              onClick={() => track({ event: 'meeting_click', location: 'resultado' })}
              className="mt-4 rounded-lg border border-navy-300 px-6 py-2.5 text-sm font-medium text-navy-800 transition-colors hover:bg-navy-50"
            >
              {copy.result.meetingCtaButton}
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
