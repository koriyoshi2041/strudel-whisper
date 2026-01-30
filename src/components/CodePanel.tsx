interface CodePanelProps {
  code: string
  onCodeChange: (code: string) => void
  error: string | null
}

export function CodePanel({ code, onCodeChange, error }: CodePanelProps) {
  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code)
  }

  return (
    <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <span>💻</span> Generated Code
        </h2>
        {code && (
          <button
            onClick={copyToClipboard}
            className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            Copy
          </button>
        )}
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-900/30 border border-red-800 rounded-lg text-red-400 text-sm">
          {error}
        </div>
      )}

      <textarea
        value={code}
        onChange={(e) => onCodeChange(e.target.value)}
        placeholder="// Your Strudel code will appear here..."
        className="w-full h-48 bg-gray-800 border border-gray-700 rounded-lg p-4 font-mono text-sm text-green-400 placeholder-gray-600 resize-none focus:outline-none focus:border-purple-500 transition-colors code-editor"
        spellCheck={false}
      />

      {code && (
        <div className="mt-4 flex gap-2">
          <a
            href={`https://strudel.cc/#${btoa(code)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
          >
            Open in Strudel REPL →
          </a>
        </div>
      )}
    </div>
  )
}
