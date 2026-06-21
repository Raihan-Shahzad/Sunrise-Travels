import { Router, type IRouter } from "express";
import { db, appointmentsTable } from "@workspace/db";
import { insertAppointmentSchema } from "@workspace/db";
import { eq, and } from "drizzle-orm";

const router: IRouter = Router();

function generateRef(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let ref = "ST-";
  for (let i = 0; i < 6; i++) {
    ref += chars[Math.floor(Math.random() * chars.length)];
  }
  return ref;
}

router.post("/appointments", async (req, res) => {
  try {
    const parsed = insertAppointmentSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: "Invalid request", details: parsed.error.issues });
      return;
    }

    const data = parsed.data;

    const existing = await db
      .select({ id: appointmentsTable.id })
      .from(appointmentsTable)
      .where(
        and(
          eq(appointmentsTable.appointmentDate, data.appointmentDate),
          eq(appointmentsTable.appointmentTime, data.appointmentTime),
        ),
      )
      .limit(3);

    if (existing.length >= 2) {
      res.status(409).json({ error: "This time slot is fully booked. Please choose another time." });
      return;
    }

    const reference = generateRef();

    const [created] = await db
      .insert(appointmentsTable)
      .values({ ...data, status: "pending" })
      .returning();

    res.status(201).json({ ...created, reference });
  } catch (err) {
    console.error("POST /appointments error:", err);
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

    const allTimes = [
      "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
      "12:00 PM", "12:30 PM", "01:00 PM", "01:30 PM",
      "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM",
      "04:00 PM", "04:30 PM", "05:00 PM",
    ];

    const slots = allTimes.map((t) => ({
      time: t,
      available: (slotCount[t] ?? 0) < 2,
    }));

    res.json({ date, slots });
  } catch (err) {
    console.error("GET /appointments/slots error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
