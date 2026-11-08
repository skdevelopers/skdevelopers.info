import React, { useState } from 'react';
import {
  ArrowRight,
  ExternalLink,
  Eye,
  Lock,
  Search,
  ShieldAlert,
} from 'lucide-react';
import {
  ProjectFilterTag,
  ProjectRecord,
  PROJECTS_REGISTRY,
} from '../data/registry';
import { filterProjects } from '../utils/engine';

const FILTER_TAGS: ProjectFilterTag[] = [
  'All',
  'Products',
  'Client Engineering',
  'Enterprise',
  'AI',
  'Commerce',
  'FinTech',
  'R&D',
  'Concepts',
];

interface ProjectExplorerProps {
  onNavigate: (path: string) => void;
  showSpotlight?: boolean;
  initialFilter?: ProjectFilterTag;
}

export const ProjectImageWithFallback: React.FC<{
  project: ProjectRecord;
  className?: string;
}> = ({ project, className = 'h-48' }) => {
  const [imgFailed, setImgFailed] = useState(false);

  if (!project.verifiedAssetUrl || imgFailed) {
    return (
      <div
        className={`w-full ${className} bg-slate-100 dark:bg-[#111722] border-b border-slate-200 dark:border-slate-800 flex flex-col justify-between p-5 relative overflow-hidden`}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(34,211,238,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(34,211,238,0.06)_1px,transparent_1px)] bg-[size:2rem_2rem]"
        />
        <div className="relative flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400">
          <span>{project.classification}</span>
          <span>{project.status}</span>
        </div>
        <div className="relative">
          <p className="font-display text-base font-semibold text-slate-900 dark:text-white">
            {project.name}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 truncate">
            {project.category}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`w-full ${className} bg-slate-900 border-b border-slate-200 dark:border-slate-800 relative overflow-hidden`}
    >
      <img
        src={project.verifiedAssetUrl}
        alt={project.verifiedAssetAlt || `${project.name} architecture preview`}
        referrerPolicy="no-referrer"
        loading="lazy"
        onError={() => setImgFailed(true)}
        className="w-full h-full object-cover object-center"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent"
      />
      <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs font-mono text-slate-200">
        <span>{project.status}</span>
        {project.publicWebsite && (
          <span className="text-cyan-300">
            {project.publicWebsite.replace('https://', '')}
          </span>
        )}
      </div>
    </div>
  );
};

export const ProjectExplorer: React.FC<ProjectExplorerProps> = ({
  onNavigate,
  showSpotlight = true,
  initialFilter = 'All',
}) => {
  const [activeTag, setActiveTag] = useState<ProjectFilterTag>(initialFilter);
  const [includeConfidential, setIncludeConfidential] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredProjects = filterProjects(
    PROJECTS_REGISTRY,
    activeTag,
    includeConfidential,
    searchQuery
  );

  const skosProject = PROJECTS_REGISTRY.find((p) => p.slug === 'skos-cloud');

  return (
    <section
      aria-label="SK Developers Project Ecosystem Explorer"
      className="py-16 lg:py-24 border-b border-slate-200 dark:border-slate-800/80"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-10 border-b border-slate-200 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-600 dark:text-cyan-400">
              <span>PROJECT ECOSYSTEM</span>
              <span aria-hidden="true">·</span>
              <span>TRUTHFUL STATUS GOVERNANCE</span>
            </div>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
              Products, Client Engineering &amp; Strategic Concepts
            </h2>
            <p className="mt-3 text-base text-slate-600 dark:text-slate-300 max-w-3xl">
              Every record in our portfolio is categorized by its verified engineering state:{' '}
              <span className="font-mono text-xs text-slate-800 dark:text-slate-200">
                LIVE PRODUCT · ACTIVE DEVELOPMENT · VERIFIED DELIVERY · RESEARCH &amp; DEVELOPMENT · CONCEPT / PROPOSAL
              </span>
              . We never conflate architectural concepts with live products or breach client NDAs.
            </p>
          </div>

          {/* Client Confidentiality & Governance Mode Toggle */}
          <div className="shrink-0">
            <button
              type="button"
              onClick={() => setIncludeConfidential((prev) => !prev)}
              aria-pressed={includeConfidential}
              className={`inline-flex items-center gap-2 px-4 py-2.5 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                includeConfidential
                  ? 'bg-cyan-950/60 border-cyan-500/60 text-cyan-300'
                  : 'bg-slate-100 dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-cyan-500/50'
              }`}
            >
              {includeConfidential ? (
                <Eye className="w-3.5 h-3.5 text-cyan-400" />
              ) : (
                <Lock className="w-3.5 h-3.5 text-slate-400" />
              )}
              <span>
                {includeConfidential
                  ? 'Showing Sanitized Client/R&D Records (12)'
                  : 'Include Sanitized NDA / R&D Profiles (+3)'}
              </span>
            </button>
          </div>
        </div>

        {/* Featured Flagship Product Spotlight: SKOS Cloud */}
        {showSpotlight && skosProject && (
          <div className="mt-10 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0D1117] overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
              <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-cyan-600 dark:text-cyan-400">
                    <span>FEATURED PRODUCT SPOTLIGHT</span>
                    <span aria-hidden="true">·</span>
                    <span>{skosProject.status}</span>
                    <span aria-hidden="true">·</span>
                    <span>skos.cloud</span>
                  </div>

                  <h3 className="mt-2 font-display text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                    {skosProject.name} — Enterprise ERP &amp; AI Business Operating System
                  </h3>

                  <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                    {skosProject.summary}
                  </p>

                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                    {skosProject.engineeringHighlights.map((highlight) => (
                      <div key={highlight} className="text-xs text-slate-600 dark:text-slate-300">
                        <span className="font-mono text-cyan-600 dark:text-cyan-400 mr-1.5">
                          +
                        </span>
                        {highlight}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-5 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
                  <div className="text-xs font-mono text-slate-500 dark:text-slate-400">
                    {skosProject.technologies.join(' · ')}
                  </div>

                  <div className="flex items-center gap-3">
                    <a
                      href="https://skos.cloud"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors whitespace-nowrap shrink-0"
                    >
                      <span>Visit skos.cloud</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <button
                      type="button"
                      onClick={() => onNavigate(`/projects/${skosProject.slug}`)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-800 dark:text-slate-100 border border-slate-300 dark:border-slate-700 hover:border-cyan-400 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      <span>Architecture Case Study</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 border-t lg:border-t-0 lg:border-l border-slate-200 dark:border-slate-800">
                <ProjectImageWithFallback
                  project={skosProject}
                  className="h-64 lg:h-full"
                />
              </div>
            </div>
          </div>
        )}

        {/* Interactive Filter Tabs & Search Bar */}
        <div className="mt-10 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div
            role="tablist"
            aria-label="Filter projects by category"
            className="flex flex-wrap items-center gap-1 p-1.5 bg-slate-100 dark:bg-[#0D1117] border border-slate-200 dark:border-slate-800 rounded-lg"
          >
            {FILTER_TAGS.map((tag) => {
              const isActive = activeTag === tag;
              return (
                <button
                  key={tag}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveTag(tag)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-white dark:bg-slate-800 text-slate-950 dark:text-cyan-300 shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {tag}
                </button>
              );
            })}
          </div>

          <div className="relative w-full lg:w-72 shrink-0">
            <label htmlFor="project-search-input" className="sr-only">
              Search projects by technology or domain
            </label>
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              id="project-search-input"
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by stack (e.g. PostGIS, FastAPI)..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-white dark:bg-[#0D1117] border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-cyan-400"
            />
          </div>
        </div>

        {/* Confidentiality Notice Banner when viewing NDA / Unapproved records */}
        {includeConfidential && (
          <div className="mt-4 p-4 rounded-lg border border-amber-500/30 bg-amber-500/5 text-xs text-slate-600 dark:text-slate-300 flex items-start gap-3">
            <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="font-semibold text-slate-900 dark:text-white">
                Content Governance &amp; NDA Protection Active:
              </strong>{' '}
              Displaying sanitized engineering profiles for active client engagements (
              <span className="font-mono">DriveNow</span>, <span className="font-mono">GECIM</span>)
              and R&amp;D drafts (<span className="font-mono">QMan</span>). Client contract terms,
              proprietary schemas, wallet/financial mechanics, and internal screenshots remain
              strictly withheld.
            </div>
          </div>
        )}

        {/* Project Cards Grid */}
        {filteredProjects.length === 0 ? (
          <div className="mt-8 p-12 text-center rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0D1117]">
            <p className="text-sm font-medium text-slate-900 dark:text-white">
              No project records match the selected filter and search criteria.
            </p>
            <button
              type="button"
              onClick={() => {
                setActiveTag('All');
                setSearchQuery('');
                setIncludeConfidential(true);
              }}
              className="mt-4 px-4 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 rounded-lg cursor-pointer"
            >
              Reset Filters &amp; Show All Records
            </button>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <article
                key={project.slug}
                className="flex flex-col justify-between rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0D1117] hover:border-cyan-500/50 transition-colors overflow-hidden"
              >
                <div>
                  <ProjectImageWithFallback project={project} className="h-44" />

                  <div className="p-6">
                    {/* Zero-pill unboxed metadata with typographic separators */}
                    <div className="flex flex-wrap items-center gap-1.5 text-xs font-mono text-slate-500 dark:text-slate-400">
                      <span className="text-cyan-600 dark:text-cyan-400 font-medium">
                        {project.status}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{project.classification}</span>
                      {!project.publicationApproved && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span className="text-amber-500">NDA Sanitized</span>
                        </>
                      )}
                    </div>

                    <h3 className="mt-2 font-display text-lg font-bold text-slate-900 dark:text-white">
                      {project.name}
                    </h3>

                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                      {project.category}
                    </p>

                    <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {project.valueProposition}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex flex-col gap-4">
                  {/* Unboxed technology list */}
                  <div className="text-xs font-mono text-slate-500 dark:text-slate-400 truncate">
                    {project.technologies.join(' · ')}
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => onNavigate(`/projects/${project.slug}`)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-600 dark:text-cyan-400 hover:underline whitespace-nowrap cursor-pointer"
                    >
                      <span>Learn More &amp; Architecture</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <div className="flex items-center gap-2">
                      {project.publicWebsite && (
                        <a
                          href={project.publicWebsite}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs font-mono text-slate-600 dark:text-slate-300 hover:text-cyan-400 whitespace-nowrap"
                          aria-label={`Open ${project.name} public website`}
                        >
                          <span>{project.publicWebsite.replace('https://', '')}</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
