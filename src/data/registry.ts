export type ProjectStatus =
  | 'LIVE PRODUCT'
  | 'ACTIVE DEVELOPMENT'
  | 'VERIFIED DELIVERY'
  | 'RESEARCH & DEVELOPMENT'
  | 'CONCEPT / PROPOSAL';

export type ProjectClassification =
  | 'Product'
  | 'Client Engagement'
  | 'R&D Project'
  | 'Strategic Concept';

export type ProjectFilterTag =
  | 'All'
  | 'Products'
  | 'Client Engineering'
  | 'Enterprise'
  | 'AI'
  | 'Commerce'
  | 'FinTech'
  | 'R&D'
  | 'Concepts';

export interface ProjectRecord {
  slug: string;
  name: string;
  category: string;
  industry: string;
  summary: string;
  valueProposition: string;
  businessProblem: string;
  solutionArchitecture: string;
  engineeringHighlights: string[];
  technologies: string[];
  publicWebsite?: string;
  secondaryWebsites?: string[];
  status: ProjectStatus;
  classification: ProjectClassification;
  publicationApproved: boolean;
  confidentialityNote: string;
  caseStudyAvailable: boolean;
  verifiedAssetUrl?: string;
  verifiedAssetAlt?: string;
  filterTags: ProjectFilterTag[];
  featuredSpotlight?: boolean;
  substantiatedNotes: string;
}

export interface ServiceRecord {
  slug: string;
  indexNumber: string;
  title: string;
  shortTitle: string;
  headline: string;
  summary: string;
  businessProblemSolved: string;
  targetAudience: string[];
  systemsWeBuild: string[];
  reliabilityPractices: string[];
  engagementProcess: {
    step: string;
    title: string;
    detail: string;
  }[];
  relatedProjectSlugs: string[];
  technologies: string[];
  seoTitle: string;
  seoDescription: string;
}

export interface IndustryRecord {
  slug: string;
  title: string;
  shortTitle: string;
  headline: string;
  summary: string;
  operationalChallenges: string[];
  engineeredSolutions: string[];
  keyModules: string[];
  relatedProjectSlugs: string[];
  relatedServiceSlugs: string[];
  seoTitle: string;
  seoDescription: string;
}

export interface ArticleRecord {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  publishedAt: string;
  readingTime: string;
  publicationState: 'PUBLISHED' | 'DRAFT';
  author: string;
  authorRole: string;
  summary: string;
  keyTakeaways: string[];
  sections: {
    heading: string;
    paragraphs: string[];
    codeSnippet?: {
      language: string;
      caption: string;
      code: string;
    };
  }[];
  relatedServiceSlugs: string[];
  relatedProjectSlugs: string[];
  seoTitle: string;
  seoDescription: string;
}

export interface IntelligenceNode {
  id: string;
  label: string;
  shortLabel: string;
  domainTitle: string;
  summary: string;
  architecturalPillar: string;
  stack: string[];
  linkedRoute: string;
  linkedProjectName: string;
  linkedProjectUrl?: string;
  coordinates: { x: number; y: number; z: number };
}

export const SITE_SETTINGS = {
  companyName: 'SK Developers',
  canonicalDomain: 'https://skdevelopers.info',
  tagline: 'Engineering Intelligent Digital Systems.',
  secondaryPositioning: 'Enterprise Software. AI Automation. Cloud Infrastructure.',
  founder: {
    name: 'Muhammad Salman Khalid',
    title: 'Founder, Senior Software Architect & Senior AI / DevOps Engineer',
    experienceYears: '15+ Years',
    coreQuote: 'We don’t simply deliver features. We engineer systems that remain reliable as businesses grow.',
    introParagraphs: [
      "I'm Muhammad Salman Khalid, Founder of SK Developers and a Senior Software Architect with over 15 years of experience designing, building and improving business-critical software.",
      'My work spans enterprise ERP systems, multi-tenant SaaS platforms, secure financial workflows, API integrations, AI automation and production infrastructure.',
      'I help businesses transform complex operational challenges into maintainable, scalable software systems—combining practical engineering, disciplined architecture and long-term product thinking.',
    ],
    specializations: [
      'PHP & Laravel Enterprise Architecture',
      'PostgreSQL & Financial Data Integrity',
      'Python & FastAPI Microservices',
      'React / Next.js & Modern Frontend Systems',
      'API Design & Third-Party Integrations',
      'Docker, Linux & CI/CD Pipelines',
      'Cloud Architecture & Production Observability',
      'Secure Scalable Multi-Tenant Design',
      'AI-Assisted Workflow Automation',
      'Real-Time Systems, WebRTC & Messaging',
    ],
  },
  contact: {
    whatsappDisplay: '+92 300 8666716',
    whatsappNumber: '923008666716',
    whatsappUrl: 'https://wa.me/923008666716',
    consultationRoute: '/contact',
    responseWindow: 'Direct architectural response within 1 business day',
    // Editable profile URLs — kept configurable without inventing unverified paths
    upworkProfileUrl: '',
    linkedinProfileUrl: '',
    githubOrgUrl: 'https://github.com',
  },
  ecosystemDomains: [
    {
      name: 'SK Developers',
      domain: 'skdevelopers.info',
      url: 'https://skdevelopers.info',
      role: 'Corporate Engineering & Architecture Practice',
      status: 'Canonical Platform',
    },
    {
      name: 'SKOS Cloud',
      domain: 'skos.cloud',
      url: 'https://skos.cloud',
      role: 'Enterprise ERP, Cloud SaaS & AI Business Operating System',
      status: 'Live Product Ecosystem',
    },
    {
      name: 'Callify Pro',
      domain: 'callify.pro',
      url: 'https://callify.pro',
      role: 'AI Communications & Real-Time Engagement Platform',
      status: 'Active Engineering',
    },
    {
      name: 'EverestBuy',
      domain: 'everestbuy.pk',
      url: 'https://everestbuy.pk',
      role: 'Trust-Focused Retail Initiative on SK AI Commerce',
      status: 'Launch Preparation',
    },
    {
      name: 'DriveNow Live',
      domain: 'drivenow.live',
      url: 'https://drivenow.live',
      role: 'Mobility Dispatch & Real-Time Operations Platform',
      status: 'Active Development',
    },
    {
      name: 'DriveNow Pakistan',
      domain: 'drivenow.pk',
      url: 'https://drivenow.pk',
      role: 'Regional Mobility & Fleet Portal',
      status: 'Active Development',
    },
  ],
  infrastructureTarget: {
    provider: 'Contabo Cloud VPS (12 GB RAM / Production Linux Host)',
    controlPanel: 'Virtualmin (Existing Web Server Reverse Proxy Preserved)',
    containerBinding: '127.0.0.1:3080 -> Container Port 3000 (Loopback Only)',
    processUser: 'Non-root node user (UID 1001)',
  },
};

export const INTELLIGENCE_NODES: IntelligenceNode[] = [
  {
    id: 'enterprise-erp',
    label: 'Enterprise ERP',
    shortLabel: 'ERP Core',
    domainTitle: 'Multi-Branch Enterprise ERP & Operational Ledgers',
    summary:
      'Double-entry accounting, multi-warehouse inventory, procurement controls, digital khata, and role-governed audit trails built on Laravel and PostgreSQL.',
    architecturalPillar: 'ACID Transactional Integrity & Auditability',
    stack: ['Laravel', 'PostgreSQL', 'Redis', 'REST APIs'],
    linkedRoute: '/services/enterprise-erp',
    linkedProjectName: 'SKOS Cloud (skos.cloud)',
    linkedProjectUrl: 'https://skos.cloud',
    coordinates: { x: -1.8, y: 1.1, z: 0.4 },
  },
  {
    id: 'ai-automation',
    label: 'AI Automation',
    shortLabel: 'AI Agents',
    domainTitle: 'Deterministic AI Workflows & OCR/Voice Automation',
    summary:
      'Production AI integrations with strict schema validation, human-in-the-loop approvals, FastAPI document OCR pipelines, and real-time voice routing.',
    architecturalPillar: 'Bounded Tool Execution & Verifiable Outputs',
    stack: ['Python', 'FastAPI', 'LLM Tool Calling', 'WebRTC / SIP'],
    linkedRoute: '/services/ai-automation',
    linkedProjectName: 'Callify Pro (callify.pro)',
    linkedProjectUrl: 'https://callify.pro',
    coordinates: { x: 1.9, y: 1.15, z: 0.3 },
  },
  {
    id: 'cloud-devops',
    label: 'Cloud & DevOps',
    shortLabel: 'Cloud / VPS',
    domainTitle: 'Self-Hosted Linux Infrastructure, Docker & CI/CD',
    summary:
      'Hardened Docker containers, loopback reverse-proxy topologies for Virtualmin/Nginx, automated database backups, and zero-downtime GitHub Actions pipelines.',
    architecturalPillar: 'Loopback Isolation & Reversible Releases',
    stack: ['Docker', 'Linux / Virtualmin', 'GitHub Actions', 'Nginx / Apache'],
    linkedRoute: '/services/cloud-devops',
    linkedProjectName: 'Contabo 12GB VPS Architecture',
    coordinates: { x: 2.1, y: -0.2, z: -0.3 },
  },
  {
    id: 'fintech-systems',
    label: 'FinTech Systems',
    shortLabel: 'FinTech',
    domainTitle: 'Idempotent Financial Workflows & Ledger Engineering',
    summary:
      'Row-locked ledger mutations, idempotent webhook ingestion, automated reconciliation routines, and tamper-evident financial state machines.',
    architecturalPillar: 'Zero-Drift Double-Entry Reconciliation',
    stack: ['PostgreSQL', 'Serializable Locks', 'Laravel', 'Idempotency Keys'],
    linkedRoute: '/services/fintech-systems',
    linkedProjectName: 'GECIM Financial Ledger Core',
    coordinates: { x: -2.0, y: -0.25, z: -0.2 },
  },
  {
    id: 'commerce-platforms',
    label: 'Commerce Platforms',
    shortLabel: 'Commerce',
    domainTitle: 'Multi-Tenant SaaS Storefronts & Retail Engines',
    summary:
      'Tenant-aware catalog architecture, synchronized warehouse stock, COD/payment gateway orchestration, and high-speed storefront rendering.',
    architecturalPillar: 'Tenant Isolation & High-Conversion Checkout',
    stack: ['Next.js / React', 'Laravel API', 'PostgreSQL', 'Redis Cache'],
    linkedRoute: '/services/ecommerce-engineering',
    linkedProjectName: 'EverestBuy (everestbuy.pk)',
    linkedProjectUrl: 'https://everestbuy.pk',
    coordinates: { x: -1.1, y: -1.35, z: 0.5 },
  },
  {
    id: 'realtime-apps',
    label: 'Real-Time Applications',
    shortLabel: 'Real-Time',
    domainTitle: 'Spatial Dispatch, Telemetry & Low-Latency Signaling',
    summary:
      'PostGIS geospatial indexing, WebSocket/Redis pub-sub event buses, rider-driver state synchronization, and live communications orchestration.',
    architecturalPillar: 'Sub-Second State Sync & Spatial Indexing',
    stack: ['PostGIS', 'Redis Pub/Sub', 'Flutter', 'WebSockets'],
    linkedRoute: '/services/saas-development',
    linkedProjectName: 'DriveNow (drivenow.live / drivenow.pk)',
    linkedProjectUrl: 'https://drivenow.live',
    coordinates: { x: 1.2, y: -1.35, z: 0.45 },
  },
];

export const PROJECTS_REGISTRY: ProjectRecord[] = [
  {
    slug: 'skos-cloud',
    name: 'SKOS Cloud',
    category: 'Enterprise ERP · Cloud SaaS · AI Business Operating System',
    industry: 'Retail, Wholesale, Distribution & SMEs',
    summary:
      'A cloud business operating platform engineered for SMEs, traders, wholesalers, retailers, and service organizations—unifying accounting, digital khata, inventory, sales, purchases, reporting, and AI-assisted operational workflows.',
    valueProposition:
      'Replaces fragmented spreadsheets and disconnected billing tools with a unified, multi-branch ledger and inventory operating system.',
    businessProblem:
      'Growing trading, wholesale, and retail enterprises frequently lose financial visibility across branches due to manual book-keeping, delayed stock reconciliation, and unverified credit/khata tracking.',
    solutionArchitecture:
      'Engineered by SK Developers as a multi-tenant cloud ERP ecosystem with strict double-entry accounting principles, branch-scoped inventory movements, purchase-to-pay workflows, customer/supplier khata ledgers, and modular AI-assisted reporting.',
    engineeringHighlights: [
      'Double-entry accounting core with immutable voucher journals and audit history',
      'Multi-warehouse and branch-level stock ledger with batch and reorder tracking',
      'Digital Khata and credit limit controls with automated statement generation',
      'Role-based access control separating cashier, storekeeper, accountant, and executive permissions',
    ],
    technologies: ['Laravel', 'PHP', 'PostgreSQL', 'React', 'Redis', 'Docker', 'REST APIs'],
    publicWebsite: 'https://skos.cloud',
    status: 'LIVE PRODUCT',
    classification: 'Product',
    publicationApproved: true,
    confidentialityNote:
      'Official SK Developers flagship product ecosystem. Public web portal is live at skos.cloud; modules are continuously expanded under verified release governance.',
    caseStudyAvailable: true,
    verifiedAssetUrl: '/src/assets/images/skos_cloud_erp_showcase_1794129434354.jpg',
    verifiedAssetAlt: 'SKOS Cloud enterprise ERP and financial ledger architectural diagram',
    filterTags: ['All', 'Products', 'Enterprise', 'AI'],
    featuredSpotlight: true,
    substantiatedNotes:
      'Public platform accessible at https://skos.cloud. Displayed architectural capabilities reflect the SKOS Cloud product ecosystem engineered by SK Developers.',
  },
  {
    slug: 'callify-pro',
    name: 'Callify Pro / Callify AI',
    category: 'AI Communications · Real-Time Customer Engagement',
    industry: 'Communications & Customer Operations',
    summary:
      'Real-time communications and customer engagement engineering combining telephony integration patterns, structured call workflows, and AI-assisted conversation routing.',
    valueProposition:
      'Bridges low-latency telephony signaling with structured CRM workflows and deterministic AI call assistance.',
    businessProblem:
      'Customer operations teams struggle with disconnected voice channels, manual call logging, high response latency, and brittle voice bots that fail to hand off context to human agents.',
    solutionArchitecture:
      'Architected around low-latency event streams, SIP/WebRTC session orchestration, webhook-driven CRM state synchronization, and bounded AI workflow automation.',
    engineeringHighlights: [
      'Real-time call state machine and event ingestion pipeline',
      'Structured post-call summarization and CRM action dispatch hooks',
      'Configurable queue routing and agent availability presence tracking',
      'Strict latency budgets and fallback routing when external AI services degrade',
    ],
    technologies: ['Python', 'FastAPI', 'WebRTC / SIP', 'Node.js', 'Redis', 'PostgreSQL', 'Docker'],
    publicWebsite: 'https://callify.pro',
    status: 'ACTIVE DEVELOPMENT',
    classification: 'Product',
    publicationApproved: true,
    confidentialityNote:
      'Public product domain registered at callify.pro. Feature rollout and enterprise telephony integrations are under active engineering verification.',
    caseStudyAvailable: true,
    verifiedAssetUrl: '/src/assets/images/callify_ai_comm_showcase_1794129439300.jpg',
    verifiedAssetAlt: 'Callify Pro real-time voice routing and AI communications architecture',
    filterTags: ['All', 'Products', 'AI', 'Enterprise'],
    featuredSpotlight: true,
    substantiatedNotes:
      'Domain live at https://callify.pro. Presented truthfully as an active communications engineering platform without fabricated customer adoption numbers.',
  },
  {
    slug: 'everestbuy',
    name: 'EverestBuy',
    category: 'Retail Technology · Digital Commerce',
    industry: 'Retail & E-Commerce',
    summary:
      'A curated, trust-focused Pakistani e-commerce retail initiative connected to the SK AI Commerce ecosystem, validating high-reliability storefront, catalog, order, and fulfillment workflows.',
    valueProposition:
      'Demonstrates practical retail execution—combining fast storefront performance with disciplined catalog, COD verification, and order lifecycle management.',
    businessProblem:
      'Regional online shoppers face inconsistent product quality, opaque order tracking, and unreliable Cash-on-Delivery (COD) fulfillment workflows.',
    solutionArchitecture:
      'Built on SK Developers’ modular commerce architecture with structured SKU/variant management, real-time stock reservation, COD confirmation workflows, and mobile-first checkout optimization.',
    engineeringHighlights: [
      'Fast server-rendered product catalog with structured schema metadata',
      'Order state machine covering placement, verification, dispatch, and settlement',
      'Inventory synchronization preventing overselling across active SKUs',
      'Integrated directly with the foundational SK AI Commerce multi-tenant engine',
    ],
    technologies: ['Next.js', 'TypeScript', 'Laravel', 'PostgreSQL', 'Redis', 'Tailwind CSS'],
    publicWebsite: 'https://everestbuy.pk',
    status: 'ACTIVE DEVELOPMENT',
    classification: 'Product',
    publicationApproved: true,
    confidentialityNote:
      'SK Developers retail commerce initiative at everestbuy.pk. Currently in launch preparation and active iterative development.',
    caseStudyAvailable: true,
    verifiedAssetUrl: '/src/assets/images/everestbuy_commerce_showcase_1794129437049.jpg',
    verifiedAssetAlt: 'EverestBuy modular digital commerce and fulfillment architecture',
    filterTags: ['All', 'Products', 'Commerce'],
    featuredSpotlight: true,
    substantiatedNotes:
      'Public web presence at https://everestbuy.pk. Positioned transparently in launch preparation / active development.',
  },
  {
    slug: 'sk-ai-commerce',
    name: 'SK AI Commerce',
    category: 'SaaS Commerce · Multi-Tenant Architecture · AI',
    industry: 'Retail & Wholesale Technology',
    summary:
      'A modular multi-tenant commerce engine engineered for tenant-aware storefronts, reusable theme architectures, centralized catalog APIs, and AI-assisted merchandising workflows.',
    valueProposition:
      'Enables retailers and brands to launch isolated, high-speed storefronts backed by a single maintainable commerce kernel.',
    businessProblem:
      'Maintaining separate codebases for multiple retail brands creates severe technical debt, slow security patching, and fragmented inventory/order pipelines.',
    solutionArchitecture:
      'Engineered with strict tenant context resolution, shared-schema row isolation in PostgreSQL, decoupled storefront theme contracts, and background job queues for catalog enrichment.',
    engineeringHighlights: [
      'Domain and subdomain tenant resolution middleware with Redis caching',
      'API-first cart, pricing, tax, and order orchestration services',
      'Reusable storefront component system with strict Core Web Vitals budgets',
      'Modular hooks for AI-assisted catalog tagging and search relevance',
    ],
    technologies: ['Laravel', 'PostgreSQL', 'Next.js', 'TypeScript', 'Redis', 'Docker'],
    status: 'ACTIVE DEVELOPMENT',
    classification: 'Product',
    publicationApproved: true,
    confidentialityNote:
      'Internal SK Developers SaaS platform architecture powering EverestBuy and future multi-tenant retail deployments.',
    caseStudyAvailable: true,
    verifiedAssetUrl: '/src/assets/images/everestbuy_commerce_showcase_1794129437049.jpg',
    verifiedAssetAlt: 'SK AI Commerce multi-tenant storefront and API architecture',
    filterTags: ['All', 'Products', 'Commerce', 'AI', 'Enterprise'],
    substantiatedNotes:
      'Presented accurately as an active platform engineering initiative without claiming unverified third-party merchant counts.',
  },
  {
    slug: 'drivenow',
    name: 'DriveNow Mobility Ecosystem',
    category: 'Mobility Technology · Ride-Hailing · Real-Time Systems',
    industry: 'Mobility, Fleet & On-Demand Logistics',
    summary:
      'A full-spectrum mobility platform encompassing rider and driver mobile applications, real-time geospatial dispatch, mapping integrations, live trip telemetry, and operations control dashboards.',
    valueProposition:
      'Coordinates low-latency driver matching, spatial radius search, and trip lifecycle state machines across mobile and web endpoints.',
    businessProblem:
      'On-demand mobility platforms fail when GPS telemetry floods the database, dispatch matching creates race conditions, or fare calculations drift during network drops.',
    solutionArchitecture:
      'Engineered using Laravel backend services, PostgreSQL with PostGIS spatial indexing for proximity queries, Redis Pub/Sub for real-time driver location streams, and cross-platform Flutter applications.',
    engineeringHighlights: [
      'PostGIS geospatial radius querying and zone-based surge/tariff rules',
      'Idempotent trip state transitions (Requested -> Accepted -> Arrived -> In-Progress -> Completed)',
      'Real-time driver telemetry ingestion buffered through Redis streams',
      'Operations control center for driver onboarding, document verification, and trip dispute resolution',
    ],
    technologies: ['Laravel', 'PostgreSQL / PostGIS', 'Flutter', 'Redis', 'WebSockets', 'Google Maps API'],
    publicWebsite: 'https://drivenow.live',
    secondaryWebsites: ['https://drivenow.pk'],
    status: 'ACTIVE DEVELOPMENT',
    classification: 'Client Engagement',
    publicationApproved: false,
    confidentialityNote:
      'Active Client Development. High-level architectural domain and public portals (drivenow.live / drivenow.pk) are referenced; proprietary client contract terms, internal schemas, and operational metrics remain strictly confidential by default.',
    caseStudyAvailable: true,
    verifiedAssetUrl: '/src/assets/images/drivenow_mobility_showcase_1794129437596.jpg',
    verifiedAssetAlt: 'DriveNow urban mobility and geospatial dispatch grid visualization',
    filterTags: ['All', 'Client Engineering', 'Enterprise'],
    featuredSpotlight: true,
    substantiatedNotes:
      'Public domains https://drivenow.live and https://drivenow.pk provided by founder. Client-confidential internals remain withheld.',
  },
  {
    slug: 'gecim',
    name: 'GECIM Financial & Ledger Core',
    category: 'FinTech · Web3 · Transactional Ledger Engineering',
    industry: 'Financial Technology',
    summary:
      'A high-integrity financial and ledger engineering engagement focused on idempotent transaction processing, double-entry balance invariants, auditability, and operational resilience.',
    valueProposition:
      'Eliminates race conditions, duplicate credits, and reconciliation drift in high-concurrency transactional workflows.',
    businessProblem:
      'Financial and digital-asset workflows are vulnerable to concurrent double-spend anomalies, webhook replay hazards, and un-auditable balance mutations when built like standard CRUD apps.',
    solutionArchitecture:
      'Architected around append-only ledger entries, PostgreSQL pessimistic row locking (`SELECT ... FOR UPDATE`), deterministic idempotency keys, and multi-stage transaction verification.',
    engineeringHighlights: [
      'Append-only journal entries where account balances are derived from immutable ledger lines',
      'Strict idempotency middleware preventing duplicate execution on network retries',
      'Automated invariant verification jobs detecting sub-cent ledger discrepancies',
      'Hardened role separation and cryptographic audit trail logging',
    ],
    technologies: ['Laravel', 'PostgreSQL', 'Redis Locks', 'Python', 'Docker', 'Transactional Ledger Design'],
    status: 'ACTIVE DEVELOPMENT',
    classification: 'Client Engagement',
    publicationApproved: false,
    confidentialityNote:
      'Active Engineering Engagement. Customer identifiers, wallet addresses, private repositories, and proprietary financial mechanics are strictly withheld under confidentiality governance.',
    caseStudyAvailable: false,
    filterTags: ['All', 'Client Engineering', 'FinTech', 'Enterprise'],
    substantiatedNotes:
      'Sanitized architectural summary only. No investment, regulatory, or customer-identifiable claims are published.',
  },
  {
    slug: 'sk-livingsphere',
    name: 'SK LivingSphere',
    category: 'PropTech · Construction ERP · Smart Building Operations',
    industry: 'Property Development & Construction',
    summary:
      'A strategic PropTech and enterprise ERP concept designed for real-estate developers, high-rise residential operators, and construction firms—unifying project cost control, installment ledgers, resident services, and facility maintenance.',
    valueProposition:
      'Connects construction site material accountability with buyer installment ledgers and post-handover building operations in a single lifecycle platform.',
    businessProblem:
      'Property developers lose margin across three disconnected phases: unverified site material consumption during construction, complex buyer installment/surcharge tracking during sales, and fragmented maintenance billing after handover.',
    solutionArchitecture:
      'Proposed modular architecture combining a Construction BOQ & Material Ledger, Unit Inventory & Installment Schedule Engine, Resident Self-Service Portal, and future Digital-Twin IoT telemetry hooks.',
    engineeringHighlights: [
      'Bill of Quantities (BOQ) vs. actual site material issuance and contractor IPC billing controls',
      'Unit allocation, payment plan schedules, transfer audit logs, and automated demand notices',
      'Facility maintenance ticketing, utility sub-metering, and service-charge collection workflows',
      'AI operational assistant concept for executive cost-variance querying',
    ],
    technologies: ['Laravel', 'PostgreSQL', 'Next.js', 'Python / FastAPI', 'Three.js / Spatial Concept'],
    status: 'CONCEPT / PROPOSAL',
    classification: 'Strategic Concept',
    publicationApproved: true,
    confidentialityNote:
      'Strategic Concept & Architectural Proposal developed by SK Developers. Explicitly labeled as a strategic blueprint—not a contracted deployment for any third-party developer.',
    caseStudyAvailable: true,
    verifiedAssetUrl: '/src/assets/images/skos_cloud_erp_showcase_1794129434354.jpg',
    verifiedAssetAlt: 'SK LivingSphere PropTech and construction ERP strategic concept architecture',
    filterTags: ['All', 'Concepts', 'Enterprise', 'AI'],
    substantiatedNotes:
      'Clearly labeled as Strategic Concept / Proposal. Does not imply third-party endorsement or completed enterprise deployment.',
  },
  {
    slug: 'qman',
    name: 'QMan Queue & Service Management',
    category: 'Queue Management · Service Operations',
    industry: 'Customer Service & Branch Operations',
    summary:
      'Draft engineering record for queue orchestration, token lifecycle management, and service-desk routing workflows.',
    valueProposition:
      'Structured digital queue and counter allocation framework currently undergoing publication verification.',
    businessProblem:
      'Physical service branches and clinics experience walk-in congestion and opaque wait times without structured token and counter state tracking.',
    solutionArchitecture:
      'Draft architectural record stored in the SK Developers content registry pending formal verification of scope, release status, and publication clearance.',
    engineeringHighlights: [
      'Draft project record maintained under strict content governance',
      'No unverified capabilities, integrations, or release metrics are claimed',
    ],
    technologies: ['Laravel', 'PostgreSQL', 'WebSockets'],
    status: 'RESEARCH & DEVELOPMENT',
    classification: 'R&D Project',
    publicationApproved: false,
    confidentialityNote:
      'Draft project record only — flagged "Verify Before Publication". Hidden from public default view until scope and release status are independently verified.',
    caseStudyAvailable: false,
    filterTags: ['All', 'R&D'],
    substantiatedNotes:
      'Maintained as a governed draft record per SK Developers truthfulness policy.',
  },
  {
    slug: 'fastapi-ocr-automation',
    name: 'FastAPI Document & Invoice OCR Pipeline',
    category: 'AI Automation · Document Intelligence · API Engineering',
    industry: 'Cross-Industry Back-Office Operations',
    summary:
      'Asynchronous Python and FastAPI document processing pipeline that extracts structured line items from scanned invoices, receipts, and identity forms into validated ERP payloads.',
    valueProposition:
      'Eliminates manual data-entry bottlenecks while enforcing confidence thresholds and human verification queues before mutating financial databases.',
    businessProblem:
      'Accounting and procurement clerks spend hours manually typing supplier bills and bank slips into ERP software, introducing transcription errors and delayed ledger closing.',
    solutionArchitecture:
      'Built with Python/FastAPI worker queues, image pre-processing (deskewing/contrast normalization), structured OCR/vision extraction with strict Pydantic validation, and confidence-based human review routing.',
    engineeringHighlights: [
      'Asynchronous task queuing with deterministic webhook callbacks to Laravel ERP backends',
      'Field-level confidence scoring that flags ambiguous totals or tax IDs for human review',
      'Strict schema validation ensuring malformed OCR outputs never corrupt database tables',
      'Dockerized microservice deployment isolated on internal loopback networks',
    ],
    technologies: ['Python', 'FastAPI', 'Pydantic', 'Redis Queues', 'Docker', 'PostgreSQL'],
    status: 'VERIFIED DELIVERY',
    classification: 'Client Engagement',
    publicationApproved: true,
    confidentialityNote:
      'Verified technical pattern delivered across SK Developers automation workflows. Client-specific documents and datasets remain private.',
    caseStudyAvailable: true,
    filterTags: ['All', 'Client Engineering', 'AI', 'Enterprise'],
    substantiatedNotes:
      'Represents verified engineering implementation patterns without fabricating synthetic speed/accuracy percentages.',
  },
  {
    slug: 'property-crm-workflows',
    name: 'Property & Construction CRM Workflow Engine',
    category: 'Enterprise Workflows · CRM · Financial Schedules',
    industry: 'Property Development & Real Estate',
    summary:
      'Custom lead-to-allotment CRM and installment tracking workflows built for property sales teams, connecting inquiry pipelines with unit reservation and payment schedule ledgers.',
    valueProposition:
      'Prevents double-allotment of property units and automates installment reminders, receipt verification, and sales commission rules.',
    businessProblem:
      'Generic CRMs handle sales calls well but fail completely once a property unit is booked—unable to manage multi-year installment plans, transfer fees, or construction-linked milestones.',
    solutionArchitecture:
      'Engineered on Laravel and PostgreSQL with atomic unit reservation locks, customizable installment schedule generators, and automated WhatsApp/SMS notification triggers.',
    engineeringHighlights: [
      'Lead source attribution and automated sales pipeline stage tracking',
      'Atomic inventory reservation preventing concurrent booking of the same plot or apartment',
      'Installment schedule generator supporting down payments, balloon payments, and possession milestones',
      'Audit-logged receipt verification workflow for finance controllers',
    ],
    technologies: ['Laravel', 'PHP', 'PostgreSQL', 'React', 'Redis', 'WhatsApp API Integration'],
    status: 'VERIFIED DELIVERY',
    classification: 'Client Engagement',
    publicationApproved: true,
    confidentialityNote:
      'Verified architectural capability. Specific client inventory records and commercial terms are kept confidential.',
    caseStudyAvailable: true,
    filterTags: ['All', 'Client Engineering', 'Enterprise'],
    substantiatedNotes:
      'Demonstrates domain expertise in property and construction software workflows.',
  },
  {
    slug: 'payment-ledger-architecture',
    name: 'Multi-Gateway Payment & Reconciliation Engine',
    category: 'FinTech · Payment Architecture · API Integrations',
    industry: 'Financial Technology & E-Commerce',
    summary:
      'Resilient payment orchestration layer handling checkout intents, asynchronous webhook verification, idempotency locks, and daily settlement reconciliation.',
    valueProposition:
      'Shields core business applications from gateway timeouts, duplicate webhook deliveries, and partial settlement mismatches.',
    businessProblem:
      'Direct coupling to payment gateways inside controller methods leads to lost orders when users close browsers mid-redirect or when gateways fire duplicate webhook events simultaneously.',
    solutionArchitecture:
      'Decoupled payment intent state machine with cryptographic signature verification, database-backed idempotency keys, and scheduled reconciliation jobs.',
    engineeringHighlights: [
      'Cryptographic webhook signature verification and payload archival prior to processing',
      'Database-enforced idempotency locks preventing double-crediting on concurrent callbacks',
      'Automated settlement comparison flagging gateway-vs-ledger variances',
      'Clean adapter pattern allowing new regional or international gateways without rewriting checkout logic',
    ],
    technologies: ['Laravel', 'PostgreSQL', 'Redis', 'REST Webhooks', 'HMAC Security'],
    status: 'VERIFIED DELIVERY',
    classification: 'Client Engagement',
    publicationApproved: true,
    confidentialityNote:
      'Verified engineering architecture pattern. Merchant keys and customer transaction logs are never exposed.',
    caseStudyAvailable: true,
    filterTags: ['All', 'Client Engineering', 'FinTech', 'Commerce'],
    substantiatedNotes:
      'Focuses on verifiable software engineering practices for financial reliability.',
  },
  {
    slug: 'webrtc-realtime-comms',
    name: 'WebRTC & Low-Latency Signaling Infrastructure',
    category: 'Real-Time Systems · WebRTC · Event Broadcasting',
    industry: 'Communications & Collaborative Platforms',
    summary:
      'Real-time signaling, presence tracking, and browser-to-server audio/event transport architecture supporting interactive communication workflows.',
    valueProposition:
      'Delivers reliable NAT traversal, session state recovery, and low-latency event synchronization for interactive web and mobile platforms.',
    businessProblem:
      'Real-time voice and live operational dashboards drop connections across unstable mobile networks when built without proper TURN/STUN provisioning and heartbeat state recovery.',
    solutionArchitecture:
      'Combines WebSocket signaling servers, Redis presence registries, COTURN relay configuration, and automatic client reconnection state sync.',
    engineeringHighlights: [
      'Sub-second presence and session state synchronization across distributed workers',
      'Graceful reconnection handling that restores active session state after brief network drops',
      'Isolated media and signaling pathways protecting application servers from bandwidth saturation',
    ],
    technologies: ['Node.js', 'WebRTC', 'WebSockets', 'Redis Pub/Sub', 'Linux / Docker'],
    status: 'VERIFIED DELIVERY',
    classification: 'R&D Project',
    publicationApproved: true,
    confidentialityNote:
      'Verified real-time communications architecture supporting SK Developers engagement platforms.',
    caseStudyAvailable: false,
    filterTags: ['All', 'Client Engineering', 'R&D', 'AI'],
    substantiatedNotes:
      'Foundational real-time engineering capability used in communications and dispatch systems.',
  },
];

export const SERVICES_REGISTRY: ServiceRecord[] = [
  {
    slug: 'enterprise-erp',
    indexNumber: '01',
    title: 'Enterprise ERP Development',
    shortTitle: 'Enterprise ERP',
    headline: 'Custom ERP Systems Engineered Around Your Actual Operational Rules.',
    summary:
      'We design and build multi-branch Enterprise Resource Planning (ERP) platforms—covering financial ledgers, inventory control, procurement, manufacturing/construction BOQs, and executive reporting.',
    businessProblemSolved:
      'Off-the-shelf ERPs either force your business into rigid templates or require expensive, brittle plugins that break during upgrades. Meanwhile, spreadsheets and disconnected accounting tools create blind spots across branches, warehouses, and credit accounts.',
    targetAudience: [
      'Multi-branch retailers, wholesalers, and distribution groups',
      'Property developers, construction firms, and real-estate operators',
      'Manufacturing and supply-chain operations requiring strict material accountability',
      'Growing enterprises outgrowing legacy desktop accounting software',
    ],
    systemsWeBuild: [
      'Double-entry general ledgers, chart of accounts, voucher approvals, and automated trial balances',
      'Multi-warehouse inventory management with batch/lot tracking, stock transfers, and reorder alerts',
      'Purchase-to-pay (requisitions, POs, GRNs, supplier invoices) and order-to-cash pipelines',
      'Customer & supplier digital khata, credit limit enforcement, and aging receivable statements',
      'Construction BOQ cost control, contractor IPC billing, and project-wise profit/loss tracking',
      'Role-based executive dashboards with branch-level and consolidated financial reporting',
    ],
    reliabilityPractices: [
      'ACID-compliant PostgreSQL schemas with foreign-key integrity and append-only financial journals',
      'Strict role-based access control (RBAC) and immutable user audit logs on every state mutation',
      'Database-level row locking to prevent negative stock anomalies during concurrent branch sales',
      'Automated daily encrypted off-site backups and staging migration rehearsals',
    ],
    engagementProcess: [
      {
        step: 'Phase 01',
        title: 'Operational & Ledger Discovery',
        detail:
          'We audit your current chart of accounts, inventory workflows, approval hierarchies, and reporting bottlenecks before writing a single line of schema.',
      },
      {
        step: 'Phase 02',
        title: 'Data Model & Architecture Blueprint',
        detail:
          'We define the PostgreSQL relational schema, role permissions, API contracts, and migration path from your existing spreadsheets or legacy software.',
      },
      {
        step: 'Phase 03',
        title: 'Iterative Module Delivery',
        detail:
          'We deliver working ERP modules in prioritized milestones (Core Ledger & Inventory first, followed by specialized workflows and executive analytics).',
      },
      {
        step: 'Phase 04',
        title: 'Parallel Run, Training & Production Cutover',
        detail:
          'We run your new ERP alongside existing records to verify 100% balance accuracy before final cutover and ongoing production support.',
      },
    ],
    relatedProjectSlugs: ['skos-cloud', 'sk-livingsphere', 'property-crm-workflows'],
    technologies: ['Laravel', 'PHP 8.x', 'PostgreSQL', 'Redis', 'React / Next.js', 'Docker', 'Linux'],
    seoTitle: 'Enterprise ERP Software Development Company | SK Developers',
    seoDescription:
      'Custom enterprise ERP development in Laravel and PostgreSQL. Multi-branch inventory, double-entry financial ledgers, construction ERP, and operational automation by SK Developers.',
  },
  {
    slug: 'ai-automation',
    indexNumber: '02',
    title: 'AI Automation & AI Agents',
    shortTitle: 'AI Automation',
    headline: 'Deterministic AI Workflows That Automate Operations Without Compromising Data Integrity.',
    summary:
      'We engineer production AI agents, FastAPI OCR pipelines, voice/telephony automation, and intelligent ERP assistants that operate inside strict validation guardrails.',
    businessProblemSolved:
      'Most AI demos fail in production because unconstrained LLMs hallucinate numbers, mutate database records unpredictably, or lack fallback handling when external APIs time out. Businesses need AI that executes bounded tasks reliably.',
    targetAudience: [
      'Operations-heavy companies processing high volumes of invoices, receipts, or compliance documents',
      'Customer engagement and call-center teams needing intelligent voice routing and post-call CRM automation',
      'Enterprise leaders wanting natural-language querying over internal ERP and financial datasets',
      'SaaS founders embedding practical AI capabilities into existing software products',
    ],
    systemsWeBuild: [
      'FastAPI & Python OCR document extraction pipelines for invoices, vouchers, and onboarding forms',
      'AI-assisted voice and telephony workflows (SIP/WebRTC integration, call summarization, intent routing)',
      'Read-only analytical AI copilot interfaces over PostgreSQL ERP data with strict SQL/tool sandboxing',
      'Human-in-the-loop approval queues where AI drafts actions and authorized staff approve execution',
      'Automated lead qualification, support triage, and multi-channel WhatsApp/CRM workflow orchestration',
    ],
    reliabilityPractices: [
      'Strict Pydantic / JSON-Schema output validation before any downstream database interaction',
      'Confidence-score thresholds that automatically route uncertain extractions to human review queues',
      'Zero direct write access for LLMs on financial tables—all mutations pass through deterministic domain services',
      'Comprehensive token budgeting, latency timeouts, and graceful degradation when provider APIs slow down',
    ],
    engagementProcess: [
      {
        step: 'Phase 01',
        title: 'Workflow Bottleneck & Risk Audit',
        detail:
          'We identify repetitive manual tasks where AI adds measurable speed, and define strict boundaries where deterministic code must remain in control.',
      },
      {
        step: 'Phase 02',
        title: 'Schema & Guardrail Engineering',
        detail:
          'We build Python/FastAPI or Node.js orchestration pipelines with schema validators, confidence thresholds, and fallback state machines.',
      },
      {
        step: 'Phase 03',
        title: 'ERP / CRM Integration & Human Review UI',
        detail:
          'We connect the automation pipeline to your existing Laravel, Next.js, or third-party systems with clear operator verification screens.',
      },
      {
        step: 'Phase 04',
        title: 'Production Telemetry & Tuning',
        detail:
          'We monitor extraction accuracy, latency, and API costs in production using real operational workloads.',
      },
    ],
    relatedProjectSlugs: ['callify-pro', 'fastapi-ocr-automation', 'skos-cloud'],
    technologies: ['Python', 'FastAPI', 'Pydantic', 'OpenAI / Gemini SDKs', 'WebRTC / SIP', 'Redis', 'Laravel'],
    seoTitle: 'AI Automation & Enterprise AI Agent Development | SK Developers',
    seoDescription:
      'Production AI automation, FastAPI OCR pipelines, voice AI communications, and guarded enterprise AI agents engineered by SK Developers.',
  },
  {
    slug: 'saas-development',
    indexNumber: '03',
    title: 'SaaS Product Development',
    shortTitle: 'SaaS Development',
    headline: 'Multi-Tenant SaaS Architecture Built for Long-Term Product Velocity.',
    summary:
      'From foundational tenant isolation and subscription billing to scalable API design and modern React/Next.js interfaces, we architect SaaS products that scale cleanly beyond MVP.',
    businessProblemSolved:
      'Many startups and enterprise spin-offs build hasty MVPs that collapse as soon as enterprise customers demand tenant data isolation, custom roles, audit logs, webhook reliability, or high-concurrency performance.',
    targetAudience: [
      'Founders and product leaders turning domain expertise into a commercial B2B SaaS platform',
      'Established enterprises productizing internal workflows into subscription software',
      'SaaS companies needing senior architectural rescue to resolve performance or multi-tenancy bottlenecks',
    ],
    systemsWeBuild: [
      'Multi-tenant web applications with tenant-scoped databases or row-level security isolation',
      'Subscription billing, usage metering, plan entitlements, and invoice lifecycle management',
      'API-first SaaS backends with documented REST endpoints, rate limiting, and webhook delivery engines',
      'Real-time collaborative dashboards, notification buses, and cross-platform companion portals',
      'Admin control planes for tenant onboarding, health monitoring, and support impersonation with audit logs',
    ],
    reliabilityPractices: [
      'Automated tenant-context middleware ensuring zero cross-tenant data leakage in queries or cache keys',
      'Idempotent background job queues (Redis / Horizon) for billing, email, and heavy report generation',
      'Zero-downtime database migration strategies safe for live multi-tenant production environments',
      'Strict TypeScript frontend contracts paired with comprehensive backend integration tests',
    ],
    engagementProcess: [
      {
        step: 'Phase 01',
        title: 'Product Scope & Tenancy Architecture',
        detail:
          'We define the tenancy model (shared vs. isolated schemas), billing tiers, core domain entities, and v1 release boundaries.',
      },
      {
        step: 'Phase 02',
        title: 'Core Platform & Auth Foundation',
        detail:
          'We implement tenant resolution, RBAC permissions, billing hooks, and the foundational design system.',
      },
      {
        step: 'Phase 03',
        title: 'Core Domain Workflows & APIs',
        detail:
          'We build the primary business workflows, real-time updates, and external integrations in structured sprints.',
      },
      {
        step: 'Phase 04',
        title: 'Production Hardening & Launch',
        detail:
          'We configure containerized deployment, observability, automated backups, and post-launch iteration pipelines.',
      },
    ],
    relatedProjectSlugs: ['skos-cloud', 'sk-ai-commerce', 'callify-pro', 'drivenow'],
    technologies: ['Next.js', 'React', 'TypeScript', 'Laravel', 'PostgreSQL', 'Redis', 'Docker'],
    seoTitle: 'Multi-Tenant SaaS Product Development Services | SK Developers',
    seoDescription:
      'Architect and build scalable B2B multi-tenant SaaS applications with Laravel, PostgreSQL, Next.js, and React. Led by Senior Software Architect Muhammad Salman Khalid.',
  },
  {
    slug: 'cloud-devops',
    indexNumber: '04',
    title: 'Cloud, DevOps & Infrastructure',
    shortTitle: 'Cloud & DevOps',
    headline: 'Disciplined Linux, Docker, and CI/CD Infrastructure Without Runaway Cloud Bills.',
    summary:
      'We design, harden, and manage production cloud and VPS environments—specializing in Docker containerization, loopback reverse-proxy security, PostgreSQL tuning, and reversible CI/CD pipelines.',
    businessProblemSolved:
      'Unstructured servers suffer from manual SSH edits, exposed database ports, failed SSL renewals, and terrifying deployments where a bad release takes down the business with no rollback path.',
    targetAudience: [
      'Businesses running high-value software on dedicated VPS or cloud instances (Contabo, Hetzner, AWS, DigitalOcean)',
      'Organizations managing multi-site servers (such as Virtualmin/Nginx/Apache hosts) needing clean Docker isolation',
      'Engineering teams wanting automated GitHub Actions CI/CD, staging environments, and off-site disaster recovery',
    ],
    systemsWeBuild: [
      'Multi-stage production Dockerfiles running as non-root users with minimal attack surface',
      'Loopback-bound container deployments (127.0.0.1) behind existing Virtualmin, Nginx, or Apache TLS reverse proxies',
      'GitHub Actions CI/CD pipelines with automated linting, type checking, unit tests, and health-checked rollouts',
      'PostgreSQL and Redis production tuning, automated WAL/pg_dump backups, and restoration verification drills',
      'Staging-to-production promotion workflows with instant image-tag rollback capability',
    ],
    reliabilityPractices: [
      'Never exposing internal container ports (3000, 5432, 6379) directly to the public internet interface',
      'Preserving existing Virtualmin, DNS, mail, and SSL configurations without destructive host modifications',
      'Health-check endpoints (/api/health) verified automatically before switching traffic to a new container',
      'Strict environment variable isolation—zero hardcoded secrets in repositories or container layers',
    ],
    engagementProcess: [
      {
        step: 'Phase 01',
        title: 'Non-Destructive Host & Topology Audit',
        detail:
          'We inspect CPU/RAM allocation (e.g., 12GB RAM VPS), active ports, Virtualmin vhosts, and firewall rules before planning changes.',
      },
      {
        step: 'Phase 02',
        title: 'Containerization & Staging Setup',
        detail:
          'We build hardened Docker images, configure loopback port bindings, and verify everything on a dedicated staging subdomain first.',
      },
      {
        step: 'Phase 03',
        title: 'CI/CD & Backup Automation',
        detail:
          'We wire GitHub Actions checks, automated image builds, database backup scripts, and health monitoring.',
      },
      {
        step: 'Phase 04',
        title: 'Controlled Cutover & Rollback Verification',
        detail:
          'We execute the production proxy cutover with a tested 60-second rollback procedure and hand over full runbook documentation.',
      },
    ],
    relatedProjectSlugs: ['skos-cloud', 'callify-pro', 'everestbuy'],
    technologies: ['Docker', 'Docker Compose', 'Linux (Ubuntu/Debian)', 'Virtualmin', 'Nginx / Apache', 'GitHub Actions', 'PostgreSQL'],
    seoTitle: 'DevOps, Docker & Cloud Infrastructure Consulting | SK Developers',
    seoDescription:
      'Production Docker containerization, Linux VPS hardening, Virtualmin reverse-proxy architecture, PostgreSQL tuning, and GitHub Actions CI/CD by SK Developers.',
  },
  {
    slug: 'fintech-systems',
    indexNumber: '05',
    title: 'FinTech & Secure Financial Systems',
    shortTitle: 'FinTech Systems',
    headline: 'Ledger Integrity, Idempotent Transactions, and Audit-Ready Financial Engineering.',
    summary:
      'We architect financial workflows, double-entry accounting cores, multi-gateway payment engines, and ledger systems where every balance mutation is atomic, idempotent, and verifiable.',
    businessProblemSolved:
      'Standard web development practices—such as updating a numeric `balance` column directly in a controller—lead to catastrophic race conditions, duplicate payouts, and unexplainable balance discrepancies under real transaction load.',
    targetAudience: [
      'FinTech platforms, digital wallet operators, and escrow/settlement services',
      'Enterprise ERP and B2B trade platforms handling high-volume credit, khata, and multi-party settlements',
      'E-commerce and mobility platforms coordinating driver/vendor payouts, commissions, and refunds',
    ],
    systemsWeBuild: [
      'Double-entry immutable ledger engines where every debit has an atomic, balanced credit counterpart',
      'Idempotent payment gateway and webhook ingestion layers resistant to replay and concurrency bugs',
      'Automated daily reconciliation pipelines comparing internal journals against external bank/gateway statements',
      'Multi-level financial approval workflows (maker-checker controls) with cryptographic audit trails',
      'Escrow, commission splitting, and scheduled payout state machines',
    ],
    reliabilityPractices: [
      'PostgreSQL transactional isolation and pessimistic row-level locking (`FOR UPDATE`) on account states',
      'Mandatory idempotency keys across all financial API endpoints and background queue processors',
      'Append-only ledger tables prohibiting destructive `UPDATE` or `DELETE` operations on posted transactions',
      'Automated continuous invariant checks verifying that journal debits equal credits across all accounts',
    ],
    engagementProcess: [
      {
        step: 'Phase 01',
        title: 'Transaction Flow & Threat Modeling',
        detail:
          'We map every money movement, failure mode, webhook retry scenario, and reconciliation requirement.',
      },
      {
        step: 'Phase 02',
        title: 'Ledger Schema & Invariant Design',
        detail:
          'We design the double-entry PostgreSQL schema, locking strategy, and idempotency key architecture.',
      },
      {
        step: 'Phase 03',
        title: 'Implementation & Concurrency Testing',
        detail:
          'We implement the transactional services and test them against parallel request bursts and network fault scenarios.',
      },
      {
        step: 'Phase 04',
        title: 'Reconciliation & Audit Readiness',
        detail:
          'We deploy automated variance alerts, audit log exports, and finance-controller verification dashboards.',
      },
    ],
    relatedProjectSlugs: ['gecim', 'payment-ledger-architecture', 'skos-cloud'],
    technologies: ['PostgreSQL', 'Laravel', 'Python', 'Redis Locks', 'Idempotent APIs', 'Double-Entry Ledgers'],
    seoTitle: 'FinTech Software Engineering & Transactional Ledger Architecture | SK Developers',
    seoDescription:
      'Secure FinTech software engineering, double-entry PostgreSQL ledgers, idempotent payment workflows, and reconciliation systems by SK Developers.',
  },
  {
    slug: 'ecommerce-engineering',
    indexNumber: '06',
    title: 'E-Commerce & Retail Engineering',
    shortTitle: 'E-Commerce Engineering',
    headline: 'High-Conversion Storefronts Connected to Real Inventory and Fulfillment Systems.',
    summary:
      'We build custom e-commerce platforms, multi-tenant retail ecosystems, and ERP-integrated commerce backends designed for speed, catalog scale, and operational reliability.',
    businessProblemSolved:
      'Out-of-the-box storefront templates break down when businesses need multi-warehouse stock accuracy, Cash-on-Delivery (COD) fraud/verification workflows, wholesale B2B pricing tiers, or direct synchronization with an internal ERP.',
    targetAudience: [
      'Retail brands and omnichannel merchants scaling across web, mobile, and physical outlets',
      'Wholesalers and distributors launching B2B dealer ordering portals with custom credit terms',
      'Multi-brand retail groups seeking a unified, multi-tenant commerce engine',
    ],
    systemsWeBuild: [
      'Custom Next.js and React storefronts optimized for sub-2.5s LCP and mobile conversion',
      'Multi-tenant commerce platforms supporting multiple brand storefronts from a shared core',
      'Real-time inventory reservation, SKU variant matrices, and warehouse-to-courier dispatch integrations',
      'Pakistani and international payment gateway integrations alongside COD verification workflows',
      'Direct bi-directional synchronization with SKOS Cloud or custom enterprise ERP ledgers',
    ],
    reliabilityPractices: [
      'Atomic stock reservation during checkout to prevent overselling during flash campaigns',
      'Server-rendered SEO product and category architecture with structured Schema.org Product metadata',
      'Decoupled order state machines ensuring courier API slowdowns never block customer checkout',
      'Edge and Redis caching strategies for high-traffic catalog browsing',
    ],
    engagementProcess: [
      {
        step: 'Phase 01',
        title: 'Catalog, Checkout & Fulfillment Mapping',
        detail:
          'We analyze your SKU structure, pricing rules, payment methods, courier APIs, and warehouse stock flows.',
      },
      {
        step: 'Phase 02',
        title: 'Storefront & Commerce Core Architecture',
        detail:
          'We architect the frontend experience and backend order/inventory APIs with mobile conversion and SEO built in.',
      },
      {
        step: 'Phase 03',
        title: 'ERP, Payment & Courier Integration',
        detail:
          'We wire payment gateways, COD verification queues, logistics tracking, and accounting synchronization.',
      },
      {
        step: 'Phase 04',
        title: 'Performance Audit & Launch',
        detail:
          'We validate Core Web Vitals, checkout edge cases, and order fulfillment workflows prior to public traffic.',
      },
    ],
    relatedProjectSlugs: ['everestbuy', 'sk-ai-commerce', 'skos-cloud', 'payment-ledger-architecture'],
    technologies: ['Next.js', 'React', 'TypeScript', 'Laravel', 'PostgreSQL', 'Redis', 'Tailwind CSS'],
    seoTitle: 'Custom E-Commerce Platform & Retail Software Development | SK Developers',
    seoDescription:
      'Custom e-commerce engineering, multi-tenant retail platforms, ERP-integrated inventory, and high-speed Next.js storefronts by SK Developers.',
  },
];

export const ADDITIONAL_CAPABILITIES = [
  {
    number: '07',
    title: 'API Design & Third-Party Integrations',
    summary:
      'Versioned REST APIs, webhook delivery engines, courier/payment gateway adapters, and secure bridge services connecting legacy databases with modern applications.',
    stack: ['REST / OpenAPI', 'Laravel', 'FastAPI', 'Webhook Idempotency'],
  },
  {
    number: '08',
    title: 'Real-Time Systems & Mobility Engineering',
    summary:
      'Geospatial dispatch (PostGIS), live GPS telemetry ingestion, WebSocket/Redis event broadcasting, and WebRTC signaling for ride-hailing and live operations.',
    stack: ['PostGIS', 'Redis Pub/Sub', 'WebSockets', 'WebRTC', 'Flutter'],
  },
  {
    number: '09',
    title: 'Legacy PHP & Laravel Software Modernization',
    summary:
      'Step-by-step refactoring of aging PHP/Laravel codebases, N+1 query elimination, PostgreSQL migration, Dockerization, and automated test coverage without halting business operations.',
    stack: ['Laravel Upgrades', 'Query Optimization', 'PostgreSQL Migration', 'Zero-Downtime Refactoring'],
  },
];

export const INDUSTRIES_REGISTRY: IndustryRecord[] = [
  {
    slug: 'property-construction',
    title: 'Property Development & Construction',
    shortTitle: 'Property & Construction',
    headline: 'Software Systems for Real-Estate Developers, Builders, and High-Rise Operators.',
    summary:
      'Property development and construction operations involve long project lifecycles, complex installment schedules, strict site material accountability, and post-handover facility management. SK Developers designs systems that connect site engineering with financial control.',
    operationalChallenges: [
      'Unverified material consumption on construction sites and discrepancies between Bill of Quantities (BOQ) and actual procurement',
      'Complex buyer installment schedules, surcharge calculations, unit transfers, and risk of duplicate plot/unit allotments',
      'Disconnected contractor Interim Payment Certificates (IPCs), retention money tracking, and project-wise cashflow blind spots',
      'Post-handover resident billing, utility sub-metering, and maintenance ticket resolution',
    ],
    engineeredSolutions: [
      'Construction ERP modules enforcing requisition -> PO -> gate-pass GRN -> site consumption against approved BOQ limits',
      'Property CRM and allotment ledgers with atomic unit locking, customizable payment schedules, and automated demand letters',
      'Contractor billing workflows tracking measured work, advances, tax deductions, and retention balances',
      'Strategic PropTech concepts such as SK LivingSphere for integrated building and resident lifecycle management',
    ],
    keyModules: [
      'BOQ & Site Material Ledger',
      'Plot / Unit Inventory & Allotment Lock',
      'Installment & Recovery Schedule Engine',
      'Contractor IPC & Retention Accounting',
      'Resident & Facility Maintenance Portal',
      'Executive Project Cost-Variance Dashboard',
    ],
    relatedProjectSlugs: ['sk-livingsphere', 'property-crm-workflows', 'skos-cloud'],
    relatedServiceSlugs: ['enterprise-erp', 'fintech-systems', 'ai-automation'],
    seoTitle: 'Custom Property Management & Construction ERP Software | SK Developers',
    seoDescription:
      'Custom software engineering for property developers and construction companies. BOQ cost control, real-estate allotment CRMs, installment ledgers, and PropTech systems.',
  },
  {
    slug: 'retail-wholesale',
    title: 'Retail, Wholesale & Distribution',
    shortTitle: 'Retail & Wholesale',
    headline: 'Unified Inventory, Digital Khata, and Omnichannel Commerce for High-Volume Traders.',
    summary:
      'Whether operating multi-branch wholesale depots or launching a curated digital storefront, retail and trading businesses win on inventory accuracy, credit recovery, and checkout speed.',
    operationalChallenges: [
      'Stock discrepancies between physical warehouses, branch counters, and online storefronts',
      'Untracked credit sales (khata) exceeding customer limits and delaying cashflow recovery',
      'Slow manual purchase entry and lack of real-time margin visibility per SKU or supplier',
      'High return rates and verification bottlenecks on Cash-on-Delivery (COD) e-commerce orders',
    ],
    engineeredSolutions: [
      'SKOS Cloud ERP deployment covering multi-warehouse stock ledgers, barcode billing, and real-time supplier/customer khata',
      'Custom e-commerce storefronts (proven via EverestBuy and SK AI Commerce) with atomic stock reservation',
      'Automated COD order verification, courier dispatch synchronization, and settlement reconciliation',
      'FastAPI OCR invoice ingestion to accelerate supplier bill entry',
    ],
    keyModules: [
      'Multi-Branch Stock & Batch Ledger',
      'Digital Khata & Credit Limit Enforcement',
      'High-Speed POS & Dealer Ordering Portal',
      'Tenant-Aware E-Commerce Storefront',
      'Courier API & COD Reconciliation Engine',
      'Automated Reorder & Margin Analytics',
    ],
    relatedProjectSlugs: ['skos-cloud', 'everestbuy', 'sk-ai-commerce'],
    relatedServiceSlugs: ['enterprise-erp', 'ecommerce-engineering', 'ai-automation'],
    seoTitle: 'Retail, Wholesale ERP & E-Commerce Software Engineering | SK Developers',
    seoDescription:
      'Enterprise ERP, multi-branch inventory, digital khata, and custom e-commerce platforms for retailers, wholesalers, and distributors by SK Developers.',
  },
  {
    slug: 'mobility-logistics',
    title: 'Mobility, Ride-Hailing & Logistics',
    shortTitle: 'Mobility & Logistics',
    headline: 'Real-Time Spatial Dispatch, Fleet Telemetry, and Trip State Machines.',
    summary:
      'On-demand mobility and delivery platforms require specialized geospatial database indexing, low-latency event streams, and resilient mobile-to-backend synchronization.',
    operationalChallenges: [
      'High-frequency driver GPS pings overwhelming standard relational database tables',
      'Race conditions when multiple drivers accept or time out on the same dispatch request',
      'Inaccurate fare, surge, or distance calculations during intermittent mobile network connectivity',
      'Complex driver onboarding, document compliance, wallet commission splits, and payout settlements',
    ],
    engineeredSolutions: [
      'PostgreSQL/PostGIS spatial indexing paired with Redis Pub/Sub streams for low-latency proximity matching',
      'Deterministic trip lifecycle state machines with idempotent state transitions',
      'Cross-platform rider and driver Flutter applications synchronized with Laravel backend APIs',
      'Integrated driver wallet and commission ledger ensuring accurate per-trip accounting',
    ],
    keyModules: [
      'PostGIS Spatial Proximity Matcher',
      'Real-Time Redis Telemetry Ingestion',
      'Rider & Driver Mobile Applications',
      'Zone Pricing & Tariff Rule Engine',
      'Driver Wallet & Commission Ledger',
      'Live Operations & Dispatch Control Room',
    ],
    relatedProjectSlugs: ['drivenow', 'payment-ledger-architecture', 'webrtc-realtime-comms'],
    relatedServiceSlugs: ['saas-development', 'fintech-systems', 'cloud-devops'],
    seoTitle: 'Mobility, Ride-Hailing & Fleet Dispatch Software Development | SK Developers',
    seoDescription:
      'Custom ride-hailing, fleet dispatch, PostGIS spatial architecture, and real-time logistics software engineered by SK Developers.',
  },
  {
    slug: 'fintech',
    title: 'Financial Technology & Ledger Systems',
    shortTitle: 'Financial Technology',
    headline: 'High-Integrity Ledgers, Payment Orchestration, and Audit-Grade Workflows.',
    summary:
      'When software moves money, records obligations, or reconciles multi-party settlements, architectural shortcuts are unacceptable. We engineer financial software grounded in database-level correctness.',
    operationalChallenges: [
      'Concurrent transaction requests causing race conditions or negative balance anomalies',
      'Duplicate webhook callbacks from payment providers resulting in double credits',
      'Lack of immutable audit trails when auditors or partners review historical balance mutations',
      'Manual spreadsheet reconciliation between gateway payouts and internal order records',
    ],
    engineeredSolutions: [
      'Double-entry append-only ledger architectures enforced at the PostgreSQL transaction level',
      'Pessimistic row locking (`SELECT ... FOR UPDATE`) and distributed Redis mutexes on critical mutations',
      'Idempotency-key middleware and cryptographic webhook signature validation',
      'Automated daily reconciliation jobs that detect and isolate settlement variances immediately',
    ],
    keyModules: [
      'Append-Only Double-Entry Journal Core',
      'Idempotent API & Webhook Gateway',
      'Maker-Checker Approval Workflows',
      'Automated Settlement Reconciliation',
      'Escrow & Multi-Party Split Engine',
      'Tamper-Evident Audit Trail Exporter',
    ],
    relatedProjectSlugs: ['gecim', 'payment-ledger-architecture', 'skos-cloud'],
    relatedServiceSlugs: ['fintech-systems', 'enterprise-erp', 'cloud-devops'],
    seoTitle: 'FinTech Software Development & Ledger Engineering | SK Developers',
    seoDescription:
      'Double-entry ledger architecture, idempotent payment processing, escrow workflows, and secure financial software engineering by SK Developers.',
  },
  {
    slug: 'communications',
    title: 'Communications & Customer Engagement',
    shortTitle: 'Communications & AI',
    headline: 'Real-Time Voice, WebRTC Signaling, and AI-Assisted Customer Workflows.',
    summary:
      'Modern customer operations require seamless coordination between live voice channels, instant messaging, CRM context, and intelligent automation.',
    operationalChallenges: [
      'Fragmented voice PBX systems that do not sync call outcomes or recordings with business CRMs',
      'High latency or dropped sessions in browser-based WebRTC and real-time agent consoles',
      'Manual post-call note taking and missed follow-up actions across sales and support teams',
      'Unbounded AI bots that frustrate callers instead of routing complex issues cleanly to human specialists',
    ],
    engineeredSolutions: [
      'Low-latency WebRTC and SIP integration architectures (engineered in Callify Pro / Callify AI)',
      'Real-time agent presence, queue management, and event broadcasting over WebSockets and Redis',
      'Post-call transcription, structured outcome extraction, and automated CRM/WhatsApp follow-up triggers',
      'Guarded AI voice and chat routing with instant human escalation',
    ],
    keyModules: [
      'SIP / WebRTC Session Signaling Bridge',
      'Real-Time Agent Presence & Queue Router',
      'AI Call Summarization & Intent Extractor',
      'Automated CRM & WhatsApp Action Dispatcher',
      'Quality Assurance & Call Audit Console',
    ],
    relatedProjectSlugs: ['callify-pro', 'webrtc-realtime-comms', 'fastapi-ocr-automation'],
    relatedServiceSlugs: ['ai-automation', 'saas-development', 'cloud-devops'],
    seoTitle: 'AI Communications, WebRTC & Telephony Software Engineering | SK Developers',
    seoDescription:
      'Custom AI communications platforms, WebRTC signaling, SIP telephony integration, and real-time customer engagement systems by SK Developers.',
  },
];

export const ARTICLES_REGISTRY: ArticleRecord[] = [
  {
    slug: 'enterprise-financial-ledgers-transactional-integrity',
    title: 'Why Enterprise Financial Ledgers Need Strong Transactional Integrity',
    subtitle:
      'How to prevent race conditions, balance drift, and duplicate mutations using double-entry PostgreSQL schemas and idempotent workflows.',
    category: 'FinTech & Database Architecture',
    publishedAt: '2026-10-14',
    readingTime: '7 min read',
    publicationState: 'PUBLISHED',
    author: 'Muhammad Salman Khalid',
    authorRole: 'Founder & Senior Software Architect, SK Developers',
    summary:
      'Updating a numeric balance column directly inside an application controller is one of the most common—and expensive—mistakes in business software. Here is how we architect audit-grade ledgers using PostgreSQL and Laravel.',
    keyTakeaways: [
      'Never treat account balances as mutable CRUD columns without an underlying append-only journal.',
      'Use PostgreSQL row-level locking (SELECT ... FOR UPDATE) inside serializable or read-committed transactions to serialize concurrent balance mutations.',
      'Enforce deterministic idempotency keys on every payment callback and internal transfer endpoint.',
    ],
    sections: [
      {
        heading: '1. The Fallacy of the Mutable Balance Column',
        paragraphs: [
          'In introductory web tutorials, transferring funds or recording a customer payment is often shown as reading a `balance` column into memory, subtracting an amount in PHP or JavaScript, and saving the row back. In production, two simultaneous requests—such as a double-clicked submit button or two concurrent webhook retries—will read the exact same initial balance and overwrite one another.',
          'In enterprise ERP and FinTech systems, balances must be the mathematical consequence of immutable journal lines. Every financial event is recorded as a balanced transaction header containing two or more ledger entries whose debits and credits sum strictly to zero.',
        ],
      },
      {
        heading: '2. Row-Level Locking and Idempotency in PostgreSQL',
        paragraphs: [
          'Even with an append-only ledger, checking whether an account has sufficient credit before posting a debit requires serializing concurrent mutations for that specific account. We acquire a pessimistic lock on the parent account row within a database transaction before evaluating available credit and inserting the journal lines.',
          'Alongside locking, every external command or webhook carries a unique `idempotency_key` constrained by a unique index in PostgreSQL. If a network retry sends the same transaction twice, the database rejects the duplicate insert atomically and returns the original committed result.',
        ],
        codeSnippet: {
          language: 'sql',
          caption: 'PostgreSQL double-entry ledger invariant & idempotency schema pattern',
          code: `CREATE TABLE ledger_journals (
  id UUID PRIMARY KEY,
  tenant_id UUID NOT NULL,
  idempotency_key VARCHAR(128) NOT NULL UNIQUE,
  reference_type VARCHAR(64) NOT NULL,
  posted_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE ledger_entries (
  id UUID PRIMARY KEY,
  journal_id UUID NOT NULL REFERENCES ledger_journals(id) ON DELETE RESTRICT,
  account_id UUID NOT NULL REFERENCES ledger_accounts(id) ON DELETE RESTRICT,
  debit_minor BIGINT NOT NULL DEFAULT 0 CHECK (debit_minor >= 0),
  credit_minor BIGINT NOT NULL DEFAULT 0 CHECK (credit_minor >= 0),
  CHECK ((debit_minor > 0 AND credit_minor = 0) OR (credit_minor > 0 AND debit_minor = 0))
);`,
        },
      },
      {
        heading: '3. Continuous Reconciliation as a First-Class Feature',
        paragraphs: [
          'Reliable financial engineering assumes that external gateways, network links, and human operators will occasionally fail. Rather than waiting for month-end closing to discover a discrepancy, our systems run scheduled verification jobs that verify zero-sum journal invariants and compare cached account snapshots against the sum of historical ledger lines.',
        ],
      },
    ],
    relatedServiceSlugs: ['fintech-systems', 'enterprise-erp'],
    relatedProjectSlugs: ['gecim', 'skos-cloud', 'payment-ledger-architecture'],
    seoTitle: 'Enterprise Financial Ledgers & PostgreSQL Transactional Integrity | SK Developers',
    seoDescription:
      'Architectural guide by Muhammad Salman Khalid on designing double-entry financial ledgers, PostgreSQL row locking, and idempotent transactions.',
  },
  {
    slug: 'laravel-postgresql-modern-erp-platforms',
    title: 'Laravel and PostgreSQL for Modern Multi-Branch ERP Platforms',
    subtitle:
      'Structuring domain boundaries, multi-warehouse inventory locks, and audit trails in large-scale Laravel enterprise applications.',
    category: 'Enterprise ERP Engineering',
    publishedAt: '2026-10-02',
    readingTime: '8 min read',
    publicationState: 'PUBLISHED',
    author: 'Muhammad Salman Khalid',
    authorRole: 'Founder & Senior Software Architect, SK Developers',
    summary:
      'Laravel paired with PostgreSQL provides an extraordinarily productive foundation for enterprise ERP systems—provided you abandon bloated controllers in favor of strict domain services, database constraints, and queued background processing.',
    keyTakeaways: [
      'Separate read-heavy reporting projections from write-heavy transactional voucher and stock tables.',
      'Leverage PostgreSQL partial indexes, JSONB metadata with check constraints, and strict foreign keys.',
      'Keep Laravel controllers thin: encapsulate every ERP mutation inside explicit Action/Service classes wrapped in DB transactions.',
    ],
    sections: [
      {
        heading: '1. Why ERP Projects Outgrow Naive MVC Structures',
        paragraphs: [
          'An enterprise ERP is not a collection of independent CRUD screens. Raising a Goods Receipt Note (GRN) simultaneously affects purchase order fulfillment status, warehouse stock quantities, batch valuation (FIFO or weighted average), and supplier payable ledgers. Placing this logic inside Eloquent model observers or 800-line controllers makes debugging impossible.',
          'At SK Developers—including in our work on SKOS Cloud—we organize ERP modules around explicit domain boundaries: Accounting, Inventory, Procurement, Sales, and Human/Access Governance. Cross-module mutations occur only through strongly typed domain service contracts.',
        ],
      },
      {
        heading: '2. Utilizing PostgreSQL Strengths Beyond Basic SQL',
        paragraphs: [
          'PostgreSQL is far more than a passive storage bucket. In multi-branch ERP workloads, we rely on PostgreSQL transactional DDL for safe schema migrations, composite and partial indexes for fast tenant-scoped filtering, and window functions for running balance and stock-card statements without loading tens of thousands of rows into PHP memory.',
        ],
      },
    ],
    relatedServiceSlugs: ['enterprise-erp', 'saas-development'],
    relatedProjectSlugs: ['skos-cloud', 'property-crm-workflows'],
    seoTitle: 'Laravel & PostgreSQL Architecture for Enterprise ERP Systems | SK Developers',
    seoDescription:
      'How SK Developers architects multi-branch ERP platforms using Laravel and PostgreSQL with domain boundaries, stock locks, and fast reporting.',
  },
  {
    slug: 'ai-agents-safely-automate-business-operations',
    title: 'How AI Agents Can Safely Automate Business Operations',
    subtitle:
      'Engineering deterministic guardrails, schema validation, and human-in-the-loop checkpoints for production AI workflows.',
    category: 'AI Automation & Architecture',
    publishedAt: '2026-09-19',
    readingTime: '6 min read',
    publicationState: 'PUBLISHED',
    author: 'Muhammad Salman Khalid',
    authorRole: 'Founder & Senior Software Architect, SK Developers',
    summary:
      'The difference between a fragile AI prototype and a production enterprise workflow lies in how you bound uncertainty. LLMs should parse, classify, and propose—while deterministic code validates and commits.',
    keyTakeaways: [
      'Never allow an LLM to execute raw, unvalidated database mutations on operational or financial records.',
      'Use FastAPI and Pydantic schemas to enforce strict structural contracts on all AI and OCR outputs.',
      'Design confidence-based routing so ambiguous cases land in a human operator queue with full context.',
    ],
    sections: [
      {
        heading: '1. Separating Probabilistic Reasoning from Deterministic Execution',
        paragraphs: [
          'Large Language Models and vision/OCR pipelines excel at turning unstructured inputs—such as a scanned supplier invoice, a voice call transcript, or a customer WhatsApp message—into structured intent. However, probabilistic models should never be trusted to enforce accounting rules or permission boundaries on their own.',
          'We place a strict validation firewall between the AI layer (built in Python/FastAPI) and the core system of record (Laravel/PostgreSQL). The AI service returns a strongly typed payload with field-level confidence scores; the core backend validates permissions, checks business invariants, and either commits safe operations or queues a draft voucher for one-click human approval.',
        ],
      },
    ],
    relatedServiceSlugs: ['ai-automation', 'enterprise-erp'],
    relatedProjectSlugs: ['callify-pro', 'fastapi-ocr-automation', 'skos-cloud'],
    seoTitle: 'Safe Enterprise AI Automation & Guarded AI Agents | SK Developers',
    seoDescription:
      'Learn how SK Developers builds production AI automation, FastAPI OCR pipelines, and human-in-the-loop guardrails for enterprise software.',
  },
  {
    slug: 'building-scalable-multi-tenant-saas-product',
    title: 'Building a Scalable Multi-Tenant SaaS Product',
    subtitle:
      'Practical trade-offs between shared-schema tenancy, tenant-scoped caching, and zero-downtime schema evolution.',
    category: 'SaaS Engineering',
    publishedAt: '2026-09-05',
    readingTime: '7 min read',
    publicationState: 'PUBLISHED',
    author: 'Muhammad Salman Khalid',
    authorRole: 'Founder & Senior Software Architect, SK Developers',
    summary:
      'Choosing the right multi-tenancy architecture early determines both your infrastructure unit economics and your engineering velocity two years after launch.',
    keyTakeaways: [
      'Shared PostgreSQL schemas with composite `(tenant_id, ...)` indexes offer the best operational balance for most B2B SaaS platforms.',
      'Prefix every Redis cache key, queue payload, and storage path with the verified tenant identifier.',
      'Build tenant-level feature entitlements and rate limits from day one.',
    ],
    sections: [
      {
        heading: '1. Shared Database vs. Database-Per-Tenant Reality',
        paragraphs: [
          'While spinning up a separate database per customer sounds appealing for isolation, managing schema migrations, connection pooling, and backups across 500 separate databases quickly overwhelms small DevOps teams. Unless regulatory mandates require physical database separation for high-tier enterprise contracts, a disciplined shared-schema architecture with mandatory `tenant_id` scoping and PostgreSQL Row-Level Security (RLS) provides superior maintainability and lower infrastructure overhead.',
        ],
      },
    ],
    relatedServiceSlugs: ['saas-development', 'ecommerce-engineering'],
    relatedProjectSlugs: ['skos-cloud', 'sk-ai-commerce'],
    seoTitle: 'Multi-Tenant SaaS Architecture Guide | SK Developers',
    seoDescription:
      'Architectural guide to building multi-tenant B2B SaaS platforms with Laravel, Next.js, PostgreSQL, and Redis by SK Developers.',
  },
  {
    slug: 'docker-cicd-production-software-virtualmin-vps',
    title: 'Docker and CI/CD for Production Software on Self-Hosted VPS Infrastructure',
    subtitle:
      'Running hardened, loopback-bound Docker containers behind Virtualmin, Nginx, or Apache with reversible deployments.',
    category: 'DevOps & Cloud Infrastructure',
    publishedAt: '2026-08-22',
    readingTime: '8 min read',
    publicationState: 'PUBLISHED',
    author: 'Muhammad Salman Khalid',
    authorRole: 'Founder & Senior Software Architect, SK Developers',
    summary:
      'You do not need a complex Kubernetes cluster to achieve clean, zero-downtime deployments. A properly configured 12GB Linux VPS with loopback-bound Docker containers and an existing Virtualmin reverse proxy delivers exceptional speed, security, and cost control.',
    keyTakeaways: [
      'Bind application containers strictly to 127.0.0.1 (e.g., 127.0.0.1:3080:3000) so Docker never bypasses host firewall rules.',
      'Preserve existing Virtualmin SSL, DNS, and mail configurations by proxying vhost traffic to the local container port.',
      'Tag every Docker image with the Git commit SHA so rolling back takes less than 30 seconds.',
    ],
    sections: [
      {
        heading: '1. Why Public Docker Port Publishing Is Dangerous on Shared Hosts',
        paragraphs: [
          'When you run a container with `-p 3000:3000`, Docker manipulates `iptables` directly and exposes port 3000 to the public internet—often bypassing `ufw` or Virtualmin firewall rules. Instead, binding to `127.0.0.1:3080:3000` ensures the container is reachable only from the local loopback interface. Your existing Apache or Nginx reverse proxy managed by Virtualmin terminates TLS and forwards clean HTTP traffic internally.',
        ],
        codeSnippet: {
          language: 'yaml',
          caption: 'Loopback-isolated production docker-compose pattern for Virtualmin VPS',
          code: `services:
  skdevelopers-web:
    image: ghcr.io/skdevelopers/skdevelopers-web:\${IMAGE_TAG:-latest}
    restart: unless-stopped
    user: "1001:1001"
    read_only: true
    tmpfs:
      - /tmp
    ports:
      - "127.0.0.1:3080:3000"
    environment:
      - NODE_ENV=production
      - PORT=3000`,
        },
      },
    ],
    relatedServiceSlugs: ['cloud-devops', 'saas-development'],
    relatedProjectSlugs: ['skos-cloud', 'everestbuy'],
    seoTitle: 'Docker & CI/CD on Virtualmin Linux VPS Infrastructure | SK Developers',
    seoDescription:
      'Production DevOps guide to deploying loopback-bound Docker containers behind Virtualmin on Linux VPS servers with GitHub Actions CI/CD.',
  },
  {
    slug: 'modernize-legacy-php-laravel-systems',
    title: 'How to Modernize Legacy PHP and Laravel Systems Without Halting Operations',
    subtitle:
      'Incremental strangler-pattern refactoring, database indexing, and containerization for revenue-critical business applications.',
    category: 'Software Modernization',
    publishedAt: '2026-08-08',
    readingTime: '6 min read',
    publicationState: 'PUBLISHED',
    author: 'Muhammad Salman Khalid',
    authorRole: 'Founder & Senior Software Architect, SK Developers',
    summary:
      'Rewriting a working legacy system from scratch often fails because business rules are buried in years of edge-case patches. Disciplined incremental modernization delivers immediate stability without freezing feature delivery.',
    keyTakeaways: [
      'Start by containerizing the legacy runtime and adding integration characterization tests around critical financial/order flows.',
      'Eliminate N+1 query bottlenecks and missing composite indexes before blaming the programming language.',
      'Extract high-load modules or modern Next.js frontends incrementally behind clean API boundaries.',
    ],
    sections: [
      {
        heading: '1. Stabilize Before You Refactor',
        paragraphs: [
          'When we inherit an aging PHP or early-version Laravel codebase, our first move is never a blind rewrite. We first establish reproducible local and staging environments via Docker, audit slow database queries using `pg_stat_statements`, and lock down characterization tests around invoicing, inventory, and authentication.',
        ],
      },
    ],
    relatedServiceSlugs: ['enterprise-erp', 'cloud-devops'],
    relatedProjectSlugs: ['skos-cloud', 'property-crm-workflows'],
    seoTitle: 'How to Modernize Legacy PHP & Laravel Enterprise Systems | SK Developers',
    seoDescription:
      'Practical guide to modernizing legacy PHP and Laravel applications without operational downtime, written by Senior Software Architect Muhammad Salman Khalid.',
  },
  {
    slug: 'designing-construction-erp-materials-cost-control',
    title: 'Designing a Construction ERP for Materials Accountability and Cost Control',
    subtitle:
      'Connecting Bill of Quantities (BOQ) limits, site gate-passes, and contractor IPC billing into one auditable ledger.',
    category: 'PropTech & Construction ERP',
    publishedAt: '2026-07-25',
    readingTime: '7 min read',
    publicationState: 'PUBLISHED',
    author: 'Muhammad Salman Khalid',
    authorRole: 'Founder & Senior Software Architect, SK Developers',
    summary:
      'Construction profit margins evaporate when site requisitions are approved on paper and entered into accounting software weeks later. Real cost control requires enforcing BOQ budgets at the moment of requisition.',
    keyTakeaways: [
      'Every purchase requisition and store issuance must reference a specific project WBS / BOQ line item.',
      'Track three separate quantities at all times: BOQ Budgeted, PO Ordered, GRN Received at Site, and Issued to Contractor.',
      'Link contractor running bills (IPCs) directly to measured work progress and material reconciliation.',
    ],
    sections: [
      {
        heading: '1. Closing the Loop Between Site Stores and Head-Office Finance',
        paragraphs: [
          'In many property development companies, head-office accountants record supplier invoices by total value while site engineers track cement and steel bags on spreadsheets. By structuring the ERP around a unified Work Breakdown Structure (WBS), every gate-pass receipt and contractor material issuance updates both physical site stock and financial work-in-progress ledgers simultaneously.',
        ],
      },
    ],
    relatedServiceSlugs: ['enterprise-erp', 'fintech-systems'],
    relatedProjectSlugs: ['sk-livingsphere', 'property-crm-workflows'],
    seoTitle: 'Designing a Construction ERP for Materials & Cost Control | SK Developers',
    seoDescription:
      'How to architect construction ERP software for BOQ cost control, site material accountability, and contractor billing.',
  },
  {
    slug: 'choosing-architecture-ride-hailing-mobility-platform',
    title: 'Choosing the Right Architecture for a Ride-Hailing and Mobility Platform',
    subtitle:
      'Balancing PostGIS spatial queries, Redis location streams, and idempotent trip state machines.',
    category: 'Real-Time & Mobility Engineering',
    publishedAt: '2026-07-10',
    readingTime: '6 min read',
    publicationState: 'DRAFT',
    author: 'Muhammad Salman Khalid',
    authorRole: 'Founder & Senior Software Architect, SK Developers',
    summary:
      'Editorial engineering draft exploring how to separate high-frequency GPS location ingestion from transactional trip and wallet records in modern ride-hailing architectures.',
    keyTakeaways: [
      'Ingest ephemeral driver coordinates into Redis geospatial/stream structures rather than running continuous UPDATE queries on PostgreSQL.',
      'Persist canonical trip milestones, fare breakdowns, and wallet ledger entries in PostgreSQL with PostGIS.',
      'Design mobile clients to recover trip state gracefully from the server after connectivity drops.',
    ],
    sections: [
      {
        heading: '1. Separating Ephemeral Telemetry from Canonical Trip State',
        paragraphs: [
          'A fleet of active drivers transmitting GPS coordinates every 3 to 5 seconds will quickly saturate PostgreSQL write WAL logs if every ping triggers a standard row update. By buffering live coordinates in Redis and flushing only key trip lifecycle events and route polylines to PostgreSQL/PostGIS, dispatch latency stays low while database integrity remains rock-solid.',
        ],
      },
    ],
    relatedServiceSlugs: ['saas-development', 'fintech-systems'],
    relatedProjectSlugs: ['drivenow'],
    seoTitle: 'Ride-Hailing & Mobility Platform Software Architecture | SK Developers',
    seoDescription:
      'Architectural patterns for ride-hailing and fleet dispatch systems using Laravel, PostgreSQL/PostGIS, Redis, and Flutter.',
  },
];

export const REDIRECT_MAP: Record<string, string> = {
  '/home': '/',
  '/about-us': '/about',
  '/leadership': '/founder',
  '/salman': '/founder',
  '/muhammad-salman-khalid': '/founder',
  '/portfolio': '/projects',
  '/work': '/projects',
  '/case-studies': '/projects',
  '/blog': '/insights',
  '/articles': '/insights',
  '/get-quote': '/contact',
  '/consultation': '/contact',
  '/erp': '/services/enterprise-erp',
  '/ai': '/services/ai-automation',
  '/saas': '/services/saas-development',
  '/devops': '/services/cloud-devops',
  '/fintech': '/services/fintech-systems',
  '/ecommerce': '/services/ecommerce-engineering',
};
