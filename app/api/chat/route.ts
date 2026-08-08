import { NextRequest, NextResponse } from "next/server";

import { openrouter } from "@/lib/openrouter";

import { addTodoTool } from "@/tools/add-todo";
import { updateTodoTool } from "@/tools/update-todo";
import { deleteTodoTool } from "@/tools/delete-todo";
import { listTodosTool } from "@/tools/list-todos";
import { toggleTodoTool } from "@/tools/toggle-todo";

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    const result = openrouter.callModel({
      model: process.env.MODEL!,

      instructions: `
You are a helpful AI assistant.
When the user mentions todos, tasks, or task management, you can help with todo operations using the available tools.
For todo operations:
- When user wants to create a todo, call addTodo
- When user wants to update a todo, call updateTodo
- When user wants to delete a todo, call deleteTodo
- When user wants to toggle a todo completion status, call toggleTodo
- When user wants to list or see todos, call listTodos
For all other topics, engage in normal conversation without using tools.
Never pretend to save a todo - always use the tools when dealing with todos.
`,

      input: message,

      tools: [addTodoTool, updateTodoTool, deleteTodoTool, listTodosTool, toggleTodoTool] as const,
    });

    const text = await result.getText();

    return NextResponse.json({
      success: true,
      message: text,
    });

  } catch (err) {
    console.error(err);

    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}