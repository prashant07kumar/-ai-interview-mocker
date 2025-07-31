import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core"; // ✅ Use pg-core types only

export const MockInterview = pgTable("mockInterview", {
  id: serial("id").primaryKey(),
  jsonMockresp: text("jsonMockresp").notNull(),
  jobPosition: varchar("jobPosition", { length: 255 }).notNull(),
  jobExperience: varchar("jobExperience", { length: 255 }).notNull(),
  jobDesc: text("jobDesc").notNull(),
  createdBy: varchar("createdBy", { length: 255 }).notNull(),
  createdAt: varchar("createdAt", { length: 255 }).notNull(),
  mockId: varchar("mockId", { length: 255 }).notNull(), // ✅ Fixed .notNull()
});

export const UserAnswer=pgTable('userAnswer', {
  id: serial('id').primaryKey(),
  mockIdRef: varchar('mockId', { length: 255 }).notNull(),
  question: varchar("question", { length: 10000 }).notNull(),
  correctAns: text('correctAns'),
  userAns:text('userAns'),
  feedback: text("feedback"),
  rating: varchar("rating", { length: 255 }),
  userEmail: varchar("userEmail", { length: 255 }),
  createdAt: varchar("createdAt", { length: 255 }).notNull(),
});