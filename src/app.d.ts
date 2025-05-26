// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
import type { LLM } from '$lib/server/llm';

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			llm: LLM;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
