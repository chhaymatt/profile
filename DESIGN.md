---
version: alpha
name: Lavender
description: Personal site for Matthew Chhay, Software Engineer in Sydney. Apple-style clarity with a cute, friendly streak, in the lavender carried over from the original matthewchhay.com.
colors:
  ink: '#1D1D1F'
  ink-muted: '#6E6E73'
  canvas: '#FBFBFD'
  card: '#FFFFFF'
  hairline: '#E8E8ED'
  accent: '#3B4BB8'
  accent-hover: '#2F3D99'
  lavender: '#EEE8FF'
  lavender-strong: '#D9CCFF'
  peach: '#FFEADF'
  mint: '#DDF4E7'
  sky: '#E1EEFF'
  butter: '#FFF3C9'
  photo-backdrop: '#EEE8FF'
  bubble: '#E9E9EB'
  ink-dark: '#F5F5F7'
  ink-muted-dark: '#A1A1A6'
  canvas-dark: '#000000'
  card-dark: '#1C1C1E'
  hairline-dark: '#2C2C2E'
  accent-dark: '#A9B4FF'
  lavender-dark: '#2A2440'
  peach-dark: '#3A2A22'
  mint-dark: '#1D3328'
  sky-dark: '#1C2A3D'
  butter-dark: '#3A3420'
typography:
  display:
    fontFamily: SF Pro Rounded
    fontSize: 4.5rem
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: -0.03em
  headline:
    fontFamily: SF Pro Rounded
    fontSize: 2.75rem
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: -0.025em
  title:
    fontFamily: SF Pro Rounded
    fontSize: 1.5rem
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: -0.015em
  body-lg:
    fontFamily: SF Pro Text
    fontSize: 1.3125rem
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: -0.01em
  body-md:
    fontFamily: SF Pro Text
    fontSize: 1.0625rem
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: -0.005em
  label:
    fontFamily: SF Pro Text
    fontSize: 0.875rem
    fontWeight: 600
    lineHeight: 1.3
rounded:
  sm: 10px
  md: 18px
  lg: 28px
  full: 999px
spacing:
  '1': 4px
  '2': 8px
  '3': 12px
  '4': 16px
  '6': 24px
  '8': 32px
  '12': 48px
  '16': 64px
  '24': 96px
  '32': 128px
components:
  link:
    textColor: '{colors.accent}'
  button-primary:
    backgroundColor: '{colors.accent}'
    textColor: '{colors.card}'
    typography: '{typography.label}'
    rounded: '{rounded.full}'
    padding: 12px 22px
  button-primary-hover:
    backgroundColor: '{colors.accent-hover}'
    textColor: '{colors.card}'
  button-secondary:
    backgroundColor: '{colors.lavender}'
    textColor: '{colors.accent}'
    typography: '{typography.label}'
    rounded: '{rounded.full}'
    padding: 12px 22px
  card:
    backgroundColor: '{colors.card}'
    textColor: '{colors.ink}'
    rounded: '{rounded.lg}'
    padding: 32px
  tile:
    backgroundColor: '{colors.lavender}'
    textColor: '{colors.ink}'
    rounded: '{rounded.lg}'
    padding: 28px
  pill:
    backgroundColor: '{colors.canvas}'
    textColor: '{colors.ink-muted}'
    typography: '{typography.label}'
    rounded: '{rounded.full}'
    padding: 4px 12px
  nav:
    backgroundColor: '{colors.canvas}'
    textColor: '{colors.ink}'
    typography: '{typography.label}'
---

## Overview

**Apple's clarity, with a smile.** Big, confident rounded headlines, lots of air, and content in soft rounded cards on an off-white canvas, the way an Apple product page presents a feature. The cute part comes from soft lavender accents, a friendly wave, hand-drawn hobby icons, a photo framed by a lavender contour halo, and small springy movements when you hover or press.

It should feel like Matthew: warm, approachable and tidy. It's a person's site, not a product launch, so there's no hype and no marketing tricks.

The lavender comes from the original matthewchhay.com, and so do the contour lines, which now run behind the whole page and form a halo around the photo.

## Colors

Light is the default. Dark mode swaps each token for its `-dark` pair under `prefers-color-scheme: dark`, using Apple's true-black canvas and #1C1C1E cards.

- **Ink (#1D1D1F) / Ink muted (#6E6E73):** Apple's text greys. Body text and secondary text.
- **Canvas (#FBFBFD):** Off-white page background. **Card (#FFFFFF):** Raised content.
- **Hairline (#E8E8ED):** 1px dividers, and card borders in dark mode.
- **Accent (#3B4BB8):** Indigo blue, a lighter take on the original site's navy so it reads as a colour next to black text (about 7:1 on white). Buttons, links, focus rings and drawing highlights. The only strong colour on the page; periwinkle (#A9B4FF) in dark mode. Deliberately blue rather than violet, which would read as Proton's brand.
- **Lavender (#EEE8FF):** The main pastel: screenshot mounts, icon squares and the photo backdrop (which uses a lighter #B9ADF0 in dark mode). Text on it is always ink.
- **Peach, mint, sky, butter:** Available as `data-tone` values for an occasional highlight. Most cards are white.

## Typography

Apple's own fonts where they exist, with free fallbacks elsewhere:

- **Headlines:** `ui-rounded` (SF Pro Rounded on Apple devices), falling back to self-hosted **Nunito** everywhere else. The rounded letterforms carry the "cute".
- **Body and labels:** `-apple-system` / `system-ui` (SF Pro on Apple, Segoe UI on Windows, Roboto on Android).

SF Pro isn't self-hosted because Apple's licence doesn't allow it on the web. Headlines are bold (700), tight (-0.025em to -0.03em) and sentence case. Body copy stays at a 40rem measure or less.

## Layout

- Max width 70rem, with a 16px gutter on mobile and 24px on desktop.
- Sections are centred headline blocks followed by a grid of cards, like an Apple feature page.
- The hero is centred: photo, greeting, headline, intro, two pill buttons.
- Bento grids use CSS Grid: 1 column on mobile, 2 at 48rem, and up to 3 at 64rem.
- Section rhythm: 128px between sections on desktop, 80px on mobile.
- The nav is a sticky translucent bar (background blur), as on apple.com.

## Elevation & Depth

Soft and shallow, and the same everywhere. Every card, white or pastel, uses `0 1px 2px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.06)`. In dark mode, shadows are replaced by a 1px hairline border. Cards don't move on hover, because they aren't clickable; only buttons and links react.

## Shapes

Generously round. Cards and tiles 28px, images inside cards 18px, small elements 10px, buttons and pills fully round. The photo is a circle.

## Components

- **Button primary:** Accent pill, white label. Hover darkens it. Press scales it to 0.97.
- **Button secondary:** Lavender pill with accent text.
- **Card:** One shared `.card` class (in `src/styles/ui.css`): 28px radius, 24px padding on phones and 32px from 48rem, soft shadow. White by default; `data-tone` turns it pastel. Every boxed thing on the page is this card.
- **Pill:** One shared `.pill` class, used sparingly: only for a single badge such as "Coming soon" or the hero's role. White when it sits on a pastel card.
- **Technology list:** Not pills. A quiet line of muted labels separated by lavender dots ("React · Storybook · Monitoring"), still marked up as a list.
- **Work art:** Each work card has a small line-drawn scene of what the project was about, sitting fully inside the top-right corner with the same inset as the text and fading slightly towards it: a home, caravan, boat and motorbike (insurance quote and buy); a bank, term-deposit clock, coins and a matched tick (reconciliation); an open manual, search and support headset (offline manual for support staff); data-centre racks and a dashboard of hardware health, power and sustainability (asset visibility). Same stroke style as the hobby icons. The label and title leave room for it.
- **Buttons:** One shared `.button` with `.button-primary` and `.button-secondary`.
- **Page terrain:** One seamless, repeating tile of contour lines behind the whole page, in `lavender-strong` at low opacity. It scrolls with the page so the lines run unbroken between sections, cards and tiles sit on top of it, and it fades out around the photo so the halo stays the focus.
- **Contour mark:** A small patch of contour rings with an accent summit dot, tucked into the corner of the contact card. Decorative, so `aria-hidden`.
- **Contact thread:** "Let's talk." is styled like a Messages conversation: a small photo and grey received bubbles from Matthew on the left (`bubble`, #3A3A3C in dark mode, with a tail on the last one), and the ways to reply (LinkedIn, GitHub, plus email and CV once added) as accent-coloured sent bubbles on the right. When the thread scrolls into view it plays once, in about 1.5 seconds: a typing bubble, "Hi there!", typing again, the message, then the replies. It shows everything at once for reduced motion, and skips to the end if someone tabs into it. Messages that haven't arrived are hidden only visually, so screen readers can read them from the start.
- **Climb line:** A 2px accent line under the nav bar fills as you scroll, like a route being climbed.
- **Spec sheet:** Skills, and certifications with education, are full-width cards laid out like Apple's tech specs: rows with a label on the left (18rem) and a dot-separated list on the right, divided by hairlines. Skill rows have a small custom icon (code, cloud, testing, design) in a lavender rounded square; certifications are grouped by issuer. Rows stack on narrow cards.
- **Hobby cards:** White cards like the rest; each custom icon sits in the same lavender rounded square, so the icon carries the identity rather than the card colour.
- **Screenshot mount:** Project screenshots are never tinted. They sit on a lavender mount (12px padding, 18px radius) with a soft shadow. The coming-soon card uses the same mount with a sketched browser window and a pencil drawing its last line, so it reads as a project in progress, not another lavender panel.
- **Photo halo:** The cut-out portrait in a borderless circle on a lavender backdrop (a lighter lavender in dark mode, so the photo doesn't sink into the page), with a soft shadow, on a lavender contour-line halo that draws in once on load.
- **Nav:** Sticky, translucent canvas with backdrop blur and a hairline bottom edge.
- **Focus ring:** 3px accent outline with a 3px offset, on every interactive element.

## Do's and Don'ts

**Do**

- Write in the first person, plainly and specifically.
- Keep pastel colour for a few highlights; most cards are white.
- Use small, springy motion and turn it all off under `prefers-reduced-motion`. The full list: buttons press in; the wave waves once; the badge pops in; contour lines draw in; cards fade and rise 12px as they scroll into view; the contact thread plays out once like a real conversation; work drawings sketch in as their card arrives; external-link arrows nudge 2px on hover; the nav marks the section you're reading; the climb line fills as you scroll; the coming-soon pencil draws on a slow 7s loop (the only loop on the page).
- Scroll-linked motion uses CSS scroll-driven animations (no JavaScript), so browsers without support simply show everything in place.
- Keep WCAG AA contrast: text on pastels is always ink.
- Use semantic landmarks, one h1 and a skip link.

**Don't**

- No gradients on text, no neon glows, no blobs.
- No skill-logo walls or icon grids of personality traits.
- One emoji on the whole page: the 👋 in the greeting. Emoji look different on every platform, and an emoji atop each card reads as a template.
- Icons are custom inline SVGs (`HobbyIcon`): rounded 2.5px ink strokes with one accent fill, on a 48px grid. No icon libraries.
- No Inter, Poppins or other template fonts.
- No hard shadows, sharp corners, or pure-black text in light mode.
- No pill labels above every section heading. The nav already says where you are.
- No walls of pills. If more than one or two pills appear in a card, use a dot-separated line instead.
- No colour that doesn't mean anything.
- No buzzwords: "passionate", "innovative", "cutting-edge", "transforming".
