// localStorage keys
const API_KEY_STORAGE_KEY = 'strudel-whisper-api-key'
const API_URL_STORAGE_KEY = 'strudel-whisper-api-url'

export const DEFAULT_API_URL = 'https://api.anthropic.com'

export interface ApiConfig {
  apiKey: string | null
  apiUrl: string
}

export function getApiConfig(): ApiConfig {
  if (typeof window === 'undefined') {
    return { apiKey: null, apiUrl: DEFAULT_API_URL }
  }
  
  const apiKey = localStorage.getItem(API_KEY_STORAGE_KEY)
  const apiUrl = localStorage.getItem(API_URL_STORAGE_KEY) || DEFAULT_API_URL
  
  return { apiKey, apiUrl }
}

export function setApiConfig(config: Partial<ApiConfig>): void {
  if (typeof window === 'undefined') return
  
  if (config.apiKey !== undefined) {
    if (config.apiKey) {
      localStorage.setItem(API_KEY_STORAGE_KEY, config.apiKey)
    } else {
      localStorage.removeItem(API_KEY_STORAGE_KEY)
    }
  }
  
  if (config.apiUrl !== undefined) {
    if (config.apiUrl && config.apiUrl !== DEFAULT_API_URL) {
      localStorage.setItem(API_URL_STORAGE_KEY, config.apiUrl)
    } else {
      localStorage.removeItem(API_URL_STORAGE_KEY)
    }
  }
}

export function hasApiKey(): boolean {
  const config = getApiConfig()
  return !!config.apiKey
}

export function clearApiConfig(): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem(API_KEY_STORAGE_KEY)
  localStorage.removeItem(API_URL_STORAGE_KEY)
}
