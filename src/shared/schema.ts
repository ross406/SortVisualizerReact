// import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
// import { createInsertSchema } from "drizzle-zod";
// import { z } from "zod";

// export const users = pgTable("users", {
//   id: serial("id").primaryKey(),
//   username: text("username").notNull().unique(),
//   password: text("password").notNull(),
// });

// export const insertUserSchema = createInsertSchema(users).pick({
//   username: true,
//   password: true,
// });

// export type InsertUser = z.infer<typeof insertUserSchema>;
// export type User = typeof users.$inferSelect;

// Types for sorting visualization
export type SortingAlgorithm = 
  | "bubble"
  | "selection" 
  | "insertion"
  | "merge"
  | "quick"
  | "heap"
  | "radix"
  | "shell";

export type AnimationSpeed = "slow" | "normal" | "fast";

export type ElementState = "default" | "comparing" | "swapping" | "sorted";

export interface ArrayElement {
  value: number;
  state: ElementState;
  id: string;
}

export interface SortingStep {
  array: ArrayElement[];
  comparingIndices?: number[];
  swappingIndices?: number[];
  sortedIndices?: number[];
  currentLine?: number;
  description?: string;
}

export interface AlgorithmStats {
  comparisons: number;
  swaps: number;
  timeElapsed: number;
  arrayAccesses: number;
}

export interface AlgorithmInfo {
  name: string;
  description: string;
  timeComplexity: {
    best: string;
    average: string;
    worst: string;
  };
  spaceComplexity: string;
  stable: boolean;
  inPlace: boolean;
  pros: string[];
  cons: string[];
  pseudocode: string[];
}
