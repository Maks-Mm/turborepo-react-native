// apps/native/app/(protected)/dashboard/index.tsx
"use client";
import { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { useRouter } from "expo-router";

const { width } = Dimensions.get('window');

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
  const router = useRouter();

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const res = await fetch("http://localhost:3001/api/dashboard/user-123");
      const data = await res.json();
      setStats(data);
    } catch (error) {
      console.error("Failed to fetch dashboard stats:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <View style={styles.spinner} />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.title}>📊 Dashboard</Text>

      {/* Stats Grid */}
      <View style={styles.grid}>
        <TouchableOpacity
          style={[styles.card, styles.blueCard]}
          onPress={() => router.push("/deadlines")}
          activeOpacity={0.7}
        >
          <View style={styles.cardHeader}>
            <View style={[styles.iconContainer, styles.blueIconBg]}>
              <Text style={styles.cardIcon}>📅</Text>
            </View>
            <Text style={[styles.cardCount, styles.blueText]}>{stats?.openDeadlines || 0}</Text>
          </View>
          <Text style={styles.cardTitle}>Offene Fristen</Text>
          <Text style={styles.cardDesc}>Deadlines die bearbeitet werden müssen</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.card, styles.yellowCard]}
          onPress={() => router.push("/documents")}
          activeOpacity={0.7}
        >
          <View style={styles.cardHeader}>
            <View style={[styles.iconContainer, styles.yellowIconBg]}>
              <Text style={styles.cardIcon}>📎</Text>
            </View>
            <Text style={[styles.cardCount, styles.yellowText]}>{stats?.pendingDocuments || 0}</Text>
          </View>
          <Text style={styles.cardTitle}>Dokumente ausstehend</Text>
          <Text style={styles.cardDesc}>Müssen analysiert werden</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.card, styles.greenCard]}
          onPress={() => router.push("/messages")}
          activeOpacity={0.7}
        >
          <View style={styles.cardHeader}>
            <View style={[styles.iconContainer, styles.greenIconBg]}>
              <Text style={styles.cardIcon}>💬</Text>
            </View>
            <Text style={[styles.cardCount, styles.greenText]}>{stats?.unreadMessages || 0}</Text>
          </View>
          <Text style={styles.cardTitle}>Ungelesene Nachrichten</Text>
          <Text style={styles.cardDesc}>Von Beratern und System</Text>
        </TouchableOpacity>
      </View>

      {/* Next Deadline */}
      {stats?.nextDeadline && (
        <View style={styles.nextDeadline}>
          <View style={styles.nextContent}>
            <View style={styles.nextInfo}>
              <Text style={styles.nextTitle}>{stats.nextDeadline.title}</Text>
              <Text style={styles.nextDate}>
                Fällig am: {new Date(stats.nextDeadline.dueDate).toLocaleDateString("de-DE")}
              </Text>
            </View>
            <View style={styles.nextDays}>
              <Text style={styles.daysLabel}>Noch</Text>
              <Text style={styles.daysCount}>{stats.nextDeadline.daysLeft}</Text>
              <Text style={styles.daysLabel}>Tage</Text>
            </View>
          </View>
        </View>
      )}

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <View style={styles.actionsGrid}>
          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => router.push("/documents")}
            activeOpacity={0.7}
          >
            <Text style={styles.actionIcon}>📤</Text>
            <Text style={styles.actionText}>Dokument hochladen</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => router.push("/deadlines")}
            activeOpacity={0.7}
          >
            <Text style={styles.actionIcon}>➕</Text>
            <Text style={styles.actionText}>Neue Frist</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => router.push("/consulting")}
            activeOpacity={0.7}
          >
            <Text style={styles.actionIcon}>📞</Text>
            <Text style={styles.actionText}>Beratung buchen</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => router.push("/updates")}
            activeOpacity={0.7}
          >
            <Text style={styles.actionIcon}>📰</Text>
            <Text style={styles.actionText}>Steuer-Updates</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },
  contentContainer: {
    padding: 24,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9fafb",
  },
  spinner: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 3,
    borderColor: "#3B82F6",
    borderTopColor: "transparent",
  },
  title: {
    fontSize: 30,
    fontWeight: "700",
    marginBottom: 32,
    color: "#111827",
  },

  // Stats Grid
  grid: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 32,
  },
  card: {
    flex: 1,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: "#F3F4F6",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  blueIconBg: {
    backgroundColor: "#BFDBFE",
  },
  yellowIconBg: {
    backgroundColor: "#FEF08A",
  },
  greenIconBg: {
    backgroundColor: "#BBF7D0",
  },
  cardIcon: {
    fontSize: 24,
  },
  cardCount: {
    fontSize: 30,
    fontWeight: "700",
  },
  blueText: {
    color: "#2563EB",
  },
  yellowText: {
    color: "#CA8A04",
  },
  greenText: {
    color: "#16A34A",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 4,
  },
  cardDesc: {
    fontSize: 14,
    color: "#6B7280",
    lineHeight: 20,
  },
  blueCard: {
    backgroundColor: "#DBEAFE",
    borderColor: "#F3F4F6",
  },
  yellowCard: {
    backgroundColor: "#FEF9C3",
    borderColor: "#F3F4F6",
  },
  greenCard: {
    backgroundColor: "#DCFCE7",
    borderColor: "#F3F4F6",
  },

  // Next Deadline
  nextDeadline: {
    backgroundColor: "#EFF6FF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#DBEAFE",
    padding: 24,
    marginBottom: 32,
  },
  nextContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 16,
  },
  nextInfo: {
    flex: 1,
  },
  nextTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 4,
  },
  nextDate: {
    fontSize: 16,
    color: "#6B7280",
    marginTop: 2,
  },
  nextDays: {
    alignItems: "center",
    minWidth: 80,
  },
  daysLabel: {
    fontSize: 14,
    color: "#6B7280",
  },
  daysCount: {
    fontSize: 36,
    fontWeight: "700",
    color: "#2563EB",
    lineHeight: 44,
  },

  // Quick Actions
  quickActions: {
    marginTop: 8,
  },
  actionsGrid: {
    flexDirection: "row",
    gap: 12,
  },
  actionCard: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    padding: 16,
    borderRadius: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  actionIcon: {
    fontSize: 28,
    marginBottom: 8,
  },
  actionText: {
    fontSize: 13,
    fontWeight: "500",
    color: "#1F2937",
    textAlign: "center",
  },
});