<script lang="ts">
    import ChevronRightIcon from '@lucide/svelte/icons/chevron-right';
    import * as Card from '$lib/components/ui/card';
    import {Button} from '$lib/components/ui/button';
    import { Textarea } from '$lib/components/ui/textarea';
    import type {FormEventHandler, KeyboardEventHandler} from 'svelte/elements';

    interface Props {
        onsubmit?: (value: string) => void;
        value?: string;
    }

    let {
        onsubmit, 
        value = $bindable(''), 
        ...restProps
    }: Props = $props();

    let ref = $state<HTMLTextAreaElement | null>(null);

    let internalValue = $state('');

    const oninput: FormEventHandler<HTMLTextAreaElement> = (event) => {
        value = internalValue;        
    }

    const onkeydown: KeyboardEventHandler<HTMLTextAreaElement> = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            if (event.shiftKey) {
                internalValue += '\n';
            } else {
                submit();                
            }
        }
    }  
    
    const submit = () => {
        onsubmit?.(internalValue);
        internalValue = '';
    }
</script>

<Card.Root>
    <Card.Content class="flex gap-4 items-end">
        <Textarea 
            bind:ref 
            bind:value={internalValue}  
            {oninput}
            {onkeydown}
            class="border-0 max-h-[calc(9*1.6*16px)]" 
            placeholder="Ask VikunjAI"
            {...restProps}/>
            <Button variant="outline" size="icon" onclick={submit}>
                <ChevronRightIcon />
                <span class="sr-only">Send</span>
            </Button>
    </Card.Content>
</Card.Root>

