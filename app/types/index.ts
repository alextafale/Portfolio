export interface Localized<T = string> {
  en: T
  es: T
}

export interface Project {
  id: number
  slug: string
  title: string
  description: Localized
  longDescription?: Localized
  tags: string[]
  features?: Localized<string[]>
  images?: string[]
  svgVector?: string
  githubUrl: string
  liveUrl?: string
  featured?: boolean
}

export interface StackItem {
  name: string
  category: 'frontend' | 'backend' | 'mobile' | 'database' | 'devops' | 'tools' | 'ai'
  icon: string
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert'
  color: string
}

export interface Experience {
  id: number
  type: 'work' | 'education' | 'certification'
  title: Localized
  company: string
  period: string
  description: Localized
  tags?: string[]
}

export interface SocialLink {
  name: string
  url: string
  icon: string
}
