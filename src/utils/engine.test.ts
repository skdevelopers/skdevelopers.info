import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildWhatsAppUrl,
  filterProjects,
  matchBusinessSolution,
  resolveRouteMetadata,
  validateConsultationInput,
} from './engine';
import { PROJECTS_REGISTRY } from '../data/registry';

test('matchBusinessSolution maps property construction cost control to Construction ERP blueprint', () => {
  const result = matchBusinessSolution({
    businessCategory: 'property-construction',
    operationalChallenge: 'cost-inventory-control',
    softwareType: 'enterprise-erp',
    systemStage: 'spreadsheets-manual',
    desiredOutcome: 'cost-accountability',
  });

  assert.ok(result.blueprintTitle.includes('Construction ERP'));
  assert.ok(result.recommendedModules.some((m) => m.includes('Construction ERP')));
  assert.ok(result.recommendedModules.some((m) => m.includes('Contractor IPC Billing')));
  assert.equal(result.primaryServiceSlug, 'enterprise-erp');
  assert.ok(result.whatsappUrl.startsWith('https://wa.me/923008666716?text='));
});

test('filterProjects enforces publicationApproved by default and reveals governed records when authorized', () => {
  const publicProjects = filterProjects(PROJECTS_REGISTRY, 'All', false, '');
  const allProjectsWithGovernance = filterProjects(PROJECTS_REGISTRY, 'All', true, '');

  // DriveNow, GECIM, and QMan are unapproved by default per truthfulness & confidentiality rules
  assert.equal(
    publicProjects.some((p) => p.slug === 'gecim'),
    false,
    'GECIM should be hidden from default public view'
  );
  assert.equal(
    publicProjects.some((p) => p.slug === 'qman'),
    false,
    'QMan draft should be hidden from default public view'
  );
  assert.equal(
    publicProjects.some((p) => p.slug === 'skos-cloud'),
    true,
    'SKOS Cloud should be visible in default public view'
  );
  assert.ok(allProjectsWithGovernance.length > publicProjects.length);

  // Filter by Concepts tag
  const concepts = filterProjects(PROJECTS_REGISTRY, 'Concepts', false, '');
  assert.equal(concepts.length, 1);
  assert.equal(concepts[0].slug, 'sk-livingsphere');
  assert.equal(concepts[0].status, 'CONCEPT / PROPOSAL');
});

test('validateConsultationInput rejects empty/invalid inputs and passes valid consultation payloads', () => {
  const emptyCheck = validateConsultationInput({
    name: '',
    company: '',
    contactMethod: 'email',
    contactValue: 'not-an-email',
    serviceRequired: '',
    projectDescription: 'too short',
    privacyConsent: false,
  });

  assert.equal(emptyCheck.valid, false);
  assert.ok(emptyCheck.errors.name);
  assert.ok(emptyCheck.errors.company);
  assert.ok(emptyCheck.errors.contactValue);
  assert.ok(emptyCheck.errors.serviceRequired);
  assert.ok(emptyCheck.errors.projectDescription);
  assert.ok(emptyCheck.errors.privacyConsent);

  const validCheck = validateConsultationInput({
    name: 'Tariq Mahmood',
    company: 'Meridian Holdings',
    contactMethod: 'email',
    contactValue: 'tariq@meridian.example.com',
    serviceRequired: 'Enterprise ERP Development',
    projectDescription:
      'We need a multi-branch inventory and double-entry financial ERP for 6 wholesale depots.',
    privacyConsent: true,
  });

  assert.equal(validCheck.valid, true);
  assert.equal(Object.keys(validCheck.errors).length, 0);
});

test('resolveRouteMetadata handles canonical paths, dynamic service/project slugs, and legacy redirects', () => {
  const homeMeta = resolveRouteMetadata('/');
  assert.equal(homeMeta.canonicalUrl, 'https://skdevelopers.info/');
  assert.equal(homeMeta.h1, 'Your Ambition. Engineered for Scale.');

  const erpMeta = resolveRouteMetadata('/services/enterprise-erp');
  assert.equal(erpMeta.canonicalUrl, 'https://skdevelopers.info/services/enterprise-erp');
  assert.equal(erpMeta.breadcrumbs.length, 3);

  const legacyRedirect = resolveRouteMetadata('/portfolio');
  assert.equal(legacyRedirect.redirectTo, '/projects');
  assert.equal(legacyRedirect.canonicalUrl, 'https://skdevelopers.info/projects');
});

test('buildWhatsAppUrl encodes official SK Developers WhatsApp number and context', () => {
  const url = buildWhatsAppUrl({
    service: 'Enterprise ERP',
    subject: 'SKOS Cloud Inquiry',
    pagePath: '/projects/skos-cloud',
  });
  assert.ok(url.startsWith('https://wa.me/923008666716?text='));
  assert.ok(url.includes(encodeURIComponent('Enterprise ERP')));
});
