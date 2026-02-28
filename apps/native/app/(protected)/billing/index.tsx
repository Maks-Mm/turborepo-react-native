// apps/native/app/(protected)/billing/index.tsx
'use client';

import { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';

interface BillingStats {
  pendingDocuments: number;
  totalInvoices: number;
  lastPaymentDate: string | null;
}

export default function BillingScreen() {
  const [stats, setStats] = useState<BillingStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBillingStats();
  }, []);

  const fetchBillingStats = async () => {
    try {
      // TODO: replace with real API & user auth
      const res = await fetch('http://localhost:3001/api/billing/user-123');
      const data = await res.json();
      setStats(data);
    } catch (error) {
      console.error('Failed to fetch billing stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#3b82f6" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>📄 Billing Overview</Text>

      {/* Stats Cards */}
      <View style={styles.cardContainer}>
        <View style={[styles.card, { backgroundColor: '#fef3c7' }]}>
          <Text style={styles.cardTitle}>Pending Documents</Text>
          <Text style={styles.cardNumber}>{stats?.pendingDocuments || 0}</Text>
        </View>

        <View style={[styles.card, { backgroundColor: '#dbeafe' }]}>
          <Text style={styles.cardTitle}>Total Invoices</Text>
          <Text style={styles.cardNumber}>{stats?.totalInvoices || 0}</Text>
        </View>

        <View style={[styles.card, { backgroundColor: '#dcfce7' }]}>
          <Text style={styles.cardTitle}>Last Payment</Text>
          <Text style={styles.cardNumber}>
            {stats?.lastPaymentDate ? new Date(stats.lastPaymentDate).toLocaleDateString() : '—'}
          </Text>
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionText}>Upload Document 📤</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionText}>Pay Invoice 💳</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionText}>View History 📝</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 12,
  },
  card: {
    flexBasis: '48%',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  cardNumber: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  actionsContainer: {
    marginTop: 24,
  },
  actionButton: {
    backgroundColor: '#e0e7ff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  actionText: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});