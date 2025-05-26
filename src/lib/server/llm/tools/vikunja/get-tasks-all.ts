import { tool } from '@langchain/core/tools';
import { z } from 'zod';
import {env} from '$env/dynamic/private';
import type {Task} from 'node-vikunja';

const taskStates = ['all', 'completed', 'incomplete'] as const;
type TaskState = (typeof taskStates)[number];

const getAllTasksToolInputSchema = z.object({
    state: z.enum(taskStates)
        .default('all')
        .describe('filter tasks by if they are completed or not. Defaults to "all" if not specified and "all" returns all tasks regardless if they are done or not. "completed" returns only tasks that are done. "incomplete" returns only tasks that are not marked as done.'),
});

type GetAllTasksToolInput = z.infer<typeof getAllTasksToolInputSchema>;

export const vikunjaGetAllTasks = tool(async ({state}: GetAllTasksToolInput, {metadata}) => {
    const vikunjaData = metadata?.vikunja;

    if (!vikunjaData || (!vikunjaData.projectId || !vikunjaData.viewId)) {
        throw new Error('projectId and viewId required');
    }

    const projectId = vikunjaData.projectId;
    const viewId = vikunjaData.viewId;

    const url = new URL(`${env.VIKUNJA_URL}/api/v1/projects/${projectId}/views/${viewId}/tasks`);

    switch (state) {
        case 'completed':
            url.searchParams.set('filter', 'done=true');
            break;
        case 'incomplete':
            url.searchParams.set('filter', 'done=false');
            break;
        case 'all':
        default:
            break;
    }

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${env.VIKUNJA_API_KEY}`,
        },
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch tasks: ${response.statusText}`);
    }

    const data: Task[] = await response.json();    

    return JSON.stringify(data);
}, {
    name: 'vikunja_get_all_tasks',
    description: 'Get all tasks from Vikunja taks management system. The list can be optionally filtered by their completition state. Use the title property of a task unless additional properties are requested.',
    schema: getAllTasksToolInputSchema,
})
