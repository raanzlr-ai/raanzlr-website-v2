import { pgTable, text, serial, timestamp, pgEnum } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const contactTypeEnum = pgEnum("contact_type", ["general", "service"]);

export const contactsTable = pgTable("contacts", {
  id: serial("id").primaryKey(),
  type: contactTypeEnum("type").notNull(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  subject: text("subject"),
  message: text("message"),
  service: text("service"),
  role: text("role"),
  company_type: text("company_type"),
  company_size: text("company_size"),
  budget_range: text("budget_range"),
  best_time: text("best_time"),
  challenge: text("challenge"),
  created_at: timestamp("created_at").defaultNow().notNull(),
});

export const insertContactSchema = createInsertSchema(contactsTable).omit({
  id: true,
  created_at: true,
});

export type InsertContact = z.infer<typeof insertContactSchema>;
export type Contact = typeof contactsTable.$inferSelect;
