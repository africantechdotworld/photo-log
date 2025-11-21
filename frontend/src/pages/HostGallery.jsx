import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
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
import { getEvent, getEventPhotos, deletePhoto, bulkDeletePhotos, deleteEvent, updatePhoto } from '../services/api';

export default function HostGallery() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [selectedPhotos, setSelectedPhotos] = useState([]);
  const [viewingPhoto, setViewingPhoto] = useState(null);
  const [showQrCode, setShowQrCode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deletingPhotoIds, setDeletingPhotoIds] = useState(new Set());

  useEffect(() => {
    if (id) {
      fetchEventData();
    }
  }, [id]);

  const fetchEventData = async () => {
    try {
      setLoading(true);
      setError('');
      
      // Fetch event and photos in parallel
      const [eventData, photosData] = await Promise.all([
        getEvent(id),
        getEventPhotos(id, 1, 100)
      ]);
      
      setEvent(eventData);
      setPhotos(photosData.photos || []);
    } catch (err) {
      setError(err.message || 'Failed to load event data. Please try again.');
      console.error('Error fetching event data:', err);
    } finally {
      setLoading(false);
    }
  };

  const togglePhotoSelection = (photoId) => {
    setSelectedPhotos(prev => 
      prev.includes(photoId) 
        ? prev.filter(pid => pid !== photoId)
        : [...prev, photoId]
    );
  };

  const handleApprovePhoto = async (photoId, approved) => {
    try {
      const updatedPhoto = await updatePhoto(id, photoId, { approved });
      // Update photo in local state
      setPhotos(photos.map(p => p.id === photoId ? updatedPhoto : p));
    } catch (err) {
      alert(err.message || 'Failed to update photo approval status. Please try again.');
      console.error('Error updating photo:', err);
    }
  };

  const handleBulkApprove = async (approved) => {
    if (selectedPhotos.length === 0) return;
    
    try {
      // Update all selected photos in parallel
      await Promise.all(
        selectedPhotos.map(photoId => 
          updatePhoto(id, photoId, { approved })
        )
      );
      // Refresh photos to get updated data
      await fetchEventData();
      setSelectedPhotos([]);
    } catch (err) {
      alert(err.message || 'Failed to update photos. Please try again.');
      console.error('Error bulk updating photos:', err);
    }
  };

  const handleDeleteSelected = async () => {
    if (window.confirm(`Delete ${selectedPhotos.length} selected photo(s)?`)) {
      try {
        setDeletingPhotoIds(new Set(selectedPhotos));
        await bulkDeletePhotos(id, selectedPhotos);
        // Remove deleted photos from local state
        setPhotos(photos.filter(p => !selectedPhotos.includes(p.id)));
        setSelectedPhotos([]);
      } catch (err) {
        alert(err.message || 'Failed to delete photos. Please try again.');
        console.error('Error deleting photos:', err);
      } finally {
        setDeletingPhotoIds(new Set());
      }
    }
  };

  const handleDeleteSingle = async (photoId) => {
    if (window.confirm('Delete this photo?')) {
      try {
        setDeletingPhotoIds(new Set([photoId]));
        await deletePhoto(id, photoId);
        // Remove deleted photo from local state
        setPhotos(photos.filter(p => p.id !== photoId));
        if (viewingPhoto?.id === photoId) {
          setViewingPhoto(null);
        }
      } catch (err) {
        alert(err.message || 'Failed to delete photo. Please try again.');
        console.error('Error deleting photo:', err);
      } finally {
        setDeletingPhotoIds(new Set());
      }
    }
  };

  const handleDeleteEvent = async () => {
    if (window.confirm('Are you sure you want to delete this entire event? This action cannot be undone.')) {
      try {
        await deleteEvent(id);
        // Navigate back to dashboard
        navigate('/dashboard');
      } catch (err) {
        alert(err.message || 'Failed to delete event. Please try again.');
        console.error('Error deleting event:', err);
      }
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
    const link = event?.share_link || `${window.location.origin}/event/${id}`;
    navigator.clipboard.writeText(link);
    // You could add a toast notification here
  };

  const getQRCodeUrl = () => {
    const link = event?.share_link || `${window.location.origin}/event/${id}`;
    return `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(link)}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-deep-green">
        <div className="px-4 py-4 mx-auto max-w-7xl sm:px-6 lg:px-8 sm:py-6 lg:py-12">
          <div className="overflow-hidden rounded-2xl bg-cream sm:rounded-3xl">
            <div className="flex items-center justify-center px-4 py-8 sm:px-6 lg:px-12 sm:py-12 lg:py-16">
              <div className="text-center">
                <div className="inline-flex justify-center items-center mb-4 w-16 h-16 rounded-full bg-deep-green/10 text-deep-green">
                  <PhotoIcon className="w-8 h-8 animate-pulse" />
                </div>
                <h3 className="text-lg font-bold text-black sm:text-xl">Loading event...</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error && !event) {
    return (
      <div className="min-h-screen bg-deep-green">
        <div className="px-4 py-4 mx-auto max-w-7xl sm:px-6 lg:px-8 sm:py-6 lg:py-12">
          <div className="overflow-hidden rounded-2xl bg-cream sm:rounded-3xl">
            <div className="px-4 py-8 sm:px-6 lg:px-12 sm:py-12 lg:py-16">
              <div className="p-4 rounded-xl border bg-red-50 border-red-200">
                <p className="text-sm text-red-700">{error}</p>
              </div>
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 mt-4 px-4 py-2 text-sm font-medium text-black rounded-xl transition-colors border border-black/10 hover:bg-cream-dark"
              >
                <ArrowLeftIcon className="w-4 h-4" />
                Back to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!event) {
    return null;
  }

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
                    disabled
                    className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white rounded-xl transition-colors bg-deep-green hover:bg-deep-green-dark disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Download feature coming soon"
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
                      src={getQRCodeUrl()} 
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
                        href={getQRCodeUrl()}
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
                    onClick={() => handleBulkApprove(true)}
                    className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white rounded-xl transition-colors bg-emerald hover:bg-emerald-dark"
                  >
                    <CheckIcon className="w-4 h-4" />
                    <span>Approve</span>
                  </button>
                  <button
                    onClick={() => handleBulkApprove(false)}
                    className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white rounded-xl transition-colors bg-white/10 hover:bg-white/20"
                  >
                    <XMarkIcon className="w-4 h-4" />
                    <span>Unapprove</span>
                  </button>
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

            {/* Error Message */}
            {error && (
              <div className="p-4 mb-6 rounded-xl border bg-red-50 border-red-200">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

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
                        src={photo.thumbnail_url || photo.url}
                        alt={photo.caption || 'Event photo'}
                        className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                      />
                      
                      {/* Selection Checkbox */}
                      <div
                        className="absolute bottom-2 left-2 z-10"
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

                      {/* Approval Status Badge */}
                      {!photo.approved && (
                        <div className="absolute top-2 left-2 z-10 px-2 py-1 bg-yellow-500 text-white text-xs font-medium rounded-lg">
                          Pending
                        </div>
                      )}
                      {photo.approved && (
                        <div className="absolute top-2 left-2 z-10 px-2 py-1 bg-emerald text-white text-xs font-medium rounded-lg">
                          Approved
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleApprovePhoto(photo.id, !photo.approved);
                          }}
                          className={`p-1.5 rounded-lg transition-colors ${
                            photo.approved 
                              ? 'bg-white/90 text-black hover:bg-white' 
                              : 'bg-emerald text-white hover:bg-emerald-dark'
                          }`}
                          title={photo.approved ? 'Unapprove photo' : 'Approve photo'}
                        >
                          {photo.approved ? (
                            <XMarkIcon className="w-4 h-4" />
                          ) : (
                            <CheckIcon className="w-4 h-4" />
                          )}
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteSingle(photo.id);
                          }}
                          disabled={deletingPhotoIds.has(photo.id)}
                          className="p-1.5 bg-red-600 text-white rounded-lg transition-colors hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                          title="Delete photo"
                        >
                          <TrashIcon className="w-4 h-4" />
                        </button>
                      </div>

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
                  handleApprovePhoto(viewingPhoto.id, !viewingPhoto.approved);
                  // Update viewing photo state
                  setViewingPhoto({ ...viewingPhoto, approved: !viewingPhoto.approved });
                }}
                className={`inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium rounded-xl transition-colors ${
                  viewingPhoto.approved
                    ? 'text-black bg-white hover:bg-gray-100'
                    : 'text-white bg-emerald hover:bg-emerald-dark'
                }`}
              >
                {viewingPhoto.approved ? (
                  <>
                    <XMarkIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                    Unapprove
                  </>
                ) : (
                  <>
                    <CheckIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                    Approve
                  </>
                )}
              </button>
              <button
                onClick={async () => {
                  try {
                    // Fetch the image as a blob
                    const response = await fetch(viewingPhoto.url);
                    const blob = await response.blob();
                    
                    // Create an object URL from the blob
                    const objectUrl = URL.createObjectURL(blob);
                    
                    // Create a download link
                    const link = document.createElement('a');
                    link.href = objectUrl;
                    link.download = `photo-${viewingPhoto.id}.jpg`;
                    document.body.appendChild(link);
                    link.click();
                    
                    // Clean up
                    document.body.removeChild(link);
                    URL.revokeObjectURL(objectUrl);
                  } catch (error) {
                    console.error('Failed to download image:', error);
                    alert('Failed to download image. Please try again.');
                  }
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

