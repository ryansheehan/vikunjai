import { SystemMessage } from '@langchain/core/messages';
import { objectTypeDescriptions } from './object-type-descriptions';
import { context } from './context';

export const vikunjaSystemMessage = new SystemMessage({
	content: `# VikunjAI Context

${context}
${objectTypeDescriptions}

`
});
