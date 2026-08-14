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
  /**
   * Landscape (16:10) card image. Mobile projects render `images` inside phone
   * frames on the detail page, so those must stay raw portrait screenshots —
   * `cover` is what the listing cards show instead.
   */
  cover?: string
  images?: string[]
  svgVector?: string
  /** Omitted for closed-source work. */
  githubUrl?: string
  liveUrl?: string
  featured?: boolean
  year?: string
}

export interface StackItem {
  name: string
  category: 'frontend' | 'backend' | 'mobile' | 'database' | 'devops' | 'tools' | 'ai'
  icon: string
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert'
  color: string
  /** Surfaced in the "what I reach for daily" band at the top of the stack page. */
  daily?: boolean
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

export interface AiWorkflowItem {
  id: number
  icon: string
  title: Localized
  description: Localized
  tools: string[]
}
