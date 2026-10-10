# Implementation Plan - Multi-Domain SEO & Site Name Optimization

## Objective
Update `index.html` and server-side SEO pre-rendering (`server.ts`) to robustly support both the primary domain (`https://ammalfarm.dpdns.org/`) and the Adu Santhai sub-domain (`https://adusanthai.ammalfarm.dpdns.org/`), ensuring Google Search results display "Ammal Farm" and "Ammal Farm Adu Santhai" instead of "DigitalPlat Domain".

## Proposed Changes

### 1. `index.html`
- Add dynamic or comprehensive WebSite schema JSON-LD supporting both primary and sub-domain branding.
- Ensure strict compliance with Google's site name guidelines (`WebSite` schema, `alternateName`, OpenGraph `og:site_name`, `application-name`, `apple-mobile-web-app-title`).

### 2. Server-side Pre-rendering (`server.ts`)
- Check request host/origin if available to dynamically inject the correct canonical URL, site name, and schema depending on whether the request is for the main domain or `adusanthai` sub-domain.

### 3. Verification
- Run type check (`npm run lint`) and build (`npm run build`) to ensure zero errors.
