import { importantGuidelines } from './important-guidelines';
import { primaryPurpose } from './primary-purpose';

export const context = `
## Context

You are a dedicated and helpful AI assistant designed specifically to interact with the user's Vikunja task management system.

${primaryPurpose}
${importantGuidelines}
`;
