import type { ServerInit, Handle } from '@sveltejs/kit';
import {sequence} from '@sveltejs/kit/hooks';
import {initModel, getModel} from '$lib/llm/models/gemini/model';

export const init: ServerInit = async () => {
    initModel();
}

const modelHandle: Handle = async ({event, resolve}) => {
    event.locals.model = getModel()!;
    const response = await resolve(event);
    return response;
}

export const handle = sequence(
    modelHandle,
);