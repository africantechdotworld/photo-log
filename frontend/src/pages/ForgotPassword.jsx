import { Link } from 'react-router-dom';
import { useState } from 'react';
import { EnvelopeIcon, ArrowLeftIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { sendPasswordReset } from '../services/api';
export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await sendPasswordReset(email);
      setSubmitted(true);
    } catch (err) {
      setError(err.message || 'Failed to send password reset email. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  const handleChange = (e) => {
    setEmail(e.target.value);
  };
  if (submitted) {
    return (
      <div className="min-h-screen bg-deep-green">
        <div className="px-4 py-4 mx-auto max-w-7xl sm:px-6 lg:px-8 sm:py-6 lg:py-12">
          {/* Cream Content Area with Rounded Corners */}
          <div className="overflow-hidden rounded-2xl bg-cream sm:rounded-3xl">
            {/* Header Navigation */}
            <nav className="px-4 py-3 border-b sm:px-6 sm:py-4 lg:px-12 lg:py-6 border-cream-dark/20">
              <div className="flex gap-2 justify-between items-center sm:gap-4">
                <Link to="/" className="flex-shrink-0 text-lg font-bold text-black sm:text-xl lg:text-2xl">
                  PhotoLog
                </Link>
                <Link
                  to="/signin"
                  className="px-2 text-xs font-medium text-black whitespace-nowrap transition-colors sm:text-sm lg:text-base hover:text-deep-green sm:px-0"
                >
                  Sign In
                </Link>
              </div>
            </nav>
            {/* Success State */}
            <div className="flex flex-col justify-center px-4 py-8 sm:px-6 lg:px-12 sm:py-12 lg:py-16">
              <div className="mx-auto w-full max-w-md text-center">
                <div className="inline-flex justify-center items-center mb-4 w-16 h-16 rounded-full bg-emerald/10 text-emerald">
                  <EnvelopeIcon className="w-8 h-8" />
                </div>
                <h1 className="mb-3 text-3xl font-bold text-black sm:text-4xl lg:text-5xl sm:mb-4">
                  Check Your Email
                </h1>
                <p className="mb-6 text-base leading-relaxed sm:text-lg text-black/70 sm:mb-8">
                  We've sent password reset instructions to
                </p>
                <p className="mb-8 text-base font-semibold text-black sm:text-lg sm:mb-10">
                  {email}
                </p>
                <Link
                  to="/signin"
                  className="inline-block px-6 py-3 text-base font-semibold text-white rounded-xl transition-colors sm:py-4 bg-deep-green sm:text-lg hover:bg-deep-green-dark focus:outline-none focus:ring-2 focus:ring-deep-green focus:ring-offset-2"
                >
                  Back to Sign In
                </Link>
                <div className="p-4 mt-6 rounded-xl border bg-emerald/5 border-emerald/20">
                  <p className="text-sm text-black/70">
                    Didn't receive the email? Check your spam folder or try again.
                  </p>
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
        {/* Cream Content Area with Rounded Corners */}
        <div className="overflow-hidden rounded-2xl bg-cream sm:rounded-3xl">
          {/* Header Navigation */}
          <nav className="px-4 py-3 border-b sm:px-6 sm:py-4 lg:px-12 lg:py-6 border-cream-dark/20">
            <div className="flex gap-2 justify-between items-center sm:gap-4">
              <Link to="/" className="flex-shrink-0 text-lg font-bold text-black sm:text-xl lg:text-2xl">
                PhotoLog
              </Link>
              <Link
                to="/signin"
                className="px-2 text-xs font-medium text-black whitespace-nowrap transition-colors sm:text-sm lg:text-base hover:text-deep-green sm:px-0"
              >
                Sign In
              </Link>
            </div>
          </nav>
          {/* Main Content */}
          <div className="flex flex-col justify-center px-4 py-8 sm:px-6 lg:px-12 sm:py-12 lg:py-16">
            <div className="mx-auto w-full max-w-md">
              <div className="mb-6 text-center sm:mb-8">
                <div className="inline-flex justify-center items-center mb-4 w-16 h-16 rounded-full bg-deep-green/10 text-deep-green">
                  <EnvelopeIcon className="w-8 h-8" />
                </div>
                <h1 className="mb-3 text-3xl font-bold text-black sm:text-4xl lg:text-5xl sm:mb-4">
                  Reset Your Password
                </h1>
                <p className="text-base sm:text-lg text-black/70">
                  Enter your email address and we'll send you instructions to reset your password.
                </p>
              </div>
              <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
                {/* Error Message */}
                {error && (
                  <div className="flex items-start p-4 bg-red-50 rounded-xl border border-red-200">
                    <ExclamationTriangleIcon className="flex-shrink-0 w-5 h-5 mt-0.5 text-red-600" />
                    <p className="ml-3 text-sm text-red-800">{error}</p>
                  </div>
                )}
                {/* Email Input */}
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-black sm:text-base">
                    Email Address
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
                      value={email}
                      onChange={handleChange}
                      disabled={loading}
                      className="px-4 py-3 pl-12 w-full text-black bg-white rounded-xl border transition-all border-black/10 placeholder-black/40 focus:outline-none focus:ring-2 focus:ring-deep-green focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>
                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-3 w-full text-base font-semibold text-white rounded-xl transition-colors sm:py-4 bg-deep-green sm:text-lg hover:bg-deep-green-dark focus:outline-none focus:ring-2 focus:ring-deep-green focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Sending...' : 'Send Reset Instructions'}
                </button>
              </form>
              {/* Back to Sign In */}
              <div className="mt-6 text-center sm:mt-8">
                <Link
                  to="/signin"
                  className="inline-flex justify-center items-center text-sm font-medium transition-colors sm:text-base text-deep-green hover:text-emerald"
                >
                  <ArrowLeftIcon className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
                  Back to Sign In
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
