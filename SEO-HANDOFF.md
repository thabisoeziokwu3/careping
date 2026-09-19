# CarePing SEO Handoff

This package contains a technical SEO pass over the static CarePing site.

## What was changed

- Tightened page titles and meta descriptions around real search intent.
- Added explicit `robots` directives to index the commercial pages while keeping `thank-you.html` noindex.
- Added a consistent canonical URL to every indexable page.
- Replaced the generic logo social preview with `CarePing-OG.jpg` at 1200x630.
- Added richer Open Graph and Twitter image metadata.
- Added consistent Organization, WebSite, WebPage/AboutPage/ContactPage/CollectionPage, BreadcrumbList and Service structured data where appropriate.
- Kept service-area information grounded in the site's existing Johannesburg/Gauteng/South Africa positioning; no fake physical address or LocalBusiness markup was added.
- Kept FAQ semantics, but do not rely on FAQ rich results: Google retired the FAQ rich-result feature in 2026.
- Simplified the XML sitemap and added verifiable `lastmod` dates. Google ignores `priority` and `changefreq`.
- Added preconnect hints for external font/icon resources.
- Added image dimensions and lazy loading for the repeated footer logo to reduce layout/performance issues.
- Preserved the existing site content and functionality as much as possible.

## Important: SEO is not only HTML

Before launch, do these in Google Search Console:

1. Verify ownership of `https://www.careping.co.za/`.
2. Submit `https://www.careping.co.za/sitemap.xml`.
3. Inspect the homepage and each commercial page with URL Inspection and request indexing after the final deployment.
4. Watch Page Indexing, Core Web Vitals, HTTPS/security, and Search performance reports.
5. Connect a real analytics platform if the client wants measurable lead/conversion reporting.

## Business / local SEO

If CarePing has a real business location, create/claim the official Google Business Profile and make the name, phone, website and business details consistent everywhere. Do not create fake office addresses or city pages solely to capture keywords.

Build legitimate mentions and links from relevant South African healthcare, business, technology and local organisations where appropriate. Avoid paid/spammy backlink schemes.

## Content growth

The current site is a small brochure site. Technical SEO can make it crawlable and understandable, but it cannot manufacture authority or search demand.

The next major SEO growth step should be useful, original pages/articles based on actual CarePing capabilities and customer questions, for example:

- WhatsApp booking system for clinics
- WhatsApp chatbot for clinics
- Online appointment booking for medical practices
- Clinic appointment reminders
- WhatsApp automation for healthcare practices
- Google Calendar appointment integration
- Reducing missed calls and manual booking administration

Only publish pages when the content is genuinely useful and materially different. Do not create dozens of near-identical city pages.

## Performance

After deployment, run the live site through PageSpeed Insights/Lighthouse on mobile and desktop. Pay particular attention to LCP, INP and CLS, image weight, font loading and third-party scripts.

## Important limitation

No HTML-only SEO pass can guarantee rankings. Google decides crawling, indexing and ranking from many signals, including relevance, content quality, links, authority, user experience and search demand.
