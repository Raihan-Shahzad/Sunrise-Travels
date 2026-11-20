import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
  Linking,
  TextInput,
  ActivityIndicator,
  Platform,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Haptics from "expo-haptics";
import { useColors } from "@/hooks/useColors";

const PHONE = "01582 732007";
const PHONE_INTL = "+441582732007";
const WHATSAPP = "447777786396";
const EMAIL = "info@sunrisetravels.co.uk";

const HOURS = [
  { day: "Monday – Friday", time: "10:00 AM – 6:00 PM" },
  { day: "Saturday", time: "10:00 AM – 2:00 PM" },
  { day: "Sunday", time: "Closed" },
];

export default function ContactScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const isWeb = Platform.OS === "web";
  const topPad = isWeb ? 67 : insets.top;
  const bottomPad = isWeb ? 34 : insets.bottom;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const styles = makeStyles(colors, topPad, bottomPad);

  async function handleSend() {
    if (!name.trim() || !email.trim() || !message.trim()) return;
    setSending(true);
    setError("");
    try {
      const domain = process.env.EXPO_PUBLIC_DOMAIN;
      const base = domain ? `https://${domain}` : "";
      const res = await fetch(`${base}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), phone: phone.trim(), message: message.trim() }),
      });
      if (!res.ok) throw new Error("Failed to send");
      setSent(true);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      setName(""); setEmail(""); setPhone(""); setMessage("");
    } catch {
      setError("Failed to send. Please call us directly.");
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    } finally {
      setSending(false);
    }
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={[styles.header, { paddingTop: topPad + 16 }]}>
        <Text style={styles.headerTitle}>Get in Touch</Text>
        <Text style={styles.headerSub}>We respond fast — call, WhatsApp, or email</Text>
      </View>

      {/* Quick Actions */}
      <View style={styles.quickGrid}>
        <Pressable
          style={({ pressed }) => [styles.quickCard, pressed && { opacity: 0.85 }]}
          onPress={() => Linking.openURL(`tel:${PHONE_INTL}`)}
        >
          <View style={[styles.quickIcon, { backgroundColor: `${colors.primary}18` }]}>
            <Feather name="phone" size={22} color={colors.primary} />
          </View>
          <Text style={styles.quickLabel}>Phone</Text>
          <Text style={styles.quickValue}>{PHONE}</Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [styles.quickCard, pressed && { opacity: 0.85 }]}
          onPress={() => Linking.openURL(`https://wa.me/${WHATSAPP}`)}
        >
          <View style={[styles.quickIcon, { backgroundColor: "#25D36620" }]}>
            <Feather name="message-circle" size={22} color="#25D366" />
          </View>
          <Text style={styles.quickLabel}>WhatsApp</Text>
          <Text style={[styles.quickValue, { color: "#25D366" }]}>Chat Now</Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [styles.quickCard, pressed && { opacity: 0.85 }]}
          onPress={() => Linking.openURL(`mailto:${EMAIL}`)}
        >
          <View style={[styles.quickIcon, { backgroundColor: `${colors.accent}20` }]}>
            <Feather name="mail" size={22} color={colors.accent} />
          </View>
          <Text style={styles.quickLabel}>Email</Text>
          <Text style={styles.quickValue} numberOfLines={1}>{EMAIL}</Text>
        </Pressable>
      </View>

      {/* Office Address */}
      <View style={styles.addressCard}>
        <View style={styles.addressRow}>
          <Feather name="map-pin" size={20} color={colors.primary} />
          <View style={{ flex: 1 }}>
            <Text style={styles.addressTitle}>Office Address</Text>
            <Text style={styles.addressText}>211A Dunstable Road{"\n"}Luton, Bedfordshire{"\n"}LU1 1DD, United Kingdom</Text>
          </View>
          <Pressable
            onPress={() => Linking.openURL("https://maps.google.com/?q=211A+Dunstable+Road,+Luton+LU1+1DD")}
          >
            <View style={styles.dirBtn}>
              <Feather name="navigation" size={14} color={colors.primary} />
              <Text style={styles.dirBtnText}>Directions</Text>
            </View>
          </Pressable>
        </View>
      </View>

      {/* Hours */}
      <View style={styles.hoursCard}>
        <View style={styles.hoursHeader}>
          <Feather name="clock" size={18} color={colors.accent} />
          <Text style={styles.hoursTitle}>Business Hours</Text>
        </View>
        {HOURS.map((h) => (
          <View key={h.day} style={styles.hoursRow}>
            <Text style={styles.hoursDay}>{h.day}</Text>
            <Text style={[styles.hoursTime, h.time === "Closed" && { color: "#ef4444" }]}>{h.time}</Text>
          </View>
        ))}
      </View>

      {/* Contact Form */}
      <View style={styles.formSection}>
        <Text style={styles.formTitle}>Send a Message</Text>

        {sent ? (
          <View style={styles.sentBanner}>
            <Feather name="check-circle" size={20} color="#22c55e" />
            <Text style={styles.sentText}>Message sent! We'll be in touch soon.</Text>
          </View>
        ) : (
          <View style={styles.formCard}>
            <View style={styles.formField}>
              <Text style={styles.fieldLabel}>Full Name *</Text>
              <TextInput
                style={styles.input}
                placeholder="Your name"
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
              <Text style={styles.fieldLabel}>Phone (optional)</Text>
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
              <Text style={styles.fieldLabel}>Message *</Text>
              <TextInput
                style={[styles.input, styles.textarea]}
                placeholder="How can we help you?"
                placeholderTextColor={colors.mutedForeground}
                value={message}
                onChangeText={setMessage}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
            </View>

            {error ? (
              <View style={styles.errorBanner}>
                <Feather name="alert-circle" size={14} color="#dc2626" />
                <Text style={styles.errorText}>{error}</Text>
              </View>
            ) : null}

            <Pressable
              style={({ pressed }) => [
                styles.sendBtn,
                (!name.trim() || !email.trim() || !message.trim()) && { opacity: 0.45 },
                pressed && { opacity: 0.85 },
              ]}
              onPress={handleSend}
              disabled={sending || !name.trim() || !email.trim() || !message.trim()}
            >
              {sending ? (
                <ActivityIndicator color="#fff" size="small" />
              ) : (
                <>
                  <Feather name="send" size={16} color="#fff" />
                  <Text style={styles.sendBtnText}>Send Message</Text>
                </>
              )}
            </Pressable>
          </View>
        )}
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
      backgroundColor: colors.primary,
      paddingHorizontal: 20,
      paddingBottom: 20,
    },
    headerTitle: { color: "#fff", fontSize: 28, fontFamily: "Inter_700Bold", marginBottom: 4 },
    headerSub: { color: "rgba(255,255,255,0.75)", fontSize: 14, fontFamily: "Inter_400Regular" },
    quickGrid: { flexDirection: "row", padding: 16, gap: 10 },
    quickCard: {
      flex: 1,
      backgroundColor: colors.card,
      borderRadius: colors.radius,
      borderWidth: 1,
      borderColor: colors.border,
      padding: 14,
      alignItems: "center",
    },
    quickIcon: { width: 44, height: 44, borderRadius: 12, alignItems: "center", justifyContent: "center", marginBottom: 8 },
    quickLabel: { color: colors.mutedForeground, fontFamily: "Inter_400Regular", fontSize: 11, marginBottom: 3 },
    quickValue: { color: colors.primary, fontFamily: "Inter_600SemiBold", fontSize: 12, textAlign: "center" },
    addressCard: {
      marginHorizontal: 16,
      backgroundColor: colors.card,
      borderRadius: colors.radius,
      borderWidth: 1,
      borderColor: colors.border,
      padding: 16,
      marginBottom: 12,
    },
    addressRow: { flexDirection: "row", alignItems: "flex-start", gap: 12 },
    addressTitle: { color: colors.foreground, fontFamily: "Inter_600SemiBold", fontSize: 14, marginBottom: 4 },
    addressText: { color: colors.mutedForeground, fontFamily: "Inter_400Regular", fontSize: 13, lineHeight: 20 },
    dirBtn: {
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
      backgroundColor: `${colors.primary}15`,
      borderRadius: 8,
      paddingHorizontal: 10,
      paddingVertical: 7,
    },
    dirBtnText: { color: colors.primary, fontFamily: "Inter_500Medium", fontSize: 12 },
    hoursCard: {
      marginHorizontal: 16,
      backgroundColor: "#0a1929",
      borderRadius: colors.radius,
      padding: 16,
      marginBottom: 20,
    },
    hoursHeader: { flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 14 },
    hoursTitle: { color: "#fff", fontFamily: "Inter_700Bold", fontSize: 16 },
    hoursRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingVertical: 8,
      borderBottomWidth: 1,
      borderBottomColor: "rgba(255,255,255,0.1)",
    },
    hoursDay: { color: "rgba(255,255,255,0.7)", fontFamily: "Inter_400Regular", fontSize: 13 },
    hoursTime: { color: "#fff", fontFamily: "Inter_500Medium", fontSize: 13 },
    formSection: { paddingHorizontal: 16 },
    formTitle: { color: colors.foreground, fontFamily: "Inter_700Bold", fontSize: 18, marginBottom: 14 },
    formCard: {
      backgroundColor: colors.card,
      borderRadius: colors.radius,
      borderWidth: 1,
      borderColor: colors.border,
      padding: 16,
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
    textarea: { minHeight: 100 },
    sendBtn: {
      backgroundColor: colors.primary,
      borderRadius: 12,
      paddingVertical: 14,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      marginTop: 4,
    },
    sendBtnText: { color: "#fff", fontFamily: "Inter_600SemiBold", fontSize: 15 },
    sentBanner: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      backgroundColor: "#f0fdf4",
      borderRadius: 12,
      padding: 16,
      borderWidth: 1,
      borderColor: "#86efac",
    },
    sentText: { color: "#15803d", fontFamily: "Inter_500Medium", fontSize: 14, flex: 1 },
    errorBanner: {
      flexDirection: "row",
      alignItems: "flex-start",
      gap: 8,
      backgroundColor: "#fef2f2",
      borderRadius: 10,
      padding: 12,
      marginBottom: 10,
    },
    errorText: { color: "#dc2626", fontFamily: "Inter_400Regular", fontSize: 13, flex: 1 },
  });
}
