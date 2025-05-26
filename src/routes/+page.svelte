<script lang="ts">        
    import ChatInput from '$lib/components/chat/input.svelte';    
    import Conversation from '$lib/components/chat/conversation.svelte';
    import type {PostChatResponse, PostChatRequest, Message} from '$api/chat/types';

    let chatId = $state<string | undefined>(undefined);
    let messages = $state<Message[]>([]);
    let exclude = $derived(messages.map(({id}) => id));

    const onsubmit = async (content: string) => {
        const postChat: PostChatRequest = {
            chatId,
            exclude,
            message: content
        };

        const response = await fetch('/api/chat', {
            method: 'POST',
            body: JSON.stringify(postChat),
        });

        if (!response.ok) {
            console.error('Request failed', response.status, response.statusText);
            return;
        }

        const data: PostChatResponse = await response.json();
        messages = [...messages, ...data.messages];
        chatId = data.chatId;
    }
</script>

<div class="flex-1 grid grid-cols-1 grid-rows-[1fr_min-content] gap-6">
    <Conversation {messages} />
    <ChatInput {onsubmit} />
</div>
