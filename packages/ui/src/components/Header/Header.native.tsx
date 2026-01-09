//packages/ui/src/components/Header.native.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
  Pressable,
} from 'react-native';
import {
  Globe,
  Bell,
  Calendar,
  FileText,
  HelpCircle,
  User,
  ChevronDown,
  Menu,
  X,
} from 'lucide-react-native';

import { styles } from '../Header/styles.native';

const HeaderNative = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);

  const navigationItems = [
    { id: 'dashboard', label: 'Pulpit', icon: <FileText size={18} /> },
    { id: 'calendar', label: 'Kalendarz', icon: <Calendar size={18} /> },
    { id: 'documents', label: 'Dokumenty', icon: <FileText size={18} /> },
    { id: 'knowledge', label: 'Wiedza', icon: <HelpCircle size={18} /> },
    { id: 'experts', label: 'Eksperci', icon: <User size={18} /> },
  ];

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
          <TouchableOpacity
            style={styles.languageButton}
            onPress={() => setShowLanguageDropdown(!showLanguageDropdown)}
          >
            <Globe size={16} color="#4B5563" />
            <Text style={styles.languageText}>🇵🇱</Text>
            <ChevronDown size={16} color="#4B5563" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.notificationButton}>
            <Bell size={20} color="#4B5563" />
            <View style={styles.badge}>
              <Text style={styles.badgeText}>3</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setIsMenuOpen(!isMenuOpen)}
            style={styles.menuButton}
          >
            {isMenuOpen ? (
              <X size={24} color="#4B5563" />
            ) : (
              <Menu size={24} color="#4B5563" />
            )}
          </TouchableOpacity>
        </View>
      </View>

      {isMenuOpen && (
        <View style={styles.mobileMenu}>
          <ScrollView>
            {navigationItems.map(item => (
              <TouchableOpacity
                key={item.id}
                style={styles.menuItem}
                onPress={() => setIsMenuOpen(false)}
              >
                <View style={styles.menuItemIcon}>{item.icon}</View>
                <Text style={styles.menuItemText}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      <Modal
        visible={showLanguageDropdown}
        transparent
        animationType="fade"
        onRequestClose={() => setShowLanguageDropdown(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setShowLanguageDropdown(false)}
        >
          <View style={styles.languageDropdown}>
            {['🇵🇱 Polski', '🇩🇪 Deutsch', '🇬🇧 English'].map(lang => (
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
