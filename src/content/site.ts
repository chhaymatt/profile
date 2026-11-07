// All copy for the site lives here, so wording can change without touching components.
// Placeholders are `null` and their UI is hidden until they're filled in.

export interface Link {
  label: string
  href: string
}

export interface WorkItem {
  id: string
  title: string
  industry: string
  summary: string
  tags: string[]
}

export type SkillIconName = 'code' | 'cloud' | 'testing' | 'design'

export interface SkillGroup {
  label: string
  icon: SkillIconName
  items: string[]
}

export interface CredentialGroup {
  label: string
  items: string[]
}

export interface Hobby {
  id: string
  label: string
  description: string
}

export interface ArchiveProject {
  id: string
  name: string
  summary: string
  stack: string[]
  image: string
  demo?: string
  repo: string
  /** Shown instead of "Live demo" when there's nothing to click through to. */
  note?: string
}

export const profile = {
  name: 'Matthew Chhay',
  greeting: 'Hi, I’m Matthew',
  photo: '/images/matthew.webp',
  role: 'Software Engineer',
  location: 'Sydney',
  headline:
    'I like working directly with customers: understanding the problem, building something quickly, and improving it until it’s actually useful.',
  intro:
    'I’ve built and shaped software for teams in financial services, telecommunications, mining and government.',
}

export const contact = {
  email: null as string | null,
  linkedin: 'https://www.linkedin.com/in/matthewchhay/',
  github: 'https://github.com/chhaymatt',
  cvUrl: null as string | null,
}

export const work: WorkItem[] = [
  {
    id: 'quote-and-purchase',
    title: 'Rebuilding quote and purchase journeys',
    industry: 'Insurance',
    summary: 'Rebuilt insurance quote and purchase flows in React.',
    tags: ['React', 'Storybook', 'Monitoring'],
  },
  {
    id: 'reconciliation',
    title: 'Automating reconciliation',
    industry: 'Financial services',
    summary: 'Built an engine that spots mismatches between systems and raises incidents.',
    tags: ['Python', 'AWS', 'Automation'],
  },
  {
    id: 'offline-manual',
    title: 'An operations manual that works offline',
    industry: 'Telecommunications',
    summary: 'Built a tool that turns a long Word manual into a single searchable HTML page.',
    tags: ['JavaScript', 'AI tooling', 'Prototyping'],
  },
  {
    id: 'six-week-prototype',
    title: 'Asset visibility, prototyped in six weeks',
    industry: 'Telecommunications',
    summary:
      'Built the frontend and dashboards, demoing working software to the client every week.',
    tags: ['Frontend', 'AWS', 'Prototyping'],
  },
]

export const experience = {
  title: 'Client-facing engineering in technology consulting.',
  summary:
    'My work ranges from hands-on builds to early discovery and planning. Beyond the projects above, I’ve worked on cloud migration, deployment automation, operating-model and requirements work across software, superannuation, mining, media and government.',
}

export const skills: SkillGroup[] = [
  {
    label: 'Languages and frameworks',
    icon: 'code',
    items: [
      'TypeScript',
      'JavaScript',
      'React',
      'HTML',
      'CSS/SASS',
      'Python',
      'Java (Spring Boot)',
    ],
  },
  {
    label: 'Cloud and infrastructure',
    icon: 'cloud',
    items: ['AWS', 'Azure', 'Terraform', 'PowerShell', 'YAML', 'Azure DevOps', 'Bamboo'],
  },
  {
    label: 'Testing and observability',
    icon: 'testing',
    items: ['Storybook', 'New Relic', 'Splunk'],
  },
  {
    label: 'Design and delivery',
    icon: 'design',
    items: [
      'Figma',
      'Mural',
      'draw.io',
      'Jira',
      'Confluence',
      'Requirements workshops',
      'Solution design',
    ],
  },
]

// Grouped by who issued them, to read like a spec sheet.
export const credentials: CredentialGroup[] = [
  {
    label: 'Microsoft',
    items: [
      'Azure Administrator Associate (AZ‑104)',
      'Azure Virtual Desktop Specialty (AZ‑140)',
      'Azure Fundamentals',
      'Azure Data Fundamentals',
      'Azure AI Fundamentals',
    ],
  },
  { label: 'AWS', items: ['Certified Cloud Practitioner'] },
  { label: 'Datadog', items: ['Technical Specialist'] },
  { label: 'CloudBolt', items: ['Cost Practitioner', 'Cost Administrator'] },
  { label: 'University of Adelaide', items: ['Bachelor of Engineering (Civil and Structural)'] },
]

export const outside =
  'Most weeks you’ll find me out for a run, at the bouldering wall, at the gym or on a pickleball court. Bouldering is my favourite of the lot: you try a problem, fall off, adjust, and try again until it goes. It’s a bit like building software.'

export const hobbies: Hobby[] = [
  {
    id: 'running',
    label: 'Running',
    description: 'Working up from the Hoka Half Marathon to the Gold Coast Marathon in 2027.',
  },
  {
    id: 'bouldering',
    label: 'Bouldering',
    description: 'Climbing level 3 problems at my gym.',
  },
  {
    id: 'gym',
    label: 'Gym',
    description: 'Strength work that keeps the running and climbing going.',
  },
  {
    id: 'pickleball',
    label: 'Pickleball',
    description: 'Quick, social and a lot of fun.',
  },
]

export const code = {
  /** Set this once the new project has a link; the coming-soon card then links to it. */
  current: null as Link | null,
  comingSoon: {
    title: 'Something new is on the way',
    body: 'I’m building it now. Check back soon.',
  },
  lead: 'Two projects from earlier in my career, with something new on the way.',
}

// Personal projects carried over from the original matthewchhay.com. Kept to two so the
// section isn't all old work; the coming-soon card sits in front of them.
export const archive: ArchiveProject[] = [
  {
    id: 'employee-creator',
    name: 'employeeCreator',
    summary:
      'An employee tracking system for viewing, adding, editing and removing employee details.',
    stack: ['React', 'TypeScript', 'Spring Boot', 'Java'],
    image: '/images/projects/employeeCreator.webp',
    repo: 'https://github.com/chhaymatt/employeeCreator',
  },
  {
    id: 'eshop',
    name: 'eShop',
    summary: 'An online shop for browsing products, backed by a Firestore database.',
    stack: ['React', 'JavaScript', 'Firestore'],
    image: '/images/projects/eShop.webp',
    demo: 'https://chhaymatt.github.io/plushpals',
    repo: 'https://github.com/chhaymatt/plushpals',
  },
]

// Shown as message bubbles from me in the Let's talk section, in this order.
export const contactGreeting = 'Hi there!'

export const contactCopy =
  'If you’re working on something where engineering and customers meet, I’d love to hear about it.'
