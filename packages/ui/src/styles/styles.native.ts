//packages/ui/src/components/styles.web.ts

import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  header: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
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
  },

  logo: {
    width: 32,
    height: 32,
    backgroundColor: '#2563EB', // ✅ native-safe
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },

  logoText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
  },

  appName: {
    fontSize: 20,
    fontWeight: '700',
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
  },

  languageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    marginRight: 8,
  },

  languageText: {
    fontSize: 16,
    marginHorizontal: 6,
  },

  notificationButton: {
    padding: 8,
    marginRight: 4,
  },

  badge: {
    position: 'absolute',
    top: 2,
    right: 2,
    backgroundColor: '#EF4444',
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
  },

  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },

  menuButton: {
    padding: 8,
  },

  mobileMenu: {
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },

  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },

  menuItemIcon: {
    marginRight: 12,
  },

  menuItemText: {
    fontSize: 16,
    color: '#374151',
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  languageDropdown: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    width: 200,
    paddingVertical: 8,
    elevation: 6,
  },

  languageOption: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },

  languageOptionText: {
    fontSize: 16,
    color: '#374151',
  },
});
