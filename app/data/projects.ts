import type { Project } from '~/types'

export const projects: Project[] = [
  {
    id: 1,
    slug: 'project-school',
    title: 'Project-school',
    description: 'A mobile application using Expo.',
    longDescription: 'This mobile application was developed as part of a school project to streamline student communication and course management. Built with React Native and Expo, it features real-time notifications and an intuitive UI.',
    tags: ['TypeScript', 'Expo', 'React Native'],
    features: ['Real-time notifications', 'Course management', 'Offline support'],
    githubUrl: 'https://github.com/alextafale/Project-school',
    featured: true,
  },
  {
    id: 2,
    slug: 'kivo',
    title: 'Kivo',
    description: 'TypeScript project repository.',
    longDescription: 'Kivo is a high-performance logistics and delivery platform designed for scalability. It utilizes a robust TypeScript backend to handle complex route optimization and real-time tracking.',
    tags: ['TypeScript', 'FastAPI', 'PostgreSQL'],
    githubUrl: 'https://github.com/alextafale/Kivo',
    featured: true,
  },
  {
    id: 3,
    slug: 'metodos-generativos',
    title: 'Metodos-generativos',
    description: 'Generate pseudonumbers with all tests and methods.',
    tags: ['HTML', 'JavaScript'],
    githubUrl: 'https://github.com/alextafale/Metodos-generativos',
    liveUrl: 'https://metodos-generativos.vercel.app',
    featured: false,
  },
  {
    id: 4,
    slug: 'practices-of-go',
    title: 'Practices-of-Go',
    description: 'Practicing Go for a work about blockchains.',
    tags: ['Go', 'Blockchain'],
    githubUrl: 'https://github.com/alextafale/Practices-of-Go',
    featured: false,
  },
]
