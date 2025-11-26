# PhotoLog Frontend

A modern photo-sharing platform for events that allows hosts to create events and collect photos from guests through QR codes and shareable links.

## Overview

PhotoLog enables event hosts to create photo galleries where guests can easily upload photos without needing to sign up or download an app. Hosts can manage their events, moderate photos, and share access through QR codes or direct links.

## Tech Stack

- React 19 - UI library
- Vite - Build tool and development server
- React Router DOM - Client-side routing
- Firebase Authentication - User authentication
- TailwindCSS - Utility-first CSS framework
- Heroicons - Icon library

## Features

### For Event Hosts

- User authentication with email/password and Google sign-in
- Create events with details, cover photos, and optional passwords
- Event dashboard to manage all your events
- Host gallery view with photo moderation tools
- QR code and shareable link generation for each event
- Delete photos individually or in bulk

### For Event Guests

- Browse event galleries without signing up
- Upload photos with drag-and-drop or file browser
- Add optional captions to photos
- Mobile-optimized interface with camera upload support

### For Administrators

- Admin login portal
- Admin dashboard with system overview
- Content moderation tools
- User management interface

## Getting Started

### Prerequisites

- Node.js 20.x or later
- npm 10.x or later

### Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the `frontend` directory with your Firebase configuration:
```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_API_BASE_URL=http://localhost:8000
```

### Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Building for Production

Create an optimized production build:
```bash
npm run build
```

Preview the production build locally:
```bash
npm run preview
```

## Project Structure

```
frontend/
├── src/
│   ├── pages/              # Page components
│   │   ├── Landing.jsx
│   │   ├── Signup.jsx
│   │   ├── Signin.jsx
│   │   ├── VerifyEmail.jsx
│   │   ├── ForgotPassword.jsx
│   │   ├── CreateEvent.jsx
│   │   ├── EventDashboard.jsx
│   │   ├── HostGallery.jsx
│   │   ├── EventGallery.jsx
│   │   ├── AdminLogin.jsx
│   │   ├── AdminDashboard.jsx
│   │   └── UserManagement.jsx
│   ├── components/         # Reusable components
│   ├── contexts/           # React contexts
│   ├── services/           # API service functions
│   ├── lib/                # Firebase configuration
│   ├── App.jsx             # Main app component with routing
│   └── main.jsx            # Application entry point
├── public/                 # Static assets
└── package.json            # Dependencies and scripts
```

## Available Routes

- `/` - Landing page
- `/signup` - User registration
- `/signin` - User login
- `/verify-email` - Email verification
- `/forgot-password` - Password recovery
- `/create-event` - Create new event (protected)
- `/dashboard` - Event dashboard (protected)
- `/host/event/:id` - Host gallery view (protected)
- `/event/:id` - Public gallery view
- `/admin/login` - Admin login
- `/admin/dashboard` - Admin dashboard (protected)

## Environment Variables

The frontend requires the following environment variables in a `.env` file:

- `VITE_FIREBASE_API_KEY` - Firebase API key
- `VITE_FIREBASE_AUTH_DOMAIN` - Firebase authentication domain
- `VITE_FIREBASE_PROJECT_ID` - Firebase project ID
- `VITE_FIREBASE_STORAGE_BUCKET` - Firebase storage bucket
- `VITE_FIREBASE_MESSAGING_SENDER_ID` - Firebase messaging sender ID
- `VITE_FIREBASE_APP_ID` - Firebase app ID
- `VITE_API_BASE_URL` - Backend API base URL (optional, defaults to same hostname on port 8000)

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

