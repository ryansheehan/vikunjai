import { tool } from '@langchain/core/tools';
import { z } from 'zod';
import {env} from '$env/dynamic/private';
import type {Task} from 'node-vikunja';

const createTaskToolInputSchema = z.object({
    title: z.string().describe("The task text. This is what you'll see in the project."),
    description: z.string().optional().describe('The task description.'),
    priority: z.number().int().min(0).max(5).optional().describe('Task priority, when 0 or not specified, the task priority is considered none.  1 is low, 2 is medium, 3 is hight, 4 is urgent, 5 is of immediate importance.'),    
})

type CreateTaskToolInput = z.infer<typeof createTaskToolInputSchema>;

export const vikunjaCreateTask = tool(async ({title, description, priority}: CreateTaskToolInput, {metadata}) => {
    const vikunjaData = metadata?.vikunja;

    console.log('Vikunja instance data:', vikunjaData);

    if (!vikunjaData || !vikunjaData.projectId) {
        throw new Error('projectId and viewId required');
    }

    const projectId = vikunjaData.projectId;

    const url = new URL(`${env.VIKUNJA_URL}/api/v1/projects/${projectId}/tasks`);
    
    const newTask: Task = {
        project_id: projectId,
        title,
        description,
        priority,
    };

    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${env.VIKUNJA_API_KEY}`,
        },
        body: JSON.stringify(newTask),
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch tasks: ${response.statusText}`);
    }

    const createdTask: Task = await response.json();

    return `Successfully created.
    \`\`\`json
    ${JSON.stringify(createdTask, undefined, 2)}
    \`\`\`
    `;
}, {
    name: 'vikunja_create_task',
    description: 'Create a new task in the Vikunja task management system.',
    schema: createTaskToolInputSchema,
})