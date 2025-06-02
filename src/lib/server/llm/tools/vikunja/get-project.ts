import { tool } from '@langchain/core/tools';
import { z } from 'zod';
import { env } from '$env/dynamic/private';
import type { Project } from 'node-vikunja';

const projectStates = ['all'] as const;
type ProjectState = (typeof projectStates)[number];

const getProjectToolInputSchema = z.object({
	state: z
		.enum(projectStates)
		.default('all')
		.describe(
			'filter projects by name. Defaults to "all" if not specified and "all" returns all projects.'
		)
});

type GetProjectToolInput = z.infer<typeof getProjectToolInputSchema>;

export const vikunjaGetProject = tool(
	async ({ state }: GetProjectToolInput, { metadata }) => {
		const vikunjaData = metadata?.vikunja;

		if (!vikunjaData || !vikunjaData.projectId || !vikunjaData.viewId) {
			throw new Error('projectId and viewId required');
		}

		const projectId = vikunjaData.projectId;

		const url = new URL(`${env.VIKUNJA_URL}/api/v1/projects/${projectId}`);

		switch (state) {
			case 'all':
			default:
				break;
		}

		const response = await fetch(url, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${env.VIKUNJA_API_KEY}`
			}
		});

		if (!response.ok) {
			throw new Error(`Failed to fetch project: ${response.statusText}`);
		}

		const data: Project[] = await response.json();

		return JSON.stringify(data);
	},
	{
		name: 'vikunja_get_project',
		description: 'Get project from Vikunja tasks management system.',
		schema: getProjectToolInputSchema
	}
);
