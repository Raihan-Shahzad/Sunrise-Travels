import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
  Linking,
  Platform,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useColors } from "@/hooks/useColors";

const PHONE_INTL = "+441582732007";
const WHATSAPP = "441582732007";

type ServiceKey = "flights" | "hajj" | "nadra" | "visa" | "passport";

const SERVICES: Record<ServiceKey, {
  icon: React.ComponentProps<typeof Feather>["name"];
  color: string;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
}> = {
  flights: {
    icon: "send",
    color: "#0F4C81",
    title: "Flights",
    subtitle: "Pakistan & Worldwide",
    description: "Exclusive unpublished fares with flexible options and generous baggage allowances you won't find online.",
    highlights: [
      "Up to 50kg baggage allowance",
      "Flexible date changes available",
      "Special child & infant discounts",
      "Book now, pay later options",
      "Emirates, Qatar, PIA, British Airways",
    ],
  },
  hajj: {
    icon: "moon",
    color: "#8B5CF6",
    title: "Hajj & Umrah",
    subtitle: "Sacred Pilgrimage",
    description: "Complete peace of mind on your spiritual journey. Economy, Standard, and Premium packages with full support.",
    highlights: [
      "Economy Umrah from £850",
      "Standard Umrah from £1,150",
      "Premium 5-Star from £1,450",
      "Return flights & visa included",
      "Transport & Ziyarah guided tours",
    ],
  },
  nadra: {
    icon: "file-text",
    color: "#2563EB",
    title: "NADRA Assistance",
    subtitle: "NICOP Assistance",
    description: "Expert help for all NADRA documentation for British Pakistanis — fast, reliable, and accurate.",
    highlights: [
      "New NICOP / NICOP Renewal",
      "Lost / Damaged NICOP Replacement",
      "FRC Certificate",
      "POC Card",
      "Other NADRA Query",
    ],
  },
  visa: {
    icon: "globe",
    color: "#059669",
    title: "Visa Assistance",
    subtitle: "Pakistani Visa",
    description: "Professional guidance for Pakistani visa applications — tourist, family visit, and business visas.",
    highlights: ["New Pakistani Visa / Renewal", "Pakistani Visa Extension", "Other Visa Queries"],
  },
  passport: {
    icon: "book",
    color: "#DC2626",
    title: "Passport Help",
    subtitle: "British & Pakistani Passports",
    description: "Stress-free British and Pakistani passport guidance from application to replacement.",
    highlights: ["New Passport / Passport Renewal", "Lost / Damaged Passport Replacement", "Other Passport Queries"],
  },
};

export default function ServicesScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const isWeb = Platform.OS === "web";
  const topPad = isWeb ? 67 : insets.top;
  const bottomPad = isWeb ? 34 : insets.bottom;
  const [expanded, setExpanded] = useState<ServiceKey | null>(null);

  const styles = makeStyles(colors, topPad, bottomPad);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={[styles.header, { paddingTop: topPad + 16 }]}>
        <Text style={styles.headerTitle}>Our Services</Text>
        <Text style={styles.headerSub}>Everything your family needs — in one place</Text>
      </View>

      {/* Service Cards */}
      <View style={styles.cardList}>
        {(Object.keys(SERVICES) as ServiceKey[]).map((key) => {
          const svc = SERVICES[key];
          const open = expanded === key;
          return (
            <Pressable
              key={key}
              style={({ pressed }) => [styles.card, pressed && !open && { opacity: 0.9 }]}
              onPress={() => setExpanded(open ? null : key)}
            >
              <View style={styles.cardHeader}>
                <View style={[styles.iconBox, { backgroundColor: svc.color + "18" }]}>
                  <Feather name={svc.icon} size={22} color={svc.color} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.cardTitle}>{svc.title}</Text>
                  <Text style={styles.cardSubtitle}>{svc.subtitle}</Text>
                </View>
                <Feather
                  name={open ? "chevron-up" : "chevron-down"}
                  size={20}
                  color={colors.mutedForeground}
                />
              </View>

              {open && (
                <View style={styles.cardBody}>
                  <Text style={styles.cardDesc}>{svc.description}</Text>
                  {svc.highlights.map((h) => (
                    <View key={h} style={styles.highlightRow}>
                      <Feather name="check-circle" size={14} color={svc.color} />
                      <Text style={styles.highlightText}>{h}</Text>
                    </View>
                  ))}
                  <Pressable
                    style={[styles.enquireBtn, { backgroundColor: svc.color }]}
                    onPress={() => router.push("/book" as any)}
                  >
                    <Text style={styles.enquireBtnText}>Book Free Consultation</Text>
                  </Pressable>
                </View>
              )}
            </Pressable>
          );
        })}
      </View>

      {/* Quick Contact */}
      <View style={styles.quickContact}>
        <Text style={styles.quickTitle}>Need Quick Help?</Text>
        <Text style={styles.quickSub}>Our team responds within minutes</Text>
        <View style={styles.quickBtns}>
          <Pressable
            style={({ pressed }) => [styles.quickBtn, { backgroundColor: colors.primary }, pressed && { opacity: 0.85 }]}
            onPress={() => Linking.openURL(`tel:${PHONE_INTL}`)}
          >
            <Feather name="phone" size={16} color="#fff" />
            <Text style={styles.quickBtnText}>Call Us</Text>
          </Pressable>
          <Pressable
            style={({ pressed }) => [styles.quickBtn, { backgroundColor: "#25D366" }, pressed && { opacity: 0.85 }]}
            onPress={() => Linking.openURL(`https://wa.me/${WHATSAPP}`)}
          >
            <Feather name="message-circle" size={16} color="#fff" />
            <Text style={styles.quickBtnText}>WhatsApp</Text>
          </Pressable>
        </View>
      </View>

      <View style={{ height: bottomPad + 80 }} />
    </ScrollView>
  );
}

function makeStyles(colors: ReturnType<typeof useColors>, topPad: number, bottomPad: number) {
  return StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    content: {},
    header: {
      paddingHorizontal: 20,
      paddingBottom: 20,
      backgroundColor: colors.primary,
    },
    headerTitle: { color: "#fff", fontSize: 28, fontFamily: "Inter_700Bold", marginBottom: 4 },
    headerSub: { color: "rgba(255,255,255,0.75)", fontSize: 14, fontFamily: "Inter_400Regular" },
    cardList: { padding: 16, gap: 12 },
    card: {
      backgroundColor: colors.card,
      borderRadius: colors.radius,
      borderWidth: 1,
      borderColor: colors.border,
      overflow: "hidden",
    },
    cardHeader: { flexDirection: "row", alignItems: "center", gap: 14, padding: 16 },
    iconBox: { width: 44, height: 44, borderRadius: 12, alignItems: "center", justifyContent: "center" },
    cardTitle: { color: colors.foreground, fontFamily: "Inter_600SemiBold", fontSize: 16 },
    cardSubtitle: { color: colors.mutedForeground, fontFamily: "Inter_400Regular", fontSize: 13 },
    cardBody: { paddingHorizontal: 16, paddingBottom: 16, paddingTop: 0 },
    cardDesc: { color: colors.mutedForeground, fontFamily: "Inter_400Regular", fontSize: 14, lineHeight: 22, marginBottom: 14 },
    highlightRow: { flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 8 },
    highlightText: { color: colors.foreground, fontFamily: "Inter_400Regular", fontSize: 14, flex: 1 },
    enquireBtn: {
      marginTop: 14,
      paddingVertical: 13,
      borderRadius: 10,
      alignItems: "center",
    },
    enquireBtnText: { color: "#fff", fontFamily: "Inter_600SemiBold", fontSize: 14 },
    quickContact: {
      marginHorizontal: 16,
      marginTop: 4,
      backgroundColor: "#0a1929",
      borderRadius: colors.radius,
      padding: 20,
    },
    quickTitle: { color: "#fff", fontFamily: "Inter_700Bold", fontSize: 18, marginBottom: 4 },
    quickSub: { color: "rgba(255,255,255,0.7)", fontFamily: "Inter_400Regular", fontSize: 13, marginBottom: 16 },
    quickBtns: { flexDirection: "row", gap: 12 },
    quickBtn: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      paddingVertical: 13,
      borderRadius: 10,
    },
    quickBtnText: { color: "#fff", fontFamily: "Inter_600SemiBold", fontSize: 14 },
  });
}
