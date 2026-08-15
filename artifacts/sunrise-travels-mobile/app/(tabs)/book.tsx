import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
  TextInput,
  ActivityIndicator,
  Platform,
  Alert,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Haptics from "expo-haptics";
import { useColors } from "@/hooks/useColors";

type ServiceType = "nadra" | "visa" | "passport";

const SERVICES: Record<ServiceType, { label: string; subtypes: string[] }> = {
  nadra: {
    label: "NADRA Assistance",
    subtypes: [
      "New NICOP / NICOP Renewal",
      "Lost / Damaged NICOP Replacement",
      "Other NADRA Query",
    ],
  },
  visa: {
    label: "Pakistani Visa Assistance",
    subtypes: [
      "New Visa / Renewal",
      "Visa Extension",
      "Other Visa Queries",
    ],
  },
  passport: {
    label: "British & Pakistani Passport Assistance",
    subtypes: [
      "New Passport / Passport Renewal",
      "Lost / Damaged Passport Replacement",
      "Other Passport Queries",
    ],
  },
};

const SERVICE_COLORS: Record<ServiceType, string> = {
  nadra: "#2563EB",
  visa: "#059669",
  passport: "#8B5CF6",
};

const TIMES = [
  "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM",
  "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM",
  "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM",
  "05:00 PM",
];

function getAvailableDates(count = 14): Date[] {
  const dates: Date[] = [];
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  while (dates.length < count) {
    d.setDate(d.getDate() + 1);
    if (d.getDay() !== 0 && d.getDay() !== 6) {
      dates.push(new Date(d));
    }
  }
  return dates;
}

function formatDateKey(d: Date) { return d.toISOString().slice(0, 10); }
function formatDateLabel(d: Date) {
  return d.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" });
}

const STEPS = ["Service", "Date & Time", "Your Details", "Confirm"];

export default function BookScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const isWeb = Platform.OS === "web";
  const topPad = isWeb ? 67 : insets.top;
  const bottomPad = isWeb ? 34 : insets.bottom;

  const [step, setStep] = useState(0);
  const [service, setService] = useState<ServiceType | null>(null);
  const [subService, setSubService] = useState("");
  const [dateKey, setDateKey] = useState("");
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [booked, setBooked] = useState(false);
  const [bookingRef, setBookingRef] = useState("");
  const [error, setError] = useState("");
  const [slots, setSlots] = useState<Record<string, boolean>>({});
  const [slotsLoading, setSlotsLoading] = useState(false);

  const dates = getAvailableDates(14);
  const selectedDate = dates.find((d) => formatDateKey(d) === dateKey);

  const canNext0 = !!service && !!subService;
  const canNext1 = !!dateKey && !!time;
  const canNext2 = name.trim().length > 0 && email.trim().length > 0 && phone.trim().length > 0;

  const styles = makeStyles(colors, topPad, bottomPad);
  const domain = process.env.EXPO_PUBLIC_DOMAIN;
  const base = domain ? `https://${domain}` : "";

  useEffect(() => {
    if (!dateKey) {
      setSlots({});
      return;
    }

    let cancelled = false;
    setSlotsLoading(true);
    fetch(`${base}/api/appointments/slots?date=${encodeURIComponent(dateKey)}`)
      .then(async (res) => {
        if (!res.ok) throw new Error("Unable to load availability");
        return res.json() as Promise<{ slots: Array<{ time: string; available: boolean }> }>;
      })
      .then((data) => {
        if (!cancelled) {
          setSlots(Object.fromEntries(data.slots.map((slot) => [slot.time, slot.available])));
        }
      })
      .catch(() => {
        if (!cancelled) setSlots({});
      })
      .finally(() => {
        if (!cancelled) setSlotsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [dateKey, base]);

  async function handleSubmit() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${base}/api/appointments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service,
          subService,
          appointmentDate: dateKey,
          appointmentTime: time,
          fullName: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          notes: notes.trim() || null,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error((data as any)?.error || "Failed to book appointment");
      }
      const data = await res.json() as { reference: string };
      setBookingRef(data.reference);
      setBooked(true);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Something went wrong. Please try again.";
      setError(msg);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    } finally {
      setLoading(false);
    }
  }

  function resetAll() {
    setBooked(false);
    setStep(0);
    setService(null);
    setSubService("");
    setDateKey("");
    setTime("");
    setName("");
    setEmail("");
    setPhone("");
    setNotes("");
    setError("");
    setBookingRef("");
  }

  if (booked) {
    return (
      <View style={[styles.successContainer, { paddingTop: topPad }]}>
        <View style={styles.successCard}>
          <View style={styles.successIcon}>
            <Feather name="check-circle" size={48} color="#22c55e" />
          </View>
          <Text style={styles.successTitle}>Appointment Booked!</Text>
          <Text style={styles.successSub}>We'll confirm by phone or email shortly.</Text>

          <View style={styles.summaryBox}>
            <SummaryRow label="Reference" value={bookingRef} highlight />
            <SummaryRow label="Service" value={SERVICES[service!].label} />
            <SummaryRow label="Type" value={subService} />
            <SummaryRow label="Date" value={selectedDate ? formatDateLabel(selectedDate) : dateKey} />
            <SummaryRow label="Time" value={time} />
            <SummaryRow label="Name" value={name} />
          </View>

          <View style={styles.noticeBanner}>
            <Feather name="info" size={14} color="#92400e" />
            <Text style={styles.noticeText}>
              This is a free in-office consultation. We provide guidance and document preparation only.
            </Text>
          </View>

          <Pressable
            style={({ pressed }) => [styles.bookAnotherBtn, pressed && { opacity: 0.85 }]}
            onPress={resetAll}
          >
            <Text style={styles.bookAnotherText}>Book Another Appointment</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.outerContainer, { paddingTop: topPad }]}>
      {/* Header */}
      <View style={styles.pageHeader}>
        <Text style={styles.pageTitle}>Book an Appointment</Text>
        <Text style={styles.pageSub}>Free consultation at our Luton office</Text>
      </View>

      {/* Stepper */}
      <View style={styles.stepper}>
        {STEPS.map((s, i) => (
          <React.Fragment key={s}>
            <View style={styles.stepItem}>
              <View style={[
                styles.stepCircle,
                step === i ? { backgroundColor: colors.primary } :
                  i < step ? { backgroundColor: "#22c55e" } :
                    { backgroundColor: colors.muted }
              ]}>
                {i < step ? (
                  <Feather name="check" size={12} color="#fff" />
                ) : (
                  <Text style={[styles.stepNum, step === i || i < step ? { color: "#fff" } : { color: colors.mutedForeground }]}>
                    {i + 1}
                  </Text>
                )}
              </View>
              <Text style={[styles.stepLabel, step === i ? { color: colors.primary } : { color: colors.mutedForeground }]}>
                {s}
              </Text>
            </View>
            {i < STEPS.length - 1 && (
              <View style={[styles.stepLine, i < step ? { backgroundColor: "#22c55e" } : { backgroundColor: colors.border }]} />
            )}
          </React.Fragment>
        ))}
      </View>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* Step 0: Choose Service */}
        {step === 0 && (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>What service do you need?</Text>
            <Text style={styles.stepDesc}>Select a service, then choose the specific type.</Text>

            <View style={styles.serviceButtons}>
              {(Object.keys(SERVICES) as ServiceType[]).map((key) => {
                const svc = SERVICES[key];
                const col = SERVICE_COLORS[key];
                const active = service === key;
                return (
                  <Pressable
                    key={key}
                    style={[styles.serviceBtn, active && { borderColor: col, backgroundColor: col + "12" }]}
                    onPress={() => { setService(key); setSubService(""); Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); }}
                  >
                    <Text style={[styles.serviceBtnLabel, { color: active ? col : colors.foreground }]}>{svc.label}</Text>
                    <Text style={styles.serviceBtnCount}>{svc.subtypes.length} types</Text>
                  </Pressable>
                );
              })}
            </View>

            {service && (
              <View style={{ marginTop: 20 }}>
                <Text style={styles.subTitle}>Select the type of assistance:</Text>
                {SERVICES[service].subtypes.map((sub) => {
                  const col = SERVICE_COLORS[service];
                  const active = subService === sub;
                  return (
                    <Pressable
                      key={sub}
                      style={[styles.subtypeBtn, active && { borderColor: col, backgroundColor: col + "10" }]}
                      onPress={() => { setSubService(sub); Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); }}
                    >
                      {active && <Feather name="check" size={14} color={col} />}
                      <Text style={[styles.subtypeBtnText, active && { color: col }]}>{sub}</Text>
                    </Pressable>
                  );
                })}
              </View>
            )}
          </View>
        )}

        {/* Step 1: Date & Time */}
        {step === 1 && (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Pick a date & time</Text>
            <Text style={styles.stepDesc}>Mon–Fri, 11:00 AM – 5:00 PM · 30-minute appointments</Text>

            <Text style={styles.subTitle}>Available Dates</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.dateScroll}>
              {dates.map((d) => {
                const key = formatDateKey(d);
                const active = dateKey === key;
                return (
                  <Pressable
                    key={key}
                    style={[styles.dateCard, active && { backgroundColor: colors.primary, borderColor: colors.primary }]}
                    onPress={() => { setDateKey(key); setTime(""); Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); }}
                  >
                    <Text style={[styles.dateDow, active && { color: "rgba(255,255,255,0.8)" }]}>
                      {d.toLocaleDateString("en-GB", { weekday: "short" })}
                    </Text>
                    <Text style={[styles.dateDay, active && { color: "#fff" }]}>{d.getDate()}</Text>
                    <Text style={[styles.dateMon, active && { color: "rgba(255,255,255,0.8)" }]}>
                      {d.toLocaleDateString("en-GB", { month: "short" })}
                    </Text>
                  </Pressable>
                );
              })}
            </ScrollView>

            {dateKey && (
              <View style={{ marginTop: 20 }}>
                <Text style={styles.subTitle}>Available Times</Text>
                <View style={styles.timesGrid}>
                  {slotsLoading ? (
                    <View style={styles.slotsLoading}>
                      <ActivityIndicator size="small" color={colors.primary} />
                      <Text style={styles.slotsLoadingText}>Checking live availability…</Text>
                    </View>
                  ) : TIMES.map((t) => {
                    const active = time === t;
                    const unavailable = slots[t] === false;
                    return (
                      <Pressable
                        key={t}
                        disabled={unavailable}
                        style={[styles.timeBtn, unavailable && styles.timeBtnUnavailable, active && { backgroundColor: colors.primary, borderColor: colors.primary }]}
                        onPress={() => { setTime(t); Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); }}
                      >
                        <Text style={[styles.timeBtnText, unavailable && styles.timeBtnTextUnavailable, active && { color: "#fff" }]}>{t}</Text>
                        {unavailable && <Text style={styles.bookedLabel}>Booked</Text>}
                      </Pressable>
                    );
                  })}
                </View>
              </View>
            )}
          </View>
        )}

        {/* Step 2: Your Details */}
        {step === 2 && (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Your Details</Text>
            <Text style={styles.stepDesc}>We'll use this to confirm and send reminders.</Text>

            <View style={styles.formCard}>
              <View style={styles.formField}>
                <Text style={styles.fieldLabel}>Full Name *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g. Muhammad Ali Khan"
                  placeholderTextColor={colors.mutedForeground}
                  value={name}
                  onChangeText={setName}
                  autoCapitalize="words"
                />
              </View>
              <View style={styles.formField}>
                <Text style={styles.fieldLabel}>Email Address *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="you@example.com"
                  placeholderTextColor={colors.mutedForeground}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
              <View style={styles.formField}>
                <Text style={styles.fieldLabel}>Phone Number *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="07xxx xxxxxx"
                  placeholderTextColor={colors.mutedForeground}
                  value={phone}
                  onChangeText={setPhone}
                  keyboardType="phone-pad"
                />
              </View>
              <View style={styles.formField}>
                <Text style={styles.fieldLabel}>Additional Notes (optional)</Text>
                <TextInput
                  style={[styles.input, styles.textarea]}
                  placeholder="Any context or questions for us..."
                  placeholderTextColor={colors.mutedForeground}
                  value={notes}
                  onChangeText={setNotes}
                  multiline
                  numberOfLines={3}
                  textAlignVertical="top"
                />
              </View>
            </View>
          </View>
        )}

        {/* Step 3: Confirm */}
        {step === 3 && (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Confirm Appointment</Text>
            <Text style={styles.stepDesc}>Review the details before confirming.</Text>

            <View style={styles.formCard}>
              <SummaryRow label="Service" value={SERVICES[service!].label} />
              <SummaryRow label="Type" value={subService} />
              <SummaryRow label="Date" value={selectedDate ? formatDateLabel(selectedDate) : dateKey} />
              <SummaryRow label="Time" value={time} />
              <SummaryRow label="Name" value={name} />
              <SummaryRow label="Email" value={email} />
              <SummaryRow label="Phone" value={phone} />
              {notes ? <SummaryRow label="Notes" value={notes} /> : null}
            </View>

            <View style={styles.noticeBanner}>
              <Feather name="info" size={14} color="#92400e" />
              <Text style={styles.noticeText}>
                This is a free in-office consultation. We provide guidance and document preparation only.
              </Text>
            </View>

            {error ? (
              <View style={styles.errorBanner}>
                <Feather name="alert-circle" size={14} color="#dc2626" />
                <Text style={styles.errorText}>{error}</Text>
              </View>
            ) : null}
          </View>
        )}

        {/* Nav Buttons */}
        <View style={styles.navRow}>
          {step > 0 && (
            <Pressable
              style={({ pressed }) => [styles.navBtn, styles.navBtnBack, pressed && { opacity: 0.85 }]}
              onPress={() => setStep(step - 1)}
              disabled={loading}
            >
              <Text style={styles.navBtnBackText}>Back</Text>
            </Pressable>
          )}
          {step < 3 ? (
            <Pressable
              style={({ pressed }) => [
                styles.navBtn,
                styles.navBtnNext,
                { flex: step === 0 ? 1 : undefined },
                (
                  (step === 0 && !canNext0) ||
                  (step === 1 && !canNext1) ||
                  (step === 2 && !canNext2)
                ) && { opacity: 0.45 },
                pressed && { opacity: 0.85 },
              ]}
              disabled={
                (step === 0 && !canNext0) ||
                (step === 1 && !canNext1) ||
                (step === 2 && !canNext2)
              }
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                setStep(step + 1);
              }}
            >
              <Text style={styles.navBtnNextText}>
                {step === 2 ? "Review" : "Next"}
              </Text>
              <Feather name="chevron-right" size={16} color="#fff" />
            </Pressable>
          ) : (
            <Pressable
              style={({ pressed }) => [styles.navBtn, styles.navBtnNext, loading && { opacity: 0.7 }, pressed && { opacity: 0.85 }]}
              onPress={handleSubmit}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" size="small" />
              ) : (
                <>
                  <Feather name="check" size={16} color="#fff" />
                  <Text style={styles.navBtnNextText}>Confirm Appointment</Text>
                </>
              )}
            </Pressable>
          )}
        </View>

        <View style={{ height: bottomPad + 80 }} />
      </ScrollView>
    </View>
  );
}

function SummaryRow({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  const colors = useColors();
  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between", paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: colors.border }}>
      <Text style={{ color: colors.mutedForeground, fontFamily: "Inter_400Regular", fontSize: 13 }}>{label}</Text>
      <Text style={{ color: highlight ? colors.primary : colors.foreground, fontFamily: "Inter_600SemiBold", fontSize: 13, flex: 1, textAlign: "right" }}>{value}</Text>
    </View>
  );
}

function makeStyles(colors: ReturnType<typeof useColors>, topPad: number, bottomPad: number) {
  return StyleSheet.create({
    outerContainer: { flex: 1, backgroundColor: colors.background },
    pageHeader: { backgroundColor: colors.primary, paddingHorizontal: 20, paddingBottom: 16, paddingTop: 16 },
    pageTitle: { color: "#fff", fontSize: 24, fontFamily: "Inter_700Bold" },
    pageSub: { color: "rgba(255,255,255,0.75)", fontSize: 13, fontFamily: "Inter_400Regular" },
    stepper: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.background,
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    stepItem: { alignItems: "center", gap: 4 },
    stepCircle: {
      width: 26,
      height: 26,
      borderRadius: 13,
      alignItems: "center",
      justifyContent: "center",
    },
    stepNum: { fontSize: 12, fontFamily: "Inter_600SemiBold" },
    stepLabel: { fontSize: 10, fontFamily: "Inter_500Medium" },
    stepLine: { flex: 1, height: 2, marginBottom: 16 },
    scrollContent: { padding: 16 },
    stepContent: {},
    stepTitle: { color: colors.foreground, fontSize: 20, fontFamily: "Inter_700Bold", marginBottom: 4 },
    stepDesc: { color: colors.mutedForeground, fontSize: 13, fontFamily: "Inter_400Regular", marginBottom: 20 },
    subTitle: { color: colors.foreground, fontSize: 14, fontFamily: "Inter_600SemiBold", marginBottom: 10 },
    serviceButtons: { gap: 10 },
    serviceBtn: {
      borderWidth: 2,
      borderColor: colors.border,
      borderRadius: colors.radius,
      padding: 14,
      backgroundColor: colors.card,
    },
    serviceBtnLabel: { fontFamily: "Inter_600SemiBold", fontSize: 15 },
    serviceBtnCount: { color: colors.mutedForeground, fontFamily: "Inter_400Regular", fontSize: 12, marginTop: 2 },
    subtypeBtn: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      borderWidth: 1.5,
      borderColor: colors.border,
      borderRadius: 10,
      padding: 12,
      backgroundColor: colors.card,
      marginBottom: 8,
    },
    subtypeBtnText: { color: colors.foreground, fontFamily: "Inter_400Regular", fontSize: 14, flex: 1 },
    dateScroll: { marginBottom: 4 },
    dateCard: {
      alignItems: "center",
      borderWidth: 1.5,
      borderColor: colors.border,
      borderRadius: 12,
      padding: 10,
      marginRight: 8,
      minWidth: 58,
      backgroundColor: colors.card,
    },
    dateDow: { color: colors.mutedForeground, fontFamily: "Inter_500Medium", fontSize: 11 },
    dateDay: { color: colors.foreground, fontFamily: "Inter_700Bold", fontSize: 20, lineHeight: 28 },
    dateMon: { color: colors.mutedForeground, fontFamily: "Inter_400Regular", fontSize: 11 },
    timesGrid: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
    timeBtn: {
      borderWidth: 1.5,
      borderColor: colors.border,
      borderRadius: 8,
      paddingVertical: 8,
      paddingHorizontal: 10,
      backgroundColor: colors.card,
    },
    timeBtnText: { color: colors.foreground, fontFamily: "Inter_500Medium", fontSize: 13 },
    timeBtnUnavailable: { backgroundColor: colors.muted, borderColor: colors.muted },
    timeBtnTextUnavailable: { color: colors.mutedForeground, textDecorationLine: "line-through" },
    bookedLabel: { color: colors.mutedForeground, fontFamily: "Inter_400Regular", fontSize: 9, marginTop: 2 },
    slotsLoading: { flexDirection: "row", alignItems: "center", gap: 8, paddingVertical: 10 },
    slotsLoadingText: { color: colors.mutedForeground, fontFamily: "Inter_400Regular", fontSize: 13 },
    formCard: {
      backgroundColor: colors.card,
      borderRadius: colors.radius,
      borderWidth: 1,
      borderColor: colors.border,
      padding: 16,
      gap: 2,
    },
    formField: { marginBottom: 14 },
    fieldLabel: { color: colors.foreground, fontFamily: "Inter_500Medium", fontSize: 13, marginBottom: 6 },
    input: {
      borderWidth: 1,
      borderColor: colors.input,
      borderRadius: 10,
      paddingHorizontal: 14,
      paddingVertical: 11,
      backgroundColor: colors.background,
      color: colors.foreground,
      fontFamily: "Inter_400Regular",
      fontSize: 14,
    },
    textarea: { minHeight: 80 },
    navRow: { flexDirection: "row", gap: 10, marginTop: 24 },
    navBtn: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 6,
      paddingVertical: 14,
      paddingHorizontal: 20,
      borderRadius: 12,
    },
    navBtnBack: {
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.background,
    },
    navBtnBackText: { color: colors.foreground, fontFamily: "Inter_600SemiBold", fontSize: 14 },
    navBtnNext: { flex: 1, backgroundColor: colors.primary },
    navBtnNextText: { color: "#fff", fontFamily: "Inter_600SemiBold", fontSize: 15 },
    noticeBanner: {
      flexDirection: "row",
      alignItems: "flex-start",
      gap: 8,
      backgroundColor: "#fef3c7",
      borderRadius: 10,
      padding: 12,
      marginTop: 16,
    },
    noticeText: { color: "#92400e", fontFamily: "Inter_400Regular", fontSize: 13, flex: 1, lineHeight: 19 },
    errorBanner: {
      flexDirection: "row",
      alignItems: "flex-start",
      gap: 8,
      backgroundColor: "#fef2f2",
      borderRadius: 10,
      padding: 12,
      marginTop: 10,
    },
    errorText: { color: "#dc2626", fontFamily: "Inter_400Regular", fontSize: 13, flex: 1 },
    successContainer: {
      flex: 1,
      backgroundColor: colors.background,
      padding: 20,
      justifyContent: "center",
    },
    successCard: {
      backgroundColor: colors.card,
      borderRadius: 20,
      padding: 24,
      borderWidth: 1,
      borderColor: colors.border,
    },
    successIcon: { alignItems: "center", marginBottom: 16 },
    successTitle: { color: colors.foreground, fontFamily: "Inter_700Bold", fontSize: 24, textAlign: "center", marginBottom: 6 },
    successSub: { color: colors.mutedForeground, fontFamily: "Inter_400Regular", fontSize: 14, textAlign: "center", marginBottom: 20 },
    summaryBox: { marginBottom: 16 },
    bookAnotherBtn: {
      backgroundColor: colors.primary,
      borderRadius: 12,
      paddingVertical: 14,
      alignItems: "center",
      marginTop: 16,
    },
    bookAnotherText: { color: "#fff", fontFamily: "Inter_600SemiBold", fontSize: 15 },
  });
}
