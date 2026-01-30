import { useState, useCallback } from 'react'
import { InputPanel } from './components/InputPanel'
import { CodePanel } from './components/CodePanel'
import { PreviewPanel } from './components/PreviewPanel'
import { ExamplesPanel } from './components/ExamplesPanel'
import { generateStrudelCode } from './lib/llm'

function App() {
  const [prompt, setPrompt] = useState('')
  const [code, setCode] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleGenerate = useCallback(async () => {
    if (!prompt.trim()) return
    
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

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <header className="border-b border-gray-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🎵</span>
            <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Strudel Whisper
            </h1>
          </div>
          <p className="text-gray-400 text-sm">
            Describe music → Get code
          </p>
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
      <footer className="border-t border-gray-800 px-6 py-4 mt-12">
        <div className="max-w-7xl mx-auto text-center text-gray-500 text-sm">
          <p>
            Powered by{' '}
            <a href="https://strudel.cc" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:underline">
              Strudel
            </a>
            {' '}•{' '}
            <a href="https://github.com/rios-ai/strudel-whisper" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:underline">
              Open Source
            </a>
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
