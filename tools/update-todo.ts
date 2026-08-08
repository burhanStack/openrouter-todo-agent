import { tool } from "@openrouter/agent";
import { z } from "zod";

import { db } from "@/db";
import { todos } from "@/db/schema";
import { eq } from "drizzle-orm";

export const updateTodoTool = tool({
  name: "updateTodo",

  description: "Update an existing todo item.",

  inputSchema: z.object({
    id: z.number().describe("ID of the todo to update"),
    title: z.string().optional().describe("New title for the todo"),
    completed: z.boolean().optional().describe("New completion status"),
  }),

  outputSchema: z.object({
    success: z.boolean(),
    id: z.number(),
    title: z.string(),
    completed: z.boolean(),
  }),

  execute: async ({ id, title, completed }) => {
    // Build update object with only provided fields
    const updateData: any = {};
    if (title !== undefined) updateData.title = title;
    if (completed !== undefined) updateData.completed = completed;

    // If no fields to update, return current state
    if (Object.keys(updateData).length === 0) {
      const [existing] = await db.select().from(todos).where(eq(todos.id, id));
      if (!existing) {
        return { success: false, id: 0, title: "", completed: false };
      }
      return {
        success: true,
        id: existing.id,
        title: existing.title,
        completed: existing.completed,
      };
    }

    const [updated] = await db
      .update(todos)
      .set(updateData)
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