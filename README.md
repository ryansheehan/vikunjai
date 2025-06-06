# VikunjAI

This is a demo project to demonstrate [LangChain](https://js.langchain.com/docs/introduction/) and [LangGraph](https://langchain-ai.github.io/langgraphjs/concepts/). The goal of this project is to create an ai agent workflow that can conversationally interact with a [Vikunja](https://vikunja.io/) instance to manage tasks

## Requirements

* Google Gemini API key
* docker
* Node.js v24
* pnpm

## Project Objectives

- [x] Conversation AI web interface
- [x] Model a LangGraph
- [x] Introduce a tool
- [ ] [**State**] Expand state beyond `messages`
- [ ] [**State**] Remove unnecessary messages from context
- [ ] [**State**] 3-way sync state between client/llm/todo-database
- [x] [**Tool**] List tasks in a project
- [x] [**Tool**] Mark a task as done
- [x] [**Tool**] Create a task
- [ ] [**Graph**] Expand graph to a more interesting workflow
- [ ] [**Graph**] Add human approval step
- [ ] [**Memmory**] Sync context with a database
- [ ] [**App**] Manage multiple conversations
- [ ] [**App**] Authentication
- [ ] [**App**] Streaming responses
- [ ] [**App**] Explore [AG-UI](https://docs.ag-ui.com/introduction) integration
- [ ] [**Maintenance**] Create docker compose with vikunja setup and initial data

## Agent Workflow

This is the workflow as it stands currently

![Agent Workflow Diagram](./agent-workflow.png "Agent Workflow")

## Develop

1. Install packages

    ```bash
    pnpm install
    ```

2. Run vikuna docker image

    |   |  |
    |---|-------|
    | username | `admin` |
    | email | `admin@admin.com` |
    | password | `password` |


    ```bash
    pnpm run vikunja:up

    #or

    docker compose up -d
    ```

3. Run app

    ```bash
    pnpm run dev
    ```
