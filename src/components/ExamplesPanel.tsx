const EXAMPLES = [
  {
    title: 'Four on the Floor',
    prompt: 'a simple four-on-the-floor house beat',
    code: `setcpm(128/4)
s("bd*4, hh*8, ~ sd ~ sd")
  .bank("RolandTR909")`,
  },
  {
    title: 'Lo-Fi Hip Hop',
    prompt: 'chill lo-fi hip hop with piano chords',
    code: `setcpm(85/4)
stack(
  s("bd ~ [~ bd] ~, ~ sd, [~ hh]*4")
    .bank("RolandCompurhythm1000")
    .gain(0.8),
  note("<[c4 eb4 g4] [bb3 d4 f4] [ab3 c4 eb4] [g3 bb3 d4]>/2")
    .s("gm_epiano1")
    .room(0.6)
    .lpf(1200)
    .gain(0.4)
)`,
  },
  {
    title: 'Acid Techno',
    prompt: 'hard acid techno with 303 bass',
    code: `setcpm(140/4)
stack(
  s("bd*4, ~ cp, [~ hh]*8")
    .bank("RolandTR909"),
  note("[c2 c2 eb2 c2]*2")
    .s("sawtooth")
    .lpf(sine.range(300, 2000).slow(4))
    .lpq(15)
    .lpenv(4)
    .gain(0.7)
)`,
  },
  {
    title: 'Ambient Pad',
    prompt: 'ethereal ambient pad with lots of reverb',
    code: `note("<c3 eb3 g3 bb3>")
  .s("sawtooth")
  .lpf(400)
  .room(0.95)
  .size(0.9)
  .gain(0.3)
  .slow(4)`,
  },
  {
    title: 'Breakbeat',
    prompt: 'jungle breakbeat with chopped drums',
    code: `setcpm(160/4)
s("breaks165:0")
  .chop(8)
  .sometimesBy(0.3, x => x.speed("2"))
  .room(0.3)`,
  },
]

interface ExamplesPanelProps {
  onSelect: (prompt: string, code: string) => void
}

export function ExamplesPanel({ onSelect }: ExamplesPanelProps) {
  return (
    <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <span>📚</span> Examples
      </h2>
      
      <div className="grid grid-cols-2 gap-2">
        {EXAMPLES.map((example) => (
          <button
            key={example.title}
            onClick={() => onSelect(example.prompt, example.code)}
            className="p-3 bg-gray-800 hover:bg-gray-700 rounded-lg text-left transition-colors group"
          >
            <p className="font-medium text-sm group-hover:text-purple-400 transition-colors">
              {example.title}
            </p>
            <p className="text-xs text-gray-500 mt-1 truncate">
              {example.prompt}
            </p>
          </button>
        ))}
      </div>
    </div>
  )
}
