import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import {validatePostChatSchema, type PostChatResponse} from './types';
import {invokeHumanMessage} from '$lib/server/llm/actions/invoke';
import {serializeMessages} from '$lib/server/llm/serializers/browser';

export const POST: RequestHandler = async ({locals, request}) => {
    const { llm } = locals;

    const body = await request.json();
    const {success, data} = validatePostChatSchema(body);

    if (!success) { return error(400, {message: 'Invalid request'}); }

    const {message, chatId, exclude} = data;

    const chatState = await invokeHumanMessage({chatId, message, llm});

    const excludeSet = new Set(exclude);
    const messages = serializeMessages(chatState.messages, excludeSet);

    const response: PostChatResponse = {
        chatId: chatState.chatId,
        messages,
    }

    return json(response);
}
