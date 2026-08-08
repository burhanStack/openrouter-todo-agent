import { tool } from "@openrouter/agent";
import { z } from "zod";

import { db } from "@/db";
import { todos } from "@/db/schema";

export const listTodosTool = tool({
  name: "listTodos",

  description: "List todo items with optional filters.",

  inputSchema: z.object({
    completed: z.boolean().optional().describe("Filter by completion status"),
    limit: z.number().min(1).max(100).optional().describe("Maximum number of todos to return"),
  }),

  outputSchema: z.object({
    success: z.boolean(),
    todos: z.array(
      z.object({
        id: z.number(),
        title: z.string(),
        completed: z.boolean(),
        createdAt: z.date(),
      })
    ),
  }),

  execute: async ({ completed, limit }) => {
    // Start with all todos
    let todosArray = await db.select().from(todos).orderBy(todos.createdAt);

    // Filter by completed status if provided
    if (completed !== undefined) {
      todosArray = todosArray.filter(todo => todo.completed === completed);
    }

    // Limit results if provided
    if (limit !== undefined) {
      todosArray = todosArray.slice(0, limit);
    }

    return {
      success: true,
      todos: todosArray,
    };
  },
});