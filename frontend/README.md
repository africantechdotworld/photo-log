# PhotoLog Frontend

A modern, professional photo-sharing platform for events with QR code integration.

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router DOM** - Client-side routing
- **TailwindCSS v3.4.17** - Utility-first CSS framework
- **Heroicons** - Professional icon set

## Features

### Host Features
- **Landing Page** - Professional homepage with feature showcase
- **Authentication** - Signup, Signin, Email Verification, Password Recovery
- **Event Creation** - Create events with details, cover photos, and optional passwords
- **Event Dashboard** - Manage all events with stats overview
- **Host Gallery View** - Moderate photos with delete controls and batch actions
- **QR Code & Link Sharing** - Unique shareable links for each event

### Visitor Features
- **Public Gallery View** - Browse event photos without authentication
- **Photo Upload** - Drag-and-drop or browse to upload photos
- **Optional Captions** - Add descriptions to uploaded photos
- **Mobile Optimized** - Camera upload support for mobile devices

### Admin Features
- **Admin Login** - Secure admin portal access
- **Admin Dashboard** - System overview with stats and event management
- **Content Moderation** - View and manage all events and photos
- **User Management** - Monitor platform usage

## Color Theme

- **Deep Green**: `#2d5f3e` (Primary)
- **Emerald**: `#50C878` (Accent)
- **Deep Gold**: `#D4AF37` (Secondary)
- **Gold**: `#FFD700` (Highlights)
- **Gold Gradient**: Linear gradient with silver shimmer effect

## Project Structure

```
frontend/
├── src/
│   ├── pages/
│   │   ├── Landing.jsx              # Homepage
│   │   ├── Signup.jsx               # User registration
│   │   ├── Signin.jsx               # User login
│   │   ├── VerifyEmail.jsx          # Email verification
│   │   ├── ForgotPassword.jsx       # Password recovery
│   │   ├── CreateEvent.jsx          # Event creation form
│   │   ├── EventDashboard.jsx       # Host control panel
│   │   ├── HostGallery.jsx          # Host gallery with moderation
│   │   ├── EventGallery.jsx         # Public visitor view
│   │   ├── AdminLogin.jsx           # Admin authentication
│   │   ├── AdminDashboard.jsx       # Admin control panel
│   │   └── NotFound.jsx             # 404 error page
│   ├── components/                  # Reusable components (empty for now)
│   ├── layouts/                     # Layout components (empty for now)
│   ├── utils/                       # Utility functions (empty for now)
│   ├── App.jsx                      # Main app with routing
│   ├── main.jsx                     # App entry point
│   └── index.css                    # Tailwind imports & custom styles
├── public/                          # Static assets
├── tailwind.config.js               # Tailwind configuration
├── vite.config.js                   # Vite configuration
└── package.json                     # Dependencies
```

## Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | Landing | Homepage |
| `/signup` | Signup | User registration |
| `/signin` | Signin | User login |
| `/verify-email` | VerifyEmail | Email verification |
| `/forgot-password` | ForgotPassword | Password recovery |
| `/create-event` | CreateEvent | Create new event |
| `/dashboard` | EventDashboard | Host dashboard |
| `/host/event/:id` | HostGallery | Host gallery view |
| `/event/:id` | EventGallery | Public gallery view |
| `/admin/login` | AdminLogin | Admin login |
| `/admin/dashboard` | AdminDashboard | Admin dashboard |
| `*` | NotFound | 404 page |

## Getting Started

### Prerequisites

- Node.js 20.x or later
- npm 10.x or later

### Installation

1. Install dependencies:
```bash
npm install
```

### Development

Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

Create an optimized production build:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## Design Principles

- **Professional & Clean** - No generic cards, emojis, or decorative elements
- **Intuitive UX** - Clear navigation and user flows
- **Accessible** - Proper contrast ratios and semantic HTML
- **Responsive** - Mobile-first design approach
- **Performance** - Optimized assets and lazy loading

## Custom Tailwind Classes

### `.gold-shimmer`
Creates an animated gold shimmer effect with silver highlights:
```jsx
<button className="gold-shimmer">Click me</button>
```

## Next Steps (Backend Integration)

Once the backend is ready, connect:
1. Authentication endpoints (signup, signin, verify, etc.)
2. Event CRUD operations
3. Photo upload and storage
4. QR code generation
5. Admin APIs for system management

## Notes

- All form submissions currently log to console (backend integration pending)
- Mock data is used for event lists and photo galleries
- Image uploads use local preview (will need cloud storage integration)
- QR code generation needs backend implementation
