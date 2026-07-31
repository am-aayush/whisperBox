import { google } from '@ai-sdk/google';
import { generateText } from 'ai';

export async function POST(request: Request) {
    try {
        const response = await generateText({
            model: google('gemini-3.1-flash-lite'),
            prompt: "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What’s a hobby you’ve recently started?||If you could have dinner with any historical figure, who would it be?||What’s a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.",
        });

        return Response.json({ success: true, message: response.text }, { status: 200 })
    } catch (error) {
        return Response.json({ success: false, message: "Error handling api", error: error }, { status: 500 })
    }
}

