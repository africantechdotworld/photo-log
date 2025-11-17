import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { signUp, signInWithGoogle } from '../services/api';

export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: false,
  });

 const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Validate password length
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    if (!formData.terms) {
      setError('You must accept the Terms of Service');
      return;
    }

    setLoading(true);

    try {
      await signUp(formData.email, formData.password, formData.name);
      navigate('/'); // Redirect to home or dashboard
    } catch (err) {
      // Handle Firebase-specific errors
      const message = err.message || 'Failed to create account';
      if (message.includes('email-already-in-use')) {
        setError('Email is already registered');
      } else if (message.includes('weak-password')) {
        setError('Password is too weak');
      } else {
        setError(message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setError('');
    setLoading(true);

    try {
      await signInWithGoogle();
      navigate('/');
    } catch (err) {
      setError(err.message || 'Failed to sign up with Google.');
    } finally {
      setLoading(false);
    }
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
        {/* Cream Content Area with Rounded Corners */}
        <div className="overflow-hidden rounded-2xl bg-cream sm:rounded-3xl">
          {/* Header Navigation */}
          <nav className="px-4 py-3 sm:px-6 sm:py-4 lg:px-12 lg:py-6 border-b border-cream-dark/20">
            <div className="flex justify-between items-center gap-2 sm:gap-4">
              <Link to="/" className="text-lg sm:text-xl lg:text-2xl font-bold text-black flex-shrink-0">
                PhotoLog
              </Link>
              <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
                <span className="hidden sm:inline text-xs sm:text-sm lg:text-base text-black/60 whitespace-nowrap">
                  Already have an account?
                </span>
                <Link
                  to="/signin"
                  className="text-xs sm:text-sm lg:text-base font-medium text-black transition-colors hover:text-deep-green whitespace-nowrap px-2 sm:px-0"
                >
                  Sign In
                </Link>
              </div>
            </div>
          </nav>

          {/* Main Content */}
          <div className="grid gap-8 px-4 py-8 lg:grid-cols-2 sm:gap-12 lg:gap-16 sm:px-6 lg:px-12 sm:py-12 lg:py-16">
            {/* Left Side - Image/Visual */}
            <div className="hidden flex-col justify-center lg:flex">
              <div className="relative">
                <div className="aspect-[4/5] overflow-hidden rounded-2xl sm:rounded-3xl">
                  <img
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                    alt="People sharing photos at an event"
                    className="object-cover w-full h-full"
                  />
                </div>
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t to-transparent rounded-2xl from-deep-green/80 via-deep-green/20 sm:rounded-3xl"></div>
                {/* Text overlay */}
                <div className="absolute right-0 bottom-0 left-0 p-6 sm:p-8 lg:p-10">
                  <h2 className="mb-3 text-2xl font-bold text-white sm:text-3xl lg:text-4xl sm:mb-4">
                    Start Collecting Memories
                  </h2>
                  <p className="text-base leading-relaxed sm:text-lg text-white/90">
                    Join thousands of event hosts who trust PhotoLog to capture and share their special moments.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Side - Signup Form */}
            <div className="flex flex-col justify-center">
              <div className="mx-auto w-full max-w-md">
                <div className="mb-6 sm:mb-8">
                  <h1 className="mb-3 text-3xl font-bold text-black sm:text-4xl lg:text-5xl sm:mb-4">
                    Create Your Account
                  </h1>
                  <p className="text-base sm:text-lg text-black/70">
                    Get started in seconds. No credit card required.
                  </p>
                </div>

                <form className="space-y-5 sm:space-y-6" onSubmit={handleSubmit}>
                  {/* Full Name */}
                  <div>
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-black sm:text-base">
                      Full Name
                    </label>
                    {error && (
                    <div className="p-3 rounded-xl bg-red-50 border border-red-200">
                      <p className="text-sm text-red-700">{error}</p>
                    </div>
                  )}
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="px-4 py-3 w-full text-black bg-white rounded-xl border transition-all border-black/10 placeholder-black/40 focus:outline-none focus:ring-2 focus:ring-deep-green focus:border-transparent"
                      placeholder="John Doe"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-black sm:text-base">
                      Email Address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="px-4 py-3 w-full text-black bg-white rounded-xl border transition-all border-black/10 placeholder-black/40 focus:outline-none focus:ring-2 focus:ring-deep-green focus:border-transparent"
                      placeholder="you@example.com"
                    />
                  </div>

                  {/* Password */}
                  <div>
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-black sm:text-base">
                      Password
                    </label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="new-password"
                      required
                      value={formData.password}
                      onChange={handleChange}
                      className="px-4 py-3 w-full text-black bg-white rounded-xl border transition-all border-black/10 placeholder-black/40 focus:outline-none focus:ring-2 focus:ring-deep-green focus:border-transparent"
                      placeholder="••••••••"
                    />
                    <p className="mt-2 text-xs sm:text-sm text-black/50">
                      Must be at least 8 characters
                    </p>
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-black sm:text-base">
                      Confirm Password
                    </label>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      autoComplete="new-password"
                      required
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="px-4 py-3 w-full text-black bg-white rounded-xl border transition-all border-black/10 placeholder-black/40 focus:outline-none focus:ring-2 focus:ring-deep-green focus:border-transparent"
                      placeholder="••••••••"
                    />
                  </div>

                  {/* Terms Checkbox */}
                  <div className="flex items-start space-x-3">
                    <input
                      id="terms"
                      name="terms"
                      type="checkbox"
                      required
                      checked={formData.terms}
                      onChange={handleChange}
                      className="mt-1 w-4 h-4 rounded border-black/20 text-deep-green focus:ring-2 focus:ring-deep-green focus:ring-offset-0"
                    />
                    <label htmlFor="terms" className="text-sm leading-relaxed sm:text-base text-black/70">
                      I agree to the{' '}
                      <a href="#" className="font-medium transition-colors text-deep-green hover:text-emerald">
                        Terms of Service
                      </a>{' '}
                      and{' '}
                      <a href="#" className="font-medium transition-colors text-deep-green hover:text-emerald">
                        Privacy Policy
                      </a>
                    </label>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-3 w-full text-base font-semibold text-white rounded-xl transition-colors sm:py-4 bg-deep-green sm:text-lg hover:bg-deep-green-dark focus:outline-none focus:ring-2 focus:ring-deep-green focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Creating Account...' : 'Create Account'}
                  </button>
                </form>

                {/* Divider */}
                <div className="relative my-6 sm:my-8">
                  <div className="flex absolute inset-0 items-center">
                    <div className="w-full border-t border-black/10"></div>
                  </div>
                  <div className="flex relative justify-center text-sm">
                    <span className="px-4 bg-cream text-black/50">Or continue with</span>
                  </div>
                </div>

                {/* Social Signup Buttons */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <button
                    type="button"
                    onClick={handleGoogleSignUp}
                    disabled={loading}
                    className="flex justify-center items-center px-4 py-3 text-black bg-white rounded-xl border transition-colors border-black/10 hover:bg-cream-dark"
                  >
                    <svg className="mr-2 w-5 h-5" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    <span className="text-sm font-medium">Google</span>
                  </button>
                  <button
                    type="button"
                    className="flex justify-center items-center px-4 py-3 text-black bg-white rounded-xl border transition-colors border-black/10 hover:bg-cream-dark"
                  >
                    <svg className="mr-2 w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                    </svg>
                    <span className="text-sm font-medium">Apple</span>
                  </button>
                </div>

                {/* Mobile Image - Shown only on mobile */}
                <div className="mt-8 lg:hidden">
                  <div className="aspect-[4/3] overflow-hidden rounded-2xl">
                    <img
                      src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                      alt="People sharing photos at an event"
                      className="object-cover w-full h-full"
                    />
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

