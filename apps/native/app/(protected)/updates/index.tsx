// apps/native/app/(protected)/updates/index.tsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  Alert,
  RefreshControl,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface TaxUpdate {
  id: string;
  title: string;
  category: string;
  source: string;
  publishedAt: string;
}

export default function UpdatesScreen() {
  const [updates, setUpdates] = useState<TaxUpdate[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchUpdates();
  }, []);

  const fetchUpdates = async () => {
    try {
      // TODO: Replace with your actual API endpoint
      const res = await fetch('http://localhost:3001/api/updates');
      const data = await res.json();
      setUpdates(data);
    } catch (error) {
      console.error('Failed to fetch updates:', error);
      Alert.alert('Error', 'Failed to load tax updates');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchUpdates();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('de-DE', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
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
          {/* Header */}
          <Text style={styles.headerTitle}>📰 Steuer-Updates</Text>

          {/* Empty State */}
          {updates.length === 0 && (
            <Text style={styles.emptyStateText}>
              Keine Updates verfügbar.
            </Text>
          )}

          {/* Updates List */}
          <View style={styles.updatesList}>
            {updates.map((update) => (
              <View
                key={update.id}
                style={styles.updateCard}
              >
                <View style={styles.cardHeader}>
                  <Text style={styles.cardTitle}>{update.title}</Text>
                  <Text style={styles.cardDate}>
                    {formatDate(update.publishedAt)}
                  </Text>
                </View>
                <View style={styles.cardDetails}>
                  <Text style={styles.cardDetail}>
                    Kategorie: {update.category}
                  </Text>
                  <Text style={styles.cardDetail}>
                    Quelle: {update.source}
                  </Text>
                </View>
              </View>
            ))}
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
  emptyStateText: {
    color: '#6b7280',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 24,
  },
  updatesList: {
    gap: 16,
  },
  updateCard: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    padding: 16,
    backgroundColor: 'white',
    // shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    // shadow for Android
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardTitle: {
    fontWeight: '600',
    fontSize: 16,
    color: '#111827',
    flex: 1,
    marginRight: 8,
  },
  cardDate: {
    fontSize: 14,
    color: '#6b7280',
  },
  cardDetails: {
    flexDirection: 'row',
    gap: 16,
  },
  cardDetail: {
    fontSize: 14,
    color: '#4b5563',
  },
});