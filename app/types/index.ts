export interface Project {
  id: number
  title: string
  description: string
  tags: string[]
  githubUrl: string
  liveUrl?: string
  featured?: boolean
}

export interface StackItem {
  name: string
  category: 'frontend' | 'backend' | 'mobile' | 'database' | 'devops' | 'tools'
  icon: string
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert'
  color: string
}

export interface Experience {
  id: number
  type: 'work' | 'education'
  title: string
  company: string
  period: string
  description: string
  tags?: string[]
}

export interface SocialLink {
  name: string
  url: string
  icon: string
}
