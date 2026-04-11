import type { SocialLink, Experience } from '~/types'

export const profile = {
  name: 'Alejandro Alejandre Tafolla',
  title: {
    en: 'Full Stack Developer',
    es: 'Desarrollador Full Stack'
  },
  shortBio: {
    en: '8th-semester Computer Systems Engineering student with hands-on experience building production-level applications.',
    es: 'Estudiante de 8vo semestre de Ingeniería en Sistemas Computacionales con experiencia práctica construyendo aplicaciones de nivel de producción.'
  },
  longBio: {
    en: '8th-semester Computer Systems Engineering student with hands-on experience building production-level applications, including a delivery platform and a real-world service marketplace. Passionate about backend architecture, clean API design, and creating scalable full-stack solutions.',
    es: 'Estudiante de 8vo semestre de Ingeniería en Sistemas Computacionales con experiencia práctica construyendo aplicaciones de nivel de producción, incluyendo una plataforma de entrega y un mercado de servicios en el mundo real. Apasionado por la arquitectura backend, el diseño de APIs limpias y la creación de soluciones full-stack escalables.'
  },
  location: {
    en: 'Mexico',
    es: 'México'
  },
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
    url: 'mailto:tafoyaalex32@gmail.com',
    icon: 'mail',
  },
]

export const experiences: Experience[] = [
  {
    id: 1,
    type: 'work',
    title: {
      en: 'Full Stack Developer',
      es: 'Desarrollador Full Stack'
    },
    company: 'Freelance & Personal Projects',
    period: '2024 — Present',
    description: {
      en: 'Developed production-level applications including a delivery platform (Kivo) and backend services with FastAPI, Spring Boot, and React Native.',
      es: 'Desarrollé aplicaciones de nivel de producción, incluyendo una plataforma de entrega (Kivo) y servicios backend con FastAPI, Spring Boot y React Native.'
    },
    tags: ['React Native', 'FastAPI', 'Supabase', 'Spring Boot'],
  },
  {
    id: 2,
    type: 'work',
    title: {
      en: 'Go Developer',
      es: 'Desarrollador Go'
    },
    company: 'Altrueer',
    period: 'Feb 2026 - Present',
    description: {
      en: 'Specializing in blockchain solutions and Cosmos SDK.',
      es: 'Especializándome en soluciones blockchain y Cosmos SDK.'
    },
    tags: ['Go', 'Cosmos SDK']
  },
  {
    id: 3,
    type: 'education',
    title: {
      en: 'Computer Systems Engineering',
      es: 'Ingeniería en Sistemas Computacionales'
    },
    company: 'Tecnológico Nacional de México',
    period: '2022 — Present',
    description: {
      en: 'Current 8th-semester student with hands-on experience building production-level applications.',
      es: 'Estudiante actual de 8vo semestre con experiencia práctica construyendo aplicaciones de nivel de producción.'
    },
    tags: ['Software Engineering', 'System Architecture'],
  },
  {
    id: 4,
    type: 'certification',
    title: {
      en: 'Building with the Claude API',
      es: 'Construyendo con la API de Claude'
    },
    company: 'Anthropic Academy',
    period: '2025',
    description: {
      en: 'Hands-on experience and best practices for building AI-powered applications using Anthropic Claude models.',
      es: 'Experiencia práctica y mejores prácticas para construir aplicaciones potenciadas por IA utilizando modelos de Anthropic Claude.'
    },
    tags: ['AI', 'LLM', 'Claude'],
  },
  {
    id: 5,
    type: 'certification',
    title: {
      en: 'AWS Academy Graduate – Cloud Foundations',
      es: 'AWS Academy Graduate – Cloud Foundations'
    },
    company: 'Amazon Web Services',
    period: '2025',
    description: {
      en: 'Foundational understanding of AWS Cloud concepts, security, deployment, and architecture.',
      es: 'Comprensión fundamental de los conceptos de la nube de AWS, seguridad, despliegue y arquitectura.'
    },
    tags: ['AWS', 'Cloud Computing'],
  },
  {
    id: 6,
    type: 'certification',
    title: {
      en: 'Exploring AI Use Cases and Applications',
      es: 'Explorando Casos de Uso y Aplicaciones de IA'
    },
    company: 'Amazon Web Services',
    period: 'Mar 2026',
    description: {
      en: 'Exploration of real-world AI use cases, machine learning workflows, and AWS AI services.',
      es: 'Exploración de casos de uso de IA en el mundo real, flujos de trabajo de aprendizaje automático y servicios de IA de AWS.'
    },
    tags: ['AWS', 'AI Applications'],
  },
  {
    id: 7,
    type: 'certification',
    title: {
      en: 'TypeScript: Your Complete Guide and Manual',
      es: 'TypeScript: Tu completa guía y manual de mano'
    },
    company: 'Udemy',
    period: 'Dec 2025',
    description: {
      en: 'In-depth mastery of TypeScript, including advanced types, object-oriented concepts, and integration with modern frameworks.',
      es: 'Dominio profundo de TypeScript, incluyendo tipos avanzados, conceptos orientados a objetos e integración con frameworks modernos.'
    },
    tags: ['TypeScript', 'Frontend', 'Backend'],
  },
]
