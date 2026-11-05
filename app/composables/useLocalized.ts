import type { Localized } from '~/types'

/**
 * Picks the current-locale value out of a `{ en, es }` pair.
 * Data files keep both languages side by side; this keeps templates terse.
 */
export function useLocalized() {
  const { locale } = useI18n()
  const tr = <T>(value: Localized<T>): T => value[locale.value as keyof Localized<T>] ?? value.es
  return { tr, locale }
}
