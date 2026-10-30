# DEPLOYMENT HANDOVER & RELEASE GUIDE

**Document Reference**: `docs/revision/09-deployment-handover.md`  
**Target Domain**: `https://gala-night-club.vercel.app/`  
**Git Working Branch**: `revision/customer-content-updates`  
**Target Deployment Platform**: Vercel (Production & Preview)  
**Date**: 2026-10-29  

---

## 1. Deployment Safety Directive

> [!CAUTION]
> **GOVERNING RULE**: Per project safety protocols, **no code is automatically published to the production domain without explicit customer approval**. All changes currently reside on branch `revision/customer-content-updates` and have been verified against the production build.

---

## 2. Vercel Configuration Review

The repository contains a battle-tested, production-ready [vercel.json](file:///d:/Vibe%20Code/Web-Google-form/vercel.json):

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "cleanUrls": true,
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

### Key Configuration Strengths:
1. **SPA Routing Rewrite**: `/(.*)` -> `/index.html` ensures client-side routes such as `/register` and `/*` (404 page) resolve correctly without returning Vercel 404 errors on browser page reloads.
2. **Immutable Asset Caching**: 1-year cache header (`max-age=31536000, immutable`) on `/assets/*` leverages Vite's content-hashed chunk filenames for performance and zero CDN cache staleness.
3. **Clean URLs**: Strips `.html` extensions automatically.

---

## 3. Environment Variables & Secrets Audit

- **Client-Side Static Web (JAMstack)**: The website runs completely client-side via React 18 and Vite.
- **No Private Secrets Required**: No database passwords, server private keys, or SendGrid/SMTP API keys are committed or required for this frontend deployment.
- **Google Form Integration**: Currently in safe `UNCONFIGURED` mode. When the customer provides their Google Form Action URL and Entry IDs, they can be inserted directly into [src/services/googleForm.js](file:///d:/Vibe%20Code/Web-Google-form/src/services/googleForm.js#L46-L65) or mapped via `VITE_GALA_FORM_ACTION_URL` if environment variable decoupling is preferred.

---

## 4. Step-by-Step Deployment Instructions

### Option A: Standard Git-Driven Vercel Deployment (Recommended)
1. **Push Branch to Remote**:
   ```bash
   git add .
   git commit -m "feat: complete Solfera D-DAY 2026 website revision (Phases 1-8)"
   git push origin revision/customer-content-updates
   ```
2. **Create Pull Request**:
   - Open a Pull Request from `revision/customer-content-updates` into `main`.
   - Vercel GitHub integration will automatically build and publish an isolated **Preview Deployment URL** (e.g. `https://gala-night-club-git-revision-customer-content-updates-*.vercel.app`).
3. **Customer Acceptance**:
   - Share the Preview URL with the customer for final stakeholder review.
4. **Merge to Production**:
   - Upon customer approval, merge the PR into `main`.
   - Vercel automatically deploys the merged commit to the live domain: `https://gala-night-club.vercel.app/`.

### Option B: Vercel CLI Deployment (Direct from Workspace)
If Vercel CLI is authenticated:
1. **Preview Deploy**:
   ```bash
   npx vercel
   ```
   Inspect the returned Preview URL to verify functionality in a live cloud environment.
2. **Production Deploy (Requires Explicit Approval)**:
   ```bash
   npx vercel --prod
   ```

---

## 5. Rollback Procedure

In the unlikely event of an unexpected issue following a production release:

### Immediate Rollback (Zero Downtime via Vercel Dashboard):
1. Navigate to the **Vercel Project Dashboard** -> **Deployments**.
2. Locate the previous stable production deployment (Commit `1b87943`).
3. Click the three dots (`...`) -> **Instant Rollback**.
4. Traffic is immediately redirected to the prior build in less than 5 seconds.

### Git Revert:
```bash
git revert HEAD -m "revert: rollback Solfera revision to stable baseline"
git push origin main
```

---

## 6. Outstanding Customer Confirmations Checklist

Before or immediately after launch, the customer should be invited to provide:

1. [ ] **Official Google Form Link**: Provide the live Google Form URL and field entry IDs to unblock live submission synchronization (`REQ-16`).
2. [ ] **Official Facebook Fanpage Handle**: Confirm the exact vanity URL for `GYC - Câu lạc bộ Thế hệ trẻ AEP` (currently falls back safely to `https://facebook.com`).
3. [ ] **Singer / Guest Lineup Updates**: When the customer is ready to announce the secret guest singers, provide their names and promo images to display on the Gala Night showcase.

