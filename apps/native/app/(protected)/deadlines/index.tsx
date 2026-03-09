// apps/native/app/(protected)/calendar/index.tsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  ActivityIndicator,
  Alert,
  RefreshControl,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  time?: string;
  contactName: string;
  contactEmail: string;
  contactPhone?: string;
  description?: string;
  comments?: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  type: 'consultation' | 'deadline' | 'meeting' | 'reminder';
  emailConfirmed: boolean;
  createdAt: string;
}

export default function CalendarScreen() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null);
  const [filterType, setFilterType] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterModalVisible, setFilterModalVisible] = useState(false);

  // Form state
  const [formData, setFormData] = useState<Partial<CalendarEvent>>({
    title: '',
    date: new Date().toISOString().split('T')[0],
    time: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    description: '',
    comments: '',
    status: 'pending',
    type: 'consultation',
    emailConfirmed: false,
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await fetch('http://localhost:3001/api/calendar/user-123');
      const data = await res.json();
      setEvents(data);
    } catch (error) {
      console.error('Failed to fetch calendar events:', error);
      Alert.alert('Error', 'Failed to load calendar events');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchEvents();
  };

  const handleInputChange = (name: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    if (!formData.title || !formData.date || !formData.contactName || !formData.contactEmail) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    try {
      const url = editingEvent
        ? `http://localhost:3001/api/calendar/${editingEvent.id}`
        : 'http://localhost:3001/api/calendar/user-123';

      const method = editingEvent ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        fetchEvents();
        resetForm();
        setModalVisible(false);
      }
    } catch (error) {
      console.error('Failed to save event:', error);
      Alert.alert('Error', 'Failed to save event');
    }
  };

  const handleDelete = (id: string) => {
    Alert.alert(
      'Delete Event',
      'Are you sure you want to delete this event?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              const res = await fetch(`http://localhost:3001/api/calendar/${id}`, {
                method: 'DELETE'
              });

              if (res.ok) {
                fetchEvents();
              }
            } catch (error) {
              console.error('Failed to delete event:', error);
              Alert.alert('Error', 'Failed to delete event');
            }
          }
        }
      ]
    );
  };

  const handleSendConfirmation = async (event: CalendarEvent) => {
    try {
      const res = await fetch(`http://localhost:3001/api/calendar/${event.id}/confirm`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: event.contactEmail })
      });

      if (res.ok) {
        Alert.alert('Success', `Confirmation email sent to ${event.contactEmail}`);
        fetchEvents();
      }
    } catch (error) {
      console.error('Failed to send confirmation:', error);
      Alert.alert('Error', 'Failed to send confirmation email');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      date: new Date().toISOString().split('T')[0],
      time: '',
      contactName: '',
      contactEmail: '',
      contactPhone: '',
      description: '',
      comments: '',
      status: 'pending',
      type: 'consultation',
      emailConfirmed: false,
    });
    setEditingEvent(null);
  };

  const openEditModal = (event: CalendarEvent) => {
    setFormData(event);
    setEditingEvent(event);
    setModalVisible(true);
  };

  const openCreateModal = () => {
    resetForm();
    setModalVisible(true);
  };

  // Filter and search events
  const filteredEvents = events.filter(event => {
    const matchesFilter = filterType === 'all' || event.type === filterType;
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.contactName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.contactEmail.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Group events by date
  const eventsByDate = filteredEvents.reduce((acc, event) => {
    const date = event.date;
    if (!acc[date]) acc[date] = [];
    acc[date].push(event);
    return acc;
  }, {} as Record<string, CalendarEvent[]>);

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'confirmed':
        return styles.statusConfirmed;
      case 'pending':
        return styles.statusPending;
      case 'cancelled':
        return styles.statusCancelled;
      case 'completed':
        return styles.statusCompleted;
      default:
        return styles.statusDefault;
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

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'consultation': return '👥';
      case 'deadline': return '⏰';
      case 'meeting': return '🤝';
      case 'reminder': return '🔔';
      default: return '📅';
    }
  };

  const filterOptions = [
    { label: 'All Types', value: 'all' },
    { label: 'Consultations', value: 'consultation' },
    { label: 'Deadlines', value: 'deadline' },
    { label: 'Meetings', value: 'meeting' },
    { label: 'Reminders', value: 'reminder' },
  ];

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
          <View style={styles.header}>
            <Text style={styles.headerTitle}>
              📅 Calendar & Appointments
            </Text>
            <TouchableOpacity
              onPress={openCreateModal}
              style={styles.newButton}
            >
              <Text style={styles.newButtonText}>+ New</Text>
            </TouchableOpacity>
          </View>

          {/* Search and Filter */}
          <View style={styles.searchContainer}>
            <View style={styles.searchRow}>
              <View style={styles.searchInputContainer}>
                <TextInput
                  placeholder="Search..."
                  value={searchTerm}
                  onChangeText={setSearchTerm}
                  style={styles.searchInput}
                  placeholderTextColor="#9ca3af"
                />
              </View>
              <TouchableOpacity
                onPress={() => setFilterModalVisible(true)}
                style={styles.filterButton}
              >
                <Text style={styles.filterButtonText}>Filter</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Events List */}
          <View>
            {Object.keys(eventsByDate).sort().map(date => (
              <View key={date} style={styles.dateGroup}>
                {/* Date Header */}
                <View style={styles.dateHeader}>
                  <Text style={styles.dateHeaderText}>
                    {new Date(date).toLocaleDateString('de-DE', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </Text>
                </View>

                {/* Events */}
                {eventsByDate[date].map(event => (
                  <View key={event.id} style={styles.eventCard}>
                    <View>
                      {/* Event Header */}
                      <View style={styles.eventHeader}>
                        <View style={styles.eventTitleContainer}>
                          <Text style={styles.eventTypeIcon}>{getTypeIcon(event.type)}</Text>
                          <Text style={styles.eventTitle}>
                            {event.title}
                          </Text>
                        </View>
                        <View style={styles.eventActions}>
                          <TouchableOpacity
                            onPress={() => openEditModal(event)}
                            style={styles.editButton}
                          >
                            <Text>✏️</Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={() => handleDelete(event.id)}
                            style={styles.deleteButton}
                          >
                            <Text>🗑️</Text>
                          </TouchableOpacity>
                        </View>
                      </View>

                      {/* Status Badges */}
                      <View style={styles.badgesContainer}>
                        <View style={[styles.statusBadge, getStatusStyle(event.status)]}>
                          <Text style={[styles.statusText, getStatusTextStyle(event.status)]}>
                            {event.status}
                          </Text>
                        </View>
                        {event.emailConfirmed && (
                          <View style={styles.emailConfirmedBadge}>
                            <Text style={styles.emailConfirmedText}>
                              ✓ Email Confirmed
                            </Text>
                          </View>
                        )}
                      </View>

                      {/* Time */}
                      {event.time && (
                        <Text style={styles.eventTime}>
                          ⏰ {event.time} Uhr
                        </Text>
                      )}

                      {/* Contact Info */}
                      <View style={styles.contactInfo}>
                        <Text style={styles.contactLabel}>Contact</Text>
                        <Text style={styles.contactName}>{event.contactName}</Text>
                        <Text style={styles.contactEmail}>{event.contactEmail}</Text>
                        {event.contactPhone && (
                          <Text style={styles.contactPhone}>📞 {event.contactPhone}</Text>
                        )}
                        
                        {event.description && (
                          <View style={styles.descriptionContainer}>
                            <Text style={styles.descriptionLabel}>Description</Text>
                            <Text style={styles.descriptionText}>{event.description}</Text>
                          </View>
                        )}
                        
                        {event.comments && (
                          <View style={styles.commentsContainer}>
                            <Text style={styles.commentsLabel}>Internal Comments</Text>
                            <Text style={styles.commentsText}>{event.comments}</Text>
                          </View>
                        )}
                      </View>

                      {/* Actions */}
                      {!event.emailConfirmed && (
                        <TouchableOpacity
                          onPress={() => handleSendConfirmation(event)}
                          style={styles.confirmButton}
                        >
                          <Text style={styles.confirmButtonText}>✉️ Send Confirmation</Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  </View>
                ))}
              </View>
            ))}

            {/* Empty State */}
            {Object.keys(eventsByDate).length === 0 && (
              <View style={styles.emptyState}>
                <Text style={styles.emptyStateIcon}>📅</Text>
                <Text style={styles.emptyStateTitle}>
                  No events found
                </Text>
                <Text style={styles.emptyStateText}>
                  {searchTerm || filterType !== 'all'
                    ? 'Try adjusting your filters or search terms'
                    : 'Create your first event to get started'}
                </Text>
                <TouchableOpacity
                  onPress={openCreateModal}
                  style={styles.emptyStateButton}
                >
                  <Text style={styles.emptyStateButtonText}>Create New Event</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </ScrollView>

      {/* Create/Edit Event Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
          resetForm();
        }}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {editingEvent ? 'Edit Event' : 'Create New Event'}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(false);
                  resetForm();
                }}
              >
                <Text style={styles.modalClose}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView>
              <View>
                {/* Basic Information */}
                <View>
                  <Text style={styles.sectionTitle}>
                    Event Details
                  </Text>

                  <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Title *</Text>
                    <TextInput
                      value={formData.title}
                      onChangeText={(value) => handleInputChange('title', value)}
                      style={styles.input}
                      placeholder="Event title"
                    />
                  </View>

                  <View style={styles.rowInputs}>
                    <View style={styles.halfInput}>
                      <Text style={styles.inputLabel}>Date *</Text>
                      <TextInput
                        value={formData.date}
                        onChangeText={(value) => handleInputChange('date', value)}
                        style={styles.input}
                        placeholder="YYYY-MM-DD"
                      />
                    </View>
                    <View style={styles.halfInput}>
                      <Text style={styles.inputLabel}>Time</Text>
                      <TextInput
                        value={formData.time}
                        onChangeText={(value) => handleInputChange('time', value)}
                        style={styles.input}
                        placeholder="HH:MM"
                      />
                    </View>
                  </View>

                  <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Type</Text>
                    <View style={styles.optionsContainer}>
                      {['consultation', 'deadline', 'meeting', 'reminder'].map((type) => (
                        <TouchableOpacity
                          key={type}
                          onPress={() => handleInputChange('type', type)}
                          style={[
                            styles.optionButton,
                            formData.type === type && styles.optionButtonActive
                          ]}
                        >
                          <Text style={[
                            styles.optionButtonText,
                            formData.type === type && styles.optionButtonTextActive
                          ]}>
                            {type}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>

                  <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Status</Text>
                    <View style={styles.optionsContainer}>
                      {['pending', 'confirmed', 'cancelled', 'completed'].map((status) => (
                        <TouchableOpacity
                          key={status}
                          onPress={() => handleInputChange('status', status)}
                          style={[
                            styles.optionButton,
                            formData.status === status && styles.optionButtonActive
                          ]}
                        >
                          <Text style={[
                            styles.optionButtonText,
                            formData.status === status && styles.optionButtonTextActive
                          ]}>
                            {status}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>

                  <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Description</Text>
                    <TextInput
                      value={formData.description}
                      onChangeText={(value) => handleInputChange('description', value)}
                      style={[styles.input, styles.textArea]}
                      multiline
                      numberOfLines={3}
                      textAlignVertical="top"
                    />
                  </View>

                  <Text style={styles.sectionTitle}>
                    Contact Details
                  </Text>

                  <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Contact Name *</Text>
                    <TextInput
                      value={formData.contactName}
                      onChangeText={(value) => handleInputChange('contactName', value)}
                      style={styles.input}
                      placeholder="Full name"
                    />
                  </View>

                  <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Email *</Text>
                    <TextInput
                      value={formData.contactEmail}
                      onChangeText={(value) => handleInputChange('contactEmail', value)}
                      style={styles.input}
                      placeholder="email@example.com"
                      keyboardType="email-address"
                      autoCapitalize="none"
                    />
                  </View>

                  <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Phone</Text>
                    <TextInput
                      value={formData.contactPhone}
                      onChangeText={(value) => handleInputChange('contactPhone', value)}
                      style={styles.input}
                      placeholder="Phone number"
                      keyboardType="phone-pad"
                    />
                  </View>

                  <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Internal Comments</Text>
                    <TextInput
                      value={formData.comments}
                      onChangeText={(value) => handleInputChange('comments', value)}
                      style={[styles.input, styles.textArea]}
                      multiline
                      numberOfLines={3}
                      textAlignVertical="top"
                      placeholder="Internal notes, special requirements, etc."
                    />
                  </View>

                  <TouchableOpacity
                    onPress={() => handleInputChange('emailConfirmed', !formData.emailConfirmed)}
                    style={styles.checkboxContainer}
                  >
                    <View style={[
                      styles.checkbox,
                      formData.emailConfirmed && styles.checkboxChecked
                    ]}>
                      {formData.emailConfirmed && <Text style={styles.checkboxCheck}>✓</Text>}
                    </View>
                    <Text style={styles.checkboxLabel}>Mark as email confirmed</Text>
                  </TouchableOpacity>
                </View>

                {/* Form Actions */}
                <View style={styles.modalActions}>
                  <TouchableOpacity
                    onPress={() => {
                      setModalVisible(false);
                      resetForm();
                    }}
                    style={styles.cancelButton}
                  >
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={handleSubmit}
                    style={styles.submitButton}
                  >
                    <Text style={styles.submitButtonText}>
                      {editingEvent ? 'Update' : 'Create'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Filter Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={filterModalVisible}
        onRequestClose={() => setFilterModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.filterModalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Filter Events</Text>
              <TouchableOpacity onPress={() => setFilterModalVisible(false)}>
                <Text style={styles.modalClose}>✕</Text>
              </TouchableOpacity>
            </View>

            {filterOptions.map((option) => (
              <TouchableOpacity
                key={option.value}
                onPress={() => {
                  setFilterType(option.value);
                  setFilterModalVisible(false);
                }}
                style={[
                  styles.filterOption,
                  filterType === option.value && styles.filterOptionActive
                ]}
              >
                <Text
                  style={[
                    styles.filterOptionText,
                    filterType === option.value && styles.filterOptionTextActive
                  ]}
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}

            <TouchableOpacity
              onPress={() => {
                setFilterType('all');
                setFilterModalVisible(false);
              }}
              style={styles.clearFilterButton}
            >
              <Text style={styles.clearFilterText}>Clear Filter</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#111827',
  },
  newButton: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  newButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  searchContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    padding: 16,
    marginBottom: 24,
  },
  searchRow: {
    flexDirection: 'row',
    gap: 8,
  },
  searchInputContainer: {
    flex: 1,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontSize: 16,
  },
  filterButton: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  filterButtonText: {
    color: '#374151',
  },
  dateGroup: {
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    overflow: 'hidden',
    marginBottom: 24,
  },
  dateHeader: {
    backgroundColor: '#f9fafb',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  dateHeaderText: {
    fontWeight: '600',
    color: '#111827',
  },
  eventCard: {
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  eventHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  eventTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    flex: 1,
  },
  eventTypeIcon: {
    fontSize: 24,
    marginRight: 8,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    flex: 1,
  },
  eventActions: {
    flexDirection: 'row',
    gap: 8,
  },
  editButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#eff6ff',
    borderRadius: 4,
  },
  deleteButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#fef2f2',
    borderRadius: 4,
  },
  badgesContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
  },
  statusConfirmed: {
    backgroundColor: '#dcfce7',
    borderColor: '#bbf7d0',
  },
  statusPending: {
    backgroundColor: '#fef9c3',
    borderColor: '#fef08a',
  },
  statusCancelled: {
    backgroundColor: '#fee2e2',
    borderColor: '#fecaca',
  },
  statusCompleted: {
    backgroundColor: '#dbeafe',
    borderColor: '#bfdbfe',
  },
  statusDefault: {
    backgroundColor: '#f3f4f6',
    borderColor: '#e5e7eb',
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
  emailConfirmedBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#dcfce7',
    borderRadius: 999,
  },
  emailConfirmedText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#166534',
  },
  eventTime: {
    fontSize: 14,
    color: '#4b5563',
    marginBottom: 8,
  },
  contactInfo: {
    backgroundColor: '#f9fafb',
    padding: 12,
    borderRadius: 8,
  },
  contactLabel: {
    fontSize: 12,
    color: '#6b7280',
  },
  contactName: {
    fontSize: 14,
    fontWeight: '500',
  },
  contactEmail: {
    fontSize: 14,
    color: '#4b5563',
  },
  contactPhone: {
    fontSize: 14,
    color: '#4b5563',
  },
  descriptionContainer: {
    marginTop: 8,
  },
  descriptionLabel: {
    fontSize: 12,
    color: '#6b7280',
  },
  descriptionText: {
    fontSize: 14,
    color: '#374151',
  },
  commentsContainer: {
    marginTop: 8,
  },
  commentsLabel: {
    fontSize: 12,
    color: '#6b7280',
  },
  commentsText: {
    fontSize: 14,
    color: '#374151',
    fontStyle: 'italic',
  },
  confirmButton: {
    marginTop: 12,
    backgroundColor: '#f0fdf4',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmButtonText: {
    color: '#15803d',
  },
  emptyState: {
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    padding: 48,
    alignItems: 'center',
  },
  emptyStateIcon: {
    fontSize: 60,
    marginBottom: 16,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  emptyStateText: {
    color: '#4b5563',
    textAlign: 'center',
    marginBottom: 24,
  },
  emptyStateButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: '#2563eb',
    borderRadius: 8,
  },
  emptyStateButtonText: {
    color: 'white',
    fontWeight: '500',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    maxHeight: '90%',
  },
  filterModalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  modalClose: {
    fontSize: 24,
  },
  sectionTitle: {
    fontWeight: '500',
    color: '#374151',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    paddingBottom: 8,
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  rowInputs: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  halfInput: {
    flex: 1,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  optionButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  optionButtonActive: {
    backgroundColor: '#3b82f6',
    borderColor: '#3b82f6',
  },
  optionButtonText: {
    color: '#374151',
  },
  optionButtonTextActive: {
    color: 'white',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 24,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#d1d5db',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#3b82f6',
    borderColor: '#3b82f6',
  },
  checkboxCheck: {
    color: 'white',
    fontSize: 12,
  },
  checkboxLabel: {
    fontSize: 14,
    color: '#374151',
  },
  modalActions: {
    flexDirection: 'row',
    gap: 8,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  cancelButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#374151',
    fontWeight: '500',
  },
  submitButton: {
    flex: 1,
    backgroundColor: '#2563eb',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontWeight: '500',
  },
  filterOption: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  filterOptionActive: {
    backgroundColor: '#eff6ff',
  },
  filterOptionText: {
    fontSize: 16,
    color: '#374151',
  },
  filterOptionTextActive: {
    color: '#2563eb',
    fontWeight: '500',
  },
  clearFilterButton: {
    marginTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    paddingTop: 16,
    alignItems: 'center',
  },
  clearFilterText: {
    color: '#2563eb',
    fontWeight: '500',
  },
});