import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Code2,
  Cpu,
  ExternalLink,
  FileCode,
  Globe,
  Layers,
  Lock,
  MessageSquare,
  Server,
  ShieldCheck,
  Terminal,
} from 'lucide-react';
import {
  ADDITIONAL_CAPABILITIES,
  ARTICLES_REGISTRY,
  INDUSTRIES_REGISTRY,
  PROJECTS_REGISTRY,
  SERVICES_REGISTRY,
  SITE_SETTINGS,
} from '../data/registry';
import { buildWhatsAppUrl } from '../utils/engine';
import { ProjectImageWithFallback } from './ProjectExplorer';
import { ConsultationForm } from './ConsultationForm';

interface ViewNavProps {
  onNavigate: (path: string) => void;
}

export const BreadcrumbBar: React.FC<{
  items: { name: string; path: string }[];
  onNavigate: (path: string) => void;
}> = ({ items, onNavigate }) => (
  <nav
    aria-label="Breadcrumb"
    className="border-b border-slate-200 dark:border-slate-800/80 bg-slate-50/70 dark:bg-[#0B0E14]"
  >
    <div className="max-w-7xl mx-auto px-6 py-3 flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
      {items.map((item, idx) => {
        const isLast = idx === items.length - 1;
        return (
          <React.Fragment key={item.path + idx}>
            {idx > 0 && <span aria-hidden="true">/</span>}
            {isLast ? (
              <span className="font-medium text-slate-900 dark:text-slate-200 truncate max-w-xs">
                {item.name}
              </span>
            ) : (
              <button
                type="button"
                onClick={() => onNavigate(item.path)}
                className="hover:text-cyan-500 transition-colors cursor-pointer"
              >
                {item.name}
              </button>
            )}
          </React.Fragment>
        );
      })}
    </div>
  </nav>
);

export const ServicesOverviewSection: React.FC<ViewNavProps & { isStandalonePage?: boolean }> = ({
  onNavigate,
  isStandalonePage = false,
}) => {
  return (
    <section
      aria-label="SK Developers Engineering Services"
      className="py-16 lg:py-24 border-b border-slate-200 dark:border-slate-800/80"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-600 dark:text-cyan-400">
            <span>CORE ENGINEERING CAPABILITIES</span>
            <span aria-hidden="true">·</span>
            <span>ENTERPRISE GRADE</span>
          </div>
          {isStandalonePage ? (
            <h1 className="mt-2 font-display text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
              Software Engineering Services Built Around Operational Reliability.
            </h1>
          ) : (
            <h2 className="mt-2 font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
              Enterprise Software, AI Automation &amp; Production Infrastructure
            </h2>
          )}
          <p className="mt-4 text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            We do not sell generic templates or fragile low-code prototypes. Every engagement is
            architected around relational data integrity, clear API contracts, and maintainable
            production infrastructure.
          </p>
        </div>

        {/* Asymmetric Editorial Service Grid */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {SERVICES_REGISTRY.map((service, idx) => {
            const isWide = idx === 0 || idx === 3;
            return (
              <article
                key={service.slug}
                className={`${
                  isWide ? 'lg:col-span-7' : 'lg:col-span-5'
                } rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0D1117] p-6 sm:p-8 flex flex-col justify-between hover:border-cyan-500/50 transition-colors`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
                    <span className="text-cyan-600 dark:text-cyan-400 font-semibold">
                      {service.indexNumber}. {service.shortTitle}
                    </span>
                    <span>{service.technologies.slice(0, 3).join(' · ')}</span>
                  </div>

                  <h3 className="mt-3 font-display text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                    {service.title}
                  </h3>

                  <p className="mt-2.5 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {service.summary}
                  </p>

                  <ul className="mt-5 space-y-2 pt-4 border-t border-slate-100 dark:border-slate-800/80">
                    {service.systemsWeBuild.slice(0, 3).map((item) => (
                      <li
                        key={item}
                        className="text-xs text-slate-600 dark:text-slate-300 flex items-start gap-2"
                      >
                        <span className="font-mono text-cyan-500">·</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-4">
                  <button
                    type="button"
                    onClick={() => onNavigate(`/services/${service.slug}`)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-600 dark:text-cyan-400 hover:underline cursor-pointer"
                  >
                    <span>Explore {service.shortTitle} Architecture</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <a
                    href={buildWhatsAppUrl({
                      service: service.title,
                      pagePath: `/services/${service.slug}`,
                    })}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-slate-500 dark:text-slate-400 hover:text-cyan-400"
                  >
                    Inquire →
                  </a>
                </div>
              </article>
            );
          })}
        </div>

        {/* Additional Specialized Capabilities (07, 08, 09) */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {ADDITIONAL_CAPABILITIES.map((cap) => (
            <div
              key={cap.number}
              className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-[#0B0E14] p-6"
            >
              <div className="text-xs font-mono text-cyan-600 dark:text-cyan-400">
                {cap.number}. Specialized Capability
              </div>
              <h3 className="mt-2 font-display text-lg font-bold text-slate-900 dark:text-white">
                {cap.title}
              </h3>
              <p className="mt-2 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {cap.summary}
              </p>
              <div className="mt-4 pt-3 border-t border-slate-200/80 dark:border-slate-800 text-xs font-mono text-slate-500 dark:text-slate-400">
                {cap.stack.join(' · ')}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const FounderSpotlightSection: React.FC<
  ViewNavProps & { isStandalonePage?: boolean }
> = ({ onNavigate, isStandalonePage = false }) => {
  const { founder } = SITE_SETTINGS;

  return (
    <section
      aria-label="Founder and Principal Architect Profile"
      className="py-16 lg:py-24 border-b border-slate-200 dark:border-slate-800/80"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left 7 Columns: Upwork-Ready Founder Narrative */}
          <div className="lg:col-span-7">
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-cyan-600 dark:text-cyan-400">
              <span>PRINCIPAL ARCHITECT &amp; FOUNDER</span>
              <span aria-hidden="true">·</span>
              <span>{founder.experienceYears} EXPERIENCE</span>
              <span aria-hidden="true">·</span>
              <span>UPWORK &amp; DIRECT ENTERPRISE PARTNER</span>
            </div>

            {isStandalonePage ? (
              <h1 className="mt-3 font-display text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
                {founder.name}
              </h1>
            ) : (
              <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
                Led by {founder.name} — Senior Software, AI &amp; DevOps Architect
              </h2>
            )}

            <p className="mt-2 text-sm font-mono text-slate-500 dark:text-slate-400">
              {founder.title}
            </p>

            <div className="mt-6 space-y-4 text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              {founder.introParagraphs.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            {/* Core Positioning Statement without thick left border cliché */}
            <blockquote className="mt-8 p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0D1117]">
              <p className="font-display text-lg sm:text-xl font-semibold text-slate-900 dark:text-white">
                “{founder.coreQuote}”
              </p>
              <footer className="mt-2 text-xs font-mono text-slate-500 dark:text-slate-400">
                — {founder.name}, Founder of SK Developers (skdevelopers.info)
              </footer>
            </blockquote>

            {/* Why Clients on Upwork & International B2B Choose SK Developers */}
            <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-800">
              <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white">
                Why Technical Founders, CTOs &amp; Upwork Clients Engage Salman Directly
              </h3>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0D1117]">
                  <div className="text-xs font-mono text-cyan-600 dark:text-cyan-400">
                    01. Direct Senior Engineering
                  </div>
                  <p className="mt-1 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    No bait-and-switch account managers. Your database schema, API security, and
                    production infrastructure are designed directly by a 15+ year architect.
                  </p>
                </div>
                <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0D1117]">
                  <div className="text-xs font-mono text-cyan-600 dark:text-cyan-400">
                    02. Verifiable Live Ecosystem
                  </div>
                  <p className="mt-1 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    Inspect real platforms we engineer and operate: skos.cloud (ERP), callify.pro
                    (AI Voice), everestbuy.pk (Commerce), and drivenow.live / drivenow.pk.
                  </p>
                </div>
                <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0D1117]">
                  <div className="text-xs font-mono text-cyan-600 dark:text-cyan-400">
                    03. Full-Lifecycle Ownership
                  </div>
                  <p className="mt-1 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    From PostgreSQL ledger design and Laravel/FastAPI backends to Next.js UI and
                    hardened Docker/VPS CI/CD—one cohesive architecture.
                  </p>
                </div>
                <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0D1117]">
                  <div className="text-xs font-mono text-cyan-600 dark:text-cyan-400">
                    04. Transparent Governance
                  </div>
                  <p className="mt-1 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    Clean Git workflows, staging previews prior to production cutover, strict NDA
                    compliance, and honest milestone reporting.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <button
                type="button"
                onClick={() => onNavigate('/contact')}
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors cursor-pointer"
              >
                <span>Schedule Architectural Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={buildWhatsAppUrl({
                  subject: 'Direct Consultation with Muhammad Salman Khalid',
                  pagePath: isStandalonePage ? '/founder' : '/',
                })}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-3 text-xs font-semibold text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 hover:border-cyan-400 rounded-lg transition-colors"
              >
                <MessageSquare className="w-4 h-4 text-cyan-500" />
                <span>WhatsApp Salman ({SITE_SETTINGS.contact.whatsappDisplay})</span>
              </a>

              {!isStandalonePage && (
                <button
                  type="button"
                  onClick={() => onNavigate('/founder')}
                  className="px-4 py-3 text-xs font-semibold text-cyan-600 dark:text-cyan-400 hover:underline cursor-pointer"
                >
                  Full Founder Profile →
                </button>
              )}
            </div>
          </div>

          {/* Right 5 Columns: Technical Specializations & Ecosystem Verification Card */}
          <div className="lg:col-span-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0D1117] p-6 sm:p-8">
            <div className="pb-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs font-mono text-cyan-600 dark:text-cyan-400">
                  ARCHITECTURAL MATRIX
                </span>
                <h3 className="mt-1 font-display text-xl font-bold text-slate-900 dark:text-white">
                  Core Technical Specializations
                </h3>
              </div>
              <Code2 className="w-5 h-5 text-cyan-500 shrink-0" />
            </div>

            <ul className="mt-5 space-y-2.5">
              {founder.specializations.map((spec, idx) => (
                <li
                  key={spec}
                  className="flex items-center justify-between gap-2 text-xs py-1.5 border-b border-slate-100 dark:border-slate-800/70"
                >
                  <span className="font-medium text-slate-800 dark:text-slate-200">{spec}</span>
                  <span className="font-mono text-slate-400 tabular-nums">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-6 pt-5 border-t border-slate-200 dark:border-slate-800">
              <h4 className="text-xs font-mono text-slate-500 dark:text-slate-400 mb-3">
                Verified SK Developers Domain Portfolio
              </h4>
              <div className="space-y-2">
                {SITE_SETTINGS.ecosystemDomains.map((dom) => (
                  <a
                    key={dom.domain}
                    href={dom.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between gap-2 p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 hover:border-cyan-400 text-xs transition-colors"
                  >
                    <div>
                      <span className="font-mono font-semibold text-slate-900 dark:text-white">
                        {dom.domain}
                      </span>
                      <span className="mx-1.5 text-slate-400">·</span>
                      <span className="text-slate-500 dark:text-slate-400">{dom.role}</span>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const ServiceDetailView: React.FC<{
  slug: string;
  onNavigate: (path: string) => void;
}> = ({ slug, onNavigate }) => {
  const service = SERVICES_REGISTRY.find((s) => s.slug === slug);

  if (!service) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-20 text-center">
        <h1 className="font-display text-3xl font-bold text-slate-900 dark:text-white">
          Service Not Found
        </h1>
        <button
          type="button"
          onClick={() => onNavigate('/services')}
          className="mt-6 px-5 py-2.5 text-xs font-semibold text-slate-950 bg-cyan-400 rounded-lg cursor-pointer"
        >
          Return to All Services
        </button>
      </div>
    );
  }

  const relatedProjects = PROJECTS_REGISTRY.filter((p) =>
    service.relatedProjectSlugs.includes(p.slug)
  );

  return (
    <div>
      <BreadcrumbBar
        items={[
          { name: 'Home', path: '/' },
          { name: 'Services', path: '/services' },
          { name: service.title, path: `/services/${service.slug}` },
        ]}
        onNavigate={onNavigate}
      />

      <section className="py-14 lg:py-20 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-600 dark:text-cyan-400">
            <span>SERVICE ARCHITECTURE {service.indexNumber}</span>
            <span aria-hidden="true">·</span>
            <span>{service.technologies.join(' · ')}</span>
          </div>

          <h1 className="mt-3 font-display text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white max-w-4xl">
            {service.headline}
          </h1>

          <p className="mt-5 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
            {service.summary}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3.5">
            <a
              href="#service-consultation"
              className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors"
            >
              <span>Request {service.shortTitle} Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href={buildWhatsAppUrl({
                service: service.title,
                subject: `${service.title} Inquiry`,
                pagePath: `/services/${service.slug}`,
              })}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-3 text-xs font-semibold text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 hover:border-cyan-400 rounded-lg transition-colors"
            >
              <MessageSquare className="w-4 h-4 text-cyan-500" />
              <span>Discuss {service.shortTitle} on WhatsApp</span>
            </a>
          </div>
        </div>
      </section>

      {/* Commercial Intent Breakdown: Problem, Audience, Systems We Build & Reliability */}
      <section className="py-14 lg:py-20 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-6 space-y-8">
            <div className="p-6 sm:p-8 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0D1117]">
              <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white">
                1. What Business Problem Does This Solve?
              </h2>
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {service.businessProblemSolved}
              </p>
            </div>

            <div className="p-6 sm:p-8 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0D1117]">
              <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white">
                2. Who Is This Engineered For?
              </h2>
              <ul className="mt-4 space-y-2.5">
                {service.targetAudience.map((aud) => (
                  <li
                    key={aud}
                    className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-slate-300"
                  >
                    <CheckCircle2 className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
                    <span>{aud}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-8">
            <div className="p-6 sm:p-8 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0D1117]">
              <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white">
                3. What Systems Can SK Developers Build?
              </h2>
              <ul className="mt-4 space-y-2.5">
                {service.systemsWeBuild.map((sys) => (
                  <li
                    key={sys}
                    className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-slate-300"
                  >
                    <span className="font-mono text-cyan-500 font-bold">+</span>
                    <span>{sys}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-6 sm:p-8 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0D1117]">
              <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white">
                4. Engineering Practices That Guarantee Reliability
              </h2>
              <ul className="mt-4 space-y-2.5">
                {service.reliabilityPractices.map((prac) => (
                  <li
                    key={prac}
                    className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-slate-300"
                  >
                    <ShieldCheck className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
                    <span>{prac}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Engagement Process */}
      <section className="py-14 lg:py-20 border-b border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-[#0B0E14]">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            5. What the Engagement Process Involves
          </h2>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.engagementProcess.map((step) => (
              <div
                key={step.step}
                className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0D1117]"
              >
                <div className="text-xs font-mono text-cyan-600 dark:text-cyan-400">
                  {step.step}
                </div>
                <h3 className="mt-2 font-display text-base font-bold text-slate-900 dark:text-white">
                  {step.title}
                </h3>
                <p className="mt-2 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {step.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Verified Work */}
      <section className="py-14 lg:py-20 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            6. Relevant SK Developers Systems &amp; Engineering Work
          </h2>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedProjects.map((proj) => (
              <div
                key={proj.slug}
                className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0D1117] flex flex-col justify-between"
              >
                <div>
                  <div className="text-xs font-mono text-cyan-600 dark:text-cyan-400">
                    {proj.status} · {proj.classification}
                  </div>
                  <h3 className="mt-2 font-display text-lg font-bold text-slate-900 dark:text-white">
                    {proj.name}
                  </h3>
                  <p className="mt-2 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {proj.summary}
                  </p>
                </div>
                <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => onNavigate(`/projects/${proj.slug}`)}
                    className="text-xs font-semibold text-cyan-600 dark:text-cyan-400 hover:underline cursor-pointer"
                  >
                    Inspect Project →
                  </button>
                  {proj.publicWebsite && (
                    <a
                      href={proj.publicWebsite}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono text-slate-500 hover:text-cyan-400"
                    >
                      {proj.publicWebsite.replace('https://', '')} ↗
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contextual Lead Capture */}
      <section id="service-consultation" className="py-14 lg:py-20">
        <div className="max-w-4xl mx-auto px-6">
          <ConsultationForm
            sourcePage={`/services/${service.slug}`}
            initialService={service.title}
          />
        </div>
      </section>
    </div>
  );
};

export const ProjectDetailView: React.FC<{
  slug: string;
  onNavigate: (path: string) => void;
}> = ({ slug, onNavigate }) => {
  const project = PROJECTS_REGISTRY.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-20 text-center">
        <h1 className="font-display text-3xl font-bold text-slate-900 dark:text-white">
          Project Record Not Found
        </h1>
        <button
          type="button"
          onClick={() => onNavigate('/projects')}
          className="mt-6 px-5 py-2.5 text-xs font-semibold text-slate-950 bg-cyan-400 rounded-lg cursor-pointer"
        >
          Back to Project Explorer
        </button>
      </div>
    );
  }

  return (
    <div>
      <BreadcrumbBar
        items={[
          { name: 'Home', path: '/' },
          { name: 'Selected Projects', path: '/projects' },
          { name: project.name, path: `/projects/${project.slug}` },
        ]}
        onNavigate={onNavigate}
      />

      <section className="py-14 lg:py-20 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-6">
          <button
            type="button"
            onClick={() => onNavigate('/projects')}
            className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-500 dark:text-slate-400 hover:text-cyan-400 mb-6 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Project Explorer</span>
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-7">
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-cyan-600 dark:text-cyan-400">
                <span>STATUS: {project.status}</span>
                <span aria-hidden="true">·</span>
                <span>{project.classification}</span>
                <span aria-hidden="true">·</span>
                <span>{project.industry}</span>
              </div>

              <h1 className="mt-3 font-display text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
                {project.name}
              </h1>

              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{project.category}</p>

              <p className="mt-5 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                {project.summary}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                {project.publicWebsite && (
                  <a
                    href={project.publicWebsite}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors"
                  >
                    <span>Visit Public Domain ({project.publicWebsite.replace('https://', '')})</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}

                {project.secondaryWebsites?.map((secUrl) => (
                  <a
                    key={secUrl}
                    href={secUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-mono text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 hover:border-cyan-400 rounded-lg transition-colors"
                  >
                    <span>{secUrl.replace('https://', '')}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ))}

                <a
                  href={buildWhatsAppUrl({
                    subject: `Project Reference Inquiry: ${project.name}`,
                    pagePath: `/projects/${project.slug}`,
                  })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 hover:border-cyan-400 rounded-lg transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-cyan-500" />
                  <span>Build a Similar System</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800">
              <ProjectImageWithFallback project={project} className="h-64 sm:h-72" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 lg:py-20 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-8">
            <div className="p-6 sm:p-8 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0D1117]">
              <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white">
                Operational &amp; Business Problem
              </h2>
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {project.businessProblem}
              </p>
            </div>

            <div className="p-6 sm:p-8 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0D1117]">
              <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white">
                Engineered Solution &amp; Architecture
              </h2>
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {project.solutionArchitecture}
              </p>

              <h3 className="mt-6 text-xs font-mono text-slate-500 dark:text-slate-400">
                Key Architectural &amp; Workflow Highlights
              </h3>
              <ul className="mt-3 space-y-2.5">
                {project.engineeringHighlights.map((hl) => (
                  <li
                    key={hl}
                    className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-slate-300"
                  >
                    <CheckCircle2 className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
                    <span>{hl}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-6">
            <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0D1117]">
              <h3 className="text-xs font-mono text-slate-500 dark:text-slate-400">
                Technology Stack
              </h3>
              <div className="mt-3 text-sm font-mono text-slate-800 dark:text-cyan-300 leading-relaxed">
                {project.technologies.join(' · ')}
              </div>
            </div>

            <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0B0E14]">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-700 dark:text-slate-300">
                <Lock className="w-3.5 h-3.5 text-cyan-500" />
                <span>Publication &amp; Credibility Governance</span>
              </div>
              <p className="mt-2.5 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {project.confidentialityNote}
              </p>
              <p className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
                {project.substantiatedNotes}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 lg:py-20">
        <div className="max-w-4xl mx-auto px-6">
          <ConsultationForm
            sourcePage={`/projects/${project.slug}`}
            initialBrief={`We reviewed the ${project.name} (${project.status}) architecture and want to discuss a related system.`}
          />
        </div>
      </section>
    </div>
  );
};

export const IndustriesOverviewSection: React.FC<
  ViewNavProps & { isStandalonePage?: boolean }
> = ({ onNavigate, isStandalonePage = false }) => (
  <section
    aria-label="Industries Served by SK Developers"
    className="py-16 lg:py-24 border-b border-slate-200 dark:border-slate-800/80"
  >
    <div className="max-w-7xl mx-auto px-6">
      <div className="max-w-3xl">
        <div className="text-xs font-mono text-cyan-600 dark:text-cyan-400">
          INDUSTRY VERTICALS · DOMAIN DEPTH
        </div>
        {isStandalonePage ? (
          <h1 className="mt-2 font-display text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
            Industry-Specific Engineering for Complex Operations.
          </h1>
        ) : (
          <h2 className="mt-2 font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            Engineered for High-Accountability Industries
          </h2>
        )}
        <p className="mt-3 text-base text-slate-600 dark:text-slate-300">
          Software succeeds when its data model reflects the real-world rules of your industry—from
          construction site BOQs and wholesale khata ledgers to geospatial ride dispatch.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {INDUSTRIES_REGISTRY.map((ind, idx) => (
          <article
            key={ind.slug}
            className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0D1117] p-6 flex flex-col justify-between hover:border-cyan-500/50 transition-colors"
          >
            <div>
              <div className="text-xs font-mono text-cyan-600 dark:text-cyan-400">
                0{idx + 1} · {ind.shortTitle}
              </div>
              <h3 className="mt-2 font-display text-xl font-bold text-slate-900 dark:text-white">
                {ind.title}
              </h3>
              <p className="mt-2 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {ind.summary}
              </p>

              <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 mb-2">
                  Key Engineered Modules:
                </div>
                <div className="text-xs text-slate-700 dark:text-slate-300">
                  {ind.keyModules.slice(0, 4).join(' · ')}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <button
                type="button"
                onClick={() => onNavigate(`/industries/${ind.slug}`)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-600 dark:text-cyan-400 hover:underline cursor-pointer"
              >
                <span>Explore {ind.shortTitle} Solutions</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export const IndustryDetailView: React.FC<{
  slug: string;
  onNavigate: (path: string) => void;
}> = ({ slug, onNavigate }) => {
  const industry = INDUSTRIES_REGISTRY.find((i) => i.slug === slug);

  if (!industry) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-20 text-center">
        <h1 className="font-display text-3xl font-bold text-slate-900 dark:text-white">
          Industry Page Not Found
        </h1>
        <button
          type="button"
          onClick={() => onNavigate('/industries')}
          className="mt-6 px-5 py-2.5 text-xs font-semibold text-slate-950 bg-cyan-400 rounded-lg cursor-pointer"
        >
          View All Industries
        </button>
      </div>
    );
  }

  const relatedProjects = PROJECTS_REGISTRY.filter((p) =>
    industry.relatedProjectSlugs.includes(p.slug)
  );

  return (
    <div>
      <BreadcrumbBar
        items={[
          { name: 'Home', path: '/' },
          { name: 'Industries', path: '/industries' },
          { name: industry.title, path: `/industries/${industry.slug}` },
        ]}
        onNavigate={onNavigate}
      />

      <section className="py-14 lg:py-20 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-xs font-mono text-cyan-600 dark:text-cyan-400">
            INDUSTRY ARCHITECTURE · {industry.shortTitle.toUpperCase()}
          </div>
          <h1 className="mt-3 font-display text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white max-w-4xl">
            {industry.headline}
          </h1>
          <p className="mt-5 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
            {industry.summary}
          </p>
        </div>
      </section>

      <section className="py-14 lg:py-20 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="p-6 sm:p-8 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0D1117]">
            <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white">
              Operational Challenges in {industry.shortTitle}
            </h2>
            <ul className="mt-4 space-y-3">
              {industry.operationalChallenges.map((ch) => (
                <li
                  key={ch}
                  className="text-sm text-slate-600 dark:text-slate-300 flex items-start gap-2.5"
                >
                  <span className="font-mono text-amber-500">·</span>
                  <span>{ch}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-6 sm:p-8 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0D1117]">
            <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white">
              How SK Developers Engineers the Solution
            </h2>
            <ul className="mt-4 space-y-3">
              {industry.engineeredSolutions.map((sol) => (
                <li
                  key={sol}
                  className="text-sm text-slate-600 dark:text-slate-300 flex items-start gap-2.5"
                >
                  <CheckCircle2 className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
                  <span>{sol}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 mt-8">
          <div className="p-6 sm:p-8 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0B0E14]">
            <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white">
              Core Modules &amp; Related SK Developers Work
            </h3>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {relatedProjects.map((proj) => (
                <div
                  key={proj.slug}
                  className="p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0D1117]"
                >
                  <div className="text-xs font-mono text-cyan-600 dark:text-cyan-400">
                    {proj.status}
                  </div>
                  <div className="mt-1 font-display font-bold text-slate-900 dark:text-white">
                    {proj.name}
                  </div>
                  <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">
                    {proj.valueProposition}
                  </p>
                  <button
                    type="button"
                    onClick={() => onNavigate(`/projects/${proj.slug}`)}
                    className="mt-3 text-xs font-semibold text-cyan-500 hover:underline cursor-pointer"
                  >
                    Inspect Architecture →
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 lg:py-20">
        <div className="max-w-4xl mx-auto px-6">
          <ConsultationForm
            sourcePage={`/industries/${industry.slug}`}
            initialBrief={`Industry Inquiry: ${industry.title}`}
          />
        </div>
      </section>
    </div>
  );
};

export const InsightsSection: React.FC<ViewNavProps & { isStandalonePage?: boolean }> = ({
  onNavigate,
  isStandalonePage = false,
}) => {
  const [showDrafts, setShowDrafts] = useState(false);

  const visibleArticles = ARTICLES_REGISTRY.filter(
    (a) => showDrafts || a.publicationState === 'PUBLISHED'
  );

  return (
    <section
      aria-label="Engineering Insights and Architectural Articles"
      className="py-16 lg:py-24 border-b border-slate-200 dark:border-slate-800/80"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-10 border-b border-slate-200 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-600 dark:text-cyan-400">
              <BookOpen className="w-3.5 h-3.5" />
              <span>ENGINEERING INSIGHTS</span>
              <span aria-hidden="true">·</span>
              <span>AUTHORED BY MUHAMMAD SALMAN KHALID</span>
            </div>
            {isStandalonePage ? (
              <h1 className="mt-2 font-display text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
                Engineering Insights &amp; Architectural Notes.
              </h1>
            ) : (
              <h2 className="mt-2 font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
                Technical Writing on ERP, FinTech Ledgers, AI &amp; DevOps
              </h2>
            )}
            <p className="mt-3 text-base text-slate-600 dark:text-slate-300 max-w-2xl">
              Practical lessons from over 15 years of designing relational schemas, multi-tenant
              SaaS platforms, and production Linux infrastructure.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowDrafts((d) => !d)}
            className="px-3.5 py-2 text-xs font-mono border border-slate-300 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-300 hover:border-cyan-400 whitespace-nowrap shrink-0 cursor-pointer"
          >
            {showDrafts ? 'Showing Published + Editorial Drafts (8)' : 'Show Editorial Drafts (+1)'}
          </button>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          {visibleArticles.map((article) => (
            <article
              key={article.slug}
              className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0D1117] p-6 sm:p-7 flex flex-col justify-between hover:border-cyan-500/50 transition-colors"
            >
              <div>
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
                  <span className="text-cyan-600 dark:text-cyan-400">{article.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{article.publishedAt}</span>
                  <span aria-hidden="true">·</span>
                  <span>{article.readingTime}</span>
                  {article.publicationState === 'DRAFT' && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span className="text-amber-500">EDITORIAL DRAFT</span>
                    </>
                  )}
                </div>

                <h3 className="mt-2.5 font-display text-xl font-bold text-slate-900 dark:text-white">
                  {article.title}
                </h3>

                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {article.summary}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  By {article.author}
                </span>
                <button
                  type="button"
                  onClick={() => onNavigate(`/insights/${article.slug}`)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-600 dark:text-cyan-400 hover:underline cursor-pointer"
                >
                  <span>Read Full Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export const ArticleDetailView: React.FC<{
  slug: string;
  onNavigate: (path: string) => void;
}> = ({ slug, onNavigate }) => {
  const article = ARTICLES_REGISTRY.find((a) => a.slug === slug);

  if (!article) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-20 text-center">
        <h1 className="font-display text-3xl font-bold text-slate-900 dark:text-white">
          Article Not Found
        </h1>
        <button
          type="button"
          onClick={() => onNavigate('/insights')}
          className="mt-6 px-5 py-2.5 text-xs font-semibold text-slate-950 bg-cyan-400 rounded-lg cursor-pointer"
        >
          Back to Insights
        </button>
      </div>
    );
  }

  return (
    <div>
      <BreadcrumbBar
        items={[
          { name: 'Home', path: '/' },
          { name: 'Insights', path: '/insights' },
          { name: article.title, path: `/insights/${article.slug}` },
        ]}
        onNavigate={onNavigate}
      />

      <article className="py-14 lg:py-20 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-3xl mx-auto px-6">
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
            <span className="text-cyan-600 dark:text-cyan-400">{article.category}</span>
            <span aria-hidden="true">·</span>
            <time dateTime={article.publishedAt}>Published {article.publishedAt}</time>
            <span aria-hidden="true">·</span>
            <span>{article.readingTime}</span>
            <span aria-hidden="true">·</span>
            <span>Status: {article.publicationState}</span>
          </div>

          <h1 className="mt-3 font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
            {article.title}
          </h1>

          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            {article.subtitle}
          </p>

          <div className="mt-6 py-4 border-y border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
            <div>
              <strong className="text-slate-900 dark:text-white">{article.author}</strong>
              <span className="mx-2 text-slate-400">·</span>
              <span className="text-slate-500 dark:text-slate-400">{article.authorRole}</span>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('/founder')}
              className="font-semibold text-cyan-500 hover:underline cursor-pointer"
            >
              Author Bio →
            </button>
          </div>

          {/* Key Takeaways Box */}
          <div className="mt-8 p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0D1117]">
            <h2 className="text-xs font-mono uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
              Architectural Takeaways
            </h2>
            <ul className="mt-3 space-y-2">
              {article.keyTakeaways.map((tk) => (
                <li
                  key={tk}
                  className="text-sm text-slate-700 dark:text-slate-200 flex items-start gap-2.5"
                >
                  <CheckCircle2 className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
                  <span>{tk}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Article Body Sections */}
          <div className="mt-10 space-y-10">
            {article.sections.map((sec) => (
              <section key={sec.heading} className="space-y-4">
                <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
                  {sec.heading}
                </h2>
                {sec.paragraphs.map((p, idx) => (
                  <p
                    key={idx}
                    className="text-base text-slate-700 dark:text-slate-300 leading-relaxed"
                  >
                    {p}
                  </p>
                ))}
                {sec.codeSnippet && (
                  <div className="mt-4 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-950 text-slate-100">
                    <div className="px-4 py-2 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
                      <span>{sec.codeSnippet.caption}</span>
                      <span>{sec.codeSnippet.language}</span>
                    </div>
                    <pre className="p-4 text-xs font-mono overflow-x-auto leading-relaxed">
                      <code>{sec.codeSnippet.code}</code>
                    </pre>
                  </div>
                )}
              </section>
            ))}
          </div>
        </div>
      </article>

      <section className="py-14 lg:py-20">
        <div className="max-w-4xl mx-auto px-6">
          <ConsultationForm
            sourcePage={`/insights/${article.slug}`}
            initialBrief={`Read "${article.title}" and would like to discuss applying these architectural patterns.`}
          />
        </div>
      </section>
    </div>
  );
};

export const AboutView: React.FC<ViewNavProps> = ({ onNavigate }) => (
  <div>
    <BreadcrumbBar
      items={[
        { name: 'Home', path: '/' },
        { name: 'About SK Developers', path: '/about' },
      ]}
      onNavigate={onNavigate}
    />

    <section className="py-16 lg:py-24 border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-xs font-mono text-cyan-600 dark:text-cyan-400">
          ABOUT SK DEVELOPERS · SKDEVELOPERS.INFO
        </div>
        <h1 className="mt-3 font-display text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white max-w-4xl">
          Engineering Discipline for Business-Critical Software.
        </h1>
        <p className="mt-5 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
          SK Developers is a software engineering, AI automation, multi-tenant SaaS, enterprise
          ERP, and cloud infrastructure practice founded by Senior Software Architect{' '}
          <strong className="text-slate-900 dark:text-white">Muhammad Salman Khalid</strong>. We
          partner with CEOs, CTOs, startup founders, property developers, and trading enterprises
          to build systems that endure.
        </p>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0D1117]">
            <div className="text-xs font-mono text-cyan-600 dark:text-cyan-400">
              01 · Architecture First
            </div>
            <h2 className="mt-2 font-display text-lg font-bold text-slate-900 dark:text-white">
              Relational &amp; Transactional Rigor
            </h2>
            <p className="mt-2 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Whether building an ERP on SKOS Cloud or a financial ledger, we design normalized
              PostgreSQL schemas, idempotent APIs, and strict audit trails before building UI
              screens.
            </p>
          </div>

          <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0D1117]">
            <div className="text-xs font-mono text-cyan-600 dark:text-cyan-400">
              02 · Dual Product &amp; Client DNA
            </div>
            <h2 className="mt-2 font-display text-lg font-bold text-slate-900 dark:text-white">
              Operators of Our Own Platforms
            </h2>
            <p className="mt-2 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Unlike agencies that hand over untested code, we engineer and operate our own product
              initiatives (skos.cloud, callify.pro, everestbuy.pk), bringing product-owner
              accountability to every client engagement.
            </p>
          </div>

          <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0D1117]">
            <div className="text-xs font-mono text-cyan-600 dark:text-cyan-400">
              03 · Credibility Governance
            </div>
            <h2 className="mt-2 font-display text-lg font-bold text-slate-900 dark:text-white">
              Zero Fabricated Claims
            </h2>
            <p className="mt-2 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              We earn trust through verifiable software architecture, transparent project status
              labels, and strict respect for client NDAs—never fake counters or invented awards.
            </p>
          </div>
        </div>
      </div>
    </section>

    <FounderSpotlightSection onNavigate={onNavigate} />
  </div>
);

export const DeploymentRunbookView: React.FC<ViewNavProps> = ({ onNavigate }) => {
  return (
    <div>
      <BreadcrumbBar
        items={[
          { name: 'Home', path: '/' },
          { name: 'Deployment & DevOps Runbook', path: '/deployment' },
        ]}
        onNavigate={onNavigate}
      />

      <section className="py-14 lg:py-20 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-600 dark:text-cyan-400">
            <Server className="w-4 h-4" />
            <span>SELF-HOSTED CONTABO 12GB RAM VPS · VIRTUALMIN LOOPBACK REVERSE PROXY</span>
          </div>
          <h1 className="mt-3 font-display text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white max-w-4xl">
            Production Docker, GitHub CI/CD &amp; Virtualmin Deployment Runbook.
          </h1>
          <p className="mt-4 text-base text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
            Engineered specifically for SK Developers’ self-hosted Contabo 12GB RAM Linux VPS
            running Virtualmin. The container binds strictly to a private loopback port (
            <code className="font-mono text-cyan-500">127.0.0.1:3080:3000</code>) behind the
            existing Virtualmin Apache/Nginx reverse proxy—never altering DNS, mail, firewall, or
            existing virtual servers.
          </p>

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Dockerfile & Compose */}
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0D1117] p-6">
              <div className="flex items-center justify-between text-xs font-mono text-cyan-600 dark:text-cyan-400 mb-3">
                <span className="flex items-center gap-1.5">
                  <FileCode className="w-4 h-4" />
                  <span>1. docker-compose.production.yml (Loopback Bound)</span>
                </span>
                <span>Port 127.0.0.1:3080</span>
              </div>
              <pre className="p-4 rounded-lg bg-slate-950 text-slate-100 text-xs font-mono overflow-x-auto leading-relaxed">
                <code>{`services:
  skdevelopers-web:
    build:
      context: .
      dockerfile: Dockerfile
    image: ghcr.io/skdevelopers/skdevelopers-info:\${IMAGE_TAG:-latest}
    container_name: skdevelopers_prod
    restart: unless-stopped
    user: "1001:1001"
    read_only: true
    tmpfs:
      - /tmp
    ports:
      # CRITICAL: Bind only to loopback so port 3000 is never exposed to internet
      - "127.0.0.1:3080:3000"
    environment:
      - NODE_ENV=production
      - PORT=3000
      - APP_URL=https://skdevelopers.info
    healthcheck:
      test: ["CMD", "wget", "-qO-", "http://127.0.0.1:3000/api/health"]
      interval: 30s
      timeout: 5s
      retries: 3`}</code>
              </pre>
            </div>

            {/* Virtualmin Reverse Proxy & Cutover */}
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0D1117] p-6">
              <div className="flex items-center justify-between text-xs font-mono text-cyan-600 dark:text-cyan-400 mb-3">
                <span className="flex items-center gap-1.5">
                  <Terminal className="w-4 h-4" />
                  <span>2. Virtualmin Non-Destructive Cutover &amp; Rollback</span>
                </span>
                <span>Contabo 12GB VPS</span>
              </div>
              <pre className="p-4 rounded-lg bg-slate-950 text-slate-100 text-xs font-mono overflow-x-auto leading-relaxed">
                <code>{`# Step 1: Verify Staging Container on 127.0.0.1:3081 first
docker compose -f docker-compose.staging.yml up -d --build
curl -fsS http://127.0.0.1:3081/api/health

# Step 2: Build & Start Production Container on 127.0.0.1:3080
export IMAGE_TAG=\$(git rev-parse --short HEAD)
docker compose up -d --build
curl -fsS http://127.0.0.1:3080/api/health

# Step 3: In Virtualmin -> Server Configuration -> Proxy Paths
# Map "/" -> "http://127.0.0.1:3080/" (Preserves SSL, Mail & DNS)

# Instant 30-Second Rollback if needed:
export IMAGE_TAG=<previous_verified_sha>
docker compose up -d`}</code>
              </pre>
            </div>
          </div>

          {/* Verification Checklist */}
          <div className="mt-8 p-6 sm:p-8 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0B0E14]">
            <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white">
              Production Security &amp; Cutover Verification Report
            </h2>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs text-slate-600 dark:text-slate-300">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
                <span>Non-root process execution (`UID 1001`) with `read_only` root filesystem</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
                <span>Loopback-only port binding (`127.0.0.1:3080:3000`); port 3000 closed to WAN</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
                <span>Live `/api/health`, `/sitemap.xml`, and `/robots.txt` endpoints verified</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
                <span>Existing Virtualmin Apache/Nginx TLS, DNS, and Postfix mail untouched</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
                <span>GitHub Actions CI workflow included in `.github/workflows/ci-deploy.yml`</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
                <span>Zero hardcoded secrets; configured via environment variables</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
