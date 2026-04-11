import type { SocialLink, Experience } from '~/types'

export const profile = {
  name: 'Alejandro Alejandre Tafolla',
  title: 'Full Stack Developer',
  shortBio: 'Software developer passionate about building innovative web and mobile solutions that make a difference.',
  longBio: `I'm a Full Stack Developer with experience building scalable web and mobile applications.
  I enjoy crafting clean, efficient code and intuitive user experiences. From backend APIs to polished frontends —
  I love the entire development journey.`,
  location: 'Mexico',
  email: 'your@email.com', // TODO: Replace with your real email
  availableForWork: true,
  // Image: place your photo at app/assets/images/profile.jpg
  // Then uncomment the line below and remove the placeholder
  // avatar: '/images/profile.jpg',
}

export const socialLinks: SocialLink[] = [
  {
    name: 'GitHub',
    url: 'https://github.com/alextafale', // TODO: Replace with your GitHub URL
    icon: 'github',
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/YOUR_PROFILE', // TODO: Replace with your LinkedIn URL
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
    company: 'Your Company / Freelance',
    period: '2023 — Present',
    description: 'Building web and mobile applications with Vue, Nuxt, Supabase and Expo.',
    tags: ['Vue', 'Nuxt', 'Supabase', 'TypeScript'],
  },
  {
    id: 2,
    type: 'education',
    title: 'Software Engineering / Computer Science',
    company: 'Your University',
    period: '2020 — 2024',
    description: 'Studied software engineering, algorithms, databases and software architecture.',
    tags: ['Java', 'Python', 'SQL', 'Algorithms'],
  },
  {
    id: 3,
    type: 'certification',
    title: 'AWS Certified Cloud Practitioner',
    company: 'Amazon Web Services',
    period: '2023',
    description: 'Foundational understanding of AWS Cloud concepts, security, and architecture.',
    tags: ['AWS', 'Cloud'],
  },
]
