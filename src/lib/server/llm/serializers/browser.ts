import type {Messages} from '$lib/server/llm';
import type {MessageType} from '@langchain/core/messages';

export type {MessageType} from '@langchain/core/messages';

export interface SerializedMessage {
    id: string;
    role: MessageType;
    content: string;
}

export function serializeMessages(messages: Messages, skipIds: Set<string>) {
    return messages
        .filter(message => {
            // Filter out messages with missing an id or if the client
            // has explicitly requested to skip
            if (!message.id || skipIds.has(message.id)) return false;

            const role = message.getType();

            // filter out tool messages
            if (role === 'tool') return false;
            
            // filter out messages that are tool calls
            if (role === 'ai' 
                && 'tool_calls' in message 
                && Array.isArray(message.tool_calls) 
                && message.tool_calls.length > 0
            ) {
                    return false;
            }            

            return true;
        })
        .map(message => {            
            const {id, content} = message;
            const role = message.getType();

            return {
                id: id!,
                role,
                content: content as string,
            } satisfies SerializedMessage;
        });
}