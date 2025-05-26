import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const config = {
	preprocess: [vitePreprocess(), mdsvex()],
	kit: { 
		adapter: adapter(),
		alias: {
			'$api': 'src/routes/api',
			'$api/*': 'src/routes/api/*',
		}
	},
	extensions: ['.svelte', '.svx']
};

export default config;
