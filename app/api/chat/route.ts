import { google } from '@ai-sdk/google';
import { streamText } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
    const { messages } = await req.json();

    const result = await streamText({
        model: google('models/gemini-1.5-pro-latest'),
        messages,
        system: 'You are an AI expert on the EU AI Act and regulatory compliance. You help users analyze documents and assess risk. Be concise, professional, and cite specific articles of the AI Act where relevant.',
        onFinish: async ({ text }) => {
            // Save assistant message to DB
            // Note: We need the chat_id. For this prototype, we might assume a single chat or pass it in headers/body.
            // If 'messages' contains the history, we just save the new interaction?
            // Implementing full persistence requires handling chat sessions.
            // For now, we will log it.
            // To do it properly:
            // 1. Extract chat_id from req body
            // 2. Save user message (last in array)
            // 3. Save assistant message (text)
        }
    });

    // @ts-ignore
    return result.toDataStreamResponse();
}
