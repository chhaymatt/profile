# matthewchhay.com

Personal site for Matthew Chhay. React 19, TypeScript (strict) and Vite, with CSS Modules and no UI framework.

## Commands

Needs Node 24 or newer (see `.nvmrc`).

```bash
npm install
npm run dev          # local dev server
npm run check        # lint, formatting, types and tests (what CI runs)
npm run format       # fix formatting
npm run preview      # serve the production build locally
npm run build        # production build in dist/
npm run lint:design  # lint DESIGN.md with Google's design.md CLI (fetched on demand)
npm run brand        # regenerate the favicon, app icons and link preview (macOS + Chrome)
```

## Where things live

| Path                    | What it is                                                                     |
| ----------------------- | ------------------------------------------------------------------------------ |
| `DESIGN.md`             | The design system (tokens and rules). Coding agents should follow it strictly. |
| `src/styles/tokens.css` | The same tokens as CSS custom properties. Keep in sync with `DESIGN.md`.       |
| `src/content/site.ts`   | All site copy. Edit words here, not in components.                             |
| `src/components/`       | One component per section, each with its own `.module.css`.                    |
| `src/lib/contours.ts`   | Seeded generator for the contour halo behind the photo.                        |
| `public/images/`        | Photo and project screenshots, carried over from the original site.            |

## Placeholders

These are `null` in `src/content/site.ts`. The UI that uses them stays hidden until they're filled in:

- `contact.email`
- `contact.cvUrl` (put the PDF in `public/` and set this to its path, e.g. `/Matthew_Chhay_CV.pdf`)
- `code.current` (a project you're building now)

## Working with an AI agent

Start prompts with: "Strictly follow DESIGN.md." The Do's and Don'ts section is there to keep generic, template-looking UI out.

## Deploying

The site is published to GitHub Pages from the `chhaymatt/profile` repo by
`.github/workflows/deploy.yml`, on every push to `main`. In the repo's
Settings → Pages, set **Source** to **GitHub Actions** and the custom domain to
`matthewchhay.com`. `public/CNAME` keeps the domain set on every deploy, and DNS is
already handled by Cloudflare.
