import { describe, expect, it } from 'vitest'
import { generateContours, seededRandom } from './contours'

const options = {
  seed: 42,
  step: 20,
  peaks: [
    { x: 100, y: 100, rings: 4 },
    { x: 300, y: 200, rings: 2 },
  ],
}

describe('seededRandom', () => {
  it('repeats the same sequence for the same seed', () => {
    const a = seededRandom(7)
    const b = seededRandom(7)
    expect([a(), a(), a()]).toEqual([b(), b(), b()])
  })

  it('stays within [0, 1)', () => {
    const random = seededRandom(1)
    for (let i = 0; i < 1000; i++) {
      const n = random()
      expect(n).toBeGreaterThanOrEqual(0)
      expect(n).toBeLessThan(1)
    }
  })
})

describe('generateContours', () => {
  it('draws one closed path per ring', () => {
    const { paths } = generateContours(options)
    expect(paths).toHaveLength(6)
    for (const d of paths) {
      expect(d).toMatch(/^M[\d.-]+ [\d.-]+C/)
      expect(d.endsWith('Z')).toBe(true)
    }
  })

  it('is deterministic for a given seed', () => {
    expect(generateContours(options)).toEqual(generateContours(options))
  })

  it('changes with the seed', () => {
    expect(generateContours({ ...options, seed: 43 }).paths).not.toEqual(
      generateContours(options).paths,
    )
  })

  it('puts the summit on the first peak', () => {
    expect(generateContours(options).summit).toEqual({ x: 100, y: 100 })
  })
  it('draws each ring once per neighbouring tile when wrapping', () => {
    const wrapped = generateContours({ ...options, wrap: { width: 400, height: 300 } })
    expect(wrapped.paths).toHaveLength(6 * 9)
  })

  it('draws the same ring shape in every tile', () => {
    const plain = generateContours(options).paths
    const wrapped = generateContours({ ...options, wrap: { width: 400, height: 300 } }).paths
    // The untranslated copy (offset 0, 0) is the 5th of the 9 copies of each ring.
    expect(wrapped[4]).toBe(plain[0])
  })
})
