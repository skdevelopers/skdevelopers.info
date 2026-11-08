import React, { useState } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  Cpu,
  ExternalLink,
  MessageSquare,
  SlidersHorizontal,
} from 'lucide-react';
import {
  BUSINESS_CATEGORY_OPTIONS,
  CHALLENGE_OPTIONS,
  matchBusinessSolution,
  OUTCOME_OPTIONS,
  SOFTWARE_TYPE_OPTIONS,
  SolutionExplorerInput,
  SYSTEM_STAGE_OPTIONS,
} from '../utils/engine';

interface SolutionExplorerProps {
  onNavigate: (path: string) => void;
  onSelectBlueprintForConsultation: (brief: string, serviceTitle: string) => void;
}

export const SolutionExplorer: React.FC<SolutionExplorerProps> = ({
  onNavigate,
  onSelectBlueprintForConsultation,
}) => {
  const [config, setConfig] = useState<SolutionExplorerInput>({
    businessCategory: 'property-construction',
    operationalChallenge: 'cost-inventory-control',
    softwareType: 'enterprise-erp',
    systemStage: 'spreadsheets-manual',
    desiredOutcome: 'cost-accountability',
  });

  const recommendation = matchBusinessSolution(config);

  const handlePreset = (preset: 'construction' | 'retail' | 'mobility' | 'ai-voice') => {
    if (preset === 'construction') {
      setConfig({
        businessCategory: 'property-construction',
        operationalChallenge: 'cost-inventory-control',
        softwareType: 'enterprise-erp',
        systemStage: 'spreadsheets-manual',
        desiredOutcome: 'cost-accountability',
      });
    } else if (preset === 'retail') {
      setConfig({
        businessCategory: 'retail-wholesale',
        operationalChallenge: 'multi-branch-ledger',
        softwareType: 'ecommerce-portal',
        systemStage: 'spreadsheets-manual',
        desiredOutcome: 'commercial-launch',
      });
    } else if (preset === 'mobility') {
      setConfig({
        businessCategory: 'mobility-logistics',
        operationalChallenge: 'realtime-dispatch',
        softwareType: 'realtime-mobile-web',
        systemStage: 'greenfield',
        desiredOutcome: 'commercial-launch',
      });
    } else {
      setConfig({
        businessCategory: 'communications-ai',
        operationalChallenge: 'manual-document-voice',
        softwareType: 'ai-automation',
        systemStage: 'legacy-upgrade',
        desiredOutcome: 'automated-operations',
      });
    }
  };

  return (
    <section
      aria-label="What Do You Want to Build Solution Explorer"
      className="py-16 lg:py-24 border-b border-slate-200 dark:border-slate-800/80 bg-slate-50/60 dark:bg-[#0B0E14]"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-10 border-b border-slate-200 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-600 dark:text-cyan-400">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>INTERACTIVE SOLUTION ARCHITECT</span>
              <span aria-hidden="true">·</span>
              <span>RULES-BASED BLUEPRINT MATCHER</span>
            </div>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
              What Do You Want to Build?
            </h2>
            <p className="mt-3 text-base text-slate-600 dark:text-slate-300 max-w-2xl">
              Configure your operational challenge, industry domain, and system stage to inspect
              how SK Developers structures the database architecture, core modules, and delivery
              phases.
            </p>
          </div>

          {/* Quick Scenario Presets */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-slate-500 dark:text-slate-400 mr-1">
              Quick Scenarios:
            </span>
            <button
              type="button"
              onClick={() => handlePreset('construction')}
              className="px-3 py-1.5 text-xs font-medium bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-md hover:border-cyan-400 text-slate-700 dark:text-slate-300 whitespace-nowrap cursor-pointer"
            >
              Construction Cost Control
            </button>
            <button
              type="button"
              onClick={() => handlePreset('retail')}
              className="px-3 py-1.5 text-xs font-medium bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-md hover:border-cyan-400 text-slate-700 dark:text-slate-300 whitespace-nowrap cursor-pointer"
            >
              Retail ERP &amp; Commerce
            </button>
            <button
              type="button"
              onClick={() => handlePreset('mobility')}
              className="px-3 py-1.5 text-xs font-medium bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-md hover:border-cyan-400 text-slate-700 dark:text-slate-300 whitespace-nowrap cursor-pointer"
            >
              Ride-Hailing Dispatch
            </button>
            <button
              type="button"
              onClick={() => handlePreset('ai-voice')}
              className="px-3 py-1.5 text-xs font-medium bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-md hover:border-cyan-400 text-slate-700 dark:text-slate-300 whitespace-nowrap cursor-pointer"
            >
              AI OCR &amp; Voice Routing
            </button>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left 5 Columns: Configuration Controls */}
          <div className="lg:col-span-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0D1117] p-6 space-y-5">
            <div>
              <label
                htmlFor="sol-business-category"
                className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-2"
              >
                1. Business Category
              </label>
              <select
                id="sol-business-category"
                value={config.businessCategory}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    businessCategory: e.target.value as SolutionExplorerInput['businessCategory'],
                  })
                }
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:outline-none focus:border-cyan-400"
              >
                {BUSINESS_CATEGORY_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="sol-operational-challenge"
                className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-2"
              >
                2. Primary Operational Challenge
              </label>
              <select
                id="sol-operational-challenge"
                value={config.operationalChallenge}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    operationalChallenge:
                      e.target.value as SolutionExplorerInput['operationalChallenge'],
                  })
                }
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:outline-none focus:border-cyan-400"
              >
                {CHALLENGE_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="sol-software-type"
                className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-2"
              >
                3. Type of Software System
              </label>
              <select
                id="sol-software-type"
                value={config.softwareType}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    softwareType: e.target.value as SolutionExplorerInput['softwareType'],
                  })
                }
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:outline-none focus:border-cyan-400"
              >
                {SOFTWARE_TYPE_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="sol-system-stage"
                className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-2"
              >
                4. Current System Stage
              </label>
              <select
                id="sol-system-stage"
                value={config.systemStage}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    systemStage: e.target.value as SolutionExplorerInput['systemStage'],
                  })
                }
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:outline-none focus:border-cyan-400"
              >
                {SYSTEM_STAGE_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="sol-desired-outcome"
                className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-2"
              >
                5. Primary Business Outcome
              </label>
              <select
                id="sol-desired-outcome"
                value={config.desiredOutcome}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    desiredOutcome: e.target.value as SolutionExplorerInput['desiredOutcome'],
                  })
                }
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:outline-none focus:border-cyan-400"
              >
                {OUTCOME_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Right 7 Columns: Live Recommended Architecture Blueprint */}
          <div className="lg:col-span-7 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0D1117] p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-cyan-600 dark:text-cyan-400">
              <span>RECOMMENDED ARCHITECTURE SPECIFICATION</span>
              <span>DETERMINISTIC MATCH</span>
            </div>

            <h3 className="mt-2 font-display text-2xl font-bold text-slate-900 dark:text-white">
              {recommendation.blueprintTitle}
            </h3>

            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {recommendation.executiveSummary}
            </p>

            {/* Core Recommended System Modules */}
            <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-800">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
                Core System Capabilities &amp; Modules
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {recommendation.recommendedModules.map((mod) => (
                  <div
                    key={mod}
                    className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-50 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800"
                  >
                    <CheckCircle2 className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
                    <span className="text-xs font-medium text-slate-800 dark:text-slate-200">
                      {mod}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Architectural Reliability & Stack */}
            <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-xs font-mono text-slate-500 dark:text-slate-400 mb-2">
                  Reliability &amp; Data Integrity Safeguards
                </h4>
                <ul className="space-y-2">
                  {recommendation.architecturalSafeguards.map((guard) => (
                    <li
                      key={guard}
                      className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed"
                    >
                      <span className="font-mono text-cyan-500 mr-1.5">·</span>
                      {guard}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-mono text-slate-500 dark:text-slate-400 mb-2">
                  Recommended Engineering Stack
                </h4>
                <div className="flex items-center gap-2 text-xs font-mono text-slate-800 dark:text-cyan-300">
                  <Cpu className="w-4 h-4 shrink-0" />
                  <span>{recommendation.recommendedStack.join(' · ')}</span>
                </div>

                <h4 className="mt-4 text-xs font-mono text-slate-500 dark:text-slate-400 mb-2">
                  Relevant SK Developers Reference Systems
                </h4>
                <div className="space-y-2">
                  {recommendation.matchedProjects.map((proj) => (
                    <div
                      key={proj.slug}
                      className="text-xs flex items-center justify-between gap-2 pb-1.5 border-b border-slate-100 dark:border-slate-800/70"
                    >
                      <button
                        type="button"
                        onClick={() => onNavigate(`/projects/${proj.slug}`)}
                        className="font-semibold text-slate-900 dark:text-white hover:text-cyan-400 text-left cursor-pointer"
                      >
                        {proj.name}
                      </button>
                      <div className="flex items-center gap-2 font-mono text-[11px] text-slate-500 dark:text-slate-400">
                        <span>{proj.status}</span>
                        {proj.publicWebsite && (
                          <a
                            href={proj.publicWebsite}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-cyan-500 hover:underline inline-flex items-center gap-0.5"
                          >
                            <span>Live</span>
                            <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Next Step Action Bar */}
            <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
              <button
                type="button"
                onClick={() =>
                  onSelectBlueprintForConsultation(
                    recommendation.prefilledBrief,
                    recommendation.blueprintTitle
                  )
                }
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <span>Discuss This Solution With SK Developers</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={recommendation.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-3 text-xs font-semibold text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 hover:border-cyan-400 rounded-lg transition-colors whitespace-nowrap shrink-0"
              >
                <MessageSquare className="w-4 h-4 text-cyan-500" />
                <span>Send Blueprint via WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
