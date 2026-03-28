import React from "react";
import { View } from "react-native";
import BookDetails from "../components/book/BookDetails";

export default function Details({ route }) {
  const { book } = route.params;

  return (
    <View style={{ flex: 1 }}>
      <BookDetails book={book} />
    </View>
  );
}
