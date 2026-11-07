// Generates topographic-looking contour rings around a few "peaks".
// Seeded, so the map is identical on every render and on the server.

export interface Peak {
  x: number
  y: number
  rings: number
}

export interface ContourOptions {
  seed: number
  peaks: Peak[]
  /** Distance between neighbouring rings, in SVG units. */
  step: number
  /** Points sampled per ring before smoothing. */
  samples?: number
  /**
   * Tile size for a seamless repeating pattern. Each peak is also drawn one tile
   * over in every direction, so rings that cross an edge continue on the other side.
   */
  wrap?: { width: number; height: number }
}

export interface ContourMap {
  paths: string[]
  summit: { x: number; y: number }
}

/** Small, fast, seeded PRNG (mulberry32). Returns floats in [0, 1). */
export function seededRandom(seed: number): () => number {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

interface Harmonic {
  freq: number
  amp: number
  phase: number
  drift: number
}

const round = (n: number) => Math.round(n * 10) / 10

/** Closed Catmull-Rom spline through the points, written as cubic Béziers. */
function smoothClosedPath(points: [number, number][]): string {
  const n = points.length
  const at = (i: number) => points[((i % n) + n) % n] as [number, number]
  let d = `M${round(at(0)[0])} ${round(at(0)[1])}`
  for (let i = 0; i < n; i++) {
    const [x0, y0] = at(i - 1)
    const [x1, y1] = at(i)
    const [x2, y2] = at(i + 1)
    const [x3, y3] = at(i + 2)
    const c1x = x1 + (x2 - x0) / 6
    const c1y = y1 + (y2 - y0) / 6
    const c2x = x2 - (x3 - x1) / 6
    const c2y = y2 - (y3 - y1) / 6
    d += `C${round(c1x)} ${round(c1y)} ${round(c2x)} ${round(c2y)} ${round(x2)} ${round(y2)}`
  }
  return `${d}Z`
}

export function generateContours({
  seed,
  peaks,
  step,
  samples = 48,
  wrap,
}: ContourOptions): ContourMap {
  const random = seededRandom(seed)
  const paths: string[] = []
  const offsets: [number, number][] = wrap
    ? [-1, 0, 1].flatMap((i) =>
        [-1, 0, 1].map((j): [number, number] => [i * wrap.width, j * wrap.height]),
      )
    : [[0, 0]]

  for (const peak of peaks) {
    const harmonics: Harmonic[] = [2, 3, 5].map((freq) => ({
      freq,
      amp: 0.06 + random() * 0.12,
      phase: random() * Math.PI * 2,
      drift: (random() - 0.5) * 0.35,
    }))

    for (let ring = 1; ring <= peak.rings; ring++) {
      const radius = ring * step
      const points: [number, number][] = []
      for (let s = 0; s < samples; s++) {
        const theta = (s / samples) * Math.PI * 2
        // Outer rings wobble more, like real terrain flattening out.
        const wobble = harmonics.reduce(
          (sum, h) => sum + h.amp * Math.sin(h.freq * theta + h.phase + h.drift * ring),
          0,
        )
        const r = radius * (1 + wobble * Math.min(1, ring / 3))
        points.push([r * Math.cos(theta), r * Math.sin(theta) * 0.78])
      }
      for (const [dx, dy] of offsets) {
        paths.push(smoothClosedPath(points.map(([x, y]) => [peak.x + dx + x, peak.y + dy + y])))
      }
    }
  }

  const first = peaks[0]
  return { paths, summit: { x: first?.x ?? 0, y: first?.y ?? 0 } }
}
