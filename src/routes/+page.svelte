<script lang="ts">    
    import * as Card from '$lib/components/ui/card';    
    import PromptForm from '$lib/forms/prompt/prompt-form.svelte';

    import ChatInput from '$lib/components/chat/input.svelte';

    import {Conversation} from '$lib/conversation/conversation.svelte.js';

    let {data} = $props();

    let response = $state<unknown>(null);
    function onResult(data: unknown) {
        console.log('results:');
        console.log(data);
        response = data;
    }    
</script>

<!-- <Card.Root class="max-w-lg mx-auto mt-4">
    <Card.Header>
        <Card.Title>VikunjAI</Card.Title>
        <Card.Description>Send prompt</Card.Description>
    </Card.Header>
    <Card.Content>
        <PromptForm form={data.form} {onResult} />
    </Card.Content>
</Card.Root> -->

<ChatInput />
