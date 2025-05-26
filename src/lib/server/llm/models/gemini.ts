import {ChatGoogleGenerativeAI} from '@langchain/google-genai';
import {env} from "$env/dynamic/private";

export const model = new ChatGoogleGenerativeAI({
    model: "gemini-2.0-flash-lite",
    temperature: 0,
    apiKey: env.GOOGLE_API_KEY,
});
