import React, { useState } from "react";
import { ScrollView, View, TextInput, Alert } from "react-native";
import { Heading, Body, PrimaryButton } from "../components/UI";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = () => {
    if (!email || !password) return Alert.alert("Error", "Completa los campos");
    console.log({email, password});
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("Usuario logueado:", userCredential.user);
        // auth state is handled by AuthContext; RootRoutes will switch stacks
      })
      .catch((error) => {
        console.error("Error al iniciar sesión:", error);
        Alert.alert("Error", error.message)
      });
  };

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={{ padding: 20, backgroundColor: "#ffffff", flexGrow: 1, justifyContent: "center" }}>
      <Heading style={{ marginBottom: 6 }}>Correo electrónico</Heading>
      <TextInput
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={{ borderWidth: 1, padding: 12, marginBottom: 12, borderColor: "#dfeee0", borderRadius: 8 }}
      />

      <Heading style={{ marginBottom: 6 }}>Contraseña</Heading>
      <TextInput
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ borderWidth: 1, padding: 12, marginBottom: 18, borderColor: "#dfeee0", borderRadius: 8 }}
      />

      <PrimaryButton title="Iniciar sesión" onPress={handleSignIn} />

      <View style={{ marginTop: 12 }}>
        <Body style={{ textAlign: "center", marginTop: 12 }} onPress={() => navigation.navigate("Register")}>Crear cuenta</Body>
      </View>
    </ScrollView>
  );
}
