<p align="center">
  <h1 align="center">🎵 Strudel Whisper</h1>
  <p align="center">
    <strong>Describe music in natural language, get live coding code</strong>
  </p>
  <p align="center">
    <a href="https://strudel.cc">Strudel</a> •
    <a href="#quick-start">Quick Start</a> •
    <a href="#examples">Examples</a> •
    <a href="#configuration">Configuration</a>
  </p>
</p>

---

## ✨ What is this?

**Strudel Whisper** is an AI-powered tool that converts natural language descriptions of music into working [Strudel](https://strudel.cc) code.

**Strudel** is a browser-based live coding environment for algorithmic music — a JavaScript port of TidalCycles. It's incredibly powerful but has a learning curve. Strudel Whisper aims to lower that barrier.

```
"a chill lo-fi hip hop beat with jazzy piano"
                    ↓
setcpm(85/4)
stack(
  s("bd ~ [~ bd] ~, ~ sd, [~ hh]*4").bank("RolandCompurhythm1000"),
  note("<[c4 eb4 g4] [bb3 d4 f4]>/2").s("gm_epiano1").room(0.6).lpf(1200)
)
```

## 🎬 Examples

| You describe... | You get... |
|-----------------|------------|
| "a simple four-on-the-floor beat" | `s("bd*4, hh*8, ~ sd ~ sd").bank("RolandTR909")` |
| "chill lo-fi hip hop with piano" | Multi-layer pattern with drums, bass, and chords |
| "glitchy IDM drums" | Complex polyrhythmic patterns with probability |
| "ambient pad with lots of reverb" | Slow evolving synthesizer textures |
| "acid techno with 303 bass" | Classic acid bassline with filter sweeps |

## 🚀 Quick Start

### 1. Clone & Install

```bash
git clone https://github.com/rios-ai/strudel-whisper.git
cd strudel-whisper
npm install
```

### 2. Configure API Key

```bash
cp .env.example .env
```

Edit `.env` and add your Anthropic API key:

```env
VITE_ANTHROPIC_API_KEY=sk-ant-api03-xxxxx
```

> **Get an API key:** Sign up at [console.anthropic.com](https://console.anthropic.com) and create a new API key.

### 3. Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and start describing music!

## ⚙️ Configuration

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_ANTHROPIC_API_KEY` | ✅ Yes | Your Anthropic API key for Claude |

### Getting an Anthropic API Key

1. Go to [console.anthropic.com](https://console.anthropic.com)
2. Sign up or log in
3. Navigate to **API Keys**
4. Click **Create Key**
5. Copy the key and add it to your `.env` file

### Cost Estimation

- Each generation uses ~500-1000 tokens
- Claude Sonnet costs ~$0.003-0.006 per generation
- ~1000 generations ≈ $3-6

## 🛠️ Tech Stack

- **Frontend:** React 18 + Vite + TypeScript
- **Styling:** Tailwind CSS
- **AI:** Claude API (Anthropic)
- **Audio:** Strudel.cc REPL

## 📖 How It Works

1. **Describe** — Write what you want to hear in plain English
2. **Generate** — Claude converts your description to Strudel code
3. **Preview** — Click to open in Strudel REPL and hear it live
4. **Iterate** — Refine your description or edit the code directly

## 🎼 Learn Strudel

New to Strudel? Here are some resources:

- [Strudel Workshop](https://strudel.cc/workshop/getting-started/) — Official interactive tutorial
- [Strudel Reference](https://strudel.cc/reference/) — Function documentation
- [TidalCycles](https://tidalcycles.org/) — The original pattern language (concepts apply)
- [Awesome Livecoding](https://github.com/toplap/awesome-livecoding) — Explore the ecosystem

## 🤝 Contributing

Contributions welcome! Areas that need help:

- [ ] More example patterns and presets
- [ ] Better prompt engineering for music styles
- [ ] Embedded Strudel REPL preview (vs. external link)
- [ ] Pattern explanation feature (code → natural language)
- [ ] Support for more musical genres and styles
- [ ] UI/UX improvements

### Development

```bash
npm install       # Install dependencies
npm run dev       # Start dev server
npm run build     # Production build
npm run lint      # Run linter
```

## 📄 License

MIT — Use it, modify it, ship it.

## 🙏 Credits

- [Strudel](https://strudel.cc) by Alex McLean & Felix Roos
- [TidalCycles](https://tidalcycles.org) by Alex McLean
- Powered by [Claude](https://anthropic.com) by Anthropic

---

<p align="center">
  Made with 🎵 by <a href="https://github.com/rios-ai">Rios</a>
</p>
