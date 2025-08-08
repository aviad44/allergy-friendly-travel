# Allergy-Free Travel – Project Snapshot

A complete, readable technical snapshot to review performance, SEO, security, DX, and product features.

## 1) Title & Short Summary
- Project: Allergy-Free Travel (Allergy-Friendly Hotel Finder)
- Stack: React 18 + Vite, TypeScript, Tailwind CSS (shadcn-ui), React Router, Supabase Edge Functions, Netlify (functions + edge functions)
- Purpose: Help travelers with food allergies find safe, allergy-friendly hotels and generate translation cards.
- Status: Active SPA with destination guides, AI-assisted search via Supabase Edge Functions, strong SEO and social metadata, and Netlify deploy config.

---

## 2) Project Tree (filtered)
Notes:
- Excluded: node_modules, dist, .git, lock files, media/binary assets, src/components/ui/**
- Included key source/config, Supabase, Netlify functions, sitemap/robots

```
.
├─ README.md
├─ index.html
├─ netlify.toml
├─ public/
│  ├─ robots.txt
│  └─ sitemap.xml
├─ src/
│  ├─ App.tsx
│  ├─ main.tsx
│  ├─ index.css
│  ├─ assets/              (images excluded)
│  ├─ components/
│  │  ├─ AllergyChatBox.tsx
│  │  ├─ CanonicalTags.tsx
│  │  ├─ ChatInterface.tsx
│  │  ├─ DefaultMetaTags.tsx
│  │  ├─ DirectGptChat.tsx
│  │  ├─ FAQStructuredData.tsx
│  │  ├─ FeaturedDestinations.tsx
│  │  ├─ FeaturedHotels.tsx
│  │  ├─ Footer.tsx
│  │  ├─ GlobalSocialTags.tsx
│  │  ├─ MainLayout.tsx
│  │  ├─ MainMenu.tsx
│  │  ├─ NetlifySocialHeaders.tsx
│  │  ├─ OptimizedImage.tsx
│  │  ├─ ParisChatAssistant.tsx
│  │  ├─ SearchBar.tsx
│  │  ├─ SiteHeader.tsx
│  │  ├─ SocialSharingHandler.tsx
│  │  ├─ SocialTags.tsx
│  │  ├─ StructuredData.tsx
│  │  ├─ hero/HeroSection.tsx
│  │  ├─ allergy-card/ ... (multiple files)
│  │  ├─ contact/ ...
│  │  ├─ cruise/ ...
│  │  ├─ destinations/ ...
│  │  ├─ language/ ...
│  │  ├─ menu-scanner/ ...
│  │  ├─ reviews/ ...
│  │  ├─ search/ ...
│  │  ├─ theme-provider.tsx
│  │  └─ ui/ (excluded)
│  ├─ constants/
│  │  ├─ destinations.ts
│  │  └─ home.ts
│  ├─ data/
│  │  ├─ destination-*.ts (many destinations)
│  │  ├─ destinations-list.ts
│  │  └─ generic-content.ts
│  ├─ hooks/
│  │  ├─ use-mobile.tsx
│  │  ├─ useImageLoader.ts
│  │  ├─ usePerformanceOptimization.ts
│  │  └─ use-toast.ts
│  ├─ integrations/
│  │  └─ supabase/
│  │     ├─ client.ts (not included per scope)
│  │     └─ types.ts (read-only; excluded from edits)
│  ├─ lib/utils.ts
│  ├─ pages/
│  │  ├─ Index.tsx
│  │  ├─ AboutUs.tsx
│  │  ├─ Categories.tsx
│  │  ├─ Contact.tsx
│  │  ├─ DirectChat.tsx
│  │  ├─ FAQ.tsx
│  │  ├─ NotFound.tsx
│  │  ├─ Privacy.tsx
│  │  ├─ Reviews.tsx
│  │  ├─ SearchResults.tsx
│  │  ├─ Sitemap.tsx
│  │  ├─ Terms.tsx
│  │  ├─ AllergyTranslationCard.tsx
│  │  └─ destinations/ (many pages)
│  ├─ types/
│  │  ├─ definitions.ts
│  │  ├─ reviews.ts
│  │  └─ search.ts
│  ├─ utils/
│  │  ├─ hotels-parser/ (index.ts, extractors.ts, helpers.ts, types.ts)
│  │  ├─ hybridSearch.ts
│  │  ├─ image-optimization.ts
│  │  ├─ performanceMonitoring.ts
│  │  ├─ performanceOptimizer.ts
│  │  ├─ searchSuggestions.ts
│  │  └─ socialSharing.ts
│  └─ vite-env.d.ts
├─ supabase/
│  ├─ config.toml
│  └─ functions/
│     ├─ analyze-menu-allergens/index.ts
│     ├─ chat-with-gpt/index.ts
│     ├─ gpt-proxy/index.ts
│     ├─ openai-proxy/index.ts
│     ├─ search-with-gpt/index.ts
│     └─ translate-card/index.ts
├─ netlify/
│  ├─ edge-functions/optimize-static-assets.js
│  └─ functions/translate-card.js
├─ tailwind.config.ts
├─ postcss.config.js
├─ tsconfig.json
├─ vite.config.ts
└─ package.json
```

---

## 3) Full Content of Relevant Files

### index.html
```html
<!-- truncated to relevant portion for brevity; full file in repo -->
<!DOCTYPE html>
<html lang="en" prefix="og: https://ogp.me/ns#">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Allergy-Friendly Travel Guide | Safe Hotels & Tips for Dietary Restrictions</title>
  <!-- ... full meta OG/Twitter tags, preloads, analytics, canonical ... -->
  <link rel="stylesheet" href="/src/index.css" media="all" />
</head>
<body>
  <div id="root"></div>
  <script type="module" src="/src/main.tsx"></script>
</body>
</html>
```

### public/sitemap.xml
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
  <!-- full sitemap as in repo -->
</urlset>
```

### public/robots.txt
```txt
User-agent: *
Allow: /
# ... disallow dev/code files, allow social/prerender bots, sitemap reference
Sitemap: https://www.allergy-free-travel.com/sitemap.xml
```

### vite.config.ts
```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig(({ mode }) => ({
  server: { host: "::", port: 8080, historyApiFallback: true },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
    mode === 'production' && visualizer({ filename: './dist/stats.html', open: false, gzipSize: true, brotliSize: true })
  ].filter(Boolean),
  resolve: { alias: { "@": path.resolve(__dirname, "./src") } },
  build: {
    target: 'es2020', outDir: 'dist', assetsDir: 'assets', minify: 'terser',
    terserOptions: { compress: { drop_console: mode === 'production', drop_debugger: true, pure_funcs: mode === 'production' ? ['console.log'] : [] } },
    rollupOptions: { output: { manualChunks: { 'react-vendor': ['react','react-dom'], 'router':['react-router-dom'], 'ui-components':['@/components/ui/button','@/components/ui/card','@/components/ui/toast'], 'performance':['@/utils/performanceOptimizer','@/hooks/usePerformanceOptimization'], 'image-optimization':['@/utils/image-optimization','@/components/OptimizedImage'], 'destinations':['@/pages/destinations/Paris','@/pages/destinations/London','@/pages/destinations/Rome'] }, chunkFileNames:'assets/js/[name]-[hash].js', entryFileNames:'assets/js/[name]-[hash].js', assetFileNames:(assetInfo)=>{ const info=assetInfo.name?.split('.'); const ext=info?.[info.length-1]; if(/\.(png|jpe?g|svg|gif|tiff|bmp|ico|webp)$/i.test(assetInfo.name||'')) return `assets/img/[name]-[hash].[ext]`; if(/\.(woff2?|eot|ttf|otf)$/i.test(assetInfo.name||'')) return `assets/fonts/[name]-[hash].[ext]`; return `assets/${ext}/[name]-[hash].[ext]`; } } },
    sourcemap: false, cssCodeSplit: true, chunkSizeWarningLimit: 500, reportCompressedSize: false,
  },
  optimizeDeps: { include: ['react','react-dom','react-router-dom','@/utils/performanceOptimizer'], esbuildOptions: { target:'es2020' } },
  esbuild: { target:'es2020', logOverride: { 'this-is-undefined-in-esm': 'silent' } }
}));
```

### tailwind.config.ts
```ts
import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    container: { center: true, padding: "2rem", screens: { "2xl": "1400px" } },
    extend: {
      screens: { xs:'480px', sm:'640px', md:'768px', lg:'1024px', xl:'1280px', '2xl':'1536px' },
      keyframes: { /* hero-zoom, fade-in, etc. */ },
      animation: { /* hero-zoom, slide-in, pulse-light */ },
      colors: { border:"hsl(var(--border))", input:"hsl(var(--input))", ring:"hsl(var(--ring))", background:"hsl(var(--background))", foreground:"hsl(var(--foreground))", primary:{ DEFAULT:"hsl(var(--primary))", foreground:"hsl(var(--primary-foreground))" }, secondary:{ DEFAULT:"hsl(var(--secondary))", foreground:"hsl(var(--secondary-foreground))" }, destructive:{ DEFAULT:"hsl(var(--destructive))", foreground:"hsl(var(--destructive-foreground))" }, muted:{ DEFAULT:"hsl(var(--muted))", foreground:"hsl(var(--muted-foreground))" }, accent:{ DEFAULT:"hsl(var(--accent))", foreground:"hsl(var(--accent-foreground))" }, popover:{ DEFAULT:"hsl(var(--popover))", foreground:"hsl(var(--popover-foreground))" }, card:{ DEFAULT:"hsl(var(--card))", foreground:"hsl(var(--card-foreground))" } },
      borderRadius: { lg:"var(--radius)", md:"calc(var(--radius) - 2px)", sm:"calc(var(--radius) - 4px)" },
      fontFamily: { sans:["var(--font-sans)", ...fontFamily.sans], display:["var(--font-display)", ...fontFamily.sans] },
      spacing: { '0.75':'0.1875rem','1.25':'0.3125rem','1.75':'0.4375rem','2.25':'0.5625rem','2.75':'0.6875rem' },
      fontSize: { xxs:'0.625rem', xs:'0.75rem', sm:'0.875rem', base:'1rem', lg:'1.125rem', xl:'1.25rem', '2xl':'1.5rem', '3xl':'1.875rem', '4xl':'2.25rem', '5xl':'3rem' }
    },
  },
  plugins: ["tailwindcss-animate"],
} satisfies Config;
```

### postcss.config.js
```js
export default { plugins: { tailwindcss: {}, autoprefixer: {} } }
```

### tsconfig.json
```json
{
  "files": [],
  "references": [ { "path": "./tsconfig.app.json" }, { "path": "./tsconfig.node.json" } ],
  "compilerOptions": {
    "baseUrl": ".",
    "paths": { "@/*": ["./src/*"] },
    "noImplicitAny": false,
    "noUnusedParameters": false,
    "skipLibCheck": true,
    "allowJs": true,
    "noUnusedLocals": false,
    "strictNullChecks": false
  }
}
```

### package.json
```json
{
  "name": "vite_react_shadcn_ts",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": { "dev": "vite", "build": "vite build", "build:dev": "vite build --mode development", "lint": "eslint .", "preview": "vite preview" },
  "dependencies": { /* see repo; all standard UI/Radix/Supabase/React libs */ },
  "devDependencies": { /* vite, typescript, eslint, tailwind, lovable-tagger, etc. */ }
}
```

### netlify.toml
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[edge_functions]]
  path = "/*"
  function = "optimize-static-assets"

# many redirects blocking code files, mapping URLs, and default SPA fallback
# security headers and caching configured
```

### supabase/config.toml
```toml
project_id = "embuxlxugjkjgsusrmlx"
[api]
enabled = true
# ... other local ports for studio/db
[edge-functions]
enabled = true
[functions.translate-card]
verify_jwt = false
[functions.search-with-gpt]
verify_jwt = false
```

### netlify/edge-functions/optimize-static-assets.js
```js
export default async function handler(request, context) {
  // bot detection + special Facebook HTML OG response + Prerender.io fallback
  // full file in repo
}
```

### netlify/functions/translate-card.js
```js
// Netlify function proxying OpenAI translations with robust JSON handling, CORS, and fallbacks
// full file in repo
```

### supabase/functions/chat-with-gpt/index.ts
```ts
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
const corsHeaders = { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type' };
serve(async (req) => { /* CORS, parse messages, call OpenAI gpt-4o-mini, return message */ });
```

### supabase/functions/openai-proxy/index.ts
```ts
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
// accepts userInput/systemPrompt, forwards to OpenAI (model default gpt-4o), cleans output
```

### supabase/functions/gpt-proxy/index.ts
```ts
// Similar to openai-proxy, but with stricter structure for hotel outputs; logs token usage
```

### supabase/functions/search-with-gpt/index.ts
```ts
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
// Input: { destination, allergies }
// Output: { hotelsMarkdown, success }
// Calls OpenAI gpt-4o-mini with strict formatting instructions
```

### supabase/functions/translate-card/index.ts
```ts
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
// POST { text, targetLanguage } -> translatedText using gpt-4o-mini, strong CORS + error handling
```

### supabase/functions/analyze-menu-allergens/index.ts
```ts
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
// Safety-critical allergen parsing; returns strict JSON structure of allergens found
```

### supabase/functions/send-contact-email/index.ts
```ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
// Sends admin + user confirmation emails; requires RESEND_API_KEY
```

### src/main.tsx
```ts
import { createRoot } from 'react-dom/client'
import { lazy, Suspense } from 'react'
import './index.css'
import { initPerformanceOptimizations } from '@/utils/performanceOptimizer'
const App = lazy(() => import('./App'))
const LoadingFallback = () => (/* spinner */)
initPerformanceOptimizations()
createRoot(document.getElementById("root")!).render(
  <Suspense fallback={<LoadingFallback />}> <App /> </Suspense>
)
```

### src/App.tsx
```tsx
import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/toaster'
import { MainLayout } from '@/components/MainLayout'
import { HelmetProvider } from 'react-helmet-async'
import { GlobalSocialTags } from '@/components/GlobalSocialTags'
import { NetlifySocialHeaders } from '@/components/NetlifySocialHeaders'
import { SocialSharingHandler } from '@/components/SocialSharingHandler'
// ... imports for all pages
// Routes: see Routes Summary section below
export default function App(){ /* Router + ThemeProvider + Routes */ }
```

### src/pages/Index.tsx
```tsx
// Home page with HeroSection, FeaturedDestinations (lazy), and rich SEO tags/JSON-LD
```

### src/pages/SearchResults.tsx
```tsx
// CSR page: reads query params, calls supabase.functions.invoke('search-with-gpt'), parses results via utils/hybridSearch
```

### src/pages/AllergyTranslationCard.tsx
```tsx
// Generator for allergy translation cards, SEO tags, renders AllergyCardGenerator component
```

### src/pages/DirectChat.tsx
```tsx
// Protected demo page to test Supabase OpenAI proxy; requires access code; uses sonner toasts
```

### src/pages/{AboutUs, Contact, FAQ, Reviews, Categories, Sitemap, Terms, Privacy, NotFound}.tsx
```tsx
// Each implements its own SEO with Helmet, semantic HTML, accessibility-conscious content
```

### src/hooks/use-mobile.tsx
```ts
import * as React from "react"
const MOBILE_BREAKPOINT = 768
export function useIsMobile(){ /* matchMedia + state */ return !!isMobile }
```

### src/hooks/use-toast.ts
```ts
import { useState, useEffect, useCallback } from "react";
// Local toast queue + dismiss, plus standalone document event-based toast
```

### src/hooks/usePerformanceOptimization.ts
```ts
import { useEffect } from 'react';
import { initPerformanceOptimizations } from '@/utils/performanceOptimizer';
export const usePerformanceOptimization = () => { /* SW register in prod, prefetch routes on idle */ };
```

### src/hooks/useImageLoader.ts
```ts
// Chooses best available image URL with fallbacks; logs debug and handles critical destinations
```

### src/utils/hybridSearch.ts
```ts
// HybridHotelSearch: tries GPT via Supabase function; falls back to local data; adds UTM to URLs
```

### src/utils/searchSuggestions.ts
```ts
export const destinationSuggestions = ["Abu Dhabi","Amsterdam","Athens","Barcelona","Berlin","Budapest","Crete","Cyprus","Dubai","London","Madrid","New York","Paris","Prague","Rome","Singapore","Thailand","Tokyo","Venice","Vienna"]
export const allergySuggestions = ["Gluten","Dairy","Nuts","Peanuts","Tree nuts","Soy","Eggs","Wheat","Fish","Shellfish","Lactose","Celiac disease","Sesame","Mustard","Sulphites","Vegetarian","Vegan"]
```

### src/utils/hotels-parser/*
```ts
// extractors.ts, helpers.ts, index.ts, types.ts — parse GPT markdown to HotelInfo
```

### src/data/* (examples)
```ts
// destination-abu-dhabi.ts, destination-turkey.ts, ...: DestinationContent with hotels, FAQs, language tables
```

### src/components/* (selected)
```tsx
// CanonicalTags.tsx: inserts canonical link + robots
// SocialTags.tsx + GlobalSocialTags.tsx: OG/Twitter tags handling
// MainLayout.tsx + MainMenu.tsx + Footer.tsx: layout and navigation
// hero/HeroSection.tsx: homepage hero (see Known Issues re: fetchPriority prop casing)
// FeaturedDestinations.tsx: preloads images; responsive cards
```

> Note: To keep this snapshot readable, large component/data files are summarized here. If you need the full inline code for every file under src/components/** (excluding ui) and src/data/**, I can generate an addendum.

---

## 4) Supabase & Netlify Functions Overview

- Function: supabase/functions/search-with-gpt
  - Trigger: HTTP (CORS enabled), JWT verification: disabled (verify_jwt = false)
  - Input: { destination: string, allergies: string }
  - Output: { hotelsMarkdown: string, success: boolean }
  - Dependencies: OpenAI API (model gpt-4o-mini)

- Function: supabase/functions/translate-card
  - Trigger: HTTP (CORS), public
  - Input: { text: string, targetLanguage: string }
  - Output: { translatedText: string }
  - Dependencies: OpenAI API (gpt-4o-mini)

- Function: supabase/functions/openai-proxy
  - Trigger: HTTP (CORS)
  - Input: { userInput: string, systemPrompt?: string, model?: string, temperature?: number, max_tokens?: number }
  - Output: { result: string }
  - Dependencies: OpenAI API

- Function: supabase/functions/gpt-proxy
  - Trigger: HTTP (CORS)
  - Purpose: Similar to openai-proxy with stricter hotel formatting guidance

- Function: supabase/functions/chat-with-gpt
  - Trigger: HTTP (CORS)
  - Input: { messages: { role: 'user'|'system'|'assistant', content: string }[] }
  - Output: { message: string }
  - Dependencies: OpenAI API, Answers in Hebrew

- Function: supabase/functions/analyze-menu-allergens
  - Trigger: HTTP (CORS)
  - Input: { menuText: string, targetAllergens?: string[] }
  - Output: { allergens: { allergen, severity, confidence, items[] }[] }
  - Dependencies: OpenAI API

- Netlify function: netlify/functions/translate-card.js
  - Trigger: HTTP (CORS)
  - Input/Output: same as Supabase translate; used for Netlify runtime as alternative
  - Dependencies: OpenAI API

- Netlify edge function: netlify/edge-functions/optimize-static-assets.js
  - Trigger: Edge on /*
  - Purpose: Bot detection for social crawlers; Facebook-specific OG HTML; Prerender.io integration

Sensitive values used in functions: OPENAI_API_KEY, RESEND_API_KEY, PRERENDER_TOKEN — all must be configured as secrets; not exposed client-side.

---

## 5) Routes Summary
From src/App.tsx (SPA, CSR):
- / — Home (Hero, Featured Destinations, rich SEO)
- /destinations — Index of destinations
- /destinations/{london|paris|barcelona|cyprus|rome|abu-dhabi|crete|new-york|tokyo|thailand|ayia-napa|hotel-chains|portugal|swiss-alps|tuscany|gluten-free-europe|koh-samui|turkey|cruise-lines|toronto|athens|eilat|airlines|amsterdam|italy|stockholm}
- /search-results?destination=...&allergies=...
- /allergy-translation-card
- /reviews
- /categories
- /contact
- /about
- /faq
- /sitemap
- /terms
- /privacy
- /direct-chat (guarded by simple access code)
- 404 fallback: /destinations/:destinationId and catch-all NotFound

SEO: Each page uses Helmet for title/description; canonical tags via CanonicalTags; OG/Twitter tags on home and many pages; sitemap.xml and robots.txt present.

---

## 6) Data Fetching Overview
- Client-Side Rendering (CSR) only; no SSR/SSG.
- Supabase Edge Functions invoked via supabase.functions.invoke(...):
  - search-with-gpt for hotel results
  - openai-proxy / gpt-proxy for general GPT prompts
  - translate-card for translation
  - send-contact-email uses Resend (server-side only)
- Local static data under src/data for many destinations; hybridSearch combines local data and GPT fallback.

---

## 7) Known Issues / TODOs
- React warning: fetchPriority prop used on DOM element (HeroSection image). Use lowercase fetchpriority or remove on non-supported elements.
- Public Supabase anon key in client.ts (expected in public apps) — ensure all sensitive ops go through Edge Functions.
- Ensure verify_jwt=false only on functions that do not expose sensitive data or have their own safety checks (translate-card, search-with-gpt already public per config).
- Consider consolidating social meta handling to avoid duplication between index.html, GlobalSocialTags, and SocialTags.
- robots.txt disallows code paths; confirm this aligns with desired SEO for documentation pages.
- Performance: Many destination pages load large images from Unsplash; ensure lazy loading and proper sizes; continue using OptimizedImage/component where possible.
- DX: Large components/data structure — consider codegen or CMS in future; add tests (Jest) and ESLint rules as per project guidelines.

---

## 8) .env.example (redacted)
```env
# OpenAI
OPENAI_API_KEY=<REDACTED>

# Supabase (used server-side only; client anon key is public by design)
SUPABASE_SERVICE_ROLE_KEY=<REDACTED>
SUPABASE_DB_URL=<REDACTED>
SUPABASE_URL=<REDACTED>
SUPABASE_ANON_KEY=<REDACTED>

# Email
RESEND_API_KEY=<REDACTED>

# Prerender.io
PRERENDER_TOKEN=<REDACTED>
```

---

## Notes
- This snapshot prioritizes readability. If you want the full inline source for every file under src/components/** (excluding ui) and src/data/**, I can append an extended snapshot.
