import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, ExternalLink, Layers, MessageSquare, ShieldCheck } from 'lucide-react';
import { INTELLIGENCE_NODES, IntelligenceNode, SITE_SETTINGS } from '../data/registry';
import { buildWhatsAppUrl } from '../utils/engine';

interface IntelligenceHeroProps {
  onNavigate: (path: string) => void;
}

export const IntelligenceHero: React.FC<IntelligenceHeroProps> = ({ onNavigate }) => {
  const [selectedNodeId, setSelectedNodeId] = useState<string>(INTELLIGENCE_NODES[0].id);
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const activeNode: IntelligenceNode =
    INTELLIGENCE_NODES.find((n) => n.id === selectedNodeId) || INTELLIGENCE_NODES[0];

  // Respect prefers-reduced-motion and pause when off-screen
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      return;
    }

    let isVisible = true;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.15 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    const interval = window.setInterval(() => {
      if (isVisible && !isPaused) {
        setRotationAngle((prev) => (prev + 0.35) % 360);
      }
    }, 60);

    return () => {
      window.clearInterval(interval);
      observer.disconnect();
    };
  }, [isPaused]);

  const rad = (rotationAngle * Math.PI) / 180;

  return (
    <section
      ref={containerRef}
      aria-label="SK Developers Hero and Intelligence Network"
      className="relative border-b border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#090B0E] overflow-hidden"
    >
      {/* Subtle architectural grid background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.06)_1px,transparent_1px)] bg-[size:4rem_4rem]"
      />

      <div className="relative max-w-7xl mx-auto px-6 py-14 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-stretch">
          {/* Left Column: Core Proposition, Headline & Primary CTAs */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              {/* Unboxed editorial metadata line */}
              <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-600 dark:text-slate-400 mb-5">
                <span>{SITE_SETTINGS.companyName}</span>
                <span aria-hidden="true">·</span>
                <span>Enterprise Software</span>
                <span aria-hidden="true">·</span>
                <span>AI Automation</span>
                <span aria-hidden="true">·</span>
                <span>Cloud Infrastructure</span>
              </div>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.5rem] font-bold tracking-tight text-slate-900 dark:text-white leading-[1.08] max-w-2xl">
                Your Ambition. Engineered for Scale.
              </h1>

              <p className="mt-6 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
                We architect enterprise software, intelligent business platforms and AI-powered
                systems built for the real world. Founded by Senior Software Architect{' '}
                <strong className="font-semibold text-slate-900 dark:text-white">
                  Muhammad Salman Khalid
                </strong>{' '}
                with over 15 years of production engineering experience.
              </p>

              {/* Primary, Secondary, and Always-Available WhatsApp CTAs */}
              <div className="mt-8 flex flex-wrap items-center gap-3.5">
                <button
                  type="button"
                  onClick={() => onNavigate('/contact')}
                  className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <span>Discuss Your Project</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate('/projects')}
                  className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-slate-800 dark:text-slate-100 bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <span>Explore Our Work</span>
                </button>

                <a
                  href={buildWhatsAppUrl({
                    subject: 'Executive Architecture Inquiry',
                    pagePath: '/',
                  })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-3 text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-300 border border-slate-200 dark:border-slate-800 rounded-lg transition-colors whitespace-nowrap shrink-0"
                >
                  <MessageSquare className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                  <span>WhatsApp {SITE_SETTINGS.contact.whatsappDisplay}</span>
                </a>
              </div>
            </div>

            {/* Verified Ecosystem Domain Strip */}
            <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800/80">
              <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-3">
                Active SK Developers Ecosystem &amp; Engineered Platforms
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {SITE_SETTINGS.ecosystemDomains.slice(1).map((item) => (
                  <a
                    key={item.domain}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block p-3 rounded-lg border border-slate-200 dark:border-slate-800/90 bg-slate-50/60 dark:bg-[#0D1117] hover:border-cyan-500/50 transition-colors"
                  >
                    <div className="flex items-center justify-between gap-1">
                      <span className="font-mono text-xs font-medium text-slate-900 dark:text-slate-100 group-hover:text-cyan-500 dark:group-hover:text-cyan-300 truncate">
                        {item.domain}
                      </span>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan-400 shrink-0" />
                    </div>
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 truncate">
                      {item.name} · {item.status}
                    </p>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Interactive SK Intelligence Network Constellation */}
          <div
            className="lg:col-span-5 flex flex-col justify-between rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0D1117] p-6"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="flex items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
              <div>
                <h2 className="text-sm font-semibold text-slate-900 dark:text-white">
                  The SK Intelligence Network
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Select a capability node to inspect architecture &amp; live systems
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsPaused((p) => !p)}
                className="px-2.5 py-1 text-xs font-mono text-slate-600 dark:text-slate-300 border border-slate-300 dark:border-slate-700 rounded hover:border-cyan-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                aria-label={isPaused ? 'Resume orbital motion' : 'Pause orbital motion'}
              >
                {isPaused ? 'Resume Orbit' : 'Pause Orbit'}
              </button>
            </div>

            {/* Interactive Pseudo-3D Precision Monogram & Capability Constellation SVG */}
            <div
              className="relative my-4 flex items-center justify-center min-h-[270px]"
              data-testid="sk-intelligence-constellation"
            >
              <svg
                viewBox="0 0 420 270"
                className="w-full h-[270px] select-none"
                role="img"
                aria-label="Interactive 3D constellation linking the SK monogram to six core engineering domains"
              >
                <defs>
                  <radialGradient id="skCoreGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.22" />
                    <stop offset="100%" stopColor="#0D1117" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* Subtle Orbital Rings */}
                <ellipse
                  cx="210"
                  cy="135"
                  rx="155"
                  ry="88"
                  className="stroke-slate-300 dark:stroke-slate-800"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                  fill="none"
                />
                <ellipse
                  cx="210"
                  cy="135"
                  rx="105"
                  ry="58"
                  className="stroke-slate-300/70 dark:stroke-slate-800/80"
                  strokeWidth="1"
                  fill="none"
                />
                <circle cx="210" cy="135" r="78" fill="url(#skCoreGlow)" />

                {/* Constellation Connection Vectors */}
                {INTELLIGENCE_NODES.map((node, index) => {
                  const baseAngle = (index / INTELLIGENCE_NODES.length) * Math.PI * 2 + rad * 0.25;
                  const nx = 210 + Math.cos(baseAngle) * 145;
                  const ny = 135 + Math.sin(baseAngle) * 84;
                  const isSelected = node.id === activeNode.id;

                  return (
                    <g key={`edge-${node.id}`}>
                      <line
                        x1="210"
                        y1="135"
                        x2={nx}
                        y2={ny}
                        stroke={isSelected ? '#22D3EE' : '#475569'}
                        strokeOpacity={isSelected ? '0.9' : '0.35'}
                        strokeWidth={isSelected ? '2' : '1'}
                      />
                    </g>
                  );
                })}

                {/* Center Precision SK Monogram Hub */}
                <g transform="translate(178, 103)">
                  <rect
                    width="64"
                    height="64"
                    rx="14"
                    className="fill-slate-900 dark:fill-[#111822] stroke-cyan-400/60"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M28 16H17L12 23.5L17 31H26L29 35.5L25 42H13V48H28L35 37.5L30 30H20L18 27L20 22H28V16Z"
                    fill="#F8FAFC"
                  />
                  <path
                    d="M36 16V48H42V34.5L50 48H57L47.5 32L56.5 16H49.5L42 29.5V16H36Z"
                    fill="#22D3EE"
                  />
                </g>

                {/* Interactive Capability Nodes */}
                {INTELLIGENCE_NODES.map((node, index) => {
                  const baseAngle = (index / INTELLIGENCE_NODES.length) * Math.PI * 2 + rad * 0.25;
                  const nx = 210 + Math.cos(baseAngle) * 145;
                  const ny = 135 + Math.sin(baseAngle) * 84;
                  const isSelected = node.id === activeNode.id;

                  return (
                    <g
                      key={node.id}
                      transform={`translate(${nx}, ${ny})`}
                      onClick={() => setSelectedNodeId(node.id)}
                      className="cursor-pointer"
                    >
                      <rect
                        x="-54"
                        y="-16"
                        width="108"
                        height="32"
                        rx="6"
                        fill={isSelected ? '#083344' : '#0F172A'}
                        stroke={isSelected ? '#22D3EE' : '#334155'}
                        strokeWidth={isSelected ? '1.75' : '1'}
                      />
                      <text
                        x="0"
                        y="4"
                        textAnchor="middle"
                        fill={isSelected ? '#ECFEFF' : '#CBD5E1'}
                        fontSize="10.5"
                        fontWeight={isSelected ? '600' : '500'}
                        fontFamily="Plus Jakarta Sans, sans-serif"
                      >
                        {node.shortLabel}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Accessible Keyboard & Screen-Reader Domain Selector Buttons */}
            <div
              role="tablist"
              aria-label="SK Developers Capability Domains"
              className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 p-1.5 bg-slate-200/70 dark:bg-slate-900/90 rounded-lg"
            >
              {INTELLIGENCE_NODES.map((node) => {
                const active = node.id === activeNode.id;
                return (
                  <button
                    key={node.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setSelectedNodeId(node.id)}
                    className={`px-2 py-2 text-[11px] font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      active
                        ? 'bg-white dark:bg-slate-800 text-slate-950 dark:text-cyan-300 shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {node.label}
                  </button>
                );
              })}
            </div>

            {/* Selected Capability Live Details Panel */}
            <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400">
                <span className="font-mono text-cyan-600 dark:text-cyan-400">
                  {activeNode.label}
                </span>
                <span aria-hidden="true">·</span>
                <span className="truncate">{activeNode.architecturalPillar}</span>
              </div>

              <h3 className="mt-1.5 font-display text-base font-semibold text-slate-900 dark:text-white">
                {activeNode.domainTitle}
              </h3>

              <p className="mt-1.5 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {activeNode.summary}
              </p>

              <div className="mt-3 flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-200/70 dark:border-slate-800/70">
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  <span>Stack: </span>
                  <span className="font-mono text-slate-700 dark:text-slate-200">
                    {activeNode.stack.join(' · ')}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  {activeNode.linkedProjectUrl && (
                    <a
                      href={activeNode.linkedProjectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-cyan-500 whitespace-nowrap"
                    >
                      <span>{activeNode.linkedProjectName}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                  <button
                    type="button"
                    onClick={() => onNavigate(activeNode.linkedRoute)}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-cyan-600 dark:text-cyan-400 hover:underline whitespace-nowrap cursor-pointer"
                  >
                    <span>Inspect Domain</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Full-Width 4-Column Architectural Assurance Strip Below Hero Split */}
        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-600 dark:text-cyan-400">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>01. FOUNDER-LED ARCHITECTURE</span>
            </div>
            <p className="mt-1.5 text-sm font-medium text-slate-900 dark:text-white">
              15+ Years Production Experience
            </p>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Direct architectural leadership by Muhammad Salman Khalid across every system.
            </p>
          </div>

          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-600 dark:text-cyan-400">
              <Layers className="w-4 h-4 shrink-0" />
              <span>02. CORE ENGINEERING STACK</span>
            </div>
            <p className="mt-1.5 text-sm font-medium text-slate-900 dark:text-white">
              Laravel · PostgreSQL · FastAPI · Next.js
            </p>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Battle-tested relational schemas, typed frontends, and deterministic AI pipelines.
            </p>
          </div>

          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-600 dark:text-cyan-400">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>03. LIVE PRODUCT ECOSYSTEM</span>
            </div>
            <p className="mt-1.5 text-sm font-medium text-slate-900 dark:text-white">
              skos.cloud · callify.pro · everestbuy.pk
            </p>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              We engineer our own commercial SaaS and retail platforms alongside client work.
            </p>
          </div>

          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-600 dark:text-cyan-400">
              <Layers className="w-4 h-4 shrink-0" />
              <span>04. PRODUCTION INFRASTRUCTURE</span>
            </div>
            <p className="mt-1.5 text-sm font-medium text-slate-900 dark:text-white">
              Docker · Linux VPS · CI/CD · PostGIS
            </p>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Hardened self-hosted and cloud deployments with reversible release engineering.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
