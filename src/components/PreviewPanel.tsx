import { useMemo } from 'react'

interface PreviewPanelProps {
  code: string
}

export function PreviewPanel({ code }: PreviewPanelProps) {
  // Generate Strudel REPL URL with the code
  const strudelUrl = useMemo(() => {
    if (!code) return null
    // Strudel uses base64 encoded code in the URL hash
    const encoded = btoa(unescape(encodeURIComponent(code)))
    return `https://strudel.cc/#${encoded}`
  }, [code])

  return (
    <div className="glass-card rounded-2xl p-6">
      <div className="section-header">
        <span className="section-header-icon text-green-400">🎧</span>
        <h2 className="section-header-title">Preview</h2>
      </div>

      {code ? (
        <div className="space-y-5">
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-green-500/10 to-cyan-500/5 border border-green-500/20 p-6">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl" />
            
            <div className="relative text-center">
              <p className="text-gray-400 text-sm mb-5">
                Click below to open and play in Strudel REPL
              </p>
              <a
                href={strudelUrl || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-play inline-flex"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
                <span>Play in Strudel</span>
              </a>
            </div>
          </div>
          
          <div className="flex items-center justify-center gap-2 text-gray-500 text-xs">
            <kbd className="px-2 py-1 bg-white/5 rounded border border-white/10">Ctrl</kbd>
            <span>+</span>
            <kbd className="px-2 py-1 bg-white/5 rounded border border-white/10">Enter</kbd>
            <span className="ml-1">in REPL to start playing</span>
          </div>
        </div>
      ) : (
        <div className="relative overflow-hidden rounded-xl bg-white/[0.02] border border-white/5 p-10">
          {/* Animated background dots */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-4 left-8 w-1 h-1 bg-purple-400 rounded-full animate-pulse" />
            <div className="absolute top-12 right-12 w-1 h-1 bg-cyan-400 rounded-full animate-pulse delay-300" />
            <div className="absolute bottom-8 left-16 w-1 h-1 bg-pink-400 rounded-full animate-pulse delay-700" />
          </div>
          
          <div className="relative text-center">
            <div className="text-4xl mb-4 animate-float">🎶</div>
            <p className="text-gray-500">
              Generate some code to preview it here
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
