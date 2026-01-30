import { useState, useEffect } from 'react'
import { getApiConfig, setApiConfig, DEFAULT_API_URL } from '../lib/apiConfig'

interface SettingsModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: () => void
}

export function SettingsModal({ isOpen, onClose, onSave }: SettingsModalProps) {
  const [apiKey, setApiKey] = useState('')
  const [apiUrl, setApiUrl] = useState(DEFAULT_API_URL)
  const [showKey, setShowKey] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (isOpen) {
      const config = getApiConfig()
      setApiKey(config.apiKey || '')
      setApiUrl(config.apiUrl || DEFAULT_API_URL)
      setSaved(false)
    }
  }, [isOpen])

  const handleSave = () => {
    setApiConfig({ apiKey, apiUrl })
    setSaved(true)
    onSave()
    setTimeout(() => {
      onClose()
    }, 800)
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={handleBackdropClick}
    >
      {/* Backdrop with blur */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in" />
      
      {/* Modal */}
      <div className="relative w-full max-w-md mx-4 animate-slide-up">
        <div className="glass-card rounded-2xl p-6 border border-white/10">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold flex items-center gap-3">
              <span className="text-2xl">⚙️</span>
              <span className="gradient-text">API Settings</span>
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Form */}
          <div className="space-y-5">
            {/* API Key */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Anthropic API Key <span className="text-pink-400">*</span>
              </label>
              <div className="relative">
                <input
                  type={showKey ? 'text' : 'password'}
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="sk-ant-..."
                  className="input-field w-full pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowKey(!showKey)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showKey ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
              <p className="text-xs text-gray-500">
                Get your API key from{' '}
                <a 
                  href="https://console.anthropic.com/settings/keys" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  Anthropic Console
                </a>
              </p>
            </div>

            {/* API URL */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                API Base URL <span className="text-gray-500">(optional)</span>
              </label>
              <input
                type="text"
                value={apiUrl}
                onChange={(e) => setApiUrl(e.target.value)}
                placeholder={DEFAULT_API_URL}
                className="input-field w-full"
              />
              <p className="text-xs text-gray-500">
                Leave default unless using a proxy
              </p>
            </div>

            {/* Info Box */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-purple-500/20">
              <p className="text-sm text-gray-300">
                <span className="text-cyan-400">🔒</span> Your API key is stored locally in your browser and never sent to our servers.
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-3 px-4 rounded-xl border border-white/10 text-gray-300 hover:bg-white/5 transition-all"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={!apiKey.trim()}
              className="btn-primary flex-1 flex items-center justify-center gap-2"
            >
              {saved ? (
                <>
                  <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Saved!
                </>
              ) : (
                'Save Settings'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
