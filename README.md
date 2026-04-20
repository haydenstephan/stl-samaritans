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

## Deployment

Push to `main`. The GitHub Action in `.github/workflows/deploy.yml` builds
the site and publishes it via GitHub Pages.

## DNS setup (one-time)

At your domain registrar (for `stlsamaritans.org`), set these records:

| Type  | Name | Value                  |
|-------|------|------------------------|
| A     | @    | 185.199.108.153        |
| A     | @    | 185.199.109.153        |
| A     | @    | 185.199.110.153        |
| A     | @    | 185.199.111.153        |
| CNAME | www  | <github-handle>.github.io |

Then in the GitHub repo: Settings → Pages → Custom domain → enter
`stlsamaritans.org` → wait for the cert. Enable "Enforce HTTPS" once
the cert provisions (usually within an hour).
