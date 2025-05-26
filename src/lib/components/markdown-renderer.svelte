<script lang="ts">
    import {unified} from 'unified';
    import remarkParse from 'remark-parse';
    import remarkRehype from 'remark-rehype';
	import remarkGfm from 'remark-gfm';
    import rehypeStringify from 'rehype-stringify';
    import rehypeSanitize from 'rehype-sanitize';
    
    import type {ClassValue} from 'svelte/elements';
    import {cn} from '$lib/utils';

    interface Props {
        markdown: string;
        class?: ClassValue;
    }

    let {class: className, markdown}: Props = $props();
    let htmlPromise = $derived.by(async () => {
        const file = await unified()
            .use(remarkParse)
            .use(remarkGfm)
            .use(remarkRehype)
            .use(rehypeSanitize)
            .use(rehypeStringify)
            .process(markdown)
            

        const html = String(file);        
        return html;
    })
</script>

<div class={cn('markdown-renderer', className)}>
    {#await htmlPromise then html}
        {@html html}
    {/await}
</div>
