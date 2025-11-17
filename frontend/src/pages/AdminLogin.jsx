import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  EnvelopeIcon, 
  LockClosedIcon, 
  ShieldCheckIcon 
} from '@heroicons/react/24/outline';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Admin login submitted', formData);
    // In real app, handle authentication here
    // For now, navigate to dashboard on submit
    navigate('/admin/dashboard');
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="min-h-screen bg-deep-green">
      <div className="px-4 py-4 mx-auto max-w-7xl sm:px-6 lg:px-8 sm:py-6 lg:py-12">
        <div className="overflow-hidden mx-auto max-w-2xl rounded-2xl bg-cream sm:rounded-3xl">
          {/* Header Navigation */}
          <nav className="px-4 py-3 border-b sm:px-6 sm:py-4 lg:px-12 lg:py-6 border-cream-dark/20">
            <div className="flex gap-2 justify-between items-center sm:gap-4">
              <Link to="/" className="flex-shrink-0 text-lg font-bold text-black sm:text-xl lg:text-2xl">
                PhotoLog
              </Link>
              <Link
                to="/"
                className="px-2 text-xs font-medium text-black whitespace-nowrap transition-colors sm:text-sm lg:text-base hover:text-deep-green sm:px-0"
              >
                Back to Home
              </Link>
            </div>
          </nav>

          {/* Main Content */}
          <div className="px-4 py-8 sm:px-6 lg:px-12 sm:py-12 lg:py-16">
            <div className="mx-auto max-w-md">
              {/* Admin Badge */}
              <div className="flex justify-center mb-6">
                <div className="inline-flex gap-2 items-center px-4 py-2 rounded-xl border border-deep-gold/30 bg-gold/10">
                  <ShieldCheckIcon className="w-5 h-5 text-deep-gold sm:h-6 sm:w-6" />
                  <span className="text-sm font-semibold text-deep-gold sm:text-base">Admin Portal</span>
                </div>
              </div>

              {/* Header */}
              <div className="mb-8 text-center">
                <h1 className="mb-3 text-3xl font-bold text-black sm:text-4xl lg:text-5xl sm:mb-4">
                  Administrator Access
                </h1>
                <p className="text-base text-black/60 sm:text-lg">
                  Authorized personnel only
                </p>
              </div>

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-semibold text-black sm:text-base">
                    Admin Email
                  </label>
                  <div className="relative">
                    <div className="flex absolute inset-y-0 left-0 items-center pl-4 pointer-events-none">
                      <EnvelopeIcon className="w-5 h-5 text-black/40" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="admin@photolog.com"
                      className="w-full rounded-xl border border-black/20 bg-white px-4 py-3 pl-12 text-black placeholder:text-black/40 focus:border-deep-green focus:outline-none focus:ring-2 focus:ring-deep-green/20 sm:py-3.5"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-semibold text-black sm:text-base">
                    Password
                  </label>
                  <div className="relative">
                    <div className="flex absolute inset-y-0 left-0 items-center pl-4 pointer-events-none">
                      <LockClosedIcon className="w-5 h-5 text-black/40" />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className="w-full rounded-xl border border-black/20 bg-white px-4 py-3 pl-12 text-black placeholder:text-black/40 focus:border-deep-green focus:outline-none focus:ring-2 focus:ring-deep-green/20 sm:py-3.5"
                    />
                  </div>
                </div>

                {/* Remember Me */}
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="rememberMe"
                    type="checkbox"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className="w-4 h-4 rounded border-black/20 text-deep-green focus:ring-2 focus:ring-deep-green/20"
                  />
                  <label htmlFor="remember-me" className="block ml-2 text-sm text-black/70 sm:text-base">
                    Remember this device
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full rounded-xl bg-deep-green py-3 px-4 font-medium text-white transition-colors hover:bg-deep-green-dark sm:py-3.5 sm:px-6 sm:text-base"
                >
                  Access Admin Dashboard
                </button>
              </form>

              {/* Security Notice */}
              <div className="mt-8">
                <div className="relative">
                  <div className="flex absolute inset-0 items-center">
                    <div className="w-full border-t border-cream-dark/30"></div>
                  </div>
                  <div className="flex relative justify-center text-sm">
                    <span className="px-2 bg-cream text-black/60">Security Notice</span>
                  </div>
                </div>

                <div className="p-4 mt-6 rounded-xl border border-deep-gold/30 bg-gold/5">
                  <p className="text-xs text-center text-black/70 sm:text-sm">
                    All admin activities are logged and monitored for security purposes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

