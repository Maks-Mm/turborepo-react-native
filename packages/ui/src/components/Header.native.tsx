// packages/ui/src/components/Header.native.tsx
"use client";
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
  Pressable,
  StyleSheet,
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
      {/* Top bar */}
      <View style={styles.topBar}>
        <View style={styles.logoContainer}>
          <View style={styles.logo}>
            <Text style={styles.logoText}>D</Text>
          </View>
          <View>
            <Text style={styles.appName}>Doch.</Text>
            <Text style={styles.subtitle}>Für polnische Unternehmer in DE</Text>
          </View>
        </View>

        <View style={styles.actionsContainer}>
          {/* Language Selector */}
          <TouchableOpacity
            style={styles.languageButton}
            onPress={() => setShowLanguageDropdown(!showLanguageDropdown)}
          >
            <Globe size={16} color="#4B5563" />
            <Text style={styles.languageText}>🇵🇱</Text>
            <ChevronDown size={16} color="#4B5563" />
          </TouchableOpacity>

          {/* Notifications */}
          <TouchableOpacity style={styles.notificationButton}>
            <Bell size={20} color="#4B5563" />
            <View style={styles.badge}>
              <Text style={styles.badgeText}>3</Text>
            </View>
          </TouchableOpacity>

          {/* Urgent Alert */}
          <View style={styles.urgentAlert}>
            <Calendar size={14} color="#92400E" />
            <Text style={styles.urgentText}>USt-VA: 10 dni</Text>
          </View>

          {/* Mobile Menu Button */}
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

      {/* Mobile Menu */}
      {isMenuOpen && (
        <View style={styles.mobileMenu}>
          <ScrollView>
            {navigationItems.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.menuItem}
                onPress={() => setIsMenuOpen(false)}
              >
                <View style={styles.menuItemIcon}>{item.icon}</View>
                <Text style={styles.menuItemText}>{item.label}</Text>
              </TouchableOpacity>
            ))}
            
            {/* Urgent Alert in Menu */}
            <View style={styles.menuAlert}>
              <Calendar size={16} color="#DC2626" />
              <View style={styles.alertContent}>
                <Text style={styles.alertTitle}>Pilne: Umsatzsteuervoranmeldung</Text>
                <Text style={styles.alertSubtitle}>Termin: 10 dni • Finanzamt Berlin</Text>
              </View>
            </View>
          </ScrollView>
        </View>
      )}

      {/* Language Dropdown Modal */}
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
            <TouchableOpacity style={styles.languageOption}>
              <Text style={styles.languageFlag}>🇵🇱</Text>
              <Text style={styles.languageOptionText}>Polski</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.languageOption}>
              <Text style={styles.languageFlag}>🇩🇪</Text>
              <Text style={styles.languageOptionText}>Deutsch</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.languageOption}>
              <Text style={styles.languageFlag}>🇬🇧</Text>
              <Text style={styles.languageOptionText}>English</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 64,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logo: {
    width: 32,
    height: 32,
    backgroundColor: 'linear-gradient(135deg, #2563EB 0%, #DC2626 100%)',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  appName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
  },
  subtitle: {
    fontSize: 11,
    color: '#6B7280',
    marginTop: -2,
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  languageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    gap: 8,
  },
  languageText: {
    fontSize: 16,
  },
  notificationButton: {
    padding: 8,
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: '#EF4444',
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  urgentAlert: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    borderWidth: 1,
    borderColor: '#FDE68A',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    gap: 4,
  },
  urgentText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#92400E',
  },
  menuButton: {
    padding: 8,
  },
  mobileMenu: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingVertical: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  menuItemIcon: {
    marginRight: 12,
  },
  menuItemText: {
    fontSize: 16,
    color: '#374151',
  },
  menuAlert: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEE2E2',
    borderWidth: 1,
    borderColor: '#FECACA',
    margin: 16,
    padding: 12,
    borderRadius: 8,
    gap: 8,
  },
  alertContent: {
    flex: 1,
  },
  alertTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#DC2626',
  },
  alertSubtitle: {
    fontSize: 12,
    color: '#DC2626',
    marginTop: 2,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  languageDropdown: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    width: 200,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  languageOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  languageFlag: {
    fontSize: 20,
    marginRight: 12,
  },
  languageOptionText: {
    fontSize: 16,
    color: '#374151',
  },
});

export default HeaderNative;