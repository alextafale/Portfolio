import type { Capability, Credential, Experience, Localized, Skill, SocialLink } from '~/types'

/** Maker Center's app icon: Lucide's "rocket" (ISC licence), as on makercenter.mx. */
const makerCenterLogo =
  '<svg viewBox="0 0 24 24" fill="none" stroke="#4ac200" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">'
  + '<path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>'
  + '<path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09"/>'
  + '<path d="M9 12a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.4 22.4 0 0 1-4 2z"/>'
  + '<path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 .05 5 .05"/>'
  + '</svg>'

// Source: the CV in /public/cv (updated 2026-11-05), plus stack changes asked
// for directly (the site leaves out Go, Node.js and Firebase, which the CV
// still lists). When the CV changes, update this file and the PDF together.

export const profile = {
  name: 'Alejandro Alejandre Tafolla',
  /** Printed on the badge and the lanyard strap. */
  shortName: 'Alejandro Tafolla',
  handle: '@alextafale',
  title: { en: 'Full Stack Developer · AI Engineer', es: 'Desarrollador Full Stack · Ingeniero de IA' } as Localized,
  email: 'tafoyaalex32@gmail.com',
  location: { en: 'La Piedad, Mexico', es: 'La Piedad, México' } as Localized,
  /** Badge photo (wide crop) and about-section portrait (square). */
  photo: {
    badge: '/images/profile/alejandro-badge.jpg',
    portrait: '/images/profile/alejandro.jpg',
  },
  resumeUrl: '/cv/alejandro-alejandre-tafolla-cv.pdf',
  linkedin: 'https://www.linkedin.com/in/alextafale',
  github: 'https://github.com/alextafale',

  /** Two or three lines on the badge. */
  badgeBio: {
    en: 'Full stack developer and AI engineer. I design software end to end and take AI agents and models to production. Founder of Tendero.shop.',
    es: 'Desarrollador full stack e ingeniero de IA. Diseño software de punta a punta y llevo agentes y modelos de IA a producción. Fundador de Tendero.shop.',
  } as Localized,

  about: {
    en: [
      'Right now I combine my professional residency in Computer Systems Engineering at TecNM Instituto Tecnológico de La Piedad with three roles: full stack developer at Maker Center de México and at the institute, and AI engineer at Karvo.',
      'I founded Tendero.shop, an AI-powered point-of-sale SaaS for Mexican shops. At Karvo I build agentic systems in production with LangGraph, MCP, Mem0 and pgvector — and part of the job is knowing when a problem needs an agent and when a deterministic flow is enough.',
      'I use AI critically across the whole development cycle, from design to deployment: specs first with spec-driven development (SDD) and Spec Kit, then coding agents, MCP servers, and LLMs inside the product. The AI speeds things up; the judgment and the review stay mine.',
    ],
    es: [
      'Hoy combino mi residencia profesional de Ingeniería en Sistemas Computacionales en el TecNM Instituto Tecnológico de La Piedad con tres roles: programador full stack en Maker Center de México y en el Tec, e ingeniero de IA en Karvo.',
      'Fundé Tendero.shop, un punto de venta SaaS con IA para tiendas mexicanas. En Karvo construyo sistemas agénticos en producción con LangGraph, MCP, Mem0 y pgvector — y parte del trabajo es decidir cuándo un problema necesita un agente y cuándo basta con un flujo determinista.',
      'Integro la IA de manera crítica en todo el ciclo de desarrollo, del diseño al despliegue: primero la especificación, con desarrollo guiado por especificaciones (SDD) y Spec Kit; después agentes de código, servidores MCP y LLMs dentro del producto. La IA acelera; el criterio y la revisión siguen siendo míos.',
    ],
  } as Localized<string[]>,
}

export const experiences: Experience[] = [
  {
    company: 'Maker Center de México',
    role: { en: 'Full Stack Developer', es: 'Programador Full Stack' },
    period: { en: 'Jul 2026 — Present', es: 'Jul 2026 — Actual' },
    mark: { text: 'M', color: '#3a9e00', logo: { svg: makerCenterLogo, background: '#0c0c0c' } },
    summary: { en: 'Training contract · Remote', es: 'Contrato de formación · Remoto' },
    description: {
      en: 'I design before I code, and use AI as an accelerator without losing control of quality.',
      es: 'Diseño antes de codificar y uso la IA como acelerador sin perder el control de la calidad.',
    },
    highlights: {
      en: [
        'I split each feature into small tasks and define the data model and API contracts first.',
        'Typed, modular code (TypeScript, Python) with hexagonal architecture, keeping business logic apart from infrastructure.',
        'Claude Code and AI agents to generate, refactor and debug — reviewing and testing every change before merging it.',
      ],
      es: [
        'Divido cada funcionalidad en tareas pequeñas y defino primero el modelo de datos y los contratos de la API.',
        'Código tipado y modular (TypeScript, Python) con arquitectura hexagonal, separando la lógica de negocio de la infraestructura.',
        'Claude Code y agentes de IA para generar, refactorizar y depurar, revisando y probando cada cambio antes de integrarlo.',
      ],
    },
    site: { url: 'https://www.makercenter.mx', image: '/images/companies/makercenter.jpg' },
    short: { company: 'Maker Center' },
    current: true,
  },
  {
    company: 'Karvo',
    role: { en: 'AI Engineer', es: 'Ingeniero en Inteligencia Artificial' },
    period: { en: 'Jul 2026 — Present', es: 'Jul 2026 — Actual' },
    mark: { text: 'K', color: '#0052ff' },
    summary: { en: 'Part-time · Remote', es: 'Jornada parcial · Remoto' },
    description: {
      en: 'I take AI workflows from exploration to production: prototype, evaluate the results, iterate on the architecture and deploy.',
      es: 'Llevo flujos de IA de la exploración a producción: prototipo, evalúo resultados, itero la arquitectura y despliego.',
    },
    highlights: {
      en: [
        'Agentic systems in production with LangGraph, orchestrating multi-step flows with external tools over MCP.',
        'Persistent memory layers with Mem0 and semantic search over embeddings in PostgreSQL + pgvector.',
        'Judging when a problem needs an agent and when a deterministic flow is enough.',
      ],
      es: [
        'Sistemas agénticos en producción con LangGraph, orquestando flujos de varios pasos con herramientas externas vía MCP.',
        'Capas de memoria persistente con Mem0 y búsqueda semántica sobre embeddings en PostgreSQL + pgvector.',
        'Criterio para decidir cuándo un problema necesita un agente y cuándo basta con un flujo determinista.',
      ],
    },
    site: { url: 'https://karvo.lat/es', image: '/images/companies/karvo.jpg' },
    short: { role: { en: 'AI Engineer', es: 'Ingeniero de IA' } },
    current: true,
  },
  {
    company: 'Instituto Tecnológico de La Piedad',
    role: { en: 'Full Stack Developer', es: 'Programador Full Stack' },
    period: { en: 'Apr 2026 — Present', es: 'Abr 2026 — Actual' },
    mark: { text: 'IT', color: '#1b396a' },
    summary: { en: 'Part-time · Hybrid', es: 'Jornada parcial · Híbrido' },
    description: {
      en: 'I build incrementally: a minimal working version first, then refactor and optimise.',
      es: 'Construyo de forma incremental: primero una versión funcional mínima, después refactorizo y optimizo.',
    },
    highlights: {
      en: [
        'Methodical debugging: reproduce the bug, isolate the cause with logs and tests, and fix the root instead of patching symptoms.',
        'Data validation and edge cases from the start.',
        'Documented endpoints and technical decisions, so the code is easy to pick up again.',
      ],
      es: [
        'Depuro con método: reproduzco el error, aíslo la causa con logs y pruebas, y corrijo de raíz en lugar de parchar síntomas.',
        'Valido datos y contemplo casos límite desde el inicio.',
        'Documento endpoints y decisiones técnicas para que el código sea fácil de retomar.',
      ],
    },
    short: { company: 'TecNM ITLP' },
    current: true,
  },
  {
    company: 'MiCompli',
    role: { en: 'Full Stack Developer', es: 'Programador Full Stack' },
    period: { en: 'Apr — May 2026', es: 'Abr — May 2026' },
    mark: { text: 'MC', color: '#e11d48' },
    summary: { en: 'Temporary contract · Remote', es: 'Contrato temporal · Remoto' },
    description: {
      en: 'Shipped product features inside an established remote team, getting productive fast in an existing codebase.',
      es: 'Desarrollé funcionalidades de producto dentro de un equipo remoto establecido, integrándome rápido a un código base existente.',
    },
    current: false,
  },
]

export const education = {
  degree: { en: 'B.S. Computer Systems Engineering', es: 'Ing. en Sistemas Computacionales' } as Localized,
  school: 'TecNM — Instituto Tecnológico de La Piedad',
  period: { en: 'Professional resident · 2021 — Present', es: 'Residente profesional · 2021 — Actual' } as Localized,
}

export const languages: { name: Localized; level: Localized }[] = [
  { name: { en: 'Spanish', es: 'Español' }, level: { en: 'Native', es: 'Nativo' } },
  { name: { en: 'English', es: 'Inglés' }, level: { en: 'B2', es: 'B2' } },
]

// Newest first.
export const credentials: Credential[] = [
  { issuer: 'Anthropic', title: { en: 'AI Fluency: Framework & Foundations', es: 'AI Fluency: Framework & Foundations' }, date: '2026-07' },
  { issuer: 'Anthropic', title: { en: 'Claude Code 101', es: 'Claude Code 101' }, date: '2026-07' },
  { issuer: 'Anthropic', title: { en: 'Introduction to Subagents', es: 'Introduction to Subagents' }, date: '2026-06' },
  { issuer: 'Anthropic', title: { en: 'Building with Claude Code', es: 'Building with Claude Code' }, date: '2026-06' },
  { issuer: 'Anthropic', title: { en: 'Introduction to Model Context Protocol', es: 'Introduction to Model Context Protocol' }, date: '2026-05' },
  { issuer: 'Cisco', title: { en: 'CCNA: Enterprise Networking, Security, and Automation', es: 'CCNA: Enterprise Networking, Security, and Automation' }, date: '2026-05' },
  { issuer: 'Amazon Web Services', title: { en: 'Exploring Artificial Intelligence Use Cases and Applications', es: 'Exploring Artificial Intelligence Use Cases and Applications' }, date: '2026-03' },
  { issuer: 'Amazon Web Services', title: { en: 'AWS Academy Graduate — Cloud Foundations', es: 'AWS Academy Graduate — Cloud Foundations' }, date: '2026-03' },
]

/** Positioning statement that opens the about section. `**…**` marks the words
 *  that stay full-strength once the scroll reveal is done. */
export const statement: Localized = {
  en: 'I’m a **full stack software developer** and **AI engineer.** I design systems end to end — from backend and data to AI agents — and take them from idea to production.',
  es: 'Soy **desarrollador de software full stack** e **ingeniero de IA.** Diseño sistemas de punta a punta —del backend y los datos a los agentes de IA— y los llevo de la idea a producción.',
}

export const capabilities: Capability[] = [
  {
    title: { en: 'Mobile apps', es: 'Apps móviles' },
    description: {
      en: 'iOS and Android apps with React Native and Expo, from the first screen to the EAS build in the stores.',
      es: 'Apps para iOS y Android con React Native y Expo, de la primera pantalla a la build en EAS lista para las tiendas.',
    },
    tech: ['React Native', 'Expo', 'EAS Build'],
  },
  {
    title: { en: 'Full stack web', es: 'Web full stack' },
    description: {
      en: 'Complete web products with Next.js and Vue: server rendering, auth, dashboards and checkout flows, deployed for real users.',
      es: 'Productos web completos con Next.js y Vue: render en servidor, autenticación, paneles y flujos de compra, desplegados para usuarios reales.',
    },
    tech: ['Next.js', 'Vue', 'TypeScript'],
  },
  {
    title: { en: 'Backend & data', es: 'Backend y datos' },
    description: {
      en: 'REST APIs in FastAPI (Python) or Spring Boot (Java) on PostgreSQL, MySQL or MongoDB — with PostGIS when location matters — deployed on AWS, Render or Supabase.',
      es: 'APIs REST en FastAPI (Python) o Spring Boot (Java) sobre PostgreSQL, MySQL o MongoDB — con PostGIS cuando la ubicación importa — desplegadas en AWS, Render o Supabase.',
    },
    tech: ['FastAPI', 'PostgreSQL', 'AWS'],
  },
  {
    title: { en: 'Applied AI', es: 'IA aplicada' },
    description: {
      en: 'As an AI engineer at Karvo I take models and AI workflows to production: agents with LangGraph and LangChain, long-term memory with Mem0, semantic search with pgvector and forecasting with TimesFM.',
      es: 'Como ingeniero de IA en Karvo llevo modelos y flujos de IA a producción: agentes con LangGraph y LangChain, memoria a largo plazo con Mem0, búsqueda semántica con pgvector y pronósticos con TimesFM.',
    },
    tech: ['Claude API', 'LangGraph', 'MCP'],
  },
]

/** Technical skills, grouped as on the CV. */
export const skills: { label: Localized; items: Skill[] }[] = [
  {
    label: { en: 'Mobile & frontend', es: 'Mobile y frontend' },
    items: [
      { name: 'React', icon: 'react' }, { name: 'React Native', icon: 'react' }, { name: 'Expo', icon: 'expo' }, { name: 'TypeScript', icon: 'typescript' },
      { name: 'Next.js', icon: 'nextdotjs' }, { name: 'Vue', icon: 'vuedotjs' }, { name: 'Tailwind CSS', icon: 'tailwindcss' },
    ],
  },
  {
    label: { en: 'Backend', es: 'Backend' },
    items: [
      { name: 'FastAPI', icon: 'fastapi' }, { name: 'Python', icon: 'python' },
      { name: 'Java', icon: 'openjdk' }, { name: 'Spring Boot', icon: 'springboot' }, { name: 'REST APIs' },
    ],
  },
  {
    label: { en: 'Databases', es: 'Bases de datos' },
    items: [
      { name: 'Supabase', icon: 'supabase' }, { name: 'PostgreSQL', icon: 'postgresql' }, { name: 'PostGIS' },
      { name: 'MySQL', icon: 'mysql' }, { name: 'MongoDB', icon: 'mongodb' },
    ],
  },
  {
    label: { en: 'AI & LLMs', es: 'IA y LLMs' },
    items: [
      { name: 'Claude API', icon: 'claude' }, { name: 'Groq API' }, { name: 'TimesFM' },
      { name: 'PyTorch', icon: 'pytorch' }, { name: 'CUDA', icon: 'nvidia' },
    ],
  },
  {
    label: { en: 'Agents & RAG', es: 'Agentes y RAG' },
    items: [
      { name: 'LangGraph', icon: 'langgraph' }, { name: 'LangChain', icon: 'langchain' },
      { name: 'MCP', icon: 'modelcontextprotocol' }, { name: 'Mem0' }, { name: 'pgvector' },
    ],
  },
  {
    label: { en: 'AI-assisted development', es: 'Desarrollo con IA' },
    items: [
      { name: 'Spec-Driven Development' }, { name: 'Spec Kit' },
      { name: 'Claude Code', icon: 'claude' }, { name: 'Prompt Engineering' },
    ],
  },
  {
    label: { en: 'Cloud & tools', es: 'Cloud y herramientas' },
    items: [
      { name: 'AWS' }, { name: 'Docker', icon: 'docker' }, { name: 'Git', icon: 'git' }, { name: 'GitHub', icon: 'github' }, { name: 'EAS Build', icon: 'expo' },
      { name: 'Render', icon: 'render' }, { name: 'Vercel', icon: 'vercel' }, { name: 'Pop!_OS', icon: 'popos' },
      { name: 'VS Code' }, { name: 'Antigravity' }, { name: 'JetBrains', icon: 'jetbrains' },
    ],
  },
]

/** Short stack lines shown beside the badge in the hero. */
export const heroStack = ['TypeScript · React Native · Next.js', 'FastAPI · PostgreSQL · AWS', 'Claude API · LangGraph · MCP']

export const socialLinks: SocialLink[] = [
  { name: 'LinkedIn', url: profile.linkedin },
  { name: 'GitHub', url: profile.github },
]
