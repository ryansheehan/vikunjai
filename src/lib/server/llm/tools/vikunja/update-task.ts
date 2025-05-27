import { tool } from '@langchain/core/tools';
import { z } from 'zod';
import {env} from '$env/dynamic/private';
import type {Task} from 'node-vikunja';

const updateTaskToolInputSchema = z.object({
    id: z.number().int().describe('The ID of the task to update.  This is required to update a task.'),
    done: z.boolean().optional().describe('Mark the task as done or not done.'),
    priority: z.number().int().min(0).max(5).optional().describe('Mark the task priority, when 0 or not specified, the task priority is considered none. 1 is low, 2 is medium, 3 is high, 4 is urgent, 5 is of immediate importance.'),
});

type UpdateTaskToolInput = z.infer<typeof updateTaskToolInputSchema>;

export const vikunjaUpdateTask = tool(async ({id, done, priority}: UpdateTaskToolInput, {metadata}) => {
    const vikunjaData = metadata?.vikunja;

    if (!vikunjaData || !id) {
        throw new Error('taskId required');
    }

    const url = new URL(`${env.VIKUNJA_URL}/api/v1/tasks/${id}`);

    const updateData: Partial<Task> = {
        id,
        done,
        priority,
    };

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${env.VIKUNJA_API_KEY}`,
        },
        body: JSON.stringify(updateData),
    });

    if (!response.ok) {
        throw new Error(`Failed to update task: ${response.statusText}`);
    }

    const updatedTask: Task = await response.json();

    return `Successfully updated task.
    \`\`\`json
    ${JSON.stringify(updatedTask, undefined, 2)}
    \`\`\`
    `;
}, {
    name: 'vikunja_update_task',
    description: 'Update an existing task in the Vikunja task management system. You can mark the task as done or not done and/or update a task priority.',
    schema: updateTaskToolInputSchema,
});

    