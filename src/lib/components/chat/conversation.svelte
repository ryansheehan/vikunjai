<script lang="ts">
    import MarkdownRenderer from '$lib/components/markdown-renderer.svelte';    
    import {ScrollArea} from '$lib/components/ui/scroll-area';
    import type {Message, MessageType} from '$api/chat/types';

    interface Props {
        messages: Message[];
    }

    let {messages}: Props = $props();
</script>

{#snippet userMessage(markdown: string, role: MessageType)}
    {@const corner = role === 'human' ? 'rounded-tr-none self-end' : ''}
    
    <MarkdownRenderer {markdown} class={["p-4 border rounded-xl max-w-2/3 bg-muted text-muted-foreground", corner]} />
{/snippet}

<ScrollArea>
    <div class="flex-1 flex flex-col justify-start gap-4">
        {#each messages as {id, content, role} (id)}            
            {@render userMessage(content, role)}
        {/each}
    </div>
</ScrollArea>
