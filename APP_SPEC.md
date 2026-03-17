# Ask Artemis — PWA App Specification

## Overview
Build a mobile-first Progressive Web App (PWA) called "Ask Artemis" — a physician-crafted patient guide for health, wellness, and aesthetic care by Dr. Tom McCann at Artemis Modern Aesthetics in Medford, NJ.

The app lives at `/artemis-chatbot-demo/app.html` (single HTML file with inline CSS and JS). It must NOT modify any existing files (index.html, chat.html, artemis-widget.js).

## Brand
- **Navy**: #1B2A4A (primary dark, headers, backgrounds)
- **Navy Light**: #2A3D66
- **Gold**: #C4A265 (accents, CTAs)
- **Gold Light**: #D4B87A
- **Gold Bright**: #D4A943 (from logo)
- **White**: #FFFFFF
- **Font**: Inter (already loaded via Google Fonts)
- **Logo images**: `logo-text.jpeg` (crescent moon + text), `logo-full.jpeg` (Artemis figure + text)
- Use `logo-text.jpeg` as the header logo in the app (it's the cleaner mark)

## Architecture
Single HTML file (`app.html`) with:
- Inline CSS in `<style>` tag
- Inline JS in `<script>` tag
- The chatbot engine JS is in `chatbot-engine.js` — copy its FULL contents into the app's `<script>` tag
- The chatbot CSS is in `chatbot-styles.css` — copy the relevant chat styles (everything from `.chat-header` onward, NOT the landing page styles or `.chat-toggle`/`.chat-window` positioning — those will be overridden)

## Layout: Bottom Tab Bar App Shell

### Tab Bar (fixed at bottom)
4 tabs with icons and labels:
1. **Chat** (💬 speech bubble icon) — The Ask Artemis chatbot
2. **Guides** (📖 book icon) — Skincare & wellness guides
3. **Shop** (🛒 bag icon) — Links to product shops
4. **About** (ℹ️ info icon) — Dr. McCann & Artemis info

Use simple SVG icons, not emoji. The active tab should use gold (#C4A265), inactive tabs use gray (#9CA3AF). Tab bar background: white with subtle top border.

Safe area padding: `padding-bottom: max(12px, env(safe-area-inset-bottom))` on the tab bar.

### App Header (fixed at top)
- Navy background (#1B2A4A)
- Shows `logo-text.jpeg` (height ~32px, auto width) on the left
- "Ask Artemis" text on the right of the logo
- Safe area padding: `padding-top: max(12px, env(safe-area-inset-top))`

### Content Area
- Scrollable area between header and tab bar
- Each tab has its own content div, shown/hidden via JS (no routing framework)
- Tab switching should be instant (display: none/block)

---

## Tab 1: Chat

This integrates the FULL existing chatbot. 

### Key requirements:
1. Copy ALL the JS from `chatbot-engine.js` into the script tag
2. The chat UI (messages area, input bar) fills the content area between header and tab bar
3. The chatbot needs these DOM elements with these exact IDs:
   - `#chatMessages` — the scrollable messages container
   - `#chatInput` — the text input
   - `#chatSend` — the send button
   - `#chatWindow` — the chat window container (just use the content area div)
   - `#chatToggle` — can be a hidden dummy element
   - `#chatClose` — can be a hidden dummy element
4. On first switch to Chat tab, initialize the chatbot and auto-trigger the welcome flow
5. The chat should KEEP STATE when switching tabs (don't destroy/recreate)
6. Copy the chat-specific CSS from `chatbot-styles.css` — you need all the `.msg-*`, `.quick-reply*`, `.product-card`, `.chat-product-*`, `.chat-input*`, `.chat-send`, `.chat-disclaimer`, `.typing-*`, and `.status-dot` styles
7. Override `.chat-window` to NOT be fixed/positioned — it should flow naturally in the tab content area
8. The chat input area should be fixed at the bottom of the chat tab (above the tab bar), not scrolling with messages

### Chat-specific constants (already in chatbot-engine.js):
```
SHOP_URL = 'https://partners.pcaskin.com/artemis-medspa'
DISPENSARY_URL = 'https://patientdirect.pureencapsulationspro.com/patients/sign_up?practice_code=975630'
CONTACT_URL = 'https://www.artemis-medspa.com/contact'
HEALTHPASS_URL = 'https://www.tryhealthpass.com/pages/pricing?referrer=dbb9b2f6-819b-4577-b32a-12ad4ecc0349'
```

---

## Tab 2: Guides

A scrollable content library organized into cards/sections. This is physician-curated educational content.

### Sections:

#### Skincare Routines
Cards for each skin concern linking to guidance:
- **Acne & Breakouts** — Gentle cleansing, targeted actives (BPO, salicylic acid), hydration, SPF. Avoid over-stripping.
- **Dark Spots & Discoloration** — Vitamin C serum, gentle exfoliants, retinol at night, broad-spectrum SPF daily. Patience is key.
- **Redness & Sensitivity** — Fragrance-free, barrier repair, calming ingredients (niacinamide, centella), mineral SPF.
- **Fine Lines & Aging** — Retinol, peptides, antioxidant serums, hydration, SPF. Consistency beats intensity.
- **Dryness & Dehydration** — Hyaluronic acid, ceramides, gentle cleanser, rich moisturizer, avoid hot water.
- **Neck & Décolleté** — Same quality care as face — retinol, peptides, SPF. Often neglected.

Each card expands to show the guidance text + a CTA button: "Shop physician-selected products" → links to the PCA Skin shop (https://partners.pcaskin.com/artemis-medspa)

#### Wellness & Supplements
- **Body Composition & Muscle** — Creatine, protein, omega-3s support lean mass and recovery
- **Weight Management & Metabolism** — Berberine, fiber, green tea extract, chromium — support metabolic health
- **Longevity & Cellular Health** — NAD+/NMN, resveratrol, CoQ10 — support cellular energy and healthy aging
- **General Wellness** — Vitamin D, magnesium, omega-3, probiotic — foundational daily support

Each wellness card has a CTA: "Browse physician-grade supplements" → links to Pure Encapsulations (https://patientdirect.pureencapsulationspro.com/patients/sign_up?practice_code=975630)

#### HealthPass Section
A featured card at the top or bottom:
- "HealthPass 3D Body Scan" — Styku 3D body scanner captures 100+ measurements, estimates risk for 20+ diseases. Available alongside Physique Labs.
- Two CTAs: "Learn More" → https://www.artemis-medspa.com/healthpass-by-styku AND "Order a Scan" → https://www.tryhealthpass.com/pages/pricing?referrer=dbb9b2f6-819b-4577-b32a-12ad4ecc0349

### Design:
- Use card-based layout with navy headers and gold accents
- Cards should be expandable (tap to reveal content) or link to expanded detail
- Clean, medical-professional aesthetic — not flashy

---

## Tab 3: Shop

Three main sections as large, tappable cards with descriptions:

### 1. PCA Skin — Professional Skincare
- "Physician-selected professional skincare, customized for your needs. PCA Skin's clinical-grade formulations are only available through licensed providers."
- Card image/icon: skincare/face icon
- Links to: https://partners.pcaskin.com/artemis-medspa
- Gold CTA button: "Shop Skincare"

### 2. Pure Encapsulations — Supplements
- "Physician-grade supplements backed by clinical research. Pure Encapsulations is the #1 most trusted brand in the integrative health community."
- Card image/icon: supplement/pill icon
- Links to: https://patientdirect.pureencapsulationspro.com/patients/sign_up?practice_code=975630
- Gold CTA button: "Shop Supplements"

### 3. HealthPass by Styku — 3D Body Scan
- "Preventative 3D body scan that captures 100+ body measurements and estimates your risk for 20+ chronic diseases. Physician-interpreted results."
- Card image/icon: body/scan icon
- Two buttons: "Learn More" → https://www.artemis-medspa.com/healthpass-by-styku AND "Order a Scan" → https://www.tryhealthpass.com/pages/pricing?referrer=dbb9b2f6-819b-4577-b32a-12ad4ecc0349

### Design:
- Large, visually distinct cards
- Each card should have a subtle navy gradient or border
- Gold CTA buttons
- Add a small note at bottom: "All products are physician-selected by Dr. McCann"

---

## Tab 4: About

### Dr. McCann Section
- Heading: "Dr. Tom McCann"
- Subtitle: "Board-Certified Radiologist · Aesthetic Medicine"
- Bio: "Dr. McCann brings a radiologist's precision to aesthetic medicine. With advanced training in body composition analysis, clinical skincare, and preventative health, he offers a physician-first approach to looking and feeling your best. Artemis Modern Aesthetics is a founding HealthPass location, located right alongside Physique Labs in Medford, NJ."

### Artemis Modern Aesthetics
- "Physician-guided skincare, wellness, and aesthetic care."
- Location: Medford, New Jersey

### Contact Actions (large tappable buttons)
- **Text Us**: sms:8333872996 — "(833) 387-2996"
- **Visit Our Website**: https://www.artemis-medspa.com
- **Book a Consultation**: https://www.artemis-medspa.com/contact

### Social / Links
- Small footer with "Powered by Artemis AI · Built with Perplexity"

---

## PWA Requirements

### Meta tags (in <head>):
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<meta name="theme-color" content="#1B2A4A">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="apple-mobile-web-app-title" content="Ask Artemis">
<link rel="manifest" href="manifest.json">
<link rel="apple-touch-icon" href="icon-192.png">
```

### OG tags:
```html
<meta property="og:title" content="Ask Artemis">
<meta property="og:description" content="Your physician-guided resource for skincare, wellness, and aesthetic care.">
<meta property="og:image" content="https://tmccann124.github.io/artemis-chatbot-demo/og-image.png">
<meta property="og:url" content="https://tmccann124.github.io/artemis-chatbot-demo/app.html">
```

### Service worker registration:
```html
<script>
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js').catch(() => {});
}
</script>
```

---

## Critical Rules
1. ALL product links must point to Tom's shops (PCA Skin, Pure Encapsulations, HealthPass) — see URLs above
2. Maximum 4 product recommendations at any time in the chatbot
3. HealthPass referral link MUST be: https://www.tryhealthpass.com/pages/pricing?referrer=dbb9b2f6-819b-4577-b32a-12ad4ecc0349
4. The file is `app.html` — do NOT modify index.html, chat.html, or artemis-widget.js
5. Include Perplexity Computer attribution in <head> (read from skills/website-building/shared/pplx_attribution.html)
6. Footer: "Powered by Artemis AI · Built with Perplexity"
