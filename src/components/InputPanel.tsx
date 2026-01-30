interface InputPanelProps {
  prompt: string
  onPromptChange: (prompt: string) => void
  onGenerate: () => void
  isLoading: boolean
}

export function InputPanel({ prompt, onPromptChange, onGenerate, isLoading }: InputPanelProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault()
      onGenerate()
    }
  }

  return (
    <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <span>✨</span> Describe Your Music
      </h2>
      
      <textarea
        value={prompt}
        onChange={(e) => onPromptChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="e.g., 'a chill lo-fi hip hop beat with jazzy piano chords'"
        className="w-full h-32 bg-gray-800 border border-gray-700 rounded-lg p-4 text-white placeholder-gray-500 resize-none focus:outline-none focus:border-purple-500 transition-colors"
      />
      
      <div className="mt-4 flex items-center justify-between">
        <span className="text-gray-500 text-sm">
          Press ⌘+Enter to generate
        </span>
        <button
          onClick={onGenerate}
          disabled={isLoading || !prompt.trim()}
          className="px-6 py-2 bg-purple-600 hover:bg-purple-500 disabled:bg-gray-700 disabled:cursor-not-allowed rounded-lg font-medium transition-colors glow"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Generating...
            </span>
          ) : (
            'Generate Code'
          )}
        </button>
      </div>
    </div>
  )
}
