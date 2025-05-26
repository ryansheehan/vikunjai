import {sequence} from '@sveltejs/kit/hooks';
import {llmHandle} from '$lib/server/llm/hooks';

export const handle = sequence(
    llmHandle,
);
