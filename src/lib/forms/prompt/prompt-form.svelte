<script lang="ts">
    import {
        promptFormSchema, 
        type PromptFormData, 
        type PromptFormResponse,        
        type PromptResponse,
    } from './prompt-form-schema';

    import * as Form from '$lib/components/ui/form';
    import { Textarea } from '$lib/components/ui/textarea';    
    import SuperDebug,{
        type SuperValidated,        
        superForm,        
    } from 'sveltekit-superforms';
    import {zodClient} from 'sveltekit-superforms/adapters';


    interface Props {
        onResult?: (content: string) => void;
        form: SuperValidated<PromptFormData>;
    }

    const {form: promptForm, onResult}: Props = $props();

    let promptInput = $state<HTMLTextAreaElement | null>(null);

    const form = superForm(promptForm, {
        validators: zodClient(promptFormSchema),
        multipleSubmits: 'abort',
        onSubmit: () => {
            setTimeout(() => promptInput?.focus(), 60);
        },        
        onUpdate({result}) {
            if (result.type === 'success') {
                const {content} = result.data as PromptFormResponse;
                onResult?.(content);
            }
        },
    });

    const { form: formData, enhance } = form;

    function submitKeyDown(event: KeyboardEvent) {
        if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
            event.preventDefault();
            form.submit();
        }
    }   

</script>

<SuperDebug data={$formData} />

<form method="POST" use:enhance class="flex flex-col">
    <Form.Field {form} name="prompt">
        <Form.Control>
            {#snippet children({props})}
            <Form.Label>Prompt</Form.Label>
            <Textarea
                bind:ref={promptInput}
                id={props.name}
                name={props.name}
                placeholder="Enter your prompt here..."
                class="w-full h-32"
                bind:value={$formData.prompt}
                onkeydown={submitKeyDown}></Textarea>
            {/snippet}
        </Form.Control>
        <Form.Description>Prompt for llm</Form.Description>
        <!-- <Form.FieldErrors /> -->
    </Form.Field>
    <Form.Button class="self-end mt-4">Send</Form.Button>
</form>
