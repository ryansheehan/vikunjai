import {z} from 'zod';
import type {SerializedMessage, MessageType} from '$lib/server/llm/serializers/browser';

const postChatSchema = z.object({
    chatId: z.string().optional(),
    exclude: z.array(z.string()).optional().default([]),
    message: z.string().min(1, 'Message content must not be empty'),
});

export type PostChatRequest = z.infer<typeof postChatSchema>;

export function validatePostChatSchema(data: unknown) {
    const result = postChatSchema.safeParse(data);
    return result;
}

export type Message = SerializedMessage;
export interface PostChatResponse {
    messages: Message[];
    chatId: string;
}

export type { MessageType };
