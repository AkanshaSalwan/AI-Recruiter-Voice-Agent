import OpenAI from "openai";
import { NextResponse } from "next/server";
import { FEEDBACK_PROMPT } from "@/services/Constants";

const FREE_MODELS = [
    "google/gemma-4-31b-it:free",
    "google/gemma-4-26b-a4b-it:free",
    "openrouter/free",
];

function parseJsonContent(content) {
    const cleaned = content
        .replace(/```json/gi, "")
        .replace(/```/g, "")
        .trim();

    try {
        return JSON.parse(cleaned);
    } catch {
        const objectMatch = cleaned.match(/\{[\s\S]*\}/);
        if (!objectMatch) return null;

        try {
            return JSON.parse(objectMatch[0]);
        } catch {
            return null;
        }
    }
}

export async function POST(request) {
    try {
        const { conversation } = await request.json();

        if (!Array.isArray(conversation) || conversation.length === 0) {
            return NextResponse.json(
                { error: "Interview conversation is required" },
                { status: 400 }
            );
        }

        const finalPrompt = FEEDBACK_PROMPT.replace(
            "{{conversation}}",
            JSON.stringify(conversation)
        );
        const openai = new OpenAI({
            baseURL: "https://openrouter.ai/api/v1",
            apiKey: process.env.OPENROUTER_API_KEY,
            defaultHeaders: {
                "HTTP-Referer": "http://localhost:3000",
                "X-Title": "AI Recruiter Voice Agent",
            },
        });

        let lastError = null;

        for (const model of FREE_MODELS) {
            try {
                const completion = await openai.chat.completions.create({
                    model,
                    messages: [
                        {
                            role: "system",
                            content: "Return only valid JSON. No markdown. Use the requested feedback schema.",
                        },
                        { role: "user", content: finalPrompt },
                    ],
                });

                const message = completion.choices?.[0]?.message;
                const content = Array.isArray(message?.content)
                    ? message.content.map((part) => part?.text || "").join("\n")
                    : message?.content;

                if (!content) {
                    lastError = new Error("AI returned an empty response");
                    continue;
                }

                const parsed = parseJsonContent(content);
                if (!parsed?.feedback) {
                    lastError = new Error("AI returned invalid feedback JSON");
                    continue;
                }

                return NextResponse.json({ content: JSON.stringify(parsed) });
            } catch (error) {
                lastError = error;
                const status = error?.status || error?.statusCode;
                const isRateLimited =
                    status === 429 || String(error?.message || "").includes("429");
                if (isRateLimited) continue;
                throw error;
            }
        }

        return NextResponse.json(
            {
                error: lastError?.message || "Unable to generate valid interview feedback.",
                details: lastError?.message,
            },
            { status: lastError?.message === "AI returned invalid feedback JSON" ? 502 : 429 }
        );
    } catch (error) {
        console.error("Feedback generation failed:", error);
        return NextResponse.json(
            { error: error?.message || "Failed to generate feedback" },
            { status: error?.status || 500 }
        );
    }
}