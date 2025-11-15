import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { 
  CalendarIcon, 
  PhotoIcon, 
  LockClosedIcon,
  CheckIcon,
  QrCodeIcon 
} from '@heroicons/react/24/outline';

export default function CreateEvent() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    date: '',
    password: '',
    coverPhoto: null,
    usePassword: false,
  });
  const [previewUrl, setPreviewUrl] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [eventLink, setEventLink] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, coverPhoto: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    setPreviewUrl(null);
    setFormData(prev => ({ ...prev, coverPhoto: null }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle event creation logic here
    console.log('Event created:', formData);
    
    // Generate mock event link and QR code for now
    const mockEventId = 'event-' + Math.random().toString(36).substr(2, 9);
    const mockLink = `${window.location.origin}/event/${mockEventId}`;
    setEventLink(mockLink);
    
    // For QR code, we'll use a placeholder service or generate it client-side
    // Using a QR code API service for now (you can replace with actual QR generation)
    setQrCodeUrl(`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(mockLink)}`);
    
    setSubmitted(true);
  };

  if (submitted) {
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
                  className="text-xs sm:text-sm lg:text-base font-medium text-black transition-colors hover:text-deep-green whitespace-nowrap px-2 sm:px-0"
                >
                  Go to Dashboard
                </Link>
              </div>
            </nav>

            {/* Success State */}
            <div className="flex flex-col justify-center px-4 py-8 sm:px-6 lg:px-12 sm:py-12 lg:py-16">
              <div className="mx-auto w-full max-w-2xl text-center">
                <div className="inline-flex justify-center items-center mb-4 w-16 h-16 rounded-full bg-emerald/10 text-emerald">
                  <CheckIcon className="w-8 h-8" />
                </div>
                
                <h1 className="mb-3 text-3xl font-bold text-black sm:text-4xl lg:text-5xl sm:mb-4">
                  Event Created!
                </h1>
                
                <p className="mb-8 text-base leading-relaxed sm:text-lg text-black/70 sm:mb-10">
                  Your event is ready. Share the QR code or link with your guests to start collecting photos.
                </p>

                {/* QR Code and Link Section */}
                <div className="grid gap-8 sm:grid-cols-2 mb-8 sm:mb-10">
                  {/* QR Code */}
                  <div className="p-6 rounded-2xl bg-white border-2 border-black/5">
                    <h3 className="mb-4 text-lg font-semibold text-black">QR Code</h3>
                    <div className="flex justify-center mb-4">
                      <div className="p-4 bg-white rounded-xl border border-black/10">
                        {qrCodeUrl ? (
                          <img 
                            src={qrCodeUrl} 
                            alt="Event QR Code" 
                            className="w-48 h-48 sm:w-56 sm:h-56"
                          />
                        ) : (
                          <div className="w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center bg-gray-100 rounded-xl">
                            <QrCodeIcon className="w-24 h-24 text-gray-400" />
                          </div>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-black/60">Display at your venue for easy scanning</p>
                  </div>

                  {/* Event Link */}
                  <div className="p-6 rounded-2xl bg-white border-2 border-black/5">
                    <h3 className="mb-4 text-lg font-semibold text-black">Shareable Link</h3>
                    <div className="mb-4 p-4 rounded-xl bg-cream border border-black/10 break-all">
                      <p className="text-sm sm:text-base text-black/70 font-mono">{eventLink}</p>
                    </div>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(eventLink);
                        // You could add a toast notification here
                      }}
                      className="w-full px-4 py-2 text-sm font-medium text-white rounded-xl transition-colors bg-deep-green hover:bg-deep-green-dark"
                    >
                      Copy Link
                    </button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    to="/dashboard"
                    className="px-6 py-3 text-base font-semibold text-white rounded-xl transition-colors sm:py-4 bg-deep-green sm:text-lg hover:bg-deep-green-dark focus:outline-none focus:ring-2 focus:ring-deep-green focus:ring-offset-2"
                  >
                    View Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        description: '',
                        date: '',
                        password: '',
                        coverPhoto: null,
                        usePassword: false,
                      });
                      setPreviewUrl(null);
                    }}
                    className="px-6 py-3 text-base font-semibold text-black rounded-xl transition-colors sm:py-4 border-2 border-black/10 sm:text-lg hover:bg-cream-dark"
                  >
                    Create Another Event
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
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
                className="text-xs sm:text-sm lg:text-base font-medium text-black transition-colors hover:text-deep-green whitespace-nowrap px-2 sm:px-0"
              >
                Dashboard
              </Link>
            </div>
          </nav>

          {/* Main Content */}
          <div className="px-4 py-8 sm:px-6 lg:px-12 sm:py-12 lg:py-16">
            <div className="mx-auto w-full max-w-3xl">
              {/* Header */}
              <div className="mb-8 text-center sm:mb-10 lg:mb-12">
                <h1 className="mb-3 text-3xl font-bold text-black sm:text-4xl lg:text-5xl sm:mb-4">
                  Create New Event
                </h1>
                <p className="text-base sm:text-lg text-black/70">
                  Set up your event and get a unique QR code for photo sharing
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
                {/* Event Name */}
                <div>
                  <label htmlFor="name" className="block mb-2 text-sm font-medium text-black sm:text-base">
                    Event Name <span className="text-deep-green">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g., Sarah & John's Wedding"
                    className="px-4 py-3 w-full text-black bg-white rounded-xl border transition-all border-black/10 placeholder-black/40 focus:outline-none focus:ring-2 focus:ring-deep-green focus:border-transparent"
                  />
                </div>

                {/* Description */}
                <div>
                  <label htmlFor="description" className="block mb-2 text-sm font-medium text-black sm:text-base">
                    Event Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows="4"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Share details about your event..."
                    className="px-4 py-3 w-full text-black bg-white rounded-xl border transition-all resize-none border-black/10 placeholder-black/40 focus:outline-none focus:ring-2 focus:ring-deep-green focus:border-transparent"
                  />
                  <p className="mt-2 text-xs sm:text-sm text-black/50">This will be visible to all guests</p>
                </div>

                {/* Event Date */}
                <div>
                  <label htmlFor="date" className="block mb-2 text-sm font-medium text-black sm:text-base">
                    Event Date <span className="text-deep-green">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                      <CalendarIcon className="w-5 h-5 text-black/40" />
                    </div>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      required
                      value={formData.date}
                      onChange={handleChange}
                      className="px-4 py-3 w-full pl-12 text-black bg-white rounded-xl border transition-all border-black/10 focus:outline-none focus:ring-2 focus:ring-deep-green focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Cover Photo */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-black sm:text-base">
                    Cover Photo <span className="text-black/50">(Optional)</span>
                  </label>
                  <div className="mt-2">
                    {previewUrl ? (
                      <div className="relative rounded-xl overflow-hidden">
                        <img
                          src={previewUrl}
                          alt="Cover preview"
                          className="w-full h-48 sm:h-64 object-cover rounded-xl border-2 border-black/10"
                        />
                        <button
                          type="button"
                          onClick={handleRemovePhoto}
                          className="absolute top-3 right-3 px-3 py-2 text-sm font-medium text-white rounded-lg transition-colors bg-red-600 hover:bg-red-700"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <label className="flex flex-col items-center justify-center w-full h-48 sm:h-64 border-2 border-dashed rounded-xl border-black/20 cursor-pointer hover:border-deep-green transition-colors bg-white/50">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <PhotoIcon className="w-10 h-10 sm:w-12 sm:h-12 text-black/40 mb-3" />
                          <p className="mb-2 text-sm sm:text-base text-black/70">
                            <span className="font-semibold">Click to upload</span> or drag and drop
                          </p>
                          <p className="text-xs sm:text-sm text-black/50">PNG, JPG up to 10MB</p>
                        </div>
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={handleFileChange}
                        />
                      </label>
                    )}
                  </div>
                </div>

                {/* Optional Password Toggle */}
                <div>
                  <div className="flex items-start space-x-3">
                    <input
                      id="usePassword"
                      name="usePassword"
                      type="checkbox"
                      checked={formData.usePassword}
                      onChange={handleChange}
                      className="mt-1 w-4 h-4 rounded border-black/20 text-deep-green focus:ring-2 focus:ring-deep-green focus:ring-offset-0"
                    />
                    <label htmlFor="usePassword" className="text-sm sm:text-base text-black/70">
                      Require password for guests to upload photos
                    </label>
                  </div>
                </div>

                {/* Password Input (shown when toggle is on) */}
                {formData.usePassword && (
                  <div>
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-black sm:text-base">
                      Event Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                        <LockClosedIcon className="w-5 h-5 text-black/40" />
                      </div>
                      <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter password for guests"
                        className="px-4 py-3 w-full pl-12 text-black bg-white rounded-xl border transition-all border-black/10 placeholder-black/40 focus:outline-none focus:ring-2 focus:ring-deep-green focus:border-transparent"
                      />
                    </div>
                    <p className="mt-2 text-xs sm:text-sm text-black/50">Guests will need this password to upload photos</p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <Link
                    to="/dashboard"
                    className="flex-1 px-6 py-3 text-base font-semibold text-black rounded-xl transition-colors text-center border-2 border-black/10 sm:text-lg hover:bg-cream-dark"
                  >
                    Cancel
                  </Link>
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 text-base font-semibold text-white rounded-xl transition-colors sm:text-lg bg-deep-green hover:bg-deep-green-dark focus:outline-none focus:ring-2 focus:ring-deep-green focus:ring-offset-2"
                  >
                    Create Event
                  </button>
                </div>
              </form>

              {/* Info Box */}
              <div className="mt-8 p-6 rounded-xl bg-emerald/5 border border-emerald/20">
                <h3 className="mb-4 text-lg font-semibold text-black">What happens next?</h3>
                <ul className="space-y-3 text-sm sm:text-base text-black/70">
                  <li className="flex items-start">
                    <CheckIcon className="w-5 h-5 text-emerald flex-shrink-0 mt-0.5 mr-3" />
                    <span>You'll get a unique QR code and shareable link</span>
                  </li>
                  <li className="flex items-start">
                    <CheckIcon className="w-5 h-5 text-emerald flex-shrink-0 mt-0.5 mr-3" />
                    <span>Display the QR code at your event venue</span>
                  </li>
                  <li className="flex items-start">
                    <CheckIcon className="w-5 h-5 text-emerald flex-shrink-0 mt-0.5 mr-3" />
                    <span>Guests scan to upload photos instantly</span>
                  </li>
                  <li className="flex items-start">
                    <CheckIcon className="w-5 h-5 text-emerald flex-shrink-0 mt-0.5 mr-3" />
                    <span>View, moderate, and download all photos from your dashboard</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

