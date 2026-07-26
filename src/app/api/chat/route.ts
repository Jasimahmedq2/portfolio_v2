import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { retrieveRelevantChunks, getRAGSystemPrompt, getLocalFallbackResponse } from '@/components/chat/knowledge';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: 'Invalid request: messages array is required' },
        { status: 400 }
      );
    }

    const lastUserMessage = messages[messages.length - 1]?.content || '';

    // Support DeepInfra token / OpenAI API Key environment variables
    const apiKey = process.env.DEEPINFRA_TOKEN || process.env.OPENAI_API_KEY;
    const baseURL = process.env.DEEPINFRA_BASE_URL || process.env.OPENAI_BASE_URL || 'https://api.deepinfra.com/v1/openai';
    const model = process.env.DEEPINFRA_MODEL || process.env.OPENAI_MODEL || 'deepseek-ai/DeepSeek-V3';

    // If no API token is configured in environment, use vectorless local fallback engine
    if (!apiKey) {
      const fallbackReply = getLocalFallbackResponse(lastUserMessage);
      return NextResponse.json({ reply: fallbackReply, fallback: true });
    }

    // 1. Vectorless RAG: Retrieve context chunks matching user query
    const retrievedChunks = retrieveRelevantChunks(lastUserMessage, 4);

    // 2. Generate RAG system prompt with guardrails & retrieved context
    const systemPrompt = getRAGSystemPrompt(retrievedChunks);

    // 3. Initialize OpenAI client for DeepInfra / OpenAI API
    const openai = new OpenAI({
      apiKey,
      baseURL: baseURL.replace(/\/$/, ''),
    });

    // 4. Format chat messages for model completion
    const formattedMessages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
      { role: 'system', content: systemPrompt },
      ...messages.map((m: { role: 'user' | 'assistant' | 'system'; content: string }) => ({
        role: m.role,
        content: m.content,
      })),
    ];

    // 5. Execute DeepInfra DeepSeek-V3 / OpenAI completion request
    const completion = await openai.chat.completions.create({
      model: model,
      messages: formattedMessages,
      temperature: 0.7,
      max_tokens: 600,
    });

    const reply = completion.choices[0]?.message?.content || getLocalFallbackResponse(lastUserMessage);

    return NextResponse.json({ reply });
  } catch (error: any) {
    console.error('DeepInfra / OpenAI Chat API Error:', error?.message || error);
    // Graceful fallback on API error or rate limits
    const lastUserMessage = (await req.clone().json().catch(() => ({})))?.messages?.slice(-1)[0]?.content || '';
    const fallbackReply = getLocalFallbackResponse(lastUserMessage);
    return NextResponse.json({ reply: fallbackReply, fallback: true });
  }
}
