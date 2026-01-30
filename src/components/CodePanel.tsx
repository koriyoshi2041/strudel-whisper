import { useState } from 'react'

interface CodePanelProps {
  code: string
  onCodeChange: (code: string) => void
  error: string | null
}

export function CodePanel({ code, onCodeChange, error }: CodePanelProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="glass-card rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="section-header mb-0">
          <span className="section-header-icon text-cyan-400">💻</span>
          <h2 className="section-header-title">Generated Code</h2>
        </div>
        {code && (
          <button
            onClick={copyToClipboard}
            className="btn-secondary flex items-center gap-2"
          >
            {copied ? (
              <>
                <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-green-400">Copied!</span>
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <span>Copy</span>
              </>
            )}
          </button>
        )}
      </div>

      {error && (
        <div className="mb-4 p-4 rounded-xl bg-red-500/10 border border-red-500/30 backdrop-blur-sm animate-slide-up">
          <div className="flex items-start gap-3">
            <span className="text-red-400">⚠️</span>
            <div>
              <p className="text-red-400 text-sm font-medium">Generation failed</p>
              <p className="text-red-300/70 text-sm mt-1">{error}</p>
            </div>
          </div>
        </div>
      )}

      <textarea
        value={code}
        onChange={(e) => onCodeChange(e.target.value)}
        placeholder="// Your Strudel code will appear here...
// 
// Describe the music you want and click Generate,
// or select an example below to get started."
        className="textarea-styled code-editor w-full h-52 text-sm"
        spellCheck={false}
      />

      {code && (
        <div className="mt-4 flex items-center justify-between">
          <a
            href={`https://strudel.cc/#${btoa(unescape(encodeURIComponent(code)))}`}
            target="_blank"
            rel="noopener noreferrer"
            className="link-subtle text-sm flex items-center gap-2 group"
          >
            <span>Open in Strudel REPL</span>
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          <span className="text-gray-600 text-xs">
            {code.split('\n').length} lines
          </span>
        </div>
      )}
    </div>
  )
}
