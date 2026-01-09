//packages/ui/src/components/styles.web.ts

import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  header: {
    backgroundColor: '#ffffff',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 64,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  logo: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#2563EB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    color: '#fff',
    fontWeight: '700',
  },
  appName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  subtitle: {
    fontSize: 12,
    color: '#6B7280',
  },

  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  languageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },

  languageText: {
    fontSize: 14,
  },

  notificationButton: {
    padding: 8,
  },

  badge: {
    position: 'absolute',
    top: 2,
    right: 2,
    backgroundColor: '#EF4444',
    borderRadius: 8,
    paddingHorizontal: 4,
  },

  badgeText: {
    color: '#fff',
    fontSize: 10,
  },

  menuButton: {
    padding: 8,
  },

  mobileMenu: {
    backgroundColor: '#fff',
  },

  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },

  menuItemIcon: {
    marginRight: 12,
  },

  menuItemText: {
    fontSize: 16,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  languageDropdown: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    width: 220,
  },

  languageOption: {
    paddingVertical: 10,
  },

  languageOptionText: {
    fontSize: 16,
  },
});
