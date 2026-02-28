// apps/native/app/(protected)/dashboard/index.tsx
import { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';

interface DashboardStats {
  openDeadlines: number;
  pendingDocuments: number;
  unreadMessages: number;
  nextDeadline: {
    title: string;
    dueDate: string;
    daysLeft: number;
  } | null;
}

export default function DashboardScreen() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const res = await fetch('http://localhost:3001/api/dashboard/user-123');
      const data = await res.json();
      setStats(data);
    } catch (error) {
      console.error('Failed to fetch dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>📊 Dashboard</Text>

      {/* Stats Grid */}
      <View style={styles.grid}>
        {/* Deadlines */}
        <TouchableOpacity style={[styles.card, styles.blueCard]}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardIcon}>📅</Text>
            <Text style={styles.cardCount}>{stats?.openDeadlines || 0}</Text>
          </View>
          <Text style={styles.cardTitle}>Offene Fristen</Text>
          <Text style={styles.cardDesc}>Deadlines die bearbeitet werden müssen</Text>
        </TouchableOpacity>

        {/* Documents */}
        <TouchableOpacity style={[styles.card, styles.yellowCard]}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardIcon}>📎</Text>
            <Text style={styles.cardCount}>{stats?.pendingDocuments || 0}</Text>
          </View>
          <Text style={styles.cardTitle}>Dokumente ausstehend</Text>
          <Text style={styles.cardDesc}>Müssen analysiert werden</Text>
        </TouchableOpacity>

        {/* Messages */}
        <TouchableOpacity style={[styles.card, styles.greenCard]}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardIcon}>💬</Text>
            <Text style={styles.cardCount}>{stats?.unreadMessages || 0}</Text>
          </View>
          <Text style={styles.cardTitle}>Ungelesene Nachrichten</Text>
          <Text style={styles.cardDesc}>Von Beratern und System</Text>
        </TouchableOpacity>
      </View>

      {/* Next Deadline */}
      {stats?.nextDeadline && (
        <View style={styles.nextDeadline}>
          <Text style={styles.nextTitle}>⏰ Nächste Frist</Text>
          <View style={styles.nextContent}>
            <View>
              <Text style={styles.nextName}>{stats.nextDeadline.title}</Text>
              <Text style={styles.nextDate}>
                Fällig am: {new Date(stats.nextDeadline.dueDate).toLocaleDateString('de-DE')}
              </Text>
            </View>
            <View style={styles.nextDays}>
              <Text style={styles.daysText}>Noch</Text>
              <Text style={styles.daysCount}>{stats.nextDeadline.daysLeft}</Text>
              <Text style={styles.daysText}>Tage</Text>
            </View>
          </View>
        </View>
      )}

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <Text style={styles.sectionTitle}>⚡ Schnellaktionen</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity style={styles.actionCard}>
            <Text style={styles.actionIcon}>📤</Text>
            <Text>Dokument hochladen</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionCard}>
            <Text style={styles.actionIcon}>➕</Text>
            <Text>Neue Frist</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionCard}>
            <Text style={styles.actionIcon}>📞</Text>
            <Text>Beratung buchen</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionCard}>
            <Text style={styles.actionIcon}>📰</Text>
            <Text>Steuer-Updates</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f9fafb' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { fontSize: 16, fontWeight: '600', color: '#1F2937' },

  title: { fontSize: 28, fontWeight: '700', marginBottom: 16, color: '#111827' },

  grid: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  card: { flex: 1, borderRadius: 16, padding: 16, marginHorizontal: 4, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5, shadowOffset: { width: 0, height: 2 } },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  cardIcon: { fontSize: 24 },
  cardCount: { fontSize: 24, fontWeight: '700' },
  cardTitle: { fontSize: 16, fontWeight: '600', marginBottom: 4 },
  cardDesc: { fontSize: 12, color: '#4B5563' },

  blueCard: { backgroundColor: '#DBEAFE' },
  yellowCard: { backgroundColor: '#FEF9C3' },
  greenCard: { backgroundColor: '#DCFCE7' },

  nextDeadline: { padding: 16, borderRadius: 16, backgroundColor: '#E0F2FE', marginBottom: 16 },
  nextTitle: { fontSize: 18, fontWeight: '600', marginBottom: 8 },
  nextContent: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  nextName: { fontSize: 20, fontWeight: '700', marginBottom: 4 },
  nextDate: { fontSize: 14, color: '#4B5563' },
  nextDays: { alignItems: 'center' },
  daysText: { fontSize: 12, color: '#4B5563' },
  daysCount: { fontSize: 32, fontWeight: '700', color: '#3B82F6' },

  quickActions: { marginTop: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '600', marginBottom: 8 },
  actionsGrid: { flexDirection: 'row', justifyContent: 'space-between' },
  actionCard: { flex: 1, alignItems: 'center', padding: 12, marginHorizontal: 4, borderRadius: 16, backgroundColor: '#F3F4F6', shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5, shadowOffset: { width: 0, height: 2 } },
  actionIcon: { fontSize: 28, marginBottom: 4 },
});