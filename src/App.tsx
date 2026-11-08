import React, { useEffect, useState } from 'react';
import { ExternalLink, Menu, MessageSquare, Moon, Sun, X } from 'lucide-react';
import { BrandLogo } from './components/BrandLogo';
import { IntelligenceHero } from './components/IntelligenceHero';
import { ProjectExplorer } from './components/ProjectExplorer';
import { SolutionExplorer } from './components/SolutionExplorer';
import { ConsultationForm } from './components/ConsultationForm';
import {
  AboutView,
  ArticleDetailView,
  BreadcrumbBar,
  DeploymentRunbookView,
  FounderSpotlightSection,
  IndustriesOverviewSection,
  IndustryDetailView,
  InsightsSection,
  ProjectDetailView,
  ServiceDetailView,
  ServicesOverviewSection,
} from './components/RouteViews';
import { INDUSTRIES_REGISTRY, SERVICES_REGISTRY, SITE_SETTINGS } from './data/registry';
import { buildWhatsAppUrl, resolveRouteMetadata } from './utils/engine';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    const initial = window.location.pathname || '/';
    const resolved = resolveRouteMetadata(initial);
    if (resolved.redirectTo) {
      window.history.replaceState({}, '', resolved.redirectTo);
      return resolved.redirectTo;
    }
    return initial;
  });

  const [isDark, setIsDark] = useState<boolean>(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [consultationPrefill, setConsultationPrefill] = useState<{
    brief: string;
    service: string;
  }>({ brief: '', service: '' });

  // Sync dark/light mode class on <html>
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDark]);

  // Listen to browser back/forward navigation
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname || '/';
      const resolved = resolveRouteMetadata(path);
      if (resolved.redirectTo) {
        window.history.replaceState({}, '', resolved.redirectTo);
        setCurrentPath(resolved.redirectTo);
      } else {
        setCurrentPath(path);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Dynamically update document title, meta description, and canonical link per route
  useEffect(() => {
    const meta = resolveRouteMetadata(currentPath);
    document.title = meta.title;

    const descEl = document.querySelector('meta[name="description"]');
    if (descEl) descEl.setAttribute('content', meta.description);

    const ogTitleEl = document.querySelector('meta[property="og:title"]');
    if (ogTitleEl) ogTitleEl.setAttribute('content', meta.title);

    const ogDescEl = document.querySelector('meta[property="og:description"]');
    if (ogDescEl) ogDescEl.setAttribute('content', meta.description);

    const ogUrlEl = document.querySelector('meta[property="og:url"]');
    if (ogUrlEl) ogUrlEl.setAttribute('content', meta.canonicalUrl);

    const canonicalEl = document.querySelector('link[rel="canonical"]');
    if (canonicalEl) canonicalEl.setAttribute('href', meta.canonicalUrl);
  }, [currentPath]);

  const navigate = (rawTargetPath: string) => {
    const resolved = resolveRouteMetadata(rawTargetPath);
    const finalPath = resolved.redirectTo || rawTargetPath;
    if (finalPath !== currentPath) {
      window.history.pushState({}, '', finalPath);
      setCurrentPath(finalPath);
    }
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectBlueprintForConsultation = (brief: string, serviceTitle: string) => {
    setConsultationPrefill({ brief, service: serviceTitle });
    navigate('/contact');
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    navigate(path);
  };

  const cleanPath = currentPath.split('?')[0].replace(/\/+$/, '') || '/';

  const renderMainRoute = () => {
    if (cleanPath === '/') {
      return (
        <>
          <IntelligenceHero onNavigate={navigate} />
          <ProjectExplorer onNavigate={navigate} showSpotlight={true} />
          <SolutionExplorer
            onNavigate={navigate}
            onSelectBlueprintForConsultation={handleSelectBlueprintForConsultation}
          />
          <ServicesOverviewSection onNavigate={navigate} />
          <FounderSpotlightSection onNavigate={navigate} />
          <IndustriesOverviewSection onNavigate={navigate} />
          <InsightsSection onNavigate={navigate} />
          <section
            id="home-consultation"
            aria-label="Request an Architectural Consultation"
            className="py-16 lg:py-24 bg-slate-50/70 dark:bg-[#0B0E14]"
          >
            <div className="max-w-4xl mx-auto px-6">
              <ConsultationForm
                sourcePage="/"
                initialBrief={consultationPrefill.brief}
                initialService={consultationPrefill.service}
              />
            </div>
          </section>
        </>
      );
    }

    if (cleanPath === '/about') {
      return <AboutView onNavigate={navigate} />;
    }

    if (cleanPath === '/founder') {
      return (
        <>
          <BreadcrumbBar
            items={[
              { name: 'Home', path: '/' },
              { name: 'Founder & Leadership', path: '/founder' },
            ]}
            onNavigate={navigate}
          />
          <FounderSpotlightSection onNavigate={navigate} isStandalonePage={true} />
          <section className="py-14 lg:py-20">
            <div className="max-w-4xl mx-auto px-6">
              <ConsultationForm
                sourcePage="/founder"
                initialBrief="Direct inquiry for Muhammad Salman Khalid regarding enterprise architecture / Upwork engagement."
              />
            </div>
          </section>
        </>
      );
    }

    if (cleanPath === '/services') {
      return (
        <>
          <BreadcrumbBar
            items={[
              { name: 'Home', path: '/' },
              { name: 'Services', path: '/services' },
            ]}
            onNavigate={navigate}
          />
          <ServicesOverviewSection onNavigate={navigate} isStandalonePage={true} />
          <SolutionExplorer
            onNavigate={navigate}
            onSelectBlueprintForConsultation={handleSelectBlueprintForConsultation}
          />
        </>
      );
    }

    if (cleanPath.startsWith('/services/')) {
      const slug = cleanPath.replace('/services/', '');
      return <ServiceDetailView slug={slug} onNavigate={navigate} />;
    }

    if (cleanPath === '/projects') {
      return (
        <>
          <BreadcrumbBar
            items={[
              { name: 'Home', path: '/' },
              { name: 'Selected Projects', path: '/projects' },
            ]}
            onNavigate={navigate}
          />
          <div className="pt-10 max-w-7xl mx-auto px-6">
            <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
              Product Ecosystem, Verified Engineering &amp; Strategic Concepts.
            </h1>
          </div>
          <ProjectExplorer onNavigate={navigate} showSpotlight={true} />
        </>
      );
    }

    if (cleanPath.startsWith('/projects/')) {
      const slug = cleanPath.replace('/projects/', '');
      return <ProjectDetailView slug={slug} onNavigate={navigate} />;
    }

    if (cleanPath === '/industries') {
      return (
        <>
          <BreadcrumbBar
            items={[
              { name: 'Home', path: '/' },
              { name: 'Industries', path: '/industries' },
            ]}
            onNavigate={navigate}
          />
          <IndustriesOverviewSection onNavigate={navigate} isStandalonePage={true} />
        </>
      );
    }

    if (cleanPath.startsWith('/industries/')) {
      const slug = cleanPath.replace('/industries/', '');
      return <IndustryDetailView slug={slug} onNavigate={navigate} />;
    }

    if (cleanPath === '/solutions') {
      return (
        <>
          <BreadcrumbBar
            items={[
              { name: 'Home', path: '/' },
              { name: 'Solution Explorer', path: '/solutions' },
            ]}
            onNavigate={navigate}
          />
          <div className="pt-10 max-w-7xl mx-auto px-6">
            <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
              What Do You Want to Build?
            </h1>
          </div>
          <SolutionExplorer
            onNavigate={navigate}
            onSelectBlueprintForConsultation={handleSelectBlueprintForConsultation}
          />
        </>
      );
    }

    if (cleanPath === '/insights') {
      return (
        <>
          <BreadcrumbBar
            items={[
              { name: 'Home', path: '/' },
              { name: 'Insights', path: '/insights' },
            ]}
            onNavigate={navigate}
          />
          <InsightsSection onNavigate={navigate} isStandalonePage={true} />
        </>
      );
    }

    if (cleanPath.startsWith('/insights/')) {
      const slug = cleanPath.replace('/insights/', '');
      return <ArticleDetailView slug={slug} onNavigate={navigate} />;
    }

    if (cleanPath === '/deployment') {
      return <DeploymentRunbookView onNavigate={navigate} />;
    }

    if (cleanPath === '/contact') {
      return (
        <>
          <BreadcrumbBar
            items={[
              { name: 'Home', path: '/' },
              { name: 'Contact & Consultation', path: '/contact' },
            ]}
            onNavigate={navigate}
          />
          <section className="py-14 lg:py-20">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              <div className="lg:col-span-5 space-y-6">
                <div className="text-xs font-mono text-cyan-600 dark:text-cyan-400">
                  DIRECT EXECUTIVE &amp; TECHNICAL CONTACT
                </div>
                <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
                  Discuss Your Project With SK Developers.
                </h1>
                <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                  Every consultation request is reviewed directly by Founder &amp; Senior Software
                  Architect <strong>Muhammad Salman Khalid</strong>. Whether you are scoping an
                  enterprise ERP, a multi-tenant SaaS product, AI workflow automation, or a
                  production cloud migration, we provide honest architectural guidance.
                </p>

                <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0D1117] space-y-4">
                  <div>
                    <div className="text-xs font-mono text-slate-500 dark:text-slate-400">
                      Official Business WhatsApp
                    </div>
                    <a
                      href={SITE_SETTINGS.contact.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 inline-flex items-center gap-2 font-mono text-base font-semibold text-cyan-600 dark:text-cyan-400 hover:underline"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>{SITE_SETTINGS.contact.whatsappDisplay}</span>
                    </a>
                  </div>

                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                    <div className="text-xs font-mono text-slate-500 dark:text-slate-400">
                      Canonical Web &amp; Product Ecosystem
                    </div>
                    <div className="mt-2 space-y-1.5 text-xs font-mono">
                      {SITE_SETTINGS.ecosystemDomains.map((d) => (
                        <div key={d.domain} className="flex items-center justify-between">
                          <a
                            href={d.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-800 dark:text-slate-200 hover:text-cyan-400"
                          >
                            {d.domain}
                          </a>
                          <span className="text-slate-500">{d.status}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7">
                <ConsultationForm
                  sourcePage="/contact"
                  initialBrief={consultationPrefill.brief}
                  initialService={consultationPrefill.service}
                />
              </div>
            </div>
          </section>
        </>
      );
    }

    return (
      <section className="py-24 text-center max-w-2xl mx-auto px-6">
        <div className="text-xs font-mono text-cyan-500">HTTP 404 · ROUTE NOT FOUND</div>
        <h1 className="mt-2 font-display text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
          This Route Does Not Exist on skdevelopers.info
        </h1>
        <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
          Explore our project ecosystem, engineering services, or solution architect below.
        </p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="px-5 py-2.5 text-xs font-semibold text-slate-950 bg-cyan-400 rounded-lg cursor-pointer"
          >
            Return to Homepage
          </button>
          <button
            type="button"
            onClick={() => navigate('/projects')}
            className="px-5 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 rounded-lg cursor-pointer"
          >
            Explore Projects
          </button>
        </div>
      </section>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 dark:bg-[#090B0E] dark:text-slate-100">
      {/* Strict 3-Zone Top Bar Contract */}
      <header className="sticky top-0 z-50 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#090B0E]">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Single clean Brand element */}
          <a
            href="/"
            onClick={(e) => handleNavClick(e, '/')}
            className="whitespace-nowrap shrink-0 focus:outline-none"
            aria-label="SK Developers Home"
          >
            <BrandLogo size="md" showWordmark={true} />
          </a>

          {/* Zone 2: 5 concise single-line navigation links */}
          <nav
            aria-label="Primary Navigation"
            className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600 dark:text-slate-300"
          >
            <a
              href="/projects"
              onClick={(e) => handleNavClick(e, '/projects')}
              className={`hover:text-slate-950 dark:hover:text-white hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 ${
                cleanPath.startsWith('/projects') ? 'text-cyan-600 dark:text-cyan-400 font-semibold' : ''
              }`}
            >
              Work
            </a>
            <a
              href="/services"
              onClick={(e) => handleNavClick(e, '/services')}
              className={`hover:text-slate-950 dark:hover:text-white hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 ${
                cleanPath.startsWith('/services') ? 'text-cyan-600 dark:text-cyan-400 font-semibold' : ''
              }`}
            >
              Services
            </a>
            <a
              href="/solutions"
              onClick={(e) => handleNavClick(e, '/solutions')}
              className={`hover:text-slate-950 dark:hover:text-white hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 ${
                cleanPath === '/solutions' ? 'text-cyan-600 dark:text-cyan-400 font-semibold' : ''
              }`}
            >
              Solutions
            </a>
            <a
              href="/founder"
              onClick={(e) => handleNavClick(e, '/founder')}
              className={`hover:text-slate-950 dark:hover:text-white hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 ${
                cleanPath === '/founder' ? 'text-cyan-600 dark:text-cyan-400 font-semibold' : ''
              }`}
            >
              Founder
            </a>
            <a
              href="/insights"
              onClick={(e) => handleNavClick(e, '/insights')}
              className={`hover:text-slate-950 dark:hover:text-white hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 ${
                cleanPath.startsWith('/insights') ? 'text-cyan-600 dark:text-cyan-400 font-semibold' : ''
              }`}
            >
              Insights
            </a>
          </nav>

          {/* Zone 3: 1 Primary Action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => navigate('/contact')}
              className="px-4 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Discuss Project
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((o) => !o)}
              className="md:hidden p-2 text-slate-600 dark:text-slate-300 hover:text-white rounded-lg cursor-pointer"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0D1117] px-6 py-4 space-y-3">
            <div className="grid grid-cols-2 gap-2 text-sm font-medium">
              <button
                type="button"
                onClick={() => navigate('/')}
                className="text-left py-2 text-slate-700 dark:text-slate-200"
              >
                Home
              </button>
              <button
                type="button"
                onClick={() => navigate('/projects')}
                className="text-left py-2 text-slate-700 dark:text-slate-200"
              >
                Selected Projects
              </button>
              <button
                type="button"
                onClick={() => navigate('/services')}
                className="text-left py-2 text-slate-700 dark:text-slate-200"
              >
                Services
              </button>
              <button
                type="button"
                onClick={() => navigate('/solutions')}
                className="text-left py-2 text-slate-700 dark:text-slate-200"
              >
                Solution Explorer
              </button>
              <button
                type="button"
                onClick={() => navigate('/industries')}
                className="text-left py-2 text-slate-700 dark:text-slate-200"
              >
                Industries
              </button>
              <button
                type="button"
                onClick={() => navigate('/founder')}
                className="text-left py-2 text-slate-700 dark:text-slate-200"
              >
                Founder Profile
              </button>
              <button
                type="button"
                onClick={() => navigate('/about')}
                className="text-left py-2 text-slate-700 dark:text-slate-200"
              >
                About SK Developers
              </button>
              <button
                type="button"
                onClick={() => navigate('/insights')}
                className="text-left py-2 text-slate-700 dark:text-slate-200"
              >
                Insights
              </button>
            </div>
            <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <a
                href={SITE_SETTINGS.contact.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono text-cyan-500"
              >
                WhatsApp: {SITE_SETTINGS.contact.whatsappDisplay}
              </a>
              <button
                type="button"
                onClick={() => navigate('/contact')}
                className="px-4 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 rounded-lg"
              >
                Request Consultation
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Main Route Content */}
      <main className="flex-1">{renderMainRoute()}</main>

      {/* Quiet, Comprehensive Enterprise Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#07090C]">
        <div className="max-w-7xl mx-auto px-6 py-14">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-200 dark:border-slate-800">
            {/* Brand & Founder Column */}
            <div className="lg:col-span-4 space-y-4">
              <BrandLogo size="md" showWordmark={true} />
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed max-w-sm">
                {SITE_SETTINGS.tagline} {SITE_SETTINGS.secondaryPositioning} Founded by{' '}
                <strong className="text-slate-900 dark:text-slate-200">
                  {SITE_SETTINGS.founder.name}
                </strong>{' '}
                (Senior Software Architect &amp; AI/DevOps Engineer).
              </p>
              <div className="pt-1 flex flex-wrap items-center gap-3">
                <a
                  href={buildWhatsAppUrl({
                    subject: 'General Inquiry from skdevelopers.info Footer',
                    pagePath: cleanPath,
                  })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-mono font-medium text-cyan-600 dark:text-cyan-400 border border-cyan-500/30 rounded-lg hover:bg-cyan-500/10 transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp {SITE_SETTINGS.contact.whatsappDisplay}</span>
                </a>

                <button
                  type="button"
                  onClick={() => setIsDark((d) => !d)}
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 rounded-lg hover:border-cyan-400 transition-colors cursor-pointer"
                  aria-label={isDark ? 'Switch to light surface theme' : 'Switch to dark surface theme'}
                >
                  {isDark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
                  <span>{isDark ? 'Light Surface' : 'Dark Surface'}</span>
                </button>
              </div>
            </div>

            {/* Services Column */}
            <div className="lg:col-span-3">
              <h2 className="text-xs font-mono uppercase tracking-wider text-slate-900 dark:text-white mb-3">
                Engineering Services
              </h2>
              <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
                {SERVICES_REGISTRY.map((s) => (
                  <li key={s.slug}>
                    <a
                      href={`/services/${s.slug}`}
                      onClick={(e) => handleNavClick(e, `/services/${s.slug}`)}
                      className="hover:text-cyan-500 transition-colors"
                    >
                      {s.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Industries & Company Routes */}
            <div className="lg:col-span-2">
              <h2 className="text-xs font-mono uppercase tracking-wider text-slate-900 dark:text-white mb-3">
                Industries &amp; Firm
              </h2>
              <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
                {INDUSTRIES_REGISTRY.map((ind) => (
                  <li key={ind.slug}>
                    <a
                      href={`/industries/${ind.slug}`}
                      onClick={(e) => handleNavClick(e, `/industries/${ind.slug}`)}
                      className="hover:text-cyan-500 transition-colors"
                    >
                      {ind.shortTitle}
                    </a>
                  </li>
                ))}
                <li className="pt-2 border-t border-slate-100 dark:border-slate-800/80">
                  <a
                    href="/about"
                    onClick={(e) => handleNavClick(e, '/about')}
                    className="hover:text-cyan-500 transition-colors"
                  >
                    About SK Developers
                  </a>
                </li>
                <li>
                  <a
                    href="/founder"
                    onClick={(e) => handleNavClick(e, '/founder')}
                    className="hover:text-cyan-500 transition-colors"
                  >
                    Founder / Leadership
                  </a>
                </li>
                <li>
                  <a
                    href="/deployment"
                    onClick={(e) => handleNavClick(e, '/deployment')}
                    className="hover:text-cyan-500 transition-colors"
                  >
                    VPS &amp; Docker Runbook
                  </a>
                </li>
              </ul>
            </div>

            {/* Ecosystem Platforms */}
            <div className="lg:col-span-3">
              <h2 className="text-xs font-mono uppercase tracking-wider text-slate-900 dark:text-white mb-3">
                SK Developers Ecosystem
              </h2>
              <ul className="space-y-2.5 text-xs">
                {SITE_SETTINGS.ecosystemDomains.map((dom) => (
                  <li key={dom.domain}>
                    <a
                      href={dom.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between text-slate-600 dark:text-slate-400 hover:text-cyan-400 transition-colors"
                    >
                      <span>
                        <strong className="font-mono text-slate-900 dark:text-slate-200 group-hover:text-cyan-400">
                          {dom.domain}
                        </strong>{' '}
                        — {dom.name}
                      </span>
                      <ExternalLink className="w-3 h-3 shrink-0" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
            <div>
              © {new Date().getFullYear()} {SITE_SETTINGS.companyName} (
              <a
                href="https://skdevelopers.info"
                className="font-mono hover:text-cyan-400"
              >
                skdevelopers.info
              </a>
              ). All rights reserved.
            </div>
            <div className="flex flex-wrap items-center gap-4 font-mono">
              <a href="/sitemap.xml" target="_blank" className="hover:text-cyan-400">
                sitemap.xml
              </a>
              <span>·</span>
              <a href="/robots.txt" target="_blank" className="hover:text-cyan-400">
                robots.txt
              </a>
              <span>·</span>
              <a href="/api/health" target="_blank" className="hover:text-cyan-400">
                /api/health
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
