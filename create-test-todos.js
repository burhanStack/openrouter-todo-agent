// Simple script to create test todos
import { db } from "./db/index.js";
import { todos } from "./db/schema.js";

async function createTestTodos() {
  try {
    // Clear existing todos for clean testing
    await db.delete(todos);
    console.log("Cleared existing todos");

    // Create test todos
    const todo1 = await db.insert(todos).values({
      title: "Learn TypeScript",
      completed: false,
    }).returning();

    const todo2 = await db.insert(todos).values({
      title: "Build todo agent",
      completed: true,
    }).returning();

    const todo3 = await db.insert(todos).values({
      title: "Write documentation",
      completed: false,
    }).returning();

    console.log("Created test todos:");
    console.log("-", todo1[0].title, "(completed:", todo1[0].completed + ")");
    console.log("-", todo2[0].title, "(completed:", todo2[0].completed + ")");
    console.log("-", todo3[0].title, "(completed:", todo3[0].completed + ")");

    process.exit(0);
  } catch (err) {
    console.error("Error creating test todos:", err);
    process.exit(1);
  }
}

createTestTodos();