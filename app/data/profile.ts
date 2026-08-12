import type { SocialLink, Experience, Localized } from '~/types'

// Career start: first professional role (software factory at ITLP, Apr 2026).
// Rounds up to a floor of 1, so the site reads "1 year" until Apr 2027.
const CAREER_START = new Date('2026-04-01')
export const yearsOfExperience = Math.max(
  1,
  Math.floor((Date.now() - CAREER_START.getTime()) / (365.25 * 24 * 60 * 60 * 1000)),
)

// Spanish and English both need singular/plural agreement — interpolating the
// bare number produced "más de 1 años".
const yearsLabel = {
  en: `${yearsOfExperience} ${yearsOfExperience === 1 ? 'year' : 'years'}`,
  es: `${yearsOfExperience} ${yearsOfExperience === 1 ? 'año' : 'años'}`,
}

export const profile = {
  name: 'Alejandro Alejandre Tafolla',
  title: {
    en: 'Full Stack Developer',
    es: 'Desarrollador Full Stack'
  },
  shortBio: {
    en: `Full Stack developer with ${yearsLabel.en} of experience building production-level web and mobile applications. I integrate AI across my entire workflow: coding agents, MCP servers and subagents, plus LLMs inside the products I ship.`,
    es: `Desarrollador Full Stack con ${yearsLabel.es} de experiencia construyendo aplicaciones web y móviles de nivel de producción. Integro IA en todo mi flujo de trabajo: agentes de código, servidores MCP y subagentes, además de LLMs dentro de los productos que construyo.`
  },
  longBio: {
    en: `Computer Systems Engineering student (final year), currently working as a full stack developer at Maker Center de México, as an AI Engineer at KAIVA, and as part of the software factory at Instituto Tecnológico de La Piedad. I have ${yearsLabel.en} of hands-on experience building MVPs and production software, including a delivery platform (Kivo) and a personalized experiences marketplace (MiCompli). I design backend architectures following the hexagonal pattern, build RAG systems, and work with an AI-first development workflow — Claude Code as a daily coding agent, MCP servers to connect my tools, and specialized subagents for exploration, planning and review. Passionate about backend architecture, clean API design, and scalable full-stack solutions.`,
    es: `Estudiante de Ingeniería en Sistemas Computacionales (último año), actualmente trabajando como desarrollador full stack en Maker Center de México, como Ingeniero en Inteligencia Artificial en KAIVA y como parte de la fábrica de software del Instituto Tecnológico de La Piedad. Tengo ${yearsLabel.es} de experiencia práctica construyendo MVPs y software en producción, incluyendo una plataforma de delivery (Kivo) y un marketplace de experiencias personalizadas (MiCompli). Diseño arquitecturas backend siguiendo el patrón hexagonal, construyo sistemas RAG y trabajo con un flujo de desarrollo centrado en IA — Claude Code como agente de código diario, servidores MCP para conectar mis herramientas y subagentes especializados para exploración, planeación y revisión. Apasionado por la arquitectura backend, el diseño de APIs limpias y las soluciones full-stack escalables.`
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
      en: 'Full Stack Developer',
      es: 'Programador Full Stack'
    },
    company: 'Maker Center de México',
    period: 'Jul 2026 — Present',
    description: {
      en: 'Full stack development on a training contract, remote. Building product features with TypeScript and Supabase.',
      es: 'Desarrollo full stack bajo contrato de formación, en remoto. Construyo funcionalidades de producto con TypeScript y Supabase.'
    },
    tags: ['TypeScript', 'Supabase', 'Remote'],
  },
  {
    id: 2,
    type: 'work',
    title: {
      en: 'AI Engineer',
      es: 'Ingeniero en Inteligencia Artificial'
    },
    company: 'KAIVA',
    period: 'Jul 2026 — Present',
    description: {
      en: 'Part-time AI engineering, remote. Building retrieval-augmented generation (RAG) systems and LLM-backed features.',
      es: 'Ingeniería de IA a jornada parcial, en remoto. Construyo sistemas de generación aumentada por recuperación (RAG) y funcionalidades respaldadas por LLMs.'
    },
    tags: ['RAG', 'LLM', 'AI Engineering', 'Remote'],
  },
  {
    id: 3,
    type: 'work',
    title: {
      en: 'Full Stack Developer — Software Factory',
      es: 'Programador Full Stack — Fábrica de Software'
    },
    company: 'Instituto Tecnológico de La Piedad',
    period: 'Apr 2026 — Present',
    description: {
      en: "Part of the institute's software factory, developing end-to-end full stack solutions. I design backend architectures following the hexagonal pattern, applying professional practices: version control, code review and agile iterations.",
      es: 'Formo parte de la fábrica de software del Instituto Tecnológico de La Piedad, donde desarrollo soluciones fullstack end-to-end. Diseño arquitecturas backend siguiendo el patrón hexagonal, aplicando prácticas profesionales: control de versiones, code review e iteraciones ágiles.'
    },
    tags: ['Hexagonal Architecture', 'Supabase', 'Code Review', 'Agile'],
  },
  {
    id: 4,
    type: 'work',
    title: {
      en: 'Full Stack Developer',
      es: 'Programador Full Stack'
    },
    company: 'MiCompli',
    period: 'Apr 2026 — May 2026',
    description: {
      en: 'Temporary contract, remote. Built the MVP of a marketplace for personalized gifts and experiences with TypeScript and Supabase, taking it from idea to a deployed product.',
      es: 'Contrato temporal, en remoto. Construí el MVP de un marketplace de regalos y experiencias personalizadas con TypeScript y Supabase, llevándolo de la idea a un producto desplegado.'
    },
    tags: ['TypeScript', 'Supabase', 'Next.js', 'MVP'],
  },
  {
    id: 5,
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
    id: 6,
    type: 'certification',
    title: {
      en: 'AI Fluency Framework & Foundations',
      es: 'AI Fluency Framework & Foundations'
    },
    company: 'Anthropic',
    period: 'Jul 2026',
    description: {
      en: 'Framework and foundations for working fluently and effectively alongside AI systems.',
      es: 'Marco de trabajo y fundamentos para trabajar de forma fluida y efectiva junto a sistemas de IA.'
    },
    tags: ['AI', 'Anthropic'],
  },
  {
    id: 7,
    type: 'certification',
    title: {
      en: 'Claude Code 101',
      es: 'Claude Code 101'
    },
    company: 'Anthropic',
    period: 'Jul 2026',
    description: {
      en: 'Foundations of agentic development with Claude Code as a daily coding agent.',
      es: 'Fundamentos del desarrollo agéntico usando Claude Code como agente de código diario.'
    },
    tags: ['Claude Code', 'AI', 'Agents'],
  },
  {
    id: 8,
    type: 'certification',
    title: {
      en: 'Introduction to Subagents',
      es: 'Introducción a Subagentes'
    },
    company: 'Anthropic',
    period: 'Jun 2026',
    description: {
      en: 'Designing and orchestrating specialized subagents for exploration, planning and review.',
      es: 'Diseño y orquestación de subagentes especializados para exploración, planeación y revisión.'
    },
    tags: ['Subagents', 'AI', 'Orchestration'],
  },
  {
    id: 9,
    type: 'certification',
    title: {
      en: 'Building with Claude Code',
      es: 'Construyendo con Claude Code'
    },
    company: 'Anthropic',
    period: 'Jun 2026',
    description: {
      en: 'Hands-on practices for building real software with Claude Code in a production workflow.',
      es: 'Prácticas aplicadas para construir software real con Claude Code en un flujo de trabajo de producción.'
    },
    tags: ['Claude Code', 'AI', 'Workflow'],
  },
  {
    id: 10,
    type: 'certification',
    title: {
      en: 'Introduction to Model Context Protocol',
      es: 'Introducción al Model Context Protocol'
    },
    company: 'Anthropic',
    period: 'May 2026',
    description: {
      en: 'Connecting tools and data sources to AI agents through MCP servers.',
      es: 'Conexión de herramientas y fuentes de datos a agentes de IA mediante servidores MCP.'
    },
    tags: ['MCP', 'AI', 'Tooling'],
  },
  {
    id: 11,
    type: 'certification',
    title: {
      en: 'CCNA: Enterprise Networking, Security, and Automation',
      es: 'CCNA: Enterprise Networking, Security, and Automation'
    },
    company: 'Cisco',
    period: 'May 2026',
    description: {
      en: 'Enterprise networking, security fundamentals and network automation.',
      es: 'Redes empresariales, fundamentos de seguridad y automatización de redes.'
    },
    tags: ['Networking', 'Security', 'Automation'],
  },
  {
    id: 12,
    type: 'certification',
    title: {
      en: 'AWS Academy Graduate — Cloud Foundations',
      es: 'AWS Academy Graduate — Cloud Foundations'
    },
    company: 'Amazon Web Services',
    period: 'Mar 2026',
    description: {
      en: 'Foundational understanding of AWS Cloud concepts, security, deployment, and architecture.',
      es: 'Comprensión fundamental de los conceptos de la nube de AWS, seguridad, despliegue y arquitectura.'
    },
    tags: ['AWS', 'Cloud Computing'],
  },
  {
    id: 13,
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
    id: 14,
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
