import type { SocialLink, Experience } from '~/types'

export const profile = {
  name: 'Alejandro Alejandre Tafolla',
  title: 'Full Stack Developer',
  shortBio: '8th-semester Computer Systems Engineering student with hands-on experience building production-level applications.',
  longBio: `8th-semester Computer Systems Engineering student with hands-on experience building production-level applications, including a delivery platform and a real-world service marketplace. Passionate about backend architecture, clean API design, and creating scalable full-stack solutions.`,
  location: 'Mexico',
  email: 'tafoyaalex32@gmail.com',
  availableForWork: true,
}

export const socialLinks: SocialLink[] = [
  {
    name: 'GitHub',
    url: 'https://github.com/alextafale', // TODO: Replace with your GitHub URL
    icon: 'github',
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/alejandro-alejandretafolla-8a4a49267',
    icon: 'linkedin',
  },
  {
    name: 'Email',
    url: 'tafoyaalex32@gmail.com', // TODO: Replace with your email
    icon: 'mail',
  },
]

export const experiences: Experience[] = [
  {
    id: 1,
    type: 'work',
    title: 'Full Stack Developer',
    company: 'Freelance & Personal Projects',
    period: '2024 — Present',
    description: 'Developed production-level applications including a delivery platform (Kivo) and backend services with FastAPI, Spring Boot, and React Native.',
    tags: ['React Native', 'FastAPI', 'Supabase', 'Spring Boot'],
  },
  {
    id: 2,
    type: 'work',
    title: ' Go Developer',
    company: 'Altrueer',
    period: 'Feb 2026 - Present',
    description: '',
    tags: ['Go', 'Cosmos SDK']
  },
  {
    id: 3,
    type: 'education',
    title: 'Computer Systems Engineering',
    company: 'Tecnológico Nacional de México',
    period: '2022 — Present',
    description: 'Current 8th-semester student with hands-on experience building production-level applications.',
    tags: ['Software Engineering', 'System Architecture'],
  },
  {
    id: 4,
    type: 'certification',
    title: 'Building with the Claude API',
    company: 'Anthropic Academy',
    period: '2025',
    description: 'Hands-on experience and best practices for building AI-powered applications using Anthropic Claude models.',
    tags: ['AI', 'LLM', 'Claude'],
  },
  {
    id: 5,
    type: 'certification',
    title: 'AWS Academy Graduate – Cloud Foundations',
    company: 'Amazon Web Services',
    period: '2025',
    description: 'Foundational understanding of AWS Cloud concepts, security, deployment, and architecture.',
    tags: ['AWS', 'Cloud Computing'],
  },
  {
    id: 6,
    type: 'certification',
    title: 'Exploring AI Use Cases and Applications',
    company: 'Amazon Web Services',
    period: 'Mar 2026',
    description: 'Exploration of real-world AI use cases, machine learning workflows, and AWS AI services.',
    tags: ['AWS', 'AI Applications'],
  },
  {
    id: 7,
    type: 'certification',
    title: 'TypeScript: Tu completa guía y manual de mano',
    company: 'Udemy',
    period: 'Dec 2025',
    description: 'In-depth mastery of TypeScript, including advanced types, object-oriented concepts, and integration with modern frameworks.',
    tags: ['TypeScript', 'Frontend', 'Backend'],
  },
]
