import { copy } from '@/lib/copy';

export default function Footer() {
  return (
    <footer className="border-t border-border bg-navy-900 text-white">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-sm font-bold text-navy-900">
                ES
              </div>
              <span className="text-lg font-semibold">Escola Segura</span>
            </div>
            <p className="text-sm text-navy-300 leading-relaxed">
              {copy.institutional.aboutText.slice(0, 180)}...
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Diagnóstico</h4>
            <ul className="space-y-2 text-sm text-navy-300">
              <li>6 pilares de avaliação</li>
              <li>36 critérios objetivos</li>
              <li>Score determinístico</li>
              <li>Resultado imediato</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Serviços</h4>
            <ul className="space-y-2 text-sm text-navy-300">
              <li>Relatório Executivo</li>
              <li>Workshop de Segurança Digital</li>
              <li>Consultoria de Adequação</li>
              <li>Acompanhamento Mensal</li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-navy-700 pt-6">
          <p className="text-xs text-navy-400 leading-relaxed">
            {copy.landing.footerDisclaimer}
          </p>
          <p className="mt-2 text-xs text-navy-500">
            &copy; {new Date().getFullYear()} Escola Segura. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
