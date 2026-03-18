import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { PLATFORM_STORAGE_KEYS } from '../lib/constants'
import type { Locale } from '../i18n'

const LOCALE_KEY = PLATFORM_STORAGE_KEYS.LOCAL_STORAGE.LOCALE

function getStoredLocale(defaultLocale: Locale): Locale {
  if (typeof window === 'undefined') return defaultLocale
  const stored = localStorage.getItem(LOCALE_KEY)
  if (stored === 'zh-TW' || stored === 'en') return stored
  return defaultLocale
}

interface LocaleContextValue<T> {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: T
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const LocaleContext = createContext<LocaleContextValue<any>>({
  locale: 'zh-TW',
  setLocale: () => {},
  t: {},
})

interface LocaleProviderProps<T> {
  children: React.ReactNode
  defaultLocale?: Locale
  locales: Record<Locale, T>
}

export function LocaleProvider<T>({ children, defaultLocale = 'zh-TW', locales }: LocaleProviderProps<T>) {
  const [locale, setLocaleState] = useState<Locale>(() => getStoredLocale(defaultLocale))

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale)
    localStorage.setItem(LOCALE_KEY, newLocale)
  }, [])

  const t = locales[locale]

  const value = useMemo(
    () => ({ locale, setLocale, t }),
    [locale, setLocale, t],
  )

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
}

export function useLocale<T = Record<string, unknown>>(): LocaleContextValue<T> {
  return useContext(LocaleContext)
}
