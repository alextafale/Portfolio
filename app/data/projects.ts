import type { Project } from '~/types'

export const projects: Project[] = [
  {
    id: 1,
    title: 'Project-school',
    description: 'A mobile application using Expo.',
    tags: ['TypeScript', 'Expo', 'React Native'],
    githubUrl: 'https://github.com/alextafale/Project-school',
    featured: true,
  },
  {
    id: 2,
    title: 'Kivo',
    description: 'TypeScript project repository.',
    tags: ['TypeScript'],
    githubUrl: 'https://github.com/alextafale/Kivo',
    featured: true,
  },
  {
    id: 3,
    title: 'Metodos-generativos',
    description: 'Generate pseudonumbers with all tests and methods.',
    tags: ['HTML', 'JavaScript'],
    githubUrl: 'https://github.com/alextafale/Metodos-generativos',
    liveUrl: 'https://metodos-generativos.vercel.app',
    featured: false,
  },
  {
    id: 4,
    title: 'Practices-of-Go',
    description: 'Practicing Go for a work about blockchains.',
    tags: ['Go', 'Blockchain'],
    githubUrl: 'https://github.com/alextafale/Practices-of-Go',
    featured: false,
  },
]
