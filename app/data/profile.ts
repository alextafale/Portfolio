import type { SocialLink, Experience, Localized } from '~/types'

// Career start: first production-level projects (2024)
const CAREER_START = new Date('2024-01-01')
export const yearsOfExperience = Math.max(
  1,
  Math.floor((Date.now() - CAREER_START.getTime()) / (365.25 * 24 * 60 * 60 * 1000)),
)

export const profile = {
  name: 'Alejandro Alejandre Tafolla',
  title: {
    en: 'Full Stack Developer',
    es: 'Desarrollador Full Stack'
  },
  shortBio: {
    en: `Full Stack developer with ${yearsOfExperience}+ years building production-level web and mobile applications. I integrate AI across my entire workflow: coding agents, MCP servers and subagents, plus LLMs inside the products I ship.`,
    es: `Desarrollador Full Stack con más de ${yearsOfExperience} años construyendo aplicaciones web y móviles de nivel de producción. Integro IA en todo mi flujo de trabajo: agentes de código, servidores MCP y subagentes, además de LLMs dentro de los productos que construyo.`
  },
  longBio: {
    en: `Computer Systems Engineering student (final year) and member of the software factory at Instituto Tecnológico de La Piedad since April 2026. I have ${yearsOfExperience}+ years of hands-on experience building MVPs for early-stage startups, including a delivery platform (Kivo) and a personalized experiences marketplace (MiCompli). I work with an AI-first development workflow — Claude Code as a daily coding agent, MCP servers to connect my tools, and specialized subagents for exploration, planning and review — and I ship LLM-powered features like Kivo's support chatbot. Passionate about backend architecture, clean API design, and scalable full-stack solutions.`,
    es: `Estudiante de Ingeniería en Sistemas Computacionales (último año) y miembro de la fábrica de software del Instituto Tecnológico de La Piedad desde abril de 2026. Tengo más de ${yearsOfExperience} años de experiencia práctica construyendo MVPs para startups en etapa temprana, incluyendo una plataforma de delivery (Kivo) y un marketplace de experiencias personalizadas (MiCompli). Trabajo con un flujo de desarrollo centrado en IA — Claude Code como agente de código diario, servidores MCP para conectar mis herramientas y subagentes especializados para exploración, planeación y revisión — y construyo funcionalidades con LLMs como el chatbot de soporte de Kivo. Apasionado por la arquitectura backend, el diseño de APIs limpias y las soluciones full-stack escalables.`
  },
  location: {
    en: 'Mexico',
    es: 'México'
  },
  email: 'tafoyaalex32@gmail.com',
  availableForWork: true,
}

export const stats: { value: string; label: Localized }[] = [
  {
    value: `${yearsOfExperience}+`,
    label: { en: 'Years of experience', es: 'Años de experiencia' },
  },
  {
    value: '10+',
    label: { en: 'Projects built', es: 'Proyectos construidos' },
  },
  {
    value: '15+',
    label: { en: 'Technologies used', es: 'Tecnologías dominadas' },
  },
]

export const socialLinks: SocialLink[] = [
  {
    name: 'GitHub',
    url: 'https://github.com/alextafale',
    icon: 'github',
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/alextafale',
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
      en: 'Software Developer — Software Factory',
      es: 'Desarrollador de Software — Fábrica de Software'
    },
    company: 'Instituto Tecnológico de La Piedad',
    period: 'Apr 2026 — Present',
    description: {
      en: "Part of the institute's software factory, building real software projects for actual clients as part of a development team, applying professional practices: version control, code review and agile iterations.",
      es: 'Formo parte de la fábrica de software del instituto, desarrollando proyectos de software reales para clientes como parte de un equipo de desarrollo, aplicando prácticas profesionales: control de versiones, code review e iteraciones ágiles.'
    },
    tags: ['Teamwork', 'Code Review', 'Agile'],
  },
  {
    id: 2,
    type: 'work',
    title: {
      en: 'MVP Developer for Startups',
      es: 'Desarrollador de MVPs para Startups'
    },
    company: 'Startups & Freelance',
    period: '2024 — Present',
    description: {
      en: 'Built MVPs for early-stage startups, taking products from idea to production: the delivery platform Kivo and the experiences marketplace MiCompli, plus backend services with FastAPI, Node.js and React Native — with an AI-first workflow built on Claude Code, MCP servers and subagents.',
      es: 'He construido MVPs para startups en etapa temprana, llevando productos de la idea a producción: la plataforma de delivery Kivo y el marketplace de experiencias MiCompli, además de servicios backend con FastAPI, Node.js y React Native — con un flujo de trabajo centrado en IA basado en Claude Code, servidores MCP y subagentes.'
    },
    tags: ['MVPs', 'React Native', 'FastAPI', 'Supabase', 'Claude API'],
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
      en: 'Final-year student with hands-on experience building production-level applications.',
      es: 'Estudiante de último año con experiencia práctica construyendo aplicaciones de nivel de producción.'
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
