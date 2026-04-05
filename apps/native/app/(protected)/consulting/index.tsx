//apps/native/app/(protected)/consulting/index.tsx


import React, { useState, useEffect } from 'react';
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
// Remove useRouter since it's not used
import { Booking } from '@repo/types';
import { fetchBookings as fetchBookingsFromAPI } from '@repo/api-client'; // ✅ Renamed import

export default function ConsultingScreen() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadBookings(); // ✅ Different name
  }, []);

  const loadBookings = async () => { // ✅ Different name
    try {
      const data = await fetchBookingsFromAPI("user-123"); // ✅ Use renamed import
      setBookings(data);
    } catch (error) {
      console.error('Failed to fetch bookings:', error);
      Alert.alert('Error', 'Failed to load consulting bookings');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadBookings(); // ✅ Use correct function name
  };

  const handleBookNew = () => {
    Alert.alert('Info', 'Booking feature coming soon');
  };

  const getStatusBadgeStyle = (status: string) => {
    switch (status) {
      case 'confirmed':
        return styles.statusBadgeConfirmed;
      case 'pending':
        return styles.statusBadgePending;
      case 'cancelled':
        return styles.statusBadgeCancelled;
      case 'completed':
        return styles.statusBadgeCompleted;
      default:
        return styles.statusBadgeDefault;
    }
  };

  const getStatusTextStyle = (status: string) => {
    switch (status) {
      case 'confirmed':
        return styles.statusTextConfirmed;
      case 'pending':
        return styles.statusTextPending;
      case 'cancelled':
        return styles.statusTextCancelled;
      case 'completed':
        return styles.statusTextCompleted;
      default:
        return styles.statusTextDefault;
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

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.content}>
          <Text style={styles.headerTitle}>📞 Consulting Bookings</Text>

          <TouchableOpacity onPress={handleBookNew} style={styles.bookButton}>
            <Text style={styles.bookButtonText}>Book New Consultation</Text>
          </TouchableOpacity>

          <View style={styles.tableContainer}>
            {/* Table Header - WITH Location column */}
            <View style={styles.tableHeader}>
              <Text style={[styles.headerCell, styles.consultantHeaderCell]}>Consultant</Text>
              <Text style={[styles.headerCell, styles.dateHeaderCell]}>Date</Text>
              <Text style={[styles.headerCell, styles.statusHeaderCell]}>Status</Text>
              <Text style={[styles.headerCell, styles.locationHeaderCell]}>Location</Text>
              <Text style={[styles.headerCell, styles.notesHeaderCell]}>Notes</Text>
            </View>

            {/* Table Body */}
            <View style={styles.tableBody}>
              {bookings.map((booking, index) => (
                <TouchableOpacity
                  key={booking.id}
                  style={[
                    styles.tableRow,
                    index === bookings.length - 1 && styles.lastRow,
                  ]}
                  onPress={() => {
                    Alert.alert('Booking Details', 
                      `Consultant: ${booking.consultantName}\n` +
                      `Date: ${formatDate(booking.date)}\n` +
                      `Status: ${booking.status}\n` +
                      `Location: ${booking.address?.fullAddress || 'No address'}\n` +
                      `Notes: ${booking.notes || 'No notes'}`
                    );
                  }}
                >
                  <View style={[styles.cellContainer, styles.consultantCell]}>
                    <Text style={styles.cellText} numberOfLines={1}>
                      {booking.consultantName}
                    </Text>
                  </View>
                  <View style={[styles.cellContainer, styles.dateCell]}>
                    <Text style={styles.cellText} numberOfLines={1}>
                      {formatDate(booking.date)}
                    </Text>
                  </View>
                  <View style={[styles.cellContainer, styles.statusCell]}>
                    <View style={[styles.statusBadge, getStatusBadgeStyle(booking.status)]}>
                      <Text style={[styles.statusText, getStatusTextStyle(booking.status)]}>
                        {booking.status}
                      </Text>
                    </View>
                  </View>
                  {/* Location Cell with Google Maps link */}
                  <View style={[styles.cellContainer, styles.locationCell]}>
                    <Text
                      style={[styles.cellText, styles.locationLink]}
                      numberOfLines={1}
                      onPress={() =>
                        Linking.openURL(
                          `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                            booking.address?.fullAddress || ''
                          )}`
                        )
                      }
                    >
                      📍 {booking.address?.fullAddress || 'No address'}
                    </Text>
                  </View>
                  <View style={[styles.cellContainer, styles.notesCell]}>
                    <Text style={styles.cellText} numberOfLines={1}>
                      {booking.notes || '—'}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}

              {bookings.length === 0 && (
                <View style={styles.emptyState}>
                  <Text style={styles.emptyStateText}>
                    No consulting bookings found.
                  </Text>
                </View>
              )}
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
    backgroundColor: '#f9fafb',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 24,
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 24,
  },
  bookButton: {
    backgroundColor: '#eff6ff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: 24,
  },
  bookButtonText: {
    color: '#2563eb',
    fontSize: 16,
    fontWeight: '600',
  },
  tableContainer: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: 'white',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f9fafb',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  headerCell: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  consultantHeaderCell: {
    width: '20%',
  },
  dateHeaderCell: {
    width: '25%',
  },
  statusHeaderCell: {
    width: '15%',
  },
  locationHeaderCell: {
    width: '25%',
  },
  notesHeaderCell: {
    width: '15%',
  },
  tableBody: {
    backgroundColor: 'white',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  lastRow: {
    borderBottomWidth: 0,
  },
  cellContainer: {
    justifyContent: 'center',
  },
  cellText: {
    fontSize: 14,
    color: '#1f2937',
  },
  locationLink: {
    color: '#2563eb',
    textDecorationLine: 'underline',
  },
  consultantCell: {
    width: '20%',
  },
  dateCell: {
    width: '25%',
  },
  statusCell: {
    width: '15%',
  },
  locationCell: {
    width: '25%',
  },
  notesCell: {
    width: '15%',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
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
    fontSize: 12,
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
  emptyState: {
    padding: 24,
    alignItems: 'center',
  },
  emptyStateText: {
    color: '#6b7280',
    fontSize: 14,
  },
});