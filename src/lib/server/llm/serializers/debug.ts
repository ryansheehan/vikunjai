import type {Messages} from '$lib/server/llm';
import type {MessageType} from '@langchain/core/messages';
import {dev} from '$app/environment';

export function debug(messages: Messages, ...filter: MessageType[]) {
    if (!dev) return [];

    return messages
        .filter(message => {
            if (!filter || filter.length === 0) return true;

            const role = message.getType();

            // filter messaages
            const take =  filter.includes(role);

            if (take && role === 'tool') {
                message.content = JSON.parse(message.content as string);
            }

            return take;
        });
}