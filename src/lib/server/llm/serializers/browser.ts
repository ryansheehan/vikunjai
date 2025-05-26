import type {Messages} from '$lib/server/llm';
import type {MessageType} from '@langchain/core/messages';

export type {MessageType} from '@langchain/core/messages';

export interface SerializedMessage {
    id: string;
    role: MessageType;
    content: string;
}

export function serializeMessages(messages: Messages, skipIds: Set<string>) {
    return messages.filter(message => message.id && !skipIds.has(message.id))
        .map(message => {            
            const {id, content} = message;
            return {
                id: id!,
                role: message.getType(),
                content: content as string,
            } satisfies SerializedMessage;
        })
}