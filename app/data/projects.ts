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
    svgVector: `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2">
      <!-- Phone body -->
      <rect x="30" y="15" width="40" height="70" rx="6" class="anim-shape-1" stroke="currentColor"/>
      <!-- Screen content -->
      <path d="M40 30h20M40 40h15M40 50h20M40 60h10" class="anim-shape-2" stroke-linecap="round"/>
      <!-- Home button -->
      <circle cx="50" cy="78" r="2" class="anim-shape-3" fill="currentColor"/>
      <!-- Notification badge -->
      <circle cx="65" cy="25" r="4" class="anim-shape-4" fill="var(--color-accent-3)" stroke="none" />
    </svg>`,
    images: [
      '/images/mockups/projectschool.png'
    ],
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
    tags: ['TypeScript', 'FastAPI', 'PostgreSQL', 'Expo', 'React Native'],
    svgVector: `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2">
      <!-- Route path -->
      <path d="M20 80 Q 40 40 80 20" stroke-dasharray="4 4" class="anim-shape-1" />
      <!-- Location markers -->
      <circle cx="20" cy="80" r="4" class="anim-shape-2" fill="currentColor" />
      <circle cx="80" cy="20" r="4" class="anim-shape-2" fill="currentColor" />
      <!-- Package box -->
      <polygon points="40,50 50,45 60,50 60,60 50,65 40,60" class="anim-shape-3" stroke="currentColor" stroke-linejoin="round" />
      <path d="M40 50 L 50 55 L 60 50 M 50 55 L 50 65" class="anim-shape-4" />
    </svg>`,
    images: [
      '/images/mockups/kivo.png'
    ],
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
    svgVector: `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2">
      <!-- Grid / Graph axes -->
      <path d="M20 20 v60 h60" class="anim-shape-1" />
      <!-- Bar charts -->
      <rect x="30" y="50" width="10" height="30" class="anim-shape-2" fill="currentColor" fill-opacity="0.2"/>
      <rect x="50" y="30" width="10" height="50" class="anim-shape-3" fill="currentColor" fill-opacity="0.2"/>
      <rect x="70" y="60" width="10" height="20" class="anim-shape-4" fill="currentColor" fill-opacity="0.2"/>
      <!-- Line chart -->
      <path d="M35 50 L 55 30 L 75 60" class="anim-shape-5" stroke="var(--color-accent-3)" />
    </svg>`,
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
    svgVector: `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2">
      <!-- Hexagons / Blockchain Nodes -->
      <polygon points="30,25 45,35 45,55 30,65 15,55 15,35" class="anim-shape-1" stroke="currentColor" />
      <polygon points="70,45 85,55 85,75 70,85 55,75 55,55" class="anim-shape-2" stroke="currentColor" />
      <!-- Connection link -->
      <path d="M45 45 L 55 65" class="anim-shape-3" stroke-dasharray="3 3"/>
      <!-- Inner core points -->
      <circle cx="30" cy="45" r="3" class="anim-shape-4" fill="var(--color-accent-2)" stroke="none"/>
      <circle cx="70" cy="65" r="3" class="anim-shape-5" fill="var(--color-accent-2)" stroke="none"/>
    </svg>`,
    githubUrl: 'https://github.com/alextafale/Practices-of-Go',
    featured: false,
  },
  {
    id: 5,
    slug: 'quik-sale',
    title: 'Quik-Sale',
    description: {
      en: 'A fast commerce app for local sales.',
      es: 'Una aplicación rápida de comercio para ventas locales.'
    },
    longDescription: {
      en: 'Quik-Sale is a mobile application developed with Expo to streamline buying and selling items locally. It features quick listing capabilities and an intuitive user interface.',
      es: 'Quik-Sale es una aplicación móvil desarrollada con Expo para agilizar la compra y venta de artículos de forma local. Cuenta con capacidades ràpidas de listado y una interfaz de usuario intuitiva.'
    },
    tags: ['Expo', 'React Native', 'Frontend'],
    features: {
      en: ['Quick Listings', 'Local Commerce', 'Modern UI'],
      es: ['Listados rápidos', 'Comercio Local', 'UI Moderna']
    },
    svgVector: `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2">
      <!-- Shopping Cart -->
      <path d="M20 25 L 30 25 L 40 60 L 75 60 L 85 35 L 35 35" class="anim-shape-1" stroke-linejoin="round" />
      <circle cx="45" cy="75" r="4" class="anim-shape-2" fill="currentColor" />
      <circle cx="70" cy="75" r="4" class="anim-shape-3" fill="currentColor" />
      <!-- Plus or item inside -->
      <path d="M50 48 L 65 48 M 57.5 40.5 L 57.5 55.5" class="anim-shape-4" stroke="var(--color-accent-3)" />
    </svg>`,
    images: [
      '/images/mockups/quicksale.png'
    ],
    githubUrl: 'https://github.com/alextafale/Quik-Sale',
    featured: true,
  },
]
