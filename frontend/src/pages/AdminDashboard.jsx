import { Link, useNavigate } from 'react-router-dom';
import { 
  CalendarIcon,
  PhotoIcon,
  ServerIcon,
  UsersIcon,
  EyeIcon,
  TrashIcon,
  ExclamationTriangleIcon,
  ShieldCheckIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline';

export default function AdminDashboard() {
  const navigate = useNavigate();

  // Mock data - will be replaced with actual API calls
  const stats = {
    totalEvents: 156,
    totalUsers: 432,
    totalPhotos: 8945,
    storageUsed: 12.4, // GB
    storageLimit: 50, // GB
  };

  const recentEvents = [
    { 
      id: 1, 
      name: "Sarah & John's Wedding", 
      host: "sarah@email.com", 
      photos: 127, 
      date: "2025-12-15", 
      status: "active",
      views: 342
    },
    { 
      id: 2, 
      name: "Tech Conference 2025", 
      host: "admin@techconf.com", 
      photos: 89, 
      date: "2025-11-20", 
      status: "active",
      views: 256
    },
    { 
      id: 3, 
      name: "Birthday Party", 
      host: "john@email.com", 
      photos: 45, 
      date: "2025-10-05", 
      status: "ended",
      views: 89
    },
    { 
      id: 4, 
      name: "Corporate Event", 
      host: "events@corp.com", 
      photos: 156, 
      date: "2025-09-18", 
      status: "ended",
      views: 201
    },
    { 
      id: 5, 
      name: "Charity Gala", 
      host: "charity@org.com", 
      photos: 203, 
      date: "2025-08-22", 
      status: "archived",
      views: 445
    },
  ];

  const recentUploads = [
    { id: 1, event: "Sarah & John's Wedding", uploader: "Guest", time: "5 minutes ago" },
    { id: 2, event: "Tech Conference 2025", uploader: "Anonymous", time: "12 minutes ago" },
    { id: 3, event: "Sarah & John's Wedding", uploader: "Guest", time: "24 minutes ago" },
    { id: 4, event: "Birthday Party", uploader: "John Doe", time: "1 hour ago" },
  ];

  const handleDisableEvent = (eventId) => {
    if (window.confirm('Are you sure you want to disable this event? It will no longer accept new uploads.')) {
      console.log('Disable event:', eventId);
      // Handle disable logic here
    }
  };

  const handleDeleteEvent = (eventId) => {
    if (window.confirm('This will permanently delete the event and all its photos. This action cannot be undone. Continue?')) {
      console.log('Delete event:', eventId);
      // Handle delete logic here
    }
  };

  const handleViewEvent = (eventId) => {
    navigate(`/host/event/${eventId}`);
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      navigate('/admin/login');
    }
  };

  const storagePercentage = (stats.storageUsed / stats.storageLimit) * 100;

  return (
    <div className="min-h-screen bg-deep-green">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8 sm:py-6 lg:py-8">
        <div className="overflow-hidden rounded-2xl bg-cream sm:rounded-3xl">
          {/* Header Navigation */}
          <nav className="border-b border-cream-dark/20 px-4 py-3 sm:px-6 sm:py-4 lg:px-12 lg:py-6">
            <div className="flex items-center justify-between gap-2 sm:gap-4">
              <div className="flex items-center gap-3">
                <Link to="/" className="flex-shrink-0 text-lg font-bold text-black sm:text-xl lg:text-2xl">
                  PhotoLog
                </Link>
                <div className="rounded-lg border border-deep-gold/30 bg-gold/10 px-2 py-1">
                  <span className="text-xs font-semibold text-deep-gold sm:text-sm">ADMIN</span>
                </div>
              </div>
              <div className="flex items-center gap-3 sm:gap-4">
                <span className="hidden text-sm text-black/60 sm:inline sm:text-base">Administrator</span>
                <button
                  onClick={handleLogout}
                  className="rounded-lg p-2 text-black/60 transition-colors hover:bg-cream-dark hover:text-black"
                  title="Logout"
                >
                  <ArrowRightOnRectangleIcon className="h-5 w-5 sm:h-6 sm:w-6" />
                </button>
              </div>
            </div>
          </nav>

          {/* Page Header */}
          <div className="border-b border-cream-dark/20 px-4 py-6 sm:px-6 lg:px-12 sm:py-8 lg:py-10">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="rounded-xl bg-deep-gold/10 p-3">
                <ShieldCheckIcon className="h-6 w-6 text-deep-gold sm:h-8 sm:w-8" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-black sm:text-3xl lg:text-4xl">Admin Dashboard</h1>
                <p className="mt-1 text-sm text-black/60 sm:text-base">System overview and management</p>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="px-4 py-6 sm:px-6 lg:px-12 sm:py-8 lg:py-10">
            <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
              {/* Total Events */}
              <div className="rounded-xl border border-cream-dark/30 bg-cream-light p-5 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-black/60 sm:text-base">Total Events</p>
                    <p className="mt-1 text-2xl font-bold text-black sm:text-3xl">{stats.totalEvents}</p>
                  </div>
                  <div className="rounded-lg bg-deep-green/10 p-3">
                    <CalendarIcon className="h-6 w-6 text-deep-green sm:h-8 sm:w-8" />
                  </div>
                </div>
              </div>

              {/* Total Users */}
              <div className="rounded-xl border border-cream-dark/30 bg-cream-light p-5 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-black/60 sm:text-base">Total Users</p>
                    <p className="mt-1 text-2xl font-bold text-black sm:text-3xl">{stats.totalUsers}</p>
                  </div>
                  <div className="rounded-lg bg-emerald/10 p-3">
                    <UsersIcon className="h-6 w-6 text-emerald sm:h-8 sm:w-8" />
                  </div>
                </div>
              </div>

              {/* Total Photos */}
              <div className="rounded-xl border border-cream-dark/30 bg-cream-light p-5 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-black/60 sm:text-base">Total Photos</p>
                    <p className="mt-1 text-2xl font-bold text-black sm:text-3xl">{stats.totalPhotos.toLocaleString()}</p>
                  </div>
                  <div className="rounded-lg bg-deep-gold/10 p-3">
                    <PhotoIcon className="h-6 w-6 text-deep-gold sm:h-8 sm:w-8" />
                  </div>
                </div>
              </div>

              {/* Storage Used */}
              <div className="rounded-xl border border-cream-dark/30 bg-cream-light p-5 sm:p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-black/60 sm:text-base">Storage Used</p>
                    <p className="mt-1 text-xl font-bold text-black sm:text-2xl">{stats.storageUsed} GB</p>
                    <p className="mt-1 text-xs text-black/50 sm:text-sm">of {stats.storageLimit} GB</p>
                  </div>
                  <div className="rounded-lg bg-teal-brown/10 p-3">
                    <ServerIcon className="h-6 w-6 text-teal-brown sm:h-8 sm:w-8" />
                  </div>
                </div>
                <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-cream-dark/30">
                  <div 
                    className={`h-full transition-all ${
                      storagePercentage > 80 ? 'bg-red-500' : storagePercentage > 60 ? 'bg-deep-gold' : 'bg-deep-green'
                    }`}
                    style={{ width: `${storagePercentage}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
              {/* All Events - Main Content */}
              <div className="lg:col-span-2">
                <div className="overflow-hidden rounded-xl border border-cream-dark/30 bg-cream-light">
                  <div className="border-b border-cream-dark/20 bg-cream px-6 py-4 sm:px-8 sm:py-5">
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg font-bold text-black sm:text-xl">All Events</h2>
                      <span className="text-sm text-black/60">{recentEvents.length} total</span>
                    </div>
                  </div>
                  <div className="divide-y divide-cream-dark/20">
                    {recentEvents.map((event) => (
                      <div key={event.id} className="p-5 transition-colors hover:bg-cream sm:p-6">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                          <div className="flex-1">
                            <div className="mb-2 flex flex-wrap items-center gap-2 sm:gap-3">
                              <h3 className="text-base font-bold text-black sm:text-lg">{event.name}</h3>
                              <span className={`rounded-lg px-2 py-1 text-xs font-medium ${
                                event.status === 'active' 
                                  ? 'bg-emerald/10 text-emerald' 
                                  : event.status === 'ended'
                                  ? 'bg-black/10 text-black/70'
                                  : 'bg-deep-gold/10 text-deep-gold'
                              }`}>
                                {event.status}
                              </span>
                            </div>
                            <div className="space-y-1.5 text-sm text-black/60">
                              <p>Host: <span className="font-medium">{event.host}</span></p>
                              <div className="flex flex-wrap items-center gap-4">
                                <span className="flex items-center gap-1.5">
                                  <PhotoIcon className="h-4 w-4" />
                                  <span>{event.photos} photos</span>
                                </span>
                                <span className="flex items-center gap-1.5">
                                  <EyeIcon className="h-4 w-4" />
                                  <span>{event.views} views</span>
                                </span>
                                <span className="flex items-center gap-1.5">
                                  <CalendarIcon className="h-4 w-4" />
                                  <span>{new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 sm:ml-4">
                            <button
                              onClick={() => handleViewEvent(event.id)}
                              className="rounded-lg p-2 text-deep-green transition-colors hover:bg-deep-green/10"
                              title="View Event"
                            >
                              <EyeIcon className="h-5 w-5" />
                            </button>
                            <button
                              onClick={() => handleDisableEvent(event.id)}
                              className="rounded-lg p-2 text-deep-gold transition-colors hover:bg-deep-gold/10"
                              title="Disable Event"
                            >
                              <ExclamationTriangleIcon className="h-5 w-5" />
                            </button>
                            <button
                              onClick={() => handleDeleteEvent(event.id)}
                              className="rounded-lg p-2 text-red-600 transition-colors hover:bg-red-50"
                              title="Delete Event"
                            >
                              <TrashIcon className="h-5 w-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Recent Uploads */}
                <div className="overflow-hidden rounded-xl border border-cream-dark/30 bg-cream-light">
                  <div className="border-b border-cream-dark/20 bg-cream px-6 py-4 sm:px-8 sm:py-5">
                    <h2 className="text-lg font-bold text-black sm:text-xl">Recent Uploads</h2>
                  </div>
                  <div className="divide-y divide-cream-dark/20">
                    {recentUploads.map((upload) => (
                      <div key={upload.id} className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-lg bg-emerald/10">
                            <PhotoIcon className="h-5 w-5 text-emerald" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium text-black">
                              {upload.event}
                            </p>
                            <p className="text-xs text-black/60">by {upload.uploader}</p>
                            <p className="mt-1 text-xs text-black/50">{upload.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="overflow-hidden rounded-xl bg-gradient-to-br from-deep-green to-emerald p-6 text-white">
                  <h3 className="mb-4 text-lg font-bold sm:text-xl">Quick Actions</h3>
                  <div className="space-y-2">
                    <button className="w-full rounded-lg bg-white/10 px-4 py-2.5 text-left text-sm font-medium transition-colors hover:bg-white/20 sm:text-base">
                      Export All Data
                    </button>
                    <button className="w-full rounded-lg bg-white/10 px-4 py-2.5 text-left text-sm font-medium transition-colors hover:bg-white/20 sm:text-base">
                      System Settings
                    </button>
                    <button className="w-full rounded-lg bg-white/10 px-4 py-2.5 text-left text-sm font-medium transition-colors hover:bg-white/20 sm:text-base">
                      View Analytics
                    </button>
                    <button className="w-full rounded-lg bg-white/10 px-4 py-2.5 text-left text-sm font-medium transition-colors hover:bg-white/20 sm:text-base">
                      User Management
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

