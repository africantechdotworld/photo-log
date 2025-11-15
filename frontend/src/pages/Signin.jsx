import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function Signin() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle signin logic here
    console.log('Signin submitted', formData);
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
          <nav className="px-4 py-4 border-b sm:px-6 lg:px-12 sm:py-6 border-cream-dark/20">
            <div className="flex justify-between items-center">
              <Link to="/" className="text-xl font-bold text-black sm:text-2xl">
                PhotoLog
              </Link>
              <div className="flex items-center space-x-2 sm:space-x-4">
                <span className="text-sm sm:text-base text-black/60">
                  Don't have an account?
                </span>
                <Link
                  to="/signup"
                  className="text-sm font-medium text-black transition-colors sm:text-base hover:text-deep-green"
                >
                  Sign Up
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
                    src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                    alt="Welcome back to PhotoLog"
                    className="object-cover w-full h-full"
                  />
                </div>
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t to-transparent rounded-2xl from-deep-green/80 via-deep-green/20 sm:rounded-3xl"></div>
                {/* Text overlay */}
                <div className="absolute right-0 bottom-0 left-0 p-6 sm:p-8 lg:p-10">
                  <h2 className="mb-3 text-2xl font-bold text-white sm:text-3xl lg:text-4xl sm:mb-4">
                    Welcome Back
                  </h2>
                  <p className="text-base leading-relaxed sm:text-lg text-white/90">
                    Continue collecting and sharing event photos with your account.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Side - Signin Form */}
            <div className="flex flex-col justify-center">
              <div className="mx-auto w-full max-w-md">
                <div className="mb-6 sm:mb-8">
                  <h1 className="mb-3 text-3xl font-bold text-black sm:text-4xl lg:text-5xl sm:mb-4">
                    Sign In
                  </h1>
                  <p className="text-base sm:text-lg text-black/70">
                    Enter your credentials to access your account.
                  </p>
                </div>

                <form className="space-y-5 sm:space-y-6" onSubmit={handleSubmit}>
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
                      autoComplete="current-password"
                      required
                      value={formData.password}
                      onChange={handleChange}
                      className="px-4 py-3 w-full text-black bg-white rounded-xl border transition-all border-black/10 placeholder-black/40 focus:outline-none focus:ring-2 focus:ring-deep-green focus:border-transparent"
                      placeholder="••••••••"
                    />
                  </div>

                  {/* Remember Me & Forgot Password */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-start space-x-3">
                      <input
                        id="rememberMe"
                        name="rememberMe"
                        type="checkbox"
                        checked={formData.rememberMe}
                        onChange={handleChange}
                        className="mt-1 w-4 h-4 rounded border-black/20 text-deep-green focus:ring-2 focus:ring-deep-green focus:ring-offset-0"
                      />
                      <label htmlFor="rememberMe" className="text-sm sm:text-base text-black/70">
                        Remember me
                      </label>
                    </div>
                    <div>
                      <Link
                        to="/forgot-password"
                        className="text-sm font-medium transition-colors sm:text-base text-deep-green hover:text-emerald"
                      >
                        Forgot password?
                      </Link>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="px-6 py-3 w-full text-base font-semibold text-white rounded-xl transition-colors sm:py-4 bg-deep-green sm:text-lg hover:bg-deep-green-dark focus:outline-none focus:ring-2 focus:ring-deep-green focus:ring-offset-2"
                  >
                    Sign In
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

                {/* Social Signin Buttons */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <button
                    type="button"
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
                      src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                      alt="Welcome back to PhotoLog"
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

