// ============================================================
// FASE 10 — Tracking & Otimização
// Camada de eventos para analytics (Google Analytics, etc.)
// ============================================================

export type TrackingEvent =
  | { event: 'page_view'; page: string }
  | { event: 'cta_click'; cta: string; location: string }
  | { event: 'school_form_start' }
  | { event: 'school_form_complete'; schoolType: string; studentCount: string }
  | { event: 'assessment_start' }
  | { event: 'assessment_progress'; questionIndex: number; total: number; percentage: number }
  | { event: 'assessment_abandon'; questionIndex: number; total: number }
  | { event: 'assessment_complete'; durationSeconds: number }
  | { event: 'result_view'; overallScore: number; band: string }
  | { event: 'upsell_view'; fromBand: string }
  | { event: 'upsell_click'; product: string }
  | { event: 'checkout_start'; product: string }
  | { event: 'checkout_complete'; product: string; value: number }
  | { event: 'meeting_click'; location: string }
  | { event: 'report_download' };

/**
 * Dispara evento de tracking.
 * No MVP, apenas loga no console.
 * Em produção, integrar com Google Analytics / Meta Pixel / etc.
 */
export function track(eventData: TrackingEvent): void {
  if (typeof window !== 'undefined') {
    console.log('[Escola Segura Track]', eventData);

    // Futura integração com Google Analytics:
    // if (window.gtag) {
    //   window.gtag('event', eventData.event, eventData);
    // }
  }
}

// ----------------------------------------------------------
// DOCUMENTAÇÃO DE MÉTRICAS E OTIMIZAÇÃO
// ----------------------------------------------------------

/**
 * MÉTRICAS PRINCIPAIS DO FUNIL:
 *
 * 1. Landing → Formulário escola: taxa de início
 * 2. Formulário → Assessment: taxa de preenchimento
 * 3. Assessment → Resultado: taxa de conclusão
 * 4. Resultado → Upsell view: taxa de visualização
 * 5. Upsell → Checkout: taxa de conversão
 * 6. Checkout → Compra: taxa de fechamento
 * 7. Resultado → Agendar reunião: taxa alternativa
 *
 * PONTOS DE ABANDONO PROVÁVEIS:
 * - Entre pergunta 10-15 (fadiga inicial)
 * - Na tela de resultado (satisfação com gratuito)
 * - No checkout (objeção de preço)
 *
 * HIPÓTESES DE OTIMIZAÇÃO:
 * 1. Reduzir formulário inicial para 4 campos (nome, email, escola, porte)
 * 2. Testar assessment em 25 perguntas vs. 36
 * 3. Testar preço R$197 vs. R$297 vs. R$397
 * 4. Testar CTA "Obter Relatório" vs. "Ver Relatório Completo" vs. "Baixar Plano de Ação"
 * 5. Testar mostrar 1 risco detalhado grátis vs. 3 riscos resumidos
 * 6. Testar urgência temporal ("Oferta válida por 48h após o diagnóstico")
 *
 * TESTES A/B SUGERIDOS:
 * - Headline da landing: problema vs. solução vs. credibilidade
 * - Número de perguntas visíveis por vez (1 vs. 3 vs. todas do pilar)
 * - Nível de detalhe no resultado gratuito
 * - Presença vs. ausência de preço no CTA do upsell
 * - Garantia visível vs. oculta na página de upsell
 *
 * ESTRATÉGIA PARA VALIDAR DEMANDA:
 * 1. Lançar com tráfego orgânico (LinkedIn, comunidades de educação)
 * 2. Medir: quantos iniciam, quantos completam, quantos clicam em comprar
 * 3. Se >5% clicam em comprar: demanda validada, implementar checkout
 * 4. Se <2%: ajustar oferta/preço/copy antes de investir em tráfego pago
 * 5. Coletar feedback qualitativo via campo opcional pós-resultado
 */
