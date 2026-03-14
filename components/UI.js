import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export const colors = {
  background: "#ffffff",
  surface: "#f6f7f8",
  primary: "#111827",
  text: "#0b1220",
  muted: "#6b7280",
};

export function Card({ children, style }) {
  return <View style={[styles.card, style]}>{children}</View>;
}

export function Heading({ children, style }) {
  return <Text style={[styles.heading, style]}>{children}</Text>;
}

export function Body({ children, style }) {
  return <Text style={[styles.body, style]}>{children}</Text>;
}

export function PrimaryButton({ title, onPress, style }) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 8,
    boxShadow: "0 6px 18px rgba(10, 10, 10, 0.04)",
  },
  heading: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.primary,
  },
  body: {
    fontSize: 14,
    color: colors.muted,
  },
  button: {
    backgroundColor: colors.background,
    borderColor: colors.primary,
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: colors.primary,
    fontWeight: "700",
  },
});

export default null;
