import { tool } from "@openrouter/agent";
import { z } from "zod";

import { db } from "@/db";
import { todos } from "@/db/schema";
import { eq } from "drizzle-orm";

export const deleteTodoTool = tool({
  name: "deleteTodo",

  description: "Delete a todo item by ID.",

  inputSchema: z.object({
    id: z.number().describe("ID of the todo to delete"),
  }),

  outputSchema: z.object({
    success: z.boolean(),
    id: z.number(),
  }),

  execute: async ({ id }) => {
    // First check if the todo exists
    const [existing] = await db.select().from(todos).where(eq(todos.id, id));

    if (!existing) {
      return { success: false, id: 0 };
    }

    // Delete the todo
    await db.delete(todos).where(eq(todos.id, id));

    return {
      success: true,
      id: existing.id,
    };
  },
});