import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { EnvelopeIcon, InformationCircleIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { sendEmailVerification, checkEmailVerification } from '../services/api';
export default function VerifyEmail() {
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState(location.state?.email || 'user@example.com');
  const [resendCooldown, setResendCooldown] = useState(0);
  const [isChecking, setIsChecking] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);
  const [error, setError] = useState('');
  // Countdown timer for resend button
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);
  const handleResend = async () => {
    if (resendCooldown > 0) return;
    setError('');
    setResendSuccess(false);
    try {
      await sendEmailVerification(email);
      setResendSuccess(true);
      setResendCooldown(60); // 60 seconds cooldown
      setTimeout(() => setResendSuccess(false), 5000); // Hide success message after 5 seconds
    } catch (err) {
      setError(err.message || 'Failed to send verification email. Please try again.');
    }
  };
  const handleCheckVerification = async () => {
    setIsChecking(true);
    setError('');
    try {
      const isVerified = await checkEmailVerification();
      if (isVerified) {
        // Email is verified, redirect to home
        navigate('/');
      } else {
        setError('Email is not yet verified. Please click the link in your email.');
      }
    } catch (err) {
      setError(err.message || 'Failed to check verification status. Please try again.');
    } finally {
      setIsChecking(false);
    }
  };
  return (
    <div className="min-h-screen bg-deep-green">
      <div className="px-4 py-4 mx-auto max-w-7xl sm:px-6 lg:px-8 sm:py-6 lg:py-12">
        {/* Cream Content Area with Rounded Corners */}
        <div className="overflow-hidden rounded-2xl bg-cream sm:rounded-3xl">
          {/* Header Navigation */}
          <nav className="px-4 py-4 border-b sm:px-6 lg:px-12 sm:py-6 border-cream-dark/20">
            <div className="flex justify-between items-center">
              <Link to="/" className="text-xl font-bold text-black sm:text-2xl">
                PhotoLog
              </Link>
              <Link
                to="/signin"
                className="text-sm font-medium text-black transition-colors sm:text-base hover:text-deep-green"
              >
                Sign In
              </Link>
            </div>
          </nav>
          {/* Main Content */}
          <div className="flex flex-col justify-center px-4 py-8 sm:px-6 lg:px-12 sm:py-12 lg:py-16">
            <div className="mx-auto w-full max-w-md">
              <div className="mb-6 text-center sm:mb-8">
                <div className="inline-flex justify-center items-center mb-4 w-16 h-16 rounded-full bg-emerald/10 text-emerald">
                  <EnvelopeIcon className="w-8 h-8" />
                </div>
                <h1 className="mb-3 text-3xl font-bold text-black sm:text-4xl lg:text-5xl sm:mb-4">
                  Verify Your Email
                </h1>
                <p className="text-base sm:text-lg text-black/70">
                  We've sent a verification link to
                </p>
                <p className="mt-2 text-base font-semibold text-black sm:text-lg">
                  {email}
                </p>
              </div>
              {/* Success Message */}
              {resendSuccess && (
                <div className="p-4 mb-6 rounded-xl border bg-emerald/10 border-emerald/30">
                  <div className="flex items-center space-x-3">
                    <CheckCircleIcon className="flex-shrink-0 w-5 h-5 text-emerald" />
                    <p className="text-sm font-medium text-emerald sm:text-base">
                      Verification email sent! Please check your inbox.
                    </p>
                  </div>
                </div>
              )}
              {/* Error Message */}
              {error && (
                <div className="p-4 mb-6 rounded-xl border bg-red-50 border-red-200">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}
              {/* Instructions */}
              <div className="p-4 mb-6 rounded-xl border bg-emerald/5 border-emerald/20">
                <div className="flex items-start space-x-3">
                  <InformationCircleIcon className="flex-shrink-0 mt-0.5 w-5 h-5 text-emerald" />
                  <div className="text-sm text-black/70">
                    <p className="mb-1 font-medium text-black">What to do next:</p>
                    <ol className="pl-5 space-y-1 list-decimal">
                      <li>Check your email inbox for a verification link</li>
                      <li>Click the link in the email to verify your account</li>
                      <li>Return here and click "I've verified my email" below</li>
                    </ol>
                  </div>
                </div>
              </div>
              {/* Check Verification Button */}
              <button
                type="button"
                onClick={handleCheckVerification}
                disabled={isChecking}
                className="px-6 py-3 w-full mb-4 text-base font-semibold text-white rounded-xl transition-colors sm:py-4 bg-deep-green sm:text-lg hover:bg-deep-green-dark focus:outline-none focus:ring-2 focus:ring-deep-green focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isChecking ? 'Checking...' : "I've verified my email"}
              </button>
              {/* Resend Email */}
              <div className="mt-6 text-center sm:mt-8">
                <p className="mb-4 text-sm text-black/60 sm:text-base">
                  Didn't receive the email?
                </p>
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={resendCooldown > 0}
                  className="text-sm font-medium transition-colors sm:text-base text-deep-green hover:text-emerald disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {resendCooldown > 0
                    ? `Resend email in ${resendCooldown}s`
                    : 'Resend verification email'}
                </button>
              </div>
              {/* Help Text */}
              <div className="p-4 mt-6 rounded-xl border bg-emerald/5 border-emerald/20">
                <div className="flex items-start space-x-3">
                  <InformationCircleIcon className="flex-shrink-0 mt-0.5 w-5 h-5 text-emerald" />
                  <div className="text-sm text-black/70">
                    <p className="mb-1 font-medium text-black">Troubleshooting</p>
                    <ul className="pl-5 space-y-1 list-disc">
                      <li>Check your spam or junk folder</li>
                      <li>Make sure you're checking the correct email address</li>
                      <li>The verification link expires after 3 days</li>
                      <li>If you still don't see it, try resending the email</li>
                    </ul>
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
