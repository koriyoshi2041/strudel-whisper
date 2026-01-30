# AGENTS.md - Strudel Whisper

## Project Overview

**Strudel Whisper** - 用自然语言描述音乐，生成 Strudel live coding 代码。

目标：降低 Strudel 的入门门槛，让任何人都能通过自然语言描述来创作算法音乐。

## Tech Stack

- **Frontend**: React 18 + Vite + TypeScript
- **Styling**: Tailwind CSS
- **LLM**: Claude API (via Anthropic SDK)
- **Strudel**: @strudel/repl 或 iframe embed
- **Hosting**: Vercel

## Project Structure

```
strudel-whisper/
├── src/
│   ├── components/
│   │   ├── InputPanel.tsx      # 自然语言输入
│   │   ├── CodePanel.tsx       # 生成的代码显示
│   │   ├── PreviewPanel.tsx    # Strudel 预览
│   │   └── ExamplesPanel.tsx   # 示例库
│   ├── lib/
│   │   ├── llm.ts              # LLM 调用封装
│   │   ├── prompts.ts          # Prompt 模板
│   │   └── patterns.ts         # Pattern 库
│   ├── App.tsx
│   └── main.tsx
├── public/
├── prompts/
│   └── system.md               # System prompt
├── package.json
└── README.md
```

## Key Files

- `prompts/system.md` - 核心 system prompt，包含 Strudel 语法参考
- `src/lib/patterns.ts` - 常用 pattern 示例库
- `src/lib/prompts.ts` - Prompt 构建逻辑

## Development

```bash
npm install
npm run dev
```

需要环境变量：
- `VITE_ANTHROPIC_API_KEY` - Claude API key

## Guidelines

1. **代码正确性优先** - 生成的 Strudel 代码必须能运行
2. **用户体验流畅** - 快速响应，流式输出
3. **教学价值** - 生成的代码应该是好的学习材料
4. **简洁美观** - UI 要配得上 live coding 的美学

## MVP Scope

- [x] 基础项目结构
- [x] 自然语言输入 → Strudel 代码
- [x] Strudel REPL 链接预览（Open in Strudel）
- [x] 5 个 few-shot 示例
- [x] 基础错误处理
- [x] TypeScript 类型修复

## Progress Log

### 2025-01-30
**修复 TypeScript 错误，UI 正常运行**

1. **问题**: `import.meta.env` 和 CSS 模块缺少类型声明
2. **解决**: 创建 `src/vite-env.d.ts` 添加 Vite 类型定义
3. **结果**: `tsc --noEmit` 无错误，`npm run dev` 正常启动

**UI 验证**:
- ✅ Header（Strudel Whisper 渐变标题）
- ✅ InputPanel（自然语言输入框 + Generate 按钮）
- ✅ ExamplesPanel（5 个音乐示例）
- ✅ CodePanel（代码显示 + 复制 + Open in Strudel）
- ✅ PreviewPanel（Play in Strudel 按钮）
- ✅ Footer

**待办**:
- [ ] 配置 `VITE_ANTHROPIC_API_KEY` 测试 LLM 调用
- [ ] 考虑添加嵌入式 Strudel REPL（iframe）
- [ ] 流式输出支持
