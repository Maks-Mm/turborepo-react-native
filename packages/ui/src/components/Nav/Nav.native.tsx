//packages/ui/src/components/Nav/Nav.native.tsx
import React, { useState } from "react";
import { View, Text, Pressable, TextInput, StyleSheet } from "react-native";
import  AuthButton  from "../auth/AuthButton";

const navItems = [
  { id: "dashboard", label: "Pulpit" },
  { id: "deadlines", label: "Fristen & Termine" },
  { id: "documents", label: "Dokumenty" },
  { id: "knowledge", label: "Wiedza" },
  { id: "experts", label: "Eksperci" },
];

export default function Nav() {
  const [activePage, setActivePage] = useState("dashboard");
  const [showSearch, ] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <View style={styles.nav}>
      <View style={styles.row}>
        <View style={styles.tabs}>
          {navItems.map(item => (
            <Pressable
              key={item.id}
              onPress={() => setActivePage(item.id)}
              style={[
                styles.tab,
                activePage === item.id && styles.activeTab
              ]}
            >
              <Text
                style={[
                  styles.tabText,
                  activePage === item.id && styles.activeText
                ]}
              >
                {item.label}
              </Text>
            </Pressable>
          ))}
        </View>

        <AuthButton />
      </View>

      {showSearch && (
        <TextInput
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search..."
          style={styles.input}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  nav: { padding: 12, backgroundColor: "#f9fafb", borderBottomWidth: 1, borderColor: "#e5e7eb" },
  row: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  tabs: { flexDirection: "row", flexWrap: "wrap" },
  tab: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8 },
  activeTab: { backgroundColor: "#dbeafe" },
  tabText: { color: "#4b5563", fontSize: 14 },
  activeText: { color: "#2563eb", fontWeight: "600" },
  input: { marginTop: 10, borderWidth: 1, borderColor: "#ccc", padding: 8, borderRadius: 8 }
});
