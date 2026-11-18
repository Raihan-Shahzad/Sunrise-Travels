import { pgTable, serial, text, timestamp, pgEnum } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const serviceTypeEnum = pgEnum("service_type", [
  "nadra",
  "visa",
  "passport",
]);

export const appointmentStatusEnum = pgEnum("appointment_status", [
  "pending",
  "confirmed",
  "cancelled",
]);

export const appointmentsTable = pgTable("appointments", {
  id: serial("id").primaryKey(),
  service: serviceTypeEnum("service").notNull(),
  subService: text("sub_service").notNull(),
  appointmentDate: text("appointment_date"),
  appointmentTime: text("appointment_time"),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  notes: text("notes"),
  status: appointmentStatusEnum("status").notNull().default("pending"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertAppointmentSchema = createInsertSchema(appointmentsTable).omit({
  id: true,
  createdAt: true,
  status: true,
});

export const selectAppointmentSchema = createSelectSchema(appointmentsTable);

export type InsertAppointment = z.infer<typeof insertAppointmentSchema>;
export type Appointment = typeof appointmentsTable.$inferSelect;
