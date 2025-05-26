<script lang="ts">
	import '../app.css';
	import { ModeWatcher } from 'mode-watcher';
	
	let { children } = $props();	
</script>

<ModeWatcher defaultMode="dark" />
<main class="p-4 md:p-8 lg:p-12 xl:p-16 2xl:p-20 min-h-screen flex flex-col">
	{@render children()}
</main>
