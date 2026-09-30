# DESIGN.md — Yismake Worku (ይስማዕከ ወርቁ) Author Website

> Single source of truth for the UI. Any developer or AI coding agent working on this site must read this file first and follow it. If something isn't covered here, choose the quieter option.

**Revision 2.** Updated after a review of the structure of [jkrowling.com](https://www.jkrowling.com/). Changes are listed in section 0.2. Everything not listed there is unchanged from revision 1.

---

## 0. Read me first

**Subject:** Official website of Ethiopian author Yismake Worku (ይስማዕከ ወርቁ).
**Audience:** Amharic- and English-speaking readers, book buyers, students, press, event organisers, the Ethiopian diaspora.
**Primary job of the site:** Get a visitor to (1) discover his books, (2) buy or find a book, (3) follow him / join the newsletter.

**Reference:** The structure and feel of [jkrowling.com](https://www.jkrowling.com/): an immersive, image-led author site with an "enter" gateway, a signature wordmark, a minimal top bar, book groups with a picture and a short text each, a short "about" with a print-style portrait, latest news, and a calm footer with practical links. We borrow the *structure and confidence*, never the visuals. Nothing here should look like Harry Potter or like any other author's brand.

**What makes it his:** Ge'ez script (ፊደል) as the hero of the page, a woven *tibeb* (ጥብብ) border taken from traditional Ethiopian cloth, and a palette drawn from the Ethiopian highlands: Abay (Blue Nile) indigo, Meskel gold, cotton white.

> Placeholders in `[BRACKETS]` are to be replaced with real content from the author (book titles, bio, links). Never invent books, awards or quotes.

### 0.1 Where this file lives

| Location | What goes there |
|---|---|
| `/DESIGN.md` (repository root) | This file. One copy only. |
| `/AGENTS.md` or `/CLAUDE.md` (root) | One line: "Read DESIGN.md before any UI work and follow it." Cursor users: same line in `.cursor/rules/design.mdc`. |
| `/src/styles/tokens.css` (or `app/globals.css`) | The `:root` and `[data-surface]` blocks from section 2, copied exactly. |
| `/tailwind.config.js` | The Tailwind snippet from section 12, if Tailwind is used. |
| `/public/fonts` | Only if fonts are self-hosted later; until then the Google Fonts link in section 12 goes in the site `<head>`. |
| `/public/brand/` | `signature.svg` (wordmark), `objects/` (desk objects, section 5.5), favicon. |

When a rule here changes, change this file first, then the code.

### 0.2 What changed in revision 2

| Area | Change | Section |
|---|---|---|
| Entry | Added a first-visit language gateway, modelled on the "enter" screen of the reference | 5.4 |
| Wordmark | Added a handwritten signature wordmark (SVG) for the gateway, top bar and footer | 5.6 |
| Objects | Added optional "desk objects": cut-out photos of real objects at section edges | 5.5, 8 |
| Portrait | The About portrait is now a print-style photo with a thin paper border | 6 |
| Books | Books page groups books into sections (picture, short text, covers) when there is more than one group | 6, 7 |
| Writings | New page for essays, talks and videos in his own words (the reference has "In My Own Words" and "On Writing") | 6, 7, 7A |
| News | Newest post shown as a large headline on the News page; "View all news" on Home | 6, 7 |
| Notice bar | Optional thin bar for announcements such as imposter-account warnings | 6 |
| Footer | Added practical links: privacy, terms, press kit; signature wordmark; rights line | 6 |
| Cookies | Added a consent panel spec, only needed if tracking cookies are used | 6 |
| Color | Added 3 tokens (`--scrim`, `--notice-*`, `--paper`), a surface map, and recalculated contrast figures | 2 |
| Data | `posts` now has a `kind` (`news` or `writing`); `settings` gets notice and gateway switches | 12 |

> Note on method: the review of the reference covered its page structure, content order, navigation, and imagery use. Its exact hex values and font files were not available, so the palette and type here are this project's own and were not sampled from that site.

---

## 1. Design principles

1. **Script is the image.** Amharic is not a translation layer; it's the most beautiful thing on the page. Ge'ez letters are displayed large, and Amharic always appears at least as prominently as English.
2. **One bold moment, everything else calm.** The bold moment is the hero (giant Ge'ez glyph + name). Every other section is quiet, spacious and typographic.
3. **Books first.** Covers are the main imagery. Never crop, tilt, or recolor a cover.
4. **Readable like a book.** Serif text, generous line height, narrow columns. The site should feel like opening a well-made book, not a SaaS landing page.
5. **Ornament carries meaning.** The tibeb pattern appears only where one part of the page hands over to another (section joints, footer). It's never wallpaper.
6. **Bilingual by design, not by afterthought.** Every page works fully in `አማርኛ` and `English`.
7. **A writer's desk, not a brochure.** Real objects and a real signature (section 5.5, 5.6) make the site personal. They stay few, sit at the edges, and never compete with text or covers.

---

## 2. Color

Dark mode is the **default for the gateway, hero and footer**; reading sections sit on light paper. This alternation gives the page the same rhythm as jkrowling.com (immersive → calm → immersive).

| Token | Name | Hex | Use |
|---|---|---|---|
| `--abay` | Abay Indigo | `#1B2A4A` | Hero, footer, dark sections, primary buttons |
| `--abay-deep` | Deep Abay | `#121C33` | Gateway, hover/pressed on dark, overlays |
| `--meskel` | Meskel Gold | `#D9A21B` | Accent: tibeb border, focus ring, key links on dark, glyph highlight, notice bar |
| `--shema` | Shema Cotton | `#F5F3EE` | Light page background |
| `--paper` | Print Paper | `#FFFDF8` | Border of print-style portraits and desk-object shadows' paper edge only |
| `--bun` | Bun Coffee | `#33261E` | Body text on light |
| `--tilet` | Tilet Red | `#A92D2A` | Rare: errors, sale/"new" tag, one thin line in the tibeb |
| `--gojjam` | Gojjam Green | `#2F5D43` | Rare: success states, "available" tag |
| `--mist` | Highland Mist | `#C9CFDB` | Secondary text on dark, borders on dark |
| `--stone` | Stone | `#D9D4C8` | Borders and dividers on light |
| `--scrim` | Abay Scrim | `rgba(18, 28, 51, .72)` | Only over photos so text on them stays readable |
| `--notice-bg` / `--notice-fg` | Notice | `--meskel` / `--abay` | Notice bar only |

### Surface map

Every section is one of these surfaces. Do not mix text colors between surfaces.

| Surface | Background | Text | Secondary text | Lines | Accent |
|---|---|---|---|---|---|
| Gateway | `--abay-deep` | `--shema` | `--mist` | `--mist` at 25% | `--meskel` |
| Hero, footer, newsletter band, slim page headers | `--abay` | `--shema` | `--mist` | `--mist` at 25% | `--meskel` |
| Reading sections | `--shema` | `--bun` | `--bun` at 70% | `--stone` | `--meskel` (2px underline or bar only) |
| Notice bar | `--notice-bg` | `--notice-fg` | `--notice-fg` | none | none |
| Admin content | `--shema` | `--bun` | `--bun` at 70% | `--stone` | `--meskel` |

### Contrast (computed from the hex values; re-verify in a tool before launch)

| Pair | Ratio | Allowed for |
|---|---|---|
| `--bun` on `--shema` | ≈ 13:1 | All text |
| `--shema` on `--abay` | ≈ 12.8:1 | All text |
| `--shema` on `--abay-deep` | ≈ 15:1 | All text |
| `--mist` on `--abay` | ≈ 9:1 | Secondary text |
| `--meskel` on `--abay` | ≈ 6.2:1 | Text 18px and up, links, focus ring |
| `--meskel` on `--abay-deep` | ≈ 7.4:1 | Text 18px and up, links, focus ring |
| `--abay` on `--meskel` | ≈ 6.2:1 | Primary buttons, notice bar |
| `--meskel` on `--shema` | below 3:1 | Decoration only, never text |

**Rules**
- Text on light: `--bun` on `--shema`.
- Text on dark: `--shema` on `--abay` or `--abay-deep`. Secondary text on dark: `--mist`.
- Gold is **never** used for body text on light backgrounds (fails contrast). On light, gold is only for decoration or as a 2px underline.
- Red and green together only appear in tags; never side by side as decoration (avoids flag-cliché).
- No gradients as decoration. One exception: a soft vertical fade of `--abay` over the hero image for text legibility. Text placed over any photo uses `--scrim` behind it.
- `--paper` is used for exactly one thing: the thin border of print-style portraits (section 6, About). Never as a page or card background.

```css
:root {
  --abay: #1B2A4A;
  --abay-deep: #121C33;
  --meskel: #D9A21B;
  --shema: #F5F3EE;
  --paper: #FFFDF8;
  --bun: #33261E;
  --tilet: #A92D2A;
  --gojjam: #2F5D43;
  --mist: #C9CFDB;
  --stone: #D9D4C8;
  --scrim: rgba(18, 28, 51, .72);
  --notice-bg: var(--meskel);
  --notice-fg: var(--abay);

  --bg: var(--shema);
  --fg: var(--bun);
  --fg-muted: rgba(51, 38, 30, .7);
  --line: var(--stone);
}

[data-surface="dark"] {
  --bg: var(--abay);
  --fg: var(--shema);
  --fg-muted: var(--mist);
  --line: rgba(201, 207, 219, .25);
}

[data-surface="gateway"] {
  --bg: var(--abay-deep);
  --fg: var(--shema);
  --fg-muted: var(--mist);
  --line: rgba(201, 207, 219, .25);
}
```

---

## 3. Typography

Typography is where the personality lives. Two families per script, clearly different.

| Role | Amharic (Ge'ez) | Latin |
|---|---|---|
| Display / headings | **Noto Serif Ethiopic** (600–800) | **Libre Caslon Display** |
| Body / long reading | **Noto Serif Ethiopic** (400) | **Newsreader** (400, italic 400) |
| UI (nav, buttons, forms, tags) | **Noto Sans Ethiopic** (500) | **Instrument Sans** (500) |
| Decorative big glyph only | **Abyssinica SIL** | — |

All are on Google Fonts (Abyssinica SIL included). Load with `display=swap`, subset to `ethiopic` and `latin`.

```css
:root {
  --font-display: "Libre Caslon Display", "Noto Serif Ethiopic", Georgia, serif;
  --font-body:    "Newsreader", "Noto Serif Ethiopic", Georgia, serif;
  --font-ui:      "Instrument Sans", "Noto Sans Ethiopic", system-ui, sans-serif;
  --font-glyph:   "Abyssinica SIL", "Noto Serif Ethiopic", serif;
}
```

### Type scale (fluid, ratio ≈ 1.25)

| Token | Size | Line height | Use |
|---|---|---|---|
| `--t-hero` | `clamp(3.5rem, 9vw, 8rem)` | 1.05 | Author name in hero |
| `--t-h1` | `clamp(2.5rem, 5vw, 4rem)` | 1.1 | Page titles, latest post headline on News |
| `--t-h2` | `clamp(1.75rem, 3vw, 2.5rem)` | 1.2 | Section titles |
| `--t-h3` | `1.375rem` | 1.3 | Book titles in cards, news titles |
| `--t-body` | `1.125rem` (18px) | 1.65 (Latin) / **1.85 (Amharic)** | Reading text |
| `--t-small` | `0.9375rem` | 1.5 | Meta, captions |
| `--t-ui` | `0.9375rem` | 1 | Buttons, nav |

### Rules
- **Amharic needs more air.** Ge'ez has tall ascenders and stacked marks; use line-height **≥ 1.8** for Amharic body and **never** letter-spacing on Amharic.
- Body column max width: **64ch** (Latin) / **58ch** (Amharic).
- Sentence case everywhere. **No ALL CAPS labels**, no tracked-out eyebrow above every heading. Dates are written "2 September 2026", never in capitals.
- No single-word accent in headlines (no "one word in gold italic").
- Title of each book is always set in the display face, in its own language; do not translate titles without the author's approval.
- Use `lang="am"` / `lang="en"` on every element that switches language so screen readers and hyphenation behave.
- Numerals: use Western digits in UI and dates; use Ethiopic numerals (፩፪፫) only in decorative contexts.

---

## 4. Layout and grid

- **Container:** max width `1200px`, side padding `clamp(1.25rem, 4vw, 3rem)`. Reading pages use a `720px` column.
- **Grid:** 12 columns desktop, 6 tablet, 4 mobile. Gap `24px`.
- **Spacing scale (8px base):** 4, 8, 12, 16, 24, 32, 48, 72, 112, 160. Vertical section padding: `112px` desktop, `72px` mobile.
- **Alignment:** headings and body **left-aligned**. Only the gateway, the hero name and the newsletter band are centered. Never justify text (Ge'ez justifies poorly).
- **Radius:** `0` on covers and images, `2px` on inputs and buttons. No pill buttons, no rounded-card kit. Things should feel printed, not app-like.
- **Shadows:** none on cards. Book covers, print-style portraits and desk objects get one soft shadow only (`0 24px 40px -24px rgba(0,0,0,.45)`) so they feel like objects.
- **Borders:** 1px `--line`. Borders mean "this is a separate item" (a news row, a form field). Do not add borders just to decorate.

---

## 5. Signature elements

### 5.1 The Fidel hero (the one bold moment)

A huge, cropped Ge'ez glyph sits behind the name. Suggested glyph: **ይ** (the first letter of ይስማዕከ), but confirm with the author; any letter from his name or a key book title can be used.

```
┌────────────────────────────────────────────────────────────┐
│ [notice bar, optional]                                     │
│ ይስማዕከ ወርቁ                     መጽሐፍት  ጽሑፎች  ስለ እኔ  ዜና  አማ|EN │  ← quiet top bar
│                                                            │
│        ╔═══════╗                                           │
│       ║   ይ    ║   ← giant Abyssinica glyph, 70vh,          │
│       ║ (gold  ║     gold at 12% opacity, cropped by        │
│        ╚═══════╝       the left edge, slowly "inked" in     │
│                                                            │
│                    ይስማዕከ ወርቁ     ← --t-hero, Noto Serif  │
│                    Yismake Worku    ← Libre Caslon          │
│                                                            │
│               [ One-line description of his work ]         │
│                                                            │
│           [ Explore the books ]   [ Join the newsletter ]  │
│                                                            │
│▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ tibeb border ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒│
└────────────────────────────────────────────────────────────┘
```

- Background `--abay`. If a good portrait or a photo of Ethiopian landscape/manuscript is available, place it on the right half, desaturated, with a `--abay` fade over its left edge. Otherwise the glyph alone carries the hero.
- **Motion (the only orchestrated one):** on first load the glyph fades from 0 → 12% opacity over 1.4s while the name appears. Nothing else on the page auto-animates. Respect `prefers-reduced-motion` (show final state instantly).
- Name order: Amharic first and larger, English below, in both languages of the UI. In English mode the order stays the same.

### 5.2 Tibeb border

A narrow woven band inspired by the *tibeb* embroidery on the hem of the *netela* and *habesha kemis*. Used **only** at: bottom of hero, top of footer, and as the divider above the newsletter band. Height 16px.

```html
<div class="tibeb" role="presentation" aria-hidden="true"></div>
```

```css
.tibeb {
  height: 16px;
  background-color: transparent;
  background-repeat: repeat-x;
  background-size: 32px 16px;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='16' viewBox='0 0 32 16'%3E%3Cpath d='M0 .75h32M0 15.25h32' stroke='%23D9A21B' stroke-width='1.5' fill='none'/%3E%3Cpath d='M16 2.5l7 5.5-7 5.5-7-5.5z' fill='none' stroke='%23D9A21B' stroke-width='1.5'/%3E%3Ccircle cx='16' cy='8' r='1.6' fill='%23A92D2A'/%3E%3Ccircle cx='0' cy='8' r='1.2' fill='%23D9A21B'/%3E%3Ccircle cx='32' cy='8' r='1.2' fill='%23D9A21B'/%3E%3C/svg%3E");
}
```

Gold diamond chain with a single small red dot in each diamond. Do not recolor further, do not stretch, do not use it more than three times on the site.

### 5.3 Ink-line link style

Text links on light backgrounds get a 2px `--meskel` underline offset `4px`. On hover the underline thickens to 3px. No color change, no arrows on links.

### 5.4 The gateway (first visit only)

The reference opens with a full-screen "enter" choice. Ours is a **language gateway**: the first thing a new visitor sees, before the hero.

```
┌────────────────────────────────────────────────────────────┐
│                                                            │
│                     [ signature wordmark ]                 │
│                                                            │
│                 እንኳን ደህና መጡ  [AMHARIC: confirm]           │
│                 Welcome                                    │
│                                                            │
│        አማርኛ                          English              │
│   (one line in Amharic)          (one line in English)     │
│                                                            │
│                          Skip                              │
└────────────────────────────────────────────────────────────┘
```

- Surface: `data-surface="gateway"` (`--abay-deep`), full viewport, everything centered. Signature in `--shema`. The two language names are large text links in the display face (`--t-h1`), with the ink-line underline in gold on hover and focus. No buttons, no images.
- Choosing a language sets the URL prefix (`/am` or `/en`), stores the choice in `localStorage`, and closes the gateway. It is never shown again on that device.
- "Skip" (text link, `--mist`) closes it and uses the browser language (Amharic if `am`, otherwise English).
- **Not a separate page.** The gateway is a layer over the real home page, so search engines and deep links see normal content. It appears only on `/` with no stored choice; it never appears on `/am/*`, `/en/*`, `/books/*` or any direct link to an inner page.
- Escape key closes it. Focus moves into it when it opens and returns to the top bar when it closes. Keyboard and screen readers must be able to pass it in one or two key presses.
- Motion: the gateway fades out in 200ms. With `prefers-reduced-motion` it disappears instantly.
- It can be switched off in Admin → Settings ("Show language gateway"). Default: on.
- Amharic greeting text must be confirmed by a native speaker before launch.

### 5.5 Desk objects (optional, sparing)

The reference scatters cut-out photos of objects (notebooks, photographs, keepsakes) in the margins, which makes the site feel like a writer's desk. We keep the idea and keep it quiet.

- **Content:** real objects from the author's world, photographed by or with him: a pen, a notebook, a manuscript page, a *jebena* (coffee pot), reading glasses, a piece of *netela* cloth. No stock photos, no invented props, no flag imagery.
- **Format:** transparent-background WebP, max 480px wide, decorative (`alt=""`, `aria-hidden="true"`), stored in `/public/brand/objects/`.
- **Placement:** in the outer margin of a reading section, partly overlapping the section edge; never over text, covers, forms or buttons.
- **Limits:** at most **3 on the Home page**, at most 1 on any other page, none in the admin, none on the Contact page. Hidden below 768px wide.
- **Treatment:** the standard object shadow from section 4, rotation of at most 4° (covers are never rotated), no hover effect, no parallax, no animation.
- If the author has no suitable photos yet, ship without them. The site works fully without desk objects.

### 5.6 Signature wordmark

A handwritten signature of the author, supplied as a single-color SVG (`/public/brand/signature.svg`, uses `currentColor`).

- Used in three places only: the gateway, the footer, and the top bar on scroll (replacing the plain Amharic wordmark text at a height of 28px).
- In the top bar before scrolling, and everywhere else, the name is live text in the display face.
- If no signature exists, use the Amharic name in `--font-display`. See open question 3.
- Always include a text alternative: `aria-label="Yismake Worku"` on the link.

---

## 6. Components

### Notice bar (optional)
- Height 40px, full width above the top bar, `--notice-bg` with `--notice-fg` text, `--font-ui` at `--t-small`. One sentence and one text link ("How to check a message is from him" or similar), plus a "Close" text button.
- For important, factual notices only, such as a warning about imposter accounts using the author's name. Not for marketing, and never for launch hype.
- Off by default. Text in Amharic and English is edited in Admin → Settings. Closing it is remembered per message on that device, and it returns if the message text changes.
- Not sticky: it scrolls away with the page; the top bar stays.

### Top bar
- Height 72px. Transparent over hero, turns solid `--abay` after scroll (no blur, no shrink animation).
- Left: author's name wordmark in Amharic (`--font-display`, 1.25rem), or the signature once scrolled (section 5.6). Right: `መጽሐፍት / Books`, `ጽሑፎች / Writings`, `ስለ እኔ / About`, `ዜና / News`, `ግንኙነት / Contact`, language switch.
- Language switch: two text buttons `አማ` `EN`, the active one has a gold underline. Persist choice in `localStorage` and in the URL (`/am/...`, `/en/...`).
- Mobile: a "Menu / ምናሌ" text button opens a full-screen `--abay` sheet with large serif links. No hamburger icon alone.

### Buttons
| Type | Style |
|---|---|
| Primary | `--meskel` background, `--abay` text, 2px radius, padding `14px 28px`, `--font-ui` 500. Hover: `#E4B13A`. |
| Secondary (on dark) | 1px `--mist` border, `--shema` text. Hover: border `--meskel`. |
| Secondary (on light) | 1px `--bun` border, `--bun` text. Hover: background `--bun`, text `--shema`. |
| Text link | See 5.3. |

Labels say exactly what happens: "Buy this book", "Read an excerpt", "Join the newsletter", "View all news". No "Submit", no "Learn more", no bare "Read more".

### Book card (catalogue grid)
```
┌──────────┐
│          │   cover (aspect 2:3, no radius, soft object shadow)
│  COVER   │
│          │
└──────────┘
Book title         ← --t-h3, display face, in book's language
Year · Genre       ← --t-small, secondary color (plain text, no tags)
```
- Grid: 4 columns desktop, 3 tablet, 2 mobile.
- Hover: cover lifts `4px` (transform only). Focus: 2px gold outline, 4px offset.
- Whole card is one link.

### Book group section (Books page)
Used when the catalogue has two or more groups (a series, or a kind such as novels and essays). Each group is a section:
```
Group title (--t-h2)                 ┌──────────────┐
Short text, 3 to 5 sentences         │  one picture │  ← optional: lead cover
(reading column, 64ch / 58ch)        └──────────────┘
[ See the books in this group ]
Row of book cards for this group
```
- Text left (7 cols), picture right (5 cols). Alternate sides for consecutive groups.
- The picture is a cover, a photo of the book as an object, or nothing. No stock imagery.
- Group text is written by the author or approved by him; never invented.
- With only one group, use the flat grid with filters (see Books page).

### Featured book (home page)
Two-column: cover left (5 cols), text right (7 cols): title, 2-line blurb, **Read an excerpt** (primary) and **Where to buy** (secondary). Background `--shema`. If there are several featured books, show a horizontal scroll-snap row of covers instead of an auto-play carousel.

### Book detail page
Order: cover + title + buy buttons → synopsis (reading column) → excerpt (collapsible, "Read the first pages") → reviews/quotes (only real ones) → details (publisher, year, pages, ISBN) → "Also by Yismake Worku".
Buy buttons list retailers as plain text buttons (e.g. `[RETAILER]`), including local Ethiopian sellers and international ones.

### About section (home) and About page
Portrait left (4 cols), bio right in a 64ch column. Start with a first-person-feeling, plain paragraph, not a list of achievements.
- **Portrait treatment (changed):** a print-style photo: natural color, a thin `--paper` border (10px on the sides and top, 32px at the bottom), the standard object shadow, radius 0. On the Home page it may be rotated at most 2°; on the About page it is straight. Use the same treatment for every portrait on the site.
- Pull one real quote from the author in `--font-display` at `--t-h2`, set in `--abay` on light with a 2px gold bar on the left (this is the only place a side-bar is used).

### News / journal
List, not cards. Each row: date (small, secondary, "2 September 2026") · title (display face) · one-line summary, separated by 1px `--stone` lines. Hover: title gets the ink-line underline. Single post page uses the 720px reading column.
- **Latest headline (News page):** the newest post is shown first as a large headline in `--t-h1` with its summary and a "Read the post" text link, above the list. No image slider, no auto-rotation.
- **Home page:** the latest 3 rows, then a "View all news" text link.

### Writings (essays, talks, videos)
For the author's own words: essays, interviews, talks, reflections, and links to videos. Same row pattern as News, with the kind shown as plain text in the meta line ("Essay", "Talk", "Video"). Videos are links or click-to-load embeds; never autoplay, and never load a video player until the visitor asks (bandwidth).

### Newsletter band
Full-width `--abay`, preceded by the tibeb border. Centered. Headline in Amharic + English, one email field and one button, one sentence about frequency ("One email when a new book or event is announced"). Success message: "You're on the list. Check your email to confirm." Error: say what's wrong and how to fix it.

### Contact form
Used on the Contact page only. Fields: name, email, topic (select: General, Press, Rights and translation, Events and invitations), message. One primary button: "Send message". Success: "Thank you. Your message was sent." Errors name the field and the fix. Include a hidden honeypot field against spam; no CAPTCHA puzzles unless spam becomes a problem.
- The Contact page also offers the **press kit** as a plain "Download the press kit (PDF)" text link: short bio, portrait, covers, contact. Uploaded in Admin → Settings.

### Footer
`--abay`, tibeb border on top. Four groups:
1. **Site links:** Books, Writings, About, News, Contact.
2. **Social links** (plain text: Facebook, Telegram, Instagram, YouTube, X: only ones he really uses).
3. **Contact / press email** and the press kit link.
4. **Practical links** (small, `--mist`): Privacy and cookies · Terms of use.

Above the bottom line: the signature wordmark (section 5.6). Bottom line: © year Yismake Worku, plus one rights line ("Book rights belong to the author and his publishers" or the publisher's exact wording). Language switch repeated. If the notice bar is active, repeat its message in one line here with the same link.

### Privacy and cookie consent
- Preferred: use privacy-friendly analytics that set no cookies, and show **no** consent panel.
- If tracking or third-party cookies are used: a compact panel at the bottom left (max 420px wide, `--abay-deep`, `--shema` text), two equal buttons "Accept" and "Reject", and a text link "Choose what to allow". Rejecting is as easy as accepting. The choice is remembered, and the panel never covers the top bar or blocks reading.
- `/privacy` and `/terms` are plain reading pages on the 720px column, linked from the footer only.

### Forms
Label above field, 1px border `--bun` (light) or `--mist` (dark), 2px radius, 48px height, focus = 2px `--meskel` outline. Error text in `--tilet` plus an icon-free sentence; never color alone.

---

## 7. Page map

The site has **six public pages, two legal pages, and one admin page**. Nothing else. Do not add pages (events, shop, blog categories) without updating this file.

```
/                 Home (language gateway layer on first visit)
/books            Books (catalogue; each book opens its own detail view)
/books/[slug]     Book detail (part of Books, not a separate page in the nav)
/writings         Writings (essays, talks, videos; each item opens its own reading view)
/writings/[slug]  Writing (part of Writings)
/about            About
/news             News (list; each post opens its own reading view)
/news/[slug]      Post (part of News)
/contact          Contact
/privacy          Privacy and cookies (footer link only)
/terms            Terms of use (footer link only)
/admin            Admin (private, not in the nav, noindex)
/am/*  /en/*      Language prefixes for the public pages
```

Top bar navigation: **Books · Writings · About · News · Contact** (the wordmark links Home). Admin is never linked publicly.

### Home page order (top to bottom)
0. **Gateway:** first visit only, a layer over the page (section 5.4).
1. **Hero:** Fidel glyph, name, one-line, two buttons, tibeb border.
2. **Latest book:** featured book block (light).
3. **All books:** row of 4–6 covers + "See all books".
4. **About:** print-style portrait + short bio + quote.
5. **Writings:** one latest item as a single row + "View all writings" (hide if there are none).
6. **News:** latest 3 rows + "View all news".
7. **Newsletter band:** dark, with tibeb divider.
8. **Footer.**

Alternate surfaces: dark → light → light → light → light → light → dark → dark. The hero and newsletter band are the only two full dark sections besides the footer. Desk objects (section 5.5) may appear at the edges of sections 2, 4 and 5, three at most.

### Books page
```
┌──────────────────────────────────────────────┐
│ መጽሐፍት / Books                   (dark slim  │
│ One sentence about the collection   header,   │
│                                     no glyph) │
├──────────────────────────────────────────────┤
│ Two or more groups: group sections (see      │
│ "Book group section"), newest group first.   │
│                                              │
│ One group only: filter row + flat grid.      │
│ Filter: All · Novels · Essays · ...  (text)  │
│ ┌────┐ ┌────┐ ┌────┐ ┌────┐                  │
│ │    │ │    │ │    │ │    │   book cards     │
│ └────┘ └────┘ └────┘ └────┘                  │
└──────────────────────────────────────────────┘
```
- Slim dark page header (200px) with the page title, then light catalogue.
- Filters are plain text buttons with a gold underline on the active one. Maximum one row; if there are fewer than 6 books, hide filters.
- Newest book first. The newest book may be shown larger (spanning two columns) only if it has a real cover.
- Book detail follows the "Book detail page" component order above.

### Writings page
- Slim dark header with the title, then a light list (date · title · kind and one-line summary), 10 per page with "Older writings" at the bottom.
- Writing page: 720px reading column, date, title, optional cover image, body (or video link), then "Back to writings" as a text link.
- Each item has Amharic and English versions; if only one exists, show it and a small note in the other language.

### About page
- Slim dark header with title, then light reading layout: portrait (4 cols) and bio (64ch column).
- Sections in order: short bio, the author's own quote, "His books" (row of covers), and press/rights line linking to Contact.
- No timeline, no achievements grid. Write it as prose.

### News page
- Slim dark header, then the latest headline (section 6, News), then the news list (date · title · summary), 10 per page with "Older news" at the bottom instead of infinite scroll.
- Post page: 720px reading column, date, title, optional cover image, body, then "Back to news" as a text link.
- Each post has Amharic and English versions; if only one exists, show it and a small note in the other language.

### Contact page
- Slim dark header, then two columns on desktop: the contact form (7 cols) and direct details (5 cols): publisher or agent email for press and rights, one general email, the press kit link, and social links. Stack on mobile with the form first.
- No map, no phone number unless the author wants one public.
- Newsletter sign-up is **not** repeated here; the footer band covers it on all pages.

---

## 7A. Admin page (`/admin`)

**Who uses it:** the author or one or two editors, often on a phone. **Job:** add and edit books, news and writings, update the About text, read messages, and see subscribers, without touching code.

**Visual approach:** same tokens and fonts as the public site, but calmer and more functional. No hero glyph, no gateway, no desk objects, no tibeb (except one tibeb strip above the login form), no animation. The admin is English by default with an `አማ / EN` switch for the interface.

### Access and security
- `/admin` shows a login screen when signed out. Email + password, optional one-time code. Failed-login rate limiting, secure session cookies, CSRF protection.
- `noindex, nofollow` meta and `robots.txt` disallow. Not linked anywhere on the public site.
- Session times out after inactivity with a clear message and keeps unsaved drafts locally.

### Layout
```
┌───────────┬───────────────────────────────────────┐
│ Wordmark  │  Page title                [Primary btn]│
│           ├───────────────────────────────────────┤
│ Books     │                                       │
│ News      │   table / form / message list         │
│ Writings  │                                       │
│ About     │                                       │
│ Messages  │                                       │
│ Subscribers                                       │
│ Settings  │                                       │
│           │                                       │
│ [Sign out]│                                       │
└───────────┴───────────────────────────────────────┘
```
- Sidebar: `--abay` background, 240px, text `--shema`, active item has a 3px `--meskel` bar on the left. On mobile it becomes a full-screen menu opened by a "Menu" text button.
- Content area: `--shema` background, max width 960px.
- Top of each screen: title on the left, **one** primary action on the right ("Add book", "Write post", "Add writing").

### Sections
| Section | What it does |
|---|---|
| **Books** | Table of books (cover thumbnail, title, year, group, status). "Add book" opens the book form. The group field is free text with suggestions from existing groups. |
| **News** | Table of posts (title, date, status). "Write post" opens the post form. |
| **Writings** | Table of writings (title, kind, date, status). "Add writing" opens the writing form. |
| **About** | One form: bio (AM + EN), portrait upload, quote (AM + EN). |
| **Messages** | Inbox from the Contact form: newest first, unread marked with a gold dot, topic shown as plain text, "Mark as read" and "Delete". |
| **Subscribers** | Table of newsletter emails with signup date and a single "Export as CSV" button. |
| **Settings** | Site name, hero one-liner (AM + EN), social links, contact emails, buy-link retailers, press kit upload (PDF), notice bar (on/off, text AM + EN, link), "Show language gateway" switch. |

### Forms (book, post and writing)
- **Bilingual fields use tabs**: `አማርኛ | English`. A tab that has missing required content shows a small red dot (and the text "Missing" for screen readers).
- Book form fields: title (AM, EN), cover upload, group, synopsis, excerpt, year, genre, publisher, pages, ISBN, buy links (repeatable: retailer name + URL), status.
- Post form fields: title (AM, EN), date, cover image (optional), body, status.
- Writing form fields: title (AM, EN), kind (Essay, Talk, Interview, Video), date, cover image (optional), body, video link (optional), status.
- **Cover upload:** accepts JPG/PNG/WebP up to 5 MB, shows a 2:3 preview, warns (does not block) if the ratio is off, and converts to WebP with the three sizes in section 8.
- **Rich text:** a simple editor with only bold, italic, link, heading, quote and list. No font or color controls, so the public site's typography cannot be broken.
- **Status:** `Draft` (gray tag) or `Published` (green tag, `--gojjam`). Buttons: "Save draft" (secondary), "Publish" (primary), and "View on site" once published. The success message repeats the action: "Published."
- Drafts autosave every 30 seconds and show "Saved at 14:32" in small text.
- Delete always asks for confirmation with the item's name: "Delete 'Book title'? This can't be undone."

### Tables
- 1px `--stone` row dividers, no zebra stripes, row height 64px, title in `--font-body`, meta in `--font-ui`.
- Search field above the table, sorting by clicking column headings.
- On mobile, tables turn into stacked rows (title first, then meta on a second line).

### Empty and error states
- Empty: say what to do. "No books yet. Add your first book to show it on the Books page."
- Error: say what failed and how to fix it. "The cover couldn't be uploaded because the file is larger than 5 MB. Choose a smaller image."

### Admin acceptance checklist
- [ ] Can log in and out on phone and desktop.
- [ ] Can add a book with both languages and publish it; it appears on Books and Home.
- [ ] Can write, edit and unpublish a news post.
- [ ] Can add, edit and unpublish a writing; it appears on Writings.
- [ ] Contact form messages arrive in Messages.
- [ ] Newsletter sign-ups arrive in Subscribers and export as CSV.
- [ ] Notice bar and language gateway can be switched on and off in Settings.
- [ ] Public pages never show drafts.

---

## 8. Imagery

- Covers: original files only, exported as WebP, `srcset` at 300 / 600 / 900 px wide, `aspect-ratio: 2/3`.
- Portraits: natural, unposed where possible; consistent print-style treatment across the site (all color or all black-and-white, always with the same `--paper` border).
- Desk objects: transparent WebP cut-outs of real objects, rules in section 5.5.
- Atmosphere images (optional): Ethiopian manuscripts, parchment, coffee ceremony objects, highland light. Desaturate and tint toward `--abay`. No stock "African sunset" imagery, no generic safari or flag imagery.
- Text over any photo sits on `--scrim`.
- Every image has a meaningful `alt` in the page language; decorative images (desk objects, atmosphere) have `alt=""`.

---

## 9. Motion

- One orchestrated moment: hero glyph reveal (5.1). The gateway's 200ms fade-out (5.4) is the only other entrance motion.
- Interaction motion only: hover lift on covers (150ms ease-out, `transform` only), menu open/close (200ms), accordion excerpt expand.
- **Do not** add fade-and-slide-up to every section, parallax, or hover animation on every card. Desk objects never animate.
- `@media (prefers-reduced-motion: reduce)` disables all of the above.

---

## 10. Accessibility and quality floor

- WCAG AA contrast minimum, verified for gold on `--abay` (≈ 6.2:1, OK for text ≥ 18px) and the pairs in section 2.
- Visible focus on everything interactive: `outline: 2px solid var(--meskel); outline-offset: 4px;`.
- Full keyboard navigation; skip-to-content link (first focusable element, before the notice bar and gateway).
- Tap targets ≥ 44×44px.
- Semantic landmarks (`header`, `nav`, `main`, `footer`), one `h1` per page.
- The gateway is dismissible by keyboard (Escape and "Skip"), announces itself to screen readers as a dialog with a label, and returns focus when closed.
- Responsive from 360px wide. Test Amharic at 200% zoom: no clipped ascenders.
- Performance: fonts preloaded for the two display faces only; hero glyph is live text (no image); LCP under 2.5s on a mid-range phone and a slow connection (many visitors will be on limited bandwidth). Desk objects load lazily and are not shipped to screens under 768px.
- Works well with limited data: no autoplaying video, no video players loaded until asked, no heavy libraries for simple effects.

---

## 11. Voice and copy

- Plain, warm, literate. The author's own voice where possible.
- Active voice; buttons describe the action ("Buy this book", "Join the newsletter", "View all news").
- Keep one name for each thing: a *book* is always "Book / መጽሐፍ" (never "title" or "product"), the email list is always "newsletter / ዜና መጽሔት"\*, and his essays, talks and videos are always "writings / ጽሑፎች"\*.
- Empty states tell you what to do: "No events are scheduled yet. Join the newsletter and we'll tell you when there's one."
- Notices are factual and short; they say what is happening and what to do.
- Amharic copy must be written or reviewed by a native speaker. Do not machine-translate.

\* Confirm preferred Amharic terms with the author.

---

## 12. Tech implementation notes

- Framework-agnostic; tokens below work with plain CSS, Next.js, Astro, or Tailwind.
- i18n: route-based (`/am`, `/en`), `hreflang` tags for both. The gateway sets the route and a `localStorage` key (`lang`); it never changes what search engines see at `/`.
- Content is managed through the `/admin` page (section 7A) and stored in a database; each content item has `title_am`, `title_en`, `body_am`, `body_en`, `status` (`draft` or `published`). Public pages only read `published` items.
- Suggested data collections: `books`, `posts`, `about`, `messages`, `subscribers`, `settings`, `users`.
- `books` has a `group` text field. `posts` has a `kind` field: `news` or `writing` (and for writings a `writing_kind`: essay, talk, interview, video, plus an optional `video_url`). `/news` reads `kind = news`; `/writings` reads `kind = writing`.
- `settings` includes: `notice_enabled`, `notice_am`, `notice_en`, `notice_link`, `gateway_enabled`, `press_kit_url`.
- SEO: Open Graph image per book (cover on `--abay`), `Book` and `Person` schema.org JSON-LD.

### Tailwind theme snippet

```js
// tailwind.config.js
export default {
  theme: {
    extend: {
      colors: {
        abay: { DEFAULT: "#1B2A4A", deep: "#121C33" },
        meskel: "#D9A21B",
        shema: "#F5F3EE",
        paper: "#FFFDF8",
        bun: "#33261E",
        tilet: "#A92D2A",
        gojjam: "#2F5D43",
        mist: "#C9CFDB",
        stone: "#D9D4C8",
        scrim: "rgba(18, 28, 51, 0.72)",
      },
      fontFamily: {
        display: ['"Libre Caslon Display"', '"Noto Serif Ethiopic"', "Georgia", "serif"],
        body: ["Newsreader", '"Noto Serif Ethiopic"', "Georgia", "serif"],
        ui: ['"Instrument Sans"', '"Noto Sans Ethiopic"', "system-ui", "sans-serif"],
        glyph: ['"Abyssinica SIL"', '"Noto Serif Ethiopic"', "serif"],
      },
      borderRadius: { DEFAULT: "2px" },
      maxWidth: { read: "64ch", container: "1200px" },
      boxShadow: { object: "0 24px 40px -24px rgba(0,0,0,.45)" },
    },
  },
};
```

### Google Fonts link

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Abyssinica+SIL&family=Instrument+Sans:wght@500;600&family=Libre+Caslon+Display&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,600;1,6..72,400&family=Noto+Sans+Ethiopic:wght@500;600&family=Noto+Serif+Ethiopic:wght@400;600;800&display=swap" rel="stylesheet">
```

---

## 13. Do / Don't

| Do | Don't |
|---|---|
| Show Ge'ez large and proud | Treat Amharic as small subtitle text |
| Let covers be the imagery | Crop, rotate or recolor covers |
| Use the tibeb at most 3 times | Tile tibeb as wallpaper or put it on every card |
| Left-align reading text | Justify or center paragraphs |
| Alternate dark and light sections | Make the whole site dark or add gradient washes |
| One hero animation | Fade-up every section, autoplay carousels |
| Write real copy with the author | Use lorem ipsum, fake reviews or invented books |
| Use sentence case and "2 September 2026" dates | Use ALL CAPS eyebrows or dates, `01 / 02 / 03` numbering, `→` on links |
| Use flag colors sparingly (gold dominant, red as a dot) | Use green-yellow-red stripes as decoration |
| Use a few real desk objects at the edges (max 3 on Home) | Scatter stock props, cover text with objects, or show them on mobile |
| Show the gateway once, skippable, over real content | Make a separate splash page, or show it on every visit |
| Keep notices factual and dismissible | Use the notice bar for promotion |
| Give Accept and Reject equal weight in consent | Hide the reject option |

---

## 14. Cleanup checklist for the current messy UI

Work through in this order; each step should visibly improve the site.

1. [ ] Replace all colors with the tokens in section 2; delete any color not in the table.
2. [ ] Install the fonts in section 3; set body to `--t-body` with Amharic line-height 1.85.
3. [ ] Reduce to one container width and the spacing scale in section 4.
4. [ ] Rebuild the top bar, hero and footer first (they define the feel).
5. [ ] Replace all cards with the book card and news row patterns.
6. [ ] Remove shadows, gradients, and rounded corners that aren't specified.
7. [ ] Add the language switch and `lang` attributes.
8. [ ] Build the language gateway (5.4) and the signature wordmark (5.6), or the text fallback.
9. [ ] Build the Books, Writings, About, News and Contact pages with the slim dark header pattern from section 7.
10. [ ] Add the footer practical links, `/privacy` and `/terms`, and the consent panel if tracking cookies are used.
11. [ ] Add the notice bar and desk objects only if the author supplies real content for them.
12. [ ] Build `/admin` last (section 7A), reusing the same tokens, buttons and form styles.
13. [ ] Check contrast, focus states and mobile at 360px on every page, including admin and the gateway.
14. [ ] Replace placeholder copy and images with real content from the author.

---

## 15. Open questions for the author

These decide the last 10% of the design; the system above works with placeholders until answered.

1. Which Ge'ez letter or word should be the hero glyph? (ይ is the default.)
2. Does he prefer a serious/literary, warm, or playful tone? (The system is tuned for **literary and warm**.)
3. Does he have a signature, handwriting sample or favorite manuscript style we could use as the wordmark? (A signature file unlocks section 5.6.)
4. Book covers, portraits and real links to purchase (local and international).
5. Which social platforms does he actually use?
6. Preferred Amharic wording for navigation labels, the gateway greeting and "Writings" (sections 5.4, 6 and 11).
7. Who will log in to the admin (only him, or also an editor or assistant)?
8. Where should contact-form messages go (admin inbox only, or also his email)?
9. Which tool sends the newsletter (Mailchimp, Brevo, or the site itself)? This decides whether Subscribers is a list or a sync.
10. Does he want the language gateway, or should visitors go straight to the hero?
11. Which real objects from his desk or home could be photographed as cut-outs (pen, notebook, *jebena*, manuscript page)? Are there any he would prefer not to show?
12. Are there imposter accounts or scam messages using his name? If yes, the notice bar (section 6) should be on from launch.
13. Are his books grouped by series or kind (for example novels and essays)? This decides whether the Books page shows group sections or one grid.
14. Will he publish essays, talks or videos? If not, the Writings page and nav item are removed.