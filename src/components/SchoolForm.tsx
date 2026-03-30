'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SchoolInfo } from '@/lib/types';
import { copy, formOptions } from '@/lib/copy';
import { store } from '@/lib/store';
import { track } from '@/lib/tracking';

export default function SchoolForm() {
  const router = useRouter();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState<Partial<SchoolInfo>>({
    schoolName: '',
    city: '',
    state: '',
    studentCount: '',
    role: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    schoolType: 'private',
    educationLevels: [],
  });

  const f = copy.schoolForm.fields;

  function update(field: string, value: string | string[]) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  }

  function toggleLevel(level: string) {
    const current = form.educationLevels ?? [];
    const updated = current.includes(level)
      ? current.filter((l) => l !== level)
      : [...current, level];
    update('educationLevels', updated);
  }

  function validate(): boolean {
    const e: Record<string, string> = {};
    if (!form.schoolName?.trim()) e.schoolName = copy.system.required;
    if (!form.contactName?.trim()) e.contactName = copy.system.required;
    if (!form.contactEmail?.trim()) {
      e.contactEmail = copy.system.required;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.contactEmail)) {
      e.contactEmail = copy.system.invalidEmail;
    }
    if (!form.state) e.state = copy.system.required;
    if (!form.studentCount) e.studentCount = copy.system.required;
    if (!form.role?.trim()) e.role = copy.system.required;
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    const schoolInfo: SchoolInfo = {
      schoolName: form.schoolName!.trim(),
      city: form.city?.trim() ?? '',
      state: form.state!,
      studentCount: form.studentCount!,
      role: form.role!.trim(),
      contactName: form.contactName!.trim(),
      contactEmail: form.contactEmail!.trim(),
      contactPhone: form.contactPhone?.trim(),
      schoolType: (form.schoolType as SchoolInfo['schoolType']) ?? 'private',
      educationLevels: form.educationLevels ?? [],
    };

    store.setSchoolInfo(schoolInfo);
    track({
      event: 'school_form_complete',
      schoolType: schoolInfo.schoolType,
      studentCount: schoolInfo.studentCount,
    });
    router.push('/diagnostico/assessment');
  }

  const inputClass =
    'w-full rounded-lg border border-border bg-white px-4 py-3 text-sm text-navy-900 placeholder:text-text-muted focus:border-navy-500 focus:outline-none focus:ring-2 focus:ring-navy-500/20 transition-colors';
  const errorClass = 'border-red-400 focus:border-red-500 focus:ring-red-500/20';
  const labelClass = 'block text-sm font-medium text-navy-900 mb-1.5';

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-navy-900">{copy.schoolForm.title}</h1>
        <p className="mt-2 text-text-secondary">{copy.schoolForm.subtitle}</p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {/* Nome da escola */}
        <div className="sm:col-span-2">
          <label className={labelClass}>{f.schoolName.label}</label>
          <input
            type="text"
            value={form.schoolName}
            onChange={(e) => update('schoolName', e.target.value)}
            placeholder={f.schoolName.placeholder}
            className={`${inputClass} ${errors.schoolName ? errorClass : ''}`}
          />
          {errors.schoolName && <p className="mt-1 text-xs text-red-500">{errors.schoolName}</p>}
        </div>

        {/* Cidade */}
        <div>
          <label className={labelClass}>{f.city.label}</label>
          <input
            type="text"
            value={form.city}
            onChange={(e) => update('city', e.target.value)}
            placeholder={f.city.placeholder}
            className={inputClass}
          />
        </div>

        {/* Estado */}
        <div>
          <label className={labelClass}>{f.state.label}</label>
          <select
            value={form.state}
            onChange={(e) => update('state', e.target.value)}
            className={`${inputClass} ${errors.state ? errorClass : ''}`}
          >
            <option value="">{f.state.placeholder}</option>
            {formOptions.states.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          {errors.state && <p className="mt-1 text-xs text-red-500">{errors.state}</p>}
        </div>

        {/* Tipo de escola */}
        <div>
          <label className={labelClass}>{f.schoolType.label}</label>
          <select
            value={form.schoolType}
            onChange={(e) => update('schoolType', e.target.value)}
            className={inputClass}
          >
            {formOptions.schoolTypes.map((t) => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
        </div>

        {/* Número de alunos */}
        <div>
          <label className={labelClass}>{f.studentCount.label}</label>
          <select
            value={form.studentCount}
            onChange={(e) => update('studentCount', e.target.value)}
            className={`${inputClass} ${errors.studentCount ? errorClass : ''}`}
          >
            <option value="">{f.studentCount.placeholder}</option>
            {formOptions.studentCounts.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          {errors.studentCount && <p className="mt-1 text-xs text-red-500">{errors.studentCount}</p>}
        </div>

        {/* Níveis de ensino */}
        <div className="sm:col-span-2">
          <label className={labelClass}>{f.educationLevels.label}</label>
          <div className="flex flex-wrap gap-2">
            {formOptions.educationLevels.map((level) => {
              const selected = form.educationLevels?.includes(level);
              return (
                <button
                  key={level}
                  type="button"
                  onClick={() => toggleLevel(level)}
                  className={`rounded-full border px-3 py-1.5 text-sm transition-colors ${
                    selected
                      ? 'border-navy-500 bg-navy-50 text-navy-800 font-medium'
                      : 'border-border bg-white text-text-secondary hover:border-navy-300'
                  }`}
                >
                  {level}
                </button>
              );
            })}
          </div>
        </div>

        {/* Separador */}
        <div className="sm:col-span-2 border-t border-border pt-2">
          <p className="text-xs text-text-muted mb-4">Dados do responsável pelo preenchimento</p>
        </div>

        {/* Nome */}
        <div>
          <label className={labelClass}>{f.contactName.label}</label>
          <input
            type="text"
            value={form.contactName}
            onChange={(e) => update('contactName', e.target.value)}
            placeholder={f.contactName.placeholder}
            className={`${inputClass} ${errors.contactName ? errorClass : ''}`}
          />
          {errors.contactName && <p className="mt-1 text-xs text-red-500">{errors.contactName}</p>}
        </div>

        {/* Cargo */}
        <div>
          <label className={labelClass}>{f.role.label}</label>
          <select
            value={form.role}
            onChange={(e) => update('role', e.target.value)}
            className={`${inputClass} ${errors.role ? errorClass : ''}`}
          >
            <option value="">Selecione</option>
            {formOptions.roles.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
          {errors.role && <p className="mt-1 text-xs text-red-500">{errors.role}</p>}
        </div>

        {/* Email */}
        <div>
          <label className={labelClass}>{f.contactEmail.label}</label>
          <input
            type="email"
            value={form.contactEmail}
            onChange={(e) => update('contactEmail', e.target.value)}
            placeholder={f.contactEmail.placeholder}
            className={`${inputClass} ${errors.contactEmail ? errorClass : ''}`}
          />
          {errors.contactEmail && <p className="mt-1 text-xs text-red-500">{errors.contactEmail}</p>}
        </div>

        {/* Telefone */}
        <div>
          <label className={labelClass}>{f.contactPhone.label}</label>
          <input
            type="tel"
            value={form.contactPhone}
            onChange={(e) => update('contactPhone', e.target.value)}
            placeholder={f.contactPhone.placeholder}
            className={inputClass}
          />
        </div>
      </div>

      {/* Nota de privacidade */}
      <p className="text-xs text-text-muted leading-relaxed">
        {copy.schoolForm.privacyNote}
      </p>

      {/* Submit */}
      <button
        type="submit"
        className="w-full rounded-lg bg-navy-800 px-6 py-3.5 text-base font-semibold text-white transition-colors hover:bg-navy-700 focus:outline-none focus:ring-2 focus:ring-navy-500/40 focus:ring-offset-2"
      >
        {copy.schoolForm.ctaPrimary}
      </button>
    </form>
  );
}
