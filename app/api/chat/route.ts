import { NextRequest, NextResponse } from "next/server";

import { openrouter } from "@/lib/openrouter";

import { addTodoTool } from "@/tools/add-todo";

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    const result = openrouter.callModel({
      model: process.env.MODEL!,

      instructions: `
You are an AI Todo Assistant.

Whenever user wants to create a todo,
always call addTodo.

Never pretend to save a todo.
`,

      input: message,

      tools: [addTodoTool] as const,
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