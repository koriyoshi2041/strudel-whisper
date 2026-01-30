interface InputPanelProps {
  prompt: string
  onPromptChange: (prompt: string) => void
  onGenerate: () => void
  isLoading: boolean
  hasApiKey: boolean
  onOpenSettings: () => void
}

export function InputPanel({ 
  prompt, 
  onPromptChange, 
  onGenerate, 
  isLoading,
  hasApiKey,
  onOpenSettings
}: InputPanelProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault()
      onGenerate()
    }
  }

  return (
    <div className="glass-card rounded-2xl p-6">
      <div className="section-header">
        <span className="section-header-icon text-purple-400">✨</span>
        <h2 className="section-header-title">Describe Your Music</h2>
      </div>
      
      <textarea
        value={prompt}
        onChange={(e) => onPromptChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="e.g., 'a chill lo-fi hip hop beat with jazzy piano chords and vinyl crackle...'"
        className="textarea-styled w-full h-36"
      />
      
      <div className="mt-5 flex items-center justify-between">
        <span className="text-gray-500 text-sm flex items-center gap-2">
          <kbd className="px-2 py-1 bg-white/5 rounded text-xs border border-white/10">⌘</kbd>
          <span>+</span>
          <kbd className="px-2 py-1 bg-white/5 rounded text-xs border border-white/10">Enter</kbd>
          <span className="ml-1">to generate</span>
        </span>
        
        {!hasApiKey ? (
          <button
            onClick={onOpenSettings}
            className="btn-primary flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Configure API Key
          </button>
        ) : (
          <button
            onClick={onGenerate}
            disabled={isLoading || !prompt.trim()}
            className="btn-primary flex items-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="spinner" />
                <span>Generating...</span>
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span>Generate Code</span>
              </>
            )}
          </button>
        )}
      </div>
    </div>
  )
}
