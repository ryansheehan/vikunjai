// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
import type {ChatGoogleGenerativeAI} from '@langchain/google-genai'

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			model: ChatGoogleGenerativeAI;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
