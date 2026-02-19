//packages/ui/src/components/Header.native.tsx
"use client";

import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
  Pressable,
} from "react-native";
import { Globe, Bell, Menu, X } from "lucide-react-native";
import { styles } from "./styles.native";
import { User } from "lucide-react-native";
//import AuthButton from "../auth/AuthButton.native";

const HeaderNative = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);

  return (
    <View style={styles.header}>
      <View style={styles.topBar}>
        {/* Logo */}
        <View style={styles.logoContainer}>
          <View style={styles.logo}>
            <Text style={styles.logoText}>D</Text>
          </View>
          <View>
            <Text style={styles.appName}>Doch.</Text>
            <Text style={styles.subtitle}>
              Für polnische Unternehmer in DE
            </Text>
          </View>
        </View>

        {/* Actions */}
        <View style={styles.actionsContainer}>
          {/* Language */}
          <TouchableOpacity
            style={styles.languageButton}
            onPress={() => setLanguageOpen(true)}
          >
            <Globe size={16} color="#4B5563" />
            <Text style={styles.languageText}>🇵🇱</Text>
          </TouchableOpacity>

          {/* Avatar */}
          <View
            style={{
              width: 32,
              height: 32,
              borderRadius: 16,
              backgroundColor: "#DBEAFE",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ color: "#2563EB", fontWeight: "bold" }}>

              <User size={20} color="#2563EB" />
            </Text>
          </View>

          {/* Notifications */}
          <TouchableOpacity style={styles.notificationButton}>
            <Bell size={20} color="#4B5563" />
          </TouchableOpacity>

          {/* Menu */}
          <TouchableOpacity
            onPress={() => setMenuOpen(!menuOpen)}
            style={styles.menuButton}
          >
            {menuOpen ? (
              <X size={24} color="#4B5563" />
            ) : (
              <Menu size={24} color="#4B5563" />
            )}
          </TouchableOpacity>
        </View>
      </View>

      {/* Language Modal */}
      <Modal visible={languageOpen} transparent animationType="fade">
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setLanguageOpen(false)}
        >
          <View style={styles.languageDropdown}>
            {["🇵🇱 Polski", "🇩🇪 Deutsch", "🇬🇧 English"].map((lang) => (
              <TouchableOpacity key={lang} style={styles.languageOption}>
                <Text style={styles.languageOptionText}>{lang}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

export default HeaderNative;
