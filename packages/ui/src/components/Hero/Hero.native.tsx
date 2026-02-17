//packages/ui/src/components/Hero/Hero.native.tsx
import React from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";

export default function Hero() {
  return (
    <ImageBackground
      source={{ uri: "https://plus.unsplash.com/premium_photo-1679860750530-0d6602d3bda7" }}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay} />
      <View style={styles.content}>
        <Text style={styles.title}>
          Business in Germany.{"\n"}Clear. In Polish.
        </Text>
        <Text style={styles.subtitle}>
          For Polish entrepreneurs who want clarity, not fear.
        </Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1, minHeight: 800, justifyContent: "center" },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(0,0,0,0.6)" },
  content: { paddingHorizontal: 32 },
  title: { fontSize: 32, fontWeight: "700", color: "#fff", marginBottom: 16 },
  subtitle: { fontSize: 16, color: "#ddd" },
});
