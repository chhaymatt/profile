import { fireEvent, render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from './App'
import { archive, work } from './content/site'

describe('App', () => {
  it('has a single h1 that greets by name', () => {
    render(<App />)
    const headings = screen.getAllByRole('heading', { level: 1 })
    expect(headings).toHaveLength(1)
    expect(headings[0]).toHaveTextContent('Matthew')
  })

  it('offers a skip link to the main content', () => {
    render(<App />)
    const skip = screen.getByRole('link', { name: 'Skip to content' })
    expect(skip).toHaveAttribute('href', '#main')
    expect(screen.getByRole('main')).toHaveAttribute('id', 'main')
  })

  it('links every nav item to a section that exists', () => {
    const { container } = render(<App />)
    const nav = screen.getByRole('navigation', { name: 'Main' })
    const sectionLinks = within(nav)
      .getAllByRole('link')
      .filter((link) => link.getAttribute('href')?.startsWith('#'))
    expect(sectionLinks.length).toBeGreaterThan(0)
    for (const link of sectionLinks) {
      const id = link.getAttribute('href')?.slice(1)
      expect(container.querySelector(`#${id}`)).not.toBeNull()
    }
  })

  it('shows every featured project', () => {
    render(<App />)
    for (const item of work) {
      expect(screen.getByRole('heading', { name: item.title })).toBeInTheDocument()
    }
  })

  it('hides placeholders that have not been filled in', () => {
    render(<App />)
    expect(screen.queryByRole('link', { name: /download/i })).not.toBeInTheDocument()
    expect(screen.queryByRole('link', { name: 'Email' })).not.toBeInTheDocument()
  })

  it('keeps the decorative map out of the accessibility tree', () => {
    const { container } = render(<App />)
    expect(container.querySelector('svg[aria-hidden="true"]')).not.toBeNull()
  })
  it('opens external project links safely', () => {
    render(<App />)
    for (const project of archive) {
      const code = screen.getByRole('link', { name: new RegExp(`^Code\\s*for ${project.name}`) })
      expect(code).toHaveAttribute('href', project.repo)
      expect(code).toHaveAttribute('rel', 'noopener noreferrer')
    }
  })

  it('gives every image alt text', () => {
    render(<App />)
    for (const img of screen.getAllByRole('img')) {
      expect(img).toHaveAttribute('alt')
    }
  })
  it('shows a coming-soon card before the older projects', () => {
    render(<App />)
    const projects = screen.getByRole('region', { name: 'Things I’ve built on my own.' })
    const cards = within(projects).getAllByRole('article')
    expect(cards[0]).toHaveTextContent('Coming soon')
    expect(cards).toHaveLength(archive.length + 1)
  })
  it('opens and closes the phone menu', () => {
    render(<App />)
    const toggle = screen.getByRole('button', { name: 'Open menu' })
    expect(toggle).toHaveAttribute('aria-expanded', 'false')

    fireEvent.click(toggle)
    expect(toggle).toHaveAttribute('aria-expanded', 'true')
    expect(toggle).toHaveAccessibleName('Close menu')

    // Choosing a link closes the menu again.
    const nav = screen.getByRole('navigation', { name: 'Main' })
    fireEvent.click(within(nav).getByRole('link', { name: 'Projects' }))
    expect(toggle).toHaveAttribute('aria-expanded', 'false')

    // So does Escape.
    fireEvent.click(toggle)
    fireEvent.keyDown(window, { key: 'Escape' })
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
  })
  it('keeps the LinkedIn and GitHub buttons named by their text, not their logos', () => {
    render(<App />)
    const contactSection = screen.getByRole('region', { name: 'Let’s talk.' })
    for (const name of ['LinkedIn', 'GitHub']) {
      const link = within(contactSection).getByRole('link', { name: new RegExp(`^${name}`) })
      expect(link.querySelector('svg')).toHaveAttribute('aria-hidden', 'true')
    }
  })
  it('opens every link to another website in a new tab', () => {
    const { container } = render(<App />)
    const external = [...container.querySelectorAll<HTMLAnchorElement>('a[href^="http"]')]
    expect(external.length).toBeGreaterThan(0)
    for (const link of external) {
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', 'noopener noreferrer')
      expect(link).toHaveTextContent('(opens in a new tab)')
    }
  })

  it('keeps links within the page in the same tab', () => {
    const { container } = render(<App />)
    for (const link of container.querySelectorAll('a[href^="#"]')) {
      expect(link).not.toHaveAttribute('target')
    }
  })
  it('shows the whole contact conversation when it can’t animate', () => {
    // jsdom has no IntersectionObserver, like a browser that can't play the thread.
    const { container } = render(<App />)
    const contactSection = container.querySelector('#contact')
    const hidden = contactSection?.querySelectorAll('[data-shown="false"]:not([aria-hidden])')
    expect(hidden).toHaveLength(0)
  })
  it('lets screen readers find the contact links before the thread plays', () => {
    render(<App />)
    const contactSection = screen.getByRole('region', { name: 'Let’s talk.' })
    expect(within(contactSection).getByRole('link', { name: /^LinkedIn/ })).toBeInTheDocument()
    expect(within(contactSection).getByText(/engineering and customers meet/)).toBeInTheDocument()
  })
})
