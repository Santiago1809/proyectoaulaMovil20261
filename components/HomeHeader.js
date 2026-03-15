import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Heading, Body } from ".";
import { colors } from "./colors";

export function HomeHeader({ user, onSignOut }) {
  const insets = useSafeAreaInsets();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Buenos días";
    if (hour < 18) return "Buenas tardes";
    return "Buenas noches";
  };

  const email = user ? user.email : null;
  const userName = email ? email.split("@")[0] : "Usuario";

  return (
    <View
      style={[
        {
          paddingHorizontal: 16,
          paddingTop: 16 + insets.top,
          paddingBottom: 12,
          backgroundColor: colors.background,
        },
      ]}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 8,
        }}
      >
        <View style={{ flex: 1 }}>
          <Heading style={{ fontSize: 16, color: colors.textMuted }}>
            {getGreeting()},
          </Heading>
          <Heading
            style={{
              fontSize: 26,
              fontWeight: "700",
              color: colors.text,
              lineHeight: 32,
            }}
          >
            {userName}
          </Heading>
        </View>
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: colors.primary,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{ color: colors.surface, fontSize: 16, fontWeight: "700" }}
          >
            {userName[0]?.toUpperCase()}
          </Text>
        </View>
      </View>
      <Body style={{ fontSize: 13, color: colors.textMuted, marginBottom: 16 }}>
        {new Date().toLocaleDateString("es-ES", {
          weekday: "long",
          day: "numeric",
          month: "long",
        })}
      </Body>
      <TouchableOpacity
        onPress={onSignOut}
        style={{
          paddingVertical: 8,
          paddingHorizontal: 12,
          borderRadius: 8,
          alignItems: "center",
        }}
      >
        <Body style={{ color: colors.error, fontWeight: "600", fontSize: 14 }}>
          Cerrar sesión
        </Body>
      </TouchableOpacity>
    </View>
  );
}

export default HomeHeader;
