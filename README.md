# Kashi Live News 24

API-driven Hindi news site for Varanasi, Kashi and Banaras. The public Next.js site reads live stories from GNews when configured and Google News RSS as its fallback. Stories are normalized, categorized, deduplicated and shown with their source and published time.

## Run locally

1. Install Node.js 20+.
2. Run `npm install`.
3. Add `GNEWS_API_KEY` to `.env.local` for GNews results. Without it, Google News RSS is used.
4. Start the frontend with `npm run dev`.

Routes include `/`, `/category/[slug]`, `/news/[slug]`, `/search`, `/sitemap.xml`, and `/robots.txt`.

There is no CMS or admin publishing flow. External stories remain attributed to their source, and the site does not publish user submissions automatically.
