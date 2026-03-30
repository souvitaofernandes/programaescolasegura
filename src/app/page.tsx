import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { copy } from '@/lib/copy';
import { pillars } from '@/lib/pillars';

export default function LandingPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-b from-navy-50 to-white">
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
            <div className="max-w-3xl">
              <h1 className="text-4xl font-bold leading-tight tracking-tight text-navy-900 sm:text-5xl">
                {copy.landing.headline}
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-text-secondary sm:text-xl">
                {copy.landing.subheadline}
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/diagnostico"
                  className="inline-flex items-center justify-center rounded-xl bg-navy-800 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-navy-900/20 transition-all hover:bg-navy-700 hover:shadow-xl"
                >
                  {copy.landing.ctaPrimary}
                </Link>
                <a
                  href="#metodologia"
                  className="inline-flex items-center justify-center rounded-xl border border-border px-8 py-4 text-base font-medium text-navy-800 transition-colors hover:bg-navy-50"
                >
                  {copy.landing.ctaSecondary}
                </a>
              </div>
              <div className="mt-8 flex items-center gap-6 text-sm text-text-muted">
                <span className="flex items-center gap-1.5">
                  <svg className="h-4 w-4 text-score-avancado" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  Gratuito
                </span>
                <span className="flex items-center gap-1.5">
                  <svg className="h-4 w-4 text-score-avancado" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  15 minutos
                </span>
                <span className="flex items-center gap-1.5">
                  <svg className="h-4 w-4 text-score-avancado" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  Resultado imediato
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Problema */}
        <section className="bg-white py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className="text-3xl font-bold text-navy-900 mb-4">
              {copy.landing.problemTitle}
            </h2>
            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {copy.landing.problemItems.map((item, i) => (
                <div key={i} className="rounded-xl border border-border bg-surface p-6 card-hover">
                  <h3 className="text-base font-semibold text-navy-900 mb-2">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-text-secondary">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Como funciona */}
        <section className="bg-navy-50 py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className="text-3xl font-bold text-navy-900 mb-12 text-center">
              {copy.landing.howItWorksTitle}
            </h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {copy.landing.howItWorksSteps.map((step) => (
                <div key={step.step} className="text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-navy-800 text-lg font-bold text-white">
                    {step.step}
                  </div>
                  <h3 className="text-base font-semibold text-navy-900 mb-2">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-text-secondary">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pilares */}
        <section id="pilares" className="bg-white py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-navy-900">{copy.landing.pillarsTitle}</h2>
              <p className="mt-3 text-text-secondary max-w-2xl mx-auto">{copy.landing.pillarsSubtitle}</p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {pillars.map((pillar) => (
                <div key={pillar.id} className="rounded-xl border border-border bg-white p-6 card-hover">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-navy-100 text-navy-700">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <h3 className="text-base font-semibold text-navy-900">{pillar.name}</h3>
                  </div>
                  <p className="text-sm leading-relaxed text-text-secondary">{pillar.description}</p>
                  <div className="mt-3">
                    <span className="text-xs text-text-muted">Peso: {Math.round(pillar.weight * 100)}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Metodologia / Credibilidade */}
        <section id="metodologia" className="bg-navy-50 py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className="text-3xl font-bold text-navy-900 mb-12 text-center">
              {copy.landing.credibilityTitle}
            </h2>
            <div className="grid gap-6 sm:grid-cols-2">
              {copy.landing.credibilityItems.map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-score-avancado/10 text-score-avancado mt-0.5">
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-navy-900">{item.title}</h3>
                    <p className="mt-1 text-sm text-text-secondary leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Para quem */}
        <section className="bg-white py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className="text-3xl font-bold text-navy-900 mb-8">
              {copy.landing.audienceTitle}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {copy.landing.audienceItems.map((item, i) => (
                <div key={i} className="flex items-center gap-3 rounded-lg border border-border bg-surface px-5 py-4">
                  <svg className="h-5 w-5 text-navy-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span className="text-sm font-medium text-navy-900">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="bg-navy-900 py-20">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
            <h2 className="text-3xl font-bold text-white mb-4">
              {copy.landing.finalCtaTitle}
            </h2>
            <p className="text-lg text-navy-300 mb-10">
              {copy.landing.finalCtaDescription}
            </p>
            <Link
              href="/diagnostico"
              className="inline-flex items-center justify-center rounded-xl bg-white px-10 py-4 text-base font-semibold text-navy-900 shadow-lg transition-all hover:bg-navy-50 hover:shadow-xl"
            >
              {copy.landing.finalCtaButton}
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
