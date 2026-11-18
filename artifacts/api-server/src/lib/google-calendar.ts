import { ReplitConnectors } from "@replit/connectors-sdk";
import type { Appointment } from "@workspace/db";

const CONNECTOR_NAME = "google-calendar";
const CALENDAR_SUMMARY = "Sunrise Travels Appointments";
const TIME_ZONE = "Europe/London";
const connectors = new ReplitConnectors();

interface CalendarListItem {
  id?: string;
  summary?: string;
  accessRole?: string;
}

interface CalendarListResponse {
  items?: CalendarListItem[];
  nextPageToken?: string;
}

interface CalendarEventDateTime {
  dateTime: string;
  timeZone: string;
}

interface CalendarEvent {
  id: string;
  summary: string;
  description: string;
  status: "tentative";
  visibility: "private";
  transparency: "opaque";
  start: CalendarEventDateTime;
  end: CalendarEventDateTime;
  extendedProperties: {
    private: Record<string, string>;
  };
}

export class GoogleCalendarError extends Error {
  constructor(
    message: string,
    readonly statusCode?: number,
  ) {
    super(message);
    this.name = "GoogleCalendarError";
  }
}

async function getWritableCalendarId(): Promise<string> {
  let pageToken: string | undefined;

  do {
    const query = new URLSearchParams({ maxResults: "250" });
    if (pageToken) query.set("pageToken", pageToken);

    const response = await connectors.proxy(
      CONNECTOR_NAME,
      `/calendar/v3/users/me/calendarList?${query.toString()}`,
      { method: "GET" },
    );
    if (!response.ok) {
      throw new GoogleCalendarError(
        "Unable to list Google Calendars",
        response.status,
      );
    }

    const data = (await response.json()) as CalendarListResponse;
    const calendar = data.items?.find(
      (item) =>
        item.summary === CALENDAR_SUMMARY &&
        item.id &&
        (item.accessRole === "owner" || item.accessRole === "writer"),
    );
    if (calendar?.id) return calendar.id;

    pageToken = data.nextPageToken;
  } while (pageToken);

  throw new GoogleCalendarError(
    `Writable calendar "${CALENDAR_SUMMARY}" was not found`,
  );
}

function to24HourTime(time: string): { hour: number; minute: number } {
  const match = /^(\d{1,2}):(\d{2}) (AM|PM)$/.exec(time);
  if (!match) throw new GoogleCalendarError("Invalid appointment time");

  const hour12 = Number(match[1]);
  const minute = Number(match[2]);
  if (hour12 < 1 || hour12 > 12 || minute < 0 || minute > 59) {
    throw new GoogleCalendarError("Invalid appointment time");
  }

  return {
    hour: (hour12 % 12) + (match[3] === "PM" ? 12 : 0),
    minute,
  };
}

function formatLocalDateTime(date: string, minuteOfDay: number): string {
  const dayOffset = Math.floor(minuteOfDay / (24 * 60));
  const minuteOfDayWithinDate = minuteOfDay % (24 * 60);
  const [year, month, day] = date.split("-").map(Number);
  const localDate = new Date(Date.UTC(year, month - 1, day + dayOffset));
  const localDateString = [
    localDate.getUTCFullYear(),
    String(localDate.getUTCMonth() + 1).padStart(2, "0"),
    String(localDate.getUTCDate()).padStart(2, "0"),
  ].join("-");
  const hour = Math.floor(minuteOfDayWithinDate / 60);
  const minute = minuteOfDayWithinDate % 60;

  return `${localDateString}T${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}:00`;
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function buildEventDescription(
  appointment: Appointment,
  reference: string,
): string {
  const serviceNames: Record<Appointment["service"], string> = {
    nadra: "NADRA",
    visa: "Pakistani Visa",
    passport: "Passport Assistance",
  };
  const lines = [
    `<b>Booking reference:</b> ${escapeHtml(reference)}`,
    `<b>Customer:</b> ${escapeHtml(appointment.fullName)}`,
    `<b>Service:</b> ${escapeHtml(serviceNames[appointment.service])}`,
    `<b>Appointment type:</b> ${escapeHtml(appointment.subService)}`,
    `<b>Email:</b> ${escapeHtml(appointment.email)}`,
    `<b>Phone:</b> ${escapeHtml(appointment.phone)}`,
  ];

  if (appointment.notes?.trim()) {
    lines.push(`<b>Notes:</b> ${escapeHtml(appointment.notes.trim())}`);
  }

  return lines.join("<br>");
}

function buildCalendarEvent(
  appointment: Appointment,
  reference: string,
): CalendarEvent {
  const { appointmentDate, appointmentTime } = appointment;
  if (!appointmentDate || !appointmentTime) {
    throw new GoogleCalendarError(
      "Appointment needs a date and time before it can be added to Google Calendar",
    );
  }
  const { hour, minute } = to24HourTime(appointmentTime);
  const startMinuteOfDay = hour * 60 + minute;
  const endMinuteOfDay = startMinuteOfDay + 30;
  const stableEventId = `stapp${appointment.id.toString(32)}`;

  return {
    id: stableEventId,
    summary: `Appointment • ${appointment.fullName} • ${reference}`,
    description: buildEventDescription(appointment, reference),
    status: "tentative",
    visibility: "private",
    transparency: "opaque",
    start: {
      dateTime: formatLocalDateTime(
        appointmentDate,
        startMinuteOfDay,
      ),
      timeZone: TIME_ZONE,
    },
    end: {
      dateTime: formatLocalDateTime(
        appointmentDate,
        endMinuteOfDay,
      ),
      timeZone: TIME_ZONE,
    },
    extendedProperties: {
      private: {
        sunriseAppointmentReference: reference,
      },
    },
  };
}

export async function createAppointmentCalendarEvent(
  appointment: Appointment,
  reference: string,
): Promise<void> {
  const calendarId = await getWritableCalendarId();
  const encodedCalendarId = encodeURIComponent(calendarId);
  const event = buildCalendarEvent(appointment, reference);
  const eventPath = `/calendar/v3/calendars/${encodedCalendarId}/events`;

  const response = await connectors.proxy(CONNECTOR_NAME, eventPath, {
    method: "POST",
    body: event,
  });

  if (response.status === 409) {
    const existingEvent = await connectors.proxy(
      CONNECTOR_NAME,
      `${eventPath}/${encodeURIComponent(event.id)}`,
      { method: "GET" },
    );
    if (existingEvent.ok) return;
  } else if (response.ok) {
    return;
  }

  throw new GoogleCalendarError(
    "Unable to create appointment event in Google Calendar",
    response.status,
  );
}
