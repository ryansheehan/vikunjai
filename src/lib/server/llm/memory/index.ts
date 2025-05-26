import { MemorySaver } from "@langchain/langgraph";
import {v4 as uuidv4} from 'uuid';
import type {RunnableConfig} from '@langchain/core/runnables';
import type {Metadata} from '$lib/types';

export function getInvokeConfig(chatId?: string, metadata?: Metadata): RunnableConfig {
    return {
        configurable: {
            thread_id: chatId ?? uuidv4(),
        },
        metadata,
    } satisfies RunnableConfig;
}

export const memory = new MemorySaver();
