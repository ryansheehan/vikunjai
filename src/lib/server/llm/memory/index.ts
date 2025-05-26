import { MemorySaver } from "@langchain/langgraph";
import {v4 as uuidv4} from 'uuid';
import type {RunnableConfig} from '@langchain/core/runnables';

export function getInvokeConfig(chatId?: string): RunnableConfig {
    return {
        configurable: {
            thread_id: chatId ?? uuidv4(),
        }
    } satisfies RunnableConfig;
}

export const memory = new MemorySaver();
