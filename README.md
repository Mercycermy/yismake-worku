# Yismake Worku (ይስማዕከ ወርቁ) — Official Author Website & Literary Universe

[![Vite](https://img.shields.io/badge/Vite-8.0-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Language](https://img.shields.io/badge/Bilingual-Amharic%20%7C%20English-gold)](#bilingual-architecture)
[![Telegram](https://img.shields.io/badge/Community-18.6K%2B%20Readers-2CA5E0?logo=telegram&logoColor=white)](https://t.me/yismakeworku)

A world-class digital home and speculative literary universe for celebrated contemporary Ethiopian author **Yismake Worku (ይስማዕከ ወርቁ)**. This project reimagines the author platform not as a generic bookstore template or commercial catalog, but as an immersive, cinematic portal into the world of Ethiopian techno-thrillers, ancient Ge'ez monastic wisdom, quantum physics, and incisive political satire.

---

## Table of Contents
1. [Project Overview](#project-overview)
2. [Creative Direction & Visual Identity](#creative-direction--visual-identity)
3. [Verified Research & Literary Dataset](#verified-research--literary-dataset)
4. [Technology Stack](#technology-stack)
5. [Key Features & Architecture](#key-features--architecture)
6. [Bilingual Architecture](#bilingual-architecture)
7. [Getting Started & Local Setup](#getting-started--local-setup)
8. [Development & Build Commands](#development--build-commands)
9. [Production Deployment Guide](#production-deployment-guide)
10. [SEO & Structured Data](#seo--structured-data)
11. [Image & Content Licensing Notes](#image--content-licensing-notes)
12. [Research Methodology & Sources](#research-methodology--sources)

---

## Project Overview

Yismake Worku is a pioneer of modern Ethiopian science fiction and speculative literature. Rising to national fame at age 22 with the publication of *Dertogada* (2009 / 2001 E.C.)—which broke Ethiopian publishing records with over 200,000 copies sold across ten reprints in its first year—Yismake has authored over 15 verified books.

This web application communicates:
- **Who Yismake Worku is**: His origins in Gojjam, his academic role as a university lecturer at Debre Markos University, his fortitude surviving a catastrophic 2017 car accident, and his living relationship with over 18,600 readers on Telegram.
- **The Dertogada Canonical Universe**: An interactive 5-part saga (*Dertogada*, *Ramatohara*, *Xantoxara*, *Yoratorad*, *Yotod*) connecting underground aerospace laboratories beneath Lake Tana with international counter-espionage.
- **Complete Verified Bibliography**: 15+ verified works across techno-thrillers, magical realism (*Kebur Dengay* / *The Lost Spell*), environmental investigative fiction (*Zamra*), sociological critique (*Gefuan*), and debut poetry (*Yewond Mit*).
- **International Acclaim**: English translations, including *The Lost Spell* (translated by Dr. Bethlehem Attfield, Henningham Family Press, UK), which was shortlisted for the 2022 TA First Translation Prize in the United Kingdom.

---

## Creative Direction & Visual Identity

### "An Ethiopian Literary Universe from the Future"
The visual identity deliberately rejects cliché bookstore designs, generic templates, and flat flag colors. Instead, it weaves a rich tapestry of:
- **Subterranean Quantum Physics**: Deep obsidian (`#080b11`), cosmic slate (`#121824`), and glowing cyan (`#00f0ff`) evoking the hidden laboratory under Lake Tana.
- **Ancient Ge'ez Vellum**: Warm ivory and aged parchment (`#f6f0e2`, `#ebe4d3`) echoing monastic manuscript vaults.
- **Imperial Axumite Gold & Crimson**: Burnished solar brass (`#d4af37`) and royal burgundy (`#8b1e2d`).
- **Bespoke Amharic Typography**: Google Fonts *Noto Serif Ethiopic* (editorial display and literature titles) paired with *Noto Sans Ethiopic* (crisp UI/metadata) and *Cinzel* (classical monumental headings).
- **Custom 3D Procedural Book Covers**: Every title has an individual atmospheric lighting effect, 3D spine depth, and verified Ethiopic calligraphy.

---

## Verified Research & Literary Dataset

All data in `src/data/yismakeData.js` is backed by verifiable records:
- **The Dertogada Pentology**:
  1. *Dertogada* (ዴርቶጋዳ) — 2009 (2001 E.C.)
  2. *Ramatohara* (ራማቶሓራ) — 2010 (2002 E.C.)
  3. *Xantoxara* / *Zhantozhara* (ዣንቶዣራ) — 2011 (2003 E.C.)
  4. *Yoratorad* (ዮራቶራድ) — 2014 (2006 E.C.)
  5. *Yotod* (ዮቶድ) — 2016 (2008 E.C.)
- **Standalone Masterpieces & Poetry**:
  - *Kebur Dengay* / *The Lost Spell* (ክቡር ድንጋይ) — 2013 (2005 E.C.)
  - *Zamra* (ዛምራ) — 2014 (2006 E.C.)
  - *Gefuan* (ግፉዓን) — 2015 (2007 E.C.)
  - *Melos* (ሜሎስ) — 2012 (2004 E.C.)
  - *Telmid* (ተልሚድ) — 2013 (2005 E.C.)
  - *Yewond Mit* (የወንድ ምጥ) — 2008 (2000 E.C.)
  - *Yekend Awta Nuro* (የቀንድ አውጣ ኑሮ) — 2013 (2005 E.C.)
  - *YeOgaden Demetoch* (የኦጋዴን ድመቶች) — 2015 (2007 E.C.)
  - *Dehinetu* (ደህንነቱ) — 2017
  - *Tekerchem* (ተከርቼም) — 2018

---

## Technology Stack

- **Frontend Core**: React 19 (`react: ^19.2.5`, `react-dom: ^19.2.5`)
- **Build Engine**: Vite 8 (`vite: ^8.0.10`, `@vitejs/plugin-react: ^6.0.1`)
- **Routing**: React Router 7 (`react-router-dom: ^7.14.2`)
- **Styling Architecture**: Pure Vanilla CSS (`src/index.css`) with zero external CSS preprocessors or runtime frameworks for maximum performance and portability.
- **Server Environment**: Node.js & Express (`express: ^4.21.0`) with server-side SEO HTML injection (`server/seo.js`).
- **Typography**: Google Fonts (*Noto Serif Ethiopic*, *Noto Sans Ethiopic*, *Cinzel*, *Plus Jakarta Sans*, *JetBrains Mono*).

---

## Key Features & Architecture

1. **Cinematic Hero**: Dual-language typography, verified statistical metrics, coordinate telemetry, and book showcase.
2. **Interactive Dertogada Universe Section**: Constellation reading sequence, subterranean site dossiers, and character profiles for Shagiz Ejigu, Zipporah, and Dr. Anania.
3. **The Literary Library (`/books`)**: Search by title (Amharic or English), multi-category filtering (Genre, Series, Translation status), sorting by publication date, and instant Grid/List view toggle.
4. **Editorial Book Dossiers (`/books/:slug`)**: Large 3D book cover, bilingual plot synopsis, verified thematic threads, bibliographic table, purchase sources, and related canon links.
5. **Visual Biography (`/author`)**: Museum-grade vertical archival timeline, Gojjam roots, academic lectureship, accident recovery, and author philosophy.
6. **Archival Media Room (`/archive`)**: EBS Seifu broadcast feature, Arts TV World coverage, peer-reviewed journal papers, and Telegram community dispatches.
7. **Transparent Sources & Bibliography (`/sources`)**: Scholarly citations (Taylor & Francis study by Sara Marzagora & Tom Boylston, Henningham Family Press, AAU theses).
8. **Direct Connection (`/contact`)**: Official channel link (`@yismakeworku`) and inquiry transmission form.

---

## Bilingual Architecture

The website features an instant, reactive language engine powered by `LanguageContext.jsx`:
- Toggles between English (`en`) and Amharic (`am`) without page reloads.
- Automatically persists the reader's preference in `localStorage`.
- Dynamically updates `document.documentElement.lang` and body class (`lang-am` vs `lang-en`).
- Amharic typography automatically adjusts font weights, optical sizes, and line-heights to eliminate Ethiopic character clipping.

---

## Getting Started & Local Setup

### Prerequisites
- Node.js 18.x or higher
- npm 9.x or higher

### Installation
```bash
# Clone or navigate to project directory
cd "c:/Users/zuko/Downloads/Authorwebsit-master/Yismake Worku"

# Install dependencies
npm install
```

---

## Development & Build Commands

```bash
# Run local development server (Vite hot module reloading)
npm run dev

# Run production build
npm run build

# Preview production build locally
npm run preview

# Run the Express server with SEO prerendering
npm start
```

---

## Production Deployment Guide

### Option 1: Static Web Hosting (Vercel / Netlify / Cloudflare Pages / GitHub Pages)
1. Run `npm run build`.
2. Deploy the generated `dist/` directory.
3. Configure SPA rewrites so all route paths (`/universe`, `/books/*`, `/author`, etc.) rewrite to `index.html`.

### Option 2: Node.js / cPanel Hosting
1. Upload the project to the server.
2. Set environment variables:
   ```text
   PORT=3001
   NODE_ENV=production
   ```
3. Run `npm run build`.
4. Start the Node application via `npm start` (points to `server/server.js`), which serves static assets from `dist/` and performs dynamic server-side SEO injection via `server/seo.js`.

---

## SEO & Structured Data

The application provides comprehensive, crawlable search engine optimization:
- **Schema.org Structured Data**:
  - `Person`: Full biographical schema for Yismake Worku with `sameAs` references.
  - `Book`: Schema for each book with genre, author reference, and publication year.
  - `WebSite`: Publisher and canonical organization markup.
  - `BreadcrumbList`: Structural hierarchy across all routes.
- **Social Metadata**: Complete Open Graph (`og:*`) and Twitter Card (`twitter:*`) tags on every page.
- **Robots & Sitemap**: `public/robots.txt` and `public/sitemap.xml` configured for production indexing.

---

## Image & Content Licensing Notes

- **Copyright Compliance**: This website is an author showcase and literary discovery platform. No full copyrighted manuscripts or pirated content are hosted.
- **Excerpts & Descriptions**: Short thematic synopses and metadata are included under fair-use educational and discovery guidelines.
- **Visual Assets**: Visuals combine public promotional author photography, official Telegram avatars, and original procedural styling inspired by the books' science-fiction themes.

---

## Research Methodology & Sources

Every factual claim on this platform is verified against independent public records:
1. **Academic Peer-Reviewed Research**: Marzagora, S., & Boylston, T. (2018). *Modernisation from the Shadows: Conspiracy, Monasticism and Techno-Utopia in the Amharic novel Dertogada*. *Eastern African Literary and Cultural Studies* (Taylor & Francis).
2. **Translation & Literary Awards**: Attfield, B. (2022). *The Lost Spell* (Henningham Family Press, London); Shortlisted for the 2022 TA First Translation Prize (Society of Authors, UK).
3. **Graduate Research**: Addis Ababa University, Department of Literature (Theses on translation strategies and contemporary Ethiopian thrillers).
4. **Author Community**: Official Telegram Channel `@yismakeworku` (18.6K+ subscribers).
5. **Broadcast Media**: Interviews on *Seifu on EBS* and *Arts TV World*.
