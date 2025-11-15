import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  PhotoIcon,
  CloudArrowUpIcon,
  XMarkIcon,
  CheckCircleIcon,
  CalendarIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline';

export default function EventGallery() {
  const { id } = useParams();
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [caption, setCaption] = useState('');
  const [viewingPhoto, setViewingPhoto] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  // Mock event data - will be replaced with actual API call
  const event = {
    id: parseInt(id) || 1,
    name: "Sarah & John's Wedding",
    date: "2025-12-15",
    description: "Celebrating our special day with family and friends. Share your favorite moments with us!",
    coverPhoto: "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  };

  // Mock approved photos - will be replaced with actual API call
  const [photos] = useState(
    Array.from({ length: 18 }, (_, i) => ({
      id: i + 1,
      url: `https://images.unsplash.com/photo-${1519167758481 + i}?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80`,
      caption: i % 3 === 0 ? 'Beautiful moment captured!' : '',
      uploadedAt: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
    }))
  );

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

    console.log('Uploading:', { files: selectedFiles, caption });
    
    // Simulate upload
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setUploadSuccess(true);
    setTimeout(() => {
      setShowUploadModal(false);
      setUploadSuccess(false);
      setSelectedFiles([]);
      setCaption('');
      // In real app, refresh photos list here
    }, 2500);
  };

  const resetModal = () => {
    setShowUploadModal(false);
    setSelectedFiles([]);
    setCaption('');
    setUploadSuccess(false);
    setDragActive(false);
  };

  return (
    <div className="min-h-screen bg-deep-green">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8 sm:py-6 lg:py-8">
        <div className="overflow-hidden rounded-2xl bg-cream sm:rounded-3xl">
          {/* Header Navigation */}
          <nav className="border-b border-cream-dark/20 px-4 py-3 sm:px-6 sm:py-4 lg:px-12 lg:py-6">
            <div className="flex items-center justify-between gap-2 sm:gap-4">
              <Link to="/" className="flex-shrink-0 text-lg font-bold text-black sm:text-xl lg:text-2xl">
                PhotoLog
              </Link>
              <Link
                to="/"
                className="inline-flex items-center gap-2 whitespace-nowrap px-2 text-xs font-medium text-black transition-colors hover:text-deep-green sm:px-0 sm:text-sm lg:text-base"
              >
                <ArrowLeftIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">Back to Home</span>
              </Link>
            </div>
          </nav>

          {/* Event Header with Cover Photo */}
          {event.coverPhoto && (
            <div className="relative h-48 overflow-hidden sm:h-64 lg:h-80">
              <img
                src={event.coverPhoto}
                alt={event.name}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            </div>
          )}

          {/* Event Info Section */}
          <div className="border-b border-cream-dark/20 px-4 py-6 sm:px-6 lg:px-12 sm:py-8 lg:py-10">
            <h1 className="mb-2 text-2xl font-bold text-black sm:text-3xl lg:text-4xl sm:mb-3">
              {event.name}
            </h1>
            {event.description && (
              <p className="mb-4 text-base text-black/70 sm:text-lg lg:text-xl">
                {event.description}
              </p>
            )}
            <div className="mb-6 flex flex-wrap items-center gap-4 text-sm text-black/60 sm:gap-6 sm:text-base">
              <div className="flex items-center gap-2">
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
              <div className="flex items-center gap-2">
                <PhotoIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>{photos.length} photos</span>
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

            {photos.length === 0 ? (
              <div className="rounded-2xl border border-cream-dark/30 bg-cream-light p-12 text-center sm:p-16 lg:p-20">
                <PhotoIcon className="mx-auto mb-4 h-16 w-16 text-black/20 sm:h-20 sm:w-20" />
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
                    className="group relative aspect-square cursor-pointer overflow-hidden rounded-xl bg-black/5 sm:rounded-2xl"
                    onClick={() => setViewingPhoto(photo)}
                  >
                    <img
                      src={photo.url}
                      alt={photo.caption || 'Event photo'}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10"></div>
                    {photo.caption && (
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <p className="truncate text-xs text-white sm:text-sm">{photo.caption}</p>
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-cream sm:rounded-3xl">
            {/* Modal Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-cream-dark/20 bg-cream px-6 py-4 sm:px-8 sm:py-5">
              <h2 className="text-xl font-bold text-black sm:text-2xl">Upload Photos</h2>
              <button
                onClick={resetModal}
                className="rounded-lg p-2 transition-colors hover:bg-cream-dark"
                aria-label="Close"
              >
                <XMarkIcon className="h-6 w-6 text-black" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 sm:p-8">
              {uploadSuccess ? (
                /* Success State */
                <div className="py-8 text-center sm:py-12">
                  <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald/10 text-emerald sm:h-24 sm:w-24">
                    <CheckCircleIcon className="h-12 w-12 sm:h-14 sm:w-14" />
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-black sm:text-2xl">Upload Successful!</h3>
                  <p className="text-black/70 sm:text-lg">Thank you for sharing your photos. They will appear in the gallery shortly.</p>
                </div>
              ) : (
                /* Upload Form */
                <form onSubmit={handleUpload} className="space-y-6">
                  {/* File Drop Zone */}
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-black sm:text-base">
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
                        className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
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
                          <div key={index} className="group relative aspect-square overflow-hidden rounded-lg bg-black/5 sm:rounded-xl">
                            <img
                              src={URL.createObjectURL(file)}
                              alt={`Preview ${index + 1}`}
                              className="h-full w-full object-cover"
                            />
                            <button
                              type="button"
                              onClick={() => removeFile(index)}
                              className="absolute -right-1 -top-1 rounded-full bg-red-600 p-1.5 text-white opacity-0 transition-opacity hover:bg-red-700 group-hover:opacity-100 sm:p-2"
                              aria-label="Remove file"
                            >
                              <XMarkIcon className="h-3 w-3 sm:h-4 sm:w-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Caption */}
                  <div>
                    <label htmlFor="caption" className="mb-2 block text-sm font-semibold text-black sm:text-base">
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

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={selectedFiles.length === 0}
                    className="w-full rounded-xl bg-deep-green py-3 px-4 font-medium text-white transition-colors hover:bg-deep-green-dark disabled:cursor-not-allowed disabled:bg-black/20 disabled:text-black/40 sm:py-3.5 sm:px-6 sm:text-base"
                  >
                    {selectedFiles.length > 0 
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4">
          <button
            onClick={() => setViewingPhoto(null)}
            className="absolute right-4 top-4 rounded-lg p-2 text-white transition-colors hover:bg-white/10 sm:right-6 sm:top-6"
            aria-label="Close"
          >
            <XMarkIcon className="h-8 w-8 sm:h-10 sm:w-10" />
          </button>
          
          <div className="max-w-5xl w-full">
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
          </div>
        </div>
      )}
    </div>
  );
}

