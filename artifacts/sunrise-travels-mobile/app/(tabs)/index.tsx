import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
  Linking,
  ImageBackground,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useColors } from "@/hooks/useColors";

const PHONE = "01582 732007";
const PHONE_INTL = "+441582732007";
const WHATSAPP = "447777786396";
const MAKKAH_IMAGE = require("../../assets/makkah-kaaba.jpg");

const SERVICES = [
  { icon: "send" as const, label: "Flights", desc: "Pakistan & worldwide fares", route: "/services" },
  { icon: "moon" as const, label: "Hajj & Umrah", desc: "Sacred pilgrimage packages", route: "/services" },
  { icon: "file-text" as const, label: "NADRA", desc: "NICOP & POC assistance", route: "/services" },
  { icon: "globe" as const, label: "Visa Help", desc: "Pakistani visa assistance", route: "/services" },
  { icon: "book" as const, label: "Passport", desc: "Application & renewal", route: "/services" },
  { icon: "calendar" as const, label: "Book Appt", desc: "Free consultation", route: "/book" },
];

const STATS = [
  { value: "20+", label: "Years\nExperience" },
  { value: "50k+", label: "Happy\nClients" },
  { value: "4.9★", label: "Average\nRating" },
  { value: "24/7", label: "WhatsApp\nSupport" },
];

export default function HomeScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const isWeb = Platform.OS === "web";
  const topPad = isWeb ? 67 : insets.top;
  const bottomPad = isWeb ? 34 : insets.bottom;

  const styles = makeStyles(colors, topPad, bottomPad);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Hero */}
      <ImageBackground
        source={MAKKAH_IMAGE}
        style={styles.hero}
        imageStyle={styles.heroImage}
      >
        <View style={[styles.heroOverlay, { paddingTop: topPad + 20 }]}>
          <View style={styles.ratingBadge}>
            <Feather name="star" size={12} color={colors.accent} />
            <Text style={styles.ratingText}>4.9/5 · Best Rated Agency</Text>
          </View>
          <Text style={styles.heroTitle}>Your Journey{"\n"}Begins Here</Text>
          <Text style={styles.heroSub}>
            Premium Hajj & Umrah · Flights to Pakistan{"\n"}NADRA · Visa · Passport
          </Text>
          <View style={styles.heroBtns}>
            <Pressable
              style={({ pressed }) => [styles.heroBtn, styles.heroBtnPrimary, pressed && { opacity: 0.85 }]}
              onPress={() => router.push("/book" as any)}
            >
              <Feather name="calendar" size={16} color="#fff" />
              <Text style={styles.heroBtnPrimaryText}>Book Free Consultation</Text>
            </Pressable>
            <Pressable
              style={({ pressed }) => [styles.heroBtn, styles.heroBtnOutline, pressed && { opacity: 0.85 }]}
              onPress={() => Linking.openURL(`tel:${PHONE_INTL}`)}
            >
              <Feather name="phone" size={16} color="#fff" />
              <Text style={styles.heroBtnOutlineText}>{PHONE}</Text>
            </Pressable>
          </View>
        </View>
      </ImageBackground>

      {/* Stats */}
      <View style={styles.statsRow}>
        {STATS.map((s) => (
          <View key={s.value} style={styles.statItem}>
            <Text style={styles.statValue}>{s.value}</Text>
            <Text style={styles.statLabel}>{s.label}</Text>
          </View>
        ))}
      </View>

      {/* Services Grid */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Our Services</Text>
        <View style={styles.servicesGrid}>
          {SERVICES.map((svc) => (
            <Pressable
              key={svc.label}
              style={({ pressed }) => [styles.serviceCard, pressed && { opacity: 0.8, transform: [{ scale: 0.97 }] }]}
              onPress={() => router.push(svc.route as any)}
            >
              <View style={styles.serviceIcon}>
                <Feather name={svc.icon} size={22} color={colors.primary} />
              </View>
              <Text style={styles.serviceLabel}>{svc.label}</Text>
              <Text style={styles.serviceDesc}>{svc.desc}</Text>
            </Pressable>
          ))}
        </View>
      </View>

      {/* Why Choose Us */}
      <View style={[styles.section, styles.whySection]}>
        <Text style={[styles.sectionTitle, { color: "#fff" }]}>Why Sunrise Travels?</Text>
        {[
          { icon: "award" as const, text: "ATOL & IATA certified agency" },
          { icon: "users" as const, text: "Dedicated bilingual team (English & Urdu)" },
          { icon: "check-circle" as const, text: "Exclusive unpublished airfares" },
          { icon: "map-pin" as const, text: "Walk-in office in Luton, UK" },
        ].map((item) => (
          <View key={item.text} style={styles.whyRow}>
            <View style={styles.whyIconWrap}>
              <Feather name={item.icon} size={18} color={colors.accent} />
            </View>
            <Text style={styles.whyText}>{item.text}</Text>
          </View>
        ))}
      </View>

      {/* Contact CTA */}
      <View style={styles.ctaSection}>
        <Text style={styles.ctaTitle}>Get in Touch</Text>
        <Text style={styles.ctaSub}>Call us or WhatsApp — we respond fast!</Text>
        <View style={styles.ctaBtns}>
          <Pressable
            style={({ pressed }) => [styles.ctaBtn, styles.ctaBtnPhone, pressed && { opacity: 0.85 }]}
            onPress={() => Linking.openURL(`tel:${PHONE_INTL}`)}
          >
            <Feather name="phone" size={18} color="#fff" />
            <Text style={styles.ctaBtnText}>Call Now</Text>
          </Pressable>
          <Pressable
            style={({ pressed }) => [styles.ctaBtn, styles.ctaBtnWhatsapp, pressed && { opacity: 0.85 }]}
            onPress={() => Linking.openURL(`https://wa.me/${WHATSAPP}`)}
          >
            <Feather name="message-circle" size={18} color="#fff" />
            <Text style={styles.ctaBtnText}>WhatsApp</Text>
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
    hero: {
      height: 420,
      backgroundColor: "#0a1929",
    },
    heroImage: { opacity: 0.9 },
    heroOverlay: {
      flex: 1,
      backgroundColor: "rgba(10,25,41,0.82)",
      paddingHorizontal: 24,
      paddingBottom: 32,
      justifyContent: "flex-end",
    },
    ratingBadge: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      backgroundColor: "rgba(255,255,255,0.12)",
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 20,
      alignSelf: "flex-start",
      marginBottom: 14,
    },
    ratingText: {
      color: "#fff",
      fontSize: 12,
      fontFamily: "Inter_500Medium",
    },
    heroTitle: {
      color: "#fff",
      fontSize: 36,
      fontFamily: "Inter_700Bold",
      lineHeight: 44,
      marginBottom: 12,
    },
    heroSub: {
      color: "rgba(255,255,255,0.78)",
      fontSize: 14,
      fontFamily: "Inter_400Regular",
      lineHeight: 22,
      marginBottom: 24,
    },
    heroBtns: { flexDirection: "column", gap: 10 },
    heroBtn: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      paddingVertical: 14,
      paddingHorizontal: 20,
      borderRadius: 12,
      justifyContent: "center",
    },
    heroBtnPrimary: { backgroundColor: colors.primary },
    heroBtnPrimaryText: { color: "#fff", fontFamily: "Inter_600SemiBold", fontSize: 15 },
    heroBtnOutline: { backgroundColor: "rgba(255,255,255,0.15)", borderWidth: 1, borderColor: "rgba(255,255,255,0.3)" },
    heroBtnOutlineText: { color: "#fff", fontFamily: "Inter_500Medium", fontSize: 14 },
    statsRow: {
      flexDirection: "row",
      backgroundColor: colors.primary,
      paddingVertical: 18,
    },
    statItem: { flex: 1, alignItems: "center" },
    statValue: { color: colors.accent, fontSize: 20, fontFamily: "Inter_700Bold" },
    statLabel: { color: "rgba(255,255,255,0.75)", fontSize: 11, fontFamily: "Inter_400Regular", textAlign: "center", marginTop: 2 },
    section: { paddingHorizontal: 20, paddingTop: 28, paddingBottom: 8 },
    sectionTitle: { color: colors.foreground, fontSize: 20, fontFamily: "Inter_700Bold", marginBottom: 16 },
    servicesGrid: { flexDirection: "row", flexWrap: "wrap", gap: 12 },
    serviceCard: {
      width: "47%",
      backgroundColor: colors.card,
      borderRadius: colors.radius,
      padding: 16,
      borderWidth: 1,
      borderColor: colors.border,
    },
    serviceIcon: {
      width: 44,
      height: 44,
      borderRadius: 12,
      backgroundColor: `${colors.primary}15`,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 10,
    },
    serviceLabel: { color: colors.foreground, fontFamily: "Inter_600SemiBold", fontSize: 14, marginBottom: 3 },
    serviceDesc: { color: colors.mutedForeground, fontFamily: "Inter_400Regular", fontSize: 12 },
    whySection: { backgroundColor: colors.primary, marginHorizontal: 0, paddingHorizontal: 24, paddingVertical: 28 },
    whyRow: { flexDirection: "row", alignItems: "center", gap: 14, marginBottom: 16 },
    whyIconWrap: {
      width: 36,
      height: 36,
      borderRadius: 10,
      backgroundColor: "rgba(255,255,255,0.12)",
      alignItems: "center",
      justifyContent: "center",
    },
    whyText: { color: "rgba(255,255,255,0.9)", fontFamily: "Inter_400Regular", fontSize: 14, flex: 1 },
    ctaSection: { paddingHorizontal: 20, paddingTop: 28, paddingBottom: 8 },
    ctaTitle: { color: colors.foreground, fontSize: 20, fontFamily: "Inter_700Bold", marginBottom: 6 },
    ctaSub: { color: colors.mutedForeground, fontSize: 14, fontFamily: "Inter_400Regular", marginBottom: 18 },
    ctaBtns: { flexDirection: "row", gap: 12 },
    ctaBtn: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      paddingVertical: 14,
      borderRadius: 12,
    },
    ctaBtnPhone: { backgroundColor: colors.primary },
    ctaBtnWhatsapp: { backgroundColor: "#25D366" },
    ctaBtnText: { color: "#fff", fontFamily: "Inter_600SemiBold", fontSize: 15 },
  });
}
