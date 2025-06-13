import { ChatOpenAI } from "@langchain/openai";

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