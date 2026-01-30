const EXAMPLES = [
  {
    title: 'Four on the Floor',
    prompt: 'a simple four-on-the-floor house beat',
    code: `setcpm(128/4)
s("bd*4, hh*8, ~ sd ~ sd")
  .bank("RolandTR909")`,
    icon: '🏠',
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
    icon: '🌙',
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
    icon: '⚡',
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
    icon: '🌌',
  },
  {
    title: 'Breakbeat',
    prompt: 'jungle breakbeat with chopped drums',
    code: `setcpm(160/4)
s("breaks165:0")
  .chop(8)
  .sometimesBy(0.3, x => x.speed("2"))
  .room(0.3)`,
    icon: '🥁',
  },
  {
    title: 'Synthwave',
    prompt: 'retro 80s synthwave with arpeggiator',
    code: `setcpm(110/4)
stack(
  s("bd*4, ~ sd, hh*8")
    .bank("RolandTR808"),
  note("<c3 g3 ab3 bb3>/4")
    .s("sawtooth")
    .lpf(800)
    .gain(0.6),
  note("c4 eb4 g4 c5".fast(2))
    .s("square")
    .lpf(2000)
    .gain(0.3)
    .delay(0.3)
)`,
    icon: '🌆',
  },
]

interface ExamplesPanelProps {
  onSelect: (prompt: string, code: string) => void
}

export function ExamplesPanel({ onSelect }: ExamplesPanelProps) {
  return (
    <div className="glass-card rounded-2xl p-6">
      <div className="section-header">
        <span className="section-header-icon text-amber-400">📚</span>
        <h2 className="section-header-title">Examples</h2>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {EXAMPLES.map((example) => (
          <button
            key={example.title}
            onClick={() => onSelect(example.prompt, example.code)}
            className="example-btn group"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg group-hover:scale-110 transition-transform">
                {example.icon}
              </span>
              <p className="example-title font-medium text-sm text-gray-200 group-hover:text-purple-400 transition-colors">
                {example.title}
              </p>
            </div>
            <p className="text-xs text-gray-500 line-clamp-2">
              {example.prompt}
            </p>
          </button>
        ))}
      </div>
    </div>
  )
}
