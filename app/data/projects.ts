import type { Project } from '~/types'

export const projects: Project[] = [
  {
    id: 0,
    slug: 'tendero',
    title: 'Tendero',
    description: {
      en: 'SaaS point-of-sale with inventory, reports and an AI assistant, built for Mexican corner shops.',
      es: 'Punto de venta SaaS con inventario, reportes y asistente IA, hecho para tiendas mexicanas.'
    },
    longDescription: {
      en: 'Tendero is my own SaaS product: a point-of-sale system for small Mexican retailers — grocery shops, stationers, hardware stores — bundling sales, inventory, reporting and an AI assistant into one tool. It runs on Next.js deployed to Vercel, and ships with a 30-day free trial that needs no card and no contract.',
      es: 'Tendero es mi producto SaaS propio: un sistema de punto de venta para comercios pequeños en México — abarrotes, papelerías, ferreterías — que reúne ventas, inventario, reportes y un asistente IA en una sola herramienta. Corre sobre Next.js desplegado en Vercel, y ofrece 30 días de prueba sin tarjeta y sin contrato.'
    },
    tags: ['Next.js', 'React', 'TypeScript', 'Vercel', 'AI', 'SaaS'],
    features: {
      en: ['Point of sale', 'Inventory control', 'Sales reporting', 'Built-in AI assistant', '30-day free trial'],
      es: ['Punto de venta', 'Control de inventario', 'Reportes de ventas', 'Asistente IA integrado', '30 días de prueba gratis']
    },
    svgVector: `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2">
      <!-- Storefront awning -->
      <path d="M18 38 L24 24 h52 l6 14 Z" class="anim-shape-1" stroke-linejoin="round" />
      <path d="M18 38 h64" class="anim-shape-2" />
      <!-- Shop body -->
      <path d="M24 38 v38 h52 v-38" class="anim-shape-1" />
      <!-- Counter / till -->
      <rect x="36" y="54" width="28" height="16" rx="2" class="anim-shape-3" />
      <path d="M42 62 h16" class="anim-shape-4" />
      <!-- AI spark -->
      <path d="M68 46 l2.5 5 5 2.5 -5 2.5 -2.5 5 -2.5 -5 -5 -2.5 5 -2.5 Z" class="anim-shape-5" fill="currentColor" stroke="none" />
    </svg>`,
    cover: '/images/mockups/tendero-hero.png',
    images: [
      '/images/mockups/tendero-hero.png',
    ],
    liveUrl: 'https://tendero.shop',
    featured: true,
    year: '2026',
  },
  {
    id: 1,
    slug: 'kivo',
    title: 'Kivo',
    description: {
      en: 'Smart delivery platform connecting local businesses with customers.',
      es: 'Plataforma de delivery inteligente que conecta negocios locales con clientes.'
    },
    longDescription: {
      en: 'Kivo is a full delivery platform built with React Native, Expo and FastAPI. It offers real-time order tracking, a complete admin panel for businesses, and customer assistance through an intelligent chatbot, all backed by Supabase for auth and data.',
      es: 'Kivo es una plataforma integral de delivery construida con React Native, Expo y FastAPI. Ofrece seguimiento de pedidos en tiempo real, un panel administrativo completo para negocios y asistencia al cliente mediante chatbot inteligente, todo respaldado por Supabase para autenticación y datos.'
    },
    tags: ['React Native', 'Expo', 'TypeScript', 'FastAPI', 'Supabase', 'AI'],
    features: {
      en: ['Real-time order tracking', 'Business admin panel', 'AI-powered support chatbot', 'Supabase auth & database'],
      es: ['Seguimiento de pedidos en tiempo real', 'Panel administrativo para negocios', 'Chatbot de soporte con IA', 'Auth y base de datos con Supabase']
    },
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
    cover: '/images/mockups/kivo-hero.png',
    images: [
      '/images/kivo/cliente-inicio.jpeg',
      '/images/kivo/cliente-pedidos.jpeg',
      '/images/kivo/kivobot.jpeg',
      '/images/kivo/negocio-perfil.jpeg',
      '/images/kivo/kivosos.jpeg',
    ],
    githubUrl: 'https://github.com/alextafale/Kivo',
    featured: true,
    year: '2025 — 2026',
  },
  {
    id: 2,
    slug: 'micompli',
    title: 'MiCompli',
    description: {
      en: 'Marketplace for personalized emotional experiences.',
      es: 'Marketplace de experiencias emocionales personalizadas.'
    },
    longDescription: {
      en: 'MiCompli is a web platform for creating and gifting personalized experiences. Built with Next.js 15 (App Router + Server Components) and Supabase with Row Level Security, it includes an experience catalog, a step-by-step experience builder, checkout flow, and a dashboard for partners.',
      es: 'MiCompli es una plataforma web para crear y regalar experiencias personalizadas. Construida con Next.js 15 (App Router + Server Components) y Supabase con Row Level Security, incluye un catálogo de experiencias, un builder paso a paso, flujo de checkout y un dashboard para cómplices.'
    },
    tags: ['Next.js', 'TypeScript', 'Supabase', 'Tailwind CSS'],
    features: {
      en: ['Experience catalog & builder', 'Checkout flow', 'Partner dashboard', 'Supabase RLS security'],
      es: ['Catálogo y builder de experiencias', 'Flujo de checkout', 'Dashboard de cómplices', 'Seguridad con RLS de Supabase']
    },
    svgVector: `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2">
      <!-- Gift box -->
      <rect x="25" y="42" width="50" height="38" rx="4" class="anim-shape-1" />
      <path d="M25 55 h50" class="anim-shape-2" />
      <path d="M50 42 v38" class="anim-shape-2" />
      <!-- Ribbon bow -->
      <path d="M50 42 C 40 30 28 32 32 40 C 34 44 44 44 50 42 Z" class="anim-shape-3" />
      <path d="M50 42 C 60 30 72 32 68 40 C 66 44 56 44 50 42 Z" class="anim-shape-3" />
      <!-- Heart accent -->
      <path d="M50 66 l-4 -4 a3 3 0 1 1 4 -4 a3 3 0 1 1 4 4 z" class="anim-shape-4" fill="var(--color-accent-3)" stroke="none" />
    </svg>`,
    cover: '/images/mockups/micompli-hero.png',
    images: [
      '/images/mockups/micompli-hero.png',
    ],
    githubUrl: 'https://github.com/alextafale/MiCompli',
    liveUrl: 'https://mi-compli-pi7g.vercel.app/',
    featured: true,
    year: '2026',
  },
  {
    id: 3,
    slug: 'tivo',
    title: 'Tivo',
    description: {
      en: 'Mobile app built with Expo Router and TypeScript.',
      es: 'Aplicación móvil construida con Expo Router y TypeScript.'
    },
    longDescription: {
      en: 'Tivo is a mobile application currently in development, built with Expo, Expo Router (file-based routing) and TypeScript, applying the architecture patterns learned from building Kivo.',
      es: 'Tivo es una aplicación móvil actualmente en desarrollo, construida con Expo, Expo Router (rutas basadas en archivos) y TypeScript, aplicando los patrones de arquitectura aprendidos al construir Kivo.'
    },
    tags: ['Expo', 'React Native', 'TypeScript'],
    svgVector: `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2">
      <!-- Phone body -->
      <rect x="30" y="15" width="40" height="70" rx="6" class="anim-shape-1" stroke="currentColor"/>
      <!-- Play button -->
      <polygon points="44,40 44,60 62,50" class="anim-shape-2" stroke-linejoin="round" />
      <!-- Signal waves -->
      <path d="M70 30 q6 -8 0 -16 M76 34 q10 -12 0 -24" class="anim-shape-3" stroke-linecap="round" />
      <circle cx="50" cy="78" r="2" class="anim-shape-4" fill="currentColor"/>
    </svg>`,
    githubUrl: 'https://github.com/alextafale/Tivo',
    featured: false,
    year: '2026',
  },
  {
    id: 4,
    slug: 'smart-tomato',
    title: 'SmartTomato',
    description: {
      en: 'AI-powered tomato classification app for export quality control.',
      es: 'App de clasificación de tomates con IA para control de calidad de exportación.'
    },
    longDescription: {
      en: 'SmartTomato is a school project for classifying tomatoes for export. I built the mobile app with React Native and Expo: a dashboard showing tomatoes processed per minute and the ratio of ripe vs. unripe tomatoes, fed by an AI classification model built by my teammates.',
      es: 'SmartTomato es un proyecto escolar para clasificar tomates de exportación. Desarrollé la app móvil con React Native y Expo: un dashboard que muestra los tomates procesados por minuto y la proporción de maduros e inmaduros, alimentado por un modelo de IA de clasificación construido por mis compañeros.'
    },
    tags: ['React Native', 'Expo', 'AI', 'JavaScript'],
    features: {
      en: ['Real-time classification dashboard', 'Ripe/unripe ratio metrics', 'AI model integration'],
      es: ['Dashboard de clasificación en tiempo real', 'Métricas de maduros/inmaduros', 'Integración con modelo de IA']
    },
    svgVector: `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2">
      <!-- Tomato -->
      <circle cx="50" cy="58" r="22" class="anim-shape-1" />
      <path d="M50 36 q-4 -8 -12 -8 M50 36 q4 -8 12 -8 M50 36 v-8" class="anim-shape-2" stroke-linecap="round" />
      <!-- Scan frame -->
      <path d="M18 30 v-12 h12 M82 30 v-12 h-12 M18 74 v12 h12 M82 74 v12 h-12" class="anim-shape-3" />
      <!-- Check -->
      <path d="M42 58 l6 6 l12 -12" class="anim-shape-4" stroke="var(--color-accent-3)" stroke-width="3" />
    </svg>`,
    githubUrl: 'https://github.com/alextafale/SmartTomato',
    featured: false,
    year: '2025',
  },
  {
    id: 5,
    slug: 'quik-sale',
    title: 'Quik-Sale',
    description: {
      en: 'Sales and inventory management app for small local stores.',
      es: 'App de ventas e inventario para pequeñas tiendas locales.'
    },
    longDescription: {
      en: 'Quik-Sale was born from watching small store owners manage sales and inventory in paper notebooks. Built with React Native and Expo, it lets them register sales, track inventory in real time, and understand how their business is doing without any technical knowledge.',
      es: 'Quik-Sale nació de ver cómo los dueños de pequeñas tiendas administran ventas e inventario en libretas de papel. Construida con React Native y Expo, les permite registrar ventas, llevar el inventario en tiempo real y entender cómo va su negocio sin conocimientos técnicos.'
    },
    tags: ['React Native', 'Expo', 'JavaScript'],
    features: {
      en: ['Sales registration', 'Real-time inventory', 'Simple business insights'],
      es: ['Registro de ventas', 'Inventario en tiempo real', 'Métricas simples del negocio']
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
    featured: false,
    year: '2025',
  },
  {
    id: 6,
    slug: 'backend-project',
    title: 'Backend REST API',
    description: {
      en: 'REST API built with Node.js, Express, MongoDB and Docker.',
      es: 'API REST construida con Node.js, Express, MongoDB y Docker.'
    },
    longDescription: {
      en: 'A backend project focused on API fundamentals: RESTful endpoints with Express, persistence with MongoDB, containerization with Docker, and endpoint testing with Postman.',
      es: 'Un proyecto backend enfocado en los fundamentos de APIs: endpoints RESTful con Express, persistencia con MongoDB, contenedores con Docker y pruebas de endpoints con Postman.'
    },
    tags: ['Node.js', 'Express', 'MongoDB', 'Docker'],
    features: {
      en: ['RESTful endpoints', 'MongoDB persistence', 'Dockerized environment', 'Postman test collection'],
      es: ['Endpoints RESTful', 'Persistencia con MongoDB', 'Entorno con Docker', 'Colección de pruebas en Postman']
    },
    svgVector: `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2">
      <!-- Server stack -->
      <rect x="25" y="20" width="50" height="16" rx="4" class="anim-shape-1" />
      <rect x="25" y="42" width="50" height="16" rx="4" class="anim-shape-2" />
      <rect x="25" y="64" width="50" height="16" rx="4" class="anim-shape-3" />
      <!-- Status lights -->
      <circle cx="33" cy="28" r="2" class="anim-shape-4" fill="var(--color-accent-3)" stroke="none" />
      <circle cx="33" cy="50" r="2" class="anim-shape-4" fill="var(--color-accent-3)" stroke="none" />
      <circle cx="33" cy="72" r="2" class="anim-shape-4" fill="var(--color-accent-3)" stroke="none" />
      <path d="M45 28 h22 M45 50 h22 M45 72 h22" class="anim-shape-5" stroke-linecap="round" />
    </svg>`,
    githubUrl: 'https://github.com/alextafale/Backend-Project-',
    featured: false,
    year: '2025',
  },
  {
    id: 7,
    slug: 'project-school',
    title: 'Project-school',
    description: {
      en: 'Mobile app for student communication and course management.',
      es: 'App móvil para comunicación estudiantil y gestión de cursos.'
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
    featured: false,
    year: '2026',
  },
  {
    id: 8,
    slug: 'metodos-generativos',
    title: 'Metodos-generativos',
    description: {
      en: 'Pseudo-random number generator with statistical tests and methods.',
      es: 'Generador de números pseudoaleatorios con pruebas y métodos estadísticos.'
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
    year: '2026',
  },
]
