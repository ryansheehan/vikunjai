import type { Handle } from '@sveltejs/kit';
import {workflow} from '$lib/server/llm/workflows';

const handle: Handle = async ({event, resolve}) => {
    event.locals.llm = workflow;
    return await resolve(event);
}

export default handle;