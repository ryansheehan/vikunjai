import {HumanMessage} from '@langchain/core/messages';
import type {LLM} from '$lib/server/llm';
import {getInvokeConfig} from '$lib/server/llm/memory';

export interface HumanMessageParams {
    chatId?: string;
    message: string;
    llm: LLM;
}
export async function invokeHumanMessage({chatId, message, llm}: HumanMessageParams) {
    const config = getInvokeConfig(chatId);
    const humanMessage = new HumanMessage(message);
    const {messages} = await llm.invoke({messages: [humanMessage]}, config);
    return {messages, chatId: config.configurable!.thread_id as string} ;
}

export type ChatState = ReturnType<typeof invokeHumanMessage>;
