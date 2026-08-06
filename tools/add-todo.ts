import { tool } from "@openrouter/agent";
import { z } from "zod";

import { db } from "@/db";
import { todos } from "@/db/schema";

export const addTodoTool = tool({
  name: "addTodo",

  description: "Create a new todo item.",

  inputSchema: z.object({
    title: z.string().describe("Title of the todo"),
  }),

  outputSchema: z.object({
    success: z.boolean(),
    id: z.number(),
    title: z.string(),
  }),

  execute: async ({ title }) => {
    const [todo] = await db
      .insert(todos)
      .values({
        title,
      })
      .returning();

    return {
      success: true,
      id: todo.id,
      title: todo.title,
    };
  },
});