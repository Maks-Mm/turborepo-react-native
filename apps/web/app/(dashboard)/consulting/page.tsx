// apps/web/app/(dashboard)/consulting/page.tsx

'use client';

import { useEffect, useState, useCallback } from 'react';
import type { Booking } from '@repo/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

async function fetchBookings(userId: string): Promise<Booking[]> {
  const response = await fetch(`${API_BASE_URL}/api/consulting/${userId}`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
}

export default function ConsultingPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadBookings = useCallback(async () => {
    try {
      setError(null);
      const data = await fetchBookings("user-123");
      setBookings(data);
    } catch (error) {
      console.error('Failed to fetch bookings:', error);
      setError('Failed to load bookings. Make sure the API server is running on port 3001');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadBookings();
  }, [loadBookings]);

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'confirmed':
        return { bg: 'bg-green-100', text: 'text-green-800', icon: '✅' };
      case 'pending':
        return { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: '⏰' };
      case 'cancelled':
        return { bg: 'bg-red-100', text: 'text-red-800', icon: '❌' };
      case 'completed':
        return { bg: 'bg-blue-100', text: 'text-blue-800', icon: '✓✓' };
      default:
        return { bg: 'bg-gray-100', text: 'text-gray-800', icon: 'ℹ️' };
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

  const stats = {
    total: bookings.length,
    confirmed: bookings.filter(b => b.status === 'confirmed').length,
    pending: bookings.filter(b => b.status === 'pending').length,
    completed: bookings.filter(b => b.status === 'completed').length,
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading consulting bookings...</p>
          <p className="text-slate-400 text-sm mt-2">Fetching from API at {API_BASE_URL}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-xl shadow-sm border border-red-200 p-6 max-w-md">
          <div className="text-center">
            <div className="text-red-500 text-5xl mb-4">⚠️</div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Connection Error</h3>
            <p className="text-slate-600 mb-4">{error}</p>
            <button
              onClick={loadBookings}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Retry Connection
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-3xl">📞</span>
            <h1 className="text-3xl font-bold text-slate-900">Consulting Bookings</h1>
            <div className="bg-blue-50 px-3 py-1.5 rounded-full">
              <span className="text-xs font-semibold text-blue-800 flex items-center gap-1">
                <i className="fas fa-database"></i> Backend Source of Truth
              </span>
            </div>
          </div>
          <button
            onClick={() => alert('Booking feature coming soon')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-full font-semibold text-sm shadow-sm transition flex items-center gap-2 w-fit"
          >
            <i className="fas fa-plus-circle"></i> Book New Consultation
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
            <div className="text-sm text-slate-600">Total Bookings</div>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <div className="text-2xl font-bold text-green-600">{stats.confirmed}</div>
            <div className="text-sm text-slate-600">Confirmed</div>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
            <div className="text-sm text-slate-600">Pending</div>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <div className="text-2xl font-bold text-blue-600">{stats.completed}</div>
            <div className="text-sm text-slate-600">Completed</div>
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm mb-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50/80 border-b border-slate-200">
                <tr>
                  <th className="px-5 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider w-[20%]">
                    Consultant
                  </th>
                  <th className="px-5 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider w-[24%]">
                    Date & Time
                  </th>
                  <th className="px-5 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider w-[28%]">
                    <i className="fas fa-location-dot mr-1"></i> Location
                  </th>
                  <th className="px-5 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider w-[14%]">
                    Status
                  </th>
                  <th className="px-5 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider w-[14%]">
                    Notes
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {bookings.map((booking) => {
                  const statusConfig = getStatusConfig(booking.status);
                  return (
                    <tr
                      key={booking.id}
                      onClick={() => {
                        alert(
                          `Booking Details\n\n` +
                          `Consultant: ${booking.consultantName}\n` +
                          `Date: ${formatDate(booking.date)}\n` +
                          `Status: ${booking.status}\n` +
                          `Location: ${booking.address?.fullAddress || 'No address'}\n` +
                          `Notes: ${booking.notes || 'No notes'}`
                        );
                      }}
                      className="hover:bg-amber-50/30 cursor-pointer transition"
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <i className="fas fa-user-md text-blue-600 text-sm"></i>
                          <span className="font-medium text-slate-900">{booking.consultantName}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-slate-700">
                        <i className="far fa-calendar-alt text-slate-400 mr-2"></i>
                        {formatDate(booking.date)}
                      </td>
                      <td className="px-5 py-4">
                        {booking.address?.fullAddress ? (
                          <a
                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(booking.address.fullAddress)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-2 bg-slate-50 hover:bg-blue-50 px-3 py-1.5 rounded-full text-sm font-medium text-slate-700 hover:text-blue-700 border border-slate-200 hover:border-blue-200 transition no-underline"
                          >
                            <i className="fas fa-map-pin text-blue-500 text-xs"></i>
                            <span className="truncate max-w-[200px] md:max-w-[280px]">
                              {booking.address.fullAddress}
                            </span>
                            <i className="fas fa-external-link-alt text-slate-400 text-xs"></i>
                          </a>
                        ) : (
                          <span className="text-slate-400 text-sm">— No address</span>
                        )}
                      </td>
                      <td className="px-5 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${statusConfig.bg} ${statusConfig.text}`}>
                          <span>{statusConfig.icon}</span>
                          {booking.status}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1.5 text-slate-600">
                          <i className="far fa-sticky-note text-slate-400 text-sm"></i>
                          <span className="text-sm truncate max-w-[150px]">
                            {booking.notes || '—'}
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
                {bookings.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-5 py-16 text-center text-slate-500">
                      <i className="fas fa-calendar-times text-3xl mb-3 block"></i>
                      No consulting bookings found.
                      <div className="text-sm mt-2">Pull to refresh or book a new consultation</div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Info Note */}
        <div className="bg-blue-50/50 border-l-4 border-blue-600 p-4 rounded-xl flex gap-3">
          <i className="fas fa-check-circle text-blue-600 text-lg mt-0.5"></i>
          <div>
            <p className="font-semibold text-slate-800 text-sm mb-1">
              Production-aligned · Single source of truth
            </p>
            <p className="text-xs text-slate-600">
              Backend returns <code className="bg-slate-200 px-1.5 py-0.5 rounded text-xs">address.fullAddress</code> directly.
              No Google API, no geospatial logic, no client-side maps SDK. Click address → opens Google Maps in new tab.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 