import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import HeaderBar from "../../components/HeaderBar";
import { colors } from "../../components/colors";

/**
 * Screen: Administración de préstamos
 * Placeholder con paleta Emerald + Zinc aplicada
 */
export default function AdminLoansScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <HeaderBar title="Gestión de Préstamos" showBack={false} />
      
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.content,
          { paddingBottom: insets.bottom + 20 }
        ]}
        showsVerticalScrollIndicator={false}
        bounces={true}
      >
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <View style={styles.heroIconContainer}>
            <Ionicons name="swap-horizontal" size={28} color={colors.primary} />
          </View>
          <Text style={styles.heroTitle}>Gestión de Préstamos</Text>
          <Text style={styles.heroSubtitle}>
            Administra solicitudes y devoluciones
          </Text>
        </View>

        {/* Placeholder Card */}
        <View style={styles.placeholderCard}>
          <Ionicons name="construct-outline" size={32} color={colors.textMuted} />
          <Text style={styles.placeholderTitle}>En construcción</Text>
          <Text style={styles.placeholderText}>
            Esta sección estará disponible próximamente.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  heroSection: {
    alignItems: "center",
    paddingVertical: 16,
    marginBottom: 8,
  },
  heroIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary + "15",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  heroTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: colors.text,
    letterSpacing: -0.5,
    marginBottom: 2,
  },
  heroSubtitle: {
    fontSize: 13,
    color: colors.textMuted,
    textAlign: "center",
  },
  placeholderCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 32,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    shadowColor: colors.cardShadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: colors.border,
  },
  placeholderTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.text,
  },
  placeholderText: {
    fontSize: 14,
    color: colors.textMuted,
    textAlign: "center",
  },
});
