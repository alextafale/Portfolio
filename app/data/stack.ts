import type { StackItem } from '~/types'

export const stackItems: StackItem[] = [
  // Frontend
  { name: 'Vue.js', category: 'frontend', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vuejs/vuejs-original.svg', level: 'expert', color: '#4FC08D' },
  { name: 'Nuxt', category: 'frontend', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nuxtjs/nuxtjs-original.svg', level: 'advanced', color: '#00DC82' },
  { name: 'TypeScript', category: 'frontend', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg', level: 'advanced', color: '#3178C6' },
  { name: 'JavaScript', category: 'frontend', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg', level: 'expert', color: '#F7DF1E' },
  { name: 'HTML5', category: 'frontend', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg', level: 'expert', color: '#E34F26' },
  { name: 'CSS3', category: 'frontend', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg', level: 'expert', color: '#1572B6' },
  { name: 'Tailwind CSS', category: 'frontend', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg', level: 'advanced', color: '#06B6D4' },

  // Mobile 
  { name: 'Expo', category: 'mobile', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg', level: 'advanced', color: '#61DAFB' }, // React icon para Expo/React Native

  // Backend
  { name: 'Python', category: 'backend', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg', level: 'intermediate', color: '#3776AB' },
  { name: 'Java', category: 'backend', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg', level: 'intermediate', color: '#007396' },
  { name: 'Node.js', category: 'backend', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg', level: 'intermediate', color: '#339933' },
  { name: 'Express', category: 'backend', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg', level: 'intermediate', color: '#339933' },
  { name: 'FastAPI', category: 'backend', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg', level: 'intermediate', color: '#339933' },
  { name: 'Spring Boot', category: 'backend', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg', level: 'intermediate', color: '#339933' },
  // Database
  { name: 'MySQL', category: 'database', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg', level: 'intermediate', color: '#4479A1' },
  { name: 'PostgreSQL', category: 'database', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg', level: 'intermediate', color: '#336791' },
  { name: 'MongoDB', category: 'database', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg', level: 'intermediate', color: '#47A248' },
  { name: 'Supabase', category: 'database', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg', level: 'advanced', color: '#3ECF8E' },

  //DevOps
  { name: 'Git', category: 'devops', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg', level: 'advanced', color: '#F05032' },
  { name: 'GitHub', category: 'devops', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg', level: 'advanced', color: '#181717' },
  { name: 'Docker', category: 'devops', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg', level: 'advanced', color: '#2496ED' },
  { name: 'Vercel', category: 'devops', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg', level: 'advanced', color: '#000000' },

  // AI & LLMs
  { name: 'LLMs (GPT, Claude)', category: 'ai', icon: 'https://api.iconify.design/lucide:brain-circuit.svg?color=%237C3AED', level: 'advanced', color: '#7C3AED' },
  { name: 'MCP', category: 'ai', icon: 'https://api.iconify.design/lucide:network.svg?color=%2306B6D4', level: 'intermediate', color: '#06B6D4' },
]

export const stackCategories = [
  { key: 'frontend', label: 'Frontend' },
  { key: 'mobile', label: 'Mobile' },
  { key: 'backend', label: 'Backend' },
  { key: 'database', label: 'Database' },
  { key: 'ai', label: 'AI & LLMs' },
] as const
