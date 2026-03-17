export const PLATFORM_STORAGE_KEYS = {
  COOKIE: {
    TOKEN: 'hyadmin_token',       // cookie, all modules share JWT issued by hyadmin-api
  },
  LOCAL_STORAGE: {
    LOCALE: 'hyadmin_locale',     // localStorage, platform-wide locale preference
  },
} as const
