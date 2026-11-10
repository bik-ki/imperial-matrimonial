# Sanity content setup

The website reads published blog posts, services, and FAQs, plus the homepage, site settings, gallery, and consultation promotion singleton documents.

1. Copy `.env.example` to `.env.local`.
2. Set `SANITY_PROJECT_ID`, `SANITY_DATASET`, and `SANITY_API_VERSION`.
3. If the dataset is private, set `SANITY_API_READ_TOKEN` in `.env.local`. Public datasets do not need a token.
4. Run `npm run dev` from the repository root.

The optional read token is used only by server-side queries. Keep it unprefixed (never `VITE_`) and do not commit its value. `.env` files are ignored by git except `.env.example`.

## Content to publish

- **Services:** publish documents with a title, slug, summary, and any long-form content or image fields. Published services appear on the service list, detail pages, and homepage.
- **FAQs:** create and publish FAQ documents with a question, answer, category, and display order. They appear at `/faq`, grouped by category and sorted by display order.
- **Home page:** create the **Home page** singleton if it does not exist, then publish it. Add the required hero content, process title and at least one step; other homepage sections and images are optional and fall back to existing site content when omitted.
- **Site settings:** create the **Site settings** singleton if it does not exist. Add social links with HTTPS URLs; these populate the footer icons and homepage Instagram link. The schema also requires shared contact details to publish this singleton, but the website's contact surfaces still use `src/config/site.ts`.
- **Gallery:** add and publish images in the **Gallery** singleton. The website preserves the order shown in Studio.
- **Consultation promotion:** configure the **Consultation promotion** singleton. Set **Show promotion** to enable it; required copy and button fields must be populated before the promotion appears.

Homepage text fields currently store one language; populated Sanity text is shown for both language selections. Missing fields use the existing frontend defaults, including its localized copy where available.

## Production deployment

### Website environment

The website's Sanity client uses these server-side environment variables when supplied:

| Variable | Required? | Classification | Production value |
| --- | --- | --- | --- |
| `SANITY_PROJECT_ID` | No; defaults to `vk9sp82r` | Public identifier, not a credential | `vk9sp82r` |
| `SANITY_DATASET` | No; defaults to `production` | Public identifier, not a credential | `production` |
| `SANITY_API_VERSION` | No; defaults to `2025-02-19` | Public configuration | `2025-02-19` |
| `SANITY_API_READ_TOKEN` | No for the current public dataset | **Secret** | Leave unset for the current deployment. If the dataset becomes private, create a read-only token and store it only in the hosting platform's server-side secret store. Never use a `VITE_` prefix. |

These values are read only by the server-side Sanity client. Project ID, dataset, and API version can safely be public, but the read token must never enter browser code or Git. The project ID, dataset, and API version defaults allow the published site to work without deployment-specific environment settings; local `.env.local` values can override them.

### Dataset visibility

The Sanity project currently reports `production` as a **public** dataset. This permits unauthenticated reads of published content; it does not permit anonymous edits. Drafts and Studio editing still require Sanity authentication. The website intentionally queries Sanity on the server and needs no read token for this dataset.

### Studio environment and deployment

The Studio's project ID and dataset are already configured in `studio-biheincourt/sanity.config.ts` and `studio-biheincourt/sanity.cli.ts`. No Studio environment variables are required for an interactive local deployment. Sign in with `npx sanity login` first, then deploy from the Studio directory:

```sh
cd studio-biheincourt
npx sanity@latest deploy
```

The CLI builds the Studio and prompts for a unique `*.sanity.studio` hostname. Review the hostname before confirming. Alternatively, the repository script is `npm run deploy` from `studio-biheincourt`.

For CI-only Studio deployment, use `SANITY_AUTH_TOKEN` as a secret in the CI secret store and run `npx sanity@latest deploy --yes`; never save that token in a committed file. This is not needed for a one-time interactive deployment.

### Website hosting and deployment

This repository is connected to Lovable, and its Vite configuration uses Lovable's TanStack Start integration. The website's production hosting is Lovable (not a configured standalone Cloudflare, Vercel, or Netlify deployment). Publish it through Lovable:

1. Open this project in the Lovable editor and review its preview.
2. Select **Publish** in the top-right of the editor.
3. Review the proposed `lovable.app` address, audience/access choice, and security scan.
4. Confirm **Publish** to deploy. For later code changes, reopen the dialog and choose **Publish changes**.

Lovable performs the production build and hosts the app with HTTPS. No website deployment command, Wrangler configuration, or hosting credentials are present in this repository. Do not copy `.env.local` into Git; the committed project and dataset defaults match the current Sanity project. If the dataset is ever made private, first confirm the chosen host can provide `SANITY_API_READ_TOKEN` exclusively to the server runtime, then add it via that host's secret manager before publishing.

### CORS and URL settings

The current Sanity CORS list contains `http://localhost:3333` with credentials enabled. This is for the local Studio. A Studio deployed with `sanity deploy` is automatically allowed by Sanity and does not need a manually added CORS entry.

The website queries Sanity server-side, so its Lovable URL and custom domain do not need Sanity CORS entries. If frontend code is later changed to query Sanity directly in the browser, add the exact production website origin with credentials disabled for anonymous public reads. For a self-hosted Studio, add its exact HTTPS origin with credentials enabled. Avoid broad wildcard origins with credentials.

Lovable publishes to a `lovable.app` URL by default and provides HTTPS. If a custom domain is connected later, configure it through Lovable's project Domains settings. No domain or production URL has been configured as part of this preparation.

### Inviting editors

In the Sanity project at [sanity.io/manage](https://www.sanity.io/manage), open **Members** and invite each editor by their individual email address; assign access per person rather than sharing a login:

- **Editor**: use for staff who need to create, edit, and publish content (available on Growth and Enterprise plans).
- **Contributor**: use when they should prepare drafts but must not publish (Growth and Enterprise).
- **Viewer**: read-only access.

Use the least-privileged role that supports the person's work. Editors can access all datasets and have limited project-settings access. Verify each invitee accepts using the same sign-in method to which the invitation was sent.

## Local production-readiness checklist

- Confirm the blog list and detail pages show only published posts; an unknown slug returns not found.
- Confirm the services list and detail pages show published services; an unknown slug returns not found.
- Confirm `/faq` displays published FAQs and shows its empty state when no FAQs are published.
- Confirm the homepage uses published singleton fields and falls back to existing content when the singleton or fields are absent.
- Confirm published social links appear in the footer and the homepage Instagram link; absent settings use the existing fallback links.
- Confirm `.env.local`, `.env`, and other environment files are ignored by Git; only `.env.example` should be tracked.
