'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { store } from '@/lib/store';
import { copy } from '@/lib/copy';
import { track } from '@/lib/tracking';
import { AssessmentResult } from '@/lib/types';
import { generateExecutiveReport } from '@/lib/report-templates';
import { ExecutiveReport } from '@/lib/types';
import { getBandColor, getBandLabel } from '@/lib/scoring';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScoreCircle from '@/components/ScoreCircle';

export default function RelatorioPage() {
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [report, setReport] = useState<ExecutiveReport | null>(null);

  useEffect(() => {
    const r = store.getResult();
    setResult(r);
    if (r) {
      const rep = generateExecutiveReport(r);
      setReport(rep);
      track({ event: 'upsell_view', fromBand: r.overallBand });
    }
  }, []);

  if (!result || !report) {
    return (
      <>
        <Header />
        <main className="flex-1 flex items-center justify-center bg-surface">
          <div className="text-center px-4">
            <h1 className="text-2xl font-bold text-navy-900 mb-4">Nenhum resultado encontrado</h1>
            <p className="text-text-secondary mb-8">Complete o diagnóstico primeiro.</p>
            <Link href="/diagnostico" className="rounded-xl bg-navy-800 px-6 py-3 text-sm font-semibold text-white hover:bg-navy-700">
              Iniciar Diagnóstico
            </Link>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="flex-1 bg-surface">
        <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-16">
          {/* Hero do upsell */}
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-navy-900 sm:text-4xl">{copy.upsell.headline}</h1>
            <p className="mt-4 text-lg text-text-secondary max-w-2xl mx-auto">{copy.upsell.subheadline}</p>
          </div>

          {/* Score resumido */}
          <div className="rounded-2xl border border-border bg-white p-6 flex flex-col sm:flex-row items-center gap-6 mb-10">
            <ScoreCircle score={result.overallScore} band={result.overallBand} size="sm" />
            <div className="text-center sm:text-left">
              <p className="text-lg font-bold text-navy-900">{result.schoolInfo.schoolName}</p>
              <p className="text-text-secondary">
                Score: {Math.round(result.overallScore)}/100 — Nível {getBandLabel(result.overallBand)}
              </p>
              <p className="text-sm text-text-muted mt-1">
                Diagnóstico realizado em {new Date(result.completedAt).toLocaleDateString('pt-BR')}
              </p>
            </div>
          </div>

          {/* O que inclui */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-navy-900 mb-6">{copy.upsell.includesTitle}</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {copy.upsell.includesItems.map((item, i) => (
                <div key={i} className="rounded-xl border border-border bg-white p-5 card-hover">
                  <div className="flex items-start gap-3">
                    <svg className="h-5 w-5 text-score-avancado mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <h3 className="text-sm font-semibold text-navy-900">{item.title}</h3>
                      <p className="text-sm text-text-secondary mt-1">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Preview do relatório (teaser) */}
          <div className="mb-10">
            <h2 className="text-xl font-bold text-navy-900 mb-4">Preview do Parecer Executivo</h2>
            <div className="rounded-xl border border-border bg-white p-6 relative overflow-hidden">
              <p className="text-sm text-text-secondary leading-relaxed">
                {report.executiveSummary}
              </p>
              {/* Análise parcial de pilares */}
              <div className="mt-6 space-y-4">
                {report.pillarAnalysis.slice(0, 2).map((pa, i) => (
                  <div key={i}>
                    <h4 className="text-sm font-semibold text-navy-900 mb-1">{pa.title}</h4>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      {pa.content.slice(0, 120)}...
                    </p>
                  </div>
                ))}
              </div>
              {/* Blur overlay */}
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white via-white/95 to-transparent flex items-end justify-center pb-4">
                <span className="text-sm font-medium text-navy-600">Conteúdo completo disponível no relatório</span>
              </div>
            </div>
          </div>

          {/* Roadmap preview */}
          <div className="mb-10">
            <h2 className="text-xl font-bold text-navy-900 mb-4">Preview do Roadmap de 90 dias</h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {report.roadmap90Days.map((phase, i) => (
                <div key={i} className="rounded-xl border border-border bg-white p-5 relative overflow-hidden">
                  <h4 className="text-sm font-bold text-navy-900">{phase.phase}</h4>
                  <p className="text-xs text-text-muted mb-3">{phase.period}</p>
                  <ul className="space-y-1.5">
                    {phase.actions.slice(0, 2).map((action, j) => (
                      <li key={j} className="text-xs text-text-secondary flex items-start gap-1.5">
                        <span className="text-navy-400 mt-0.5">•</span>
                        {action.slice(0, 60)}...
                      </li>
                    ))}
                  </ul>
                  {i > 0 && (
                    <div className="absolute inset-0 bg-white/70 backdrop-blur-[2px] flex items-center justify-center">
                      <svg className="h-5 w-5 text-navy-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Ancoragem */}
          <div className="rounded-xl bg-navy-50 border border-navy-100 p-5 text-center mb-10">
            <p className="text-sm text-navy-700 font-medium">{copy.upsell.anchorText}</p>
          </div>

          {/* CTA de compra */}
          <div className="rounded-2xl bg-navy-900 text-white p-8 sm:p-10 text-center mb-10">
            <h2 className="text-2xl font-bold mb-2">{copy.upsell.includesTitle}</h2>
            <p className="text-navy-300 mb-6">{copy.upsell.priceNote}</p>
            <div className="mb-6">
              <span className="text-5xl font-bold">{copy.upsell.price}</span>
            </div>
            <button
              onClick={() => {
                track({ event: 'checkout_start', product: 'relatorio-executivo' });
                alert('Integração de pagamento em fase de implementação. Entre em contato para adquirir o relatório.');
              }}
              className="inline-flex items-center justify-center rounded-xl bg-white px-10 py-4 text-base font-semibold text-navy-900 shadow-lg transition-all hover:bg-navy-50 hover:shadow-xl"
            >
              {copy.upsell.ctaPrimary}
            </button>
            <p className="mt-4 text-sm text-navy-400">{copy.checkout.securityNote}</p>
          </div>

          {/* Garantia */}
          <div className="rounded-xl border border-border bg-white p-6 text-center mb-10">
            <h3 className="text-lg font-semibold text-navy-900 mb-2">{copy.upsell.guaranteeTitle}</h3>
            <p className="text-sm text-text-secondary">{copy.upsell.guaranteeText}</p>
          </div>

          {/* FAQ */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-navy-900 mb-6">{copy.upsell.faqTitle}</h2>
            <div className="space-y-4">
              {copy.upsell.faqItems.map((faq, i) => (
                <details key={i} className="group rounded-xl border border-border bg-white">
                  <summary className="flex cursor-pointer items-center justify-between p-5 text-sm font-semibold text-navy-900">
                    {faq.question}
                    <svg className="h-5 w-5 text-text-muted transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="px-5 pb-5">
                    <p className="text-sm text-text-secondary leading-relaxed">{faq.answer}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>

          {/* CTA alternativa — reunião */}
          <div className="rounded-xl border border-border bg-white p-6 text-center">
            <h3 className="text-lg font-semibold text-navy-900">{copy.result.meetingCtaTitle}</h3>
            <p className="mt-2 text-sm text-text-secondary">{copy.result.meetingCtaDescription}</p>
            <button
              onClick={() => track({ event: 'meeting_click', location: 'relatorio' })}
              className="mt-4 rounded-lg border border-navy-300 px-6 py-2.5 text-sm font-medium text-navy-800 transition-colors hover:bg-navy-50"
            >
              {copy.upsell.ctaSecondary}
            </button>
          </div>

          {/* Serviços adicionais */}
          <div className="mt-12">
            <h2 className="text-xl font-bold text-navy-900 mb-6">{copy.postPurchase.servicesTitle}</h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {copy.postPurchase.services.map((svc, i) => (
                <div key={i} className="rounded-xl border border-border bg-white p-5">
                  <h3 className="text-sm font-semibold text-navy-900 mb-1">{svc.name}</h3>
                  <p className="text-xs text-text-secondary mb-3">{svc.description}</p>
                  <p className="text-sm font-bold text-navy-700">{svc.price}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
