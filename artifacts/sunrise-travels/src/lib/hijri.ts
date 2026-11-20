const HIJRI_FORMAT = new Intl.DateTimeFormat("en-u-ca-islamic-umalqura", {
  day: "numeric",
  month: "numeric",
  year: "numeric",
});

function hijriParts(date: Date) {
  const parts = HIJRI_FORMAT.formatToParts(date);
  const value = (type: string) => Number(parts.find((p) => p.type === type)?.value ?? 0);
  return { year: value("year"), month: value("month"), day: value("day") };
}

/** Current Hijri year plus the Gregorian year it mostly falls in. */
export function getCurrentHijri(reference: Date = new Date()) {
  return { gregorianYear: reference.getFullYear(), hijriYear: hijriParts(reference).year };
}

/**
 * Gregorian and Hijri year of the upcoming Hajj (8–13 Dhul Hijjah).
 * Recomputed from the current date, so it never needs editing year to year.
 */
export function getNextHajj(reference: Date = new Date()) {
  const today = hijriParts(reference);
  if (today.month === 12 && today.day >= 8 && today.day <= 13) {
    return { gregorianYear: reference.getFullYear(), hijriYear: today.year };
  }

  const cursor = new Date(reference);
  cursor.setHours(12, 0, 0, 0);
  for (let i = 0; i < 400; i += 1) {
    cursor.setDate(cursor.getDate() + 1);
    const { year, month, day } = hijriParts(cursor);
    if (month === 12 && day === 8) {
      return { gregorianYear: cursor.getFullYear(), hijriYear: year };
    }
  }

  return { gregorianYear: reference.getFullYear() + 1, hijriYear: today.year + 1 };
}
