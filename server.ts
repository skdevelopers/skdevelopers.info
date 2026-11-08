import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  ARTICLES_REGISTRY,
  INDUSTRIES_REGISTRY,
  PROJECTS_REGISTRY,
  REDIRECT_MAP,
  SERVICES_REGISTRY,
  SITE_SETTINGS,
} from './src/data/registry';
import { buildWhatsAppUrl, validateConsultationInput } from './src/utils/engine';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface StoredConsultation {
  referenceId: string;
  submittedAt: string;
  name: string;
  company: string;
  contactMethod: string;
  contactValue: string;
  serviceRequired: string;
  projectDescription: string;
  budgetRange?: string;
  targetDate?: string;
  sourcePage?: string;
  whatsappHandoffUrl: string;
}

const consultationsStore: StoredConsultation[] = [];
const ipRateLimitMap = new Map<string, { count: number; windowStart: number }>();

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.disable('x-powered-by');
  app.use(express.json({ limit: '64kb' }));

  // www-to-apex canonical redirect in production when Host header is www.skdevelopers.info
  app.use((req, res, next) => {
    const host = req.headers.host || '';
    if (host.toLowerCase().startsWith('www.skdevelopers.info')) {
      return res.redirect(301, `https://skdevelopers.info${req.originalUrl}`);
    }
    next();
  });

  // Configurable legacy URL redirects
  app.use((req, res, next) => {
    const cleanPath = req.path.replace(/\/+$/, '') || '/';
    if (req.method === 'GET' && REDIRECT_MAP[cleanPath]) {
      return res.redirect(301, REDIRECT_MAP[cleanPath]);
    }
    next();
  });

  // 1. Health Endpoint for Docker & Virtualmin Reverse Proxy Checks
  app.get('/api/health', (_req, res) => {
    res.status(200).json({
      ok: true,
      service: 'skdevelopers-global-website',
      canonicalDomain: SITE_SETTINGS.canonicalDomain,
      founder: SITE_SETTINGS.founder.name,
      uptimeSeconds: Math.round(process.uptime()),
      timestamp: new Date().toISOString(),
    });
  });

  // 2. Consultation Lead Capture Endpoint with Validation & Abuse Protection
  app.post('/api/consultations', (req, res) => {
    const clientIp =
      (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
      req.socket.remoteAddress ||
      'unknown';

    const now = Date.now();
    const rateRecord = ipRateLimitMap.get(clientIp);
    if (rateRecord && now - rateRecord.windowStart < 60_000) {
      if (rateRecord.count >= 10) {
        return res.status(429).json({
          ok: false,
          error: 'Too many consultation requests from this address. Please wait a minute or message us on WhatsApp.',
        });
      }
      rateRecord.count += 1;
    } else {
      ipRateLimitMap.set(clientIp, { count: 1, windowStart: now });
    }

    const payload = req.body || {};
    const validation = validateConsultationInput(payload);

    if (!validation.valid) {
      return res.status(400).json({
        ok: false,
        error: 'Please correct the highlighted fields before submitting.',
        fieldErrors: validation.errors,
      });
    }

    const referenceId = `SK-${Date.now().toString(36).toUpperCase().slice(-6)}`;
    const submittedAt = new Date().toISOString();

    const whatsappHandoffUrl = buildWhatsAppUrl({
      subject: `Consultation [${referenceId}] — ${String(payload.company).trim()}`,
      service: String(payload.serviceRequired).trim(),
      summary: `${String(payload.projectDescription).trim()} (Contact: ${String(
        payload.contactValue
      ).trim()})`,
      pagePath: String(payload.sourcePage || '/contact'),
    });

    const record: StoredConsultation = {
      referenceId,
      submittedAt,
      name: String(payload.name).trim(),
      company: String(payload.company).trim(),
      contactMethod: String(payload.contactMethod),
      contactValue: String(payload.contactValue).trim(),
      serviceRequired: String(payload.serviceRequired).trim(),
      projectDescription: String(payload.projectDescription).trim(),
      budgetRange: payload.budgetRange ? String(payload.budgetRange).trim() : undefined,
      targetDate: payload.targetDate ? String(payload.targetDate).trim() : undefined,
      sourcePage: payload.sourcePage ? String(payload.sourcePage).trim() : '/contact',
      whatsappHandoffUrl,
    };

    consultationsStore.unshift(record);
    if (consultationsStore.length > 200) {
      consultationsStore.pop();
    }

    return res.status(201).json({
      ok: true,
      referenceId,
      submittedAt,
      whatsappHandoffUrl,
    });
  });

  // 3. Dynamic XML Sitemap for Search Engines
  app.get('/sitemap.xml', (_req, res) => {
    const base = SITE_SETTINGS.canonicalDomain;
    const staticRoutes = [
      '/',
      '/about',
      '/founder',
      '/services',
      '/projects',
      '/industries',
      '/solutions',
      '/insights',
      '/deployment',
      '/contact',
    ];

    const serviceRoutes = SERVICES_REGISTRY.map((s) => `/services/${s.slug}`);
    const projectRoutes = PROJECTS_REGISTRY.filter((p) => p.publicationApproved).map(
      (p) => `/projects/${p.slug}`
    );
    const industryRoutes = INDUSTRIES_REGISTRY.map((i) => `/industries/${i.slug}`);
    const articleRoutes = ARTICLES_REGISTRY.filter((a) => a.publicationState === 'PUBLISHED').map(
      (a) => `/insights/${a.slug}`
    );

    const allRoutes = [
      ...staticRoutes,
      ...serviceRoutes,
      ...projectRoutes,
      ...industryRoutes,
      ...articleRoutes,
    ];

    const xmlUrls = allRoutes
      .map(
        (route) => `  <url>
    <loc>${base}${route}</loc>
    <changefreq>${route === '/' ? 'weekly' : 'monthly'}</changefreq>
    <priority>${route === '/' ? '1.0' : '0.8'}</priority>
  </url>`
      )
      .join('\n');

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlUrls}
</urlset>`;

    res.header('Content-Type', 'application/xml; charset=utf-8');
    res.status(200).send(xml);
  });

  // 4. Robots.txt Directives
  app.get('/robots.txt', (_req, res) => {
    const robots = [
      'User-agent: *',
      'Allow: /',
      'Disallow: /api/',
      `Sitemap: ${SITE_SETTINGS.canonicalDomain}/sitemap.xml`,
    ].join('\n');
    res.header('Content-Type', 'text/plain; charset=utf-8');
    res.status(200).send(robots);
  });

  // 5. Vite Middleware in Development / Static Dist in Production
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath, { index: false }));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`SK Developers server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
