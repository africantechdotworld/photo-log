import { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  PhotoIcon,
  CloudArrowUpIcon,
  XMarkIcon,
  CheckCircleIcon,
  CalendarIcon,
  ArrowLeftIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import { getPublicEvent, getPublicEventPhotos, uploadPublicPhoto, verifyEventPassword } from '../services/api';

export default function EventGallery() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [caption, setCaption] = useState('');
  const [eventPassword, setEventPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [viewingPhoto, setViewingPhoto] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const fetchEventData = useCallback(async () => {
    if (!id || id === ':id') {
      setLoading(false);
      setError('Invalid event ID');
      return;
    }

    try {
      setLoading(true);
      setError('');
      
      // Decode URL-encoded id if needed
      const eventId = decodeURIComponent(id);
      
      // Fetch event and photos in parallel
      const [eventData, photosData] = await Promise.all([
        getPublicEvent(eventId),
        getPublicEventPhotos(eventId, 1, 100)
      ]);
      
      setEvent(eventData);
      setPhotos(photosData.photos || []);
    } catch (err) {
      setError(err.message || 'Failed to load event. Please try again.');
      console.error('Error fetching event data:', err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchEventData();
  }, [fetchEventData]);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (files) => {
    const fileArray = Array.from(files).filter(file => file.type.startsWith('image/'));
    setSelectedFiles(prev => [...prev, ...fileArray]);
  };

  const removeFile = (index) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (selectedFiles.length === 0) return;

    setUploading(true);
    setPasswordError('');
    setError('');

    try {
      // Verify password if event requires it
      if (event?.has_password) {
        if (!eventPassword) {
          setPasswordError('Password is required for this event.');
          setUploading(false);
          return;
        }
        
        try {
          await verifyEventPassword(id, eventPassword);
        } catch (err) {
          setPasswordError(err.message || 'Incorrect password. Please try again.');
          setUploading(false);
          return;
        }
      }

      // Upload all selected files
      const uploadPromises = selectedFiles.map(file => 
        uploadPublicPhoto(id, file, caption || null, event?.has_password ? eventPassword : null)
      );
      
      await Promise.all(uploadPromises);
      
      setUploadSuccess(true);
      
      // Refresh photos after successful upload
      setTimeout(async () => {
        await fetchEventData();
        setShowUploadModal(false);
        setUploadSuccess(false);
        setSelectedFiles([]);
        setCaption('');
        setEventPassword('');
        setPasswordError('');
      }, 2000);
    } catch (err) {
      setError(err.message || 'Failed to upload photos. Please try again.');
      console.error('Error uploading photos:', err);
    } finally {
      setUploading(false);
    }
  };

  const resetModal = () => {
    setShowUploadModal(false);
    setSelectedFiles([]);
    setCaption('');
    setEventPassword('');
    setPasswordError('');
    setUploadSuccess(false);
    setDragActive(false);
    setError('');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-deep-green">
        <div className="text-center">
          <div className="inline-block w-8 h-8 rounded-full border-4 border-solid animate-spin border-cream border-r-transparent"></div>
          <p className="mt-4 text-cream">Loading event...</p>
        </div>
      </div>
    );
  }

  if (error && !event) {
    return (
      <div className="min-h-screen bg-deep-green">
        <div className="px-4 py-4 mx-auto max-w-7xl sm:px-6 lg:px-8 sm:py-6 lg:py-8">
          <div className="overflow-hidden p-8 text-center rounded-2xl bg-cream sm:rounded-3xl sm:p-12">
            <ExclamationTriangleIcon className="mx-auto w-12 h-12 text-red-600 sm:h-16 sm:w-16" />
            <h2 className="mt-4 text-xl font-bold text-black sm:text-2xl">Error Loading Event</h2>
            <p className="mt-2 text-black/70">{error}</p>
            <Link
              to="/"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-deep-green px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-deep-green-dark sm:px-8 sm:py-3.5 sm:text-base"
            >
              <ArrowLeftIcon className="w-5 h-5" />
              <span>Back to Home</span>
            </Link>
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
      <div className="px-4 py-4 mx-auto max-w-7xl sm:px-6 lg:px-8 sm:py-6 lg:py-8">
        <div className="overflow-hidden rounded-2xl bg-cream sm:rounded-3xl">
          {/* Header Navigation */}
          <nav className="px-4 py-3 border-b border-cream-dark/20 sm:px-6 sm:py-4 lg:px-12 lg:py-6">
            <div className="flex gap-2 justify-between items-center sm:gap-4">
              <Link to="/" className="flex-shrink-0 text-lg font-bold text-black sm:text-xl lg:text-2xl">
                PhotoLog
              </Link>
              <Link
                to="/"
                className="inline-flex gap-2 items-center px-2 text-xs font-medium text-black whitespace-nowrap transition-colors hover:text-deep-green sm:px-0 sm:text-sm lg:text-base"
              >
                <ArrowLeftIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">Back to Home</span>
              </Link>
            </div>
          </nav>

          {/* Event Header with Cover Photo */}
          {event.cover_image_url && (
            <div className="overflow-hidden relative h-48 sm:h-64 lg:h-80">
              <img
                src={event.cover_image_url}
                alt={event.name}
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t to-transparent from-black/40"></div>
            </div>
          )}

          {/* Event Info Section */}
          <div className="px-4 py-6 border-b border-cream-dark/20 sm:px-6 lg:px-12 sm:py-8 lg:py-10">
            <h1 className="mb-2 text-2xl font-bold text-black sm:text-3xl lg:text-4xl sm:mb-3">
              {event.name}
            </h1>
            {event.description && (
              <p className="mb-4 text-base text-black/70 sm:text-lg lg:text-xl">
                {event.description}
              </p>
            )}
            <div className="flex flex-wrap gap-4 items-center mb-6 text-sm text-black/60 sm:gap-6 sm:text-base">
              <div className="flex gap-2 items-center">
                <CalendarIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>
                  {new Date(event.date).toLocaleDateString('en-US', { 
                    weekday: 'long',
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </span>
              </div>
              <div className="flex gap-2 items-center">
                <PhotoIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>{event.photo_count || photos.length} photos</span>
              </div>
            </div>
            <button
              onClick={() => setShowUploadModal(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-deep-green px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-deep-green-dark sm:px-8 sm:py-3.5 sm:text-base"
            >
              <CloudArrowUpIcon className="w-5 h-5 sm:w-6 sm:h-6" />
              <span>Upload Photos</span>
            </button>
          </div>

          {/* Photo Gallery */}
          <div className="px-4 py-8 sm:px-6 lg:px-12 sm:py-10 lg:py-12">
            <h2 className="mb-6 text-xl font-bold text-black sm:text-2xl lg:text-3xl">
              Event Photos
              <span className="ml-2 text-base font-normal text-black/60 sm:text-lg lg:text-xl">
                ({photos.length})
              </span>
            </h2>

            {error && (
              <div className="p-4 mb-6 text-red-800 bg-red-50 rounded-lg border border-red-200">
                <p className="text-sm">{error}</p>
              </div>
            )}

            {photos.length === 0 ? (
              <div className="p-12 text-center rounded-2xl border border-cream-dark/30 bg-cream-light sm:p-16 lg:p-20">
                <PhotoIcon className="mx-auto mb-4 w-16 h-16 text-black/20 sm:h-20 sm:w-20" />
                <h3 className="mb-2 text-lg font-semibold text-black sm:text-xl">No photos yet</h3>
                <p className="mb-6 text-black/60 sm:text-lg">Be the first to share a moment from this event!</p>
                <button
                  onClick={() => setShowUploadModal(true)}
                  className="inline-flex items-center gap-2 rounded-xl bg-deep-green px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-deep-green-dark sm:px-8 sm:py-3.5 sm:text-base"
                >
                  <CloudArrowUpIcon className="w-5 h-5" />
                  <span>Upload Photos</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5 lg:gap-5">
                {photos.map((photo) => (
                  <div
                    key={photo.id}
                    className="overflow-hidden relative rounded-xl cursor-pointer group aspect-square bg-black/5 sm:rounded-2xl"
                    onClick={() => setViewingPhoto(photo)}
                  >
                    <img
                      src={photo.thumbnail_url || photo.url}
                      alt={photo.caption || 'Event photo'}
                      className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 transition-colors duration-300 bg-black/0 group-hover:bg-black/10"></div>
                    {photo.caption && (
                      <div className="absolute right-0 bottom-0 left-0 p-3 bg-gradient-to-t to-transparent opacity-0 transition-opacity duration-300 from-black/60 group-hover:opacity-100">
                        <p className="text-xs text-white truncate sm:text-sm">{photo.caption}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="flex fixed inset-0 z-50 justify-center items-center p-4 bg-black/60">
          <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-cream sm:rounded-3xl">
            {/* Modal Header */}
            <div className="flex sticky top-0 z-10 justify-between items-center px-6 py-4 border-b border-cream-dark/20 bg-cream sm:px-8 sm:py-5">
              <h2 className="text-xl font-bold text-black sm:text-2xl">Upload Photos</h2>
              <button
                onClick={resetModal}
                className="p-2 rounded-lg transition-colors hover:bg-cream-dark"
                aria-label="Close"
              >
                <XMarkIcon className="w-6 h-6 text-black" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 sm:p-8">
              {uploadSuccess ? (
                /* Success State */
                <div className="py-8 text-center sm:py-12">
                  <div className="flex justify-center items-center mx-auto mb-6 w-20 h-20 rounded-full bg-emerald/10 text-emerald sm:h-24 sm:w-24">
                    <CheckCircleIcon className="w-12 h-12 sm:h-14 sm:w-14" />
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-black sm:text-2xl">Upload Successful!</h3>
                  <p className="text-black/70 sm:text-lg">Thank you for sharing your photos. They will appear in the gallery shortly.</p>
                </div>
              ) : (
                /* Upload Form */
                <form onSubmit={handleUpload} className="space-y-6">
                  {/* File Drop Zone */}
                  <div>
                    <label className="block mb-2 text-sm font-semibold text-black sm:text-base">
                      Select Photos
                    </label>
                    <div
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={handleDrop}
                      className={`relative rounded-xl border-2 border-dashed p-8 text-center transition-colors sm:p-12 lg:p-16 ${
                        dragActive 
                          ? 'border-deep-green bg-emerald/5' 
                          : 'border-black/20 hover:border-deep-green hover:bg-cream-light'
                      }`}
                    >
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleFileInput}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <CloudArrowUpIcon className={`mx-auto mb-3 h-12 w-12 transition-colors sm:h-16 sm:w-16 ${
                        dragActive ? 'text-deep-green' : 'text-black/30'
                      }`} />
                      <p className="mb-1 font-medium text-black sm:text-lg">
                        Drop photos here or click to browse
                      </p>
                      <p className="text-sm text-black/60">PNG, JPG up to 10MB each</p>
                    </div>
                  </div>

                  {/* Selected Files Preview */}
                  {selectedFiles.length > 0 && (
                    <div>
                      <p className="mb-3 text-sm font-semibold text-black sm:text-base">
                        Selected: {selectedFiles.length} file(s)
                      </p>
                      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 sm:gap-4 lg:grid-cols-5">
                        {selectedFiles.map((file, index) => (
                          <div key={index} className="overflow-hidden relative rounded-lg group aspect-square bg-black/5 sm:rounded-xl">
                            <img
                              src={URL.createObjectURL(file)}
                              alt={`Preview ${index + 1}`}
                              className="object-cover w-full h-full"
                            />
                            <button
                              type="button"
                              onClick={() => removeFile(index)}
                              className="absolute -right-1 -top-1 rounded-full bg-red-600 p-1.5 text-white opacity-0 transition-opacity hover:bg-red-700 group-hover:opacity-100 sm:p-2"
                              aria-label="Remove file"
                            >
                              <XMarkIcon className="w-3 h-3 sm:h-4 sm:w-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Password Field (if event requires password) */}
                  {event?.has_password && (
                    <div>
                      <label htmlFor="eventPassword" className="block mb-2 text-sm font-semibold text-black sm:text-base">
                        Event Password <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="password"
                        id="eventPassword"
                        value={eventPassword}
                        onChange={(e) => {
                          setEventPassword(e.target.value);
                          setPasswordError('');
                        }}
                        placeholder="Enter event password"
                        className="w-full rounded-lg border border-black/20 bg-white px-4 py-3 text-black placeholder:text-black/40 focus:border-deep-green focus:outline-none focus:ring-2 focus:ring-deep-green/20 sm:px-5 sm:py-3.5"
                      />
                      {passwordError && (
                        <p className="mt-2 text-sm text-red-600">{passwordError}</p>
                      )}
                    </div>
                  )}

                  {/* Caption */}
                  <div>
                    <label htmlFor="caption" className="block mb-2 text-sm font-semibold text-black sm:text-base">
                      Add a Caption (Optional)
                    </label>
                    <textarea
                      id="caption"
                      rows="3"
                      value={caption}
                      onChange={(e) => setCaption(e.target.value)}
                      placeholder="Share your thoughts about these photos..."
                      className="w-full resize-none rounded-lg border border-black/20 bg-white px-4 py-3 text-black placeholder:text-black/40 focus:border-deep-green focus:outline-none focus:ring-2 focus:ring-deep-green/20 sm:px-5 sm:py-3.5"
                    />
                  </div>

                  {/* Error Message */}
                  {error && (
                    <div className="p-4 text-red-800 bg-red-50 rounded-lg border border-red-200">
                      <p className="text-sm">{error}</p>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={selectedFiles.length === 0 || uploading || (event?.has_password && !eventPassword)}
                    className="w-full rounded-xl bg-deep-green py-3 px-4 font-medium text-white transition-colors hover:bg-deep-green-dark disabled:cursor-not-allowed disabled:bg-black/20 disabled:text-black/40 sm:py-3.5 sm:px-6 sm:text-base"
                  >
                    {uploading 
                      ? 'Uploading...'
                      : selectedFiles.length > 0 
                        ? `Upload ${selectedFiles.length} Photo${selectedFiles.length > 1 ? 's' : ''}`
                        : 'Upload Photos'
                    }
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Photo Viewer Modal */}
      {viewingPhoto && (
        <div className="flex fixed inset-0 z-50 justify-center items-center p-4 bg-black/95">
          <button
            onClick={() => setViewingPhoto(null)}
            className="absolute top-4 right-4 p-2 text-white rounded-lg transition-colors hover:bg-white/10 sm:right-6 sm:top-6"
            aria-label="Close"
          >
            <XMarkIcon className="w-8 h-8 sm:h-10 sm:w-10" />
          </button>
          
          <div className="w-full max-w-5xl">
            <img
              src={viewingPhoto.url}
              alt={viewingPhoto.caption || 'Event photo'}
              className="mx-auto max-h-[80vh] w-auto object-contain"
            />
            {viewingPhoto.caption && (
              <div className="mt-4 text-center text-white sm:mt-6">
                <p className="text-base sm:text-lg lg:text-xl">{viewingPhoto.caption}</p>
              </div>
            )}
            {viewingPhoto.uploaded_at && (
              <div className="mt-2 text-sm text-center text-white/70">
                Uploaded {new Date(viewingPhoto.uploaded_at).toLocaleDateString()}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

