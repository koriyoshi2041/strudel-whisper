import { useState, useCallback, useEffect } from 'react'
import { InputPanel } from './components/InputPanel'
import { CodePanel } from './components/CodePanel'
import { PreviewPanel } from './components/PreviewPanel'
import { ExamplesPanel } from './components/ExamplesPanel'
import { SettingsModal } from './components/SettingsModal'
import { generateStrudelCode, isApiConfigured } from './lib/llm'

function App() {
  const [prompt, setPrompt] = useState('')
  const [code, setCode] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [hasApiKey, setHasApiKey] = useState(false)

  useEffect(() => {
    setHasApiKey(isApiConfigured())
  }, [])

  const handleGenerate = useCallback(async () => {
    if (!prompt.trim()) return
    
    if (!isApiConfigured()) {
      setIsSettingsOpen(true)
      return
    }
    
    setIsLoading(true)
    setError(null)
    
    try {
      const generatedCode = await generateStrudelCode(prompt)
      setCode(generatedCode)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate code')
    } finally {
      setIsLoading(false)
    }
  }, [prompt])

  const handleExampleSelect = useCallback((examplePrompt: string, exampleCode: string) => {
    setPrompt(examplePrompt)
    setCode(exampleCode)
  }, [])

  const handleSettingsSave = useCallback(() => {
    setHasApiKey(isApiConfigured())
  }, [])

  return (
    <div className="min-h-screen text-white">
      {/* Ambient Background Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[120px] animate-pulse-glow" />
        <div className="absolute bottom-[-30%] right-[-10%] w-[500px] h-[500px] bg-cyan-500/15 rounded-full blur-[100px]" />
        <div className="absolute top-[40%] right-[20%] w-[300px] h-[300px] bg-pink-500/10 rounded-full blur-[80px]" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-white/5 px-6 py-5">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <span className="text-3xl animate-float">🎵</span>
                <div className="absolute inset-0 blur-xl bg-purple-500/30" />
              </div>
              <div>
                <h1 className="text-2xl font-bold gradient-text tracking-tight">
                  Strudel Whisper
                </h1>
                <p className="text-gray-500 text-sm mt-0.5">
                  Natural language to live code
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              {!hasApiKey && (
                <div className="badge badge-warning">
                  <span>⚠️</span>
                  API key required
                </div>
              )}
              <button
                onClick={() => setIsSettingsOpen(true)}
                className="settings-btn"
                title="Settings"
              >
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column: Input & Examples */}
            <div className="space-y-6">
              <InputPanel
                prompt={prompt}
                onPromptChange={setPrompt}
                onGenerate={handleGenerate}
                isLoading={isLoading}
                hasApiKey={hasApiKey}
                onOpenSettings={() => setIsSettingsOpen(true)}
              />
              <ExamplesPanel onSelect={handleExampleSelect} />
            </div>

            {/* Right Column: Code & Preview */}
            <div className="space-y-6">
              <CodePanel
                code={code}
                onCodeChange={setCode}
                error={error}
              />
              <PreviewPanel code={code} />
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-white/5 px-6 py-6 mt-12">
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-gray-500 text-sm">
              Powered by{' '}
              <a href="https://strudel.cc" target="_blank" rel="noopener noreferrer" className="link-subtle">
                Strudel
              </a>
              {' '}•{' '}
              Built with{' '}
              <a href="https://anthropic.com" target="_blank" rel="noopener noreferrer" className="link-subtle">
                Claude
              </a>
              {' '}•{' '}
              <a href="https://github.com/rios-ai/strudel-whisper" target="_blank" rel="noopener noreferrer" className="link-subtle">
                Open Source
              </a>
            </p>
          </div>
        </footer>
      </div>

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onSave={handleSettingsSave}
      />
    </div>
  )
}

export default App
