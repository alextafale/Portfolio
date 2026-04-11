import type { Project } from '~/types'

export const projects: Project[] = [
  {
    id: 1,
    slug: 'project-school',
    title: 'Project-school',
    description: {
      en: 'A mobile application using Expo.',
      es: 'Una aplicación móvil utilizando Expo.'
    },
    longDescription: {
      en: 'This mobile application was developed as part of a school project to streamline student communication and course management. Built with React Native and Expo, it features real-time notifications and an intuitive UI.',
      es: 'Esta aplicación móvil fue desarrollada como parte de un proyecto escolar para agilizar la comunicación de los estudiantes y la gestión de cursos. Construida con React Native y Expo, cuenta con notificaciones en tiempo real y una interfaz de usuario intuitiva.'
    },
    tags: ['TypeScript', 'Expo', 'React Native'],
    features: {
      en: ['Real-time notifications', 'Course management', 'Offline support'],
      es: ['Notificaciones en tiempo real', 'Gestión de cursos', 'Soporte offline']
    },
    githubUrl: 'https://github.com/alextafale/Project-school',
    featured: true,
  },
  {
    id: 2,
    slug: 'kivo',
    title: 'Kivo',
    description: {
      en: 'TypeScript project repository.',
      es: 'Repositorio de proyecto TypeScript.'
    },
    longDescription: {
      en: 'Kivo is a high-performance logistics and delivery platform designed for scalability. It utilizes a robust TypeScript backend to handle complex route optimization and real-time tracking.',
      es: 'Kivo es una plataforma de logística y entrega de alto rendimiento diseñada para la escalabilidad. Utiliza un robusto backend de TypeScript para manejar optimización de rutas complejas y seguimiento en tiempo real.'
    },
    tags: ['TypeScript', 'FastAPI', 'PostgreSQL'],
    githubUrl: 'https://github.com/alextafale/Kivo',
    featured: true,
  },
  {
    id: 3,
    slug: 'metodos-generativos',
    title: 'Metodos-generativos',
    description: {
      en: 'Generate pseudonumbers with all tests and methods.',
      es: 'Genera pseudo-números con todas las pruebas y métodos.'
    },
    tags: ['HTML', 'JavaScript'],
    githubUrl: 'https://github.com/alextafale/Metodos-generativos',
    liveUrl: 'https://metodos-generativos.vercel.app',
    featured: false,
  },
  {
    id: 4,
    slug: 'practices-of-go',
    title: 'Practices-of-Go',
    description: {
      en: 'Practicing Go for a work about blockchains.',
      es: 'Practicando Go para un trabajo sobre blockchains.'
    },
    tags: ['Go', 'Blockchain'],
    githubUrl: 'https://github.com/alextafale/Practices-of-Go',
    featured: false,
  },
]
