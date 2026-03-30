import Header from '@/components/Header';
import SchoolForm from '@/components/SchoolForm';

export const metadata = {
  title: 'Dados da Escola — Escola Segura',
};

export default function DiagnosticoPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-surface">
        <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
          <div className="rounded-2xl border border-border bg-white p-6 shadow-sm sm:p-10">
            <SchoolForm />
          </div>
        </div>
      </main>
    </>
  );
}
