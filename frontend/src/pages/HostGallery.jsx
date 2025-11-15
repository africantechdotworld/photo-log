import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { 
  TrashIcon, 
  ArrowDownTrayIcon,
  QrCodeIcon,
  LinkIcon,
  ArrowLeftIcon,
  XMarkIcon,
  CheckIcon,
  PhotoIcon,
  CalendarIcon,
  EyeIcon
} from '@heroicons/react/24/outline';

export default function HostGallery() {
  const { id } = useParams();
  const [selectedPhotos, setSelectedPhotos] = useState([]);
  const [viewingPhoto, setViewingPhoto] = useState(null);
  const [showQrCode, setShowQrCode] = useState(false);

  // Mock event data - will be replaced with actual API call
  const event = {
    id: parseInt(id) || 1,
    name: "Sarah & John's Wedding",
    date: "2025-12-15",
    description: "Celebrating our special day with family and friends",
    publicLink: `${window.location.origin}/event/${id}`,
    qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(window.location.origin + `/event/${id}`)}`,
    photoCount: 127,
    viewCount: 342,
    coverPhoto: "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
  };

  // Mock photos - will be replaced with actual API call
  const [photos] = useState(
    Array.from({ length: 24 }, (_, i) => ({
      id: i + 1,
      url: `https://images.unsplash.com/photo-${1519167758481 + i}?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80`,
      caption: i % 3 === 0 ? 'Beautiful moment captured!' : '',
      uploadedAt: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
      uploaderName: ['Guest', 'Anonymous', 'John Doe'][Math.floor(Math.random() * 3)],
    }))
  );

  const togglePhotoSelection = (photoId) => {
    setSelectedPhotos(prev => 
      prev.includes(photoId) 
        ? prev.filter(pid => pid !== photoId)
        : [...prev, photoId]
    );
  };

  const handleDeleteSelected = () => {
    if (window.confirm(`Delete ${selectedPhotos.length} selected photo(s)?`)) {
      console.log('Delete photos:', selectedPhotos);
      setSelectedPhotos([]);
      // Handle delete logic here
    }
  };

  const handleDeleteSingle = (photoId) => {
    if (window.confirm('Delete this photo?')) {
      console.log('Delete photo:', photoId);
      // Handle delete logic here
    }
  };

  const handleDeleteEvent = () => {
    if (window.confirm('Are you sure you want to delete this entire event? This action cannot be undone.')) {
      console.log('Delete event:', event.id);
      // Handle delete event logic here
      // Navigate back to dashboard
    }
  };

  const handleDownloadAll = () => {
    console.log('Download all photos for event:', event.id);
    // Handle download all logic here
  };

  const handleDownloadSelected = () => {
    console.log('Download selected photos:', selectedPhotos);
    // Handle download selected logic here
  };

  const copyLink = () => {
    navigator.clipboard.writeText(event.publicLink);
    // You could add a toast notification here
  };

  return (
    <div className="min-h-screen bg-deep-green">
      <div className="px-4 py-4 mx-auto max-w-7xl sm:px-6 lg:px-8 sm:py-6 lg:py-12">
        <div className="overflow-hidden rounded-2xl bg-cream sm:rounded-3xl">
          {/* Header Navigation */}
          <nav className="px-4 py-3 sm:px-6 sm:py-4 lg:px-12 lg:py-6 border-b border-cream-dark/20">
            <div className="flex justify-between items-center gap-2 sm:gap-4">
              <Link to="/" className="text-lg sm:text-xl lg:text-2xl font-bold text-black flex-shrink-0">
                PhotoLog
              </Link>
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 text-xs sm:text-sm lg:text-base font-medium text-black transition-colors hover:text-deep-green whitespace-nowrap px-2 sm:px-0"
              >
                <ArrowLeftIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">Dashboard</span>
              </Link>
            </div>
          </nav>

          {/* Event Info Section */}
          <div className="px-4 py-6 sm:px-6 lg:px-12 sm:py-8 lg:py-10 border-b border-cream-dark/20">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="flex-1">
                <h1 className="mb-2 text-2xl font-bold text-black sm:text-3xl lg:text-4xl sm:mb-3">
                  {event.name}
                </h1>
                {event.description && (
                  <p className="mb-3 text-base text-black/70 sm:text-lg sm:mb-4">
                    {event.description}
                  </p>
                )}
                <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm sm:text-base text-black/60">
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>{new Date(event.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <PhotoIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>{photos.length} photos</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <EyeIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>{event.viewCount} views</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setShowQrCode(!showQrCode)}
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-black rounded-xl transition-colors border border-black/10 hover:bg-cream-dark"
                >
                  <QrCodeIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>QR Code</span>
                </button>
                <button
                  onClick={copyLink}
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-black rounded-xl transition-colors border border-black/10 hover:bg-cream-dark"
                >
                  <LinkIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="hidden sm:inline">Copy Link</span>
                  <span className="sm:hidden">Link</span>
                </button>
                <button
                  onClick={handleDownloadAll}
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white rounded-xl transition-colors bg-deep-green hover:bg-deep-green-dark"
                >
                  <ArrowDownTrayIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="hidden sm:inline">Download All</span>
                  <span className="sm:hidden">Download</span>
                </button>
                <button
                  onClick={handleDeleteEvent}
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 rounded-xl transition-colors border border-red-200 hover:bg-red-50"
                >
                  <TrashIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="hidden sm:inline">Delete Event</span>
                  <span className="sm:hidden">Delete</span>
                </button>
              </div>
            </div>

            {/* QR Code Section (shown when clicked) */}
            {showQrCode && (
              <div className="mt-6 pt-6 border-t border-black/10">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                  <div className="flex-shrink-0 p-4 bg-white rounded-xl border border-black/10">
                    <img 
                      src={event.qrCodeUrl} 
                      alt="Event QR Code" 
                      className="w-32 h-32 sm:w-40 sm:h-40"
                    />
                  </div>
                  <div className="flex-1 text-center sm:text-left">
                    <h4 className="mb-2 text-lg font-semibold text-black">Share Your QR Code</h4>
                    <p className="mb-4 text-sm text-black/60">
                      Display this QR code at your event venue. Guests can scan it to upload photos instantly.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={copyLink}
                        className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white rounded-xl transition-colors bg-deep-green hover:bg-deep-green-dark"
                      >
                        <LinkIcon className="w-4 h-4" />
                        Copy Event Link
                      </button>
                      <a
                        href={event.qrCodeUrl}
                        download={`${event.name}-qr-code.png`}
                        className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-black rounded-xl transition-colors border border-black/10 hover:bg-cream-dark"
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

          {/* Selection Bar (shown when photos are selected) */}
          {selectedPhotos.length > 0 && (
            <div className="px-4 py-3 sm:px-6 lg:px-12 bg-deep-green text-white sticky top-0 z-30">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <span className="font-medium text-sm sm:text-base">{selectedPhotos.length} photo{selectedPhotos.length !== 1 ? 's' : ''} selected</span>
                  <button
                    onClick={() => setSelectedPhotos([])}
                    className="text-sm hover:text-emerald transition-colors"
                  >
                    Clear selection
                  </button>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleDownloadSelected}
                    className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white rounded-xl transition-colors bg-white/10 hover:bg-white/20"
                  >
                    <ArrowDownTrayIcon className="w-4 h-4" />
                    <span>Download</span>
                  </button>
                  <button
                    onClick={handleDeleteSelected}
                    className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white rounded-xl transition-colors bg-red-600 hover:bg-red-700"
                  >
                    <TrashIcon className="w-4 h-4" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Photo Grid Section */}
          <div className="px-4 py-6 sm:px-6 lg:px-12 sm:py-8 lg:py-10">
            <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <h2 className="text-xl sm:text-2xl font-bold text-black">
                Uploaded Photos ({photos.length})
              </h2>
              {photos.length > 0 && (
                <button
                  onClick={() => {
                    if (selectedPhotos.length === photos.length) {
                      setSelectedPhotos([]);
                    } else {
                      setSelectedPhotos(photos.map(p => p.id));
                    }
                  }}
                  className="text-sm font-medium transition-colors text-deep-green hover:text-emerald"
                >
                  {selectedPhotos.length === photos.length ? 'Deselect All' : 'Select All'}
                </button>
              )}
            </div>

            {photos.length === 0 ? (
              <div className="py-12 sm:py-16 lg:py-20 text-center rounded-xl sm:rounded-2xl bg-white border border-black/5">
                <div className="inline-flex items-center justify-center mb-4 w-16 h-16 rounded-full bg-deep-green/10 text-deep-green">
                  <PhotoIcon className="w-8 h-8" />
                </div>
                <h3 className="mb-2 text-lg sm:text-xl font-bold text-black">No photos yet</h3>
                <p className="mb-6 text-base text-black/60 sm:text-lg">
                  Share your event link with guests to start collecting photos
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={copyLink}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white rounded-xl transition-colors bg-deep-green hover:bg-deep-green-dark"
                  >
                    <LinkIcon className="w-4 h-4" />
                    Copy Event Link
                  </button>
                  <button
                    onClick={() => setShowQrCode(true)}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-black rounded-xl transition-colors border border-black/10 hover:bg-cream-dark"
                  >
                    <QrCodeIcon className="w-4 h-4" />
                    View QR Code
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
                {photos.map((photo) => (
                  <div key={photo.id} className="relative group">
                    <div 
                      className="relative aspect-square bg-gray-200 cursor-pointer overflow-hidden rounded-xl"
                      onClick={() => setViewingPhoto(photo)}
                    >
                      <img
                        src={photo.url}
                        alt={photo.caption || 'Event photo'}
                        className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                      />
                      
                      {/* Selection Checkbox */}
                      <div
                        className="absolute top-2 left-2 z-10"
                        onClick={(e) => {
                          e.stopPropagation();
                          togglePhotoSelection(photo.id);
                        }}
                      >
                        <div className={`h-6 w-6 rounded-lg border-2 flex items-center justify-center transition-colors ${
                          selectedPhotos.includes(photo.id)
                            ? 'bg-deep-green border-deep-green'
                            : 'bg-white/90 border-white backdrop-blur-sm'
                        }`}>
                          {selectedPhotos.includes(photo.id) && (
                            <CheckIcon className="w-4 h-4 text-white" />
                          )}
                        </div>
                      </div>

                      {/* Delete Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteSingle(photo.id);
                        }}
                        className="absolute top-2 right-2 p-1.5 bg-red-600 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity z-10"
                        title="Delete photo"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>

                      {/* Overlay on hover */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors"></div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Photo Viewer Modal */}
      {viewingPhoto && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setViewingPhoto(null)}
        >
          <button
            onClick={() => setViewingPhoto(null)}
            className="absolute top-4 right-4 p-2 text-white hover:bg-white/10 rounded-lg transition-colors z-10"
          >
            <XMarkIcon className="w-6 h-6 sm:w-8 sm:h-8" />
          </button>
          
          <div 
            className="max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={viewingPhoto.url}
              alt={viewingPhoto.caption || 'Event photo'}
              className="w-full h-auto max-h-[80vh] object-contain rounded-xl"
            />
            {viewingPhoto.caption && (
              <div className="mt-4 text-center text-white">
                <p className="text-base sm:text-lg">{viewingPhoto.caption}</p>
              </div>
            )}
            <div className="mt-6 flex flex-col sm:flex-row justify-center gap-3">
              <button
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = viewingPhoto.url;
                  link.download = `photo-${viewingPhoto.id}.jpg`;
                  link.click();
                }}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium text-black bg-white rounded-xl hover:bg-gray-100 transition-colors"
              >
                <ArrowDownTrayIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                Download
              </button>
              <button
                onClick={() => {
                  handleDeleteSingle(viewingPhoto.id);
                  setViewingPhoto(null);
                }}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium text-white bg-red-600 rounded-xl hover:bg-red-700 transition-colors"
              >
                <TrashIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

