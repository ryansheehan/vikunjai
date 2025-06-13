import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { ChatVertexAI} from "@langchain/google-vertexai";
import { ChatOpenAI } from "@langchain/openai";
import { env } from "$env/dynamic/private";
import * as process from "process"

export function createGeminiModel() {
    console.log(process.env.GOOGLE_API_KEY);
    const model = new ChatGoogleGenerativeAI({
        model: "gemini-2.0-flash-lite",
        temperature: 0,
        apiKey: process.env.GOOGLE_API_KEY,
    });
    return model;
}


export function createGemmaModel() {
    const model = new ChatOpenAI({
        model: "google/gemma-3-12b",
        temperature: 0,
        configuration: {
            baseURL: "http://localhost:1234/v1",
            apiKey: 'not needed'
        }
    });
    return model;
}