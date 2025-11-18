import { Link, useLocation } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { EnvelopeIcon, InformationCircleIcon } from '@heroicons/react/24/outline';

export default function VerifyEmail() {
  const location = useLocation();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [email, setEmail] = useState(location.state?.email || 'user@example.com');
  const [resendCooldown, setResendCooldown] = useState(0);
  const inputRefs = useRef([]);

  useEffect(() => {
    // Auto-focus first input on mount
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  useEffect(() => {
    // Countdown timer for resend button
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const handleChange = (index, value) => {
    // Only allow digits
    if (value && !/^\d$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace to go to previous input
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
    // Handle arrow keys
    if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1].focus();
    }
    if (e.key === 'ArrowRight' && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').trim();
    const digits = pastedData.replace(/\D/g, '').slice(0, 6);
    
    if (digits.length === 6) {
      const newOtp = digits.split('');
      setOtp(newOtp);
      // Focus last input after paste
      if (inputRefs.current[5]) {
        inputRefs.current[5].focus();
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const otpValue = otp.join('');
    if (otpValue.length === 6) {
      // Handle verification logic here
      console.log('OTP submitted:', otpValue);
    }
  };

  const handleResend = () => {
    if (resendCooldown === 0) {
      // Handle resend logic here
      console.log('Resend verification code');
      setResendCooldown(60); // 60 seconds cooldown
    }
  };

  const isOtpComplete = otp.every(digit => digit !== '');

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
                    Check Your Email
                  </h1>
                  <p className="text-base sm:text-lg text-black/70">
                    We've sent a 6-digit verification code to
                  </p>
                  <p className="mt-2 text-base font-semibold text-black sm:text-lg">
                    {email}
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
                  {/* OTP Input Container */}
                  <div>
                    <label className="block mb-4 text-sm font-medium text-center text-black sm:text-base">
                      Enter Verification Code
                    </label>
                    <div className="flex gap-2 justify-center sm:gap-3">
                      {otp.map((digit, index) => (
                        <input
                          key={index}
                          ref={(el) => (inputRefs.current[index] = el)}
                          type="text"
                          inputMode="numeric"
                          maxLength={1}
                          value={digit}
                          onChange={(e) => handleChange(index, e.target.value)}
                          onKeyDown={(e) => handleKeyDown(index, e)}
                          onPaste={handlePaste}
                          className="w-12 h-12 text-xl font-bold text-center text-black bg-white rounded-xl border-2 transition-all sm:w-14 sm:h-14 sm:text-2xl border-black/10 focus:outline-none focus:ring-2 focus:ring-deep-green focus:border-deep-green"
                          aria-label={`Digit ${index + 1}`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={!isOtpComplete}
                    className="px-6 py-3 w-full text-base font-semibold text-white rounded-xl transition-colors sm:py-4 bg-deep-green sm:text-lg hover:bg-deep-green-dark focus:outline-none focus:ring-2 focus:ring-deep-green focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Verify Email
                  </button>
                </form>

                {/* Resend Code */}
                <div className="mt-6 text-center sm:mt-8">
                  <p className="mb-4 text-sm text-black/60 sm:text-base">
                    Didn't receive the code?
                  </p>
                  <button
                    type="button"
                    onClick={handleResend}
                    disabled={resendCooldown > 0}
                    className="text-sm font-medium transition-colors sm:text-base text-deep-green hover:text-emerald disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {resendCooldown > 0
                      ? `Resend code in ${resendCooldown}s`
                      : 'Resend verification code'}
                  </button>
                </div>

                {/* Help Text */}
                <div className="p-4 mt-6 rounded-xl border bg-emerald/5 border-emerald/20">
                  <div className="flex items-start space-x-3">
                    <InformationCircleIcon className="flex-shrink-0 mt-0.5 w-5 h-5 text-emerald" />
                    <div className="text-sm text-black/70">
                      <p className="mb-1 font-medium text-black">Check your spam folder</p>
                      <p>If you don't see the email, check your spam or junk folder. The code expires in 10 minutes.</p>
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

