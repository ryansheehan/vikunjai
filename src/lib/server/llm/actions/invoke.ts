import {HumanMessage} from '@langchain/core/messages';
import type {LLM} from '$lib/server/llm';
import {getInvokeConfig} from '$lib/server/llm/memory';
import type { Metadata } from '$lib/types';
import {vikunjaSystemMessage} from '$lib/server/llm/messages/system';

export interface HumanMessageParams {
    chatId?: string;
    metadata?: Metadata;
    message: string;
    llm: LLM;
}
export async function invokeHumanMessage({chatId, metadata, message, llm}: HumanMessageParams) {
    const showSystemMessage = !chatId;
    const inputMessages = showSystemMessage ? [vikunjaSystemMessage] : [];
    const config = getInvokeConfig(chatId, metadata);
    const humanMessage = new HumanMessage(message);
    const {messages} = await llm.invoke({messages: [...inputMessages, humanMessage]}, config);
    return {messages, chatId: config.configurable!.thread_id as string} ;
}

export type ChatState = ReturnType<typeof invokeHumanMessage>;
