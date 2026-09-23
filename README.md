# Kashi Live 24

Mobile-first local news platform for Varanasi. The public site is a Next.js app with seeded sample stories. The `server` folder provides a MongoDB-backed Express REST API for published news and moderated user submissions.

## Run locally

1. Install Node.js 20+.
2. Run `npm install`.
3. Copy `.env.example` to `.env` and set MongoDB and JWT values.
4. Start the frontend with `npm run dev`.
5. Start the API with `npm run api`.

Routes include `/`, `/news/[slug]`, `/send-news`, `/admin`, `/sitemap.xml`, and `/robots.txt`.

The app uses original/sample content and identifies source information in article pages. User submissions are always held for moderation.
