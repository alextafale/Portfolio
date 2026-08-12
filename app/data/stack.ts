import type { StackItem } from '~/types'

export const stackItems: StackItem[] = [
  // Frontend
  { name: 'Vue.js', category: 'frontend', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vuejs/vuejs-original.svg', level: 'intermediate', color: '#4FC08D', daily: true },
  { name: 'Nuxt', category: 'frontend', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nuxtjs/nuxtjs-original.svg', level: 'intermediate', color: '#00DC82', daily: true },
  { name: 'TypeScript', category: 'frontend', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg', level: 'advanced', color: '#3178C6', daily: true },
  { name: 'JavaScript', category: 'frontend', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg', level: 'intermediate', color: '#F7DF1E' },
  { name: 'HTML5', category: 'frontend', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg', level: 'intermediate', color: '#E34F26' },
  { name: 'CSS3', category: 'frontend', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg', level: 'intermediate', color: '#1572B6' },
  { name: 'Tailwind CSS', category: 'frontend', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg', level: 'intermediate', color: '#06B6D4' },

  { name: 'Next.js', category: 'frontend', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg', level: 'intermediate', color: '#000000' },

  // Mobile
  { name: 'React Native', category: 'mobile', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg', level: 'intermediate', color: '#61DAFB', daily: true },
  { name: 'Expo', category: 'mobile', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg', level: 'advanced', color: '#61DAFB', daily: true }, // React icon para Expo/React Native

  // Backend
  { name: 'Python', category: 'backend', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg', level: 'advanced', color: '#3776AB', daily: true },
  { name: 'Java', category: 'backend', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg', level: 'advanced', color: '#007396' },
  { name: 'Node.js', category: 'backend', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg', level: 'intermediate', color: '#339933' },
  { name: 'Express', category: 'backend', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg', level: 'intermediate', color: '#339933' },
  { name: 'FastAPI', category: 'backend', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg', level: 'advanced', color: '#339933', daily: true },
  { name: 'Spring Boot', category: 'backend', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg', level: 'advanced', color: '#339933' },
  // Database
  { name: 'MySQL', category: 'database', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg', level: 'advanced', color: '#4479A1' },
  { name: 'PostgreSQL', category: 'database', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg', level: 'advanced', color: '#336791' },
  { name: 'MongoDB', category: 'database', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg', level: 'advanced', color: '#47A248' },
  { name: 'Supabase', category: 'database', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg', level: 'advanced', color: '#3ECF8E', daily: true },

  //DevOps
  { name: 'Git', category: 'devops', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg', level: 'advanced', color: '#F05032', daily: true },
  { name: 'GitHub', category: 'devops', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg', level: 'advanced', color: '#181717' },
  { name: 'Docker', category: 'devops', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg', level: 'advanced', color: '#2496ED' },
  { name: 'Vercel', category: 'devops', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg', level: 'advanced', color: '#000000' },

  // AI, ML & LLMs
  { name: 'Claude API', category: 'ai', icon: 'https://api.iconify.design/lucide:sparkles.svg?color=%23D97757', level: 'advanced', color: '#D97757', daily: true },
  { name: 'Claude Code (Agents)', category: 'ai', icon: 'https://api.iconify.design/lucide:square-terminal.svg?color=%23D97757', level: 'advanced', color: '#D97757', daily: true },
  { name: 'MCP Servers', category: 'ai', icon: 'https://api.iconify.design/lucide:network.svg?color=%2306B6D4', level: 'advanced', color: '#06B6D4', daily: true },
  { name: 'Subagents & Orchestration', category: 'ai', icon: 'https://api.iconify.design/lucide:git-fork.svg?color=%237C3AED', level: 'advanced', color: '#7C3AED' },
  { name: 'LLMs (GPT, Claude)', category: 'ai', icon: 'https://api.iconify.design/lucide:brain-circuit.svg?color=%237C3AED', level: 'advanced', color: '#7C3AED' },
  { name: 'Prompt & Context Engineering', category: 'ai', icon: 'https://api.iconify.design/lucide:file-text.svg?color=%230891B2', level: 'advanced', color: '#0891B2' },
  { name: 'LangChain', category: 'ai', icon: 'https://api.iconify.design/lucide:link.svg?color=%231C9C7A', level: 'intermediate', color: '#1C9C7A', daily: true },
  { name: 'LangGraph', category: 'ai', icon: 'https://api.iconify.design/lucide:workflow.svg?color=%231C9C7A', level: 'intermediate', color: '#1C9C7A', daily: true },
  { name: 'RAG', category: 'ai', icon: 'https://api.iconify.design/lucide:database-zap.svg?color=%23F59E0B', level: 'intermediate', color: '#F59E0B', daily: true },
  { name: 'Vector Databases', category: 'ai', icon: 'https://api.iconify.design/lucide:boxes.svg?color=%233ECF8E', level: 'intermediate', color: '#3ECF8E' },
  { name: 'Embeddings', category: 'ai', icon: 'https://api.iconify.design/lucide:scatter-chart.svg?color=%230891B2', level: 'intermediate', color: '#0891B2' },
  { name: 'Machine Learning', category: 'ai', icon: 'https://api.iconify.design/lucide:brain.svg?color=%23EC4899', level: 'beginner', color: '#EC4899' },
]

export const stackCategories = [
  { key: 'frontend', label: 'Frontend' },
  { key: 'mobile', label: 'Mobile' },
  { key: 'backend', label: 'Backend' },
  { key: 'database', label: 'Database' },
  { key: 'devops', label: 'DevOps & Tooling' },
  { key: 'ai', label: 'AI, ML & LLMs' },
] as const
