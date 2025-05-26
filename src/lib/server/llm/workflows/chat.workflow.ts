import model from '$lib/server/llm/models';
import { memory } from '$lib/server/llm/memory';
import {
  START,
  END,
  Annotation,
  MessagesAnnotation,
  StateGraph,  
} from "@langchain/langgraph";

// Tools
// todo ...

// State
const stateAnnotation = Annotation.Root({
    ...MessagesAnnotation.spec,
});

// Nodes
const NodeCallModel = "callModel";
async function callModel(state: typeof stateAnnotation.State) {
    const messages = await model.invoke(state.messages);
    return { messages };
}

// Graph
const graph = new StateGraph(stateAnnotation)
    // Nodes
    .addNode(NodeCallModel, callModel)
    // Edges
    .addEdge(START, NodeCallModel)
    .addEdge(NodeCallModel, END);

// Workflow
export const workflow = graph.compile({
    checkpointer: memory,
});

export type Workflow = typeof workflow;
export type Messages = (typeof stateAnnotation.State)["messages"];
export type Message = Messages[number];
