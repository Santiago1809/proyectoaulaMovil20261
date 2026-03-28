import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "./colors";
import { useAuth } from "../contexts/AuthContext";

export default function MenuModal({ visible, onClose }) {
  const navigation = useNavigation();
  const { signOut, user } = useAuth();
  const insets = useSafeAreaInsets();

  const handleNavigate = (route) => {
    navigation.navigate(route);
    onClose();
  };

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.35)",
            justifyContent: "flex-end",
          }}
        >
          <TouchableWithoutFeedback>
            <View
              style={[
                styles.menuContainer,
                { paddingBottom: insets.bottom },
              ]}
            >
              <Text style={styles.title}>Cuenta</Text>
              <Text style={styles.email}>{user?.email}</Text>

              {user?.role === "admin" && (
                <>
                  <Text style={styles.sectionTitle}>Administración</Text>
                  <TouchableOpacity
                    onPress={() => handleNavigate("AdminBooks")}
                    style={styles.item}
                  >
                    <Text style={styles.itemText}>Gestión de Libros</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleNavigate("AdminLoans")}
                    style={styles.item}
                  >
                    <Text style={styles.itemText}>Gestión de Préstamos</Text>
                  </TouchableOpacity>
                </>
              )}

              <TouchableOpacity
                onPress={() => {
                  signOut();
                  onClose && onClose();
                }}
                style={styles.item}
              >
                <Text style={[styles.itemText, { color: colors.error }]}>
                  Cerrar sesión
                </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={onClose} style={styles.item}>
                <Text style={[styles.itemText, { color: colors.primary }]}>
                  Cerrar
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  menuContainer: {
    backgroundColor: colors.surface,
    padding: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.text,
    marginBottom: 6,
  },
  email: {
    color: colors.textMuted,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.textMuted,
    marginTop: 8,
    marginBottom: 8,
  },
  item: {
    paddingVertical: 12,
  },
  itemText: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.text,
  },
});
