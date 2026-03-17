import Cookies from 'js-cookie'
import { PLATFORM_STORAGE_KEYS } from './constants'

export interface ApiResponse<T> {
  success: boolean
  data: T
  warnings?: { code: string; message: string }[]
  error?: { code: string; message: string }
}

export interface ApiFetchConfig {
  baseUrl: string
  tokenCookieKey?: string
  onUnauthorized?: () => void
}

const DEFAULT_LOGIN_PATH = '/hyadmin/login'

export function createApiFetch(config: ApiFetchConfig) {
  const tokenKey = config.tokenCookieKey ?? PLATFORM_STORAGE_KEYS.COOKIE.TOKEN

  const onUnauthorized = config.onUnauthorized ?? (() => {
    if (typeof window !== 'undefined') {
      window.location.href = DEFAULT_LOGIN_PATH
    }
  })

  return async function apiFetch<T>(
    path: string,
    init?: RequestInit,
  ): Promise<ApiResponse<T>> {
    const token = typeof window !== 'undefined'
      ? (sessionStorage.getItem(tokenKey) ?? Cookies.get(tokenKey) ?? null)
      : null

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(init?.headers as Record<string, string>),
    }
    if (token) headers['Authorization'] = `Bearer ${token}`

    const res = await fetch(`${config.baseUrl}${path}`, { ...init, headers })

    if (res.status === 401) {
      onUnauthorized()
      throw new Error('Unauthorized')
    }

    const body = await res.json()
    if (!body.success) {
      throw new Error(body.error?.message ?? 'Request failed')
    }

    return body as ApiResponse<T>
  }
}
