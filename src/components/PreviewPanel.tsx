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
    <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <span>🎧</span> Preview
      </h2>

      {code ? (
        <div className="space-y-4">
          <div className="bg-gray-800 rounded-lg p-4 text-center">
            <p className="text-gray-400 text-sm mb-4">
              Click below to open and play in Strudel REPL
            </p>
            <a
              href={strudelUrl || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-500 rounded-lg font-medium transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
              Play in Strudel
            </a>
          </div>
          
          <p className="text-gray-500 text-xs text-center">
            Press Ctrl+Enter in Strudel REPL to start playing
          </p>
        </div>
      ) : (
        <div className="bg-gray-800 rounded-lg p-8 text-center">
          <p className="text-gray-500">
            Generate some code to preview it here
          </p>
        </div>
      )}
    </div>
  )
}
