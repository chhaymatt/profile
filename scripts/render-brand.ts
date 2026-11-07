// Renders the favicon, app icons and link-preview image from the same contour
// generator the site uses, so they always match the design.
//
//   npm run brand
//
// Writes into public/: favicon.svg, favicon-32.png, apple-touch-icon.png,
// icon-192.png, icon-512.png and og-image.png. Each image is built as a
// self-contained SVG, then screenshotted with headless Chrome (set CHROME_PATH
// if it isn't in the default macOS location).

import { spawn } from 'node:child_process'
import { existsSync, mkdtempSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { generateContours } from '../src/lib/contours.ts'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const pub = join(root, 'public')
const chrome =
  process.env.CHROME_PATH ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'

// Colours from DESIGN.md.
const c = {
  ink: '#1D1D1F',
  muted: '#6E6E73',
  canvas: '#FBFBFD',
  card: '#FFFFFF',
  accent: '#3B4BB8',
  lavender: '#EEE8FF',
  lavenderStrong: '#D9CCFF',
  lavenderDark: '#2A2440',
  accentDark: '#A9B4FF',
}

const paths = (d: string[], attrs: string) => d.map((p) => `<path d="${p}" ${attrs}/>`).join('')
const dataUri = (file: string, type: string) =>
  `data:${type};base64,${readFileSync(file).toString('base64')}`

// The mark: three contour rings and a summit dot on a lavender square.
function mark({ size, radius, dark = false }: { size: number; radius: number; dark?: boolean }) {
  const rings = generateContours({
    seed: 31,
    step: size * 0.115,
    peaks: [{ x: size / 2, y: size / 2, rings: 3 }],
  })
  const bg = dark ? c.lavenderDark : c.lavender
  const line = dark ? c.accentDark : c.accent
  const stroke = Math.max(1.5, size * 0.055)
  return `<rect width="${size}" height="${size}" rx="${radius}" fill="${bg}"/>
${paths(rings.paths, `fill="none" stroke="${line}" stroke-width="${stroke}" stroke-linejoin="round"`)}
<circle cx="${size / 2}" cy="${size / 2}" r="${size * 0.075}" fill="${line}"/>`
}

function faviconSvg() {
  // Light and dark versions in one file; browsers pick by the system theme.
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
<style>.dark{display:none}@media (prefers-color-scheme: dark){.light{display:none}.dark{display:inline}}</style>
<g class="light">${mark({ size: 32, radius: 8 })}</g>
<g class="dark">${mark({ size: 32, radius: 8, dark: true })}</g>
</svg>
`
}

// App icons are square and opaque; iOS and Android round the corners themselves.
const iconSvg = (size: number, radius = 0) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">${mark({ size, radius })}</svg>`

function ogSvg() {
  const W = 1200
  const H = 630
  const terrain = generateContours({
    seed: 7_2026,
    step: 26,
    peaks: [
      { x: 1090, y: 80, rings: 7 },
      { x: 900, y: 610, rings: 6 },
      { x: 70, y: 590, rings: 5 },
    ],
  })
  const halo = generateContours({ seed: 20_14, step: 22, peaks: [{ x: 235, y: 315, rings: 10 }] })
  const font = dataUri(
    join(root, 'node_modules/@fontsource-variable/nunito/files/nunito-latin-wght-normal.woff2'),
    'font/woff2',
  )
  const photo = dataUri(join(pub, 'images/matthew.webp'), 'image/webp')
  const line = (text: string, y: number) => `<tspan x="470" y="${y}">${text}</tspan>`

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
<style>
  @font-face { font-family: Nunito; src: url(${font}) format('woff2'); font-weight: 200 1000; }
  text { font-family: Nunito, sans-serif; }
</style>
<defs>
  <clipPath id="face"><circle cx="235" cy="315" r="125"/></clipPath>
  <filter id="lift" x="-30%" y="-30%" width="160%" height="160%">
    <feDropShadow dx="0" dy="12" stdDeviation="16" flood-opacity="0.14"/>
  </filter>
</defs>
<rect width="${W}" height="${H}" fill="${c.canvas}"/>
${paths(terrain.paths, `fill="none" stroke="${c.lavenderStrong}" stroke-width="1.5" opacity="0.75"`)}
${paths(halo.paths, `fill="none" stroke="${c.lavenderStrong}" stroke-width="2"`)}
<circle cx="235" cy="315" r="125" fill="${c.lavender}" filter="url(#lift)"/>
<image href="${photo}" x="110" y="190" width="250" height="250" clip-path="url(#face)" preserveAspectRatio="xMidYMin slice"/>

<text x="466" y="236" font-size="84" font-weight="800" letter-spacing="-2.5" fill="${c.ink}">Matthew Chhay</text>
<text x="470" y="296" font-size="36" font-weight="700" fill="${c.accent}">Software Engineer · Sydney</text>
<text font-size="28" font-weight="500" fill="${c.muted}">
  ${line('Working directly with customers to understand the', 360)}
  ${line('problem, build something quickly and keep improving it.', 398)}
</text>

<rect x="470" y="444" width="272" height="60" rx="30" fill="${c.lavender}"/>
<text x="606" y="482.5" font-size="24" font-weight="700" text-anchor="middle" fill="${c.accent}">matthewchhay.com</text>
</svg>`
}

// Headless Chrome writes the screenshot but doesn't always exit afterwards, so wait
// for the file to appear and then stop it ourselves.
async function render(svg: string, out: string, width: number, height = width) {
  const dir = mkdtempSync(join(tmpdir(), 'brand-'))
  const file = join(dir, 'image.svg')
  writeFileSync(file, svg)
  rmSync(out, { force: true })
  const browser = spawn(
    chrome,
    [
      '--headless=new',
      '--disable-gpu',
      '--hide-scrollbars',
      '--no-first-run',
      `--user-data-dir=${join(dir, 'profile')}`,
      `--window-size=${width},${height}`,
      `--screenshot=${out}`,
      pathToFileURL(file).href,
    ],
    { stdio: 'ignore' },
  )
  try {
    for (let waited = 0; !(existsSync(out) && statSync(out).size > 0); waited += 100) {
      if (waited > 30_000) throw new Error(`Chrome didn't write ${out}`)
      await new Promise((done) => setTimeout(done, 100))
    }
    // Give Chrome a moment to finish writing before stopping it.
    await new Promise((done) => setTimeout(done, 300))
  } finally {
    // Chrome sometimes exits by itself, so only wait for it if it's still running.
    if (browser.exitCode === null && browser.signalCode === null) {
      const exited = new Promise((done) => browser.once('exit', done))
      browser.kill('SIGKILL')
      await exited
    }
    rmSync(dir, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 })
  }
  console.log(`wrote ${out.replace(`${root}/`, '')}`)
}

writeFileSync(join(pub, 'favicon.svg'), faviconSvg())
console.log('wrote public/favicon.svg')

await render(iconSvg(32, 8), join(pub, 'favicon-32.png'), 32)
await render(iconSvg(180), join(pub, 'apple-touch-icon.png'), 180)
await render(iconSvg(192), join(pub, 'icon-192.png'), 192)
await render(iconSvg(512), join(pub, 'icon-512.png'), 512)
await render(ogSvg(), join(pub, 'og-image.png'), 1200, 630)
