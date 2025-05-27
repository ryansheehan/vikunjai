import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import {validatePostChatSchema, type PostChatResponse} from './types';
import {invokeHumanMessage} from '$lib/server/llm/actions/invoke';
import {serializeMessages} from '$lib/server/llm/serializers/browser';
import {debug} from '$lib/server/llm/serializers/debug';

export const POST: RequestHandler = async ({locals, request}) => {
    const { llm } = locals;

    const body = await request.json();
    const {success, data} = validatePostChatSchema(body);

    if (!success) { return error(400, {message: 'Invalid request'}); }

    const {message, chatId, exclude} = data;

    const metadata = {
        vikunja: {
            projectId: 2,
            viewId: 7,
        }
    }

    const chatState = await invokeHumanMessage({chatId, message, llm, metadata});

    debug(chatState.messages).forEach(msg => console.log(msg));

    const excludeSet = new Set(exclude);
    const messages = serializeMessages(chatState.messages, excludeSet);

    const response: PostChatResponse = {
        chatId: chatState.chatId,
        messages,
    }

    return json(response);
}
