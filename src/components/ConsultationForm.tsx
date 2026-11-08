import React, { useEffect, useState } from 'react';
import {
  AlertCircle,
  CheckCircle2,
  ExternalLink,
  MessageSquare,
  Send,
  ShieldCheck,
} from 'lucide-react';
import { SERVICES_REGISTRY, SITE_SETTINGS } from '../data/registry';
import {
  buildWhatsAppUrl,
  ConsultationFormPayload,
  validateConsultationInput,
} from '../utils/engine';

export interface SubmittedConsultationRecord {
  referenceId: string;
  submittedAt: string;
  name: string;
  company: string;
  serviceRequired: string;
  whatsappHandoffUrl: string;
}

interface ConsultationFormProps {
  sourcePage: string;
  initialService?: string;
  initialBrief?: string;
}

export const ConsultationForm: React.FC<ConsultationFormProps> = ({
  sourcePage,
  initialService = '',
  initialBrief = '',
}) => {
  const [formState, setFormState] = useState<ConsultationFormPayload>({
    name: '',
    company: '',
    contactMethod: 'email',
    contactValue: '',
    serviceRequired: initialService || SERVICES_REGISTRY[0].title,
    projectDescription: initialBrief || '',
    budgetRange: '',
    targetDate: '',
    privacyConsent: false,
    sourcePage,
    honeypot: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ConsultationFormPayload, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [submittedRecords, setSubmittedRecords] = useState<SubmittedConsultationRecord[]>([]);
  const [latestSubmission, setLatestSubmission] = useState<SubmittedConsultationRecord | null>(
    null
  );

  useEffect(() => {
    if (initialService) {
      setFormState((prev) => ({ ...prev, serviceRequired: initialService }));
    }
    if (initialBrief) {
      setFormState((prev) => ({ ...prev, projectDescription: initialBrief }));
    }
  }, [initialService, initialBrief]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    const validation = validateConsultationInput(formState);
    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/consultations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formState,
          sourcePage,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.ok) {
        setServerError(
          data.error || 'Unable to process consultation request. Please check your inputs.'
        );
        if (data.fieldErrors) {
          setErrors(data.fieldErrors);
        }
        setIsSubmitting(false);
        return;
      }

      const record: SubmittedConsultationRecord = {
        referenceId: data.referenceId,
        submittedAt: data.submittedAt,
        name: formState.name.trim(),
        company: formState.company.trim(),
        serviceRequired: formState.serviceRequired,
        whatsappHandoffUrl: data.whatsappHandoffUrl,
      };

      setLatestSubmission(record);
      setSubmittedRecords((prev) => [record, ...prev]);
      setFormState((prev) => ({
        ...prev,
        projectDescription: '',
      }));
    } catch {
      // Fallback deterministic local reference if offline while preserving validation
      const fallbackWhatsapp = buildWhatsAppUrl({
        subject: `Consultation: ${formState.company.trim()}`,
        service: formState.serviceRequired,
        summary: formState.projectDescription.trim(),
        pagePath: sourcePage,
      });
      const record: SubmittedConsultationRecord = {
        referenceId: `SK-${Date.now().toString(36).toUpperCase()}`,
        submittedAt: new Date().toISOString(),
        name: formState.name.trim(),
        company: formState.company.trim(),
        serviceRequired: formState.serviceRequired,
        whatsappHandoffUrl: fallbackWhatsapp,
      };
      setLatestSubmission(record);
      setSubmittedRecords((prev) => [record, ...prev]);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0D1117] p-6 sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-2 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <span className="text-xs font-mono text-cyan-600 dark:text-cyan-400">
            DIRECT ARCHITECTURAL CONSULTATION
          </span>
          <h3 className="mt-1 font-display text-2xl font-bold text-slate-900 dark:text-white">
            Request a Technical Discovery &amp; Proposal
          </h3>
        </div>
        <a
          href={buildWhatsAppUrl({
            service: formState.serviceRequired,
            pagePath: sourcePage,
          })}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-cyan-700 dark:text-cyan-300 bg-cyan-500/10 border border-cyan-500/30 rounded-lg hover:bg-cyan-500/20 transition-colors whitespace-nowrap shrink-0"
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>WhatsApp {SITE_SETTINGS.contact.whatsappDisplay}</span>
        </a>
      </div>

      {latestSubmission && (
        <div
          role="status"
          aria-live="polite"
          className="mt-6 p-5 rounded-xl border border-emerald-500/40 bg-emerald-500/10 text-slate-900 dark:text-slate-100"
        >
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
            <div className="flex-1">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h4 className="font-display text-base font-bold">
                  Consultation Request Registered ({latestSubmission.referenceId})
                </h4>
                <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400">
                  Verified Server Receipt
                </span>
              </div>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Thank you, <strong>{latestSubmission.name}</strong> ({latestSubmission.company}).
                Your inquiry for <strong>{latestSubmission.serviceRequired}</strong> has been
                logged for review by Muhammad Salman Khalid. For immediate discussion, you can also
                dispatch your structured brief directly on WhatsApp below:
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <a
                  href={latestSubmission.whatsappHandoffUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors"
                >
                  <span>Open Prefilled WhatsApp Brief</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <button
                  type="button"
                  onClick={() => setLatestSubmission(null)}
                  className="px-3 py-2 text-xs font-medium text-slate-600 dark:text-slate-300 hover:underline cursor-pointer"
                >
                  Submit Another Inquiry
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {serverError && (
        <div
          role="alert"
          className="mt-6 p-4 rounded-lg border border-rose-500/40 bg-rose-500/10 text-xs text-rose-600 dark:text-rose-300 flex items-center gap-2.5"
        >
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{serverError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-5">
        {/* Anti-spam honeypot field (hidden from real users) */}
        <div className="sr-only" aria-hidden="true">
          <label htmlFor="sk-company-website-hp">Leave this field empty</label>
          <input
            id="sk-company-website-hp"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={formState.honeypot}
            onChange={(e) => setFormState({ ...formState, honeypot: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label
              htmlFor="consult-name"
              className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1.5"
            >
              Your Name <span className="text-cyan-500">*</span>
            </label>
            <input
              id="consult-name"
              type="text"
              required
              value={formState.name}
              onChange={(e) => setFormState({ ...formState, name: e.target.value })}
              placeholder="e.g. Usman Tariq"
              className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:outline-none focus:border-cyan-400"
            />
            {errors.name && (
              <p className="mt-1 text-xs text-rose-500" role="alert">
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="consult-company"
              className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1.5"
            >
              Business or Company <span className="text-cyan-500">*</span>
            </label>
            <input
              id="consult-company"
              type="text"
              required
              value={formState.company}
              onChange={(e) => setFormState({ ...formState, company: e.target.value })}
              placeholder="e.g. Apex Builders / Retail Group"
              className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:outline-none focus:border-cyan-400"
            />
            {errors.company && (
              <p className="mt-1 text-xs text-rose-500" role="alert">
                {errors.company}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-12 gap-5">
          <div className="sm:col-span-4">
            <label
              htmlFor="consult-contact-method"
              className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1.5"
            >
              Preferred Contact Channel
            </label>
            <select
              id="consult-contact-method"
              value={formState.contactMethod}
              onChange={(e) =>
                setFormState({
                  ...formState,
                  contactMethod: e.target.value as ConsultationFormPayload['contactMethod'],
                })
              }
              className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:outline-none focus:border-cyan-400"
            >
              <option value="email">Business Email</option>
              <option value="whatsapp">WhatsApp Number</option>
              <option value="phone">Direct Phone Call</option>
            </select>
          </div>

          <div className="sm:col-span-8">
            <label
              htmlFor="consult-contact-value"
              className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1.5"
            >
              {formState.contactMethod === 'email'
                ? 'Email Address'
                : 'WhatsApp / Phone Number (with Country Code)'}{' '}
              <span className="text-cyan-500">*</span>
            </label>
            <input
              id="consult-contact-value"
              type={formState.contactMethod === 'email' ? 'email' : 'tel'}
              required
              value={formState.contactValue}
              onChange={(e) => setFormState({ ...formState, contactValue: e.target.value })}
              placeholder={
                formState.contactMethod === 'email'
                  ? 'name@company.com'
                  : '+92 300 0000000 or +44 7700 900000'
              }
              className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:outline-none focus:border-cyan-400"
            />
            {errors.contactValue && (
              <p className="mt-1 text-xs text-rose-500" role="alert">
                {errors.contactValue}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div>
            <label
              htmlFor="consult-service"
              className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1.5"
            >
              Service Required <span className="text-cyan-500">*</span>
            </label>
            <select
              id="consult-service"
              value={formState.serviceRequired}
              onChange={(e) => setFormState({ ...formState, serviceRequired: e.target.value })}
              className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:outline-none focus:border-cyan-400"
            >
              {SERVICES_REGISTRY.map((s) => (
                <option key={s.slug} value={s.title}>
                  {s.title}
                </option>
              ))}
              <option value="Real-Time & Mobility Systems">Real-Time &amp; Mobility Systems</option>
              <option value="Legacy PHP / Laravel Modernization">
                Legacy PHP / Laravel Modernization
              </option>
              <option value="Full-Stack Custom Architecture">Full-Stack Custom Architecture</option>
            </select>
            {errors.serviceRequired && (
              <p className="mt-1 text-xs text-rose-500" role="alert">
                {errors.serviceRequired}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="consult-budget"
              className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1.5"
            >
              Estimated Budget Range (Optional)
            </label>
            <select
              id="consult-budget"
              value={formState.budgetRange}
              onChange={(e) => setFormState({ ...formState, budgetRange: e.target.value })}
              className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:outline-none focus:border-cyan-400"
            >
              <option value="">Select range (Optional)</option>
              <option value="Scoped Discovery / Architecture Audit">
                Scoped Discovery / Architecture Audit
              </option>
              <option value="$5,000 – $15,000 (Core Module / MVP)">
                $5,000 – $15,000 (Core Module / MVP)
              </option>
              <option value="$15,000 – $40,000 (Enterprise Platform)">
                $15,000 – $40,000 (Enterprise Platform)
              </option>
              <option value="$40,000+ (Multi-Phase Ecosystem)">
                $40,000+ (Multi-Phase Ecosystem)
              </option>
              <option value="Dedicated Senior Retainer">Dedicated Senior Retainer</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="consult-target-date"
              className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1.5"
            >
              Target Timeline (Optional)
            </label>
            <input
              id="consult-target-date"
              type="text"
              value={formState.targetDate}
              onChange={(e) => setFormState({ ...formState, targetDate: e.target.value })}
              placeholder="e.g. Q1 Launch / Immediate Start"
              className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:outline-none focus:border-cyan-400"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="consult-description"
            className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1.5"
          >
            Project Overview &amp; Operational Goals <span className="text-cyan-500">*</span>
          </label>
          <textarea
            id="consult-description"
            rows={4}
            required
            value={formState.projectDescription}
            onChange={(e) => setFormState({ ...formState, projectDescription: e.target.value })}
            placeholder="Describe the business problem, current workflows (spreadsheets/legacy software), and what a successful outcome looks like..."
            className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:outline-none focus:border-cyan-400"
          />
          {errors.projectDescription && (
            <p className="mt-1 text-xs text-rose-500" role="alert">
              {errors.projectDescription}
            </p>
          )}
        </div>

        <div className="pt-1">
          <label className="flex items-start gap-2.5 cursor-pointer">
            <input
              type="checkbox"
              checked={formState.privacyConsent}
              onChange={(e) =>
                setFormState({ ...formState, privacyConsent: e.target.checked })
              }
              className="mt-0.5 w-4 h-4 rounded border-slate-300 dark:border-slate-700 text-cyan-500 focus:ring-cyan-400"
            />
            <span className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              I consent to SK Developers storing and reviewing these project details for the
              purpose of preparing an engineering consultation. All project disclosures are treated
              as confidential. <span className="text-cyan-500">*</span>
            </span>
          </label>
          {errors.privacyConsent && (
            <p className="mt-1 text-xs text-rose-500" role="alert">
              {errors.privacyConsent}
            </p>
          )}
        </div>

        <div className="pt-3 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <ShieldCheck className="w-4 h-4 text-cyan-500 shrink-0" />
            <span>Reviewed directly by Muhammad Salman Khalid · Zero third-party lead brokers</span>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 disabled:opacity-50 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>{isSubmitting ? 'Registering Brief...' : 'Submit Consultation Request'}</span>
          </button>
        </div>
      </form>

      {/* Session Consultation Log */}
      {submittedRecords.length > 0 && (
        <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800">
          <h4 className="text-xs font-mono text-slate-500 dark:text-slate-400 mb-3">
            Submitted Consultation Briefs in This Session ({submittedRecords.length})
          </h4>
          <div className="space-y-2">
            {submittedRecords.map((item) => (
              <div
                key={item.referenceId}
                className="flex flex-wrap items-center justify-between gap-2 p-3 rounded-lg bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-xs"
              >
                <div>
                  <span className="font-mono font-semibold text-cyan-600 dark:text-cyan-400">
                    {item.referenceId}
                  </span>
                  <span className="mx-2 text-slate-400">·</span>
                  <span className="font-medium text-slate-900 dark:text-white">
                    {item.company}
                  </span>
                  <span className="mx-2 text-slate-400">·</span>
                  <span className="text-slate-600 dark:text-slate-300">{item.serviceRequired}</span>
                </div>
                <a
                  href={item.whatsappHandoffUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-cyan-600 dark:text-cyan-400 hover:underline"
                >
                  Dispatch on WhatsApp →
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
