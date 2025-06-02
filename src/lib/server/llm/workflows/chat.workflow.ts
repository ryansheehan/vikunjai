import { createModel } from '$lib/server/llm/models';
import { memory } from '$lib/server/llm/memory';
import { START, END, Annotation, MessagesAnnotation, StateGraph } from '@langchain/langgraph';
import { ToolNode } from '@langchain/langgraph/prebuilt';

import {
	vikunjaGetAllTasks,
	vikunjaCreateTask,
	vikunjaUpdateTask,
	vikunjaGetProject
} from '$lib/server/llm/tools/vikunja';

// Tools
const vikunjaTools = [vikunjaGetAllTasks, vikunjaCreateTask, vikunjaUpdateTask, vikunjaGetProject];

// Model
const model = createModel().bindTools([...vikunjaTools]);

// State
const stateAnnotation = Annotation.Root({
	...MessagesAnnotation.spec
});

// Nodes
const AgentNode = 'agent';
async function agentNode(state: typeof stateAnnotation.State) {
	const messages = await model.invoke(state.messages);
	return { messages };
}

const VikunjaToolsNode = 'vikunjaTools';
const vikunjaToolsNode = new ToolNode(vikunjaTools);

// Edges
const shouldContinue = (state: typeof stateAnnotation.State) => {
	const { messages } = state;
	const lastMessage = messages[messages.length - 1];
	if (
		'tool_calls' in lastMessage &&
		Array.isArray(lastMessage.tool_calls) &&
		lastMessage.tool_calls?.length
	) {
		return VikunjaToolsNode;
	}
	return END;
};

// Graph
const graph = new StateGraph(stateAnnotation)
	// Nodes
	.addNode(AgentNode, agentNode)
	.addNode(VikunjaToolsNode, vikunjaToolsNode)
	// Edges
	.addEdge(START, AgentNode)
	.addConditionalEdges(AgentNode, shouldContinue, [VikunjaToolsNode, END])
	.addEdge(VikunjaToolsNode, AgentNode);

// Workflow
export const workflow = graph.compile({
	checkpointer: memory
});

export type Workflow = typeof workflow;
export type Messages = (typeof stateAnnotation.State)['messages'];
export type Message = Messages[number];
