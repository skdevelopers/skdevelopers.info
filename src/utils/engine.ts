import {
  ARTICLES_REGISTRY,
  INDUSTRIES_REGISTRY,
  ProjectFilterTag,
  ProjectRecord,
  PROJECTS_REGISTRY,
  REDIRECT_MAP,
  SERVICES_REGISTRY,
  SITE_SETTINGS,
} from '../data/registry';

export interface SolutionExplorerInput {
  businessCategory:
    | 'property-construction'
    | 'retail-wholesale'
    | 'mobility-logistics'
    | 'fintech-financial'
    | 'saas-software'
    | 'communications-ai';
  operationalChallenge:
    | 'cost-inventory-control'
    | 'multi-branch-ledger'
    | 'manual-document-voice'
    | 'realtime-dispatch'
    | 'ledger-payment-integrity'
    | 'multi-tenant-scale';
  softwareType:
    | 'enterprise-erp'
    | 'saas-platform'
    | 'ai-automation'
    | 'ecommerce-portal'
    | 'realtime-mobile-web'
    | 'legacy-modernization';
  systemStage: 'greenfield' | 'spreadsheets-manual' | 'legacy-upgrade';
  desiredOutcome:
    | 'cost-accountability'
    | 'automated-operations'
    | 'commercial-launch'
    | 'audit-grade-reliability';
}

export interface SolutionRecommendation {
  blueprintTitle: string;
  executiveSummary: string;
  recommendedModules: string[];
  architecturalSafeguards: string[];
  recommendedStack: string[];
  deliveryPhases: { phase: string; milestone: string }[];
  matchedProjects: {
    slug: string;
    name: string;
    status: string;
    publicWebsite?: string;
    relevance: string;
  }[];
  primaryServiceSlug: string;
  prefilledBrief: string;
  whatsappUrl: string;
}

export const BUSINESS_CATEGORY_OPTIONS: {
  value: SolutionExplorerInput['businessCategory'];
  label: string;
}[] = [
  { value: 'property-construction', label: 'Property Development & Construction' },
  { value: 'retail-wholesale', label: 'Retail, Wholesale & Distribution' },
  { value: 'mobility-logistics', label: 'Mobility, Fleet & On-Demand Logistics' },
  { value: 'fintech-financial', label: 'FinTech & Financial Workflows' },
  { value: 'saas-software', label: 'B2B SaaS & Technology Product' },
  { value: 'communications-ai', label: 'Customer Operations & Communications' },
];

export const CHALLENGE_OPTIONS: {
  value: SolutionExplorerInput['operationalChallenge'];
  label: string;
}[] = [
  { value: 'cost-inventory-control', label: 'Construction Cost, BOQ & Materials Accountability' },
  { value: 'multi-branch-ledger', label: 'Multi-Branch Accounting, Inventory & Khata Control' },
  { value: 'manual-document-voice', label: 'Manual Document Entry, OCR & Call Routing Bottlenecks' },
  { value: 'realtime-dispatch', label: 'Real-Time Dispatch, GPS Telemetry & State Sync' },
  { value: 'ledger-payment-integrity', label: 'Financial Ledger Integrity & Payment Reconciliation' },
  { value: 'multi-tenant-scale', label: 'Multi-Tenant SaaS or High-Speed Commerce Scaling' },
];

export const SOFTWARE_TYPE_OPTIONS: {
  value: SolutionExplorerInput['softwareType'];
  label: string;
}[] = [
  { value: 'enterprise-erp', label: 'Enterprise ERP & Financial System' },
  { value: 'saas-platform', label: 'Multi-Tenant Cloud SaaS Platform' },
  { value: 'ai-automation', label: 'AI Workflow, OCR or Voice Automation' },
  { value: 'ecommerce-portal', label: 'E-Commerce & Dealer Ordering Platform' },
  { value: 'realtime-mobile-web', label: 'Real-Time Mobile & Web Ecosystem' },
  { value: 'legacy-modernization', label: 'Legacy PHP/Laravel Modernization & DevOps' },
];

export const SYSTEM_STAGE_OPTIONS: {
  value: SolutionExplorerInput['systemStage'];
  label: string;
}[] = [
  { value: 'spreadsheets-manual', label: 'Replacing Spreadsheets & Disconnected Tools' },
  { value: 'greenfield', label: 'New Greenfield Product / Architecture' },
  { value: 'legacy-upgrade', label: 'Modernizing an Existing Production Codebase' },
];

export const OUTCOME_OPTIONS: {
  value: SolutionExplorerInput['desiredOutcome'];
  label: string;
}[] = [
  { value: 'cost-accountability', label: 'Real-Time Cost, Stock & Branch Accountability' },
  { value: 'automated-operations', label: 'Reduced Manual Headcount Bottlenecks via Automation' },
  { value: 'commercial-launch', label: 'Production-Ready Commercial SaaS / Storefront Launch' },
  { value: 'audit-grade-reliability', label: 'Zero-Drift Ledger Integrity & Hardened Infrastructure' },
];

export function buildWhatsAppUrl(params: {
  service?: string;
  subject?: string;
  summary?: string;
  pagePath?: string;
}): string {
  const base = `https://wa.me/${SITE_SETTINGS.contact.whatsappNumber}`;
  const lines: string[] = [
    'Assalam-o-Alaikum Salman / SK Developers Team,',
  ];
  if (params.subject) {
    lines.push(`Inquiry: ${params.subject}`);
  }
  if (params.service) {
    lines.push(`Service Area: ${params.service}`);
  }
  if (params.summary) {
    lines.push(`Details: ${params.summary}`);
  }
  if (params.pagePath) {
    lines.push(`Reference: ${SITE_SETTINGS.canonicalDomain}${params.pagePath}`);
  }
  const encoded = encodeURIComponent(lines.join('\n'));
  return `${base}?text=${encoded}`;
}

export function matchBusinessSolution(input: SolutionExplorerInput): SolutionRecommendation {
  const categoryLabel =
    BUSINESS_CATEGORY_OPTIONS.find((c) => c.value === input.businessCategory)?.label ||
    input.businessCategory;
  const challengeLabel =
    CHALLENGE_OPTIONS.find((c) => c.value === input.operationalChallenge)?.label ||
    input.operationalChallenge;
  const stageLabel =
    SYSTEM_STAGE_OPTIONS.find((s) => s.value === input.systemStage)?.label || input.systemStage;
  const outcomeLabel =
    OUTCOME_OPTIONS.find((o) => o.value === input.desiredOutcome)?.label || input.desiredOutcome;

  let blueprintTitle = 'Custom Enterprise Architecture & Operational Platform';
  let executiveSummary =
    'A disciplined, modular software system engineered on Laravel, PostgreSQL, and modern web/AI pipelines tailored to your operational constraints.';
  let recommendedModules: string[] = [];
  let architecturalSafeguards: string[] = [];
  let recommendedStack: string[] = ['Laravel', 'PostgreSQL', 'React / Next.js', 'Redis', 'Docker'];
  let matchedSlugs: { slug: string; relevance: string }[] = [];
  let primaryServiceSlug = 'enterprise-erp';

  if (
    input.businessCategory === 'property-construction' ||
    input.operationalChallenge === 'cost-inventory-control'
  ) {
    blueprintTitle = 'Construction ERP, BOQ Cost Control & Property Lifecycle System';
    executiveSummary =
      'Connects site material requisitions and Bill of Quantities (BOQ) limits with contractor IPC billing, buyer installment schedules, and executive financial dashboards.';
    recommendedModules = [
      'Construction ERP & Project WBS Ledger',
      'Materials & Site Inventory Accountability (Gate-Pass / GRN / Issuance)',
      'Contractor IPC Billing, Advances & Retention Accounting',
      'Unit Inventory, Buyer Allotment Locks & Installment Schedules',
      'Double-Entry Financial Reporting & Project Cashflow Control',
      'AI Operational Assistant for Cost-Variance & Recovery Queries',
    ];
    architecturalSafeguards = [
      'Atomic unit allotment locks preventing duplicate booking of plots or apartments',
      'Hard BOQ quantity ceiling checks before purchase order or site issuance approval',
      'Immutable audit logs across site storekeepers, quantity surveyors, and finance controllers',
    ];
    recommendedStack = ['Laravel', 'PostgreSQL', 'Next.js / React', 'Python / FastAPI', 'Redis', 'Docker'];
    matchedSlugs = [
      {
        slug: 'sk-livingsphere',
        relevance: 'Strategic PropTech & Construction ERP blueprint covering site, financial, and resident operations.',
      },
      {
        slug: 'property-crm-workflows',
        relevance: 'Verified delivery of unit reservation locks, installment schedules, and CRM workflows.',
      },
      {
        slug: 'skos-cloud',
        relevance: 'Core multi-branch accounting, inventory, and voucher engine at skos.cloud.',
      },
    ];
    primaryServiceSlug = 'enterprise-erp';
  } else if (
    input.businessCategory === 'retail-wholesale' ||
    input.operationalChallenge === 'multi-branch-ledger' ||
    input.softwareType === 'ecommerce-portal'
  ) {
    blueprintTitle = 'Unified Multi-Branch ERP, Digital Khata & Omnichannel Commerce Engine';
    executiveSummary =
      'Synchronizes warehouse stock, branch billing, customer/supplier credit ledgers (khata), and high-conversion digital storefronts on a single source of truth.';
    recommendedModules = [
      'Double-Entry Accounting & Multi-Branch General Ledger',
      'Warehouse & Batch Inventory Ledger with Stock Transfer Controls',
      'Customer & Supplier Digital Khata with Credit Limit Enforcement',
      'High-Speed Next.js Storefront & B2B Dealer Ordering Portal',
      'COD Order Verification, Courier API Sync & Settlement Reconciliation',
      'FastAPI OCR Supplier Invoice Ingestion Pipeline',
    ];
    architecturalSafeguards = [
      'Row-locked stock reservation preventing overselling across physical and online channels',
      'Automated daily reconciliation between courier/gateway settlements and ledger journals',
      'Sub-2.5s LCP storefront architecture with structured Schema.org Product metadata',
    ];
    recommendedStack = ['Laravel', 'PostgreSQL', 'Next.js', 'TypeScript', 'Redis', 'Docker'];
    matchedSlugs = [
      {
        slug: 'skos-cloud',
        relevance: 'Live SK Developers business operating platform for ERP, khata, and inventory (skos.cloud).',
      },
      {
        slug: 'everestbuy',
        relevance: 'Pakistani e-commerce retail initiative validating catalog, COD, and fulfillment flows (everestbuy.pk).',
      },
      {
        slug: 'sk-ai-commerce',
        relevance: 'Multi-tenant commerce architecture powering scalable retail storefronts.',
      },
    ];
    primaryServiceSlug =
      input.softwareType === 'ecommerce-portal' ? 'ecommerce-engineering' : 'enterprise-erp';
  } else if (
    input.businessCategory === 'mobility-logistics' ||
    input.operationalChallenge === 'realtime-dispatch' ||
    input.softwareType === 'realtime-mobile-web'
  ) {
    blueprintTitle = 'Real-Time Spatial Dispatch, Fleet Telemetry & Mobility Ecosystem';
    executiveSummary =
      'Coordinates high-frequency GPS location streams, geospatial radius matching, trip state machines, and driver commission wallets across mobile and operations portals.';
    recommendedModules = [
      'PostGIS Spatial Proximity & Zone Tariff Engine',
      'Redis Pub/Sub Real-Time Driver Telemetry Stream',
      'Idempotent Trip Lifecycle State Machine (Request -> Dispatch -> Complete)',
      'Cross-Platform Rider & Driver Mobile Applications',
      'Driver Commission, Wallet & Payout Ledger',
      'Live Operations, Onboarding & Dispute Control Dashboard',
    ];
    architecturalSafeguards = [
      'Ephemeral GPS pings buffered in Redis to prevent PostgreSQL write saturation',
      'Idempotent trip state transitions resistant to unstable mobile network retries',
      'Double-entry driver wallet accounting for transparent commission and payout tracking',
    ];
    recommendedStack = ['Laravel', 'PostgreSQL / PostGIS', 'Redis Pub/Sub', 'Flutter', 'WebSockets', 'Docker'];
    matchedSlugs = [
      {
        slug: 'drivenow',
        relevance: 'Active mobility platform engineering involving rider/driver apps and PostGIS dispatch (drivenow.live / drivenow.pk).',
      },
      {
        slug: 'payment-ledger-architecture',
        relevance: 'Idempotent wallet and payment reconciliation architecture.',
      },
      {
        slug: 'webrtc-realtime-comms',
        relevance: 'Low-latency signaling and real-time state synchronization infrastructure.',
      },
    ];
    primaryServiceSlug = 'saas-development';
  } else if (
    input.businessCategory === 'fintech-financial' ||
    input.operationalChallenge === 'ledger-payment-integrity'
  ) {
    blueprintTitle = 'Audit-Grade Double-Entry Ledger & Idempotent Payment Architecture';
    executiveSummary =
      'Eliminates concurrency race conditions, webhook replay bugs, and balance drift using append-only PostgreSQL journals and pessimistic locking.';
    recommendedModules = [
      'Append-Only Double-Entry Ledger Core',
      'Idempotent API & Cryptographic Webhook Ingestion Gateway',
      'Pessimistic Row-Locking Balance Mutation Service',
      'Maker-Checker Multi-Signature Approval Workflows',
      'Automated Gateway-vs-Ledger Reconciliation Engine',
      'Tamper-Evident Audit Trail & Compliance Reporting',
    ];
    architecturalSafeguards = [
      'Zero mutable balance columns—all balances verified against immutable journal lines',
      'Database-enforced unique idempotency keys on every transaction and callback',
      'Scheduled zero-sum invariant checks alerting immediately on any sub-cent variance',
    ];
    recommendedStack = ['PostgreSQL', 'Laravel', 'Python', 'Redis Locks', 'Docker', 'Linux'];
    matchedSlugs = [
      {
        slug: 'gecim',
        relevance: 'Active financial and ledger engineering engagement focused on transactional integrity.',
      },
      {
        slug: 'payment-ledger-architecture',
        relevance: 'Verified multi-gateway payment orchestration and settlement reconciliation.',
      },
      {
        slug: 'skos-cloud',
        relevance: 'Production accounting and financial voucher architecture.',
      },
    ];
    primaryServiceSlug = 'fintech-systems';
  } else if (
    input.businessCategory === 'communications-ai' ||
    input.operationalChallenge === 'manual-document-voice' ||
    input.softwareType === 'ai-automation'
  ) {
    blueprintTitle = 'Guarded AI Automation, Document OCR & Real-Time Voice Orchestration';
    executiveSummary =
      'Automates document ingestion, call routing, and CRM workflows using Python/FastAPI, WebRTC/SIP signaling, and schema-validated AI pipelines with human review controls.';
    recommendedModules = [
      'FastAPI Asynchronous Document & Invoice OCR Extraction Pipeline',
      'SIP / WebRTC Real-Time Voice & Agent Presence Router',
      'Pydantic Schema Validation Firewall & Confidence Scoring',
      'Human-in-the-Loop Exception & Approval Queue',
      'Automated Post-Call Summarization & WhatsApp/CRM Dispatcher',
      'Read-Only Natural Language Analytics Copilot over ERP Data',
    ];
    architecturalSafeguards = [
      'Strict JSON/Pydantic validation before any AI output touches core databases',
      'Confidence thresholds routing low-certainty OCR or voice intents to human operators',
      'Hard timeouts and deterministic fallback routing if external AI APIs degrade',
    ];
    recommendedStack = ['Python', 'FastAPI', 'Pydantic', 'WebRTC / SIP', 'Laravel', 'PostgreSQL', 'Redis'];
    matchedSlugs = [
      {
        slug: 'callify-pro',
        relevance: 'AI communications and real-time engagement engineering platform (callify.pro).',
      },
      {
        slug: 'fastapi-ocr-automation',
        relevance: 'Verified FastAPI OCR and structured document extraction workflows.',
      },
      {
        slug: 'webrtc-realtime-comms',
        relevance: 'Low-latency signaling and real-time presence synchronization.',
      },
    ];
    primaryServiceSlug = 'ai-automation';
  } else {
    blueprintTitle = 'Scalable Multi-Tenant B2B SaaS & Containerized Cloud Platform';
    executiveSummary =
      'End-to-end SaaS product architecture featuring tenant-scoped PostgreSQL isolation, subscription metering, modern Next.js interfaces, and hardened Docker CI/CD.';
    recommendedModules = [
      'Tenant Context Resolution & Row-Level Isolation Middleware',
      'Role-Based Access Control (RBAC) & Tenant Admin Console',
      'Subscription Plan Entitlements, Metering & Billing Lifecycle',
      'Documented REST API & Outbound Webhook Delivery Engine',
      'Asynchronous Redis Queue Workers & Scheduled Jobs',
      'Loopback-Isolated Docker & GitHub Actions CI/CD Pipeline',
    ];
    architecturalSafeguards = [
      'Automated tenant-scoping across database queries, Redis cache keys, and storage paths',
      'Zero-downtime database migrations and commit-tagged Docker container rollbacks',
      'Non-root container execution behind existing Virtualmin/Nginx TLS reverse proxies',
    ];
    recommendedStack = ['Next.js', 'TypeScript', 'Laravel', 'PostgreSQL', 'Redis', 'Docker', 'GitHub Actions'];
    matchedSlugs = [
      {
        slug: 'skos-cloud',
        relevance: 'Multi-tenant cloud ERP and business operating system (skos.cloud).',
      },
      {
        slug: 'sk-ai-commerce',
        relevance: 'Modular multi-tenant SaaS commerce architecture.',
      },
      {
        slug: 'callify-pro',
        relevance: 'Real-time communications SaaS platform architecture (callify.pro).',
      },
    ];
    primaryServiceSlug =
      input.softwareType === 'legacy-modernization' ? 'cloud-devops' : 'saas-development';
  }

  const deliveryPhases = [
    {
      phase: 'Phase 1 · Architecture & Schema Blueprint',
      milestone:
        input.systemStage === 'legacy-upgrade'
          ? 'Codebase audit, slow-query profiling, Docker containerization, and zero-downtime migration plan.'
          : input.systemStage === 'spreadsheets-manual'
            ? 'Spreadsheet/workflow audit, PostgreSQL ledger schema design, and role permission mapping.'
            : 'Domain modeling, tenancy/security architecture, API contract definition, and clickable system specification.',
    },
    {
      phase: 'Phase 2 · Core Transactional Kernel',
      milestone: `Implementation of foundational ${recommendedModules[0]} and ${recommendedModules[1]} with automated test coverage.`,
    },
    {
      phase: 'Phase 3 · Operational Workflows & Integrations',
      milestone: `Delivery of ${recommendedModules[2]} and ${recommendedModules[3]} on a dedicated staging environment.`,
    },
    {
      phase: 'Phase 4 · Verification, Cutover & Handover',
      milestone: `Parallel data validation, production Docker deployment, and team onboarding focused on ${outcomeLabel.toLowerCase()}.`,
    },
  ];

  const matchedProjects = matchedSlugs
    .map((item) => {
      const found = PROJECTS_REGISTRY.find((p) => p.slug === item.slug);
      if (!found) return null;
      return {
        slug: found.slug,
        name: found.name,
        status: found.status,
        publicWebsite: found.publicWebsite,
        relevance: item.relevance,
      };
    })
    .filter((x): x is NonNullable<typeof x> => x !== null);

  const prefilledBrief = [
    `Solution Blueprint: ${blueprintTitle}`,
    `Business Category: ${categoryLabel}`,
    `Primary Challenge: ${challengeLabel}`,
    `System Stage: ${stageLabel}`,
    `Target Outcome: ${outcomeLabel}`,
    `Priority Modules: ${recommendedModules.slice(0, 4).join(', ')}`,
  ].join(' | ');

  const whatsappUrl = buildWhatsAppUrl({
    subject: blueprintTitle,
    service: categoryLabel,
    summary: `Challenge: ${challengeLabel} (${stageLabel}). Target outcome: ${outcomeLabel}.`,
    pagePath: '/solutions',
  });

  return {
    blueprintTitle,
    executiveSummary,
    recommendedModules,
    architecturalSafeguards,
    recommendedStack,
    deliveryPhases,
    matchedProjects,
    primaryServiceSlug,
    prefilledBrief,
    whatsappUrl,
  };
}

export function filterProjects(
  projects: ProjectRecord[],
  activeTag: ProjectFilterTag,
  includeConfidentialGovernanceView: boolean,
  searchQuery = ''
): ProjectRecord[] {
  const normalizedQuery = searchQuery.trim().toLowerCase();

  return projects.filter((project) => {
    if (!includeConfidentialGovernanceView && !project.publicationApproved) {
      return false;
    }

    if (activeTag !== 'All' && !project.filterTags.includes(activeTag)) {
      return false;
    }

    if (normalizedQuery.length > 0) {
      const haystack = [
        project.name,
        project.category,
        project.industry,
        project.summary,
        project.technologies.join(' '),
        project.status,
      ]
        .join(' ')
        .toLowerCase();
      if (!haystack.includes(normalizedQuery)) {
        return false;
      }
    }

    return true;
  });
}

export interface ConsultationFormPayload {
  name: string;
  company: string;
  contactMethod: 'email' | 'whatsapp' | 'phone';
  contactValue: string;
  serviceRequired: string;
  projectDescription: string;
  budgetRange?: string;
  targetDate?: string;
  privacyConsent: boolean;
  sourcePage?: string;
  solutionContext?: string;
  honeypot?: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: Partial<Record<keyof ConsultationFormPayload, string>>;
}

export function validateConsultationInput(payload: ConsultationFormPayload): ValidationResult {
  const errors: Partial<Record<keyof ConsultationFormPayload, string>> = {};

  if (payload.honeypot && payload.honeypot.trim().length > 0) {
    errors.honeypot = 'Automated spam submission detected.';
    return { valid: false, errors };
  }

  const name = (payload.name || '').trim();
  if (name.length < 2) {
    errors.name = 'Please enter your full name (at least 2 characters).';
  }

  const company = (payload.company || '').trim();
  if (company.length < 2) {
    errors.company = 'Please enter your company, organization, or project name.';
  }

  const contactValue = (payload.contactValue || '').trim();
  if (!contactValue) {
    errors.contactValue = 'Please provide your email address or WhatsApp/phone number.';
  } else if (payload.contactMethod === 'email') {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contactValue)) {
      errors.contactValue = 'Please enter a valid business or personal email address.';
    }
  } else {
    const digitsOnly = contactValue.replace(/[^\d+]/g, '');
    if (digitsOnly.length < 7) {
      errors.contactValue = 'Please enter a valid phone or WhatsApp number with country code.';
    }
  }

  const serviceRequired = (payload.serviceRequired || '').trim();
  if (!serviceRequired) {
    errors.serviceRequired = 'Please select the primary engineering service required.';
  }

  const description = (payload.projectDescription || '').trim();
  if (description.length < 20) {
    errors.projectDescription =
      'Please provide a short project summary (at least 20 characters) so we can prepare a relevant architectural response.';
  }

  if (!payload.privacyConsent) {
    errors.privacyConsent =
      'Please confirm consent so SK Developers can review your inquiry and contact you.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export interface RouteSeoMetadata {
  canonicalUrl: string;
  title: string;
  description: string;
  h1: string;
  breadcrumbs: { name: string; path: string }[];
  redirectTo?: string;
}

export function resolveRouteMetadata(rawPath: string): RouteSeoMetadata {
  const cleanPath = rawPath.split('?')[0].replace(/\/+$/, '') || '/';

  if (REDIRECT_MAP[cleanPath]) {
    const target = REDIRECT_MAP[cleanPath];
    const resolved = resolveRouteMetadata(target);
    return { ...resolved, redirectTo: target };
  }

  const baseDomain = SITE_SETTINGS.canonicalDomain;

  if (cleanPath === '/') {
    return {
      canonicalUrl: `${baseDomain}/`,
      title: 'SK Developers — Enterprise Software, AI Automation & Cloud Infrastructure',
      description:
        'SK Developers architects enterprise ERP systems, multi-tenant SaaS platforms, AI workflow automation, FinTech ledgers, and cloud infrastructure. Founded by Muhammad Salman Khalid.',
      h1: 'Your Ambition. Engineered for Scale.',
      breadcrumbs: [{ name: 'Home', path: '/' }],
    };
  }

  if (cleanPath === '/about') {
    return {
      canonicalUrl: `${baseDomain}/about`,
      title: 'About SK Developers | Enterprise Software & Systems Engineering Firm',
      description:
        'Learn how SK Developers engineers reliable enterprise ERP software, AI automation, multi-tenant SaaS, and production cloud infrastructure from Pakistan for global clients.',
      h1: 'Engineering Discipline for Business-Critical Software.',
      breadcrumbs: [
        { name: 'Home', path: '/' },
        { name: 'About SK Developers', path: '/about' },
      ],
    };
  }

  if (cleanPath === '/founder') {
    return {
      canonicalUrl: `${baseDomain}/founder`,
      title: 'Muhammad Salman Khalid — Founder & Senior Software Architect | SK Developers',
      description:
        'Profile of Muhammad Salman Khalid, Founder of SK Developers and Senior Software, AI & DevOps Architect with 15+ years of experience in Laravel, PostgreSQL, SaaS, FastAPI, and Docker.',
      h1: 'Muhammad Salman Khalid — Senior Software Architect & Founder.',
      breadcrumbs: [
        { name: 'Home', path: '/' },
        { name: 'Founder & Leadership', path: '/founder' },
      ],
    };
  }

  if (cleanPath === '/services') {
    return {
      canonicalUrl: `${baseDomain}/services`,
      title: 'Enterprise Software Engineering, ERP, AI & DevOps Services | SK Developers',
      description:
        'Explore SK Developers core engineering services: Enterprise ERP, AI Automation, Multi-Tenant SaaS, Cloud & DevOps, FinTech Ledgers, and E-Commerce Platforms.',
      h1: 'Software Engineering Services Built Around Operational Reliability.',
      breadcrumbs: [
        { name: 'Home', path: '/' },
        { name: 'Services', path: '/services' },
      ],
    };
  }

  if (cleanPath.startsWith('/services/')) {
    const slug = cleanPath.replace('/services/', '');
    const service = SERVICES_REGISTRY.find((s) => s.slug === slug);
    if (service) {
      return {
        canonicalUrl: `${baseDomain}/services/${service.slug}`,
        title: service.seoTitle,
        description: service.seoDescription,
        h1: service.headline,
        breadcrumbs: [
          { name: 'Home', path: '/' },
          { name: 'Services', path: '/services' },
          { name: service.title, path: `/services/${service.slug}` },
        ],
      };
    }
  }

  if (cleanPath === '/projects') {
    return {
      canonicalUrl: `${baseDomain}/projects`,
      title: 'Selected Projects & Product Ecosystem | SK Developers',
      description:
        'Explore the SK Developers project ecosystem including SKOS Cloud (skos.cloud), Callify Pro (callify.pro), EverestBuy (everestbuy.pk), DriveNow, and SK LivingSphere.',
      h1: 'Product Ecosystem, Verified Engineering & Strategic Concepts.',
      breadcrumbs: [
        { name: 'Home', path: '/' },
        { name: 'Selected Projects', path: '/projects' },
      ],
    };
  }

  if (cleanPath.startsWith('/projects/')) {
    const slug = cleanPath.replace('/projects/', '');
    const project = PROJECTS_REGISTRY.find((p) => p.slug === slug);
    if (project) {
      return {
        canonicalUrl: `${baseDomain}/projects/${project.slug}`,
        title: `${project.name} — ${project.status} | SK Developers Architecture`,
        description: project.summary,
        h1: project.name,
        breadcrumbs: [
          { name: 'Home', path: '/' },
          { name: 'Projects', path: '/projects' },
          { name: project.name, path: `/projects/${project.slug}` },
        ],
      };
    }
  }

  if (cleanPath === '/industries') {
    return {
      canonicalUrl: `${baseDomain}/industries`,
      title: 'Industries We Serve — PropTech, Retail, Mobility, FinTech & AI | SK Developers',
      description:
        'Domain-specific software engineering for Property Development & Construction, Retail & Wholesale, Mobility & Logistics, FinTech, and Customer Communications.',
      h1: 'Industry-Specific Engineering for Complex Operations.',
      breadcrumbs: [
        { name: 'Home', path: '/' },
        { name: 'Industries', path: '/industries' },
      ],
    };
  }

  if (cleanPath.startsWith('/industries/')) {
    const slug = cleanPath.replace('/industries/', '');
    const industry = INDUSTRIES_REGISTRY.find((i) => i.slug === slug);
    if (industry) {
      return {
        canonicalUrl: `${baseDomain}/industries/${industry.slug}`,
        title: industry.seoTitle,
        description: industry.seoDescription,
        h1: industry.headline,
        breadcrumbs: [
          { name: 'Home', path: '/' },
          { name: 'Industries', path: '/industries' },
          { name: industry.title, path: `/industries/${industry.slug}` },
        ],
      };
    }
  }

  if (cleanPath === '/solutions') {
    return {
      canonicalUrl: `${baseDomain}/solutions`,
      title: 'Interactive Business Solution Explorer | SK Developers',
      description:
        'Configure your business category, operational challenge, and software goals to generate a tailored SK Developers architecture blueprint and consultation brief.',
      h1: 'What Do You Want to Build?',
      breadcrumbs: [
        { name: 'Home', path: '/' },
        { name: 'Solution Explorer', path: '/solutions' },
      ],
    };
  }

  if (cleanPath === '/insights') {
    return {
      canonicalUrl: `${baseDomain}/insights`,
      title: 'Engineering Insights & Systems Architecture Articles | SK Developers',
      description:
        'Technical articles by Muhammad Salman Khalid on PostgreSQL financial ledgers, Laravel ERP architecture, safe AI agents, multi-tenant SaaS, and Docker DevOps.',
      h1: 'Engineering Insights & Architectural Notes.',
      breadcrumbs: [
        { name: 'Home', path: '/' },
        { name: 'Insights', path: '/insights' },
      ],
    };
  }

  if (cleanPath.startsWith('/insights/')) {
    const slug = cleanPath.replace('/insights/', '');
    const article = ARTICLES_REGISTRY.find((a) => a.slug === slug);
    if (article) {
      return {
        canonicalUrl: `${baseDomain}/insights/${article.slug}`,
        title: article.seoTitle,
        description: article.seoDescription,
        h1: article.title,
        breadcrumbs: [
          { name: 'Home', path: '/' },
          { name: 'Insights', path: '/insights' },
          { name: article.title, path: `/insights/${article.slug}` },
        ],
      };
    }
  }

  if (cleanPath === '/deployment') {
    return {
      canonicalUrl: `${baseDomain}/deployment`,
      title: 'Self-Hosted Contabo VPS, Virtualmin & Docker Deployment Architecture | SK Developers',
      description:
        'Production Docker, loopback reverse proxy, Virtualmin compatibility, GitHub Actions CI/CD, and reversible cutover runbook for skdevelopers.info.',
      h1: 'Self-Hosted Production Deployment & Rollback Runbook.',
      breadcrumbs: [
        { name: 'Home', path: '/' },
        { name: 'Deployment & DevOps Runbook', path: '/deployment' },
      ],
    };
  }

  if (cleanPath === '/contact') {
    return {
      canonicalUrl: `${baseDomain}/contact`,
      title: 'Request an Architectural Consultation | Contact SK Developers',
      description:
        'Discuss your ERP, SaaS, AI automation, FinTech, or cloud infrastructure project directly with Muhammad Salman Khalid and SK Developers.',
      h1: 'Discuss Your Project With SK Developers.',
      breadcrumbs: [
        { name: 'Home', path: '/' },
        { name: 'Contact & Consultation', path: '/contact' },
      ],
    };
  }

  return {
    canonicalUrl: `${baseDomain}${cleanPath}`,
    title: 'Page Not Found | SK Developers',
    description: 'The requested page could not be found on skdevelopers.info.',
    h1: 'Route Not Found.',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: '404 Not Found', path: cleanPath },
    ],
  };
}
