// apps/native/app/(protected)/documents/index.tsx
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Linking, Alert } from 'react-native';
import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';

interface Document {
  id: string;
  type: string;
  status: 'pending' | 'analyzed' | 'error';
  fileUrl?: string;
  createdAt: string;
}

export default function DocumentsScreen() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const res = await fetch('http://localhost:3001/api/documents/user-123');
      const data = await res.json();
      setDocuments(data);
    } catch (error) {
      console.error('Failed to fetch documents:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'pending':
        return styles.statusPending;
      case 'analyzed':
        return styles.statusAnalyzed;
      case 'error':
        return styles.statusError;
      default:
        return styles.statusPending;
    }
  };

  const getStatusTextStyle = (status: string) => {
    switch (status) {
      case 'pending':
        return styles.statusTextPending;
      case 'analyzed':
        return styles.statusTextAnalyzed;
      case 'error':
        return styles.statusTextError;
      default:
        return styles.statusTextPending;
    }
  };

  const handleAnalyze = (docId: string) => {
    Alert.alert('Analyze Document', 'Analyze document: ' + docId);
  };

  const handleViewFile = async (fileUrl: string) => {
    const supported = await Linking.canOpenURL(fileUrl);
    if (supported) {
      await Linking.openURL(fileUrl);
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
      <Text style={styles.title}>📎 Documents</Text>

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <TouchableOpacity
          style={styles.uploadButton}
          onPress={() => router.push('/documents/upload')}
          activeOpacity={0.7}
        >
          <Text style={styles.uploadButtonText}>Upload New Document</Text>
        </TouchableOpacity>
      </View>

      {/* Documents Table */}
      <View style={styles.tableContainer}>
        {/* Table Header */}
        <View style={[styles.tableRow, styles.tableHeader]}>
          <Text style={[styles.tableHeaderCell, styles.typeCell]}>Type</Text>
          <Text style={[styles.tableHeaderCell, styles.statusCell]}>Status</Text>
          <Text style={[styles.tableHeaderCell, styles.dateCell]}>Uploaded At</Text>
          <Text style={[styles.tableHeaderCell, styles.actionsCell]}>Actions</Text>
        </View>

        {/* Table Body */}
        {documents.map((doc, index) => (
          <View 
            key={doc.id} 
            style={[
              styles.tableRow, 
              styles.tableBodyRow,
              index < documents.length - 1 && styles.tableRowBorder
            ]}
          >
            <Text style={[styles.tableCell, styles.typeCell]} numberOfLines={1}>
              {doc.type}
            </Text>
            
            {/* Status Cell - Using View for container, Text for the badge */}
            <View style={[styles.tableCellContainer, styles.statusCell]}>
              <View style={[styles.statusBadge, getStatusStyle(doc.status)]}>
                <Text style={[styles.statusText, getStatusTextStyle(doc.status)]}>
                  {doc.status}
                </Text>
              </View>
            </View>
            
            <Text style={[styles.tableCell, styles.dateCell]}>
              {new Date(doc.createdAt).toLocaleDateString('de-DE')}
            </Text>
            
            {/* Actions Cell */}
            <View style={[styles.tableCellContainer, styles.actionsCell]}>
              <View style={styles.actionsContainer}>
                {doc.fileUrl && (
                  <TouchableOpacity
                    onPress={() => handleViewFile(doc.fileUrl!)}
                    style={styles.actionButton}
                  >
                    <Text style={styles.viewAction}>View</Text>
                  </TouchableOpacity>
                )}
                <TouchableOpacity
                  onPress={() => handleAnalyze(doc.id)}
                  style={styles.actionButton}
                >
                  <Text style={styles.analyzeAction}>Analyze</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}

        {documents.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No documents found.</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    padding: 24,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  spinner: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 3,
    borderColor: '#3B82F6',
    borderTopColor: 'transparent',
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    marginBottom: 24,
    color: '#111827',
  },
  
  // Quick Actions
  quickActions: {
    marginBottom: 24,
  },
  uploadButton: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  uploadButtonText: {
    color: '#3B82F6',
    fontSize: 16,
    fontWeight: '600',
  },

  // Table
  tableContainer: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    overflow: 'hidden',
  },
  tableRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  tableHeader: {
    backgroundColor: '#F9FAFB',
  },
  tableBodyRow: {
    backgroundColor: '#fff',
  },
  tableRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  tableHeaderCell: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
    textTransform: 'uppercase',
  },
  tableCell: {
    fontSize: 14,
    color: '#111827',
  },
  // New style for View containers that need the same flex distribution as cells
  tableCellContainer: {
    justifyContent: 'center',
  },
  
  // Column widths
  typeCell: {
    flex: 2,
  },
  statusCell: {
    flex: 1.5,
  },
  dateCell: {
    flex: 1.5,
  },
  actionsCell: {
    flex: 2,
  },

  // Status badges
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 9999,
    alignSelf: 'flex-start',
  },
  statusPending: {
    backgroundColor: '#FEF3C7',
  },
  statusAnalyzed: {
    backgroundColor: '#DCFCE7',
  },
  statusError: {
    backgroundColor: '#FEE2E2',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  statusTextPending: {
    color: '#92400E',
  },
  statusTextAnalyzed: {
    color: '#166534',
  },
  statusTextError: {
    color: '#991B1B',
  },

  // Actions
  actionsContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  actionButton: {
    minWidth: 50,
  },
  viewAction: {
    color: '#3B82F6',
    fontSize: 14,
    fontWeight: '500',
  },
  analyzeAction: {
    color: '#16A34A',
    fontSize: 14,
    fontWeight: '500',
  },

  // Empty state
  emptyState: {
    padding: 24,
    alignItems: 'center',
  },
  emptyStateText: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
  },
});