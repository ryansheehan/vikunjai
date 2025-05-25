import {SvelteMap} from 'svelte/reactivity';

export interface MessageInput {
    source: string;
    content: string;
}

export interface Message extends MessageInput {
    id: number;
}

export class Conversation {
    #idGen = (function* () {
        let id = 1;
        while (true) { yield id++; }
    })();

    messages = new SvelteMap<number, Promise<Message>>();

    constructor() {

    }

    addMessage(futureInput: Promise<MessageInput>) {
        const id = this.#idGen.next().value;
        const futureMessage = futureInput.then(({content, source}) => {
            if (content.length === 0 && this.messages.has(id)) {
                // remove the message
                this.messages.delete(id);
            }
            return {id, source, content} satisfies Message;
        });
        this.messages.set(id, futureMessage);
        return futureMessage;
    }

    removeMessage(id: number) {
        this.messages.delete(id);
    }

    async toJson() {
        const messages = await Promise.all(Array.from(this.messages.values()));
        return messages.map(({id, source, content}) => ({id, source, content}));
    }

    fromJson(json: {id: number, source: string, content: string}[]) {
        this.messages.clear();
        json.forEach(({id, source, content}) => {
            this.messages.set(id, new Promise<Message>(resolve => resolve({id, source, content})));
        });
    }
}
