// apps/web/app/(dashboard)/calendar/page.tsx
'use client';

import { useEffect, useState } from 'react';
//import Link from 'next/link';

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

export default function CalendarPage() {

  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);
 // const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0]
 // );
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null);
  const [filterType, setFilterType] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Form state for new/edit event
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
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
      }
    } catch (error) {
      console.error('Failed to save event:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this event?')) return;
    
    try {
      const res = await fetch(`http://localhost:3001/api/calendar/${id}`, {
        method: 'DELETE'
      });

      if (res.ok) {
        fetchEvents();
      }
    } catch (error) {
      console.error('Failed to delete event:', error);
    }
  };

  const handleSendConfirmation = async (event: CalendarEvent) => {
    try {
      const res = await fetch(`http://localhost:3001/api/calendar/${event.id}/confirm`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: event.contactEmail })
      });

      if (res.ok) {
        alert(`Confirmation email sent to ${event.contactEmail}`);
        fetchEvents(); // Refresh to update confirmation status
      }
    } catch (error) {
      console.error('Failed to send confirmation:', error);
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
    setShowForm(false);
  };

  const editEvent = (event: CalendarEvent) => {
    setFormData(event);
    setEditingEvent(event);
    setShowForm(true);
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      case 'completed': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
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

  if (loading) {
    return (
      <div className="p-8 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">📅 Calendar & Appointments</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
        >
          <span>{showForm ? '✕' : '+'}</span>
          <span>{showForm ? 'Close' : 'New Event'}</span>
        </button>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">
            {editingEvent ? 'Edit Event' : 'Create New Event'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="font-medium text-gray-700 border-b pb-2">Event Details</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date *</label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      required
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                    <input
                      type="time"
                      name="time"
                      value={formData.time}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="consultation">Consultation</option>
                    <option value="deadline">Deadline</option>
                    <option value="meeting">Meeting</option>
                    <option value="reminder">Reminder</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="cancelled">Cancelled</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-4">
                <h3 className="font-medium text-gray-700 border-b pb-2">Contact Details</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Contact Name *</label>
                  <input
                    type="text"
                    name="contactName"
                    value={formData.contactName}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <input
                    type="email"
                    name="contactEmail"
                    value={formData.contactEmail}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    name="contactPhone"
                    value={formData.contactPhone}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Internal Comments</label>
                  <textarea
                    name="comments"
                    value={formData.comments}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    placeholder="Internal notes, special requirements, etc."
                  />
                </div>

                <div className="flex items-center gap-2 mt-2">
                  <input
                    type="checkbox"
                    name="emailConfirmed"
                    checked={formData.emailConfirmed}
                    onChange={handleInputChange}
                    id="emailConfirmed"
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="emailConfirmed" className="text-sm text-gray-700">
                    Mark as email confirmed
                  </label>
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end gap-2 pt-4 border-t">
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                {editingEvent ? 'Update Event' : 'Create Event'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Filters and Search */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6 shadow-sm">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search by title, contact name, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="w-full md:w-48">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Types</option>
              <option value="consultation">Consultations</option>
              <option value="deadline">Deadlines</option>
              <option value="meeting">Meetings</option>
              <option value="reminder">Reminders</option>
            </select>
          </div>
        </div>
      </div>

      {/* Calendar/Agenda View */}
      <div className="space-y-6">
        {Object.keys(eventsByDate).sort().map(date => (
          <div key={date} className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
            {/* Date Header */}
            <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
              <h3 className="font-semibold text-gray-900">
                {new Date(date).toLocaleDateString('de-DE', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </h3>
            </div>

            {/* Events for this date */}
            <div className="divide-y divide-gray-100">
              {eventsByDate[date].map(event => (
                <div key={event.id} className="p-6 hover:bg-gray-50 transition">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    {/* Event Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl">{getTypeIcon(event.type)}</span>
                        <h4 className="text-lg font-semibold text-gray-900">{event.title}</h4>
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(event.status)}`}>
                          {event.status}
                        </span>
                        {event.emailConfirmed && (
                          <span className="px-2 py-1 text-xs font-semibold bg-green-100 text-green-800 rounded-full">
                            ✓ Email Confirmed
                          </span>
                        )}
                      </div>

                      {event.time && (
                        <p className="text-sm text-gray-600 mb-2">
                          ⏰ {event.time} Uhr
                        </p>
                      )}

                      {/* Contact Information */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3 bg-gray-50 p-3 rounded-lg">
                        <div>
                          <p className="text-xs text-gray-500">Contact</p>
                          <p className="text-sm font-medium">{event.contactName}</p>
                          <p className="text-sm text-gray-600">{event.contactEmail}</p>
                          {event.contactPhone && (
                            <p className="text-sm text-gray-600">📞 {event.contactPhone}</p>
                          )}
                        </div>
                        
                        {event.description && (
                          <div>
                            <p className="text-xs text-gray-500">Description</p>
                            <p className="text-sm text-gray-700">{event.description}</p>
                          </div>
                        )}
                        
                        {event.comments && (
                          <div className="md:col-span-2">
                            <p className="text-xs text-gray-500">Internal Comments</p>
                            <p className="text-sm text-gray-700 italic">{event.comments}</p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-row md:flex-col gap-2">
                      {!event.emailConfirmed && (
                        <button
                          onClick={() => handleSendConfirmation(event)}
                          className="px-3 py-2 text-sm bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition flex items-center gap-1"
                          title="Send confirmation email"
                        >
                          <span>✉️</span>
                          <span className="hidden md:inline">Confirm</span>
                        </button>
                      )}
                      <button
                        onClick={() => editEvent(event)}
                        className="px-3 py-2 text-sm bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition flex items-center gap-1"
                      >
                        <span>✏️</span>
                        <span className="hidden md:inline">Edit</span>
                      </button>
                      <button
                        onClick={() => handleDelete(event.id)}
                        className="px-3 py-2 text-sm bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition flex items-center gap-1"
                      >
                        <span>🗑️</span>
                        <span className="hidden md:inline">Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {Object.keys(eventsByDate).length === 0 && (
          <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
            <p className="text-6xl mb-4">📅</p>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No events found</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || filterType !== 'all' 
                ? 'Try adjusting your filters or search terms'
                : 'Create your first event to get started'}
            </p>
            <button
              onClick={() => setShowForm(true)}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Create New Event
            </button>
          </div>
        )}
      </div>
    </div>
  );
}