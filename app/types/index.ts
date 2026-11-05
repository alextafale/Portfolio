export interface Localized<T = string> {
  en: T
  es: T
}

export interface Experience {
  company: string
  role: Localized
  period: Localized
  /** Logo tile: initials on `color`, or the company's own `logo` (inline SVG
   *  on its own background). `color` also tints the work-section panel. */
  mark: { text: string; color: string; logo?: { svg: string; background: string } }
  /** Contract type and modality, e.g. "Part-time · Remote". */
  summary?: Localized
  /** What I do there, one or two sentences. */
  description?: Localized
  /** Concrete practices and results, shown as bullets on the work cards. */
  highlights?: Localized<string[]>
  /** Company website; `image` is a screenshot of it for the work section. */
  site?: { url: string; image?: string }
  /** Shorter labels for tight spots such as the hero corner. */
  short?: { role?: Localized; company?: string }
  current: boolean
}

export interface Capability {
  title: Localized
  description: Localized
  tech: string[]
}

export interface Skill {
  name: string
  /** Simple Icons slug in app/assets/tech; omitted when there is no logo. */
  icon?: string
}

export interface Credential {
  issuer: string
  title: Localized
  date: string
}

export interface SocialLink {
  name: string
  url: string
}
