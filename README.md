# St. Louis Samaritans Website

The website for the St. Louis Samaritans, an informal homeless ministry in
downtown St. Louis. Live at [stlsamaritans.org](https://stlsamaritans.org).

## Stack

- [Astro](https://astro.build) — static site generator
- [Tailwind CSS](https://tailwindcss.com) — styling
- [Formspree](https://formspree.io) — form handling
- [Google Calendar](https://calendar.google.com) — events
- GitHub Pages — hosting

## Local development

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # production build into dist/
npm run preview  # serve the built site locally
```

## Editing content

Most editable copy lives in `src/content/*.md`. Edit those Markdown
files (locally or via the GitHub web UI) and commit — the site rebuilds
on push to `main`.

Site-wide constants (Venmo handle, Formspree ID, calendar URL, contact
email, donation dropoff address) are in `src/config.ts`.

## Adding photos

Drop images into `public/images/` and reference them as `/images/<filename>`
in `src/pages/about.astro` (or any page).

## Before going live

Edit `src/config.ts` and replace each `REPLACE_ME`:

- `CONTACT.coordinatorEmail` — `REPLACE_ME` with the inbox for contact-form replies (also shown in the footer)
- `CONTACT.groupMeInviteUrl` — `REPLACE_ME` with the GroupMe invite URL; optional — if set, appears in the contact form's success message
- `FORMS.formspreeId` — `REPLACE_ME` with the ID from your Formspree form; create a free form at [formspree.io](https://formspree.io) and copy the `xxxxxxxx` from `formspree.io/f/xxxxxxxx`
- `CALENDAR.embedUrl` — `REPLACE_ME` with the iframe `src` URL from Google Calendar → Settings → "Integrate calendar"
- `DONATIONS.venmoHandle` — `REPLACE_ME` with your Venmo username (no `@`)
- `DONATIONS.suppliesDropoff.address` — `REPLACE_ME` with St. Richard's full street address

The site will build and render with `REPLACE_ME` placeholders intact —
you'll just see "coming soon" messages where the live integrations
should be. Useful for testing layout changes without committing real values.

## Deployment

Push to `main`. The GitHub Action in `.github/workflows/deploy.yml` builds
the site and publishes it via GitHub Pages.

**Before the first deploy:** in the GitHub repo, go to **Settings → Pages
→ Build and deployment → Source** and set it to **GitHub Actions**
(not "Deploy from a branch"). The workflow runs green even when this
isn't set, but nothing actually publishes — common first-time pitfall.

## DNS setup (one-time)

At your domain registrar (for `stlsamaritans.org`), set these records:

| Type  | Name | Value                             |
|-------|------|-----------------------------------|
| A     | @    | 185.199.108.153                   |
| A     | @    | 185.199.109.153                   |
| A     | @    | 185.199.110.153                   |
| A     | @    | 185.199.111.153                   |
| CNAME | www  | <your-github-username>.github.io  |

The `www` row is optional but recommended — GitHub will 301-redirect
`www.stlsamaritans.org` to the apex `stlsamaritans.org` for you.

Then in the GitHub repo: Settings → Pages → Custom domain → enter
`stlsamaritans.org` → wait for the cert. Enable "Enforce HTTPS" once
the cert provisions (usually within an hour).
