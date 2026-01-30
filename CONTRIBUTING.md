# Contributing to Strudel Whisper

First off, thanks for taking the time to contribute! 🎵

## Ways to Contribute

### 🐛 Bug Reports

Found a bug? Please open an issue with:
- A clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable

### 💡 Feature Requests

Have an idea? Open an issue describing:
- The problem you're trying to solve
- Your proposed solution
- Any alternatives you've considered

### 🎨 Code Contributions

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit (`git commit -m 'Add amazing feature'`)
5. Push (`git push origin feature/amazing-feature`)
6. Open a Pull Request

### 🎼 Musical Contributions

We especially welcome contributions that improve the musical output:

- **New example patterns** — Add more genres and styles to `ExamplesPanel.tsx`
- **Prompt improvements** — Help make the AI generate better code in `prompts/system.md`
- **Music theory knowledge** — Help the AI understand musical concepts better

## Development Setup

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/strudel-whisper.git
cd strudel-whisper

# Install dependencies
npm install

# Set up environment
cp .env.example .env
# Add your ANTHROPIC_API_KEY

# Start dev server
npm run dev
```

## Code Style

- We use TypeScript
- Tailwind CSS for styling
- Components go in `src/components/`
- Utilities go in `src/lib/`

## Questions?

Feel free to open an issue or reach out. Happy coding! 🎵
