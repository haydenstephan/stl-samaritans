# St. Louis Samaritans Website — Design Spec

**Date:** 2026-04-20
**Owner:** Hayden Stephan (personal GitHub: hayden.c.stephan@gmail.com)
**Status:** Approved (brainstorming complete, ready for implementation plan)

## 1. Background

St. Louis Samaritans is an informal homeless ministry of 8–15 regulars based in
downtown St. Louis. Modeled after Christ in the City (Denver), the group
practices a relational rather than transactional approach — weekly street walks
to spend time with "friends on the street," supplemented by an annual retreat
and occasional social gatherings (board game nights). The group is not parish-
affiliated and currently has no public-facing online presence (only an internal
GroupMe).

The website's job is to extend the ministry's reach: explain the work, recruit
new walkers, accept donations of money (Venmo) and supplies (St. Richard's
dropoff), and surface upcoming events.

## 2. Goals

The site must serve four overlapping jobs, in priority order:

1. **Inform** — explain who the Samaritans are and how the relational model works
2. **Recruit** — make it easy for interested people to sign up to join a walk
3. **Donate** — direct people to Venmo (money) and St. Richard's (supplies)
4. **Coordinate (light)** — show upcoming walks, retreat, and social events

Explicit non-goals: member login, shift management, newsletters, blog, social
media integration, analytics. These are deferred until there's evidence they're
needed.

## 3. Audience & Tone

**Audience:** prospective walkers (primary), donors, the merely curious. Not
optimized for current members — they have GroupMe.

**Tone:** warm and personal. Earth-toned, serif-forward, photo-rich. The site
should feel like an invitation into friendship, not a charity pitch. Catholic-
adjacent in spirit (the namesake is the Good Samaritan parable) without being
churchy or institutional.

## 4. Architecture

### 4.1 Stack

- **Framework:** [Astro](https://astro.build) — static site generator that
  outputs pure HTML/CSS/JS. Component-based, content as Markdown.
- **Styling:** Tailwind CSS — pairs cleanly with Astro, fast iteration on the
  warm/serif aesthetic.
- **Hosting:** GitHub Pages on Hayden's personal account.
- **Repo:** `github.com/<personal-handle>/stl-samaritans`, public (required for
  free GitHub Pages on personal accounts).
- **Deployment:** GitHub Action runs `astro build` on push to `main`, uploads
  `dist/` as a Pages artifact, and deploys via the `actions/deploy-pages` flow
  (the modern GitHub Pages deployment — no `gh-pages` branch needed).
- **Domain:** `stlsamaritans.org`. Registered through any registrar; DNS A
  records point to GitHub Pages IPs; `CNAME` file in repo root. HTTPS via
  Let's Encrypt is auto-provisioned by Pages.

### 4.2 Directory Layout

```
stl-samaritans/
├── .github/workflows/deploy.yml    # Build + deploy on push to main
├── public/
│   ├── images/                     # Photos from walks, retreats
│   ├── CNAME                       # Custom domain config
│   └── favicon.ico
├── src/
│   ├── components/                 # Header, Footer, Hero, CtaCard, Gallery, FormWrapper
│   ├── content/                    # Markdown for editable copy (mission, walks intro, etc.)
│   ├── layouts/                    # BaseLayout.astro
│   ├── pages/                      # index.astro, about.astro, walks.astro, get-involved.astro, contact.astro
│   ├── styles/                     # global.css (Tailwind directives + base type)
│   └── config.ts                   # Site constants (Venmo handle, Formspree endpoint, calendar embed URL)
├── astro.config.mjs
├── tailwind.config.mjs
├── package.json
└── README.md
```

### 4.3 Boundaries

- **Layouts** know about page chrome (header, footer, nav). Pages render content
  inside a layout.
- **Components** are presentational and reusable; they take props, render markup,
  no data fetching.
- **Content** lives in Markdown so non-developers can edit copy via the GitHub
  web UI without touching templates.
- **Site-wide constants** (Venmo handle, Formspree endpoint, calendar URL) live
  in `src/config.ts`. Editing these does not require touching components.

## 5. Pages

| Path             | Purpose                                                          |
|------------------|------------------------------------------------------------------|
| `/`              | Hero, tagline, mission paragraph, three-card preview, upcoming walk |
| `/about`         | Full mission, relational model, who we are, retreat photo strip  |
| `/walks`         | What to expect, where/when, what to bring, tone guidance, signup form |
| `/get-involved`  | Embedded Google Calendar, supplies list with St. Richard's info, Venmo donate button |
| `/contact`       | Short Formspree contact form; GroupMe info shown post-submission |

Five pages total. Tight, focused, no filler.

## 6. Components

- **Header** — logo wordmark + nav. Sticky on scroll.
- **Footer** — copyright, contact email, small print.
- **Hero** — full-width photo with overlaid tagline. Used on home and section tops.
- **CtaCard** — title, body, link. Used on home page preview cards.
- **Gallery** — responsive image grid. Used on About and Walks.
- **FormWrapper** — wraps a Formspree-targeted `<form>` with consistent styling
  and a success/error state.
- **CalendarEmbed** — iframe wrapper for the Google Calendar embed with
  responsive sizing.

## 7. External Services

| Service          | Purpose                          | Free tier sufficient?    |
|------------------|----------------------------------|--------------------------|
| GitHub Pages     | Hosting                          | Yes                      |
| Formspree        | Volunteer + contact form handler | Yes (50 submissions/mo)  |
| Google Calendar  | Events display                   | Yes                      |
| Venmo            | Money donations                  | Yes (deep link only)     |

No service requires server-side secrets. The Formspree endpoint is public by
design (embedded in the form's `action` attribute).

## 8. Data Flow

The site is fully static — no databases, no server logic. Three runtime data flows:

1. **Volunteer signup form** — Browser POSTs `<form>` to Formspree's endpoint.
   Formspree emails the submission to the configured coordinator address.
   Browser shows success/error state.
2. **Contact form** — Same as above, different recipient.
3. **Calendar embed** — Browser iframe loads the public Google Calendar HTML
   directly from Google. Site has no involvement at runtime.

## 9. Content Sourcing

Initial content comes from:

- The Christ in the City pamphlet Hayden has on hand (mission, relational model
  framing).
- Photos Hayden gathers from past walks and retreats.
- A short "about us" / mission statement to be drafted collaboratively during
  implementation.

We will not copy CIC's text verbatim — paraphrase and adapt to STL Samaritans'
own voice and locality.

## 10. Deployment & Operations

- **Trigger:** push to `main` branch.
- **Action:** `.github/workflows/deploy.yml` runs `npm ci && npm run build`,
  uploads `dist/` as a Pages artifact, deploys.
- **Rollback:** revert the offending commit on `main`; the next push redeploys
  the previous good state.
- **Content updates:** edit Markdown files in `src/content/` either locally
  (PR + merge) or via the GitHub web UI (commit directly to `main` for trivial
  fixes).
- **No staging environment.** Site is small and the audience is small; preview
  builds via `npm run dev` locally are sufficient.

## 11. Out of Scope

Explicitly NOT in this build:

- Member login / accounts
- Shift management / scheduling logic (D3 from brainstorming — possibly later)
- Newsletter / email list (GroupMe handles internal comms)
- Blog or "stories from the street" section
- Social media integrations
- Analytics
- Multi-language support

## 12. Open Items for Implementation Phase

- Choose personal GitHub handle and confirm repo name.
- Register `stlsamaritans.org` (verify availability).
- Sign up for Formspree, get the endpoint URL.
- Create / share the Google Calendar.
- Confirm Venmo handle.
- Draft mission statement copy.
- Gather initial photos.
- Confirm coordinator email address for form submissions.

These are inputs the implementation plan will need but don't change the design.
