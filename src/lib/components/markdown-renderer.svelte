<script lang="ts">
    import {unified} from 'unified';
    import remarkParse from 'remark-parse';
    import remarkRehype from 'remark-rehype';
    import rehypeStringify from 'rehype-stringify';
    import rehypeSanitize from 'rehype-sanitize';
    import {SvelteMap} from 'svelte/reactivity';

    interface Props {
        markdown: Promise<string>;
    }

    let {markdown: futureMarkdown}: Props = $props();
    let markdown = $derived(futureMarkdown.then(async md => {
        const file = await unified()
            .use(remarkParse)
            .use(remarkRehype)
            .use(rehypeSanitize)
            .use(rehypeStringify)
            .process(md)
            
        return String(file);
    }))
</script>

<div class="render-container">
    {#await markdown}
        <p>Loading...</p>
    {:then content}
        {#if content.length > 0}
            {@html content}
        {:else}
            <p>No content available.</p>
        {/if}
    {/await}
</div>
