import { Router, type IRouter } from "express";
import { db, appointmentsTable } from "@workspace/db";
import { insertAppointmentSchema } from "@workspace/db";
import { eq, and, desc } from "drizzle-orm";
import { logger } from "../lib/logger";

const router: IRouter = Router();

const SERVICE_OPTIONS = {
  nadra: [
    "New NICOP / NICOP Renewal",
    "Lost / Damaged NICOP Replacement",
    "FRC Certificate",
    "POC Card",
    "Other NADRA Query",
  ],
  visa: ["New Visa / Renewal", "Visa Extension", "Other Visa Queries"],
  passport: [
    "New Passport / Passport Renewal",
    "Lost / Damaged Passport Replacement",
    "Other Passport Queries",
  ],
} as const;

const APPOINTMENT_TIMES = [
  "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM",
  "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM",
  "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM",
  "05:00 PM",
];

function formatReference(id: number): string {
  return `ST-${String(id).padStart(5, "0")}`;
}

router.post("/appointments", async (req, res) => {
  try {
    const parsed = insertAppointmentSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: "Invalid request", details: parsed.error.issues });
      return;
    }

    const data = parsed.data;
    const options = SERVICE_OPTIONS[data.service];
    if (!options.includes(data.subService as never)) {
      res.status(400).json({ error: "Please choose a valid appointment type." });
      return;
    }
    if (data.subService.startsWith("Other ") && !data.notes?.trim()) {
      res.status(400).json({ error: "Please describe what you need help with." });
      return;
    }
    if (!APPOINTMENT_TIMES.includes(data.appointmentTime)) {
      res.status(400).json({ error: "Please choose a valid appointment time." });
      return;
    }

    const existing = await db
      .select({ id: appointmentsTable.id })
      .from(appointmentsTable)
      .where(
        and(
          eq(appointmentsTable.appointmentDate, data.appointmentDate),
          eq(appointmentsTable.appointmentTime, data.appointmentTime),
        ),
      )
      .limit(2);

    if (existing.length >= 1) {
      res.status(409).json({ error: "This time slot is fully booked. Please choose another time." });
      return;
    }

    const [created] = await db
      .insert(appointmentsTable)
      .values({ ...data, status: "pending" })
      .returning();

    const reference = formatReference(created.id);
    logger.info(
      {
        event: "appointment.booked",
        reference,
        appointmentId: created.id,
        service: created.service,
        subService: created.subService,
        appointmentDate: created.appointmentDate,
        appointmentTime: created.appointmentTime,
        fullName: created.fullName,
        email: created.email,
        phone: created.phone,
        notes: created.notes,
      },
      "New appointment booked — staff notification",
    );

    res.status(201).json({ ...created, reference });
  } catch (err) {
    console.error("POST /appointments error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/appointments", async (_req, res) => {
  try {
    const appointments = await db
      .select()
      .from(appointmentsTable)
      .orderBy(desc(appointmentsTable.createdAt))
      .limit(100);

    res.json(
      appointments.map((appointment) => ({
        ...appointment,
        reference: formatReference(appointment.id),
      })),
    );
  } catch (err) {
    console.error("GET /appointments error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/appointments/slots", async (req, res) => {
  try {
    const date = req.query.date as string;
    if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      res.status(400).json({ error: "date query param required (YYYY-MM-DD)" });
      return;
    }

    const booked = await db
      .select({ time: appointmentsTable.appointmentTime })
      .from(appointmentsTable)
      .where(eq(appointmentsTable.appointmentDate, date));

    const slotCount: Record<string, number> = {};
    for (const row of booked) {
      slotCount[row.time] = (slotCount[row.time] ?? 0) + 1;
    }

    const slots = APPOINTMENT_TIMES.map((t) => ({
      time: t,
      available: (slotCount[t] ?? 0) < 1,
    }));

    res.json({ date, slots });
  } catch (err) {
    console.error("GET /appointments/slots error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
