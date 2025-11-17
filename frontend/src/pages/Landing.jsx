import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <div className="min-h-screen bg-deep-green">
      {/* Hero Section with Cream Content Area */}
      <div className="px-4 py-4 mx-auto max-w-7xl sm:px-6 lg:px-8 sm:py-6 lg:py-12">
        {/* Cream Content Area with Rounded Corners */}
        <div className="overflow-hidden rounded-2xl bg-cream sm:rounded-3xl">
          {/* Header Navigation */}
          <nav className="px-4 py-4 border-b sm:px-6 lg:px-12 sm:py-6 border-cream-dark/20">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <span className="text-xl font-bold text-black sm:text-2xl">
                  PhotoLog
                </span>
              </div>
              <div className="flex items-center space-x-2 sm:space-x-4">
                <Link
                  to="/signin"
                  className="text-sm font-medium text-black transition-colors sm:text-base hover:text-deep-green"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg border border-black text-black bg-cream hover:bg-cream-dark transition-colors text-sm sm:text-base"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </nav>

          {/* Hero Content */}
          <div className="grid gap-6 px-4 py-8 lg:grid-cols-2 sm:gap-8 lg:gap-12 sm:px-6 lg:px-12 sm:py-12 lg:py-16">
            {/* Left Side - Hero Text */}
            <div className="flex flex-col order-2 justify-center lg:order-1">
              <h1 className="mb-4 text-3xl font-bold leading-tight text-black sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl sm:mb-6">
                Share Event Photos
                <br />
                Instantly with
                <br />
                QR Code
              </h1>
              
              <p className="mb-6 text-base leading-relaxed text-black sm:text-lg lg:text-xl sm:mb-8 lg:mb-10">
                Create a shared photo gallery for your
                event in seconds. Guests scan your QR code
                and upload photos instantly—no app or
                signup required.
              </p>
              
              <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
                <Link
                  to="/signup"
                  className="px-6 py-3 text-base font-semibold text-center text-white rounded-lg transition-colors sm:px-8 sm:py-4 bg-deep-green sm:text-lg hover:bg-deep-green-dark"
                >
                  Create Your Event
                </Link>
                <button className="px-6 py-3 text-base font-semibold text-black rounded-lg border border-black transition-colors sm:px-8 sm:py-4 bg-cream hover:bg-cream-dark sm:text-lg">
                  Watch Demo
                </button>
              </div>
            </div>

            {/* Right Side - Image Grid */}
            <div className="grid order-1 grid-cols-2 gap-3 sm:gap-4 lg:order-2">
              {/* Top Left - Waiters with champagne */}
              <div className="overflow-hidden rounded-lg aspect-square sm:rounded-xl">
                <img
                  src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                  alt="Event staff serving champagne"
                  className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                />
              </div>
              
              {/* Top Right - Decorated entrance */}
              <div className="overflow-hidden rounded-lg aspect-square sm:rounded-xl">
                <img
                  src="https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                  alt="Decorated event entrance"
                  className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                />
              </div>
              
              {/* Bottom Left - Bride and groom at archway */}
              <div className="overflow-hidden rounded-lg aspect-square sm:rounded-xl">
                <img
                  src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                  alt="Wedding couple at archway"
                  className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                />
              </div>
              
              {/* Bottom Right - Outdoor dining event */}
              <div className="overflow-hidden rounded-lg aspect-square sm:rounded-xl">
                <img
                  src="https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                  alt="Outdoor event dining"
                  className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <section className="py-24 bg-cream">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mb-12 text-center sm:mb-16 lg:mb-20">
            <h2 className="mb-3 text-3xl font-bold text-black sm:text-4xl md:text-5xl lg:text-6xl sm:mb-4">
              How It Works
            </h2>
            <p className="px-4 mx-auto max-w-2xl text-base sm:text-lg lg:text-xl text-black/70">
              Three simple steps to collect all your event photos
            </p>
          </div>

          {/* Step 1: Create Event */}
          <div className="mb-16 sm:mb-24 lg:mb-32">
            <div className="grid gap-6 items-center lg:grid-cols-2 sm:gap-8 lg:gap-12">
              <div className="order-2 lg:order-1">
                <div className="aspect-[4/3] overflow-hidden rounded-xl sm:rounded-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                    alt="Creating event on PhotoLog"
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
              <div className="flex flex-col order-1 justify-center lg:order-2">
                <div className="inline-flex items-center mb-4 space-x-2 sm:space-x-3 sm:mb-6">
                  <span className="text-4xl font-bold sm:text-5xl lg:text-6xl text-deep-green">01</span>
                  <div className="w-12 h-px sm:w-16 bg-deep-green"></div>
                </div>
                <h3 className="mb-4 text-2xl font-bold text-black sm:text-3xl md:text-4xl lg:text-5xl sm:mb-6">
                  Create Your Event
                </h3>
                <p className="mb-6 text-base leading-relaxed sm:text-lg lg:text-xl text-black/70 sm:mb-8">
                  Sign up and create your event in under a minute. Add event details, set a password if needed, and customize your gallery.
                </p>
              </div>
            </div>
          </div>

          {/* Step 2: Share QR Code */}
          <div className="mb-16 sm:mb-24 lg:mb-32">
            <div className="grid gap-6 items-center lg:grid-cols-2 sm:gap-8 lg:gap-12">
              <div className="flex flex-col justify-center">
                <div className="inline-flex items-center mb-4 space-x-2 sm:space-x-3 sm:mb-6">
                  <span className="text-4xl font-bold sm:text-5xl lg:text-6xl text-deep-green">02</span>
                  <div className="w-12 h-px sm:w-16 bg-deep-green"></div>
                </div>
                <h3 className="mb-4 text-2xl font-bold text-black sm:text-3xl md:text-4xl lg:text-5xl sm:mb-6">
                  Share Your QR Code
                </h3>
                <p className="mb-6 text-base leading-relaxed sm:text-lg lg:text-xl text-black/70 sm:mb-8">
                  Get your unique QR code and shareable link instantly. Display it at your venue or share digitally with your guests.
                </p>
              </div>
              <div className="aspect-[4/3] overflow-hidden rounded-xl sm:rounded-2xl">
                <img
                  src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                  alt="QR code display at event"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>

          {/* Step 3: Collect Photos */}
          <div>
            <div className="grid gap-6 items-center lg:grid-cols-2 sm:gap-8 lg:gap-12">
              <div className="order-2 lg:order-1">
                <div className="aspect-[4/3] overflow-hidden rounded-xl sm:rounded-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                    alt="Guests uploading photos"
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
              <div className="flex flex-col order-1 justify-center lg:order-2">
                <div className="inline-flex items-center mb-4 space-x-2 sm:space-x-3 sm:mb-6">
                  <span className="text-4xl font-bold sm:text-5xl lg:text-6xl text-deep-green">03</span>
                  <div className="w-12 h-px sm:w-16 bg-deep-green"></div>
                </div>
                <h3 className="mb-4 text-2xl font-bold text-black sm:text-3xl md:text-4xl lg:text-5xl sm:mb-6">
                  Collect Photos Instantly
                </h3>
                <p className="mb-6 text-base leading-relaxed sm:text-lg lg:text-xl text-black/70 sm:mb-8">
                  Guests scan and upload photos instantly from their phones. You moderate, download, and keep all the memories in one place.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-12 sm:py-16 lg:py-24 bg-deep-green">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mb-12 text-center sm:mb-16 lg:mb-20">
            <h2 className="mb-3 text-3xl font-bold text-white sm:text-4xl md:text-5xl lg:text-6xl sm:mb-4">
              Why PhotoLog
            </h2>
            <p className="px-4 mx-auto max-w-2xl text-base sm:text-lg lg:text-xl text-white/80">
              Everything you need to collect and manage event photos effortlessly
            </p>
          </div>

          {/* Feature 1: Full-width image with overlay text */}
          <div className="relative mb-16 sm:mb-24 lg:mb-32">
            <div className="aspect-[4/3] sm:aspect-[21/9] overflow-hidden rounded-2xl sm:rounded-3xl">
              <img
                src="https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
                alt="Phone scanning QR code"
                className="object-cover w-full h-full"
              />
            </div>
            <div className="flex absolute inset-0 items-end bg-gradient-to-b to-transparent rounded-2xl sm:bg-gradient-to-r from-deep-green via-deep-green/90 sm:via-deep-green/80 sm:items-center sm:rounded-3xl">
              <div className="px-4 py-6 max-w-2xl sm:px-6 lg:px-12 sm:py-8 lg:py-12">
                <h3 className="mb-3 text-2xl font-bold text-white sm:text-3xl md:text-4xl lg:text-5xl sm:mb-4 lg:mb-6">
                  No App Required
                </h3>
                <p className="mb-3 text-base leading-relaxed sm:text-lg lg:text-xl text-white/90 sm:mb-4">
                  Guests simply scan your QR code and upload photos directly from their phone's browser. No downloads, no signups, no hassle.
                </p>
                <span className="text-xs tracking-wider uppercase sm:text-sm text-white/70">Instant Access</span>
              </div>
            </div>
          </div>

          {/* Feature 2: Centered text with side-by-side images */}
          <div className="mb-16 sm:mb-24 lg:mb-32">
            <div className="px-4 mx-auto mb-8 max-w-3xl text-center sm:mb-10 lg:mb-12">
              <h3 className="mb-4 text-2xl font-bold text-white sm:text-3xl md:text-4xl lg:text-5xl sm:mb-5 lg:mb-6">
                Full Control
              </h3>
              <p className="mb-6 text-base leading-relaxed sm:text-lg lg:text-xl text-white/80 sm:mb-8">
                Moderate every photo before it goes live. Delete unwanted images, download everything as a ZIP, or remove your event entirely—you're in complete control.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
              <div className="aspect-[4/3] overflow-hidden rounded-xl">
                <img
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                  alt="Dashboard with photo management"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="aspect-[4/3] overflow-hidden rounded-xl">
                <img
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                  alt="Photo moderation interface"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
            <div className="mt-6 text-center sm:mt-8">
              <span className="text-xs tracking-wider uppercase sm:text-sm text-white/60">Your Gallery, Your Rules</span>
            </div>
          </div>

          {/* Feature 3: Split screen with gradient */}
          <div className="grid overflow-hidden gap-0 rounded-2xl lg:grid-cols-2 sm:rounded-3xl">
            <div className="aspect-[4/3] sm:aspect-[3/4] lg:aspect-auto lg:min-h-[500px] overflow-hidden order-2 lg:order-1">
              <img
                src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                alt="Secure event gallery"
                className="object-cover w-full h-full"
              />
            </div>
            <div className="flex flex-col order-1 justify-center px-6 py-12 bg-gradient-to-br from-teal-brown to-deep-green sm:px-8 lg:px-12 sm:py-14 lg:py-16 lg:order-2">
              <h3 className="mb-4 text-2xl font-bold text-white sm:text-3xl md:text-4xl lg:text-5xl sm:mb-5 lg:mb-6">
                Privacy First
              </h3>
              <p className="mb-6 text-base leading-relaxed sm:text-lg lg:text-xl text-white/90 sm:mb-7 lg:mb-8">
                Optional password protection keeps your gallery secure. Only people with your QR code or link can access and upload photos.
              </p>
              <div className="flex items-center space-x-2 text-white/70">
                <div className="w-8 h-px sm:w-12 bg-white/40"></div>
                <span className="text-xs tracking-wider uppercase sm:text-sm">Secure & Private</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-12 bg-white sm:py-16 lg:py-24">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mb-12 text-center sm:mb-16 lg:mb-20">
            <h2 className="mb-3 text-3xl font-bold text-black sm:text-4xl md:text-5xl lg:text-6xl sm:mb-4">
              Perfect for Every Event
            </h2>
            <p className="px-4 mx-auto max-w-2xl text-base sm:text-lg lg:text-xl text-black/70">
              From intimate gatherings to grand celebrations, PhotoLog works for any occasion
            </p>
          </div>

          {/* Event Type 1: Weddings */}
          <div className="mb-12 sm:mb-14 lg:mb-16">
            <div className="grid gap-6 items-center lg:grid-cols-5 sm:gap-8">
              <div className="order-2 lg:col-span-3 lg:order-1">
                <div className="aspect-[4/3] sm:aspect-[16/10] overflow-hidden rounded-2xl sm:rounded-3xl">
                  <img
                    src="https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80"
                    alt="Wedding celebration"
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
              <div className="flex flex-col order-1 justify-center px-4 lg:col-span-2 lg:order-2 sm:px-6 lg:px-8">
                <h3 className="mb-3 text-2xl font-bold text-black sm:text-3xl md:text-4xl lg:text-5xl sm:mb-4">
                  Weddings
                </h3>
                <p className="mb-4 text-base leading-relaxed sm:text-lg text-black/70 sm:mb-6">
                  Collect all the special moments from your big day. Guests share their favorite shots instantly, giving you memories from every angle.
                </p>
                <span className="text-xs font-medium tracking-wider uppercase sm:text-sm text-deep-green">Share the Love</span>
              </div>
            </div>
          </div>

          {/* Event Type 2: Corporate Events */}
          <div className="mb-12 sm:mb-14 lg:mb-16">
            <div className="grid gap-6 items-center lg:grid-cols-5 sm:gap-8">
              <div className="flex flex-col order-1 justify-center px-4 text-left lg:col-span-2 lg:order-1 sm:px-6 lg:px-8 lg:text-right">
                <h3 className="mb-3 text-2xl font-bold text-black sm:text-3xl md:text-4xl lg:text-5xl sm:mb-4">
                  Corporate Events
                </h3>
                <p className="mb-4 text-base leading-relaxed sm:text-lg text-black/70 sm:mb-6">
                  Capture networking moments, presentations, and team celebrations. Professional galleries for professional gatherings.
                </p>
                <span className="inline-block text-xs font-medium tracking-wider uppercase sm:text-sm text-teal-brown">Professional Network</span>
              </div>
              <div className="order-2 lg:col-span-3 lg:order-2">
                <div className="aspect-[4/3] sm:aspect-[16/10] overflow-hidden rounded-2xl sm:rounded-3xl">
                  <img
                    src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80"
                    alt="Corporate event"
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Event Type 3: Birthday Celebrations */}
          <div className="mb-12 sm:mb-14 lg:mb-16">
            <div className="grid gap-6 items-center lg:grid-cols-5 sm:gap-8">
              <div className="order-2 lg:col-span-3 lg:order-1">
                <div className="aspect-[4/3] sm:aspect-[16/10] overflow-hidden rounded-2xl sm:rounded-3xl">
                  <img
                    src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80"
                    alt="Birthday party"
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
              <div className="flex flex-col order-1 justify-center px-4 lg:col-span-2 lg:order-2 sm:px-6 lg:px-8">
                <h3 className="mb-3 text-2xl font-bold text-black sm:text-3xl md:text-4xl lg:text-5xl sm:mb-4">
                  Birthdays
                </h3>
                <p className="mb-4 text-base leading-relaxed sm:text-lg text-black/70 sm:mb-6">
                  Make every birthday memorable. Friends and family share their favorite moments from the celebration in one beautiful gallery.
                </p>
                <span className="text-xs font-medium tracking-wider uppercase sm:text-sm text-accent-pink">Celebrate Together</span>
              </div>
            </div>
          </div>

          {/* Event Type 4: Conferences */}
          <div>
            <div className="grid gap-6 items-center lg:grid-cols-5 sm:gap-8">
              <div className="flex flex-col order-1 justify-center px-4 text-left lg:col-span-2 lg:order-1 sm:px-6 lg:px-8 lg:text-right">
                <h3 className="mb-3 text-2xl font-bold text-black sm:text-3xl md:text-4xl lg:text-5xl sm:mb-4">
                  Conferences
                </h3>
                <p className="mb-4 text-base leading-relaxed sm:text-lg text-black/70 sm:mb-6">
                  Document sessions, keynotes, and networking. Participants share insights and connections from across the event.
                </p>
                <span className="inline-block text-xs font-medium tracking-wider uppercase sm:text-sm text-deep-gold">Connect & Share</span>
              </div>
              <div className="order-2 lg:col-span-3 lg:order-2">
                <div className="aspect-[4/3] sm:aspect-[16/10] overflow-hidden rounded-2xl sm:rounded-3xl">
                  <img
                    src="https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80"
                    alt="Tech conference"
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof & Stats Section */}
      <section className="overflow-hidden relative py-12 bg-gradient-to-br sm:py-16 lg:py-32 from-cream via-cream-light to-cream">
        {/* Background decorative element */}
        <div className="absolute top-0 right-0 w-48 h-48 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2 sm:w-64 lg:w-96 sm:h-64 lg:h-96 bg-deep-green/5"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2 sm:w-64 lg:w-96 sm:h-64 lg:h-96 bg-emerald/5"></div>
        
        <div className="relative z-10 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4 mb-12 lg:grid-cols-4 sm:gap-6 lg:gap-12 sm:mb-16 lg:mb-24">
            <div className="text-center lg:text-left">
              <div className="mb-2 text-3xl font-bold sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-deep-green sm:mb-3">
                10K+
              </div>
              <div className="text-sm font-medium sm:text-base lg:text-lg text-black/70">
                Events Created
              </div>
            </div>
            <div className="text-center lg:text-left">
              <div className="mb-2 text-3xl font-bold sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-deep-green sm:mb-3">
                500K+
              </div>
              <div className="text-sm font-medium sm:text-base lg:text-lg text-black/70">
                Photos Shared
              </div>
            </div>
            <div className="text-center lg:text-left">
              <div className="mb-2 text-3xl font-bold sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-deep-green sm:mb-3">
                50K+
              </div>
              <div className="text-sm font-medium sm:text-base lg:text-lg text-black/70">
                Happy Hosts
              </div>
            </div>
            <div className="text-center lg:text-left">
              <div className="mb-2 text-3xl font-bold sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-deep-green sm:mb-3">
                99%
              </div>
              <div className="text-sm font-medium sm:text-base lg:text-lg text-black/70">
                Satisfaction Rate
              </div>
            </div>
          </div>

          {/* Testimonials - Overlapping Cards Style */}
          <div className="relative">
            <div className="mb-10 text-center sm:mb-12 lg:mb-16">
              <h2 className="mb-3 text-3xl font-bold text-black sm:text-4xl md:text-5xl lg:text-6xl sm:mb-4">
                Loved by Event Hosts
              </h2>
              <p className="px-4 mx-auto max-w-2xl text-base sm:text-lg lg:text-xl text-black/70">
                See what people are saying about PhotoLog
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 sm:gap-8 lg:gap-12">
              {/* Testimonial 1 */}
              <div className="p-6 rounded-2xl border backdrop-blur-sm transition-transform duration-300 transform bg-white/80 sm:p-8 sm:rounded-3xl border-black/5 lg:-rotate-2 hover:rotate-0">
                <div className="mb-6">
                  <div className="flex mb-3 space-x-1 sm:mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-gold" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="mb-4 text-base leading-relaxed sm:text-lg text-black/80 sm:mb-6">
                    "PhotoLog made our wedding photo collection effortless. Guests loved how easy it was to upload, and we got so many amazing moments we would have missed otherwise."
                  </p>
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    <div className="overflow-hidden flex-shrink-0 w-10 h-10 bg-gradient-to-br rounded-full sm:w-12 sm:h-12 from-deep-green to-emerald">
                      <img
                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
                        alt="Sarah"
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-black sm:text-base">Sarah Chen</div>
                      <div className="text-xs sm:text-sm text-black/60">Wedding Host</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Testimonial 2 - Offset slightly */}
              <div className="p-6 rounded-2xl border backdrop-blur-sm transition-transform duration-300 transform bg-white/80 sm:p-8 sm:rounded-3xl border-black/5 lg:rotate-1 lg:translate-y-8 hover:rotate-0 hover:translate-y-0">
                <div className="mb-6">
                  <div className="flex mb-3 space-x-1 sm:mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-gold" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="mb-4 text-base leading-relaxed sm:text-lg text-black/80 sm:mb-6">
                    "As an event planner, PhotoLog saves me hours. No more chasing guests for photos or dealing with messy file sharing. It's professional, elegant, and just works."
                  </p>
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    <div className="overflow-hidden flex-shrink-0 w-10 h-10 bg-gradient-to-br rounded-full sm:w-12 sm:h-12 from-teal-brown to-deep-green">
                      <img
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
                        alt="Marcus"
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-black sm:text-base">Marcus Johnson</div>
                      <div className="text-xs sm:text-sm text-black/60">Event Planner</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Testimonial 3 */}
              <div className="p-6 rounded-2xl border backdrop-blur-sm transition-transform duration-300 transform bg-white/80 sm:p-8 sm:rounded-3xl border-black/5 lg:-rotate-1 lg:translate-y-4 hover:rotate-0 hover:translate-y-0 sm:col-span-2 lg:col-span-1">
                <div className="mb-6">
                  <div className="flex mb-3 space-x-1 sm:mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-gold" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="mb-4 text-base leading-relaxed sm:text-lg text-black/80 sm:mb-6">
                    "The QR code feature is brilliant. At our tech conference, attendees scanned and shared photos instantly. We had a complete gallery within hours of the event ending."
                  </p>
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    <div className="overflow-hidden flex-shrink-0 w-10 h-10 bg-gradient-to-br rounded-full sm:w-12 sm:h-12 from-emerald to-deep-green">
                      <img
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
                        alt="David"
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-black sm:text-base">David Park</div>
                      <div className="text-xs sm:text-sm text-black/60">Conference Organizer</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-12 bg-gradient-to-b from-white sm:py-16 lg:py-32 to-cream">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mb-10 text-center sm:mb-16 lg:mb-20">
            <h2 className="mb-3 text-3xl font-bold text-black sm:text-4xl md:text-5xl lg:text-6xl sm:mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="px-4 mx-auto max-w-2xl text-base sm:text-lg lg:text-xl text-black/70">
              Choose the plan that fits your event needs. All plans include instant QR codes and photo sharing.
            </p>
          </div>

          <div className="grid gap-6 mx-auto max-w-6xl sm:grid-cols-2 lg:grid-cols-3 sm:gap-8 lg:gap-12">
            {/* Starter Plan */}
            <div className="relative p-6 bg-white rounded-2xl border-2 sm:rounded-3xl sm:p-8 border-black/5">
              <div className="mb-6 sm:mb-8">
                <h3 className="mb-2 text-xl font-bold text-black sm:text-2xl sm:mb-3">Starter</h3>
                <div className="mb-4 sm:mb-6">
                  <span className="text-4xl font-bold text-black sm:text-5xl">$9</span>
                  <span className="text-lg sm:text-xl text-black/60">/month</span>
                </div>
                <p className="text-sm leading-relaxed sm:text-base text-black/70">
                  Perfect for small events and personal celebrations
                </p>
              </div>

              <div className="mb-8 space-y-4 sm:space-y-6 sm:mb-10">
                <div className="flex items-start space-x-3">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-deep-green flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <div className="text-sm font-semibold text-black sm:text-base">5 Events</div>
                    <div className="text-xs sm:text-sm text-black/60">per month</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-deep-green flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <div className="text-sm font-semibold text-black sm:text-base">1,000 Photos</div>
                    <div className="text-xs sm:text-sm text-black/60">total storage</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-deep-green flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <div className="text-sm font-semibold text-black sm:text-base">10 GB Storage</div>
                    <div className="text-xs sm:text-sm text-black/60">per event</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-deep-green flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <div className="text-sm font-semibold text-black sm:text-base">All Core Features</div>
                    <div className="text-xs sm:text-sm text-black/60">QR codes, moderation, download</div>
                  </div>
                </div>
              </div>

              <Link
                to="/signup"
                className="block px-4 py-3 w-full text-sm font-semibold text-center text-white rounded-xl transition-colors sm:px-6 sm:py-4 bg-deep-green sm:text-base hover:bg-deep-green-dark"
              >
                Get Started
              </Link>
            </div>

            {/* Professional Plan - Featured */}
            <div className="relative p-6 bg-gradient-to-br rounded-2xl border-4 transform from-deep-green to-teal-brown sm:rounded-3xl sm:p-8 border-gold lg:-translate-y-4 lg:scale-105 sm:col-span-2 lg:col-span-1">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 sm:-top-4">
                <span className="bg-gold text-black px-4 sm:px-6 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider">
                  Most Popular
                </span>
              </div>
              
              <div className="mt-3 mb-6 sm:mb-8 sm:mt-4">
                <h3 className="mb-2 text-xl font-bold text-white sm:text-2xl sm:mb-3">Professional</h3>
                <div className="mb-4 sm:mb-6">
                  <span className="text-4xl font-bold text-white sm:text-5xl">$29</span>
                  <span className="text-lg sm:text-xl text-white/80">/month</span>
                </div>
                <p className="text-sm leading-relaxed sm:text-base text-white/90">
                  Ideal for frequent events and business use
                </p>
              </div>

              <div className="mb-8 space-y-4 sm:space-y-6 sm:mb-10">
                <div className="flex items-start space-x-3">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gold flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <div className="text-sm font-semibold text-white sm:text-base">20 Events</div>
                    <div className="text-xs sm:text-sm text-white/80">per month</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gold flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <div className="text-sm font-semibold text-white sm:text-base">10,000 Photos</div>
                    <div className="text-xs sm:text-sm text-white/80">total storage</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gold flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <div className="text-sm font-semibold text-white sm:text-base">50 GB Storage</div>
                    <div className="text-xs sm:text-sm text-white/80">per event</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gold flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <div className="text-sm font-semibold text-white sm:text-base">Priority Support</div>
                    <div className="text-xs sm:text-sm text-white/80">faster response times</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gold flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <div className="text-sm font-semibold text-white sm:text-base">Advanced Analytics</div>
                    <div className="text-xs sm:text-sm text-white/80">insights and reports</div>
                  </div>
                </div>
              </div>

              <Link
                to="/signup"
                className="block px-4 py-3 w-full text-sm font-bold text-center bg-white rounded-xl transition-colors sm:px-6 sm:py-4 text-deep-green sm:text-base hover:bg-cream"
              >
                Get Started
              </Link>
            </div>

            {/* Enterprise Plan */}
            <div className="relative p-6 bg-white rounded-2xl border-2 sm:rounded-3xl sm:p-8 border-black/5 sm:col-span-2 lg:col-span-1">
              <div className="mb-6 sm:mb-8">
                <h3 className="mb-2 text-xl font-bold text-black sm:text-2xl sm:mb-3">Enterprise</h3>
                <div className="mb-4 sm:mb-6">
                  <span className="text-4xl font-bold text-black sm:text-5xl">$99</span>
                  <span className="text-lg sm:text-xl text-black/60">/month</span>
                </div>
                <p className="text-sm leading-relaxed sm:text-base text-black/70">
                  For large organizations and unlimited needs
                </p>
              </div>

              <div className="mb-8 space-y-4 sm:space-y-6 sm:mb-10">
                <div className="flex items-start space-x-3">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-deep-green flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <div className="text-sm font-semibold text-black sm:text-base">Unlimited Events</div>
                    <div className="text-xs sm:text-sm text-black/60">create as many as you need</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-deep-green flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <div className="text-sm font-semibold text-black sm:text-base">Unlimited Photos</div>
                    <div className="text-xs sm:text-sm text-black/60">no storage limits</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-deep-green flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <div className="text-sm font-semibold text-black sm:text-base">500 GB Storage</div>
                    <div className="text-xs sm:text-sm text-black/60">per event</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-deep-green flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <div className="text-sm font-semibold text-black sm:text-base">Dedicated Support</div>
                    <div className="text-xs sm:text-sm text-black/60">24/7 account manager</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-deep-green flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <div className="text-sm font-semibold text-black sm:text-base">Custom Branding</div>
                    <div className="text-xs sm:text-sm text-black/60">white-label options</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-deep-green flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <div className="text-sm font-semibold text-black sm:text-base">API Access</div>
                    <div className="text-xs sm:text-sm text-black/60">integrate with your tools</div>
                  </div>
                </div>
              </div>

              <Link
                to="/signup"
                className="block px-4 py-3 w-full text-sm font-semibold text-center text-white rounded-xl transition-colors sm:px-6 sm:py-4 bg-deep-green sm:text-base hover:bg-deep-green-dark"
              >
                Contact Sales
              </Link>
            </div>
          </div>

          <div className="px-4 mt-8 text-center sm:mt-12">
            <p className="mb-2 text-xs text-black/60 sm:text-sm">
              All plans include a 14-day free trial. No credit card required.
            </p>
            <p className="text-xs text-black/60 sm:text-sm">
              Need custom pricing? <a href="#" className="font-medium text-deep-green hover:text-emerald">Contact us</a>
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="overflow-hidden relative py-16 bg-gradient-to-br sm:py-24 lg:py-32 from-deep-green via-deep-green-dark to-deep-green">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-64 h-64 rounded-full blur-3xl bg-gold"></div>
          <div className="absolute right-20 bottom-20 w-96 h-96 rounded-full blur-3xl bg-emerald"></div>
          <div className="absolute top-1/2 left-1/2 w-80 h-80 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 bg-teal-brown"></div>
        </div>

        <div className="relative z-10 px-4 mx-auto max-w-5xl text-center sm:px-6 lg:px-8">
          <h2 className="mb-8 text-5xl font-bold leading-tight text-white sm:text-6xl lg:text-7xl">
            Ready to Collect
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-deep-gold to-gold">
              Every Moment?
            </span>
          </h2>
          
          <p className="mx-auto mb-12 max-w-3xl text-2xl leading-relaxed text-white/90">
            Create your first event in under a minute. Start collecting photos from your guests instantly—no app required, no hassle.
          </p>

          <div className="flex flex-col gap-6 justify-center items-center mb-12 sm:flex-row">
            <Link
              to="/signup"
              className="px-12 py-5 text-xl font-bold bg-white rounded-xl shadow-2xl transition-all text-deep-green hover:bg-cream hover:scale-105"
            >
              Create Your Event
            </Link>
            <button className="px-12 py-5 text-xl font-bold text-white rounded-xl border-2 backdrop-blur-sm transition-all border-white/30 hover:bg-white/10">
              View Demo
            </button>
          </div>

          <div className="flex flex-wrap gap-8 justify-center items-center text-sm text-white/70">
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-emerald" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>No credit card required</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-emerald" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Free to get started</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-emerald" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Set up in minutes</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-black text-white/70">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid gap-12 mb-12 md:grid-cols-4">
            <div className="md:col-span-2">
              <div className="mb-6">
                <span className="text-2xl font-bold text-white">PhotoLog</span>
              </div>
              <p className="mb-6 max-w-md leading-relaxed text-white/60">
                The simplest way to collect and share event photos. No app, no signup, just instant photo sharing.
              </p>
            </div>
            
            <div>
              <h4 className="mb-4 font-semibold text-white">Product</h4>
              <ul className="space-y-3">
                <li><a href="#" className="transition-colors hover:text-emerald">Features</a></li>
                <li><a href="#" className="transition-colors hover:text-emerald">Pricing</a></li>
                <li><a href="#" className="transition-colors hover:text-emerald">How It Works</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="mb-4 font-semibold text-white">Company</h4>
              <ul className="space-y-3">
                <li><a href="#" className="transition-colors hover:text-emerald">About</a></li>
                <li><a href="#" className="transition-colors hover:text-emerald">Contact</a></li>
                <li><a href="#" className="transition-colors hover:text-emerald">Privacy</a></li>
                <li><a href="#" className="transition-colors hover:text-emerald">Terms</a></li>
              </ul>
            </div>
          </div>
          
          <div className="flex flex-col justify-between items-center pt-8 border-t border-white/10 md:flex-row">
            <div className="mb-4 text-sm text-white/50 md:mb-0">
              © 2025 PhotoLog. All rights reserved.
            </div>
            <div className="flex space-x-6">
              <a href="#" className="transition-colors text-white/50 hover:text-emerald">
                <span className="sr-only">Twitter</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/>
                </svg>
              </a>
              <a href="#" className="transition-colors text-white/50 hover:text-emerald">
                <span className="sr-only">LinkedIn</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd"/>
                </svg>
              </a>
              <a href="#" className="transition-colors text-white/50 hover:text-emerald">
                <span className="sr-only">Instagram</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

