// apps/native/app/(protected)/consulting/index.tsx

import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  RefreshControl,
  StyleSheet,
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { Booking } from '@repo/types';

// Direct fetch to your API (since @repo/api-client might not be configured)
const API_BASE_URL = 'http://localhost:3001'; // Adjust to your API port

async function fetchBookings(userId: string): Promise<Booking[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/consulting/${userId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API fetch error:', error);
    throw error;
  }
}

export default function ConsultingScreen() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadBookings = useCallback(async () => {
    try {
      const data = await fetchBookings("user-123");
      setBookings(data);
    } catch (error) {
      console.error('Failed to fetch bookings:', error);
      Alert.alert('Error', 'Failed to load consulting bookings. Make sure the API server is running.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadBookings();
  }, [loadBookings]);

  const onRefresh = () => {
    setRefreshing(true);
    loadBookings();
  };

  const handleBookNew = () => {
    Alert.alert('Info', 'Booking feature coming soon');
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'confirmed':
        return { badgeStyle: styles.statusBadgeConfirmed, textStyle: styles.statusTextConfirmed, icon: '✅' };
      case 'pending':
        return { badgeStyle: styles.statusBadgePending, textStyle: styles.statusTextPending, icon: '⏰' };
      case 'cancelled':
        return { badgeStyle: styles.statusBadgeCancelled, textStyle: styles.statusTextCancelled, icon: '❌' };
      case 'completed':
        return { badgeStyle: styles.statusBadgeCompleted, textStyle: styles.statusTextCompleted, icon: '✓✓' };
      default:
        return { badgeStyle: styles.statusBadgeDefault, textStyle: styles.statusTextDefault, icon: 'ℹ️' };
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('de-DE', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const openMaps = async (address: string) => {
    if (!address) return;
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
    try {
      await Linking.openURL(url);
    } catch (error) {
      Alert.alert('Error', 'Could not open maps');
    }
  };

  const showBookingDetails = (booking: Booking) => {
    Alert.alert(
      'Booking Details',
      `👤 Consultant: ${booking.consultantName}\n` +
      `📅 Date: ${formatDate(booking.date)}\n` +
      `📊 Status: ${booking.status}\n` +
      `📍 Location: ${booking.address?.fullAddress || 'No address'}\n` +
      `📝 Notes: ${booking.notes || 'No notes'}`
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2563eb" />
        <Text style={styles.loadingText}>Loading consulting bookings...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <View style={styles.content}>
          {/* Header Section */}
          <View style={styles.headerSection}>
            <View style={styles.titleArea}>
              <Text style={styles.headerIcon}>📞</Text>
              <Text style={styles.headerTitle}>Consulting Bookings</Text>
              <View style={styles.badgeSystem}>
                <Text style={styles.badgeText}>Backend Source of Truth</Text>
              </View>
            </View>
            <TouchableOpacity onPress={handleBookNew} style={styles.bookButton}>
              <Text style={styles.bookButtonText}>+ Book New Consultation</Text>
            </TouchableOpacity>
          </View>

          {/* Stats Summary */}
          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{bookings.length}</Text>
              <Text style={styles.statLabel}>Total Bookings</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{bookings.filter(b => b.status === 'confirmed').length}</Text>
              <Text style={styles.statLabel}>Confirmed</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{bookings.filter(b => b.status === 'pending').length}</Text>
              <Text style={styles.statLabel}>Pending</Text>
            </View>
          </View>

          {/* Table Container */}
          <View style={styles.tableContainer}>
            {/* Table Header */}
            <View style={styles.tableHeader}>
              <Text style={[styles.headerCell, styles.consultantHeader]}>Consultant</Text>
              <Text style={[styles.headerCell, styles.dateHeader]}>Date & Time</Text>
              <Text style={[styles.headerCell, styles.locationHeader]}>Location</Text>
              <Text style={[styles.headerCell, styles.statusHeader]}>Status</Text>
              <Text style={[styles.headerCell, styles.notesHeader]}>Notes</Text>
            </View>

            {/* Table Body */}
            <View style={styles.tableBody}>
              {bookings.map((booking, index) => {
                const statusConfig = getStatusConfig(booking.status);
                return (
                  <TouchableOpacity
                    key={booking.id}
                    style={[styles.tableRow, index === bookings.length - 1 && styles.lastRow]}
                    onPress={() => showBookingDetails(booking)}
                    activeOpacity={0.7}
                  >
                    {/* Consultant */}
                    <View style={[styles.cell, styles.consultantCell]}>
                      <Text style={styles.consultantName}>{booking.consultantName}</Text>
                    </View>

                    {/* Date */}
                    <View style={[styles.cell, styles.dateCell]}>
                      <Text style={styles.cellText}>{formatDate(booking.date)}</Text>
                    </View>

                    {/* Location */}
                    <View style={[styles.cell, styles.locationCell]}>
                      {booking.address?.fullAddress ? (
                        <TouchableOpacity
                          onPress={() => openMaps(booking.address.fullAddress)}
                          style={styles.addressLink}
                        >
                          <Text style={styles.addressText} numberOfLines={1}>
                            📍 {booking.address.fullAddress}
                          </Text>
                        </TouchableOpacity>
                      ) : (
                        <Text style={styles.noAddressText}>— No address</Text>
                      )}
                    </View>

                    {/* Status */}
                    <View style={[styles.cell, styles.statusCell]}>
                      <View style={[styles.statusBadge, statusConfig.badgeStyle]}>
                        <Text style={[styles.statusText, statusConfig.textStyle]}>
                          {statusConfig.icon} {booking.status}
                        </Text>
                      </View>
                    </View>

                    {/* Notes */}
                    <View style={[styles.cell, styles.notesCell]}>
                      <Text style={styles.cellText} numberOfLines={1}>
                        {booking.notes || '—'}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}

              {bookings.length === 0 && (
                <View style={styles.emptyState}>
                  <Text style={styles.emptyStateText}>No consulting bookings found.</Text>
                  <Text style={styles.emptyStateSubtext}>Pull to refresh or book a new consultation</Text>
                </View>
              )}
            </View>
          </View>

          {/* Info Note */}
          <View style={styles.infoNote}>
            <Text style={styles.infoIcon}>✅</Text>
            <View style={styles.infoContent}>
              <Text style={styles.infoTitle}>Production-aligned · Single source of truth</Text>
              <Text style={styles.infoText}>
                Backend returns address.fullAddress directly. No Google API, no geospatial logic. 
                Click address → opens Google Maps via native Linking.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f5f9',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
  },
  loadingText: {
    marginTop: 12,
    color: '#64748b',
    fontSize: 14,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  headerSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: 20,
    gap: 12,
  },
  titleArea: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flexWrap: 'wrap',
  },
  headerIcon: {
    fontSize: 28,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0f172a',
  },
  badgeSystem: {
    backgroundColor: '#e6f0ff',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 40,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#1e40af',
  },
  bookButton: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  bookButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 13,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2563eb',
  },
  statLabel: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 4,
  },
  tableContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e9eef3',
    overflow: 'hidden',
    marginBottom: 16,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#fafcff',
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#eef2f6',
  },
  headerCell: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1e293b',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  consultantHeader: {
    width: '20%',
  },
  dateHeader: {
    width: '24%',
  },
  locationHeader: {
    width: '28%',
  },
  statusHeader: {
    width: '14%',
  },
  notesHeader: {
    width: '14%',
  },
  tableBody: {
    backgroundColor: 'white',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  lastRow: {
    borderBottomWidth: 0,
  },
  cell: {
    justifyContent: 'center',
  },
  cellText: {
    fontSize: 13,
    color: '#0f172a',
  },
  consultantCell: {
    width: '20%',
  },
  consultantName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0f172a',
  },
  dateCell: {
    width: '24%',
  },
  locationCell: {
    width: '28%',
  },
  addressLink: {
    backgroundColor: '#f8fafc',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: '#e2edff',
    alignSelf: 'flex-start',
  },
  addressText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#0f3b6f',
    maxWidth: 180,
  },
  noAddressText: {
    fontSize: 12,
    color: '#94a3b8',
  },
  statusCell: {
    width: '14%',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 100,
    alignSelf: 'flex-start',
  },
  statusBadgeConfirmed: {
    backgroundColor: '#dcfce7',
  },
  statusBadgePending: {
    backgroundColor: '#fef9c3',
  },
  statusBadgeCancelled: {
    backgroundColor: '#fee2e2',
  },
  statusBadgeCompleted: {
    backgroundColor: '#dbeafe',
  },
  statusBadgeDefault: {
    backgroundColor: '#f3f4f6',
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  statusTextConfirmed: {
    color: '#166534',
  },
  statusTextPending: {
    color: '#854d0e',
  },
  statusTextCancelled: {
    color: '#991b1b',
  },
  statusTextCompleted: {
    color: '#1e40af',
  },
  statusTextDefault: {
    color: '#1f2937',
  },
  notesCell: {
    width: '14%',
  },
  emptyState: {
    padding: 48,
    alignItems: 'center',
  },
  emptyStateText: {
    color: '#64748b',
    fontSize: 14,
    marginBottom: 8,
  },
  emptyStateSubtext: {
    color: '#94a3b8',
    fontSize: 12,
  },
  infoNote: {
    flexDirection: 'row',
    backgroundColor: '#f0f9ff',
    borderLeftWidth: 4,
    borderLeftColor: '#2563eb',
    padding: 14,
    borderRadius: 12,
    gap: 10,
  },
  infoIcon: {
    fontSize: 16,
  },
  infoContent: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 4,
  },
  infoText: {
    fontSize: 11,
    color: '#1e293b',
    lineHeight: 16,
  },
});