import { Link } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';

export default function VerifyEmail() {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [email, setEmail] = useState('user@example.com'); // This would come from route state or context
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
          <div className="grid gap-8 px-4 py-8 lg:grid-cols-2 sm:gap-12 lg:gap-16 sm:px-6 lg:px-12 sm:py-12 lg:py-16">
            {/* Left Side - Image/Visual */}
            <div className="hidden flex-col justify-center lg:flex">
              <div className="relative">
                <div className="aspect-[4/5] overflow-hidden rounded-2xl sm:rounded-3xl">
                  <img
                    src="https://images.unsplash.com/photo-1596524430615-b46475ddff6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                    alt="Email verification"
                    className="object-cover w-full h-full"
                  />
                </div>
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t to-transparent rounded-2xl from-deep-green/80 via-deep-green/20 sm:rounded-3xl"></div>
                {/* Text overlay */}
                <div className="absolute right-0 bottom-0 left-0 p-6 sm:p-8 lg:p-10">
                  <h2 className="mb-3 text-2xl font-bold text-white sm:text-3xl lg:text-4xl sm:mb-4">
                    Verify Your Email
                  </h2>
                  <p className="text-base leading-relaxed sm:text-lg text-white/90">
                    Check your inbox for a verification code to complete your account setup.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Side - Verification Form */}
            <div className="flex flex-col justify-center">
              <div className="mx-auto w-full max-w-md">
                <div className="mb-6 sm:mb-8 text-center lg:text-left">
                  <div className="inline-flex items-center justify-center lg:justify-start mb-4 w-16 h-16 rounded-full bg-emerald/10 text-emerald">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
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
                    <label className="block mb-4 text-sm font-medium text-black sm:text-base text-center lg:text-left">
                      Enter Verification Code
                    </label>
                    <div className="flex justify-center lg:justify-start gap-2 sm:gap-3">
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
                          className="w-12 h-12 sm:w-14 sm:h-14 text-center text-xl sm:text-2xl font-bold text-black bg-white rounded-xl border-2 border-black/10 focus:outline-none focus:ring-2 focus:ring-deep-green focus:border-deep-green transition-all"
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
                <div className="mt-6 sm:mt-8 text-center">
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
                <div className="mt-6 p-4 rounded-xl bg-emerald/5 border border-emerald/20">
                  <div className="flex items-start space-x-3">
                    <svg className="flex-shrink-0 mt-0.5 w-5 h-5 text-emerald" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div className="text-sm text-black/70">
                      <p className="font-medium mb-1 text-black">Check your spam folder</p>
                      <p>If you don't see the email, check your spam or junk folder. The code expires in 10 minutes.</p>
                    </div>
                  </div>
                </div>

                {/* Mobile Image - Shown only on mobile */}
                <div className="mt-8 lg:hidden">
                  <div className="aspect-[4/3] overflow-hidden rounded-2xl">
                    <img
                      src="https://images.unsplash.com/photo-1596524430615-b46475ddff6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                      alt="Email verification"
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

