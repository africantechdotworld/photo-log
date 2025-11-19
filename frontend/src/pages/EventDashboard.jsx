import { Link } from 'react-router-dom';
import { 
  PlusIcon, 
  QrCodeIcon, 
  PhotoIcon,
  CalendarIcon,
  EyeIcon,
  TrashIcon,
  ArrowDownTrayIcon,
  LinkIcon
} from '@heroicons/react/24/outline';
import { useState, useEffect } from 'react';
import { getEvents, deleteEvent } from '../services/api';

export default function EventDashboard() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showQrCode, setShowQrCode] = useState(null);
  const [deletingEventId, setDeletingEventId] = useState(null);
  useEffect(() => {
    fetchEvents();
  }, []);
  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await getEvents(1, 100);
      setEvents(response.events || []);
    } catch (err) {
      setError(err.message || 'Failed to load events. Please try again.');
      console.error('Error fetching events:', err);
    } finally {
      setLoading(false);
    }
  };
  const handleDelete = async (eventId) => {
    if (window.confirm('Are you sure you want to delete this event? This action cannot be undone.')) {
      try {
        setDeletingEventId(eventId);
        await deleteEvent(eventId);
        // Remove event from local state
        setEvents(events.filter(e => e.id !== eventId));
      } catch (err) {
        alert(err.message || 'Failed to delete event. Please try again.');
        console.error('Error deleting event:', err);
      } finally {
        setDeletingEventId(null);
      }
    }
  };
  const handleDownloadAll = (eventId) => {
    console.log('Download all photos for event:', eventId);
    // Handle download logic here
  };
  const handleCopyLink = (event) => {
    const link = event.share_link || `${window.location.origin}/event/${event.id}`;
    navigator.clipboard.writeText(link);
    // You could add a toast notification here
  };
  
  const getQRCodeUrl = (event) => {
    const link = event.share_link || `${window.location.origin}/event/${event.id}`;
    return `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(link)}`;
  };

  const totalPhotos = events.reduce((sum, event) => sum + (event.photo_count || 0), 0);
  const totalViews = 0; // View count not available in current API response

  return (
    <div className="min-h-screen bg-deep-green">
      <div className="px-4 py-4 mx-auto max-w-7xl sm:px-6 lg:px-8 sm:py-6 lg:py-12">
        <div className="overflow-hidden rounded-2xl bg-cream sm:rounded-3xl">
          {/* Header Navigation */}
          <nav className="px-4 py-3 border-b sm:px-6 sm:py-4 lg:px-12 lg:py-6 border-cream-dark/20">
            <div className="flex gap-2 justify-between items-center sm:gap-4">
              <Link to="/" className="flex-shrink-0 text-lg font-bold text-black sm:text-xl lg:text-2xl">
                PhotoLog
              </Link>
              <div className="flex gap-3 items-center sm:gap-4">
                <Link
                  to="/create-event"
                  className="hidden gap-2 items-center px-3 py-2 text-sm font-medium text-white rounded-xl transition-colors sm:flex sm:px-4 bg-deep-green sm:text-base hover:bg-deep-green-dark"
                >
                  <PlusIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>Create Event</span>
                </Link>
                <Link
                  to="/create-event"
                  className="p-2 text-white rounded-xl transition-colors sm:hidden bg-deep-green hover:bg-deep-green-dark"
                  title="Create Event"
                >
                  <PlusIcon className="w-5 h-5" />
                </Link>
                <Link
                  to="/signin"
                  className="px-2 text-xs font-medium text-black whitespace-nowrap transition-colors sm:text-sm lg:text-base hover:text-deep-green sm:px-0"
                >
                  Logout
                </Link>
              </div>
            </div>
          </nav>
          {/* Main Content */}
          <div className="px-4 py-8 sm:px-6 lg:px-12 sm:py-12 lg:py-16">
            {/* Header Section */}
            <div className="mb-8 sm:mb-10 lg:mb-12">
              <h1 className="mb-2 text-3xl font-bold text-black sm:text-4xl lg:text-5xl sm:mb-3">
                My Events
              </h1>
              <p className="text-base sm:text-lg text-black/70">
                Manage your photo galleries and events
              </p>
            </div>
            {/* Stats Overview */}
            <div className="grid grid-cols-1 gap-4 mb-8 sm:grid-cols-3 sm:gap-6 sm:mb-10 lg:mb-12">
              {/* Total Events */}
              <div className="p-4 bg-white rounded-xl border sm:p-6 sm:rounded-2xl border-black/5">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-xs font-medium sm:text-sm text-black/60">Total Events</p>
                    <p className="mt-1 text-2xl font-bold text-black sm:text-3xl">{events.length}</p>
                  </div>
                  <div className="p-2 rounded-lg sm:p-3 bg-deep-green/10">
                    <CalendarIcon className="w-6 h-6 sm:w-8 sm:h-8 text-deep-green" />
                  </div>
                </div>
              </div>
              {/* Total Photos */}
              <div className="p-4 bg-white rounded-xl border sm:p-6 sm:rounded-2xl border-black/5">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-xs font-medium sm:text-sm text-black/60">Total Photos</p>
                    <p className="mt-1 text-2xl font-bold text-black sm:text-3xl">{totalPhotos}</p>
                  </div>
                  <div className="p-2 rounded-lg sm:p-3 bg-emerald/10">
                    <PhotoIcon className="w-6 h-6 sm:w-8 sm:h-8 text-emerald" />
                  </div>
                </div>
              </div>
              {/* Active Events */}
              <div className="p-4 bg-white rounded-xl border sm:p-6 sm:rounded-2xl border-black/5">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-xs font-medium sm:text-sm text-black/60">Active Events</p>
                    <p className="mt-1 text-2xl font-bold text-black sm:text-3xl">
                      {events.filter(e => e.is_active && !e.is_archived).length}
                    </p>
                  </div>
                  <div className="p-2 rounded-lg sm:p-3 bg-deep-gold/10">
                    <EyeIcon className="w-6 h-6 sm:w-8 sm:h-8 text-deep-gold" />
                  </div>
                </div>
              </div>
            </div>
            {/* Error Message */}
            {error && (
              <div className="p-4 mb-6 bg-red-50 rounded-xl border border-red-200">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}
            {/* Loading State */}
            {loading ? (
              <div className="py-12 text-center bg-white rounded-xl border sm:py-16 lg:py-20 sm:rounded-2xl border-black/5">
                <div className="inline-flex justify-center items-center mb-4 w-16 h-16 rounded-full bg-deep-green/10 text-deep-green">
                  <PhotoIcon className="w-8 h-8 animate-pulse" />
                </div>
                <h3 className="mb-2 text-lg font-bold text-black sm:text-xl">Loading events...</h3>
              </div>
            ) : events.length === 0 ? (
              <div className="py-12 text-center bg-white rounded-xl border sm:py-16 lg:py-20 sm:rounded-2xl border-black/5">
                <div className="inline-flex justify-center items-center mb-4 w-16 h-16 rounded-full bg-deep-green/10 text-deep-green">
                  <PhotoIcon className="w-8 h-8" />
                </div>
                <h3 className="mb-2 text-lg font-bold text-black sm:text-xl">No events yet</h3>
                <p className="mb-6 text-base text-black/60 sm:text-lg">Create your first event to start collecting photos</p>
                <Link
                  to="/create-event"
                  className="inline-flex gap-2 items-center px-6 py-3 text-base font-semibold text-white rounded-xl transition-colors sm:py-4 bg-deep-green sm:text-lg hover:bg-deep-green-dark"
                >
                  <PlusIcon className="w-5 h-5" />
                  Create Your First Event
                </Link>
              </div>
            ) : (
              <div className="space-y-4 sm:space-y-6">
                {events.map((event) => (
                  <div key={event.id} className="overflow-hidden bg-white rounded-xl border transition-shadow sm:rounded-2xl border-black/5 hover:shadow-lg">
                    <div className="p-4 sm:p-6 lg:p-8">
                      <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
                        {/* Event Cover Photo */}
                        <div className="flex-shrink-0">
                          <div className="overflow-hidden relative w-full h-32 rounded-xl lg:w-48 sm:h-40 lg:h-48">
                            <img
                              src={event.cover_thumbnail_url || event.cover_image_url || "https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"}
                              alt={event.name}
                              className="object-cover w-full h-full"
                            />
                            {!event.is_active && (
                              <div className="flex absolute inset-0 justify-center items-center bg-black/40">
                                <span className="px-3 py-1 text-xs font-medium text-white rounded-full bg-black/60">
                                  {event.is_archived ? 'Archived' : 'Inactive'}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                        {/* Event Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col gap-4 mb-4 sm:flex-row sm:items-start sm:justify-between">
                            <div className="flex-1">
                              <div className="flex flex-wrap gap-3 items-center mb-2">
                                <h3 className="text-xl font-bold text-black sm:text-2xl">{event.name}</h3>
                                <span className={`px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium rounded-full ${
                                  event.is_active && !event.is_archived
                                    ? 'bg-emerald/10 text-emerald' 
                                    : 'bg-black/5 text-black/60'
                                }`}>
                                  {event.is_archived ? 'Archived' : event.is_active ? 'Active' : 'Inactive'}
                                </span>
                              </div>
                              <div className="flex flex-wrap gap-4 items-center text-sm sm:gap-6 sm:text-base text-black/60">
                                <div className="flex gap-2 items-center">
                                  <CalendarIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                                  <span>{new Date(event.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                </div>
                                <div className="flex gap-2 items-center">
                                  <PhotoIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                                  <span>{event.photo_count || 0} photos</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* Action Buttons */}
                          <div className="flex flex-wrap gap-2 items-center sm:gap-3">
                            <Link
                              to={`/host/event/${event.id}`}
                              className="inline-flex gap-2 items-center px-4 py-2 text-sm font-medium text-white rounded-xl transition-colors bg-deep-green hover:bg-deep-green-dark"
                            >
                              <EyeIcon className="w-4 h-4" />
                              View Gallery
                            </Link>
                            <button
                              onClick={() => setShowQrCode(showQrCode === event.id ? null : event.id)}
                              className="inline-flex gap-2 items-center px-4 py-2 text-sm font-medium text-black rounded-xl border transition-colors border-black/10 hover:bg-cream-dark"
                            >
                              <QrCodeIcon className="w-4 h-4" />
                              QR Code
                            </button>
                            <button
                              onClick={() => handleCopyLink(event)}
                              className="inline-flex gap-2 items-center px-4 py-2 text-sm font-medium text-black rounded-xl border transition-colors border-black/10 hover:bg-cream-dark"
                            >
                              <LinkIcon className="w-4 h-4" />
                              Copy Link
                            </button>
                            <button
                              onClick={() => handleDownloadAll(event.id)}
                              className="inline-flex gap-2 items-center px-4 py-2 text-sm font-medium text-black rounded-xl border transition-colors border-black/10 hover:bg-cream-dark"
                              disabled
                              title="Download feature coming soon"
                            >
                              <ArrowDownTrayIcon className="w-4 h-4" />
                              <span className="hidden sm:inline">Download All</span>
                            </button>
                            <button
                              onClick={() => handleDelete(event.id)}
                              disabled={deletingEventId === event.id}
                              className="inline-flex gap-2 items-center px-4 py-2 text-sm font-medium text-red-600 rounded-xl border border-red-200 transition-colors hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <TrashIcon className="w-4 h-4" />
                              <span className="hidden sm:inline">{deletingEventId === event.id ? 'Deleting...' : 'Delete'}</span>
                            </button>
                          </div>
                        </div>
                      </div>
                      {/* QR Code Modal (shown when clicked) */}
                      {showQrCode === event.id && (
                        <div className="pt-6 mt-6 border-t border-black/10">
                          <div className="flex flex-col gap-6 items-center sm:flex-row sm:items-start">
                            <div className="flex-shrink-0 p-4 bg-white rounded-xl border border-black/10">
                              <img 
                                src={getQRCodeUrl(event)} 
                                alt="Event QR Code" 
                                className="w-32 h-32 sm:w-40 sm:h-40"
                              />
                            </div>
                            <div className="flex-1 text-center sm:text-left">
                              <h4 className="mb-2 text-lg font-semibold text-black">Share Your QR Code</h4>
                              <p className="mb-4 text-sm text-black/60">
                                Display this QR code at your event venue. Guests can scan it to upload photos instantly.
                              </p>
                              <div className="flex flex-col gap-3 sm:flex-row">
                                <button
                                  onClick={() => handleCopyLink(event)}
                                  className="inline-flex gap-2 justify-center items-center px-4 py-2 text-sm font-medium text-white rounded-xl transition-colors bg-deep-green hover:bg-deep-green-dark"
                                >
                                  <LinkIcon className="w-4 h-4" />
                                  Copy Event Link
                                </button>
                                <a
                                  href={getQRCodeUrl(event)}
                                  download={`${event.name}-qr-code.png`}
                                  className="inline-flex gap-2 justify-center items-center px-4 py-2 text-sm font-medium text-black rounded-xl border transition-colors border-black/10 hover:bg-cream-dark"
                                >
                                  <ArrowDownTrayIcon className="w-4 h-4" />
                                  Download QR Code
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}