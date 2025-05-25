<script lang="ts">
    import ChevronRightIcon from '@lucide/svelte/icons/chevron-right';
    import * as Card from '$lib/components/ui/card';
    import {Button} from '$lib/components/ui/button';
    import { Textarea } from '$lib/components/ui/textarea';
    import type {HTMLTextareaAttributes, FormEventHandler, KeyboardEventHandler} from 'svelte/elements';
    import {cn} from '$lib/utils';

    interface Props extends Omit<HTMLTextareaAttributes, 'onsubmit'> {
        onsubmit?: (value: string) => void;        
    }

    let {
        onsubmit, 
        oninput,
        onkeydown, 
        value = $bindable(''), 
        class: className, 
        ...restProps
    }: Props = $props();

    let ref = $state<HTMLTextAreaElement | null>(null);

    let internalValue = $state('');

    const oninputInternal: FormEventHandler<HTMLTextAreaElement> = (event) => {
        value = internalValue;        
        oninput?.(event);
    }

    const onkeydownInternal: KeyboardEventHandler<HTMLTextAreaElement> = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            if (event.shiftKey) {
                internalValue += '\n';
            } else {
                submit();                
            }
        }
        onkeydown?.(event);
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
            oninput={oninputInternal}
            onkeydown={onkeydownInternal}
            class={['border-0 max-h-[calc(9*1.6*16px)]', className]} 
            placeholder="Ask VikunjAI"
            {...restProps}/>
            <Button variant="outline" size="icon" onclick={submit}>
                <ChevronRightIcon />
                <span class="sr-only">Send</span>
            </Button>
    </Card.Content>
</Card.Root>

