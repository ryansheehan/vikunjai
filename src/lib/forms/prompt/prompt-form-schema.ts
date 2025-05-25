import {z} from 'zod';
import type {AIMessage, StoredMessageData} from '@langchain/core/messages';
import type {FormResult} from 'sveltekit-superforms';
import type { StringOutputParser } from '@langchain/core/output_parsers';


export const promptFormSchema = z.object({
    prompt: z.string().min(1, 'Prompt is required'),
    
});

export function extractResponse(response: AIMessage) {
    return response.toDict().data;
}

export type PromptFormSchema = typeof promptFormSchema;
export type PromptFormData = z.infer<PromptFormSchema>;

export type PromptResponse = StoredMessageData;
export type PromptFormResponse = {content: string};
