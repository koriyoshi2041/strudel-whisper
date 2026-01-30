import Anthropic from '@anthropic-ai/sdk'
import { getSystemPrompt } from './prompts'

const anthropic = new Anthropic({
  apiKey: import.meta.env.VITE_ANTHROPIC_API_KEY,
  dangerouslyAllowBrowser: true, // For demo purposes - in production, use a backend
})

export async function generateStrudelCode(userPrompt: string): Promise<string> {
  const systemPrompt = getSystemPrompt()
  
  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 1024,
    system: systemPrompt,
    messages: [
      {
        role: 'user',
        content: userPrompt,
      },
    ],
  })

  // Extract text from response
  const textContent = response.content.find(block => block.type === 'text')
  if (!textContent || textContent.type !== 'text') {
    throw new Error('No text response from Claude')
  }

  // Clean up the response - remove any markdown code blocks if present
  let code = textContent.text.trim()
  
  // Remove markdown code fences if present
  if (code.startsWith('```')) {
    code = code.replace(/^```(?:javascript|js)?\n?/, '').replace(/\n?```$/, '')
  }
  
  return code.trim()
}
