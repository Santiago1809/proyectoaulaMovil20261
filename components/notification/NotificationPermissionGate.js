import { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Platform } from "react-native";
import * as Notifications from "expo-notifications";
import { Ionicons } from "@expo/vector-icons";
import colors from "../colors";

/**
 * NotificationPermissionGate
 *
 * Componente que muestra un banner cuando los permisos de notificación
 * NO han sido concedidos. El usuario puede tocar para solicitarlos.
 *
 * Sigue Clean Architecture: solo renderiza UI, no contiene lógica de negocio.
 * La lógica de permisos se maneja en el hook useNotifications.
 */
export default function NotificationPermissionGate() {
  const [permissionStatus, setPermissionStatus] = useState("undetermined");

  useEffect(() => {
    checkPermissions();
  }, []);

  const checkPermissions = async () => {
    try {
      const { status } = await Notifications.getPermissionsAsync();
      setPermissionStatus(status);
    } catch {
      setPermissionStatus("undetermined");
    }
  };

  const requestPermissions = async () => {
    try {
      const { status } = await Notifications.requestPermissionsAsync({
        ios: {
          allowAlert: true,
          allowBadge: true,
          allowSound: true,
        },
      });
      setPermissionStatus(status);
    } catch {
      setPermissionStatus("denied");
    }
  };

  // No mostrar nada si ya tiene permisos
  if (permissionStatus === "granted") return null;

  // En iOS "denied" significa que el usuario rechazó explícitamente
  // (no se puede volver a preguntar, hay que ir a Settings)
  const isPermanentlyDenied =
    Platform.OS === "ios" && permissionStatus === "denied";

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Ionicons
          name={isPermanentlyDenied ? "notifications-off" : "notifications"}
          size={24}
          color={colors.warning}
          style={styles.icon}
        />
        <View style={styles.textContainer}>
          <Text style={styles.title}>
            {isPermanentlyDenied
              ? "Notificaciones desactivadas"
              : "Activá las notificaciones"}
          </Text>
          <Text style={styles.description}>
            {isPermanentlyDenied
              ? "Activá las notificaciones desde Configuración para no perderte el estado de tus préstamos."
              : "Recibí alertas cuando tus préstamos estén por vencer o tengamos novedades."}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={requestPermissions}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonText}>
            {isPermanentlyDenied ? "Abrir Config." : "Permitir"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
  },
  icon: {
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 2,
  },
  description: {
    fontSize: 12,
    color: colors.textLight,
    lineHeight: 16,
  },
  button: {
    backgroundColor: colors.primary,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
    marginLeft: 8,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "600",
  },
});
