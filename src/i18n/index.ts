export type Locale = 'zh-TW' | 'en'

export const localeLabels: Record<Locale, string> = {
  'zh-TW': '繁體中文',
  en: 'English',
}

/**
 * Merge base translations with tenant overrides.
 * Used in layout.tsx to combine Layer 1 (static JSON) with Layer 2 (DB overrides).
 */
export function mergeMessages<T extends Record<string, unknown>>(
  base: T,
  overrides: Partial<T>,
): T {
  return { ...base, ...overrides }
}
