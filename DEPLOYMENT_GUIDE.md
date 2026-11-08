# SK Developers (`skdevelopers.info`) — Contabo 12GB VPS & Virtualmin Deployment Guide

## 1. Architecture Overview
- **Canonical Domain**: `https://skdevelopers.info`
- **Target Server**: Contabo 12GB RAM Linux VPS running **Virtualmin**.
- **Non-Destructive Guarantee**: This deployment **never** alters existing Virtualmin DNS zones, Postfix/Dovecot email servers, Let's Encrypt SSL certificates, firewall rules, or unrelated virtual servers (`skos.cloud`, `callify.pro`, `everestbuy.pk`, `drivenow.live`, `drivenow.pk`).
- **Loopback Isolation**: The Docker container listens only on `127.0.0.1:3080` (Production) and `127.0.0.1:3081` (Staging). Container port `3000` is never published to `0.0.0.0`.

## 2. Step-by-Step Deployment & Staging Verification

### Step 1 — Clone Independent Repository
```bash
mkdir -p /opt/skdevelopers-site
cd /opt/skdevelopers-site
git clone <YOUR_GITHUB_REPO_URL> .
```

### Step 2 — Build & Verify Staging First
```bash
export STAGING_IMAGE_TAG=$(git rev-parse --short HEAD)
docker compose --profile staging up -d --build skdevelopers-staging
curl -fsS http://127.0.0.1:3081/api/health
```

### Step 3 — Build & Launch Production Loopback Container
```bash
export IMAGE_TAG=$(git rev-parse --short HEAD)
docker compose up -d --build skdevelopers-prod
curl -fsS http://127.0.0.1:3080/api/health
curl -fsS http://127.0.0.1:3080/sitemap.xml | head -n 15
```

### Step 4 — Virtualmin Proxy Path Cutover
In Virtualmin for `skdevelopers.info`:
1. Navigate to **Server Configuration -> Proxy Paths** (or **Edit Directives**).
2. Configure `/ -> http://127.0.0.1:3080/`.
3. Apply web server configuration reload (`systemctl reload apache2` or `systemctl reload nginx`).

## 3. Instant 30-Second Rollback Procedure
If any issue is detected after cutover:
```bash
export IMAGE_TAG=<PREVIOUS_VERIFIED_COMMIT_SHA>
docker compose up -d skdevelopers-prod
```
Or revert the Virtualmin Proxy Path rule to the backed-up document root.
