import { tool } from "@openrouter/agent";
import { z } from "zod";

import { db } from "@/db";
import { todos } from "@/db/schema";
import { eq } from "drizzle-orm";

export const toggleTodoTool = tool({
  name: "toggleTodo",

  description: "Toggle the completion status of a todo item.",

  inputSchema: z.object({
    id: z.number().describe("ID of the todo to toggle"),
  }),

  outputSchema: z.object({
    success: z.boolean(),
    id: z.number(),
    title: z.string(),
    completed: z.boolean(),
  }),

  execute: async ({ id }) => {
    // First get the current todo
    const [existing] = await db.select().from(todos).where(eq(todos.id, id));

    if (!existing) {
      return { success: false, id: 0, title: "", completed: false };
    }

    // Toggle the completion status
    const [updated] = await db
      .update(todos)
      .set({ completed: !existing.completed })
      .where(eq(todos.id, id))
      .returning();

    if (!updated) {
      return { success: false, id: 0, title: "", completed: false };
    }

    return {
      success: true,
      id: updated.id,
      title: updated.title,
      completed: updated.completed,
    };
  },
});