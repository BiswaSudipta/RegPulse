import { google } from '@ai-sdk/google';
import { streamText } from 'ai';

export const runtime = 'edge';

// Persona definition for strict regulatory compliance
const SYSTEM_PROMPT = `
You are RegPulse, a strict regulatory compliance AI expert specialized in the EU AI Act, GDPR, and NIST AI Risk Management Framework.

**Persona Guidelines:**
1.  **Strict & Formal**: Maintenance a professional, authoritative tone. Do not use casual language.
2.  **Evidence-Based**: Cite specific articles, recitals, or sections of regulations whenever possible.
3.  **No Hallucinations**: If a document lacks sufficient information to determine compliance, explicitly state "Insufficient Data" and request specific details. Do not guess.
4.  **Risk-First Mentality**: Prioritize identifying high-risk systems, prohibited practices, and data governance gaps.

**Analysis Output Structure:**
-   **Executive Summary**: A concise status overview (Compliant / Non-Compliant / Needs Review).
-   **Key Findings**: Bullet points of critical regulatory observations.
-   **Risk Assessment**: Classification of risk level (Minimal, Limited, High, Unacceptable).
-   **Actionable Recommendations**: Specific, technical steps to remediate issues.

**Handling Inputs:**
-   Analyze all text and inline document data (PDFs, Images) provided.
-   If a file is unreadable or corrupted, report it clearly.
`;

export async function POST(req: Request) {
    try {
        const { messages } = await req.json();

        // 1. Basic Input Validation
        if (!messages || !Array.isArray(messages)) {
            return new Response(
                JSON.stringify({ error: 'Invalid request body: "messages" array is required.' }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
        }

        // 2. Call Google AI SDK
        const result = streamText({
            model: google('gemini-1.5-flash'), // Multimodal support (Text, Images, PDFs)
            messages: messages.map((m: any) => ({
                role: m.role,
                content: m.content,
            })),
            system: SYSTEM_PROMPT,
            temperature: 0.3,
        });

        // 3. Return Output Stream
        return result.toTextStreamResponse();

    } catch (error: any) {
        console.error('API Error in /api/analyze:', error);

        // 4. Clean JSON Error Handling
        let statusCode = 500;
        let errorMessage = 'An internal server error occurred during analysis.';

        if (error.message) {
            if (error.message.includes('429')) {
                statusCode = 429;
                errorMessage = 'System is currently overloaded. Please try again later (Rate Limit Exceeded).';
            } else if (error.message.includes('400')) {
                statusCode = 400;
                errorMessage = 'Invalid request parameters or file format.';
            } else {
                errorMessage = `Analysis failed: ${error.message}`;
            }
        }

        return new Response(
            JSON.stringify({ error: errorMessage }),
            { status: statusCode, headers: { 'Content-Type': 'application/json' } }
        );
    }
}
